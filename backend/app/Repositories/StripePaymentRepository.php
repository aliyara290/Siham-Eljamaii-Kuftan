<?php

namespace App\Repositories;

use App\Interfaces\PaymentInterface;
use App\Models\Order;
use App\Models\Transaction;
use App\Traits\HttpResponses;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\StripeClient;
use Stripe\Webhook;

class StripePaymentRepository implements PaymentInterface
{
    use HttpResponses;

    protected $stripe;
    protected $stripeWebhookSecret;

    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
        $this->stripe = new StripeClient(config('services.stripe.secret'));
        $this->stripeWebhookSecret = config('services.stripe.webhook.secret');
    }

    /**
     * Create a payment intent
     * 
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPaymentIntent(array $data)
    {
        try {
            // Default to USD if no currency is provided
            $currency = $data['currency'] ?? 'USD';
            
            // Convert to smallest currency unit (cents for USD)
            $amount = (int)($data['amount'] * 100);
            
            $paymentIntentData = [
                'amount' => $amount,
                'currency' => $currency,
                'metadata' => [
                    'order_id' => $data['order_id'] ?? null,
                ]
            ];

            // Add customer email if provided
            if (isset($data['customer_email'])) {
                $paymentIntentData['receipt_email'] = $data['customer_email'];
            }
            
            // Add description if provided
            if (isset($data['description'])) {
                $paymentIntentData['description'] = $data['description'];
            }

            $paymentIntent = PaymentIntent::create($paymentIntentData);

            return $this->success([
                'client_secret' => $paymentIntent->client_secret,
                'payment_intent_id' => $paymentIntent->id,
            ]);
        } catch (ApiErrorException $e) {
            Log::error('Stripe API error: ' . $e->getMessage());
            return $this->error(
                '',
                500,
                'Payment intent creation failed: ' . $e->getMessage()
            );
        } catch (Exception $e) {
            Log::error('Error creating payment intent: ' . $e->getMessage());
            return $this->error(
                '',
                500,
                'An unexpected error occurred: ' . $e->getMessage()
            );
        }
    }

    /**
     * Process a payment
     * 
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function processPayment(array $data)
    {
        try {
            // Get the payment method ID from the request
            $paymentMethodId = $data['payment_method_id'];
            
            // Default to USD if no currency is provided
            $currency = $data['currency'] ?? 'USD';
            
            // Convert to smallest currency unit (cents for USD)
            $amount = (int)($data['amount'] * 100);
            
            // Create payment intent
            $paymentIntent = PaymentIntent::create([
                'amount' => $amount,
                'currency' => $currency,
                'payment_method' => $paymentMethodId,
                'confirmation_method' => 'manual',
                'confirm' => true,
                'metadata' => [
                    'order_id' => $data['order_id'] ?? null,
                ],
                'return_url' => $data['return_url'] ?? url('/payment/success'),
            ]);
            
            // Record the transaction
            $user = Auth::user();
            $transaction = Transaction::create([
                'user_id' => $user ? $user->id : null,
                'order_id' => $data['order_id'] ?? null,
                'payment_method_type' => 'stripe',
                'payment_id' => $paymentIntent->id,
                'payment_method_details' => $paymentIntent->payment_method_details->type ?? null,
                'status' => $paymentIntent->status,
                'amount' => $data['amount'],
                'currency' => $currency,
                'metadata' => [
                    'stripe_response' => json_encode($paymentIntent),
                ],
            ]);
            
            // If there's an order ID, update the order status
            if (!empty($data['order_id'])) {
                $order = Order::find($data['order_id']);
                if ($order) {
                    $paymentStatus = $paymentIntent->status === 'succeeded' ? 'paid' : 'pending';
                    $order->update([
                        'payment_status' => $paymentStatus,
                    ]);
                }
            }
            
            return $this->success([
                'payment_intent' => $paymentIntent,
                'transaction_id' => $transaction->id,
            ]);
        } catch (ApiErrorException $e) {
            Log::error('Stripe API error: ' . $e->getMessage());
            return $this->error(
                '',
                500,
                'Payment processing failed: ' . $e->getMessage()
            );
        } catch (Exception $e) {
            Log::error('Error processing payment: ' . $e->getMessage());
            return $this->error(
                '',
                500,
                'An unexpected error occurred: ' . $e->getMessage()
            );
        }
    }

    /**
     * Get payment details
     * 
     * @param string $paymentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPaymentDetails(string $paymentId)
    {
        try {
            $transaction = Transaction::where('payment_id', $paymentId)
                ->orWhere('id', $paymentId)
                ->first();
            
            if (!$transaction) {
                // If not found in our database, try to get from Stripe
                try {
                    $paymentIntent = PaymentIntent::retrieve($paymentId);
                    return $this->success([
                        'payment' => $paymentIntent,
                        'source' => 'stripe_api',
                    ]);
                } catch (ApiErrorException $e) {
                    return $this->error(
                        '',
                        404,
                        'Payment not found'
                    );
                }
            }
            
            return $this->success([
                'transaction' => $transaction,
                'order' => $transaction->order,
                'source' => 'database',
            ]);
        } catch (Exception $e) {
            Log::error('Error retrieving payment details: ' . $e->getMessage());
            return $this->error(
                '',
                500,
                'An unexpected error occurred: ' . $e->getMessage()
            );
        }
    }

    /**
     * Process a webhook event
     * 
     * @param string $payload
     * @param string $sigHeader
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleWebhook(string $payload, string $sigHeader)
    {
        try {
            // Verify webhook signature
            $event = Webhook::constructEvent(
                $payload, $sigHeader, $this->stripeWebhookSecret
            );
            
            // Handle the event based on its type
            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $this->handlePaymentIntentSucceeded($event->data->object);
                    break;
                case 'payment_intent.payment_failed':
                    $this->handlePaymentIntentFailed($event->data->object);
                    break;
                case 'charge.refunded':
                    $this->handleChargeRefunded($event->data->object);
                    break;
                default:
                    // Log unknown event types
                    Log::info('Received unknown event type: ' . $event->type);
            }
            
            return $this->success([
                'message' => 'Webhook processed successfully',
            ]);
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            Log::error('Webhook error: ' . $e->getMessage());
            return $this->error(
                '',
                400,
                'Webhook error: ' . $e->getMessage()
            );
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            Log::error('Webhook signature verification failed: ' . $e->getMessage());
            return $this->error(
                '',
                400,
                'Webhook signature verification failed'
            );
        } catch (Exception $e) {
            Log::error('Webhook processing error: ' . $e->getMessage());
            return $this->error(
                '',
                500,
                'Webhook processing failed: ' . $e->getMessage()
            );
        }
    }

    /**
     * Handle payment_intent.succeeded event
     * 
     * @param \Stripe\PaymentIntent $paymentIntent
     * @return void
     */
    protected function handlePaymentIntentSucceeded($paymentIntent)
    {
        Log::info('Payment succeeded: ' . $paymentIntent->id);
        
        // Update the transaction status
        $transaction = Transaction::where('payment_id', $paymentIntent->id)->first();
        
        if ($transaction) {
            $transaction->update([
                'status' => 'success',
                'metadata' => array_merge(
                    $transaction->metadata ?? [],
                    ['webhook_event' => 'payment_intent.succeeded']
                ),
            ]);
            
            // If there's an order linked, update its status
            if ($transaction->order) {
                $transaction->order->update([
                    'payment_status' => 'paid',
                ]);
            }
        } else {
            // Create a new transaction record if not found
            // This could happen if webhook arrives before the payment processing response
            if (isset($paymentIntent->metadata->order_id)) {
                Transaction::create([
                    'order_id' => $paymentIntent->metadata->order_id,
                    'payment_method_type' => 'stripe',
                    'payment_id' => $paymentIntent->id,
                    'status' => 'success',
                    'amount' => $paymentIntent->amount / 100, // Convert from cents
                    'currency' => $paymentIntent->currency,
                    'metadata' => [
                        'stripe_response' => json_encode($paymentIntent),
                        'webhook_event' => 'payment_intent.succeeded',
                    ],
                ]);
                
                // Update the order status
                $order = Order::find($paymentIntent->metadata->order_id);
                if ($order) {
                    $order->update([
                        'payment_status' => 'paid',
                    ]);
                }
            }
        }
    }

    /**
     * Handle payment_intent.payment_failed event
     * 
     * @param \Stripe\PaymentIntent $paymentIntent
     * @return void
     */
    protected function handlePaymentIntentFailed($paymentIntent)
    {
        Log::info('Payment failed: ' . $paymentIntent->id);
        
        // Update the transaction status
        $transaction = Transaction::where('payment_id', $paymentIntent->id)->first();
        
        if ($transaction) {
            $transaction->update([
                'status' => 'failed',
                'metadata' => array_merge(
                    $transaction->metadata ?? [],
                    [
                        'webhook_event' => 'payment_intent.payment_failed',
                        'failure_message' => $paymentIntent->last_payment_error->message ?? null,
                    ]
                ),
            ]);
            
            // If there's an order linked, update its status
            if ($transaction->order) {
                $transaction->order->update([
                    'payment_status' => 'failed',
                ]);
            }
        }
    }

    /**
     * Handle charge.refunded event
     * 
     * @param \Stripe\Charge $charge
     * @return void
     */
    protected function handleChargeRefunded($charge)
    {
        Log::info('Charge refunded: ' . $charge->id);
        
        // Find the transaction by payment intent ID
        $transaction = Transaction::where('payment_id', $charge->payment_intent)->first();
        
        if ($transaction) {
            // Create a new refund transaction
            Transaction::create([
                'order_id' => $transaction->order_id,
                'user_id' => $transaction->user_id,
                'payment_method_type' => 'stripe',
                'payment_id' => $charge->id,
                'payment_method_details' => 'refund',
                'status' => 'refunded',
                'amount' => $charge->amount_refunded / 100, // Convert from cents
                'currency' => $charge->currency,
                'metadata' => [
                    'stripe_response' => json_encode($charge),
                    'webhook_event' => 'charge.refunded',
                    'refunded_transaction_id' => $transaction->id,
                ],
            ]);
            
            // If there's an order linked, update its status
            if ($transaction->order) {
                $transaction->order->update([
                    'payment_status' => 'refunded',
                ]);
            }
        }
    }
}