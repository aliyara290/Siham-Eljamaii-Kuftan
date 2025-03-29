import React, { useState } from "react";
import styled from "styled-components";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const StyledProductDetail = styled.div`
  width: 100%;
  padding-top: 13rem;
  padding-bottom: 8rem;
  display: flex;
  justify-content: center;
`;

const StyledProductContainer = styled.div`
  width: 100%;
  max-width: 120rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 0 2rem;
  }
`;

const StyledProductImages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledMainImage = styled.div`
  width: 100%;
  height: 70rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 50rem;
  }
`;

const StyledThumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const StyledThumbnail = styled.div`
  width: 100%;
  height: 15rem;
  overflow: hidden;
  cursor: pointer;
  opacity: ${({ active }) => (active ? "1" : "0.6")};
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 10rem;
  }
`;

const StyledProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledProductName = styled.h1`
  font-size: var(--text-xxl);
  color: var(--neutral-800);
  font-weight: 500;
`;

const StyledProductPrice = styled.div`
  font-size: var(--text-xl);
  color: var(--neutral-700);
  font-weight: 600;
`;

const StyledProductDescription = styled.div`
  padding-top: 2rem;
  p {
    font-size: var(--text-md);
    color: var(--neutral-600);
    line-height: 1.6;
  }
`;

const StyledProductOptions = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledOptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    font-size: var(--text-md);
    color: var(--neutral-700);
    font-weight: 500;
  }
`;

const StyledColorOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledColorOption = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ selected }) => (selected ? "var(--neutral-900)" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledSizeOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledSizeOption = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "var(--neutral-900)" : "var(--neutral-50)")};
  color: ${({ selected }) => (selected ? "var(--white)" : "var(--neutral-700)")};
  font-size: var(--text-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ selected }) => (selected ? "var(--neutral-900)" : "var(--neutral-200)")};
  }
`;

const StyledQuantitySelector = styled.div`
  display: flex;
  align-items: center;
  
  button {
    width: 4rem;
    height: 4rem;
    background-color: var(--neutral-100);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-xl);
    font-weight: 500;
    cursor: pointer;
    border: none;
    
    &:hover {
      background-color: var(--neutral-200);
    }
  }
  
  span {
    width: 6rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-md);
    font-weight: 500;
    background-color: var(--neutral-50);
  }
`;

const StyledActionButtons = styled.div`
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledAddToCartButton = styled.button`
  width: 100%;
  height: 5rem;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--darken);
  }
`;

const StyledWishlistButton = styled.button`
  width: 100%;
  height: 5rem;
  background-color: var(--white);
  border: 1px solid var(--neutral-200);
  color: var(--neutral-700);
  font-size: var(--text-md);
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--neutral-50);
  }
`;

const StyledProductDetails = styled.div`
  padding-top: 4rem;
  border-top: 1px solid var(--neutral-200);
  
  h3 {
    font-size: var(--text-lg);
    color: var(--neutral-800);
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style-position: inside;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    li {
      font-size: var(--text-md);
      color: var(--neutral-600);
    }
  }
`;

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#dfd5d0");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  
  const images = [
    "https://ma.bouchrafilalilahlou.com/cdn/shop/files/1_bbd9b5db-1e17-469e-94bf-81e33a09f52a.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1696787030&width=720",
    "https://ma.bouchrafilalilahlou.com/cdn/shop/files/17_fc0e4dee-66b2-4b95-9c63-9a24459efc9b.jpg?crop=region&crop_height=2048&crop_left=204&crop_top=0&crop_width=1638&v=1705111629&width=720",
    "https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720",
    "https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720",
  ];
  
  const colors = ["#dfd5d0", "#000000", "#eb2626", "#4b2d8d"];
  const sizes = ["S", "M", "L", "XL"];
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <StyledProductDetail>
      <StyledProductContainer>
        <StyledProductImages>
          <StyledMainImage>
            <img src={images[currentImage]} alt="قفطان مغربي" />
          </StyledMainImage>
          <StyledThumbnails>
            {images.map((image, index) => (
              <StyledThumbnail 
                key={index} 
                active={currentImage === index}
                onClick={() => setCurrentImage(index)}
              >
                <img src={image} alt={`صورة مصغرة ${index + 1}`} />
              </StyledThumbnail>
            ))}
          </StyledThumbnails>
        </StyledProductImages>
        
        <StyledProductInfo>
          <StyledProductName>قفطان مغربي فخم لايان مرصع بجواهر سواروفسكي وزهور</StyledProductName>
          <StyledProductPrice>2400 د.م</StyledProductPrice>
          
          <StyledProductDescription>
            <p>
              قفطان مغربي فخم مصنوع من أجود أنواع الأقمشة، مرصع باليدوية بجواهر سواروفسكي وزهور مطرزة. 
              يمتاز هذا القفطان بتصميمه الأنيق والعصري الذي يجمع بين التراث المغربي الأصيل والحداثة.
              يأتي بألوان متعددة ومقاسات مختلفة لتناسب جميع الأذواق والمناسبات.
            </p>
          </StyledProductDescription>
          
          <StyledProductOptions>
            <StyledOptionGroup>
              <h3>اللون</h3>
              <StyledColorOptions>
                {colors.map(color => (
                  <StyledColorOption 
                    key={color}
                    color={color}
                    selected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </StyledColorOptions>
            </StyledOptionGroup>
            
            <StyledOptionGroup>
              <h3>المقاس</h3>
              <StyledSizeOptions>
                {sizes.map(size => (
                  <StyledSizeOption 
                    key={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </StyledSizeOption>
                ))}
              </StyledSizeOptions>
            </StyledOptionGroup>
            
            <StyledOptionGroup>
              <h3>الكمية</h3>
              <StyledQuantitySelector>
                <button onClick={decrementQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={incrementQuantity}>+</button>
              </StyledQuantitySelector>
            </StyledOptionGroup>
          </StyledProductOptions>
          
          <StyledActionButtons>
            <StyledAddToCartButton>
              <ShoppingBagIcon width={20} height={20} />
              <span>أضف إلى السلة</span>
            </StyledAddToCartButton>
            
            <StyledWishlistButton>
              <HeartIcon width={20} height={20} />
              <span>أضف إلى المفضلة</span>
            </StyledWishlistButton>
          </StyledActionButtons>
          
          <StyledProductDetails>
            <h3>تفاصيل المنتج</h3>
            <ul>
              <li>مصنوع من قماش الحرير الطبيعي</li>
              <li>مطرز يدويًا بخيوط ذهبية</li>
              <li>مرصع بجواهر سواروفسكي</li>
              <li>تصميم فريد ومميز</li>
              <li>يأتي مع حزام متناسق</li>
              <li>مناسب للمناسبات الخاصة والأعراس</li>
            </ul>
          </StyledProductDetails>
        </StyledProductInfo>
      </StyledProductContainer>
    </StyledProductDetail>
  );
};

export default ProductDetail;