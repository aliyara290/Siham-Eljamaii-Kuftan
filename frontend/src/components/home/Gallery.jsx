import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import styled from "styled-components";
import Heading from "../heading/Heading.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getGalleryPics } from "../../api/gallery/index.js";



const Gallery = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", () => {
        setIsBeginning(swiperRef.current.isBeginning);
        setIsEnd(swiperRef.current.isEnd);
      });
    }
  }, []);

  useEffect(() => {
    getGalleryPics()
      .then((res) => {
        setGallery(res.data.data.galleries);
      })
      .catch((err) => {
        console.error("Error fetching gallery images:", err);
      });
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
          }}
        >
          {gallery.map((pic, index) => {
            return (
              <SwiperSlide key={index}>
                <StyledProductCard>
                  <StyledProductImage>
                    <img
                      src={pic.photo}
                      alt={pic.description}
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

const StyledGallery = styled.section`
  width: 100%;
  margin-top: 5rem;
  direction: ltr;
  .swiper-slide {
    width: 38rem !important;
  }
  
  @media (max-width: 768px) {
    .swiper-slide {
      width: 28rem !important;
    }
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
  
  @media (max-width: 768px) {
    left: 1rem;
    button {
      width: 4rem;
      height: 4rem;
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
  
  @media (max-width: 768px) {
    right: 1rem;
    button {
      width: 4rem;
      height: 4rem;
    }
  }
`;

const StyledProductCard = styled.div`
  width: 100%;
  height: 50rem;
  
  @media (max-width: 768px) {
    height: 40rem;
  }
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