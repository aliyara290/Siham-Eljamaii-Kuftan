<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\OrderRequest;
use App\Interfaces\OrderInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    private $orderInterface;

    public function __construct(OrderInterface $orderInterface)
    {
        $this->orderInterface = $orderInterface;
    }

    /**
     * Create a new order
     * 
     * @param OrderRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(OrderRequest $request)
    {
        return $this->orderInterface->createOrder($request->validated());
    }

    /**
     * Get an order by ID
     * 
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return $this->orderInterface->getOrderById($id);
    }

    /**
     * Get orders for the authenticated user
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function myOrders()
    {
        return $this->orderInterface->getUserOrders(Auth::id());
    }

    /**
     * Get orders for a specific user (admin only)
     * 
     * @param string $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function userOrders($userId)
    {
        return $this->orderInterface->getUserOrders($userId);
    }

    /**
     * Update an order's status
     * 
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'payment_status' => 'required|string|in:pending,paid,failed,refunded',
            'fulfillment_status' => 'required|string|in:unfulfilled,processing,shipped,delivered,cancelled',
        ]);

        return $this->orderInterface->updateOrderStatus(
            $id,
            $request->payment_status,
            $request->fulfillment_status
        );
    }
}