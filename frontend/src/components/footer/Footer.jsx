
const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('العربية');

  const toggleLanguage = () => setLanguageOpen(!languageOpen);
  
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    setLanguageOpen(false);
  };

  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      // Check user's preferred color scheme
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    // Save the preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterColumn>
          <ColumnTitle>القائمة الرئيسية</ColumnTitle>
          <FooterLink to="/collection/kuftan">قفطان</FooterLink>
          <FooterLink to="/collection/jewelry">مجوهرات</FooterLink>
          <FooterLink to="/collection/jlaba">جلابة</FooterLink>
          <FooterLink to="/collections/bestseller">الأكثر مبيعاً</FooterLink>
          <FooterLink to="/collections/new">وصل حديثاً</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>الدعم والمساعدة</ColumnTitle>
          <FooterLink to="/faq">الأسئلة الشائعة</FooterLink>
          <FooterLink to="/shipping">الشحن والتوصيل</FooterLink>
          <FooterLink to="/returns">سياسة الإرجاع</FooterLink>
          <FooterLink to="/size-guide">دليل المقاسات</FooterLink>
          <FooterLink to="/contact">اتصل بنا</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>عن سهام</ColumnTitle>
          <FooterText>
            تجمع تصاميمنا بين التقاليد العريقة والروح المعاصرة، وتعكس الثقافة المغربية الغنية مع لمسة من الأناقة العصرية. كل قطعة تُصنع يدوياً لتكون فريدة من نوعها.
          </FooterText>
          <FooterText>
            نحرص على اختيار أفضل الأقمشة والخامات، ويتم التطريز والتفصيل بواسطة حرفيين موهوبين يستلهمون من التراث المغربي العريق مع إضافة لمسات عصرية تلبي احتياجات المرأة المعاصرة.
          </FooterText>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>تواصل معنا</ColumnTitle>
          <FooterText>
            الرباط، المغرب<br />
            هاتف: +212 520 123456<br />
            البريد الإلكتروني: info@siham-kuftan.com
          </FooterText>
          
          <SocialIcons>
            <SocialIconLink to="#" aria-label="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </SocialIconLink>
            
            {/* <SocialIconLink to="#" aria-label="Pinterest">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
                <path d="M12 2v1" />
                <path d="M12 21v1" />
                <path d="M4.93 4.93l.7.7" />
                <path d="M18.37 18.37l.7.7" />
                <path d="M2 12h1" />
                <path d="M21 12h1" />
                <path d="M4.93 19.07l.7-.7" />
                <path d="M18.37 5.63l.7-.7" />
              </svg>
            </SocialIconLink> */}
            
            <SocialIconLink to="#" aria-label="Facebook">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialIconLink>
            
            <SocialIconLink to="#" aria-label="TikTok">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
                <path d="M10 12a3 3 0 1 1-3 3V9m3 3V9m3-3v10a3 3 0 0 1-3 3H9" />
              </svg>
            </SocialIconLink>
          </SocialIcons>
          
          <ColumnTitle style={{ marginTop: '2rem' }}>طرق الدفع</ColumnTitle>
          <PaymentIcons>
            <img src="/assets/images/pay/visa.svg" alt="Visa" />
            <img src="/assets/images/pay/mastercard.svg" alt="Mastercard" />
            <img src="/assets/images/pay/american-ex.svg" alt="American Express" />
            <img src="/assets/images/pay/discover.svg" alt="Discover" />
            <img src="/assets/images/pay/d-club.svg" alt="D-Club" />
          </PaymentIcons>
        </FooterColumn>
      </FooterContainer>
      
      <FooterBottom>
        <Copyright>© {new Date().getFullYear()} سهام قفطان. جميع الحقوق محفوظة</Copyright>
        <FooterNav>
          {/* <FooterNavLink to="/privacy">سياسة الخصوصية</FooterNavLink>
          <FooterNavLink to="/terms">الشروط والأحكام</FooterNavLink>
          <FooterNavLink to="/sitemap">خريطة الموقع</FooterNavLink> */}
          <StyledLanguageDropdown>
            <StyledLanguageToggle onClick={toggleLanguage} type="button">
              <span>{currentLanguage}</span>
              <ChevronDownIcon 
                width={16} 
                height={16} 
                style={{ 
                  transform: languageOpen ? 'rotate(180deg)' : 'rotate(0)'
                }} 
              />
            </StyledLanguageToggle>
            <StyledLanguageList isOpen={languageOpen}>
              <StyledLanguageItem 
                className={currentLanguage === 'العربية' ? 'active' : ''}
                onClick={() => changeLanguage('العربية')}
                type="button"
              >
                العربية
              </StyledLanguageItem>
              <StyledLanguageItem 
                className={currentLanguage === 'English' ? 'active' : ''}
                onClick={() => changeLanguage('English')}
                type="button"
              >
                English
              </StyledLanguageItem>
            </StyledLanguageList>
          </StyledLanguageDropdown>
          
        </FooterNav>
      </FooterBottom>
    </StyledFooter>
  );
};

export default Footer;

const StyledLanguageDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledLanguageToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  background-color: var(--bg-secondary, var(--neutral-50));
  border: 1px solid var(--border-color, var(--neutral-300));
  border-radius: 0.4rem;
  transition: all 0.3s ease;
  width: 12rem;
  /* margin-right: 2rem; */
  
  span {
    font-weight: 500;
    font-size: var(--text-sm);
    color: var(--text-primary, var(--neutral-700));
  }
  
  svg {
    color: var(--neutral-600);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--neutral-200);
  }
`;

const StyledLanguageList = styled.ul`
  max-height: ${({ isOpen }) => (isOpen ? "110px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  background-color: var(--white);
  border: ${({ isOpen }) => (isOpen ? "1px solid var(--neutral-300)" : "none")};
  border-radius: 0.4rem;
  width: 12rem;
  position: absolute;
  bottom: 100%;
  right: 2rem;
  z-index: 10;
  box-shadow: ${({ isOpen }) => (isOpen ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none")};
  margin-bottom: 0.5rem;
`;

const StyledLanguageItem = styled.button`
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  color: var(--text-primary, var(--neutral-600));
  font-size: var(--text-sm);
  transition: all 0.25s ease;
  border: none;
  background-color: transparent;
  width: 100%;
  text-align: right;
  
  &:hover {
    color: var(--primary-600);
    background-color: var(--neutral-100);
  }
  
  &.active {
    color: var(--primary-600);
    font-weight: 500;
    position: relative;
    background-color: var(--neutral-50);
  }
`;import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const StyledFooter = styled.footer`
  background-color: #F4C2C2:;
  padding: 5rem 4rem 0;
  border-top: 1px solid var(--border-color, var(--neutral-200));
  color: var(--text-primary, var(--neutral-900));
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ColumnTitle = styled.h4`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -0.5rem;
    width: 3rem;
    height: 2px;
    background-color: var(--neutral-300);
  }
`;

const FooterLink = styled(Link)`
  color: var(--neutral-700);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: var(--text-md);
  
  &:hover {
    color: var(--neutral-900);
    transform: translateX(-5px);
  }
`;

const FooterText = styled.p`
  color: var(--neutral-600);
  line-height: 1.6;
  font-size: var(--text-md);
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  
  img {
    width: 45px;
    height: auto;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SocialIconLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--white);
  color: var(--neutral-700);
  transition: all 0.3s ease;
  border: 1px solid var(--neutral-200);
  
  &:hover {
    color: var(--neutral-900);
    background-color: var(--neutral-100);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--white);
  color: var(--neutral-700);
  transition: all 0.3s ease;
  border: 1px solid var(--neutral-200);
  cursor: pointer;
  
  &:hover {
    color: var(--neutral-900);
    background-color: var(--neutral-100);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  
  &.dark-mode {
    background-color: var(--neutral-800);
    color: var(--neutral-100);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid var(--neutral-200);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--neutral-600);
  font-size: var(--text-sm);
`;

const FooterNav = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const FooterNavLink = styled(Link)`
  color: var(--neutral-600);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--neutral-900);
  }
`;


