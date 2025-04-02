const CardNumberWrapper = styled.div`
  border: 1px solid var(--neutral-300);
  padding: 1.2rem;
  border-radius: 0.3rem;
  background-color: var(--white);
  transition: all 0.3s ease;
  position: relative;
  
  &:focus-within {
    border-color: var(--neutral-600);
    box-shadow: 0 0 0 1px var(--neutral-300);
  }
`;

const CardBrandIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  height: 24px;
  
  img, span {
    height: 100%;
    display: block;
  }
  
  span {
    font-size: var(--text-sm);
    font-weight: 600;
    line-height: 24px;
    color: var(--neutral-700);
  }
`;// src/pages/checkout/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement,
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import Heading from '../../components/heading/Heading';
import SubHeading from '../../components/heading/SubHeading';
import { createPaymentIntent, processPayment } from '../../services/stripeService';

// You should replace this with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51LD5WRCy79QTCK5xftENUau7DL8Y4VzLEgSe0vF4PaCtLoZBhmGnWCZAmymqPvXRAExDbueXRmRClGKnhKZp20Nj00SDb3HI9M');

// Card Element styling options
const cardElementStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Almarai", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

// Checkout form component
const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'MA', // Default to Morocco
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment
  const [cardBrand, setCardBrand] = useState(null);

  // Handle card brand change
  const handleCardBrandChange = (event) => {
    if (event.brand && event.brand !== 'unknown') {
      setCardBrand(event.brand);
    } else {
      setCardBrand(null);
    }
  };
  
  // Calculate shipping cost based on the selected method
  const shippingCost = shippingMethod === 'express' ? 150 : shippingMethod === 'nextDay' ? 250 : 50;
  
  // Total cost including shipping
  const totalAmount = cart.totalPrice + shippingCost;
  
  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Fetch shipping methods
  const [shippingMethods, setShippingMethods] = useState([
    { id: 'standard', name: 'شحن قياسي', price: 50, deliveryTime: '3-5 أيام عمل' },
    { id: 'express', name: 'شحن سريع', price: 150, deliveryTime: '1-2 يوم عمل' },
    { id: 'nextDay', name: 'توصيل في اليوم التالي', price: 250, deliveryTime: 'يوم عمل واحد (المدن الرئيسية فقط)' }
  ]);

  // Fetch available shipping methods
  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const methods = await CheckoutService.getShippingMethods();
        if (methods && methods.length > 0) {
          setShippingMethods(methods);
          setShippingMethod(methods[0].id); // Set first method as default
        }
      } catch (error) {
        console.error('Error fetching shipping methods:', error);
        // Keep using the default shipping methods defined above
      }
    };

    fetchShippingMethods();
  }, []);

  // Create payment intent when the component mounts
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        if (cart.items.length === 0) {
          navigate('/cart');
          return;
        }
        
        const response = await createPaymentIntent(cart.items, {
          amount: totalAmount,
          currency: 'mad', // Moroccan Dirham
          shipping_method: shippingMethod
        });
        
        if (response && response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          throw new Error('No client secret returned');
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
        setError('حدث خطأ أثناء تجهيز عملية الدفع. يرجى المحاولة مرة أخرى.');
      }
    };
    
    if (cart.items.length > 0) {
      fetchPaymentIntent();
    }
  }, [cart.items, totalAmount, shippingMethod, navigate]);
  
  const goToNextStep = () => {
    if (
      !billingDetails.name ||
      !billingDetails.email ||
      !billingDetails.phone ||
      !billingDetails.address ||
      !billingDetails.city ||
      !billingDetails.postalCode ||
      !billingDetails.country
    ) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    
    setError(null);
    setCurrentStep(2);
    
    // Scroll to top on mobile
    window.scrollTo(0, 0);
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(1);
    setError(null);
    
    // Scroll to top on mobile
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    try {
      // Process payment with Stripe
      const result = await processPayment(stripe, elements, clientSecret, billingDetails);
      
      // NOTE: The processPayment function needs to be updated to handle the separate card elements
      // instead of a single CardElement. For example:
      /*
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: billingDetails
        }
      });
      */
      
      if (result.error) {
        setError(result.error.message);
      } else if (result.success) {
        // Create order in our database
        const orderData = {
          payment_intent_id: result.paymentIntent.id,
          payment_method: 'card',
          shipping_method: shippingMethod,
          subtotal: cart.totalPrice,
          shipping_cost: shippingCost,
          total: totalAmount,
          customer_info: billingDetails,
          items: cart.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
            options: {
              color: item.selectedColor,
              size: item.selectedSize
            }
          }))
        };
        
        try {
          // Create order in our backend
          const order = await createOrder(orderData);
          
          setSuccess(true);
          clearCart();
          
          // Navigate to confirmation page
          setTimeout(() => {
            navigate('/order-confirmation', { 
              state: { 
                orderId: order.id || result.paymentIntent.id,
                orderNumber: order.order_number,
                amount: totalAmount 
              } 
            });
          }, 1500);
        } catch (orderError) {
          console.error('Error creating order:', orderError);
          
          // Even if there's an error creating the order in our database,
          // the payment was successful with Stripe, so redirect to confirmation
          setTimeout(() => {
            navigate('/order-confirmation', { 
              state: { 
                orderId: result.paymentIntent.id,
                amount: totalAmount 
              } 
            });
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.');
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <CheckoutFormContainer onSubmit={handleSubmit}>
      
      <CheckoutSteps>
        <StepsTracker>
          <StepIndicator active={currentStep === 1}>
            <StepNumber active={currentStep === 1}>1</StepNumber>
            <StepName>الشحن والعنوان</StepName>
          </StepIndicator>
          <StepDivider completed={currentStep > 1} />
          <StepIndicator active={currentStep === 2}>
            <StepNumber active={currentStep === 2}>2</StepNumber>
            <StepName>الدفع</StepName>
          </StepIndicator>
        </StepsTracker>
      </CheckoutSteps>
      
      {currentStep === 1 ? (
        // Step 1: Shipping information
        <ShippingSection>
          <CheckoutSection>
            <SectionTitle>معلومات الفوترة والشحن</SectionTitle>
            
            <FormGroup>
              <FormLabel htmlFor="name">الاسم الكامل *</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">البريد الإلكتروني *</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="phone">رقم الهاتف *</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={billingDetails.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="address">العنوان *</FormLabel>
              <FormInput
                type="text"
                id="address"
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="city">المدينة *</FormLabel>
                <FormInput
                  type="text"
                  id="city"
                  name="city"
                  value={billingDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="postalCode">الرمز البريدي *</FormLabel>
                <FormInput
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={billingDetails.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel htmlFor="country">البلد *</FormLabel>
              <FormSelect
                id="country"
                name="country"
                value={billingDetails.country}
                onChange={handleInputChange}
                required
              >
                <option value="MA">المغرب</option>
                <option value="DZ">الجزائر</option>
                <option value="TN">تونس</option>
                <option value="EG">مصر</option>
                <option value="SA">المملكة العربية السعودية</option>
                <option value="AE">الإمارات العربية المتحدة</option>
                <option value="FR">فرنسا</option>
                <option value="US">الولايات المتحدة</option>
              </FormSelect>
            </FormGroup>
            
            <SectionTitle>طريقة الشحن</SectionTitle>
            
            <ShippingOptions>
              {shippingMethods.map((method) => (
                <ShippingOption key={method.id}>
                  <ShippingRadio
                    type="radio"
                    id={method.id}
                    name="shippingMethod"
                    value={method.id}
                    checked={shippingMethod === method.id}
                    onChange={() => setShippingMethod(method.id)}
                  />
                  <ShippingLabel htmlFor={method.id}>
                    <div>
                      <ShippingName>{method.name}</ShippingName>
                      <ShippingTime>{method.deliveryTime}</ShippingTime>
                    </div>
                    <ShippingPrice>{formatPrice(method.price)} د.م</ShippingPrice>
                  </ShippingLabel>
                </ShippingOption>
              ))}
            </ShippingOptions>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <ContinueButton type="button" onClick={goToNextStep}>
              المتابعة إلى الدفع
            </ContinueButton>
          </CheckoutSection>
          
          <MobileOrderSummary>
            <SectionTitle>ملخص الطلب</SectionTitle>
            
            <SummaryItems>
              {cart.items.map((item) => (
                <SummaryItem key={item.cartItemId}>
                  <ItemImageContainer>
                    <ItemQuantity>{item.quantity}</ItemQuantity>
                    <ItemImage src={item.image} alt={item.name} />
                  </ItemImageContainer>
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    {item.selectedSize && <ItemOption>المقاس: {item.selectedSize}</ItemOption>}
                    {item.selectedColor && <ItemOption>اللون: {item.selectedColor}</ItemOption>}
                    <ItemPrice>{formatPrice(item.price * item.quantity)} د.م</ItemPrice>
                  </ItemDetails>
                </SummaryItem>
              ))}
            </SummaryItems>
            
            <SummaryTotals>
              <SummaryRow>
                <SummaryLabel>المجموع الفرعي:</SummaryLabel>
                <SummaryValue>{formatPrice(cart.totalPrice)} د.م</SummaryValue>
              </SummaryRow>
              
              <SummaryRow>
                <SummaryLabel>الشحن:</SummaryLabel>
                <SummaryValue>{formatPrice(shippingCost)} د.م</SummaryValue>
              </SummaryRow>
              
              <SummaryTotal>
                <SummaryTotalLabel>الإجمالي:</SummaryTotalLabel>
                <SummaryTotalValue>{formatPrice(totalAmount)} د.م</SummaryTotalValue>
              </SummaryTotal>
            </SummaryTotals>
          </MobileOrderSummary>
        </ShippingSection>
      ) : (
        // Step 2: Payment information
        <PaymentSection>
          <CheckoutSection>
            <SectionTitle>طريقة الدفع</SectionTitle>
            
            <OrderSummaryCard>
              <SummaryRow>
                <SummaryLabel>المجموع الفرعي:</SummaryLabel>
                <SummaryValue>{formatPrice(cart.totalPrice)} د.م</SummaryValue>
              </SummaryRow>
              
              <SummaryRow>
                <SummaryLabel>الشحن ({shippingMethods.find(m => m.id === shippingMethod)?.name}):</SummaryLabel>
                <SummaryValue>{formatPrice(shippingCost)} د.م</SummaryValue>
              </SummaryRow>
              
              <SummaryTotal>
                <SummaryTotalLabel>الإجمالي:</SummaryTotalLabel>
                <SummaryTotalValue>{formatPrice(totalAmount)} د.م</SummaryTotalValue>
              </SummaryTotal>
            </OrderSummaryCard>
            
            <PaymentMethod>
              <CardSectionTitle>تفاصيل البطاقة</CardSectionTitle>
              
              <CardInputGroup>
                <CardInputLabel>رقم البطاقة</CardInputLabel>
                <CardNumberWrapper>
                  <CardNumberElement 
                    options={cardElementStyle} 
                    onChange={handleCardBrandChange}
                  />
                  {cardBrand && (
                    <CardBrandIcon>
                      {cardBrand === 'visa' && <img src="/assets/images/pay/visa.svg" alt="Visa" />}
                      {cardBrand === 'mastercard' && <img src="/assets/images/pay/mastercard.svg" alt="Mastercard" />}
                      {cardBrand === 'amex' && <img src="/assets/images/pay/american-ex.svg" alt="American Express" />}
                      {cardBrand === 'discover' && <span>Discover</span>}
                      {cardBrand === 'diners' && <span>Diners</span>}
                      {cardBrand === 'jcb' && <span>JCB</span>}
                      {cardBrand === 'unionpay' && <span>UnionPay</span>}
                    </CardBrandIcon>
                  )}
                </CardNumberWrapper>
              </CardInputGroup>
              
              <CardInputRow>
                <CardInputGroup>
                  <CardInputLabel>تاريخ الانتهاء</CardInputLabel>
                  <CardInputWrapper>
                    <CardExpiryElement options={cardElementStyle} />
                  </CardInputWrapper>
                </CardInputGroup>
                
                <CardInputGroup>
                  <CardInputLabel>رمز الأمان (CVC)</CardInputLabel>
                  <CardInputWrapper>
                    <CardCvcElement options={cardElementStyle} />
                  </CardInputWrapper>
                </CardInputGroup>
              </CardInputRow>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>تمت عملية الدفع بنجاح!</SuccessMessage>}
              
              <PaymentActions>
                <BackButton type="button" onClick={goToPreviousStep}>
                  العودة
                </BackButton>
                <PayButton type="submit" disabled={processing || !stripe}>
                  {processing ? 'جاري المعالجة...' : `إتمام الدفع - ${formatPrice(totalAmount)} د.م`}
                </PayButton>
              </PaymentActions>
              
              <SecurePaymentNotice>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>جميع المعاملات مشفرة وآمنة</span>
              </SecurePaymentNotice>
              
              <PaymentLogos>
                <img src="/assets/images/pay/visa.svg" alt="Visa" />
                <img src="/assets/images/pay/mastercard.svg" alt="Mastercard" />
                <img src="/assets/images/pay/american-ex.svg" alt="American Express" />
              </PaymentLogos>
            </PaymentMethod>
          </CheckoutSection>
        </PaymentSection>
      )}
    </CheckoutFormContainer>
  );
};

// Main Checkout Page component
const CheckoutPage = () => {
  return (
    <CheckoutPageContainer>
      <CheckoutContentWrapper>
        <Heading title="إتمام الطلب" weight={500} />
        <SubHeading title="أكمل معلومات الشحن والدفع لإتمام عملية الشراء" size="lg" />
        
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </CheckoutContentWrapper>
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;

// Styled Components
const CheckoutPageContainer = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 6rem;
  padding-bottom: 4rem;
  
  @media (min-width: 768px) {
    padding-top: 12rem;
    padding-bottom: 6rem;
  }
`;

const CheckoutContentWrapper = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const CheckoutFormContainer = styled.form`
  margin-top: 3rem;
  
  @media (min-width: 768px) {
    margin-top: 4rem;
  }
`;

const CheckoutSummaryPreview = styled.div`
  display: none;
`;

const CheckoutSteps = styled.div`
  margin: 2rem 0;
  
  @media (min-width: 768px) {
    margin: 2rem 0 3rem;
  }
`;

const StepsTracker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  opacity: ${props => props.active ? 1 : 0.6};
  
  ${props => props.active ? 'transform: scale(1.05);' : ''}
`;

const StepNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? 'var(--neutral-900)' : 'var(--neutral-300)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--neutral-700)'};
  font-weight: 600;
`;

const StepName = styled.span`
  font-size: var(--text-sm);
  color: var(--neutral-700);
  
  @media (min-width: 768px) {
    font-size: var(--text-md);
  }
`;

const StepDivider = styled.div`
  height: 1px;
  width: 5rem;
  background-color: ${props => props.completed ? 'var(--neutral-900)' : 'var(--neutral-300)'};
  margin: 0 1rem;
  
  @media (min-width: 768px) {
    width: 8rem;
  }
`;

const ShippingSection = styled.div`

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
  }
`;

const PaymentSection = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 60rem;
    margin: 0 auto;
    height: max-content;
  }
  
  @media (max-width: 1023px) {
    padding-top: 1rem;
  }
`;

const CheckoutSection = styled.section`
  background-color: var(--white);
  padding: 2rem;
  border: 1px solid var(--neutral-200);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    padding: 3rem;
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--neutral-200);
  
  &:not(:first-child) {
    margin-top: 3rem;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
    
    &:not(:first-child) {
      margin-top: 4rem;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
    margin-bottom: 2rem;
  }
  @media (max-width: 768px) {
   
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label`
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--neutral-700);
`;

const FormInput = styled.input`
  height: 4.5rem;
  padding: 0 1.5rem;
  font-size: var(--text-md);
  color: var(--neutral-800);
  background-color: var(--neutral-50);
  border: 1px solid var(--neutral-300);
  border-radius: 0.3rem;
  
  &:focus {
    outline: none;
    border-color: var(--neutral-600);
    background-color: var(--white);
  }
`;

const FormSelect = styled.select`
  height: 4.5rem;
  padding: 0 1.5rem;
  font-size: var(--text-md);
  color: var(--neutral-800);
  background-color: var(--neutral-50);
  border: 1px solid var(--neutral-300);
  border-radius: 0.3rem;
  
  &:focus {
    outline: none;
    border-color: var(--neutral-600);
    background-color: var(--white);
  }
`;

const ShippingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ShippingOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--neutral-300);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--neutral-600);
  }
`;

const ShippingRadio = styled.input`
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
  cursor: pointer;
`;

const ShippingLabel = styled.label`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const ShippingName = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  display: block;
  margin-bottom: 0.5rem;
`;

const ShippingTime = styled.span`
  font-size: var(--text-sm);
  color: var(--neutral-600);
  display: block;
`;

const ShippingPrice = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
`;

const MobileOrderSummary = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border: 1px solid var(--neutral-200);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    padding: 3rem;
    margin-bottom: 0;
  }
  
  @media (max-width: 1023px) {
    display: none;
  }
`;

const OrderSummaryCard = styled.div`
  background-color: var(--neutral-50);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--neutral-200);
`;

const SummaryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 20rem;
  overflow-y: auto;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
    max-height: 30rem;
    padding-right: 1rem;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
  
  @media (min-width: 768px) {
    width: 7rem;
    height: 7rem;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.3rem;
`;

const ItemQuantity = styled.span`
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
  width: 2rem;
  height: 2rem;
  background-color: var(--neutral-900);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: 600;
  
  @media (min-width: 768px) {
    width: 2.2rem;
    height: 2.2rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.span`
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--neutral-800);
`;

const ItemOption = styled.span`
  font-size: var(--text-sm);
  color: var(--neutral-600);
`;

const ItemPrice = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-top: auto;
`;

const SummaryTotals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-top: 1px solid var(--neutral-200);
  padding-top: 1.5rem;
  
  @media (min-width: 768px) {
    gap: 1.5rem;
    padding-top: 2rem;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-top: 0.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--neutral-200);
  
  @media (min-width: 768px) {
    margin-top: 1rem;
    padding-top: 1.5rem;
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

const ContinueButton = styled.button`
  width: 100%;
  padding: 1.2rem 0;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  
  &:hover:not(:disabled) {
    background-color: var(--neutral-800);
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const CardSectionTitle = styled.h4`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 1.5rem;
`;

const CardInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const CardInputLabel = styled.label`
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--neutral-700);
`;

const CardInputWrapper = styled.div`
  border: 1px solid var(--neutral-300);
  padding: 1.2rem;
  border-radius: 0.3rem;
  background-color: var(--white);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: var(--neutral-600);
    box-shadow: 0 0 0 1px var(--neutral-300);
  }
`;

const CardInputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const CardElementContainer = styled.div`
  // This is kept for reference but no longer used
  border: 1px solid var(--neutral-300);
  padding: 1.5rem;
  border-radius: 0.3rem;
  background-color: var(--white);
`;

const PaymentActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (min-width: 768px) {
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
`;

const BackButton = styled.button`
  padding: 1.2rem 0;
  background-color: var(--white);
  color: var(--neutral-800);
  font-size: var(--text-md);
  font-weight: 500;
  border: 1px solid var(--neutral-300);
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-100);
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const PayButton = styled.button`
  padding: 1.2rem 0;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--neutral-800);
  }
  
  &:disabled {
    background-color: var(--neutral-400);
    cursor: not-allowed;
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-500);
  font-size: var(--text-md);
  background-color: var(--danger-100);
  padding: 1.2rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  color: var(--success-500);
  font-size: var(--text-md);
  background-color: var(--success-100);
  padding: 1.2rem;
  border-radius: 0.3rem;
`;

const SecurePaymentNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--neutral-600);
  font-size: var(--text-sm);
  margin-top: 1rem;
`;

const PaymentLogos = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  margin-top: 0.5rem;
  
  img {
    height: 2rem;
    object-fit: contain;
    
    @media (min-width: 768px) {
      height: 2.5rem;
      gap: 1.5rem;
    }
  }
`;