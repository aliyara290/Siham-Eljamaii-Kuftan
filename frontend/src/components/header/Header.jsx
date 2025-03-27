import {
  Bars2Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";
import Cart from "./Cart";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const closeMenu = () => setOpenMenu(false);
  const closeCart = () => setOpenCart(false);

  useEffect(() => {
    const ChangeHeaderStyle = () => {
      if (window.scrollY >= window.innerHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", ChangeHeaderStyle);

    // Cleanup the event listener on unmount to avoid memory leaks
    return () => {
      window.removeEventListener("scroll", ChangeHeaderStyle);
    };
  }, []);
  return (
    <>
      <StyledHeaderContent scrolled={isScrolled}>
        <StyledLeftPart>
          <StyledHamburger onClick={() => setOpenMenu(true)}>
            <Bars2Icon width={40} height={40} />
          </StyledHamburger>
        </StyledLeftPart>
        <StyledLogo>
          <Link to={"/"}>
            {isScrolled && (
              <img
                src="https://wonder-theme-fashion.myshopify.com/cdn/shop/files/logo-couture-black.svg?v=1708090539&width=280"
                alt=""
              />
            )}
          </Link>
        </StyledLogo>
        <StyledRightPart>
          <StyledIconsList>
            <li>
              <MagnifyingGlassIcon width={25} height={25} />
            </li>
            <li>
              <UserIcon width={25} height={25} />
            </li>
            <li onClick={() => setOpenCart(true)}>
              <ShoppingBagIcon width={25} height={25} />
            </li>
          </StyledIconsList>
        </StyledRightPart>
      </StyledHeaderContent>
      <Menu onClose={closeMenu} open={openMenu} />
      <Cart openCart={openCart} onCloseCart={closeCart} />
      {(openCart || openMenu) && <StyledBlur></StyledBlur>}
    </>
  );
};

export default Header;

const StyledBlur = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000040;
  backdrop-filter: blur(10px);
  z-index: 2100;
`;

const StyledHeaderContent = styled.header`
  width: 100%;
  padding: ${({ scrolled }) => (scrolled ? "2rem 3rem" : "3rem 4rem")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${({ scrolled }) =>
    scrolled ? "var(--white)" : "transparent"};
  color: ${({ scrolled }) =>
    scrolled ? "var(--neutral-800)" : "var(--white)"};
  transition: all 0.5s ease-in-out;
`;

const StyledLeftPart = styled.div`
  width: max-content;
`;
const StyledHamburger = styled.div`
  cursor: pointer;
  /* color: var(--white); */
`;
const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
`;
const StyledRightPart = styled.div`
  display: flex;
  justify-content: end;
`;
const StyledIconsList = styled.ul`
  /* color: var(--white); */
  display: flex;
  align-items: center;
  gap: 1rem;
  li {
    cursor: pointer;
  }
`;
