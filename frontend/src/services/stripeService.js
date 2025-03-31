// src/services/stripeService.js
import { CheckoutService } from './api';

/**
 * Utility functions for working with Stripe
 */

// Create a payment intent with the Laravel backend using our API service
export const createPaymentIntent = async (cartItems, customerInfo) => {
  try {
    const response = await CheckoutService.createPaymentIntent({
      items: cartItems,
      customer: customerInfo
    });
    
    return response;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Process a payment when the user confirms
export const processPayment = async (
  stripe, 
  elements, 
  clientSecret,
  customerInfo
) => {
  try {
    if (!stripe || !elements) {
      return { error: { message: 'Stripe has not loaded correctly.' } };
    }

    const cardElement = elements.getElement('card');

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: {
            line1: customerInfo.address,
            city: customerInfo.city,
            postal_code: customerInfo.postalCode,
            country: customerInfo.country || 'MA', // Default to Morocco
          },
        },
      },
    });

    if (error) {
      console.error('Payment failed:', error);
      return { error };
    }

    if (paymentIntent.status === 'succeeded') {
      // After successful payment with Stripe, send the payment info to our backend
      await CheckoutService.processPayment({
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        customer: customerInfo
      });
      
      return { success: true, paymentIntent };
    } else {
      return { 
        error: { 
          message: `Payment status: ${paymentIntent.status}. Please try again.` 
        } 
      };
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return { error: { message: 'An unexpected error occurred.' } };
  }
};

// Create an order after successful payment
export const createOrder = async (orderData) => {
  try {
    const response = await CheckoutService.placeOrder(orderData);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};