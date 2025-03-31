// src/pages/cart/CartPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TrashIcon } from '@heroicons/react/24/outline';
import Heading from '../../components/heading/Heading';
import SubHeading from '../../components/heading/SubHeading';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { items, totalPrice } = cart;
  const navigate = useNavigate();
  
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

  const proceedToCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <CartPageContainer>
      <CartContentWrapper>
        <Heading title="سلة التسوق" weight={500} />
        
        {items.length === 0 ? (
          <EmptyCartSection>
            <SubHeading title="سلة التسوق فارغة" size="lg" />
            <EmptyCartMessage>لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</EmptyCartMessage>
            <ShopNowButton to="/collections">تصفح المنتجات</ShopNowButton>
          </EmptyCartSection>
        ) : (
          <>
            <CartContentSection>
              <CartHeader>
                <HeaderColumn>المنتج</HeaderColumn>
                <HeaderColumn>السعر</HeaderColumn>
                <HeaderColumn>الكمية</HeaderColumn>
                <HeaderColumn>المجموع</HeaderColumn>
                <HeaderColumn></HeaderColumn>
              </CartHeader>
              
              <CartItemsList>
                {items.map((item) => (
                  <CartItem key={item.cartItemId}>
                    <ProductInfoColumn>
                      <ProductImage src={item.image} alt={item.name} />
                      <ProductDetails>
                        <ProductName>{item.name}</ProductName>
                        {item.selectedColor && (
                          <ProductOption>اللون: {item.selectedColor}</ProductOption>
                        )}
                        {item.selectedSize && (
                          <ProductOption>المقاس: {item.selectedSize}</ProductOption>
                        )}
                      </ProductDetails>
                    </ProductInfoColumn>
                    
                    <PriceColumn>{formatPrice(item.price)} د.م</PriceColumn>
                    
                    <QuantityColumn>
                      <QuantityControls>
                        <QuantityButton onClick={() => handleDecreaseQuantity(item)}>-</QuantityButton>
                        <QuantityValue>{item.quantity}</QuantityValue>
                        <QuantityButton onClick={() => handleIncreaseQuantity(item)}>+</QuantityButton>
                      </QuantityControls>
                    </QuantityColumn>
                    
                    <TotalColumn>
                      {formatPrice(item.price * item.quantity)} د.م
                    </TotalColumn>
                    
                    <RemoveColumn>
                      <RemoveButton onClick={() => removeFromCart(item.cartItemId)}>
                        <TrashIcon width={20} height={20} />
                      </RemoveButton>
                    </RemoveColumn>
                  </CartItem>
                ))}
              </CartItemsList>
              
              <CartActions>
                <ClearCartButton onClick={clearCart}>
                  إفراغ السلة
                </ClearCartButton>
                <ContinueShoppingButton to="/collections">
                  متابعة التسوق
                </ContinueShoppingButton>
              </CartActions>
            </CartContentSection>
            
            <CartSummarySection>
              <SummaryTitle>ملخص الطلب</SummaryTitle>
              
              <SummaryRow>
                <SummaryLabel>مجموع المنتجات:</SummaryLabel>
                <SummaryValue>{formatPrice(totalPrice)} د.م</SummaryValue>
              </SummaryRow>
              
              <SummaryRow>
                <SummaryLabel>الشحن:</SummaryLabel>
                <SummaryValue>يتم تحديده في الخطوة التالية</SummaryValue>
              </SummaryRow>
              
              <SummaryTotal>
                <SummaryTotalLabel>الإجمالي:</SummaryTotalLabel>
                <SummaryTotalValue>{formatPrice(totalPrice)} د.م</SummaryTotalValue>
              </SummaryTotal>
              
              <CheckoutButton onClick={proceedToCheckout}>
                المتابعة إلى الدفع
              </CheckoutButton>
              
              <SecureCheckoutNotice>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>دفع آمن مشفر 100%</span>
              </SecureCheckoutNotice>
              
              <PaymentMethodsIcons>
                <img src="/assets/images/pay/visa.svg" alt="Visa" />
                <img src="/assets/images/pay/mastercard.svg" alt="Mastercard" />
                <img src="/assets/images/pay/american-ex.svg" alt="American Express" />
              </PaymentMethodsIcons>
            </CartSummarySection>
          </>
        )}
      </CartContentWrapper>
    </CartPageContainer>
  );
};

export default CartPage;

// Styled Components
const CartPageContainer = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const CartContentWrapper = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const EmptyCartSection = styled.div`
  text-align: center;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const EmptyCartMessage = styled.p`
  font-size: var(--text-md);
  color: var(--neutral-600);
  max-width: 50rem;
  margin: 0 auto;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  padding: 1.5rem 3rem;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  transition: background-color 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: var(--neutral-800);
  }
`;

const CartContentSection = styled.section`
  margin-top: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 0.5fr;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--neutral-200);
  
  @media (max-width: 768px) {
    width: 100rem;
  }
`;

const HeaderColumn = styled.div`
  font-weight: 600;
  font-size: var(--text-md);
  color: var(--neutral-800);
  text-align: center;
  
  &:first-child {
    text-align: right;
  }
`;

const CartItemsList = styled.div`
  @media (max-width: 768px) {
    width: 100rem;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 0.5fr;
  padding: 2rem 0;
  border-bottom: 1px solid var(--neutral-200);
  align-items: center;
`;

const ProductInfoColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ProductImage = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductName = styled.h4`
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--neutral-800);
`;

const ProductOption = styled.span`
  font-size: var(--text-sm);
  color: var(--neutral-600);
`;

const PriceColumn = styled.div`
  text-align: center;
  font-size: var(--text-md);
  color: var(--neutral-700);
`;

const QuantityColumn = styled.div`
  display: flex;
  justify-content: center;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--neutral-300);
`;

const QuantityButton = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: var(--text-md);
  cursor: pointer;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`;

const QuantityValue = styled.span`
  width: 4rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--neutral-300);
  border-left: 1px solid var(--neutral-300);
  font-size: var(--text-md);
`;

const TotalColumn = styled.div`
  text-align: center;
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
`;

const RemoveColumn = styled.div`
  display: flex;
  justify-content: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--neutral-500);
  cursor: pointer;
  
  &:hover {
    color: var(--danger-500);
  }
`;

const CartActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ClearCartButton = styled.button`
  padding: 1.2rem 2.5rem;
  background-color: var(--white);
  color: var(--neutral-800);
  border: 1px solid var(--neutral-300);
  font-size: var(--text-md);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`;

const ContinueShoppingButton = styled(Link)`
  padding: 1.2rem 2.5rem;
  background-color: var(--neutral-100);
  color: var(--neutral-800);
  border: 1px solid var(--neutral-300);
  font-size: var(--text-md);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-200);
  }
`;

const CartSummarySection = styled.section`
  background-color: var(--neutral-50);
  padding: 3rem;
  border: 1px solid var(--neutral-200);
  max-width: 40rem;
  margin-right: auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SummaryTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--neutral-200);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SummaryLabel = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-700);
`;

const SummaryValue = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-800);
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--neutral-200);
  margin-bottom: 2.5rem;
`;

const SummaryTotalLabel = styled.span`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
`;

const SummaryTotalValue = styled.span`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1.5rem 0;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: var(--neutral-800);
  }
`;

const SecureCheckoutNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  color: var(--neutral-600);
  font-size: var(--text-sm);
`;

const PaymentMethodsIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  img {
    height: 2.5rem;
    object-fit: contain;
  }
`;