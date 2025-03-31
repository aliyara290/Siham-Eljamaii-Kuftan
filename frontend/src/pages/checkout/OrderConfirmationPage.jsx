// src/pages/checkout/OrderConfirmationPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import Heading from '../../components/heading/Heading';
import SubHeading from '../../components/heading/SubHeading';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { orderId, amount } = location.state || {};
  
  // Generate a random order number if not provided
  const orderNumber = orderId 
    ? orderId.slice(-8).toUpperCase() 
    : `ORD${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  // Format price with commas
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  return (
    <ConfirmationPageContainer>
      <ConfirmationContentWrapper>
        <SuccessIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </SuccessIcon>
        
        <Heading title="تم تأكيد طلبك بنجاح!" weight={600} />
        <SubHeading 
          title="شكراً لطلبك. سنقوم بمعالجته في أسرع وقت ممكن." 
          size="lg" 
        />
        
        <OrderDetailsCard>
          <OrderInfoSection>
            <OrderInfoTitle>معلومات الطلب</OrderInfoTitle>
            <OrderInfoItem>
              <OrderInfoLabel>رقم الطلب:</OrderInfoLabel>
              <OrderInfoValue>{orderNumber}</OrderInfoValue>
            </OrderInfoItem>
            <OrderInfoItem>
              <OrderInfoLabel>تاريخ الطلب:</OrderInfoLabel>
              <OrderInfoValue>{new Date().toLocaleDateString('ar-MA')}</OrderInfoValue>
            </OrderInfoItem>
            <OrderInfoItem>
              <OrderInfoLabel>الإجمالي:</OrderInfoLabel>
              <OrderInfoValue>{formatPrice(amount)} د.م</OrderInfoValue>
            </OrderInfoItem>
            <OrderInfoItem>
              <OrderInfoLabel>طريقة الدفع:</OrderInfoLabel>
              <OrderInfoValue>بطاقة ائتمان</OrderInfoValue>
            </OrderInfoItem>
          </OrderInfoSection>
          
          <OrderStatusSection>
            <OrderStatusTitle>حالة الطلب</OrderStatusTitle>
            <OrderStatusTracker>
              <StatusStep completed>
                <StatusDot />
                <StatusLabel>تم تأكيد الطلب</StatusLabel>
              </StatusStep>
              <StatusStep>
                <StatusDot />
                <StatusLabel>قيد المعالجة</StatusLabel>
              </StatusStep>
              <StatusStep>
                <StatusDot />
                <StatusLabel>تم الشحن</StatusLabel>
              </StatusStep>
              <StatusStep>
                <StatusDot />
                <StatusLabel>تم التسليم</StatusLabel>
              </StatusStep>
            </OrderStatusTracker>
          </OrderStatusSection>
        </OrderDetailsCard>
        
        <WhatsNextSection>
          <WhatsNextTitle>ماذا بعد؟</WhatsNextTitle>
          <WhatsNextSteps>
            <WhatsNextStep>
              <StepNumber>1</StepNumber>
              <StepContent>
                <StepTitle>سنقوم بتجهيز طلبك</StepTitle>
                <StepDescription>
                  سيقوم فريقنا بتجهيز طلبك ومراجعته للتأكد من جودة المنتجات قبل شحنها.
                </StepDescription>
              </StepContent>
            </WhatsNextStep>
            
            <WhatsNextStep>
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>سنرسل لك تأكيدًا بالبريد الإلكتروني</StepTitle>
                <StepDescription>
                  ستتلقى رسالة بريد إلكتروني تحتوي على تفاصيل طلبك ورقم التتبع عند شحن الطلب.
                </StepDescription>
              </StepContent>
            </WhatsNextStep>
            
            <WhatsNextStep>
              <StepNumber>3</StepNumber>
              <StepContent>
                <StepTitle>تابع حالة طلبك</StepTitle>
                <StepDescription>
                  يمكنك متابعة حالة طلبك في أي وقت من خلال "حسابي" على موقعنا.
                </StepDescription>
              </StepContent>
            </WhatsNextStep>
          </WhatsNextSteps>
        </WhatsNextSection>
        
        <ActionButtons>
          <ContinueShoppingButton to="/collections">
            متابعة التسوق
          </ContinueShoppingButton>
          <ViewOrderButton to="/account/orders">
            عرض الطلبات
          </ViewOrderButton>
        </ActionButtons>
        
        <SupportSection>
          <SupportTitle>هل تحتاج إلى مساعدة؟</SupportTitle>
          <SupportText>
            إذا كان لديك أي استفسار بخصوص طلبك، يرجى التواصل مع فريق خدمة العملاء لدينا.
          </SupportText>
          <SupportButton to="/contact">
            تواصل مع خدمة العملاء
          </SupportButton>
        </SupportSection>
      </ConfirmationContentWrapper>
    </ConfirmationPageContainer>
  );
};

export default OrderConfirmationPage;

// Styled Components
const ConfirmationPageContainer = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const ConfirmationContentWrapper = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: var(--success-100);
  color: var(--success-500);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2.5rem;
`;

const OrderDetailsCard = styled.div`
  margin: 4rem 0;
  border: 1px solid var(--neutral-200);
  border-radius: 0.5rem;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  text-align: right;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderInfoTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--neutral-200);
`;

const OrderInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderInfoLabel = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-700);
`;

const OrderInfoValue = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-900);
`;

const OrderStatusSection = styled.div``;

const OrderStatusTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--neutral-200);
`;

const OrderStatusTracker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StatusStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 1.2rem;
    right: 0.6rem;
    width: 2px;
    height: calc(100% + 1.5rem);
    background-color: ${({ completed }) => completed ? 'var(--success-500)' : 'var(--neutral-300)'};
  }
`;

const StatusDot = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ completed }) => completed ? 'var(--success-500)' : 'var(--neutral-300)'};
`;

const StatusLabel = styled.span`
  font-size: var(--text-md);
  color: ${({ completed }) => completed ? 'var(--success-500)' : 'var(--neutral-600)'};
  font-weight: ${({ completed }) => completed ? '600' : '400'};
`;

const WhatsNextSection = styled.section`
  margin: 5rem 0;
  text-align: right;
`;

const WhatsNextTitle = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 3rem;
  text-align: center;
`;

const WhatsNextSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const WhatsNextStep = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

const StepNumber = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-lg);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  font-size: var(--text-md);
  line-height: 1.6;
  color: var(--neutral-700);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 4rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ContinueShoppingButton = styled(Link)`
  padding: 1.5rem 3rem;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-800);
  }
`;

const ViewOrderButton = styled(Link)`
  padding: 1.5rem 3rem;
  background-color: var(--white);
  color: var(--neutral-900);
  font-size: var(--text-md);
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--neutral-900);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`;

const SupportSection = styled.section`
  background-color: var(--neutral-50);
  padding: 3rem;
  border-radius: 0.5rem;
  margin-top: 5rem;
`;

const SupportTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 1.5rem;
`;

const SupportText = styled.p`
  font-size: var(--text-md);
  line-height: 1.6;
  color: var(--neutral-700);
  margin-bottom: 2rem;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
`;

const SupportButton = styled(Link)`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  background-color: var(--neutral-200);
  color: var(--neutral-900);
  font-size: var(--text-md);
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-300);
  }
`;