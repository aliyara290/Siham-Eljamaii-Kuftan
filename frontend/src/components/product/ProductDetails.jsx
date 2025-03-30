import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { HeartIcon, ShoppingBagIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Heading from "../heading/Heading";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const thumbnailsRef = useRef(null);

  // Reset "Added to Cart" message after 3 seconds
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  // Mock product data - would be fetched from API
  const product = {
    id: "kftn-01",
    name: "قفطان مغربي فخم لايان مرصع بجواهر سواروفسكي وزهور",
    price: 3500,
    oldPrice: 4200,
    colors: [
      { id: "black", name: "أسود", value: "#000000" },
      { id: "navy", name: "كحلي", value: "#0c2461" },
      { id: "burgundy", name: "عنابي", value: "#8e0000" },
      { id: "emerald", name: "زمردي", value: "#006266" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "قفطان مغربي فاخر مصنوع من أفخم القماش وأجود الخامات، مرصع بجواهر سواروفسكي ومزين بتطريز يدوي متقن. يتميز بتصميمه الأنيق الذي يجمع بين الأصالة والمعاصرة، مما يجعله خيارًا مثاليًا للمناسبات الخاصة والحفلات الراقية.",
    details: [
      "قماش حرير فاخر",
      "مرصع بجواهر سواروفسكي",
      "تطريز يدوي متقن",
      "مصنوع بواسطة حرفيين مهرة",
      "صناعة مغربية أصيلة",
    ],
    care: [
      "تنظيف جاف فقط",
      "يحفظ في مكان جاف",
      "يفضل استخدام علاقة واسعة",
    ],
    images: [
      "https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720",
      "https://ma.bouchrafilalilahlou.com/cdn/shop/files/1_bbd9b5db-1e17-469e-94bf-81e33a09f52a.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1696787030&width=720",
      "https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720",
      "https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720",
    ],
    relatedProducts: [
      {
        id: "kftn-02",
        name: "قفطان مخملي بتطريز ذهبي",
        price: 2800,
        image: "https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720",
      },
      {
        id: "kftn-03",
        name: "قفطان بألوان الباستيل مع تطريز فضي",
        price: 3100,
        image: "https://ma.bouchrafilalilahlou.com/cdn/shop/files/17_fc0e4dee-66b2-4b95-9c63-9a24459efc9b.jpg?crop=region&crop_height=2048&crop_left=204&crop_top=0&crop_width=1638&v=1705111629&width=720",
      },
      {
        id: "kftn-04",
        name: "قفطان كلاسيكي بلمسة عصرية",
        price: 2950,
        image: "https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720",
      },
    ],
  };

  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("الرجاء اختيار المقاس");
      return;
    }
    
    if (!selectedColor) {
      alert("الرجاء اختيار اللون");
      return;
    }
    
    // Get selected color name
    const colorName = product.colors.find(color => color.id === selectedColor)?.name || selectedColor;
    
    // Create product object for cart
    const productForCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0], // Use first image
    };
    
    // Add to cart
    addToCart(productForCart, quantity, colorName, selectedSize);
    
    // Show added to cart message
    setAddedToCart(true);
  };

  // Scroll to current thumbnail
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnailWidth = 80; // width + margin
      thumbnailsRef.current.scrollLeft = currentImageIndex * thumbnailWidth;
    }
  }, [currentImageIndex]);

  // Set default color on component mount
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].id);
    }
  }, []);

  return (
    <ProductPageContainer>
      <ProductLayout>
        <ProductGallery>
          <MainImageContainer>
            <NavigationButton position="left" onClick={handlePrevImage}>
              <ChevronLeftIcon width={24} height={24} />
            </NavigationButton>
            <MainImage src={product.images[currentImageIndex]} alt={product.name} />
            <NavigationButton position="right" onClick={handleNextImage}>
              <ChevronRightIcon width={24} height={24} />
            </NavigationButton>
            <FavoriteButton onClick={toggleFavorite}>
              {isFavorite ? (
                <HeartSolidIcon width={24} height={24} />
              ) : (
                <HeartIcon width={24} height={24} />
              )}
            </FavoriteButton>
          </MainImageContainer>
          <ThumbnailsContainer ref={thumbnailsRef}>
            {product.images.map((image, index) => (
              <ThumbnailButton
                key={index}
                active={index === currentImageIndex}
                onClick={() => handleImageChange(index)}
              >
                <ThumbnailImage src={image} alt={`${product.name} - الصورة ${index + 1}`} />
              </ThumbnailButton>
            ))}
          </ThumbnailsContainer>
        </ProductGallery>

        <ProductInfo>
          <ProductCategory>قفطاني</ProductCategory>
          <ProductName>{product.name}</ProductName>
          <PriceContainer>
            <CurrentPrice>{product.price} د.م</CurrentPrice>
            {product.oldPrice && <OldPrice>{product.oldPrice} د.م</OldPrice>}
          </PriceContainer>

          <SectionTitle>اللون</SectionTitle>
          <ColorOptionsContainer>
            {product.colors.map((color) => (
              <ColorOption
                key={color.id}
                color={color.value}
                selected={selectedColor === color.id}
                onClick={() => handleColorSelect(color.id)}
              >
                {selectedColor === color.id && <ColorCheckmark />}
              </ColorOption>
            ))}
          </ColorOptionsContainer>

          <SectionTitle>المقاس</SectionTitle>
          <SizeOptionsContainer>
            {product.sizes.map((size) => (
              <SizeOption
                key={size}
                selected={selectedSize === size}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </SizeOption>
            ))}
          </SizeOptionsContainer>
          <SizeGuideLink href="#">دليل المقاسات</SizeGuideLink>

          <SectionTitle>الكمية</SectionTitle>
          <QuantitySelector>
            <QuantityButton onClick={() => handleQuantityChange(quantity - 1)}>-</QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={() => handleQuantityChange(quantity + 1)}>+</QuantityButton>
          </QuantitySelector>

          <ActionButtons>
            <AddToCartButton onClick={handleAddToCart}>
              <ShoppingBagIcon width={20} height={20} />
              <span>{addedToCart ? "تمت الإضافة!" : "أضف إلى السلة"}</span>
            </AddToCartButton>
            <BuyNowButton onClick={handleAddToCart}>شراء الآن</BuyNowButton>
          </ActionButtons>

          <ProductDescription>{product.description}</ProductDescription>

          <ProductDetailsContainer>
            <DetailsTab>
              <DetailsList>
                <DetailsTitle>المميزات</DetailsTitle>
                {product.details.map((detail, index) => (
                  <DetailItem key={index}>{detail}</DetailItem>
                ))}
              </DetailsList>
              <DetailsList>
                <DetailsTitle>العناية</DetailsTitle>
                {product.care.map((item, index) => (
                  <DetailItem key={index}>{item}</DetailItem>
                ))}
              </DetailsList>
            </DetailsTab>
          </ProductDetailsContainer>
        </ProductInfo>
      </ProductLayout>

      <RelatedProductsSection>
        <Heading title="قد يعجبك أيضاً" weight={500} />
        <RelatedProductsContainer>
          {product.relatedProducts.map((relatedProduct) => (
            <RelatedProductCard key={relatedProduct.id}>
              <Link to={`/product/${relatedProduct.id}`}>
                <RelatedProductImage src={relatedProduct.image} alt={relatedProduct.name} />
                <RelatedProductInfo>
                  <RelatedProductName>{relatedProduct.name}</RelatedProductName>
                  <RelatedProductPrice>{relatedProduct.price} د.م</RelatedProductPrice>
                </RelatedProductInfo>
              </Link>
            </RelatedProductCard>
          ))}
        </RelatedProductsContainer>
      </RelatedProductsSection>
    </ProductPageContainer>
  );
};

export default ProductDetails;

// Styled Components
const ProductPageContainer = styled.div`
  padding-top: 12rem;
  padding-bottom: 6rem;
  background-color: var(--white);
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  max-width: 140rem;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ProductGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80rem;
  max-height: 80rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: 2rem;
  transform: translateY(-50%);
  width: 5rem;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  z-index: 10;

  &:hover {
    opacity: 1;
    background-color: var(--white);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 4.5rem;
  height: 4.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
  color: var(--neutral-700);

  &:hover {
    background-color: var(--white);
    color: #e74c3c;
  }

  svg {
    color: inherit;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--neutral-100);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--neutral-400);
    border-radius: 10px;
  }
`;

const ThumbnailButton = styled.button`
  width: 7rem;
  height: 7rem;
  padding: 0;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  overflow: hidden;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  border: ${({ active }) => (active ? '2px solid var(--neutral-800)' : '2px solid transparent')};
  transition: opacity 0.3s ease, border-color 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 2rem 0;
`;

const ProductCategory = styled.div`
  font-size: var(--text-sm);
  color: var(--neutral-600);
  margin-bottom: 1rem;
`;

const ProductName = styled.h1`
  font-size: var(--text-xxl);
  color: var(--neutral-900);
  font-weight: 500;
  margin-bottom: 2rem;
  line-height: 1.3;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const CurrentPrice = styled.span`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
`;

const OldPrice = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-500);
  text-decoration: line-through;
`;

const SectionTitle = styled.h3`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 1.5rem;
`;

const ColorOptionsContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 3rem;
`;

const ColorOption = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ selected, color }) => (selected ? 'var(--neutral-800)' : color)};
  outline: ${({ selected }) => (selected ? '1px solid var(--neutral-300)' : 'none')};
  outline-offset: 2px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ColorCheckmark = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: white;
`;

const SizeOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SizeOption = styled.button`
  min-width: 4.5rem;
  height: 4.5rem;
  padding: 0 1.5rem;
  border: 1px solid ${({ selected }) => (selected ? 'var(--neutral-800)' : 'var(--neutral-300)')};
  background-color: ${({ selected }) => (selected ? 'var(--neutral-800)' : 'var(--white)')};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--neutral-800)')};
  font-size: var(--text-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--neutral-800);
  }
`;

const SizeGuideLink = styled.a`
  display: inline-block;
  font-size: var(--text-sm);
  color: var(--neutral-600);
  text-decoration: underline;
  margin-bottom: 3rem;
  
  &:hover {
    color: var(--neutral-900);
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  border: 1px solid var(--neutral-300);
  width: fit-content;
`;

const QuantityButton = styled.button`
  width: 4.5rem;
  height: 4.5rem;
  background-color: var(--white);
  border: none;
  font-size: var(--text-lg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`;

const QuantityDisplay = styled.div`
  width: 6rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-md);
  border-right: 1px solid var(--neutral-300);
  border-left: 1px solid var(--neutral-300);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 3;
  height: 5rem;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-800);
  }
`;

const BuyNowButton = styled.button`
  flex: 2;
  height: 5rem;
  background-color: var(--white);
  color: var(--neutral-900);
  font-size: var(--text-md);
  border: 1px solid var(--neutral-900);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-100);
  }
`;

const ProductDescription = styled.p`
  font-size: var(--text-md);
  line-height: 1.7;
  color: var(--neutral-700);
  margin-bottom: 4rem;
`;

const ProductDetailsContainer = styled.div`
  margin-bottom: 4rem;
`;

const DetailsTab = styled.div`
  display: flex;
  gap: 6rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const DetailsList = styled.div`
  flex: 1;
`;

const DetailsTitle = styled.h4`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--neutral-300);
`;

const DetailItem = styled.div`
  font-size: var(--text-md);
  color: var(--neutral-700);
  padding: 1rem 0;
  border-bottom: 1px solid var(--neutral-100);
  display: flex;
  align-items: center;
  
  &:before {
    content: "";
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: var(--neutral-400);
    margin-left: 1rem;
  }
`;

const RelatedProductsSection = styled.section`
  padding: 8rem 2rem 2rem;
  max-width: 140rem;
  margin: 0 auto;
`;

const RelatedProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedProductCard = styled.div`
  overflow: hidden;
`;

const RelatedProductImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  transition: transform 0.4s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const RelatedProductInfo = styled.div`
  padding: 1.5rem 0;
  text-align: center;
`;

const RelatedProductName = styled.h3`
  font-size: var(--text-md);
  color: var(--neutral-700);
  font-weight: 500;
  margin-bottom: 0.8rem;
`;

const RelatedProductPrice = styled.span`
  font-size: var(--text-lg);
  color: var(--neutral-900);
  font-weight: 600;
`;