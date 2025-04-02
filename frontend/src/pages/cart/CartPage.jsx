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
              <CartItemsList>
                {items.map((item) => (
                  <CartItemCard key={item.cartItemId}>
                    <ProductHeader>
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
                      <RemoveButton onClick={() => removeFromCart(item.cartItemId)}>
                        <TrashIcon width={18} height={18} />
                      </RemoveButton>
                    </ProductHeader>
                    
                    <ProductInfo>
                      <InfoRow>
                        <InfoLabel>السعر:</InfoLabel>
                        <InfoValue>{formatPrice(item.price)} د.م</InfoValue>
                      </InfoRow>
                      
                      <InfoRow>
                        <InfoLabel>الكمية:</InfoLabel>
                        <QuantityControls>
                          <QuantityButton onClick={() => handleDecreaseQuantity(item)}>-</QuantityButton>
                          <QuantityValue>{item.quantity}</QuantityValue>
                          <QuantityButton onClick={() => handleIncreaseQuantity(item)}>+</QuantityButton>
                        </QuantityControls>
                      </InfoRow>
                      
                      <InfoRow>
                        <InfoLabel>المجموع:</InfoLabel>
                        <TotalValue>{formatPrice(item.price * item.quantity)} د.م</TotalValue>
                      </InfoRow>
                    </ProductInfo>
                  </CartItemCard>
                ))}
              </CartItemsList>
              
              <CartActions>
                <ActionButton onClick={clearCart}>
                  إفراغ السلة
                </ActionButton>
                <ActionButton as={Link} to="/collections">
                  متابعة التسوق
                </ActionButton>
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
  padding-top: 6rem;
  padding-bottom: 4rem;
  
  @media (min-width: 768px) {
    padding-top: 12rem;
    padding-bottom: 6rem;
  }
`;

const CartContentWrapper = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const EmptyCartSection = styled.div`
  text-align: center;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 6rem 0;
    gap: 2rem;
  }
`;

const EmptyCartMessage = styled.p`
  font-size: var(--text-md);
  color: var(--neutral-600);
  max-width: 50rem;
  margin: 0 auto;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  transition: background-color 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: var(--neutral-800);
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem 3rem;
  }
`;

const CartContentSection = styled.section`
  margin-top: 3rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItemCard = styled.div`
  border: 1px solid var(--neutral-200);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const ProductHeader = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--neutral-100);
`;

const ProductImage = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  
  @media (min-width: 768px) {
    width: 10rem;
    height: 10rem;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
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

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--neutral-500);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--danger-500);
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-700);
`;

const InfoValue = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-800);
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

const TotalValue = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
`;

const CartActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
  }
`;

const ActionButton = styled.button`
  padding: 1rem;
  text-align: center;
  background-color: var(--white);
  color: var(--neutral-800);
  border: 1px solid var(--neutral-300);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: var(--neutral-100);
  }
  
  @media (min-width: 768px) {
    padding: 1.2rem 2.5rem;
    font-size: var(--text-md);
  }
`;

const CartSummarySection = styled.section`
  background-color: var(--neutral-50);
  padding: 2rem;
  border: 1px solid var(--neutral-200);
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 3rem;
    max-width: 40rem;
    margin-right: auto;
  }
`;

const SummaryTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--neutral-200);
  
  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
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
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--neutral-200);
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    margin-bottom: 2.5rem;
  }
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
  padding: 1.2rem 0;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1.5rem;
  
  &:hover {
    background-color: var(--neutral-800);
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem 0;
    margin-bottom: 2rem;
  }
`;

const SecureCheckoutNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  color: var(--neutral-600);
  font-size: var(--text-sm);
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const PaymentMethodsIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  img {
    height: 2rem;
    object-fit: contain;
    
    @media (min-width: 768px) {
      height: 2.5rem;
    }
  }
`;