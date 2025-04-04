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
  const [error, setError] = useState(null);

  // Fetch collection data and products
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch products from API
    getProductsByCollection(slug)
      .then((response) => {
        console.log('API response:', response.data);
        
        if (response.data && response.data.data) {
          // Map API products to the format expected by the ProductsGrid component
          const mappedProducts = response.data.data.map(product => ({
            id: product.id,
            name: product.name_en,
            slug: product.slug,
            price: parseFloat(product.price),
            oldPrice: product.old_price ? parseFloat(product.old_price) : null,
            image: product.images && product.images.length > 0 ? product.images[0].url : null,
            category: product.category_slug,
            colors: product.colors?.map(color => color.value) || [],
            sizes: product.sizes?.map(size => size.name) || []
          }));
          
          // Create collection object
          const collectionData = {
            name: "جسور بين الأصالة والمعاصرة",
            description: "تصاميم تحكي تراثنا وتلمس روح العصر",
            image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880',
            productsCount: mappedProducts.length
          };
          
          setCollection(collectionData);
          setProducts(mappedProducts);
        } else {
          // If API response isn't in expected format, create fallback data
          fallbackToMockData();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('API error:', error);
        fallbackToMockData();
        setLoading(false);
      });
      
    // Function to use mock data as fallback
    const fallbackToMockData = () => {
      setError('Could not load products from API. Showing sample data instead.');
      
      // Get the collection data
      const collectionData = {
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        description: 'Explore our collection of beautifully crafted items.',
        image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880',
        productsCount: 6
      };
      
      // Generate mock products
      const mockProducts = generateMockProducts(6);
      
      setCollection(collectionData);
      setProducts(mockProducts);
    };
  }, [slug]);

  // Mock products generator function (used only if API fails)
  const generateMockProducts = (count) => {
    const mockProducts = [];
    const images = [
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/116_b8f51dc8-acf4-40e7-9c3f-fd77dd6e1f60.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1704551622&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/1_bbd9b5db-1e17-469e-94bf-81e33a09f52a.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1696787030&width=720',
      'https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720',
    ];
    
    const names = [
      'Elegant Kaftan',
      'Traditional Jellaba',
      'Modern Design Kaftan',
      'Embroidered Piece',
      'Formal Occasion Kaftan',
      'Premium Collection Item'
    ];

    for (let i = 1; i <= count; i++) {
      const imageIndex = Math.floor(Math.random() * images.length);
      const nameIndex = Math.floor(Math.random() * names.length);
      
      const price = Math.floor(Math.random() * (5000 - 800) + 800);
      const hasDiscount = Math.random() > 0.7;
      const oldPrice = hasDiscount ? price + Math.floor(Math.random() * 1000) : null;
      
      mockProducts.push({
        id: `${slug}-${i}`,
        name: names[nameIndex],
        slug: `${slug}-product-${i}`,
        price: price,
        oldPrice: oldPrice,
        image: images[imageIndex],
        category: slug,
        colors: ['#000000', '#0c2461', '#8e0000'].slice(0, Math.floor(Math.random() * 3) + 1),
        sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 5) + 1)
      });
    }
    
    return mockProducts;
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <CollectionLayout
      title={collection?.name || slug}
      description={collection?.description || ''}
      backgroundImage={collection?.image || ''}
      products={products}
      setProducts={setProducts}
      error={error}
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
  padding-top: 12rem;
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