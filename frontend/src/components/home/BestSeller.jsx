import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Heading from "../heading/Heading";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const StyledBestSeller = styled.section`
  direction: ltr;
  margin: 6rem 0;
  width: 100%;
`;
const StyledCarouselContent = styled.div`
  /* padding: 0 2rem; */
  padding-top: 5rem;
  position: relative;
`;
const StyledProductCard = styled.div`
  width: 100%;
`;
const StyledProductImage = styled.div`
  width: 100%;
  /* overflow: hidden; */
  /* box-shadow: 0 0 12px 3px #00000010; */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StyledProductDetails = styled.div`
  direction: rtl;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const StyledProductInfo = styled.div`
  span {
    font-size: var(--text-sm);
    line-height: 1.1;
    font-weight: 500;
    color: var(--neutral-600);
  }
`;
const StyledProductName = styled.div`
  h4 {
    font-size: var(--text-md);
    color: var(--neutral-800);
    font-weight: 500;
    line-height: 1.1;
  }
`;
const StyledProductPrice = styled.div`
  span {
    font-size: var(--text-lg);
    color: var(--neutral-900);
    font-weight: 500;
    line-height: 1.1;
  }
`;
const StyledProductColors = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const StyledProductColorsItem = styled.span`
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => `#${color}`};
  border-radius: 50%;
  border: 1px solid #9b9999;
`;

const StyledLeftArrowNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 4rem;
  transform: translateY(-50%);
  z-index: 456;
  button {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: var(--white);
    color: var(--neutral-800);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 12px 3px #00000005;
    &:hover {
      background-color: var(--neutral-200);
    }
  }
`;
const StyledRightArrowNavigation = styled.div`
  position: absolute;
  top: 50%;
  right: 4rem;
  transform: translateY(-50%);
  z-index: 456;
  button {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: var(--white);
    color: var(--neutral-800);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 12px 3px #00000005;
    &:hover {
      background-color: var(--neutral-200);
    }
  }
`;

const BestSeller = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", () => {
        setIsBeginning(swiperRef.current.isBeginning);
        setIsEnd(swiperRef.current.isEnd);
      });
    }
  }, []);
  return (
    <StyledBestSeller>
      <Heading weight={500} title={"أفضــل مبيعـاتـنـا"} />
      <StyledCarouselContent>
        {!isBeginning && (
          <StyledLeftArrowNavigation>
            <button onClick={() => swiperRef.current?.slidePrev()}>
              <ChevronLeftIcon width={30} height={30} />
            </button>
          </StyledLeftArrowNavigation>
        )}
        {!isEnd && (
          <StyledRightArrowNavigation>
            <button onClick={() => swiperRef.current?.slideNext()}>
              <ChevronRightIcon width={30} height={30} />
            </button>
          </StyledRightArrowNavigation>
        )}
        <Swiper
          effect="coverflow"
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          }}
          slidesPerView={"auto"}
          centeredSlides={false}
          spaceBetween={15}
          slidesPerGroup={1}
          navigation={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            handleIndexChange(swiper);
          }}
        >
          {[...Array(10)].map((_, index) => {
            return (
              <SwiperSlide key={index}>
                <StyledProductCard>
                  <Link to={"/product/kuftan"}>
                    <StyledProductImage>
                      <img
                        src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/62_eb6990ea-b267-41f5-847a-fbbfacb2dc74.jpg?crop=region&crop_height=2048&crop_left=204&crop_top=0&crop_width=1638&v=1709254722&width=720"
                        alt=""
                      />
                    </StyledProductImage>
                    <StyledProductDetails>
                      <StyledProductInfo>
                        <span>قفطاني</span>
                      </StyledProductInfo>
                      <StyledProductName>
                        <h4>تنورة طويلة من الفيسكوز باللون البيج</h4>
                      </StyledProductName>
                      <StyledProductPrice>
                        <span>2400 د.م</span>
                      </StyledProductPrice>
                      <StyledProductColors>
                        <StyledProductColorsItem color="eb2626"></StyledProductColorsItem>
                        <StyledProductColorsItem color="000"></StyledProductColorsItem>
                        <StyledProductColorsItem color="dfd5d0"></StyledProductColorsItem>
                      </StyledProductColors>
                    </StyledProductDetails>
                  </Link>
                </StyledProductCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </StyledCarouselContent>
    </StyledBestSeller>
  );
};

export default BestSeller;
