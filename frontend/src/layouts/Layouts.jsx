import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
const Layouts = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layouts;
