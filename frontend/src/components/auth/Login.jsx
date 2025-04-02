// src/components/auth/Login.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../heading/Heading";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to homepage
  const from = location.state?.from?.pathname || "/";
  
  // If user is already authenticated, redirect to the previous page or homepage
  useEffect(() => {
    let isMounted = true;
    
    if (isMounted && isAuthenticated) {
      navigate(from, { replace: true });
    }
    
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, navigate, from]);
  
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
    
    setCredentials({
      ...credentials,
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
    
    if (!credentials.email.trim()) {
      errors.email = "يرجى إدخال البريد الإلكتروني";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "البريد الإلكتروني غير صحيح";
    }
    
    if (!credentials.password) {
      errors.password = "يرجى إدخال كلمة المرور";
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
      const result = await login(credentials);
      
      if (result.success) {
        // Redirect handled by useEffect
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <StyledAuthContent>
      <StyledFormContent onSubmit={handleSubmit}>
        <Heading size={"xl"} title={"تسجيل الدخـول"} />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <StyledRowsList>
          <StyledRowContent>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              placeholder="البريد الإلكتروني"
              type="email"
              name="email"
              id="email"
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleInputChange}
              className={formErrors.password ? "error" : ""}
            />
            {formErrors.password && <FieldError>{formErrors.password}</FieldError>}
          </StyledRowContent>
          <StyledForgotPassword>
            <Link to="/account/forgot-password">نسيت كلمة المرور؟</Link>
          </StyledForgotPassword>
          <StyledSubmitBtn>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري التسجيل..." : "تسجيـل الدخـول"}
            </button>
          </StyledSubmitBtn>
        </StyledRowsList>
        <StyledCreateAccount>
          <span>ليس لديك حساب؟</span>
          <Link to={"/account/register"}>
            <span>سجل الأن</span>
          </Link>
        </StyledCreateAccount>
      </StyledFormContent>
    </StyledAuthContent>
  );
};

export default Login;

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

const StyledForgotPassword = styled.div`
  text-align: left;
  margin-top: 0.5rem;
  
  a {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    text-decoration: none;
    
    &:hover {
      color: var(--primary-600);
      text-decoration: underline;
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