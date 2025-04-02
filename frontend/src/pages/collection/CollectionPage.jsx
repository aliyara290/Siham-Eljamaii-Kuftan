import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Heading from '../../components/heading/Heading';
import { 
  ChevronDownIcon, 
  ListBulletIcon, 
  Squares2X2Icon,
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const CollectionPage = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    sizes: [],
    priceRange: [0, 5000]
  });

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
      const nameList = names[id] || names['kaftan']; // Fallback to kaftan if no matching names
      const nameIndex = i % nameList.length;
      
      const price = getRandomPrice();
      const hasDiscount = getRandomDiscount();
      const oldPrice = hasDiscount ? price + Math.floor(Math.random() * 1000) : null;
      
      mockProducts.push({
        id: `${id}-${i}`,
        name: nameList[nameIndex],
        slug: `${id}-product-${i}`,
        price: price,
        oldPrice: oldPrice,
        image: images[imageIndex],
        colors: ['#000000', '#0c2461', '#8e0000', '#006266'].slice(0, Math.floor(Math.random() * 4) + 1),
        sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 5) + 1)
      });
    }
    
    return mockProducts;
  };

  // Simulate API call to fetch collection and products
  useEffect(() => {
    setLoading(true);
    
    // Get the collection data
    const collectionData = collectionsData[id] || {
      name: 'مجموعة',
      description: 'استكشف مجموعتنا المميزة من المنتجات المختارة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880',
      productsCount: 12
    };
    
    // Generate mock products
    const mockProducts = generateMockProducts(collectionData.productsCount);
    
    // Simulate API delay
    setTimeout(() => {
      setCollection(collectionData);
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, [id]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    
    // Sort products based on selected option
    let sortedProducts = [...products];
    
    switch(value) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you'd sort by date
        sortedProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }
    setProducts(sortedProducts);
  };

  const toggleColorFilter = (color) => {
    const newColors = selectedFilters.colors.includes(color)
      ? selectedFilters.colors.filter(c => c !== color)
      : [...selectedFilters.colors, color];
    
    setSelectedFilters({
      ...selectedFilters,
      colors: newColors
    });
  };

  const toggleSizeFilter = (size) => {
    const newSizes = selectedFilters.sizes.includes(size)
      ? selectedFilters.sizes.filter(s => s !== size)
      : [...selectedFilters.sizes, size];
    
    setSelectedFilters({
      ...selectedFilters,
      sizes: newSizes
    });
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by color
    if (selectedFilters.colors.length > 0) {
      const hasMatchingColor = product.colors.some(color => 
        selectedFilters.colors.includes(color)
      );
      if (!hasMatchingColor) return false;
    }
    
    // Filter by size
    if (selectedFilters.sizes.length > 0) {
      const hasMatchingSize = product.sizes.some(size => 
        selectedFilters.sizes.includes(size)
      );
      if (!hasMatchingSize) return false;
    }
    
    // Filter by price range
    if (product.price < selectedFilters.priceRange[0] || 
        product.price > selectedFilters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  return (
    <PageContainer>
      <CollectionHero style={{ backgroundImage: `url(${collection.image})` }}>
        <CollectionHeroOverlay>
          <CollectionInfo>
            <Heading title={collection.name} size="xxxl" color={true} />
            <CollectionDescription>{collection.description}</CollectionDescription>
            <ProductCount>{collection.productsCount} منتج</ProductCount>
          </CollectionInfo>
        </CollectionHeroOverlay>
      </CollectionHero>

      <CollectionContent>
        <FiltersSidebar show={showFilters}>
          <FilterHeader>
            <FilterTitle>تصفية المنتجات</FilterTitle>
            <CloseFiltersButton onClick={toggleFilters}>
              <XMarkIcon width={20} height={20} />
            </CloseFiltersButton>
          </FilterHeader>
          
          <FilterSection>
            <FilterSectionTitle>الألوان</FilterSectionTitle>
            <ColorOptions>
              <ColorOption 
                color="#000000" 
                selected={selectedFilters.colors.includes('#000000')}
                onClick={() => toggleColorFilter('#000000')}
              />
              <ColorOption 
                color="#0c2461" 
                selected={selectedFilters.colors.includes('#0c2461')}
                onClick={() => toggleColorFilter('#0c2461')}
              />
              <ColorOption 
                color="#8e0000" 
                selected={selectedFilters.colors.includes('#8e0000')}
                onClick={() => toggleColorFilter('#8e0000')}
              />
              <ColorOption 
                color="#006266" 
                selected={selectedFilters.colors.includes('#006266')}
                onClick={() => toggleColorFilter('#006266')}
              />
            </ColorOptions>
          </FilterSection>
          
          <FilterSection>
            <FilterSectionTitle>المقاسات</FilterSectionTitle>
            <SizeOptions>
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <SizeOption 
                  key={size}
                  selected={selectedFilters.sizes.includes(size)}
                  onClick={() => toggleSizeFilter(size)}
                >
                  {size}
                </SizeOption>
              ))}
            </SizeOptions>
          </FilterSection>
          
          <FilterSection>
            <FilterSectionTitle>نطاق السعر</FilterSectionTitle>
            <PriceRange>
              <RangeInput 
                type="range" 
                min="0" 
                max="5000" 
                value={selectedFilters.priceRange[1]}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters,
                  priceRange: [selectedFilters.priceRange[0], parseInt(e.target.value)]
                })}
              />
              <PriceDisplay>
                <span>{selectedFilters.priceRange[0]} د.م</span>
                <span>{selectedFilters.priceRange[1]} د.م</span>
              </PriceDisplay>
            </PriceRange>
          </FilterSection>
          
          <ClearFiltersButton
            onClick={() => setSelectedFilters({
              colors: [],
              sizes: [],
              priceRange: [0, 5000]
            })}
          >
            مسح الفلاتر
          </ClearFiltersButton>
        </FiltersSidebar>

        <ProductsSection>
          <ToolbarContainer>
            <FilterToggle onClick={toggleFilters}>
              <FunnelIcon width={20} height={20} />
              {/* <span>تصفية</span> */}
            </FilterToggle>
            
            <SortContainer>
              <SortLabel>ترتيب حسب:</SortLabel>
              <SortSelect 
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="featured">الأكثر رواجًا</option>
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
              </SortSelect>
              <SortIcon>
                <ChevronDownIcon width={16} height={16} />
              </SortIcon>
            </SortContainer>
            
            {/* <ViewToggle>
              <ViewButton 
                active={viewMode === 'grid'} 
                onClick={() => setViewMode('grid')}
              >
                <Squares2X2Icon width={20} height={20} />
              </ViewButton>
              <ViewButton 
                active={viewMode === 'list'} 
                onClick={() => setViewMode('list')}
              >
                <ListBulletIcon width={20} height={20} />
              </ViewButton>
            </ViewToggle> */}
          </ToolbarContainer>
          
          {filteredProducts.length === 0 ? (
            <NoProductsFound>
              <NoProductsMessage>لا توجد منتجات مطابقة للفلاتر المحددة</NoProductsMessage>
              <ClearFiltersButton
                onClick={() => setSelectedFilters({
                  colors: [],
                  sizes: [],
                  priceRange: [0, 5000]
                })}
              >
                مسح الفلاتر
              </ClearFiltersButton>
            </NoProductsFound>
          ) : (
            <ProductsGrid viewMode={viewMode}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} viewMode={viewMode}>
                  <Link to={`/product/${product.slug}`}>
                    <ProductImageContainer>
                      <ProductImage src={product.image} alt={product.name} />
                    </ProductImageContainer>
                    <ProductDetails>
                      <ProductName>{product.name}</ProductName>
                      <PriceContainer>
                        <ProductPrice>{product.price} د.م</ProductPrice>
                        {product.oldPrice && (
                          <OldPrice>{product.oldPrice} د.م</OldPrice>
                        )}
                      </PriceContainer>
                      
                      {viewMode === 'list' && (
                        <>
                          <AvailableColors>
                            {product.colors.map((color, index) => (
                              <ColorDot key={index} color={color} />
                            ))}
                          </AvailableColors>
                          
                          <AvailableSizes>
                            {product.sizes.map((size, index) => (
                              <span key={index}>{size}</span>
                            ))}
                          </AvailableSizes>
                          
                          <ViewProductButton>
                            عرض المنتج
                          </ViewProductButton>
                        </>
                      )}
                    </ProductDetails>
                  </Link>
                </ProductCard>
              ))}
            </ProductsGrid>
          )}
        </ProductsSection>
      </CollectionContent>
    </PageContainer>
  );
};

export default CollectionPage;

// Styled Components
const PageContainer = styled.div`
  padding-top: 8rem;
  background-color: var(--white);
`;

const CollectionHero = styled.div`
  position: relative;
  height: 50rem;
  background-size: cover;
  background-position: center;
  margin-bottom: 4rem;
`;

const CollectionHeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CollectionInfo = styled.div`
  text-align: center;
  max-width: 80rem;
  padding: 0 2rem;
  color: var(--white);
`;

const CollectionDescription = styled.p`
  font-size: var(--text-lg);
  line-height: 1.6;
  margin: 2rem 0;
  color: var(--white);
`;

const ProductCount = styled.div`
  font-size: var(--text-md);
  color: var(--white);
  border: 1px solid var(--white);
  padding: 0.8rem 2rem;
  width: max-content;
  margin: 0 auto;
`;

const CollectionContent = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  gap: 4rem;
  max-width: 140rem;
  margin: 0 auto;
  padding: 0 2rem 8rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FiltersSidebar = styled.aside`
  position: sticky;
  top: 12rem;
  height: max-content;
  padding-bottom: 2rem;
  
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: ${({ show }) => (show ? '0' : '-30rem')};
    width: 30rem;
    height: 100vh;
    background-color: var(--white);
    z-index: 2000;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    padding: 2rem;
    overflow-y: auto;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (min-width: 1025px) {
    display: none;
  }
`;

const FilterTitle = styled.h3`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
`;

const CloseFiltersButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--neutral-100);
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: var(--neutral-200);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--neutral-200);
  padding-bottom: 2rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FilterSectionTitle = styled.h4`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 1.5rem;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ColorOption = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ selected }) => selected ? 'var(--neutral-900)' : 'transparent'};
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  min-width: 4rem;
  height: 4rem;
  padding: 0 1rem;
  border: 1px solid ${({ selected }) => selected ? 'var(--neutral-900)' : 'var(--neutral-300)'};
  background-color: ${({ selected }) => selected ? 'var(--neutral-900)' : 'var(--white)'};
  color: ${({ selected }) => selected ? 'var(--white)' : 'var(--neutral-900)'};
  font-size: var(--text-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    border-color: var(--neutral-900);
  }
`;

const PriceRange = styled.div`
  width: 100%;
`;

const RangeInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;

const PriceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--text-md);
  color: var(--neutral-700);
`;

const ClearFiltersButton = styled.button`
  background-color: var(--neutral-100);
  border: none;
  padding: 1rem 2rem;
  font-size: var(--text-md);
  color: var(--neutral-900);
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: var(--neutral-200);
  }
`;

const ProductsSection = styled.section`
  width: 100%;
`;

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--neutral-200);
`;

const FilterToggle = styled.button`
  display: none;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  font-size: var(--text-md);
  color: var(--neutral-800);
  cursor: pointer;
  
  @media (max-width: 1024px) {
    display: flex;
  }
  
  &:hover {
    color: var(--neutral-900);
  }
`;

const SortContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SortLabel = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-700);
`;

const SortSelect = styled.select`
  appearance: none;
  background: transparent;
  border: none;
  font-size: var(--text-md);
  color: var(--neutral-900);
  padding-left: 2rem;
  cursor: pointer;
`;

const SortIcon = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ViewButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => active ? 'var(--neutral-900)' : 'var(--white)'};
  color: ${({ active }) => active ? 'var(--white)' : 'var(--neutral-900)'};
  border: 1px solid var(--neutral-300);
  cursor: pointer;
  
  &:hover {
    background-color: ${({ active }) => active ? 'var(--neutral-900)' : 'var(--neutral-100)'};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ viewMode }) => viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr'};
  gap: ${({ viewMode }) => viewMode === 'grid' ? '3rem' : '2rem'};
  
  @media (max-width: 1200px) {
    grid-template-columns: ${({ viewMode }) => viewMode === 'grid' ? 'repeat(2, 1fr)' : '1fr'};
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.article`
  ${({ viewMode }) => viewMode === 'list' ? `
    display: grid;
    grid-template-columns: 20rem 1fr;
    gap: 2rem;
    border-bottom: 1px solid var(--neutral-200);
    padding-bottom: 2rem;
  ` : ''}
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: ${({ viewMode }) => viewMode === 'list' ? '20rem' : '35rem'};
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductDetails = styled.div`
  padding: 1.5rem 0;
`;

const ProductName = styled.h3`
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--neutral-900);
  margin-bottom: 0.8rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductPrice = styled.span`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-900);
`;

const OldPrice = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-500);
  text-decoration: line-through;
`;

const AvailableColors = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const ColorDot = styled.span`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 1px solid var(--neutral-300);
`;

const AvailableSizes = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 2rem;
  
  span {
    font-size: var(--text-sm);
    color: var(--neutral-700);
  }
`;

const ViewProductButton = styled.button`
  background-color: var(--neutral-900);
  color: var(--white);
  border: none;
  padding: 1rem 2rem;
  font-size: var(--text-md);
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-800);
  }
`;

const NoProductsFound = styled.div`
  text-align: center;
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const NoProductsMessage = styled.p`
  font-size: var(--text-lg);
  color: var(--neutral-700);
`;

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