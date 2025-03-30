import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop"; // Import the component

const Layouts = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layouts;