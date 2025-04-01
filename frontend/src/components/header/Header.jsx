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
import { useCart } from "../../context/CartContext";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const { cart, toggleCart } = useCart();
  const { totalItems } = cart;

  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const closeMenu = () => setOpenMenu(false);
  const closeSearch = () => setOpenSearch(false);

  // Reset scroll state when navigating to home page
  useEffect(() => {
    if (pathname === "/") {
      // Check current scroll position when navigating to home
      if (window.scrollY < window.innerHeight - 100) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    } else {
      // Always scrolled for non-home pages
      setIsScrolled(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (openSearch || cart.isOpen || openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSearch, cart.isOpen, openMenu]);

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

    // Initial check when component mounts
    ChangeHeaderStyle();

    return () => {
      window.removeEventListener("scroll", ChangeHeaderStyle);
    };
  }, [pathname]);

  return (
    <StyledHeaderLayout>
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
            <li onClick={toggleCart}>
              <CartIconWrapper>
                <ShoppingBagIcon width={25} height={25} />
                {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
              </CartIconWrapper>
            </li>
          </StyledIconsList>
        </StyledRightPart>
      </StyledHeaderContent>
      <Menu onClose={closeMenu} open={openMenu} />
      <Cart />
      <Search onClose={closeSearch} open={openSearch} />
      {(cart.isOpen || openMenu) && <StyledBlur></StyledBlur>}
    </StyledHeaderLayout>
  );
};

export default Header;

const StyledHeaderLayout = styled.div`
  position: relative;
`;

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
    height: auto;
    transition: opacity 0.3s ease;
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

const CartIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: var(--neutral-900);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
