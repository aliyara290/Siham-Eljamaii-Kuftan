import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../../components/heading/Heading";
import SubHeading from "../../components/heading/SubHeading";
import { postRequest } from "../../api/contact";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "الرجاء إدخال الاسم";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "الرجاء إدخال البريد الإلكتروني";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "الرجاء إدخال رسالتك";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // setTimeout(() => {
      //   setIsSubmitting(false);
      //   setSubmitSuccess(true);
        
      //   setFormData({
      //     name: "",
      //     email: "",
      //     phone: "",
      //     subject: "",
      //     message: "",
      //   });
        
      //   setTimeout(() => {
      //     setSubmitSuccess(false);
      //   }, 5000);
      // }, 1500);

      postRequest(formData)
      .then((res) => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        console.log("Form submitted successfully:", res.data);
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error("Error submitting form:", err);
      });
    }
  };

  return (
    <StyledContactPage>
      <StyledContactContent>
        <StyledPageHeader>
          <Heading title="اتصل بنا" weight={500} />
          <SubHeading 
            title="نحن هنا للإجابة على استفساراتك ومساعدتك في كل ما تحتاج"
            size="lg" 
          />
        </StyledPageHeader>
        
        <StyledContactInfoSection>
          <ContactInfoContainer>
            <ContactInfoTitle>معلومات التواصل</ContactInfoTitle>
            <ContactInfoList>
              <ContactInfoItem>
                <ContactIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </ContactIcon>
                <ContactInfoContent>
                  <ContactInfoLabel>رقم الهاتف</ContactInfoLabel>
                  <ContactInfoValue>+212 520 123456</ContactInfoValue>
                </ContactInfoContent>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </ContactIcon>
                <ContactInfoContent>
                  <ContactInfoLabel>البريد الإلكتروني</ContactInfoLabel>
                  <ContactInfoValue>info@siham-kuftan.com</ContactInfoValue>
                </ContactInfoContent>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </ContactIcon>
                <ContactInfoContent>
                  <ContactInfoLabel>العنوان</ContactInfoLabel>
                  <ContactInfoValue>
                    شارع محمد الخامس، حي الرياض
                    <br />
                    الرباط، المغرب
                  </ContactInfoValue>
                </ContactInfoContent>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </ContactIcon>
                <ContactInfoContent>
                  <ContactInfoLabel>ساعات العمل</ContactInfoLabel>
                  <ContactInfoValue>
                    الأحد - الخميس: 9 صباحًا - 6 مساءً
                    <br />
                    السبت: 10 صباحًا - 5 مساءً
                    <br />
                    الجمعة: مغلق
                  </ContactInfoValue>
                </ContactInfoContent>
              </ContactInfoItem>
            </ContactInfoList>
            
            <SocialMediaContainer>
              <SocialMediaTitle>تابعنا على</SocialMediaTitle>
              <SocialMediaLinks>
                <SocialMediaLink href="#" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </SocialMediaLink>
                
                <SocialMediaLink href="#" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </SocialMediaLink>
                
                <SocialMediaLink href="#" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4c5 0 5 7 9 7"></path>
                  </svg>
                </SocialMediaLink>
                
                <SocialMediaLink href="#" aria-label="Pinterest">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="21" x2="16" y2="3"></line>
                    <line x1="16" y1="21" x2="8" y2="3"></line>
                    <circle cx="8" cy="3" r="3"></circle>
                    <circle cx="8" cy="21" r="3"></circle>
                    <circle cx="16" cy="3" r="3"></circle>
                    <circle cx="16" cy="21" r="3"></circle>
                  </svg>
                </SocialMediaLink>
              </SocialMediaLinks>
            </SocialMediaContainer>
          </ContactInfoContainer>
          
          <ContactFormContainer>
            <ContactFormTitle>نموذج التواصل</ContactFormTitle>
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">الإسم الكامل *</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                {errors.name && <FormError>{errors.name}</FormError>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="email">البريد الإلكتروني *</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                {errors.email && <FormError>{errors.email}</FormError>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="phone">رقم الهاتف</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="subject">الموضوع</FormLabel>
                <FormSelect
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option disabled selected>اختر الموضوع</option>
                  <option value="general">استفسار عام</option>
                  <option value="personal">طلب خاص</option>
                  <option value="orders">استفسار عن المنتجات</option>
                  <option value="products">استفسار عن الطلب</option>
                  <option value="shipping">استفسار عن الشحن</option>
                  <option value="other">موضوع آخر</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="message">الرسالة *</FormLabel>
                <FormTextarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                ></FormTextarea>
                {errors.message && <FormError>{errors.message}</FormError>}
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال"}
              </SubmitButton>
              
              {submitSuccess && (
                <SuccessMessage>
                  تم إرسال رسالتك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن.
                </SuccessMessage>
              )}
            </ContactForm>
          </ContactFormContainer>
        </StyledContactInfoSection>
        
        <MapSection>
          <MapTitle>موقعنا</MapTitle>
          <MapContainer>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13403.569172545909!2d-6.8419368758734615!3d33.96959076848388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76ce7f9326039%3A0x74ddc92384dfa13!2sHay%20Riad%2C%20Rabat%2C%20Morocco!5e0!3m2!1sen!2sus!4v1711847042414!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع متجر سهام كفتان"
            ></iframe>
          </MapContainer>
        </MapSection>
        
        <FAQSection>
          <Heading title="أسئلة شائعة" weight={500} />
          <FAQContainer>
            <FAQItem>
              <FAQQuestion>هل يمكنني زيارة المعرض الخاص بكم؟</FAQQuestion>
              <FAQAnswer>
                نعم، يمكنك زيارة معرضنا في الرباط، حي الرياض. نرحب بالزيارات من الأحد إلى الخميس من الساعة 9 صباحًا حتى 6 مساءً، ويوم السبت من 10 صباحًا حتى 5 مساءً. للحصول على تجربة أفضل، ننصح بتحديد موعد مسبق خاصة للقياسات والاستشارات الشخصية.
              </FAQAnswer>
            </FAQItem>
            
            <FAQItem>
              <FAQQuestion>كم تستغرق عملية التصميم حسب الطلب؟</FAQQuestion>
              <FAQAnswer>
                تستغرق عملية التصميم حسب الطلب عادة من 3 إلى 6 أسابيع، اعتمادًا على تعقيد التصميم وتفاصيل التطريز والتزيين. للمناسبات الخاصة مثل الأعراس، ننصح بالطلب قبل 2-3 أشهر على الأقل من الموعد المحدد.
              </FAQAnswer>
            </FAQItem>
            
            <FAQItem>
              <FAQQuestion>هل تقدمون خدمات الشحن الدولي؟</FAQQuestion>
              <FAQAnswer>
                نعم، نقدم خدمات الشحن الدولي إلى معظم دول العالم. تختلف أسعار وأوقات التوصيل حسب الوجهة. للحصول على تفاصيل أكثر، يرجى الاطلاع على صفحة "الشحن والتوصيل" أو التواصل معنا مباشرة.
              </FAQAnswer>
            </FAQItem>
          </FAQContainer>
        </FAQSection>
      </StyledContactContent>
    </StyledContactPage>
  );
};

export default ContactPage;

// Styled Components
const StyledContactPage = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const StyledContactContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StyledPageHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  
  &::after {
    content: '';
    display: block;
    width: 6rem;
    height: 2px;
    background-color: var(--neutral-300);
    margin: 2rem auto 0;
  }
`;

const StyledContactInfoSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 6rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoContainer = styled.div`
  background-color: var(--neutral-100);
  padding: 3rem;
  border-radius: 0.5rem;
  height: max-content;
`;

const ContactInfoTitle = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2.5rem;
  
  &::after {
    content: '';
    display: block;
    width: 4rem;
    height: 2px;
    background-color: var(--neutral-400);
    margin-top: 1rem;
  }
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 3rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ContactIcon = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  background-color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-700);
  flex-shrink: 0;
`;

const ContactInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactInfoLabel = styled.span`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
`;

const ContactInfoValue = styled.span`
  font-size: var(--text-md);
  line-height: 1.6;
  color: var(--neutral-700);
`;

const SocialMediaContainer = styled.div`
  border-top: 1px solid var(--neutral-300);
  padding-top: 2.5rem;
`;

const SocialMediaTitle = styled.h4`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 1.5rem;
`;

const SocialMediaLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialMediaLink = styled.a`
  width: 4rem;
  height: 4rem;
  background-color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-700);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-900);
    color: var(--white);
    transform: translateY(-3px);
  }
`;

const ContactFormContainer = styled.div`
  background-color: var(--white);
  border: 1px solid var(--neutral-200);
  border-radius: 0.5rem;
  padding: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
`;

const ContactFormTitle = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2.5rem;
  
  &::after {
    content: '';
    display: block;
    width: 4rem;
    height: 2px;
    background-color: var(--neutral-400);
    margin-top: 1rem;
  }
`;

const ContactForm = styled.form`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  
  &:nth-child(5) {
    grid-column: 1 / span 2;
    
    @media (max-width: 768px) {
      grid-column: 1;
    }
  }
`;

const FormLabel = styled.label`
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--neutral-800);
`;

const FormInput = styled.input`
  height: 4.5rem;
  padding: 0 1.5rem;
  font-size: var(--text-md);
  color: var(--neutral-800);
  background-color: var(--neutral-50);
  border: 1px solid ${props => props.error ? 'var(--danger-500)' : 'var(--neutral-300)'};
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

const FormTextarea = styled.textarea`
  padding: 1.5rem;
  font-size: var(--text-md);
  color: var(--neutral-800);
  background-color: var(--neutral-50);
  border: 1px solid ${props => props.error ? 'var(--danger-500)' : 'var(--neutral-300)'};
  border-radius: 0.3rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--neutral-600);
    background-color: var(--white);
  }
`;

const FormError = styled.span`
  font-size: var(--text-sm);
  color: var(--danger-500);
`;

const SubmitButton = styled.button`
  height: 4.5rem;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  grid-column: 1 / span 2;
  
  &:hover {
    background-color: var(--neutral-800);
  }
  
  &:disabled {
    background-color: var(--neutral-400);
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const SuccessMessage = styled.div`
  grid-column: 1 / span 2;
  padding: 1.5rem;
  background-color: #f0fff4;
  border: 1px solid #68d391;
  color: #2f855a;
  font-size: var(--text-md);
  border-radius: 0.3rem;
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const MapSection = styled.section`
  margin-bottom: 6rem;
`;

const MapTitle = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2rem;
  text-align: center;
`;

const MapContainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--neutral-200);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
`;

const FAQSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const FAQContainer = styled.div`
  max-width: 80rem;
  margin: 4rem auto 0;
  text-align: right;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid var(--neutral-200);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const FAQQuestion = styled.h4`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 1.5rem;
  position: relative;
  padding-right: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: var(--neutral-900);
  }
`;

const FAQAnswer = styled.p`
  font-size: var(--text-md);
  line-height: 1.7;
  color: var(--neutral-700);
`;