import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

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
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 35;
  img {
    width: 80%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledLinkBottom = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  z-index: 45;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  color: #ffffffb1;
  animation: chevron 1.5s ease infinite;
  @keyframes chevron {
    from {
      transform: translateY(-5px) translateX(-50%);
    }
    to {
      transform: translateY(5px) translateX(-50%);
    }
  }
`;

const Hero = () => {
  const logoRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(logoRef.current, {
      width: 250,
      top: "80%",
      duration: 0.2,
      scrollTrigger: {
        trigger: logoRef.current,
        start: "bottom bottom",
        end: "bottom 10%",
        scrub: true,
      },
    });
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
            <ChevronDownIcon width={40} height={40} />
        </StyledLinkBottom>
      </StyledHeroContent>
    </>
  );
};

export default Hero;
