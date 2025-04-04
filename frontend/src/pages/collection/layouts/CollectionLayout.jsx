// src/pages/collection/layouts/CollectionLayout.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ChevronDownIcon,
  ListBulletIcon,
  Squares2X2Icon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Heading from "../../../components/heading/Heading";
import SubHeading from "../../../components/heading/SubHeading";
import { getColors } from "../../../api/colors";

/**
 * Reusable layout component for collection pages
 * @param {Object} props - Component props
 * @param {string} props.title - Collection title
 * @param {string} props.description - Collection description
 * @param {string} props.backgroundImage - URL for hero background image
 * @param {Array} props.products - Array of products to display
 * @param {Function} props.setProducts - Function to update products (for sorting)
 * @param {React.ReactNode} props.children - Child components
 */
const CollectionLayout = ({
  title,
  description,
  backgroundImage,
  products = [],
  setProducts,
  children,
}) => {
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    sizes: [],
    priceRange: [0, 5000],
  });
  const [availableColors, setAvailableColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);

    // Sort products based on selected option
    if (setProducts && products.length > 0) {
      let sortedProducts = [...products];

      switch (value) {
        case "price-asc":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          // In a real app, you'd sort by date
          sortedProducts.sort((a, b) => b.id?.localeCompare(a.id) || 0);
          break;
        case "featured":
        default:
          // Keep original order for featured
          break;
      }

      setProducts(sortedProducts);
    }
  };

  const toggleColorFilter = (color) => {
    const newColors = selectedFilters.colors.includes(color)
      ? selectedFilters.colors.filter((c) => c !== color)
      : [...selectedFilters.colors, color];

    setSelectedFilters({
      ...selectedFilters,
      colors: newColors,
    });
  };

  const toggleSizeFilter = (size) => {
    const newSizes = selectedFilters.sizes.includes(size)
      ? selectedFilters.sizes.filter((s) => s !== size)
      : [...selectedFilters.sizes, size];

    setSelectedFilters({
      ...selectedFilters,
      sizes: newSizes,
    });
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by color
    if (selectedFilters.colors.length > 0) {
      const hasMatchingColor = product.colors?.some((color) =>
        selectedFilters.colors.includes(color)
      );
      if (!hasMatchingColor) return false;
    }

    // Filter by size
    if (selectedFilters.sizes.length > 0) {
      const hasMatchingSize = product.sizes?.some((size) =>
        selectedFilters.sizes.includes(size)
      );
      if (!hasMatchingSize) return false;
    }

    // Filter by price range
    if (
      product.price < selectedFilters.priceRange[0] ||
      product.price > selectedFilters.priceRange[1]
    ) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await getColors();
        // Add an extra .data access
        if (response?.data?.data?.colors?.length) {
          setAvailableColors(response.data.data.colors);
        }
      } catch (error) {
        console.error("Failed to fetch colors:", error);
      }
    };
    fetchColors();
  }, []);

  return (
    <PageContainer>
      <CollectionHero style={{ backgroundImage: `url(${backgroundImage})` }}>
        <CollectionHeroOverlay>
          <CollectionInfo>
            <Heading title={title} size="xxxl" color={true} />
            <CollectionDescription>{description}</CollectionDescription>
            <ProductCount>{filteredProducts.length} منتج</ProductCount>
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
              {availableColors.map((color) => (
                <ColorOption
                  key={color.value}
                  color={color.value}
                  selected={selectedFilters.colors.includes(color.value)}
                  onClick={() => toggleColorFilter(color.value)}
                  title={color.name_ar}
                />
              ))}
            </ColorOptions>
          </FilterSection>

          <FilterSection>
            <FilterSectionTitle>المقاسات</FilterSectionTitle>
            <SizeOptions>
              {["S", "M", "L", "XL"].map((size) => (
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
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    priceRange: [
                      selectedFilters.priceRange[0],
                      parseInt(e.target.value),
                    ],
                  })
                }
              />
              <PriceDisplay>
                <span>{selectedFilters.priceRange[0]} د.م</span>
                <span>{selectedFilters.priceRange[1]} د.م</span>
              </PriceDisplay>
            </PriceRange>
          </FilterSection>

          <ClearFiltersButton
            onClick={() =>
              setSelectedFilters({
                colors: [],
                sizes: [],
                priceRange: [0, 5000],
              })
            }
          >
            مسح الفلاتر
          </ClearFiltersButton>
        </FiltersSidebar>

        <ProductsSection>
          <ToolbarContainer>
            <FilterToggle onClick={toggleFilters}>
              <FunnelIcon width={20} height={20} />
              <span>تصفية</span>
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

            <ViewToggle>
              <ViewButton
                active={viewMode === "grid"}
                onClick={() => setViewMode("grid")}
              >
                <Squares2X2Icon width={20} height={20} />
              </ViewButton>
              <ViewButton
                active={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                <ListBulletIcon width={20} height={20} />
              </ViewButton>
            </ViewToggle>
          </ToolbarContainer>

          {filteredProducts.length === 0 ? (
            <NoProductsFound>
              <NoProductsMessage>
                لا توجد منتجات مطابقة للفلاتر المحددة
              </NoProductsMessage>
              <ClearFiltersButton
                onClick={() =>
                  setSelectedFilters({
                    colors: [],
                    sizes: [],
                    priceRange: [0, 5000],
                  })
                }
              >
                مسح الفلاتر
              </ClearFiltersButton>
            </NoProductsFound>
          ) : (
            // Pass down necessary props to the child component
            React.cloneElement(children, {
              products: filteredProducts,
              viewMode,
            })
          )}
        </ProductsSection>
      </CollectionContent>
    </PageContainer>
  );
};

// Reusable Products Grid component
export const ProductsGrid = ({ products, viewMode }) => {
  return (
    <StyledProductsGrid viewMode={viewMode}>
      {products.map((product) => (
        <ProductCard key={product.id} viewMode={viewMode}>
          <Link to={`/product/${product.slug}`}>
            <ProductImageContainer>
              <ProductImage src={product.image} alt={product.name} />
              {product.isNew && <NewTag>جديد</NewTag>}
            </ProductImageContainer>
            <ProductDetails>
              {product.category && (
                <ProductCategory>{product.category}</ProductCategory>
              )}
              <ProductName>{product.name}</ProductName>
              <PriceContainer>
                <ProductPrice>{product.price} د.م</ProductPrice>
                {product.oldPrice && (
                  <OldPrice>{product.oldPrice} د.م</OldPrice>
                )}
              </PriceContainer>
              <ProductColors>
                {product.colors &&
                  product.colors.map((color, index) => (
                    <ProductColorsItem
                      key={index}
                      color={color.replace("#", "")}
                    />
                  ))}
              </ProductColors>

              {viewMode === "list" && product.sizes && (
                <>
                  <AvailableSizes>
                    {product.sizes.map((size, index) => (
                      <span key={index}>{size}</span>
                    ))}
                  </AvailableSizes>

                  <ViewProductButton>عرض المنتج</ViewProductButton>
                </>
              )}
            </ProductDetails>
          </Link>
        </ProductCard>
      ))}
    </StyledProductsGrid>
  );
};

export default CollectionLayout;

// Imports needed for the Link component
import { Link } from "react-router-dom";

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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
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
    right: ${({ show }) => (show ? "0" : "-30rem")};
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
  border: 2px solid
    ${({ selected }) => (selected ? "var(--neutral-900)" : "var(--neutral-500)")};
  cursor: pointer;
  transition: transform 0.2s ease;
/* box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
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
  border: 1px solid
    ${({ selected }) =>
      selected ? "var(--neutral-900)" : "var(--neutral-300)"};
  background-color: ${({ selected }) =>
    selected ? "var(--neutral-900)" : "var(--white)"};
  color: ${({ selected }) =>
    selected ? "var(--white)" : "var(--neutral-900)"};
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
  background-color: ${({ active }) =>
    active ? "var(--neutral-900)" : "var(--white)"};
  color: ${({ active }) => (active ? "var(--white)" : "var(--neutral-900)")};
  border: 1px solid var(--neutral-300);
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) =>
      active ? "var(--neutral-900)" : "var(--neutral-100)"};
  }
`;

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ viewMode }) =>
    viewMode === "grid" ? "repeat(3, 1fr)" : "1fr"};
  gap: ${({ viewMode }) => (viewMode === "grid" ? "3rem" : "2rem")};

  @media (max-width: 1200px) {
    grid-template-columns: ${({ viewMode }) =>
      viewMode === "grid" ? "repeat(2, 1fr)" : "1fr"};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.article`
  ${({ viewMode }) =>
    viewMode === "list"
      ? `
    display: grid;
    grid-template-columns: 20rem 1fr;
    gap: 2rem;
    border-bottom: 1px solid var(--neutral-200);
    padding-bottom: 2rem;
  `
      : ""}
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 35rem;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 25rem;
  }
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

const NewTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--neutral-900);
  color: var(--white);
  padding: 0.5rem 1rem;
  font-size: var(--text-sm);
  font-weight: 600;
`;

const ProductDetails = styled.div`
  padding: 1.5rem 0;
`;

const ProductCategory = styled.div`
  font-size: var(--text-sm);
  color: var(--neutral-600);
  margin-bottom: 0.5rem;
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
  margin-bottom: 0.8rem;
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

const ProductColors = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ProductColorsItem = styled.span`
  width: 12px;
  height: 12px;
  background-color: ${({ color }) => `#${color}`};
  border-radius: 50%;
  border: 1px solid #9b9999;
`;

const AvailableSizes = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 1.5rem 0;

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
const ErrorMessageContainer = styled.div`
  background-color: var(--neutral-100);
  border-left: 4px solid var(--danger-500);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  font-size: var(--text-md);
  color: var(--neutral-700);
  line-height: 1.6;
`;
