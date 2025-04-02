import React from "react";
import styled from "styled-components";

const StyledHeadingContent = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: center;
  padding-top: 1.5rem;
  `;

const StyledHeadingTitle = styled.p`
  max-width: 65rem;
  text-align: ${({ align }) => (align ? align : "center")};
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-size: ${({ size }) => (size ? `var(--text-${size})` : "var(--text-md)")};
  color: ${({ color }) =>
    color ? `var(--neutral-200)` : "var(--neutral-600)"};
`;

const SubHeading = ({ title, size, justify, weight, color, align }) => {
  return (
    <StyledHeadingContent justify={justify}>
      <StyledHeadingTitle align={align} color={color} size={size} weight={weight}>
        {title}
      </StyledHeadingTitle>
    </StyledHeadingContent>
  );
};
export default SubHeading;
