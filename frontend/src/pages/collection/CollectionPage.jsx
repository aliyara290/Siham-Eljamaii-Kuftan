// src/pages/collection/CollectionPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CollectionLayout, { ProductsGrid } from './layouts/CollectionLayout';
import styled from 'styled-components';
import { getProductsByCollection } from '../../api/products';

const CollectionPage = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for collections
  const collectionsData = {
    'kaftan': {
      name: 'قفطان',
      description: 'مجموعة متميزة من القفاطين المغربية الأصيلة بتصاميم عصرية وألوان متنوعة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880',
      productsCount: 24
    },
    'jellaba': {
      name: 'جلابة',
      description: 'تشكيلة راقية من الجلابات العصرية المصممة بدقة لتناسب جميع الأذواق',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720',
      productsCount: 18
    },
    'jewelry': {
      name: 'مجوهرات',
      description: 'قطع مجوهرات فريدة مصممة يدويًا لتضيف لمسة من الفخامة والأناقة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/17_fc0e4dee-66b2-4b95-9c63-9a24459efc9b.jpg?crop=region&crop_height=2048&crop_left=204&crop_top=0&crop_width=1638&v=1705111629&width=720',
      productsCount: 32
    },
    'accessories': {
      name: 'إكسسوارات',
      description: 'إكسسوارات متنوعة لإكمال إطلالتك بأسلوب فريد يعكس الأصالة والعصرية',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720',
      productsCount: 15
    },
    'abaya': {
      name: 'عباية',
      description: 'عبايات أنيقة بتصاميم معاصرة مستوحاة من التراث مع لمسة من الحداثة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/1_bbd9b5db-1e17-469e-94bf-81e33a09f52a.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1696787030&width=720',
      productsCount: 12
    },
    'special-occasions': {
      name: 'مناسبات خاصة',
      description: 'تشكيلة مميزة للمناسبات الخاصة والأعراس تجمع بين الفخامة والأناقة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720',
      productsCount: 20
    }
  };

  // Mock products data
  const generateMockProducts = (count) => {
    const mockProducts = [];
    const images = [
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/116_b8f51dc8-acf4-40e7-9c3f-fd77dd6e1f60.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1704551622&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/1_bbd9b5db-1e17-469e-94bf-81e33a09f52a.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1696787030&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720',
    ];
    
    const names = {
      'kaftan': [
        'قفطان مغربي فخم مطرز',
        'قفطان كلاسيكي بألوان مبهجة',
        'قفطان عصري بتطريز فضي',
        'قفطان تقليدي بلمسة حديثة',
        'قفطان مخملي بتصميم أنيق'
      ],
      'jellaba': [
        'جلابة نسائية مطرزة',
        'جلابة تقليدية بلمسة عصرية',
        'جلابة فاخرة للمناسبات',
        'جلابة مغربية بتطريز يدوي',
        'جلابة كاجوال للاستخدام اليومي'
      ],
      'jewelry': [
        'أقراط فضية بأحجار كريمة',
        'عقد مطلي بالذهب بتصميم عربي',
        'خاتم فضة بنقوش تقليدية',
        'إسورة مرصعة بالأحجار الكريمة',
        'طقم مجوهرات كامل للعروس'
      ],
      'accessories': [
        'حزام جلدي مطرز للقفطان',
        'حقيبة يد مغربية تقليدية',
        'وشاح حريري بنقوش شرقية',
        'إكسسوار شعر مرصع بالأحجار',
        'قلادة تقليدية بتصميم فاخر'
      ],
      'abaya': [
        'عباية مطرزة بتصميم أنيق',
        'عباية عصرية بلمسات شرقية',
        'عباية سوداء بتطريز ذهبي',
        'عباية فاخرة للمناسبات',
        'عباية كاجوال للاستخدام اليومي'
      ],
      'special-occasions': [
        'فستان سهرة مطرز بالخرز',
        'قفطان فاخر للأعراس',
        'طقم عروس تقليدي',
        'جلابة مطرزة للمناسبات',
        'فستان سهرة بتطريز يدوي'
      ]
    };

    const getRandomPrice = () => Math.floor(Math.random() * (5000 - 800) + 800);
    const getRandomDiscount = () => Math.random() > 0.7; // 30% chance of having a discount

    for (let i = 1; i <= count; i++) {
      const imageIndex = Math.floor(Math.random() * images.length);
      const nameList = names[slug] || names['kaftan']; // Fallback to kaftan if no matching names
      const nameIndex = i % nameList.length;
      
      const price = getRandomPrice();
      const hasDiscount = getRandomDiscount();
      const oldPrice = hasDiscount ? price + Math.floor(Math.random() * 1000) : null;
      
      mockProducts.push({
        id: `${slug}-${i}`,
        name: nameList[nameIndex],
        slug: `${slug}-product-${i}`,
        price: price,
        oldPrice: oldPrice,
        image: images[imageIndex],
        colors: ['#000000', '#0c2461', '#8e0000', '#006266'].slice(0, Math.floor(Math.random() * 4) + 1),
        sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 5) + 1)
      });
    }
    
    return mockProducts;
  };

  // Fetch collection data and products
  useEffect(() => {
    setLoading(true);
    
    // Try to fetch products from API first
    getProductsByCollection(slug)
      .then((response) => {
        console.log('API response:', response.data);
        
        // If we have real collection data from API
        if (response.data && response.data.collection) {
          setCollection(response.data.collection);
          setProducts(response.data.products || []);
        } else {
          // Fallback to mock data if API doesn't return expected format
          fallbackToMockData();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('API error:', error);
        // Fallback to mock data on error
        fallbackToMockData();
        setLoading(false);
      });
      
    // Function to use mock data as fallback
    const fallbackToMockData = () => {
      // Get the collection data
      const collectionData = collectionsData[slug] || {
        name: 'مجموعة',
        description: 'استكشف مجموعتنا المميزة من المنتجات المختارة',
        image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880',
        productsCount: 12
      };
      
      // Generate mock products
      const mockProducts = generateMockProducts(collectionData.productsCount);
      
      setCollection(collectionData);
      setProducts(mockProducts);
    };
  }, [slug]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <CollectionLayout
      title={collection.name}
      description={collection.description}
      backgroundImage={collection.image}
      products={products}
      setProducts={setProducts}
    >
      <ProductsGrid />
    </CollectionLayout>
  );
};

export default CollectionPage;

// Loading indicator components
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