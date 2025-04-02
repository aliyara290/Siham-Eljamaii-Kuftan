import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Menu = ({ open, onClose }) => {
  const menuRef = useRef(null);
  const [shopOpen, setShopOpen] = useState(false);
  const [bestSellerOpen, setBestSellerOpen] = useState(false);

  const toggleShop = () => setShopOpen(!shopOpen);
  const toggleBestSeller = () => setBestSellerOpen(!bestSellerOpen);

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
              <div className="menu_chevron-toggle" onClick={toggleShop}>
                {shopOpen ? (
                  <MinusIcon width={22} height={22} />
                ) : (
                  <PlusIcon width={22} height={22} />
                )}
              </div>
            </StyledLinkItem>
            
            <StyledDropdownContent isOpen={shopOpen}>
              <StyledNestedLinks>
                <StyledNestedLinkItem>
                  <Link onClick={onClose} to="/collection/kuftan">قفطان</Link>
                </StyledNestedLinkItem>
                <StyledNestedLinkItem>
                  <Link onClick={onClose} to="/collection/jewelry">مجوهرات</Link>
                </StyledNestedLinkItem>
                <StyledNestedLinkItem>
                  <Link onClick={onClose} to="/collection/jlaba">جلابة</Link>
                </StyledNestedLinkItem>
                <StyledNestedLinkItem>
                  <Link onClick={onClose} to="/collection/all">كل التصنيفات</Link>
                </StyledNestedLinkItem>
              </StyledNestedLinks>
            </StyledDropdownContent>
            
            <StyledLinkItem>
              <div>
                <span>الاكثر مبيعا</span>
              </div>
              <div className="menu_chevron-toggle" onClick={toggleBestSeller}>
                {bestSellerOpen ? (
                  <MinusIcon width={22} height={22} />
                ) : (
                  <PlusIcon width={22} height={22} />
                )}
              </div>
            </StyledLinkItem>
            
            <StyledDropdownContent isOpen={bestSellerOpen}>
              <StyledNestedLinks>
                <StyledNestedLinkItem>
                  <Link onClick={onClose} to="/bestseller/women">للنساء</Link>
                </StyledNestedLinkItem>
                <StyledNestedLinkItem>
                  <Link onClick={onClose} to="/bestseller/accessories">اكسسوارات</Link>
                </StyledNestedLinkItem>
              </StyledNestedLinks>
            </StyledDropdownContent>
          </StyledPagesList>
        </StyledPagesLinks>
      </StyledTopSection>
      <StyledBottomSection>
        <StyledBottomSectionLinks>
          <li onClick={onClose}>
            <Link to={"/account/login"}>
              <span>الحساب</span>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link to={"/faq"}>
              <span>الأسئلة الشائعة</span>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link to={"/shipping"}>
              <span>الشحن</span>
            </Link>
          </li>
          <li onClick={onClose}>
            <Link to={"/contact"}>
              <span>إتصل بنا</span>
            </Link>
          </li>
        </StyledBottomSectionLinks>
      </StyledBottomSection>
    </StyledMenu>
  );
};

export default Menu;



const StyledMenu = styled.div`
  position: fixed;
  z-index: 2345674567;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-120%")};
  width: 40rem;
  height: 100dvh;
  background-color: var(--bg-primary, var(--white));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  transition: right 0.4s ease;
  color: var(--text-primary, var(--neutral-900));
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
  border-bottom: 1px solid var(--border-color, var(--neutral-300));
  color: var(--text-primary, var(--neutral-700));
  
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
  overflow-y: auto;
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
  border-bottom: 1px solid var(--border-color, var(--neutral-300));
  
  span {
    color: var(--text-primary, var(--neutral-700));
    font-size: var(--text-md);
    font-weight: 500;
  }
  
  .menu_chevron-toggle {
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--neutral-200);
      border-radius: 50%;
    }
  }
`;

const StyledDropdownContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const StyledNestedLinks = styled.ul`
  padding: 0.5rem 0 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledNestedLinkItem = styled.li`
  a {
    color: var(--text-primary, var(--neutral-600));
    text-decoration: none;
    font-size: var(--text-md);
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--neutral-900);
      transform: translateX(-5px);
    }
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
      color: var(--text-primary, var(--neutral-700));
      font-size: var(--text-md);
      font-weight: 500;
    }
  }
`;
