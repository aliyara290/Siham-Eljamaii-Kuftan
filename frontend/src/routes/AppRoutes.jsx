// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./ProtectedRoutes";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
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
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;