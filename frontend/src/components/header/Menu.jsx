import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = ({ open, onClose }) => {
  const menuRef = useRef(null);
  const [openCollections, setOpenCollections] = useState({});

  // Static collection data
  const collections = [
    {
      id: "kaftan",
      nameArr: "قفطان",
      nameEn: "Kaftan",
      icon: "kaftan",
      children: [
        {
          id: "moroccan-kaftan",
          name_ar: "قفطان مغربي",
          name_en: "Moroccan Kaftan",
          icon: "moroccan-kaftan"
        },
        {
          id: "modern-kaftan",
          name_ar: "قفطان عصري",
          name_en: "Modern Kaftan",
          icon: "modern-kaftan"
        },
        {
          id: "traditional-kaftan",
          name_ar: "قفطان تقليدي",
          name_en: "Traditional Kaftan",
          icon: "traditional-kaftan"
        }
      ]
    },
    {
      id: "jelaba",
      nameArr: "جلابة",
      nameEn: "Jelaba",
      icon: "jelaba",
      children: [
        {
          id: "embroidered-jelaba",
          name_ar: "جلابة مطرزة",
          name_en: "Embroidered Jelaba",
          icon: "embroidered-jelaba"
        },
        {
          id: "modern-jelaba",
          name_ar: "جلابة عصرية",
          name_en: "Modern Jelaba",
          icon: "modern-jelaba"
        },
        {
          id: "traditional-jelaba",
          name_ar: "جلابة تقليدية",
          name_en: "Traditional Jelaba",
          icon: "traditional-jelaba"
        }
      ]
    },
    {
      id: "accessories",
      nameArr: "إكسسوارات",
      nameEn: "Accessories",
      icon: "accessories",
      children: [
        {
          id: "headwear",
          name_ar: "غطاء الرأس",
          name_en: "Headwear",
          icon: "headwear"
        },
        {
          id: "belts",
          name_ar: "أحزمة",
          name_en: "Belts",
          icon: "belt"
        },
        {
          id: "shoes",
          name_ar: "أحذية",
          name_en: "Shoes",
          icon: "shoes"
        },
        {
          id: "jewelry",
          name_ar: "مجوهرات",
          name_en: "Jewelry",
          icon: "jewelry"
        }
      ]
    }
  ];

  const toggleCollection = (collectionId) => {
    setOpenCollections(prev => ({
      ...prev,
      [collectionId]: !prev[collectionId]
    }));
  };

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
        <StyledHeader>
         <span>القائمة</span>
          <CloseButton onClick={onClose}>
            <XMarkIcon width={24} height={24} />
          </CloseButton>
        </StyledHeader>

        <StyledContent>
          <StyledCategories>
            {collections.map(collection => (
              <CategoryItem key={collection.id}>
                <CategoryHeader onClick={() => toggleCollection(collection.id)}>
                  <CategoryName>{collection.nameArr}</CategoryName>
                  <CategoryIcon isOpen={openCollections[collection.id]}>
                    <ChevronDownIcon width={18} height={18} />
                  </CategoryIcon>
                </CategoryHeader>
                
                <SubcategoryList isOpen={openCollections[collection.id]}>
                  {collection.children.map(child => (
                    <SubcategoryItem key={child.id}>
                      <Link to={`/collection/${child.id}`} onClick={onClose}>
                        {child.name_ar}
                      </Link>
                    </SubcategoryItem>
                  ))}
                </SubcategoryList>
              </CategoryItem>
            ))}
          </StyledCategories>
          
          {/* <MenuDivider /> */}
          
          {/* <StyledLinks>
            <MenuItem>
              <Link to="/account/login" onClick={onClose}>الحساب</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/faq" onClick={onClose}>الأسئلة الشائعة</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/shipping" onClick={onClose}>الشحن</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/contact" onClick={onClose}>إتصل بنا</Link>
            </MenuItem>
          </StyledLinks> */}
        </StyledContent>
        
        <StyledFooter>
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">Instagram</SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">Facebook</SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">Twitter</SocialLink>
          </SocialLinks>
        </StyledFooter>
      </StyledMenu>
  );
};

export default Menu;


const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-100%')};
  width: 420px;
  height: 100vh;
  background-color: #fff;
  transition: right 0.4s cubic-bezier(0.77, 0.2, 0.05, 1.0);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 25px rgba(0, 0, 0, 0.1);
  z-index: 20000;
  
  @media (max-width: 520px) {
    width: 90vw;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  span {
    font-size: var(--text-lg);
  }
`;

const StyledLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const StyledContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;

const StyledCategories = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 6px;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const CategoryName = styled.span`
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--neutral-700);
`;

const CategoryIcon = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  color: #888;
`;

const SubcategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: ${({ isOpen }) => isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease;
  background-color: #f9f9f9;
`;

const SubcategoryItem = styled.li`
  margin: 5px 0;
  
  a {
    display: block;
    padding: 12px 30px 12px 50px;
    color: #666;
    text-decoration: none;
    font-size: 15px;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
      color: #333;
      background-color: #f1f1f1;
    }
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: #f0f0f0;
  margin: 20px 15px;
`;

const StyledLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 5px 0;
  
  a {
    display: block;
    padding: 12px 30px;
    color: #666;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.2s ease;
    
    &:hover {
      color: #333;
      background-color: #f9f9f9;
    }
  }
`;

const StyledFooter = styled.div`
  padding: 20px 30px;
  border-top: 1px solid #f0f0f0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const SocialLink = styled.a`
  color: #888;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
  
  &:hover {
    color: #333;
  }
`;