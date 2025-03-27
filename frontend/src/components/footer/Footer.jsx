import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { Facebook, Instagram, Twitter, TikTok } from 'lucide-react';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  padding-bottom: 0;
`;
const StyledFooterBottom = styled.footer`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #00000030;
  padding: 2rem 0;
`;
const FooterContainer = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 4rem;
  background-color: var(--white);
  font-size: var(--text-md);
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ColumnTitle = styled.h4`
  font-weight: bold;
  font-size: var(--text-xl);
  color: var(--neutral-900);
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: var(--neutral-800);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #666;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  img {
    width: 45px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterColumn>
          <ColumnTitle>المنتجات</ColumnTitle>
          <FooterLink href="#">فستان</FooterLink>
          <FooterLink href="#">بليزر</FooterLink>
          <FooterLink href="#">تنورة</FooterLink>
          <FooterLink href="#">بنطلون</FooterLink>
          <FooterLink href="#">جاكيت</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <ColumnTitle>الخدمات</ColumnTitle>
          <FooterLink href="#">الأسئلة الشائعة</FooterLink>
          <FooterLink href="#">الشحن</FooterLink>
          <FooterLink href="#">اتصل بنا</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <ColumnTitle>معلومات</ColumnTitle>
          <FooterLink href="#">من نحن</FooterLink>
          <FooterLink href="#">الإرجاع والاسترجاع</FooterLink>
          <FooterLink href="#">المجال القانوني</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <ColumnTitle>عنا</ColumnTitle>
          <p>
            لم نكن لننجح لولا المصادر الرائعة للمحتوى والمنتجات. تفضل بزيارة
            صفحة من نحن لمعرفة المزيد عن مصادر منتجاتنا.
          </p>

          <PaymentIcons>
            <img src="/assets/images/pay/visa.svg" alt="Visa" />
            <img src="/assets/images/pay/mastercard.svg" alt="Mastercard" />
            <img src="/assets/images/pay/american-ex.svg" alt="AmEx" />
            <img src="/assets/images/pay/discover.svg" alt="discover" />
            <img src="/assets/images/pay/d-club.svg" alt="d-club" />
          </PaymentIcons>
        </FooterColumn>
      </FooterContainer>
      <StyledFooterBottom>
        <SocialIcons>
          <Link to={""}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-instagram-icon lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
          <Link to={""}>
            <svg
              class="icon"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              aria-hidden="true"
              focusable="false"
              role="presentation"
            >
              <path
                d="M24.001 0C10.748 0 0 10.745 0 24.001c0 9.825 5.91 18.27 14.369 21.981-.068-1.674-.012-3.689.415-5.512.462-1.948 3.087-13.076 3.087-13.076s-.765-1.533-.765-3.799c0-3.556 2.064-6.212 4.629-6.212 2.182 0 3.237 1.64 3.237 3.604 0 2.193-1.4 5.476-2.12 8.515-.6 2.549 1.276 4.623 3.788 4.623 4.547 0 7.61-5.84 7.61-12.76 0-5.258-3.543-9.195-9.986-9.195-7.279 0-11.815 5.427-11.815 11.49 0 2.094.616 3.567 1.581 4.708.446.527.505.736.344 1.34-.113.438-.378 1.505-.488 1.925-.16.607-.652.827-1.2.601-3.355-1.369-4.916-5.04-4.916-9.17 0-6.816 5.75-14.995 17.152-14.995 9.164 0 15.195 6.636 15.195 13.75 0 9.416-5.233 16.45-12.952 16.45-2.588 0-5.026-1.4-5.862-2.99 0 0-1.394 5.53-1.688 6.596-.508 1.85-1.504 3.7-2.415 5.14 2.159.638 4.44.985 6.801.985C37.255 48 48 37.255 48 24.001 48 10.745 37.255 0 24.001 0"
                fill="currentColor"
                fill-rule="evenodd"
              ></path>
            </svg>
          </Link>
          <Link to={""}>
            <svg
              aria-hidden="true"
              class="icon icon-facebook"
              viewBox="2 2 16 16"
              focusable="false"
              role="presentation"
              width={24}
              height={24}
            >
              <path
                fill="currentColor"
                d="M18 10.049C18 5.603 14.419 2 10 2c-4.419 0-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951Z"
              ></path>
            </svg>
          </Link>
          <Link to={""}>
            <svg
              class="icon svg-tiktok"
              width="24"
              height="24"
              viewBox="0 0 15 16"
              fill="none"
              aria-hidden="true"
              focusable="false"
              role="presentation"
            >
              <path
                fill="currentColor"
                d="M7.638.013C8.512 0 9.378.007 10.245 0c.054 1.02.42 2.06 1.167 2.78.746.74 1.8 1.08 2.826 1.193V6.66c-.96-.033-1.926-.233-2.8-.647a8.238 8.238 0 0 1-1.08-.62c-.006 1.947.007 3.894-.013 5.834a5.092 5.092 0 0 1-.9 2.626c-.873 1.28-2.387 2.114-3.94 2.14-.953.054-1.907-.206-2.72-.686C1.438 14.513.492 13.06.352 11.5a12.36 12.36 0 0 1-.007-.993A5.003 5.003 0 0 1 2.065 7.2c1.107-.96 2.653-1.42 4.1-1.147.013.987-.027 1.974-.027 2.96-.66-.213-1.433-.153-2.013.247-.42.273-.74.693-.907 1.167-.14.34-.1.713-.093 1.073.16 1.093 1.213 2.013 2.333 1.913.747-.006 1.46-.44 1.847-1.073.127-.22.267-.447.273-.707.067-1.193.04-2.38.047-3.573.007-2.687-.007-5.367.013-8.047Z"
              ></path>
            </svg>
          </Link>
        </SocialIcons>
      </StyledFooterBottom>
    </StyledFooter>
  );
};

export default Footer;
