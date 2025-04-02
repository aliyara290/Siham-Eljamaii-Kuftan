import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "../heading/Heading";

const StyledCollection = styled.section`
  width: 100%;
  /* padding-top: 7rem; */
`;
const StyledCollList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const StyledCollectionItem = styled.div`
  width: 100%;
  height: 90vh;
@media (max-width: 768px) {
  height: 50rem;
}
  position: relative;
  &:nth-child(1) {
    border-left: 6px solid white;
    @media (max-width: 768px) {
      border-bottom: 6px solid white;
      border-left: none;
    }
    /* border-right: 6px solid white; */
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #000000be, #00000074, transparent);
    /* z-index: 42; */
  }
  /* position: relative; */
`;

const StyledCollItemImg = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledDetails = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledCollName = styled.div`
  h2 {
    font-size: var(--text-big);
    color: var(--white);
    line-height: 1.3;
    font-weight: 300;
  }
`;
const StyledCollLink = styled.div`
  span {
    font-size: var(--text-lg);
    color: var(--white);
    position: relative;
    padding: 0.4rem;
    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--white);
      transform: scaleX(0);
      transform-origin: 50% 50%;
      transition: transform 0.2s ease;
    }
    &:hover::after {
      transform: scaleX(1.1);
    }
  }
`;

const Collections = () => {
  return (
    <StyledCollection id="collections">
      {/* <Heading title={'مـجمـوعـــاتنـا'} weight={500}/> */}
      <StyledCollList>
        <StyledCollectionItem>
          <StyledCollItemImg>
            <img
              src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720"
              alt=""
            />
          </StyledCollItemImg>
          <StyledDetails>
            <StyledCollName>
              <h2>قفطــــانـي</h2>
            </StyledCollName>
            <StyledCollLink>
              <Link to={"/collection/kuftan"}>
                <span>تصفح مجـموعتنــا</span>
              </Link>
            </StyledCollLink>
          </StyledDetails>
        </StyledCollectionItem>
        {/* <StyledCollectionItem>
          <StyledCollItemImg>
            <img
              src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/17_fc0e4dee-66b2-4b95-9c63-9a24459efc9b.jpg?crop=region&crop_height=2048&crop_left=204&crop_top=0&crop_width=1638&v=1705111629&width=720"
              alt=""
            />
          </StyledCollItemImg>
          <StyledDetails>
            <StyledCollName>
              <h2>مجـوهـــرات</h2>
            </StyledCollName>
            <StyledCollLink>
              <Link to={"/collection/kuftan"}>
                <span>تصفح مجـموعتنــا</span>
              </Link>
            </StyledCollLink>
          </StyledDetails>
        </StyledCollectionItem> */}
        <StyledCollectionItem>
          <StyledCollItemImg>
            <img
              src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720"
              alt=""
            />
          </StyledCollItemImg>
          <StyledDetails>
            <StyledCollName>
              <h2>الجــلابـــة</h2>
            </StyledCollName>
            <StyledCollLink>
              <Link to={"/collection/kuftan"}>
                <span>تصفح مجـموعتنــا</span>
              </Link>
            </StyledCollLink>
          </StyledDetails>
        </StyledCollectionItem>
      </StyledCollList>
    </StyledCollection>
  );
};

export default Collections;
