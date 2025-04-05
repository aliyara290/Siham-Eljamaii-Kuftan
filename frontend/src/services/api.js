// src/services/api.js
import axios from "axios";

const createApiClient = () => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    timeout: 30000  
  });

  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("auth_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("auth_token");
        
        if (!window.location.pathname.includes("/account/login")) {
          window.location.href = "/account/login";
        }
      }

      return Promise.reject({
        message: error.response?.data?.message || "Something went wrong",
        status: error.response?.status,
        data: error.response?.data
      });
    }
  );

  return client;
};

const api = createApiClient();

export const AuthService = {
  login: (credentials) => api.post("/v1/auth/login", credentials),
  register: (userData) => api.post("/v1/auth/register", userData),
  logout: () => api.post("/v1/auth/logout"),
  getUser: () => api.get("/v1/user")
};

export const ProductService = {
  getProducts: (params) => api.get("/v1/products", { params }),
  getProduct: (id) => api.get(`/v1/products/${id}`),
  getProductsByCategory: (categoryId) => api.get(`/v1/products/filters/category/${categoryId}`)
};

export const CartService = {
  getCart: () => api.get("/v1/cart"),
  addToCart: (productData) => api.post("/v1/cart/add", productData),
  updateCartItem: (id, quantity) => api.put(`/v1/cart/items/${id}`, { quantity }),
  removeCartItem: (id) => api.delete(`/v1/cart/items/${id}`),
  clearCart: () => api.delete("/v1/cart/clear")
};

export const CheckoutService = {
  createPaymentIntent: (cartData) => api.post("/payments/payment-intent", cartData),
  processPayment: (paymentData) => api.post("/payments/process-payment", paymentData),
  placeOrder: (orderData) => api.post("/orders", orderData),
  getShippingMethods: () => api.get("/checkout/shipping-methods")
};

export const OrderService = {
  placeOrder: (orderData) => api.post("/v1/orders", orderData),
  getOrders: () => api.get("/v1/orders/my-orders"),
  getOrder: (id) => api.get(`/v1/orders/${id}`),
  updateOrderStatus: (id, status) =>
    api.patch(`/v1/orders/${id}/status`, { status }),
};

export const UserService = {
  updateProfile: (userData) => api.put("/user/profile", userData),
  getAddresses: () => api.get("/user/addresses"),
  addAddress: (addressData) => api.post("/user/addresses", addressData),
  updateAddress: (id, addressData) =>
    api.put(`/user/addresses/${id}`, addressData),
  deleteAddress: (id) => api.delete(`/user/addresses/${id}`),
  setDefaultAddress: (id) => api.put(`/user/addresses/${id}/default`),
};

export default api;
