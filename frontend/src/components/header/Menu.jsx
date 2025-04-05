import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const Menu = ({ open, onClose }) => {
  const menuRef = useRef(null);
  const [openCollections, setOpenCollections] = useState({});
  const { logout, isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

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
          icon: "moroccan-kaftan",
        },
        {
          id: "modern-kaftan",
          name_ar: "قفطان عصري",
          name_en: "Modern Kaftan",
          icon: "modern-kaftan",
        },
        {
          id: "traditional-kaftan",
          name_ar: "قفطان تقليدي",
          name_en: "Traditional Kaftan",
          icon: "traditional-kaftan",
        },
      ],
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
          icon: "embroidered-jelaba",
        },
        {
          id: "modern-jelaba",
          name_ar: "جلابة عصرية",
          name_en: "Modern Jelaba",
          icon: "modern-jelaba",
        },
        {
          id: "traditional-jelaba",
          name_ar: "جلابة تقليدية",
          name_en: "Traditional Jelaba",
          icon: "traditional-jelaba",
        },
      ],
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
          icon: "headwear",
        },
        {
          id: "belts",
          name_ar: "أحزمة",
          name_en: "Belts",
          icon: "belt",
        },
        {
          id: "shoes",
          name_ar: "أحذية",
          name_en: "Shoes",
          icon: "shoes",
        },
        {
          id: "jewelry",
          name_ar: "مجوهرات",
          name_en: "Jewelry",
          icon: "jewelry",
        },
      ],
    },
  ];

  const toggleCollection = (collectionId) => {
    setOpenCollections((prev) => ({
      ...prev,
      [collectionId]: !prev[collectionId],
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

  const handleLogout = async () => {
    onClose();
    try {
      const logoutResponse = await logout();
      if (logoutResponse && logoutResponse.success) {
        navigate("/account/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <StyledMenu ref={menuRef} open={open}>
      <StyledHeader>
        <span>القائمة</span>
        <CloseButton onClick={onClose}>
          <XMarkIcon width={24} height={24} />
        </CloseButton>
      </StyledHeader>

      {/* User Profile Section - Only shown when authenticated */}
      {isAuthenticated && user && (
        <UserProfileSection>
          <UserAvatar>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-9"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </UserAvatar>
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserInfo>
        </UserProfileSection>
      )}

      <StyledContent>
        <StyledCategories>
          {collections.map((collection) => (
            <CategoryItem key={collection.id}>
              <CategoryHeader onClick={() => toggleCollection(collection.id)}>
                <CategoryName>{collection.nameArr}</CategoryName>
                <CategoryIcon isOpen={openCollections[collection.id]}>
                  <ChevronDownIcon width={18} height={18} />
                </CategoryIcon>
              </CategoryHeader>

              <SubcategoryList isOpen={openCollections[collection.id]}>
                {collection.children.map((child) => (
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

        <MenuDivider />

        <StyledLinks>
          {/* Account related links */}
          {isAuthenticated ? (
            <>
              <MenuItem>
                <Link to="/account/profile" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p>الملف الشخصي</p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/account/orders" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p>طلباتي</p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/account/addresses" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>العناوين</p>
                </Link>
              </MenuItem>
              <MenuItem>
                <span onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <p>تسجيل الخروج</p>
                </span>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/account/login" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <p>تسجيل الدخول</p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/account/register" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <p>إنشاء حساب</p>
                </Link>
              </MenuItem>
            </>
          )}

          {/* Support section links */}
          <MenuDivider />
          <MenuSectionTitle>الدعم والمساعدة</MenuSectionTitle>
          <MenuItem>
            <Link to="/faq" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>الأسئلة الشائعة</p>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p>اتصل بنا</p>
            </Link>
          </MenuItem>
        </StyledLinks>
      </StyledContent>
    </StyledMenu>
  );
};

export default Menu;

// Styled Components
const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-100%")};
  width: 420px;
  height: 100vh;
  background-color: #fff;
  transition: right 0.4s cubic-bezier(0.77, 0.2, 0.05, 1);
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

// User Profile Section
const UserProfileSection = styled.div`
  padding: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: var(--neutral-50);
  border-bottom: 1px solid var(--neutral-200);
`;

const UserAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--neutral-400);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  font-weight: 600;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const UserName = styled.h3`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  /* margin-bottom: 0.3rem; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.p`
  font-size: var(--text-sm);
  color: var(--neutral-600);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: var(--neutral-200);
  border: none;
  border-radius: 0.3rem;
  color: var(--neutral-800);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--neutral-300);
  }
`;

const StyledContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

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
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  color: #888;
`;

const SubcategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
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

const MenuSectionTitle = styled.h3`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-700);
  padding: 0 30px;
  margin-bottom: 15px;
`;

const StyledLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 5px 0;

  a,
  span {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 12px 30px;
    color: #666;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      color: #333;
      background-color: #f9f9f9;
    }
  }
`;
