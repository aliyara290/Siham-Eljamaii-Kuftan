import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  position: fixed;
  z-index: 2345674567;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-100%")};
  width: 40rem;
  height: 100dvh;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  transition: right 0.4s ease;
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

const StyledPagesLinks = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledPagesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledLinkItem = styled.li`
  padding: 1.6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #00000030;
  span {
    color: var(--neutral-700);
    font-size: var(--text-md);
    font-weight: 500;
  }
`;

const StyledBottomSection = styled.div`
  padding: 0 2rem;
`;
const StyledBottomSectionLinks = styled.ul`
  li {
    padding: 0.5rem 0;
    width: max-content;
    &:hover span {
      cursor: pointer;
      color: #800080;
    }
    span {
      color: var(--neutral-700);
      font-size: var(--text-md);
      font-weight: 500;
    }
  }
`;

const Menu = ({ open, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);
  return (
    <StyledMenu ref={menuRef} open={open}>
      <StyledTopSection>
        <StyledMenuHeader>
          <div>
            <h6>القائمة</h6>
          </div>
          <div className="menu_chevron-close" onClick={onClose}>
            <XMarkIcon width={25} height={25} />
          </div>
        </StyledMenuHeader>
        <StyledPagesLinks>
          <StyledPagesList>
            <StyledLinkItem>
              <div>
                <span>تسوق</span>
              </div>
              <div className="menu_chevron-close">
                <PlusIcon width={25} height={25} />
              </div>
            </StyledLinkItem>
            <StyledLinkItem>
              <div>
                <span>الاكثر مبيعا</span>
              </div>
              <div className="menu_chevron-close">
                <PlusIcon width={25} height={25} />
              </div>
            </StyledLinkItem>
          </StyledPagesList>
        </StyledPagesLinks>
      </StyledTopSection>
      <StyledBottomSection>
        <StyledBottomSectionLinks>
          <li>
            <span>اللغة</span>
          </li>
          <li>
            <Link to={"/auth/login"}>
              <span>الحساب</span>
            </Link>
          </li>
          <li>
            <Link to={"/faq"}>
              <span>الأسئلة الشائعة</span>
            </Link>
          </li>
          <li>
            <Link to={"/shipping"}>
              <span>الشحن</span>
            </Link>
          </li>
          <li>
            <Link to={"/Contact"}>
              <span>إتصل بنا</span>
            </Link>
          </li>
        </StyledBottomSectionLinks>
      </StyledBottomSection>
    </StyledMenu>
  );
};

export default Menu;
