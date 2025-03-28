import React from "react";
import Hero from "../../components/home/Hero";
import Collections from "../../components/home/Collections";
import BestSeller from "../../components/home/BestSeller";
import Banner from "../../components/home/Banner";
import Gallery from "../../components/home/Gallery";
import Cta from "../../components/home/Cta";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Collections />
      <BestSeller />  
      <Banner />
      <Gallery />
      <Cta />
    </>
  );
};

export default HomePage;
