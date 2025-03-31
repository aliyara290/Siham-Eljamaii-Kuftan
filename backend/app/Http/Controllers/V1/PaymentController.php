<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\PaymentRequest;
use App\Interfaces\PaymentInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    private $paymentInterface;

    public function __construct(PaymentInterface $paymentInterface)
    {
        $this->paymentInterface = $paymentInterface;
    }

    /**
     * Create a payment intent
     * 
     * @param PaymentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPaymentIntent(PaymentRequest $request)
    {
        return $this->paymentInterface->createPaymentIntent($request->validated());
    }

    /**
     * Process a payment
     * 
     * @param PaymentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function processPayment(PaymentRequest $request)
    {
        return $this->paymentInterface->processPayment($request->validated());
    }

    /**
     * Get payment details
     * 
     * @param string $paymentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPaymentDetails($paymentId)
    {
        return $this->paymentInterface->getPaymentDetails($paymentId);
    }

    /**
     * Handle Stripe webhook
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        if (empty($sigHeader)) {
            Log::error('Missing Stripe-Signature header');
            return response()->json(['error' => 'Missing Stripe-Signature header'], 400);
        }

        return $this->paymentInterface->handleWebhook($payload, $sigHeader);
    }
}