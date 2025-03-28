import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/home/Home";
import Layouts from "../layouts/Layouts";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
