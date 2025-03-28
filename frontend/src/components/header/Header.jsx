import {
  Bars2Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";
import Cart from "./Cart";
import Search from "./Search";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const closeMenu = () => setOpenMenu(false);
  const closeCart = () => setOpenCart(false);
  const closeSearch = () => setOpenSearch(false);

  useEffect(() => {
    if (openSearch || openCart || openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSearch, openCart, openMenu]);

  useEffect(() => {
    const ChangeHeaderStyle = () => {
      if (pathname === "/") {
        // Only change style for home page
        if (window.scrollY >= window.innerHeight - 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        // Always scrolled for non-home pages
        setIsScrolled(true);
      }
    };
    window.addEventListener("scroll", ChangeHeaderStyle);

    // Initial check for non-home pages
    if (pathname !== "/") {
      setIsScrolled(true);
    }

    return () => {
      window.removeEventListener("scroll", ChangeHeaderStyle);
    };
  }, [pathname]);

  return (
    <>
      <StyledHeaderContent scrolled={isScrolled} isHomePage={pathname === "/"}>
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
            <li onClick={() => setOpenSearch(true)}>
              <MagnifyingGlassIcon width={25} height={25} />
            </li>
            <li>
              <Link to={"/account/login"}>
                <UserIcon width={25} height={25} />
              </Link>
            </li>
            <li onClick={() => setOpenCart(true)}>
              <ShoppingBagIcon width={25} height={25} />
            </li>
          </StyledIconsList>
        </StyledRightPart>
      </StyledHeaderContent>
      <Menu onClose={closeMenu} open={openMenu} />
      <Cart openCart={openCart} onCloseCart={closeCart} />
      <Search onClose={closeSearch} open={openSearch} />
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
  padding: ${({ scrolled, isHomePage }) =>
    isHomePage ? (scrolled ? "2rem 3rem" : "3rem 4rem") : "2rem 3rem"};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${({ scrolled, isHomePage }) =>
    isHomePage ? (scrolled ? "var(--white)" : "transparent") : "var(--white)"};
  color: ${({ scrolled, isHomePage }) =>
    isHomePage
      ? scrolled
        ? "var(--neutral-800)"
        : "var(--white)"
      : "var(--neutral-800)"};
  transition: all 0.3s ease-in;
`;

const StyledLeftPart = styled.div`
  width: max-content;
`;
const StyledHamburger = styled.div`
  cursor: pointer;
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
  display: flex;
  align-items: center;
  gap: 1rem;
  li {
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;
