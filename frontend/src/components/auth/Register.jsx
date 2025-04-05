// src/components/auth/Register.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../heading/Heading";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, isAuthenticated, error, clearError, loading } = useAuth();
  const navigate = useNavigate();
  
  // If user is already authenticated, redirect to homepage
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, loading]);
  
  // Clear auth errors when component unmounts
  useEffect(() => {
    return () => {
      if (clearError) {
        clearError();
      }
    };
  }, [clearError]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setUserData({
      ...userData,
      [name]: value
    });
    
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!userData.name.trim()) {
      errors.name = "يرجى إدخال الاسم الكامل";
    }
    
    if (!userData.email.trim()) {
      errors.email = "يرجى إدخال البريد الإلكتروني";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "البريد الإلكتروني غير صحيح";
    }
    
    if (!userData.password) {
      errors.password = "يرجى إدخال كلمة المرور";
    } else if (userData.password.length < 8) {
      errors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل";
    }
    
    if (userData.password !== userData.password_confirmation) {
      errors.password_confirmation = "كلمة المرور وتأكيدها غير متطابقين";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await register(userData);
      
      if (result.success) {
        // Redirect handled by useEffect
        navigate("/");
      } else if (result.error && result.error.errors) {
        // Handle validation errors from API
        const apiErrors = {};
        
        Object.entries(result.error.errors).forEach(([key, messages]) => {
          apiErrors[key] = Array.isArray(messages) ? messages[0] : messages;
        });
        
        setFormErrors(apiErrors);
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If page is still loading auth state, show loading indicator
  if (loading) {
    return (
      <StyledAuthContent>
        <LoadingMessage>Loading...</LoadingMessage>
      </StyledAuthContent>
    );
  }
  
  return (
    <StyledAuthContent>
      <StyledFormContent onSubmit={handleSubmit}>
        <Heading size={"xl"} title={"إنشاء حساب جديد"} />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <StyledRowsList>
          <StyledRowContent>
            <label htmlFor="name">الإسـم الكامـل</label>
            <input
              placeholder="الإسـم الكامـل"
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleInputChange}
              className={formErrors.name ? "error" : ""}
            />
            {formErrors.name && <FieldError>{formErrors.name}</FieldError>}
          </StyledRowContent>
          <StyledRowContent>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              placeholder="البريد الإلكتروني"
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleInputChange}
              className={formErrors.email ? "error" : ""}
            />
            {formErrors.email && <FieldError>{formErrors.email}</FieldError>}
          </StyledRowContent>
          <StyledRowContent>
            <label htmlFor="password">كلمـة السـر</label>
            <input
              placeholder="كلمـة السر"
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handleInputChange}
              className={formErrors.password ? "error" : ""}
            />
            {formErrors.password && <FieldError>{formErrors.password}</FieldError>}
          </StyledRowContent>
          <StyledRowContent>
            <label htmlFor="password_confirmation">تأكيد كلمـة السـر</label>
            <input
              placeholder="تأكيد كلمـة السر"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={userData.password_confirmation}
              onChange={handleInputChange}
              className={formErrors.password_confirmation ? "error" : ""}
            />
            {formErrors.password_confirmation && <FieldError>{formErrors.password_confirmation}</FieldError>}
          </StyledRowContent>
          <StyledSubmitBtn>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري التسجيل..." : "إنشاء حساب"}
            </button>
          </StyledSubmitBtn>
        </StyledRowsList>
        <StyledCreateAccount>
          <span> لديك حساب؟</span>
          <Link to={"/account/login"}>
            <span>سجل دخولك الأن</span>
          </Link>
        </StyledCreateAccount>
      </StyledFormContent>
    </StyledAuthContent>
  );
};

export default Register;

// Styled Components
const StyledAuthContent = styled.div`
  width: 100%;
  background-color: var(--neutral-100);
  padding: 2rem;
  padding-top: 13rem;
  padding-bottom: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMessage = styled.div`
  font-size: var(--text-lg);
  color: var(--neutral-600);
  padding: 2rem;
`;

const StyledFormContent = styled.form`
  width: 100%;
  max-width: 50rem;
  padding: 3rem 2rem;
  background-color: var(--white);
  border-radius: 1rem;
  box-shadow: 0 0 12px 3px #00000010;
`;

const StyledRowsList = styled.div`
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledRowContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  label {
    font-size: var(--text-sm);
    color: var(--neutral-700);
    font-weight: 500;
  }
  input {
    width: 100%;
    height: 4.5rem;
    outline: none;
    border: none;
    padding: 0 2rem;
    font-size: var(--text-md);
    color: var(--neutral-800);
    background-color: var(--neutral-50);
    border: 1px solid #00000010;
    &::placeholder {
      font-size: var(--text-sm);
    }
    &.error {
      border-color: var(--danger-500);
      background-color: var(--danger-100);
    }
  }
`;

const StyledSubmitBtn = styled.div`
  padding-top: 2rem;
  button {
    width: 100%;
    height: 4.5rem;
    background-color: var(--primary-600);
    color: var(--white);
    font-size: var(--text-md);
    cursor: pointer;
    &:hover:not(:disabled) {
      background-color: var(--primary-700);
    }
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

const StyledCreateAccount = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 0.3rem;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--neutral-600);
  a {
    color: var(--primary-500);
    text-decoration: underline;
    &:hover {
      color: var(--primary-600);
    }
  }
`;

const ErrorMessage = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--danger-100);
  color: var(--danger-500);
  border-radius: 0.3rem;
  font-size: var(--text-sm);
`;

const FieldError = styled.span`
  color: var(--danger-500);
  font-size: var(--text-xs);
  margin-top: -0.5rem;
`;