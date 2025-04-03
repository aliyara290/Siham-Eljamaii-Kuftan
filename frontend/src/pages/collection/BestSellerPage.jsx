// src/pages/collection/BestSellerPage.jsx
import React, { useState, useEffect } from 'react';
import CollectionLayout, { ProductsGrid } from './layouts/CollectionLayout';

const BestSellerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock products data
  const generateMockProducts = () => {
    const mockProducts = [];
    const images = [
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/116_b8f51dc8-acf4-40e7-9c3f-fd77dd6e1f60.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1704551622&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/1_bbd9b5db-1e17-469e-94bf-81e33a09f52a.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1696787030&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720',
    ];
    
    const names = [
      'قفطان مغربي فخم مطرز بالذهب',
      'قفطان كلاسيكي بألوان مبهجة',
      'قفطان عصري بتطريز فضي',
      'جلابة مغربية فخمة للمناسبات',
      'قفطان مخملي بتصميم أنيق',
      'قفطان تقليدي بلمسة حديثة',
      'جلابة نسائية مطرزة',
      'قفطان سواريه بتطريز ذهبي',
      'قفطان لايان بتطريز يدوي فاخر'
    ];

    const categories = ['قفطان', 'جلابة', 'تاكشيطة', 'مجوهرات'];
    const getRandomPrice = () => Math.floor(Math.random() * (5000 - 800) + 800);
    const getRandomDiscount = () => Math.random() > 0.7; // 30% chance of having a discount

    for (let i = 1; i <= 24; i++) {
      const imageIndex = Math.floor(Math.random() * images.length);
      const nameIndex = Math.floor(Math.random() * names.length);
      const categoryIndex = Math.floor(Math.random() * categories.length);
      
      const price = getRandomPrice();
      const hasDiscount = getRandomDiscount();
      const oldPrice = hasDiscount ? price + Math.floor(Math.random() * 1000) : null;
      
      mockProducts.push({
        id: `bestseller-${i}`,
        name: names[nameIndex],
        slug: `bestseller-product-${i}`,
        price: price,
        oldPrice: oldPrice,
        image: images[imageIndex],
        category: categories[categoryIndex],
        colors: ['#000000', '#0c2461', '#8e0000', '#006266'].slice(0, Math.floor(Math.random() * 4) + 1),
        sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 5) + 1)
      });
    }
    
    return mockProducts;
  };

  // Simulate API call to fetch products
  useEffect(() => {
    setLoading(true);
    
    // Generate mock products
    const mockProducts = generateMockProducts();
    
    // Simulate API delay
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <CollectionLayout
      title="الأكثر مبيعاً"
      description="تصفح تشكيلة من أكثر منتجاتنا مبيعاً والتي تميزت بجودتها العالية وتصاميمها الفريدة"
      backgroundImage="https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880"
      products={products}
      setProducts={setProducts}
    >
      <ProductsGrid />
    </CollectionLayout>
  );
};

export default BestSellerPage;

// Loading indicator components
import styled from 'styled-components';

const LoadingContainer = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border: 0.5rem solid var(--neutral-200);
  border-top: 0.5rem solid var(--neutral-900);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;