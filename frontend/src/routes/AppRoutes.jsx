import React from "react";
import { Routes, Route } from "react-router-dom";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/register" element={<RegisterPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/collections/bestseller" element={<BestSellerPage />} />
        <Route path="/collections/new" element={<NewArrivalsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/returns" element={<ReturnPolicyPage />} />
        <Route path="/size-guide" element={<SizeGuidePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;