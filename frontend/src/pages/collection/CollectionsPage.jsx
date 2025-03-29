import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Heading from '../../components/heading/Heading';
import SubHeading from '../../components/heading/SubHeading';

const CollectionsPage = () => {
  // Mock collections data
  const collections = [
    {
      id: 'kaftan',
      name: 'قفطان',
      description: 'مجموعة متميزة من القفاطين المغربية الأصيلة بتصاميم عصرية وألوان متنوعة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/116_b8f51dc8-acf4-40e7-9c3f-fd77dd6e1f60.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1704551622&width=720',
      items: 24
    },
    {
      id: 'jellaba',
      name: 'جلابة',
      description: 'تشكيلة راقية من الجلابات العصرية المصممة بدقة لتناسب جميع الأذواق',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720',
      items: 18
    },
    {
      id: 'jewelry',
      name: 'مجوهرات',
      description: 'قطع مجوهرات فريدة مصممة يدويًا لتضيف لمسة من الفخامة والأناقة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/17_fc0e4dee-66b2-4b95-9c63-9a24459efc9b.jpg?crop=region&crop_height=2048&crop_left=204&crop_top=0&crop_width=1638&v=1705111629&width=720',
      items: 32
    },
    {
      id: 'accessories',
      name: 'إكسسوارات',
      description: 'إكسسوارات متنوعة لإكمال إطلالتك بأسلوب فريد يعكس الأصالة والعصرية',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720',
      items: 15
    },
    {
      id: 'abaya',
      name: 'عباية',
      description: 'عبايات أنيقة بتصاميم معاصرة مستوحاة من التراث مع لمسة من الحداثة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/1_bbd9b5db-1e17-469e-94bf-81e33a09f52a.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1696787030&width=720',
      items: 12
    },
    {
      id: 'special-occasions',
      name: 'مناسبات خاصة',
      description: 'تشكيلة مميزة للمناسبات الخاصة والأعراس تجمع بين الفخامة والأناقة',
      image: 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720',
      items: 20
    }
  ];

  return (
    <PageContainer>
      <CollectionHero style={{ backgroundImage: `url('https://ma.bouchrafilalilahlou.com/cdn/shop/files/oijkio.jpg?v=1730334214&width=2880')` }}>
        <CollectionHeroOverlay>
          <CollectionInfo>
            <Heading title="المجموعات" size="xxxl" color={true} />
            <CollectionDescription>
              استكشف مجموعاتنا المتنوعة من الأزياء المغربية التقليدية والعصرية
            </CollectionDescription>
          </CollectionInfo>
        </CollectionHeroOverlay>
      </CollectionHero>

      <CollectionsGrid>
        {collections.map(collection => (
          <CollectionCard key={collection.id}>
            <Link to={`/collection/${collection.id}`}>
              <CollectionImageContainer>
                <CollectionImage src={collection.image} alt={collection.name} />
                <CollectionOverlay>
                  <ViewCollection>استعرض المجموعة</ViewCollection>
                </CollectionOverlay>
              </CollectionImageContainer>
              <CollectionInfo>
                <CollectionName>{collection.name}</CollectionName>
                <CollectionDescription>{collection.description}</CollectionDescription>
                <CollectionCount>{collection.items} منتج</CollectionCount>
              </CollectionInfo>
            </Link>
          </CollectionCard>
        ))}
      </CollectionsGrid>
    </PageContainer>
  );
};

export default CollectionsPage;

// Styled Components
const PageContainer = styled.div`
  padding-top: 8rem;
  padding-bottom: 8rem;
  background-color: var(--white);
`;

const CollectionHero = styled.div`
  position: relative;
  height: 50rem;
  background-size: cover;
  background-position: center;
  margin-bottom: 6rem;
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


const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  max-width: 140rem;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const CollectionCard = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CollectionImageContainer = styled.div`
  position: relative;
  height: 60rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 40rem;
  }
`;

const CollectionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const CollectionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 3rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ViewCollection = styled.span`
  font-size: var(--text-lg);
  color: var(--white);
  border-bottom: 2px solid var(--white);
  padding-bottom: 0.5rem;
`;

const CollectionInfo = styled.div`
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CollectionName = styled.h2`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
`;

const CollectionDescription = styled.p`
  font-size: var(--text-md);
  color: var(--neutral-600);
  line-height: 1.6;
`;

const CollectionCount = styled.span`
  font-size: var(--text-md);
  color: var(--neutral-700);
  font-weight: 500;
  margin-top: 1rem;
`;

CollectionCard.defaultProps = {
  theme: {
    main: 'var(--white)'
  }
};

// Add hover effects using the styled-components &
const StyledCollectionCard = styled(CollectionCard)`
  &:hover ${CollectionImage} {
    transform: scale(1.05);
  }
  
  &:hover ${CollectionOverlay} {
    opacity: 1;
  }
`;