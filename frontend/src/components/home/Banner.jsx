import React from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
  width: 100%;
  height: 60rem;
  background: url("https://fakeimg.pl/1600x650/9e846f/FFF?font=noto");
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: #a38972; */
`;

const Banner = () => {
  return <StyledBanner>Banner</StyledBanner>;
};

export default Banner;
