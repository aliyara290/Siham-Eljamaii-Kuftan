import React from "react";
import styled from "styled-components";

const StyledHeadingContent = styled.div`
  width: 90%;
  text-align: center;
  margin: 0 auto;
  /* padding-bottom: 4rem; */
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: center;
  `;

const StyledHeadingTitle = styled.h2`
max-width: 60rem;
line-height: 1.1;
  font-weight: ${({ weight }) => (weight ? weight : "600")};
  font-size: ${({ size }) =>
    size ? `var(--text-${size})` : "var(--text-xxl)"};
  color: ${({ color }) => (color ? `var(--primary-50)` : "var(--neutral-900)")};
`;

const Heading = ({ title, size, justify, as, weight, color }) => {
  return (
    <StyledHeadingContent justify={justify}>
      <StyledHeadingTitle color={color} as={as} size={size} weight={weight}>
        {title}
      </StyledHeadingTitle>
    </StyledHeadingContent>
  );
};
export default Heading;
