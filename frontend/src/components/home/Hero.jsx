import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Form } from "react-router-dom";

const StyledHeroContent = styled.div`
  width: 100%;
  height: 100dvh;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #00000072, #00000072);
  }
`;

const StyledHeroBg = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledLogo = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  z-index: 35;
  img {
    /* width: 50%; */
    height: 100%;
    object-fit: cover;
  }
`;
const StyledLinkBottom = styled.div`
  position: absolute;
  bottom: 2rem;
  z-index: 45;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  color: #ffffffb1;
  animation: chevron 1.5s ease infinite;
  @keyframes chevron {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(10px);
    }
  }
`;

const Hero = () => {
  const logoRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        width: "100%",
        top: "50%"
      },
      {
        width: 120,
        top: "0",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "bottom ",
          end: "bottom top",
          scrub: true,
          markers: true
        },
      }
    );
  }, []);
  return (
    <>
      <StyledHeroContent>
        <StyledHeroBg>
          <img src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/couvve.jpg?v=1742155630&width=2880" />
        </StyledHeroBg>
        <StyledLogo ref={logoRef}>
          <img
            src="https://wonder-theme-fashion.myshopify.com/cdn/shop/files/logo-couture-white.svg?v=1708090539&width=3004"
            alt=""
          />
        </StyledLogo>
        <StyledLinkBottom>
          <ChevronDoubleDownIcon width={40} height={40} />
        </StyledLinkBottom>
      </StyledHeroContent>
    </>
  );
};

export default Hero;
