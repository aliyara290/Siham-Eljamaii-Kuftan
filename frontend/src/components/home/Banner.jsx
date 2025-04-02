import React from "react";
import styled from "styled-components";
import Heading from "../heading/Heading";
import SubHeading from "../heading/SubHeading";
import { Link } from "react-router-dom";
import Button from "../button/Button";

const StyledBanner = styled.div`
  width: 100%;
  height: 65rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBannerBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #0000007e, #0000007e);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledBannerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledHeading = styled.div`
  padding-bottom: 3rem;
`;

const Banner = () => {
  return (
    <StyledBanner>
      <StyledBannerBackground>
        <img
          src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880"
          alt=""
        />
      </StyledBannerBackground>
      <StyledBannerContent>
        <SubHeading
          title={"تصـفـح أهـم مجـمـوعــة لديـنا"}
          color={true}
          size={"xl"}
        />
        <StyledHeading>
          <Heading
            color={true}
            title={"قـفـطـان مـغـربـي"}
            size={"big"}
            weight={400}
          />
        </StyledHeading>
        <Button title={"تصـفـح الأن"} />
      </StyledBannerContent>
    </StyledBanner>
  );
};

export default Banner;