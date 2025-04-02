import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../heading/Heading";
import SubHeading from "../heading/SubHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";

const StyledTestimonials = styled.section`
  width: 100%;
  padding: 5rem 0;
  background-color: #f7f5f2;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://www.transparenttextures.com/patterns/diamond-upholstery.png');
    opacity: 0.15;
    z-index: 1;
  }
  
  &::after {
    content: "❝";
    position: absolute;
    top: 5rem;
    left: 5rem;
    font-size: 25rem;
    color: rgba(0, 0, 0, 0.03);
    font-family: serif;
    line-height: 1;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 130rem;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 5;
`;

const StyledHeader = styled.div`
  margin-bottom: 7rem;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -3rem;
    left: 50%;
    transform: translateX(-50%);
    width: 6rem;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--neutral-700), transparent);
  }
`;

const StyledCarouselContent = styled.div`
  /* padding: 4rem 8rem; */
  position: relative;
  
  .swiper {
    padding: 5rem 0 0;
  }
  
  .swiper-pagination {
    position: relative;
    margin-top: 5rem;
  }
  
  .swiper-pagination-bullet {
    width: 1.2rem;
    height: 1.2rem;
    background-color: transparent;
    border: 1px solid var(--neutral-500);
    opacity: 0.7;
    transition: all 0.3s ease;
    
    &-active {
      opacity: 1;
      background-color: var(--neutral-800);
      border-color: var(--neutral-800);
      transform: scale(1.2);
    }
  }
  
  .swiper-slide {
    transition: all 0.4s ease;
    opacity: 0.4;
    transform: scale(0.85);
    
    &-active {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const QuoteSymbol = styled.div`
  font-size: 6rem;
  line-height: 1;
  color: rgba(0, 0, 0, 0.07);
  font-family: serif;
  position: absolute;
  top: 3rem;
  right: 3rem;
`;

const StyledTestimonialCard = styled.div`
  width: 100%;
  background-color: var(--white);
  border-radius: 0.5rem;
  padding: 5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  height: 38rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 8rem;
    height: 8rem;
    background-color: #f8f4ee;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 8rem;
    height: 8rem;
    background-color: #f8f4ee;
    clip-path: polygon(0 100%, 0 0, 100% 100%);
  }
`;

const StyledQuote = styled.div`
  direction: rtl;
  position: relative;
  z-index: 2;
  
  p {
    font-size: var(--text-lg);
    line-height: 1.7;
    color: var(--neutral-700);
    font-style: italic;
    position: relative;
  }
`;

const StyledCustomerInfo = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  direction: rtl;
  margin-top: 3rem;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: -1.5rem;
    right: 0;
    width: 4rem;
    height: 1px;
    background-color: var(--neutral-300);
  }
`;

const StyledCustomerImage = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f8f4ee;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  background-color: var(--neutral-200);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    color: var(--neutral-400);
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const StyledCustomerDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledCustomerName = styled.h4`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 0.5rem;
`;

const StyledCustomerTitle = styled.span`
  font-size: var(--text-sm);
  color: var(--neutral-600);
  margin-bottom: 1rem;
`;

const StyledRating = styled.div`
  display: flex;
  gap: 0.3rem;
  color: #c59d5f;
`;

const StyledNavButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
`;

const StyledNavButton = styled.button`
  width: 5rem;
  height: 5rem;
  border: 1px solid var(--neutral-300);
  border-radius: 50%;
  background-color: transparent;
  color: var(--neutral-700);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-800);
    border-color: var(--neutral-800);
    color: var(--white);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background-color: transparent;
      color: var(--neutral-700);
      border-color: var(--neutral-300);
    }
  }
  
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const testimonials = [
  {
    id: 1,
    quote: "لقد تعاملت مع العديد من متاجر القفطان، لكن سهام كفتان تقدم مستوى استثنائيًا من الجودة والإبداع. القفطان الذي اقتنيته لحفل زفاف ابنتي كان تحفة فنية حقيقية أبهرت كل الحاضرين.",
    name: "نسرين البوشيخي",
    title: "الرباط",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    rating: 5
  },
  {
    id: 2,
    quote: "كعروس كنت أبحث عن قفطان يعكس أصالة التراث المغربي وروح العصر الحديث. وجدت ضالتي في تصاميم سهام الفريدة. خدمة شخصية راقية واهتمام بأدق التفاصيل، تجربة لا تُنسى حقًا.",
    name: "غزلان العلوي",
    title: "الدار البيضاء",
    rating: 5
  },
  {
    id: 3,
    quote: "لم أتوقع أبدًا هذا المستوى من الرقي والتميز! الخامات المستخدمة فاخرة جدًا، والتطريز اليدوي يعكس مهارة عالية وذوقًا رفيعًا. استثمار حقيقي في قطعة ستبقى معي لسنوات.",
    name: "سلمى الناصري",
    title: "مراكش",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5
  },
  {
    id: 4,
    quote: "أعشق كيف تمزج المجموعات بين التقاليد المغربية العريقة واللمسات العصرية الأنيقة. كل قطعة تشعرك بأنها صُممت خصيصًا لك. تجربة التسوق من موقعهم كانت سلسة ومريحة.",
    name: "ياسمين القادري",
    title: "فاس",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    rating: 4
  },
  {
    id: 5,
    quote: "جلابية العيد التي طلبتها وصلت في الوقت المحدد تمامًا وكانت بجودة تفوق توقعاتي. التفاصيل مذهلة والتشطيب احترافي جدًا. أصبحت سهام كفتان وجهتي الأولى للأزياء التقليدية.",
    name: "هند المنصوري",
    title: "طنجة",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  }
];

const Testimonials = () => {
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
    <StyledTestimonials>
      <StyledContainer>
        <StyledHeader>
          <Heading title={"آراء عملائنا"} weight={500} />
          <SubHeading
            title={"تجارب حقيقية مع سهام كفتان"}
            size={"lg"}
          />
        </StyledHeader>
        
        <StyledCarouselContent>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 1.8,
              },
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <StyledTestimonialCard>
                  <QuoteSymbol>❞</QuoteSymbol>
                  <StyledQuote>
                    <p>{testimonial.quote}</p>
                  </StyledQuote>
                  <StyledCustomerInfo>
                    <StyledCustomerImage>
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.name} />
                      ) : (
                        <UserIcon />
                      )}
                    </StyledCustomerImage>
                    <StyledCustomerDetails>
                      <StyledCustomerName>{testimonial.name}</StyledCustomerName>
                      <StyledCustomerTitle>{testimonial.title}</StyledCustomerTitle>
                      <StyledRating>
                        {[...Array(5)].map((_, i) => (
                          i < testimonial.rating ? (
                            <StarIconSolid key={i} width={18} height={18} />
                          ) : (
                            <StarIconOutline key={i} width={18} height={18} />
                          )
                        ))}
                      </StyledRating>
                    </StyledCustomerDetails>
                  </StyledCustomerInfo>
                </StyledTestimonialCard>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <StyledNavButtons>
            <StyledNavButton 
              onClick={() => swiperRef.current?.slidePrev()} 
              disabled={isBeginning}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </StyledNavButton>
            <StyledNavButton 
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </StyledNavButton>
          </StyledNavButtons>
        </StyledCarouselContent>
      </StyledContainer>
    </StyledTestimonials>
  );
};

export default Testimonials;