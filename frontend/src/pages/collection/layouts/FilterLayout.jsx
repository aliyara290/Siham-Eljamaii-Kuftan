// // src/pages/collection/layouts/FilterLayout.jsx
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { 
//   ChevronDownIcon, 
//   ListBulletIcon, 
//   Squares2X2Icon,
//   FunnelIcon,
//   XMarkIcon
// } from '@heroicons/react/24/outline';
// import Heading from '../../../components/heading/Heading';
// import SubHeading from '../../../components/heading/SubHeading';
// import { ProductService, CategoryService } from '../../../services/api';

// const FilterLayout = ({ 
//   title, 
//   description, 
//   backgroundImage,
//   apiEndpoint, 
//   filterParams = {},
//   children 
// }) => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedSort, setSelectedSort] = useState('featured');
//   const [selectedFilters, setSelectedFilters] = useState({
//     colors: [],
//     sizes: [],
//     categories: [],
//     priceRange: [0, 5000]
//   });

//   // Fetch products
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
      
//       try {
//         // Combine filter params with sort order
//         const params = {
//           ...filterParams,
//           sort_by: selectedSort === 'featured' ? 'featured' : 
//                   selectedSort === 'newest' ? 'created_at' : 'price',
//           sort_direction: selectedSort === 'price-asc' ? 'asc' : 'desc'
//         };
        
//         // Apply selected filters if present
//         if (selectedFilters.colors.length > 0) {
//           params.colors = selectedFilters.colors.join(',');
//         }
        
//         if (selectedFilters.sizes.length > 0) {
//           params.sizes = selectedFilters.sizes.join(',');
//         }
        
//         if (selectedFilters.categories.length > 0) {
//           params.categories = selectedFilters.categories.join(',');
//         }
        
//         if (selectedFilters.priceRange) {
//           params.price_min = selectedFilters.priceRange[0];
//           params.price_max = selectedFilters.priceRange[1];
//         }
        
//         // Get the right API service method based on endpoint
//         let response;
        
//         if (apiEndpoint === 'bestseller') {
//           response = await ProductService.getProducts({ ...params, bestseller: true });
//         } else if (apiEndpoint === 'new') {
//           response = await ProductService.getProducts({ ...params, new: true });
//         } else if (apiEndpoint === 'category') {
//           response = await ProductService.getProductsByCategory(filterParams.categoryId);
//         } else {
//           // Default to all products
//           response = await ProductService.getProducts(params);
//         }
        
//         setProducts(response.data || []);
        
//         // Also fetch categories for filter sidebar
//         const categoriesResponse = await CategoryService.getCategories();
//         setCategories(categoriesResponse.data || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
        
//         // Fallback to empty arrays if API fails
//         setProducts([]);
//         setCategories([]);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [apiEndpoint, filterParams, selectedSort, selectedFilters]);

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   const handleSortChange = (value) => {
//     setSelectedSort(value);
//   };

//   const toggleColorFilter = (color) => {
//     const newColors = selectedFilters.colors.includes(color)
//       ? selectedFilters.colors.filter(c => c !== color)
//       : [...selectedFilters.colors, color];
    
//     setSelectedFilters({
//       ...selectedFilters,
//       colors: newColors
//     });
//   };

//   const toggleSizeFilter = (size) => {
//     const newSizes = selectedFilters.sizes.includes(size)
//       ? selectedFilters.sizes.filter(s => s !== size)
//       : [...selectedFilters.sizes, size];
    
//     setSelectedFilters({
//       ...selectedFilters,
//       sizes: newSizes
//     });
//   };
  
//   const toggleCategoryFilter = (categoryId) => {
//     const newCategories = selectedFilters.categories.includes(categoryId)
//       ? selectedFilters.categories.filter(c => c !== categoryId)
//       : [...selectedFilters.categories, categoryId];
    
//     setSelectedFilters({
//       ...selectedFilters,
//       categories: newCategories
//     });
//   };
  
//   const handlePriceRangeChange = (min, max) => {
//     setSelectedFilters({
//       ...selectedFilters,
//       priceRange: [min, max]
//     });
//   };
  
//   const clearFilters = () => {
//     setSelectedFilters({
//       colors: [],
//       sizes: [],
//       categories: [],
//       priceRange: [0, 5000]
//     });
//   };

//   // Find all unique colors and sizes from products for filter options
//   const availableColors = [...new Set(products.flatMap(product => product.colors || []))];
//   const availableSizes = [...new Set(products.flatMap(product => product.sizes || []))];

//   return (
//     <PageContainer>
//       <CollectionHero style={{ backgroundImage: `url(${backgroundImage})` }}>
//         <CollectionHeroOverlay>
//           <CollectionInfo>
//             <Heading title={title} size="xxxl" color={true} />
//             <CollectionDescription>{description}</CollectionDescription>
//             <ProductCount>{products.length} منتج</ProductCount>
//           </CollectionInfo>
//         </CollectionHeroOverlay>
//       </CollectionHero>

//       <CollectionContent>
//         <FiltersSidebar show={showFilters}>
//           <FilterHeader>
//             <FilterTitle>تصفية المنتجات</FilterTitle>
//             <CloseFiltersButton onClick={toggleFilters}>
//               <XMarkIcon width={20} height={20} />
//             </CloseFiltersButton>
//           </FilterHeader>
          
//           {availableColors.length > 0 && (
//             <FilterSection>
//               <FilterSectionTitle>الألوان</FilterSectionTitle>
//               <ColorOptions>
//                 {availableColors.map((color) => (
//                   <ColorOption 
//                     key={color}
//                     color={color} 
//                     selected={selectedFilters.colors.includes(color)}
//                     onClick={() => toggleColorFilter(color)}
//                   />
//                 ))}
//               </ColorOptions>
//             </FilterSection>
//           )}
          
//           {availableSizes.length > 0 && (
//             <FilterSection>
//               <FilterSectionTitle>المقاسات</FilterSectionTitle>
//               <SizeOptions>
//                 {availableSizes.map(size => (
//                   <SizeOption 
//                     key={size}
//                     selected={selectedFilters.sizes.includes(size)}
//                     onClick={() => toggleSizeFilter(size)}
//                   >
//                     {size}
//                   </SizeOption>
//                 ))}
//               </SizeOptions>
//             </FilterSection>
//           )}
          
//           {categories.length > 0 && (
//             <FilterSection>
//               <FilterSectionTitle>الفئات</FilterSectionTitle>
//               <CategoryOptions>
//                 {categories.map(category => (
//                   <CategoryOption 
//                     key={category.id}
//                     selected={selectedFilters.categories.includes(category.id)}
//                     onClick={() => toggleCategoryFilter(category.id)}
//                   >
//                     {category.name}
//                   </CategoryOption>
//                 ))}
//               </CategoryOptions>
//             </FilterSection>
//           )}
          
//           <FilterSection>
//             <FilterSectionTitle>نطاق السعر</FilterSectionTitle>
//             <PriceRange>
//               <RangeInput 
//                 type="range" 
//                 min="0" 
//                 max="5000" 
//                 value={selectedFilters.priceRange[1]}
//                 onChange={(e) => handlePriceRangeChange(selectedFilters.priceRange[0], parseInt(e.target.value))}
//               />
//               <PriceDisplay>
//                 <span>{selectedFilters.priceRange[0]} د.م</span>
//                 <span>{selectedFilters.priceRange[1]} د.م</span>
//               </PriceDisplay>
//             </PriceRange>
//           </FilterSection>
          
//           <ClearFiltersButton onClick={clearFilters}>
//             مسح الفلاتر
//           </ClearFiltersButton>
//         </FiltersSidebar>

//         <ProductsSection>
//           <ToolbarContainer>
//             <FilterToggle onClick={toggleFilters}>
//               <FunnelIcon width={20} height={20} />
//               <span>تصفية</span>
//             </FilterToggle>
            
//             <SortContainer>
//               <SortLabel>ترتيب حسب:</SortLabel>
//               <SortSelect 
//                 value={selectedSort}
//                 onChange={(e) => handleSortChange(e.target.value)}
//               >
//                 <option value="featured">الأكثر رواجًا</option>
//                 <option value="newest">الأحدث</option>
//                 <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
//                 <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
//               </SortSelect>
//               <SortIcon>
//                 <ChevronDownIcon width={16} height={16} />
//               </SortIcon>
//             </SortContainer>
            
//             <ViewToggle>
//               <ViewButton 
//                 active={viewMode === 'grid'} 
//                 onClick={() => setViewMode('grid')}
//               >
//                 <Squares2X2Icon width={20} height={20} />
//               </ViewButton>
//               <ViewButton 
//                 active={viewMode === 'list'} 
//                 onClick={() => setViewMode('list')}
//               >
//                 <ListBulletIcon width={20} height={20} />
//               </ViewButton>
//             </ViewToggle>
//           </ToolbarContainer>
          
//           {loading ? (
//             <LoadingContainer>
//               <LoadingSpinner />
//             </LoadingContainer>
//           ) : products.length === 0 ? (
//             <NoProductsFound>
//               <NoProductsMessage>لا توجد منتجات مطابقة للفلاتر المحددة</NoProductsMessage>
//               <ClearFiltersButton onClick={clearFilters}>
//                 مسح الفلاتر
//               </ClearFiltersButton>
//             </NoProductsFound>
//           ) : (
//             // Pass down necessary props to the child component
//             React.cloneElement(children, { 
//               products, 
//               viewMode,
//               loading
//             })
//           )}
//         </ProductsSection>
//       </CollectionContent>
//     </PageContainer>
//   );
// };

// export default FilterLayout;

// // Styled Components
// const PageContainer = styled.div`
//   padding-top: 8rem;
//   background-color: var(--white);
// `;

// const CollectionHero = styled.div`
//   position: relative;
//   height: 50rem;
//   background-size: cover;
//   background-position: center;
//   margin-bottom: 4rem;
// `;

// const CollectionHeroOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const CollectionInfo = styled.div`
//   text-align: center;
//   max-width: 80rem;
//   padding: 0 2rem;
//   color: var(--white);
// `;

// const CollectionDescription = styled.p`
//   font-size: var(--text-lg);
//   line-height: 1.6;
//   margin: 2rem 0;
//   color: var(--white);
// `;

// const ProductCount = styled.div`
//   font-size: var(--text-md);
//   color: var(--white);
//   border: 1px solid var(--white);
//   padding: 0.8rem 2rem;
//   width: max-content;
//   margin: 0 auto;
// `;

// const CollectionContent = styled.div`
//   display: grid;
//   grid-template-columns: 25rem 1fr;
//   gap: 4rem;
//   max-width: 140rem;
//   margin: 0 auto;
//   padding: 0 2rem 8rem;
  
//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const FiltersSidebar = styled.aside`
//   position: sticky;
//   top: 12rem;
//   height: max-content;
//   padding-bottom: 2rem;
  
//   @media (max-width: 1024px) {
//     position: fixed;
//     top: 0;
//     right: ${({ show }) => (show ? '0' : '-30rem')};
//     width: 30rem;
//     height: 100vh;
//     background-color: var(--white);
//     z-index: 2000;
//     box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
//     transition: right 0.3s ease;
//     padding: 2rem;
//     overflow-y: auto;
//   }
// `;

// const FilterHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
  
//   @media (min-width: 1025px) {
//     display: none;
//   }
// `;

// const FilterTitle = styled.h3`
//   font-size: var(--text-lg);
//   font-weight: 600;
//   color: var(--neutral-900);
// `;

// const CloseFiltersButton = styled.button`
//   width: 3.5rem;
//   height: 3.5rem;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: var(--neutral-100);
//   border: none;
//   cursor: pointer;
  
//   &:hover {
//     background-color: var(--neutral-200);
//   }
// `;

// const FilterSection = styled.div`
//   margin-bottom: 3rem;
//   border-bottom: 1px solid var(--neutral-200);
//   padding-bottom: 2rem;
  
//   &:last-child {
//     border-bottom: none;
//   }
// `;

// const FilterSectionTitle = styled.h4`
//   font-size: var(--text-md);
//   font-weight: 600;
//   color: var(--neutral-800);
//   margin-bottom: 1.5rem;
// `;

// const ColorOptions = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-wrap: wrap;
// `;

// const ColorOption = styled.button`
//   width: 3rem;
//   height: 3rem;
//   border-radius: 50%;
//   background-color: ${({ color }) => color};
//   border: 2px solid ${({ selected }) => selected ? 'var(--neutral-900)' : 'transparent'};
//   cursor: pointer;
//   transition: transform 0.2s ease;
  
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const SizeOptions = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-wrap: wrap;
// `;

// const SizeOption = styled.button`
//   min-width: 4rem;
//   height: 4rem;
//   padding: 0 1rem;
//   border: 1px solid ${({ selected }) => selected ? 'var(--neutral-900)' : 'var(--neutral-300)'};
//   background-color: ${({ selected }) => selected ? 'var(--neutral-900)' : 'var(--white)'};
//   color: ${({ selected }) => selected ? 'var(--white)' : 'var(--neutral-900)'};
//   font-size: var(--text-md);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
  
//   &:hover {
//     border-color: var(--neutral-900);
//   }
// `;

// const CategoryOptions = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const CategoryOption = styled.button`
//   padding: 1rem;
//   border: 1px solid ${({ selected }) => selected ? 'var(--neutral-900)' : 'var(--neutral-300)'};
//   background-color: ${({ selected }) => selected ? 'var(--neutral-900)' : 'var(--white)'};
//   color: ${({ selected }) => selected ? 'var(--white)' : 'var(--neutral-900)'};
//   font-size: var(--text-md);
//   text-align: right;
//   cursor: pointer;
  
//   &:hover {
//     border-color: var(--neutral-900);
//   }
// `;

// const PriceRange = styled.div`
//   width: 100%;
// `;

// const RangeInput = styled.input`
//   width: 100%;
//   margin-bottom: 1rem;
// `;

// const PriceDisplay = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: var(--text-md);
//   color: var(--neutral-700);
// `;

// const ClearFiltersButton = styled.button`
//   background-color: var(--neutral-100);
//   border: none;
//   padding: 1rem 2rem;
//   font-size: var(--text-md);
//   color: var(--neutral-900);
//   cursor: pointer;
//   width: 100%;
  
//   &:hover {
//     background-color: var(--neutral-200);
//   }
// `;

// const ProductsSection = styled.section`
//   width: 100%;
// `;

// const ToolbarContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 3rem;
//   padding-bottom: 1.5rem;
//   border-bottom: 1px solid var(--neutral-200);
// `;

// const FilterToggle = styled.button`
//   display: none;
//   align-items: center;
//   gap: 0.5rem;
//   background: none;
//   border: none;
//   font-size: var(--text-md);
//   color: var(--neutral-800);
//   cursor: pointer;
  
//   @media (max-width: 1024px) {
//     display: flex;
//   }
  
//   &:hover {
//     color: var(--neutral-900);
//   }
// `;

// const SortContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const SortLabel = styled.span`
//   font-size: var(--text-md);
//   color: var(--neutral-700);
// `;

// const SortSelect = styled.select`
//   appearance: none;
//   background: transparent;
//   border: none;
//   font-size: var(--text-md);
//   color: var(--neutral-900);
//   padding-left: 2rem;
//   cursor: pointer;
// `;

// const SortIcon = styled.div`
//   position: absolute;
//   left: 0;
//   top: 50%;
//   transform: translateY(-50%);
//   pointer-events: none;
// `;

// const ViewToggle = styled.div`
//   display: flex;
//   gap: 0.8rem;
// `;

// const ViewButton = styled.button`
//   width: 3.5rem;
//   height: 3.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${({ active }) => active ? 'var(--neutral-900)' : 'var(--white)'};
//   color: ${({ active }) => active ? 'var(--white)' : 'var(--neutral-900)'};
//   border: 1px solid var(--neutral-300);
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${({ active }) => active ? 'var(--neutral-900)' : 'var(--neutral-100)'};
//   }
// `;

// const LoadingContainer = styled.div`
//   min-height: 40vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const LoadingSpinner = styled.div`
//   width: 4rem;
//   height: 4rem;
//   border: 0.5rem solid var(--neutral-200);
//   border-top: 0.5rem solid var(--neutral-900);
//   border-radius: 50%;
//   animation: spin 1s linear infinite;
  
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// const NoProductsFound = styled.div`
//   text-align: center;
//   padding: 5rem 0;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 2rem;
// `;

// const NoProductsMessage = styled.p`
//   font-size: var(--text-lg);
//   color: var(--neutral-700);
// `;