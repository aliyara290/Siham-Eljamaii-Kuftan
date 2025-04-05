// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/home/Home";
import Layouts from "../layouts/Layouts";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProductDetails from "../pages/product/ProductDetails";
import CollectionsPage from "../pages/collection/CollectionsPage";
import CollectionPage from "../pages/collection/CollectionPage";
import FAQPage from "../pages/FAQ/FaqPage";
import ShippingPage from "../pages/shipping/ShippingPage";
import ReturnPolicyPage from "../pages/returns/ReturnPolicyPage";
import SizeGuidePage from "../pages/sizes/SizeGuidePage";
import ContactPage from "../pages/contact/ContactPage";
import BestSellerPage from "../pages/collection/BestSellerPage";
import NewArrivalsPage from "../pages/collection/NewArrivalsPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import OrderConfirmationPage from "../pages/checkout/OrderConfirmationPage";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {

    return <div className="bg-white fixed top-0 left-0 z-50 w-full h-screen text-black">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    // Store the current location they were trying to go to
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Route that redirects authenticated users to home
const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="bg-white fixed top-0 left-0 z-50 w-full h-screen text-black flex items-center justify-center">
      <span class="loader"></span>
    </div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collection/:slug" element={<CollectionPage />} />
        <Route path="/collections/bestseller" element={<BestSellerPage />} />
        <Route path="/collections/new" element={<NewArrivalsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/returns" element={<ReturnPolicyPage />} />
        <Route path="/size-guide" element={<SizeGuidePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* Authentication routes */}
        <Route path="/account/login" element={
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        } />
        <Route path="/account/register" element={
          <AuthRoute>
            <RegisterPage />
          </AuthRoute>
        } />
        
        {/* Routes that require a completed cart */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/order-confirmation" element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        } />
        
        {/* Protected routes (require authentication) */}
        <Route path="/account/profile" element={
          <ProtectedRoute>
            <div>Profile Page (To Be Implemented)</div>
          </ProtectedRoute>
        } />
        <Route path="/account/orders" element={
          <ProtectedRoute>
            <div>Orders Page (To Be Implemented)</div>
          </ProtectedRoute>
        } />
        <Route path="/account/addresses" element={
          <ProtectedRoute>
            <div>Addresses Page (To Be Implemented)</div>
          </ProtectedRoute>
        } />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;