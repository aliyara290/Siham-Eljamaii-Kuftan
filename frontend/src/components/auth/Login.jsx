import React from "react";
import styled from "styled-components";
import Heading from "../heading/Heading";
import { Link } from "react-router-dom";

const StyledAuthContent = styled.div`
  width: 100%;
  background-color: var(--neutral-100);
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
const StyledRowsList = styled.form`
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
    &:hover {
      background-color: var(--primary-700);
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
// const StyledRowsList = styled.form`

// `;

const Login = () => {
  return (
    <StyledAuthContent>
      <StyledFormContent>
        <Heading size={"xl"} title={"تسجيل الدخـول"} />
        <StyledRowsList>
          <StyledRowContent>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              placeholder="البريد الإلكتروني"
              type="email"
              name="email"
              id="email"
            />
          </StyledRowContent>
          <StyledRowContent>
            <label htmlFor="email">كلمـة السـر</label>
            <input
              placeholder="كلمـة السر"
              type="password"
              name="password"
              id="password"
            />
          </StyledRowContent>
          <StyledSubmitBtn>
            <button>تسجيـل الدخـول</button>
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
