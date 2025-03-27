import React, { useEffect, useRef } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

const Cart = ({ openCart, onCloseCart }) => {
  const cartRef = useRef(null);
  useEffect(() => {
    const handleCloseCart = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onCloseCart();
      }
    };
    if (openCart) {
      document.addEventListener("mousedown", handleCloseCart);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseCart);
    };
  }, [openCart, onCloseCart]);
  
  return (
    <StyledCart ref={cartRef} open={openCart}>
      <StyledTopSection>
        <StyledMenuHeader>
          <div>
            <h6>السلة (5)</h6>
          </div>
          <div className="menu_chevron-close" onClick={onCloseCart}>
            <XMarkIcon width={25} height={25} />
          </div>
        </StyledMenuHeader>
      </StyledTopSection>
      <StyledCartContent>
        <StyledCartList>
          {[...Array(6)].map((_, index) => (
            <StyledCartListItem key={index}>
              <StyledProductImage>
                <img
                  src="https://wonder-theme-fashion.myshopify.com/cdn/shop/products/sp50red2_big.jpg?v=1653405778&width=1200"
                  alt=""
                />
              </StyledProductImage>
              <StyledProductDetails>
                <StyledProductName>
                  <h4>تنورة ميدي مع طيات - أزرق داكن</h4>
                </StyledProductName>
                <StyledProductDet>
                  <span>اللون: كحلي</span>
                </StyledProductDet>
                <StyledProductDet>
                  <span>المقاس: 36</span>
                </StyledProductDet>
                <StyledProductPrice>
                  <span>400 درهم</span>
                </StyledProductPrice>
              </StyledProductDetails>
              <StyledDeleteButton>
                <TrashIcon width={20} height={20} />
              </StyledDeleteButton>
            </StyledCartListItem>
          ))}
        </StyledCartList>
      </StyledCartContent>
      <StyledCheckoutContent>
        <StyledTotalPrice>
          <span>المجموع</span>
          <h4>13,543 درهم</h4>
        </StyledTotalPrice>
        <StyledCheckoutButton>
          <button>Check out</button>
        </StyledCheckoutButton>
      </StyledCheckoutContent>
    </StyledCart>
  );
};

export default Cart;

const StyledCart = styled.div`
  position: fixed;
  z-index: 2345674567;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-100%")};
  width: 100%;
  max-width: 40rem;
  height: 100dvh;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  /* padding-bottom: 2rem; */
  transition: left 0.4s ease;
`;

const StyledTopSection = styled.div`
  width: 100%;
`;

const StyledMenuHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  padding-left: 1.3rem;
  border-bottom: 1px solid #00000030;
  color: var(--neutral-700);
  h6 {
    font-size: var(--text-xl);
    font-weight: 500;
  }
  .menu_chevron-close {
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: var(--neutral-200);
    }
  }
`;

const StyledCartContent = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow: auto;
`;
const StyledCartList = styled.div`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`;
const StyledDeleteButton = styled.div`
  height: max-content;
  grid-column: span 1 / span 1;
  color: var(--neutral-500);
  display: none;
  align-items: end;
  &:hover svg {
    cursor: pointer;
    color: var(--danger-500);
  }
`;
const StyledCartListItem = styled.div`
  margin: 0 1.5rem;
  padding: 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  /* grid-template-rows: 1fr; */
  gap: 2rem;
  border-bottom: 1px solid #00000020;
  &:last-child {
    border: none;
  }
  &:hover ${StyledDeleteButton} {
    display: flex;
  }
`;
const StyledProductImage = styled.div`
  grid-column: span 2 / span 2;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledProductDetails = styled.div`
  grid-column: span 6 / span 6;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const StyledProductName = styled.div`
  h4 {
    font-size: var(--text-md);
    color: var(--neutral-800);
    font-weight: 600;
  }
`;
const StyledProductDet = styled.div`
  span {
    font-size: var(--text-sm);
    color: var(--neutral-500);
    font-weight: 500;
  }
`;
const StyledProductPrice = styled.div`
  span {
    font-size: var(--text-lg);
    color: var(--neutral-700);
    font-weight: 600;
  }
`;
const StyledCheckoutContent = styled.div`
  background-color: var(--white);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-top: 1px solid #00000030;
`;
const StyledTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: var(--text-md);
    color: var(--neutral-700);
    font-weight: 500;
  }
  h4 {
    font-size: var(--text-lg);
    color: var(--neutral-700);
    font-weight: 600;
  }
`;
const StyledCheckoutButton = styled.div`
  button {
    width: 100%;
    height: 4.5rem;
    background-color: var(--neutral-900);
    color: var(--white);
    font-size: var(--text-md);
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background-color: var(--neutral-950);
    }
  }
`;
