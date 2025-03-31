// src/pages/checkout/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import Heading from '../../components/heading/Heading';
import SubHeading from '../../components/heading/SubHeading';
import { createPaymentIntent, processPayment } from '../../services/stripeService';

// You should replace this with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

// Card Element styling options
const cardElementOptions = {
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
  hidePostalCode: true,
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
  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    if (Object.values(billingDetails).some(value => !value)) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    try {
      // Process payment with Stripe
      const result = await processPayment(stripe, elements, clientSecret, billingDetails);
      
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
          }, 2000);
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
      <CheckoutSections>
        <CheckoutSection>
          <SectionTitle>معلومات الفوترة والشحن</SectionTitle>
          
          <FormRow>
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
          </FormRow>
          
          <FormRow>
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
          </FormRow>
          
          <FormRow>
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
          </FormRow>
          
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
          
          <FormRow>
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
          </FormRow>
          
          <SectionTitle>طريقة الشحن</SectionTitle>
          
          <ShippingOptions>
            <ShippingOption>
              <ShippingRadio
                type="radio"
                id="standard"
                name="shippingMethod"
                value="standard"
                checked={shippingMethod === 'standard'}
                onChange={() => setShippingMethod('standard')}
              />
              <ShippingLabel htmlFor="standard">
                <ShippingName>شحن قياسي</ShippingName>
                <ShippingDetails>
                  <ShippingTime>3-5 أيام عمل</ShippingTime>
                  <ShippingPrice>50 د.م</ShippingPrice>
                </ShippingDetails>
              </ShippingLabel>
            </ShippingOption>
            
            <ShippingOption>
              <ShippingRadio
                type="radio"
                id="express"
                name="shippingMethod"
                value="express"
                checked={shippingMethod === 'express'}
                onChange={() => setShippingMethod('express')}
              />
              <ShippingLabel htmlFor="express">
                <ShippingName>شحن سريع</ShippingName>
                <ShippingDetails>
                  <ShippingTime>1-2 يوم عمل</ShippingTime>
                  <ShippingPrice>150 د.م</ShippingPrice>
                </ShippingDetails>
              </ShippingLabel>
            </ShippingOption>
            
            <ShippingOption>
              <ShippingRadio
                type="radio"
                id="nextDay"
                name="shippingMethod"
                value="nextDay"
                checked={shippingMethod === 'nextDay'}
                onChange={() => setShippingMethod('nextDay')}
              />
              <ShippingLabel htmlFor="nextDay">
                <ShippingName>توصيل في اليوم التالي</ShippingName>
                <ShippingDetails>
                  <ShippingTime>يوم عمل واحد (المدن الرئيسية فقط)</ShippingTime>
                  <ShippingPrice>250 د.م</ShippingPrice>
                </ShippingDetails>
              </ShippingLabel>
            </ShippingOption>
          </ShippingOptions>
        </CheckoutSection>
        
        <CheckoutSection>
          <SectionTitle>ملخص الطلب</SectionTitle>
          
          <OrderSummary>
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
                  </ItemDetails>
                  <ItemPrice>{formatPrice(item.price * item.quantity)} د.م</ItemPrice>
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
          </OrderSummary>
          
          <SectionTitle>طريقة الدفع</SectionTitle>
          
          <PaymentMethod>
            <CardElementContainer>
              <CardElement options={cardElementOptions} />
            </CardElementContainer>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>تمت عملية الدفع بنجاح!</SuccessMessage>}
            
            <PayButton type="submit" disabled={processing || !stripe}>
              {processing ? 'جاري المعالجة...' : `إتمام الدفع - ${formatPrice(totalAmount)} د.م`}
            </PayButton>
            
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
      </CheckoutSections>
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
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const CheckoutContentWrapper = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CheckoutFormContainer = styled.form`
  margin-top: 4rem;
`;

const CheckoutSections = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutSection = styled.section`
  background-color: var(--white);
  padding: 3rem;
  border: 1px solid var(--neutral-200);
  border-radius: 0.5rem;
`;

const SectionTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--neutral-200);
  
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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
  align-items: center;
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
  cursor: pointer;
`;

const ShippingLabel = styled.label`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ShippingName = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
`;

const ShippingDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const ShippingTime = styled.span`
  font-size: var(--text-sm);
  color: var(--neutral-600);
`;

const ShippingPrice = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const SummaryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 30rem;
  overflow-y: auto;
  padding-right: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 7rem;
  height: 7rem;
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
  width: 2.2rem;
  height: 2.2rem;
  background-color: var(--neutral-900);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: 600;
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
`;

const SummaryTotals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 1px solid var(--neutral-200);
  padding-top: 2rem;
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
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--neutral-200);
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

const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CardElementContainer = styled.div`
  border: 1px solid var(--neutral-300);
  padding: 1.5rem;
  border-radius: 0.3rem;
  background-color: var(--white);
`;

const ErrorMessage = styled.div`
  color: var(--danger-500);
  font-size: var(--text-md);
  background-color: var(--danger-100);
  padding: 1.2rem;
  border-radius: 0.3rem;
`;

const SuccessMessage = styled.div`
  color: var(--success-500);
  font-size: var(--text-md);
  background-color: var(--success-100);
  padding: 1.2rem;
  border-radius: 0.3rem;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 1.5rem 0;
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
`;

const SecurePaymentNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--neutral-600);
  font-size: var(--text-sm);
`;

const PaymentLogos = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  img {
    height: 2.5rem;
    object-fit: contain;
  }
`;