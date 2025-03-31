
// src/services/api.js
import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Request interceptor - runs before each request
api.interceptors.request.use(
  (config) => {
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
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized errors (e.g., token expired)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // If not already on the login page, redirect to login
      if (!window.location.pathname.includes('/account/login')) {
        window.location.href = '/account/login';
      }
    }
    
    // Handle 422 Validation errors
    if (error.response && error.response.status === 422) {
      return Promise.reject({
        message: 'Validation error',
        errors: error.response.data.errors
      });
    }
    
    // General error handling
    return Promise.reject({
      message: error.response?.data?.message || 'Something went wrong',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

// Export API services grouped by functionality
export const AuthService = {
  // User authentication services
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getUser: () => api.get('/auth/user'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data)
};

export const ProductService = {
  // Product related services
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getNewArrivals: () => api.get('/products/new-arrivals'),
  getBestSellers: () => api.get('/products/best-sellers'),
  searchProducts: (query) => api.get('/products/search', { params: { query } }),
  getProductsByCategory: (categoryId, params) => 
    api.get(`/categories/${categoryId}/products`, { params })
};

export const CategoryService = {
  // Category related services
  getCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`)
};

export const CartService = {
  // Cart related services
  getCart: () => api.get('/cart'),
  addToCart: (productData) => api.post('/cart/add', productData),
  updateCartItem: (id, quantity) => api.put(`/cart/items/${id}`, { quantity }),
  removeCartItem: (id) => api.delete(`/cart/items/${id}`),
  clearCart: () => api.delete('/cart/clear')
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
  // Order management services
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.post(`/orders/${id}/cancel`)
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

export default api;