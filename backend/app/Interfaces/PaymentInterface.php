<?php
// backend/app/Interfaces/PaymentInterface.php

namespace App\Interfaces;

interface PaymentInterface
{
    /**
     * Create a payment intent
     * 
     * @param array $data
     * @return mixed
     */
    public function createPaymentIntent(array $data);
    
    /**
     * Process a payment
     * 
     * @param array $data
     * @return mixed
     */
    public function processPayment(array $data);
    
    /**
     * Get payment details
     * 
     * @param string $paymentId
     * @return mixed
     */
    public function getPaymentDetails(string $paymentId);
    
    /**
     * Process a webhook event
     * 
     * @param string $payload
     * @param string $sigHeader
     * @return mixed
     */
    public function handleWebhook(string $payload, string $sigHeader);
}