<?php
// backend/app/Interfaces/OrderInterface.php

namespace App\Interfaces;

interface OrderInterface
{
    /**
     * Create a new order
     * 
     * @param array $data
     * @return mixed
     */
    public function createOrder(array $data);
    
    /**
     * Get an order by ID
     * 
     * @param string $orderId
     * @return mixed
     */
    public function getOrderById(string $orderId);
    
    /**
     * Get orders for a user
     * 
     * @param string $userId
     * @return mixed
     */
    public function getUserOrders(string $userId);
    
    /**
     * Update an order's status
     * 
     * @param string $orderId
     * @param string $paymentStatus
     * @param string $fulfillmentStatus
     * @return mixed
     */
    public function updateOrderStatus(string $orderId, string $paymentStatus, string $fulfillmentStatus);
}