
// src/services/api.js
import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Request interceptor - runs before each request
api.interceptors.request.use(
  (config) => {``
    // Get the token from localStorage
    const token = localStorage.getItem('auth_token');
    
    // If token exists, add it to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - runs after each response
// Enhanced error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Handle specific error codes
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // Authentication error
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            if (!window.location.pathname.includes('/account/login')) {
              window.location.href = '/account/login';
            }
            break;
          case 403:
            // Forbidden - user doesn't have permission
            console.error('Permission denied');
            break;
          case 422:
            // Validation errors
            return Promise.reject({
              message: 'Validation error',
              errors: error.response.data.errors
            });
          case 500:
            // Server error
            console.error('Server error occurred');
            break;
        }
      }
      
      return Promise.reject({
        message: error.response?.data?.message || 'Something went wrong',
        status: error.response?.status,
        data: error.response?.data
      });
    }
  );

// Export API services grouped by functionality
export const AuthService = {
    login: (credentials) => api.post('/v1/auth/login', credentials),
    register: (userData) => api.post('/v1/auth/register', userData),
    logout: () => api.post('/v1/auth/logout'),
    getUser: () => api.get('/user'), // This matches your sanctum route
    forgotPassword: (email) => api.post('/v1/auth/forgot-password', { email }),
    resetPassword: (data) => api.post('/v1/auth/reset-password', data)
  };

  export const ProductService = {
    getProducts: (params) => api.get('/v1/products', { params }),
    getProduct: (id) => api.get(`/v1/products/${id}`),
    getProductDetails: (id) => api.get(`/v1/products/${id}/details`),
    getProductSizes: (id) => api.get(`/v1/products/${id}/sizes`),
    getProductColors: (id) => api.get(`/v1/products/${id}/colors`),
    getProductImages: (id) => api.get(`/v1/products/${id}/images`),
    getProductsByCategory: (categoryId) => api.get(`/v1/products/filters/category/${categoryId}`),
    getProductsBySize: (sizeId) => api.get(`/v1/products/filters/size/${sizeId}`),
    getProductsByColor: (colorId) => api.get(`/v1/products/filters/color/${colorId}`),
    getProductsByPrice: (params) => api.get('/v1/products/filters/price', { params })
  };

export const CategoryService = {
  // Category related services
  getCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`)
};

export const CartService = {
    getCart: () => api.get('/v1/cart'),
    addToCart: (productData) => api.post('/v1/cart/add', productData),
    updateCartItem: (id, quantity) => api.put(`/v1/cart/items/${id}`, { quantity }),
    removeCartItem: (id) => api.delete(`/v1/cart/items/${id}`),
    clearCart: () => api.delete('/v1/cart/clear')
  };

export const CheckoutService = {
  // Checkout and order related services
  createPaymentIntent: (cartData) => api.post('/checkout/payment-intent', cartData),
  processPayment: (paymentData) => api.post('/checkout/process-payment', paymentData),
  placeOrder: (orderData) => api.post('/orders', orderData),
  getShippingMethods: () => api.get('/checkout/shipping-methods'),
  applyCoupon: (code) => api.post('/checkout/apply-coupon', { code }),
  removeCoupon: () => api.delete('/checkout/remove-coupon')
};

export const OrderService = {
    placeOrder: (orderData) => api.post('/v1/orders', orderData),
    getOrders: () => api.get('/v1/orders/my-orders'),
    getOrder: (id) => api.get(`/v1/orders/${id}`),
    updateOrderStatus: (id, status) => api.patch(`/v1/orders/${id}/status`, { status })
  };

export const UserService = {
  // User profile and address services
  updateProfile: (userData) => api.put('/user/profile', userData),
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (addressData) => api.post('/user/addresses', addressData),
  updateAddress: (id, addressData) => api.put(`/user/addresses/${id}`, addressData),
  deleteAddress: (id) => api.delete(`/user/addresses/${id}`),
  setDefaultAddress: (id) => api.put(`/user/addresses/${id}/default`)
};


export const PaymentService = {
    createPaymentIntent: (data) => api.post('/v1/payments/create-intent', data),
    processPayment: (data) => api.post('/v1/payments/process', data),
    getPaymentDetails: (paymentId) => api.get(`/v1/payments/${paymentId}`)
  };

export default api;