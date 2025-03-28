import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import styled from "styled-components";
import Heading from "../heading/Heading.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const StyledGallery = styled.section`
  width: 100%;
  margin-top: 5rem;
  direction: ltr;
  .swiper-slide {
    width: 38rem !important;
  }
`;
const StyledGalleryList = styled.section`
  padding-top: 5rem;
  width: 100%;
  position: relative;
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

const StyledProductCard = styled.div`
  width: 100%;
  height: 50rem;
`;
const StyledProductImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Gallery = () => {
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
    <StyledGallery>
      <Heading title={"مـعـرض الـصـور"} />
      <StyledGalleryList>
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
                  <StyledProductImage>
                    <img
                      src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720"
                      alt=""
                    />
                  </StyledProductImage>
                </StyledProductCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </StyledGalleryList>
    </StyledGallery>
  );
};

export default Gallery;
