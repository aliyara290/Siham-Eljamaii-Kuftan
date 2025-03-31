<?php

namespace App\Repositories;

use App\Interfaces\OrderInterface;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Traits\HttpResponses;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderRepository implements OrderInterface
{
    use HttpResponses;

    /**
     * Create a new order
     * 
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function createOrder(array $data)
    {
        try {
            DB::beginTransaction();
            
            // Generate order number
            $orderNumber = Order::generateOrderNumber();
            
            // Create the order
            $order = Order::create([
                'user_id' => Auth::id(),
                'order_number' => $orderNumber,
                'total_amount' => $data['total_amount'],
                'currency' => $data['currency'] ?? 'USD',
                'payment_status' => 'pending',
                'fulfillment_status' => 'unfulfilled',
                'shipping_address' => $data['shipping_address'] ?? null,
                'billing_address' => $data['billing_address'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);
            
            // Add order items
            foreach ($data['items'] as $item) {
                $product = Product::find($item['product_id']);
                
                if (!$product) {
                    throw new Exception("Product with ID {$item['product_id']} not found");
                }
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name_en ?? $product->name_ar ?? 'Unknown Product',
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'options' => $item['options'] ?? null,
                ]);
            }
            
            DB::commit();
            
            return $this->success([
                'order' => $order->load('items'),
                'message' => 'Order created successfully',
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error creating order: ' . $e->getMessage());
            
            return $this->error(
                '',
                500,
                'Order creation failed: ' . $e->getMessage()
            );
        }
    }

    /**
     * Get an order by ID
     * 
     * @param string $orderId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOrderById(string $orderId)
    {
        try {
            $order = Order::with(['items', 'transactions'])->find($orderId);
            
            if (!$order) {
                return $this->error(
                    '',
                    404,
                    'Order not found'
                );
            }
            
            // Check if the requesting user is authorized to view this order
            if (Auth::id() !== $order->user_id && !Auth::user()->isAdmin) {
                return $this->error(
                    '',
                    403,
                    'Unauthorized to view this order'
                );
            }
            
            return $this->success([
                'order' => $order,
            ]);
        } catch (Exception $e) {
            Log::error('Error retrieving order: ' . $e->getMessage());
            
            return $this->error(
                '',
                500,
                'Failed to retrieve order: ' . $e->getMessage()
            );
        }
    }

    /**
     * Get orders for a user
     * 
     * @param string $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserOrders(string $userId)
    {
        try {
            // Check if the requesting user is authorized to view these orders
            if (Auth::id() !== $userId && !(Auth::user() && Auth::user()->isAdmin)) {
                return $this->error(
                    '',
                    403,
                    'Unauthorized to view these orders'
                );
            }
            
            $orders = Order::with(['items'])
                ->where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->paginate(10);
            
            return $this->success([
                'orders' => $orders,
            ]);
        } catch (Exception $e) {
            Log::error('Error retrieving user orders: ' . $e->getMessage());
            
            return $this->error(
                '',
                500,
                'Failed to retrieve orders: ' . $e->getMessage()
            );
        }
    }

    /**
     * Update an order's status
     * 
     * @param string $orderId
     * @param string $paymentStatus
     * @param string $fulfillmentStatus
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOrderStatus(string $orderId, string $paymentStatus, string $fulfillmentStatus)
    {
        try {
            $order = Order::find($orderId);
            
            if (!$order) {
                return $this->error(
                    '',
                    404,
                    'Order not found'
                );
            }
            
            $order->update([
                'payment_status' => $paymentStatus,
                'fulfillment_status' => $fulfillmentStatus,
            ]);
            
            return $this->success([
                'order' => $order->fresh(),
                'message' => 'Order status updated successfully',
            ]);
        } catch (Exception $e) {
            Log::error('Error updating order status: ' . $e->getMessage());
            
            return $this->error(
                '',
                500,
                'Failed to update order status: ' . $e->getMessage()
            );
        }
    }
}