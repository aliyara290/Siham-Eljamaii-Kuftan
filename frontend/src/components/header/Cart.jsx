import React, { useEffect, useRef } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, closeCart } = useCart();
  const { items, totalPrice, isOpen } = cart;
  const cartRef = useRef(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const handleCloseCart = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        closeCart();
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleCloseCart);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseCart);
    };
  }, [isOpen, closeCart]);
  
  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.cartItemId, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.cartItemId, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    closeCart(); // Close the cart sidebar first
    navigate('/checkout'); // Then navigate to the checkout page
  };
  
  return (
    <StyledCart ref={cartRef} open={isOpen}>
      <StyledTopSection>
        <StyledMenuHeader>
          <div>
            <h6>السلة ({items.length})</h6>
          </div>
          <div className="menu_chevron-close" onClick={closeCart}>
            <XMarkIcon width={25} height={25} />
          </div>
        </StyledMenuHeader>
      </StyledTopSection>
      
      {items.length === 0 ? (
        <EmptyCart>
          <EmptyCartMessage>السلة فارغة</EmptyCartMessage>
          <EmptyCartCTA>
            <Link to="/collections" onClick={closeCart}>
              <span>تصفح المنتجات</span>
            </Link>
          </EmptyCartCTA>
        </EmptyCart>
      ) : (
        <>
          <StyledCartContent>
            <StyledCartList>
              {items.map((item) => (
                <StyledCartListItem key={item.cartItemId}>
                  <StyledProductImage>
                    <img src={item.image || "https://wonder-theme-fashion.myshopify.com/cdn/shop/products/sp50red2_big.jpg?v=1653405778&width=1200"} alt={item.name} />
                  </StyledProductImage>
                  <StyledProductDetails>
                    <StyledProductName>
                      <h4>{item.name}</h4>
                    </StyledProductName>
                    <div className="flex justify-between">

                    <div>

                    {item.selectedColor && (
                      <StyledProductDet>
                        <span>اللون: {item.selectedColor}</span>
                      </StyledProductDet>
                    )}
                    
                    {item.selectedSize && (
                      <StyledProductDet>
                        <span>المقاس: {item.selectedSize}</span>
                      </StyledProductDet>
                    )}
                    </div>
                    
                    <QuantityControls>
                      <QuantityButton onClick={() => handleDecreaseQuantity(item)}>-</QuantityButton>
                      <QuantityValue>{item.quantity}</QuantityValue>
                      <QuantityButton onClick={() => handleIncreaseQuantity(item)}>+</QuantityButton>
                    </QuantityControls>
                    </div>
                    
                    <StyledProductPrice>
                      <span>{formatPrice(item.price)} درهم</span>
                    </StyledProductPrice>
                  </StyledProductDetails>
                  <StyledDeleteButton onClick={() => removeFromCart(item.cartItemId)}>
                    <TrashIcon width={20} height={20} />
                  </StyledDeleteButton>
                </StyledCartListItem>
              ))}
            </StyledCartList>
          </StyledCartContent>
          
          <StyledCheckoutContent>
            <StyledTotalPrice>
              <span>المجموع</span>
              <h4>{formatPrice(totalPrice)} درهم</h4>
            </StyledTotalPrice>
            <StyledCheckoutButton>
              <button onClick={handleCheckout}>إتمام الطلب</button>
            </StyledCheckoutButton>
          </StyledCheckoutContent>
        </>
      )}
    </StyledCart>
  );
};

export default Cart;

// Styled Components
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

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 2rem;
  padding: 2rem;
`;

const EmptyCartMessage = styled.div`
  font-size: var(--text-xl);
  color: var(--neutral-600);
  font-weight: 500;
`;

const EmptyCartCTA = styled.div`
  a {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: var(--neutral-900);
    color: var(--white);
    font-size: var(--text-md);
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: var(--neutral-800);
    }
    
    span {
      display: inline-block;
    }
  }
`;

const StyledCartContent = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow: auto;
`;

const StyledCartList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDeleteButton = styled.div`
  height: max-content;
  grid-column: span 1 / span 1;
  color: var(--neutral-500);
  display: flex;
  align-items: end;
  cursor: pointer;
  &:hover svg {
    color: var(--danger-500);
  }
`;

const StyledCartListItem = styled.div`
  margin: 0 1.5rem;
  padding: 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
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
  grid-column: span 3 / span 3;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledProductDetails = styled.div`
  grid-column: span 8 / span 8;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledProductName = styled.div`
  h4 {
    font-size: var(--text-sm);
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

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: fit-content;
  border: 1px solid var(--neutral-300);
`;

const QuantityButton = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: none;
  font-size: var(--text-md);
  cursor: pointer;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`;

const QuantityValue = styled.span`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--neutral-300);
  border-left: 1px solid var(--neutral-300);
  font-size: var(--text-sm);
`;

const StyledProductPrice = styled.div`
  span {
    font-size: var(--text-md);
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