import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledBannerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: max-content;
    height: 5rem;
    background-color: ${({bg}) => (bg ? "var(--neutral-900)" : "var(--white)")};
    font-size: var(--text-xl);
    font-weight: 500;
    padding: 0 4rem;
    cursor: pointer;
    color: ${({bg}) => (bg ? "var(--white)" : "var(--neutral-900)")};
    &:hover {
      background-color: ${({bg}) => (bg ? "var(--darken)" : "#efefef")};
    }
  }
`;

const Button = ({ title, link = true, url, bg, onClick }) => {
  return (
    <StyledBannerButton bg={bg}>
      {link ? (
        <Link to={url}>
          <button>{title}</button>
        </Link>
      ) : (
        <button onClick={onClick}>{title}</button>
      )}
    </StyledBannerButton>
  );
};

export default Button;
