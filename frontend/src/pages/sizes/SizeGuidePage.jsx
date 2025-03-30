import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../../components/heading/Heading";
import SubHeading from "../../components/heading/SubHeading";


const SizeGuidePage = () => {
  const [activeCategory, setActiveCategory] = useState("women-kaftan");
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <StyledSizeGuidePage>
      <StyledSizeGuideContent>
        <StyledPageHeader>
          <Heading title="دليل المقاسات" weight={500} />
          <SubHeading 
            title="مساعدة لاختيار المقاس المناسب لجميع منتجاتنا"
            size="lg" 
          />
        </StyledPageHeader>
        
        <SizeGuideIntro>
          <p>
            نحن نهدف إلى مساعدتك في اختيار المقاس المثالي لكل منتج من منتجاتنا. يرجى استخدام جداول المقاسات أدناه كدليل لاختيار المقاس المناسب لك.
          </p>
          <p>
            المقاسات المذكورة تقريبية وقد تختلف قليلاً اعتمادًا على القطعة والتصميم. إذا كنت بين مقاسين، ننصح باختيار المقاس الأكبر للحصول على تناسب مريح.
          </p>
        </SizeGuideIntro>
        
        <CategoryTabs>
          <CategoryTab 
            active={activeCategory === "women-kaftan"} 
            onClick={() => handleCategoryChange("women-kaftan")}
          >
            قفطان نسائي
          </CategoryTab>
          <CategoryTab 
            active={activeCategory === "women-jellaba"} 
            onClick={() => handleCategoryChange("women-jellaba")}
          >
            جلابة نسائية
          </CategoryTab>
          <CategoryTab 
            active={activeCategory === "men-jellaba"} 
            onClick={() => handleCategoryChange("men-jellaba")}
          >
            جلابة رجالية
          </CategoryTab>
          <CategoryTab 
            active={activeCategory === "abaya"} 
            onClick={() => handleCategoryChange("abaya")}
          >
            عباية
          </CategoryTab>
        </CategoryTabs>
        
        <SizeTableContainer>
          {activeCategory === "women-kaftan" && (
            <>
              <SizeTableTitle>جدول مقاسات القفطان النسائي</SizeTableTitle>
              <SizeTableDescription>
                القفطان المغربي التقليدي عادة ما يكون فضفاضًا، ولكن بعض التصاميم العصرية قد تكون أكثر ملاءمة للجسم. استخدم القياسات التالية كدليل.
              </SizeTableDescription>
              
              <SizeTable>
                <thead>
                  <tr>
                    <th>المقاس</th>
                    <th>المقابل العالمي</th>
                    <th>محيط الصدر (سم)</th>
                    <th>محيط الخصر (سم)</th>
                    <th>محيط الأرداف (سم)</th>
                    <th>الطول (سم)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>34-36</td>
                    <td>82-86</td>
                    <td>64-68</td>
                    <td>88-92</td>
                    <td>150-155</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>36-38</td>
                    <td>86-90</td>
                    <td>68-72</td>
                    <td>92-96</td>
                    <td>155-160</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>38-40</td>
                    <td>90-94</td>
                    <td>72-76</td>
                    <td>96-100</td>
                    <td>160-165</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>40-42</td>
                    <td>94-98</td>
                    <td>76-80</td>
                    <td>100-104</td>
                    <td>165-170</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>44-46</td>
                    <td>98-104</td>
                    <td>80-86</td>
                    <td>104-110</td>
                    <td>170-175</td>
                  </tr>
                  <tr>
                    <td>XXL</td>
                    <td>48-50</td>
                    <td>104-110</td>
                    <td>86-92</td>
                    <td>110-116</td>
                    <td>175-180</td>
                  </tr>
                </tbody>
              </SizeTable>
              
              <MeasurementGuide>
                <MeasurementTitle>كيفية قياس مقاساتك بدقة</MeasurementTitle>
                <MeasurementsList>
                  <MeasurementItem>
                    <MeasurementName>محيط الصدر:</MeasurementName>
                    <MeasurementDescription>قيسي حول الجزء الأكثر امتلاءً من صدرك، مع إبقاء شريط القياس أفقيًا.</MeasurementDescription>
                  </MeasurementItem>
                  <MeasurementItem>
                    <MeasurementName>محيط الخصر:</MeasurementName>
                    <MeasurementDescription>قيسي حول أضيق جزء من خصرك، عادة عند السرة.</MeasurementDescription>
                  </MeasurementItem>
                  <MeasurementItem>
                    <MeasurementName>محيط الأرداف:</MeasurementName>
                    <MeasurementDescription>قيسي حول أوسع جزء من أردافك.</MeasurementDescription>
                  </MeasurementItem>
                  <MeasurementItem>
                    <MeasurementName>الطول:</MeasurementName>
                    <MeasurementDescription>قيسي من أعلى الكتف إلى القدم، وهو المكان الذي ترغبين أن ينتهي عنده القفطان.</MeasurementDescription>
                  </MeasurementItem>
                </MeasurementsList>
              </MeasurementGuide>
            </>
          )}
          
          {activeCategory === "women-jellaba" && (
            <>
              <SizeTableTitle>جدول مقاسات الجلابة النسائية</SizeTableTitle>
              <SizeTableDescription>
                الجلابة هي لباس مغربي تقليدي فضفاض، تتميز بأكمام طويلة وقلنسوة. استخدمي القياسات التالية لاختيار المقاس المناسب لك.
              </SizeTableDescription>
              
              <SizeTable>
                <thead>
                  <tr>
                    <th>المقاس</th>
                    <th>المقابل العالمي</th>
                    <th>محيط الصدر (سم)</th>
                    <th>محيط الخصر (سم)</th>
                    <th>محيط الأرداف (سم)</th>
                    <th>الطول (سم)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>34-36</td>
                    <td>82-86</td>
                    <td>64-68</td>
                    <td>88-92</td>
                    <td>145-150</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>36-38</td>
                    <td>86-90</td>
                    <td>68-72</td>
                    <td>92-96</td>
                    <td>150-155</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>38-40</td>
                    <td>90-94</td>
                    <td>72-76</td>
                    <td>96-100</td>
                    <td>155-160</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>40-42</td>
                    <td>94-98</td>
                    <td>76-80</td>
                    <td>100-104</td>
                    <td>160-165</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>44-46</td>
                    <td>98-104</td>
                    <td>80-86</td>
                    <td>104-110</td>
                    <td>165-170</td>
                  </tr>
                  <tr>
                    <td>XXL</td>
                    <td>48-50</td>
                    <td>104-110</td>
                    <td>86-92</td>
                    <td>110-116</td>
                    <td>170-175</td>
                  </tr>
                </tbody>
              </SizeTable>
              
              <SizeNote>
                ملاحظة: الجلابة عادة ما تكون أقصر قليلاً من القفطان، ولكنها تتميز بأكمام أوسع.
              </SizeNote>
            </>
          )}
          
          {activeCategory === "men-jellaba" && (
            <>
              <SizeTableTitle>جدول مقاسات الجلابة الرجالية</SizeTableTitle>
              <SizeTableDescription>
                الجلابة الرجالية مصممة لتكون مريحة وفضفاضة. استخدم القياسات التالية لاختيار المقاس المناسب لك.
              </SizeTableDescription>
              
              <SizeTable>
                <thead>
                  <tr>
                    <th>المقاس</th>
                    <th>محيط الصدر (سم)</th>
                    <th>محيط الكتف (سم)</th>
                    <th>طول الأكمام (سم)</th>
                    <th>الطول (سم)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S</td>
                    <td>90-96</td>
                    <td>42-44</td>
                    <td>60-62</td>
                    <td>140-145</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>96-102</td>
                    <td>44-46</td>
                    <td>62-64</td>
                    <td>145-150</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>102-108</td>
                    <td>46-48</td>
                    <td>64-66</td>
                    <td>150-155</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>108-114</td>
                    <td>48-50</td>
                    <td>66-68</td>
                    <td>155-160</td>
                  </tr>
                  <tr>
                    <td>XXL</td>
                    <td>114-120</td>
                    <td>50-52</td>
                    <td>68-70</td>
                    <td>160-165</td>
                  </tr>
                  <tr>
                    <td>3XL</td>
                    <td>120-126</td>
                    <td>52-54</td>
                    <td>70-72</td>
                    <td>165-170</td>
                  </tr>
                </tbody>
              </SizeTable>
              
              <MeasurementGuide>
                <MeasurementTitle>كيفية قياس مقاساتك بدقة</MeasurementTitle>
                <MeasurementsList>
                  <MeasurementItem>
                    <MeasurementName>محيط الصدر:</MeasurementName>
                    <MeasurementDescription>قس حول الجزء الأوسع من صدرك، تحت الإبطين وفوق عظام الكتف.</MeasurementDescription>
                  </MeasurementItem>
                  <MeasurementItem>
                    <MeasurementName>محيط الكتف:</MeasurementName>
                    <MeasurementDescription>قس من نقطة التقاء الكتف بالذراع من جهة إلى نفس النقطة في الجهة الأخرى.</MeasurementDescription>
                  </MeasurementItem>
                  <MeasurementItem>
                    <MeasurementName>طول الأكمام:</MeasurementName>
                    <MeasurementDescription>قس من نقطة التقاء الكتف بالذراع إلى معصمك.</MeasurementDescription>
                  </MeasurementItem>
                </MeasurementsList>
              </MeasurementGuide>
            </>
          )}
          
          {activeCategory === "abaya" && (
            <>
              <SizeTableTitle>جدول مقاسات العباية</SizeTableTitle>
              <SizeTableDescription>
                العباية مصممة لتكون فضفاضة ومريحة، مع أنماط مختلفة من التصاميم العصرية والتقليدية. استخدمي هذه القياسات كدليل.
              </SizeTableDescription>
              
              <SizeTable>
                <thead>
                  <tr>
                    <th>المقاس</th>
                    <th>المقابل العالمي</th>
                    <th>محيط الصدر (سم)</th>
                    <th>محيط الكتف (سم)</th>
                    <th>طول الأكمام (سم)</th>
                    <th>الطول (سم)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S</td>
                    <td>36-38</td>
                    <td>86-92</td>
                    <td>38-40</td>
                    <td>58-60</td>
                    <td>140-145</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>38-40</td>
                    <td>92-98</td>
                    <td>40-42</td>
                    <td>60-62</td>
                    <td>145-150</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>40-42</td>
                    <td>98-104</td>
                    <td>42-44</td>
                    <td>62-64</td>
                    <td>150-155</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>44-46</td>
                    <td>104-110</td>
                    <td>44-46</td>
                    <td>64-66</td>
                    <td>155-160</td>
                  </tr>
                  <tr>
                    <td>XXL</td>
                    <td>48-50</td>
                    <td>110-116</td>
                    <td>46-48</td>
                    <td>66-68</td>
                    <td>160-165</td>
                  </tr>
                </tbody>
              </SizeTable>
              
              <SizeNote>
                ملاحظة: العبايات تأتي بأنماط مختلفة، منها ما هو ملائم للجسم ومنها ما هو فضفاض، لذا قد تختلف المقاسات قليلاً حسب التصميم.
              </SizeNote>
            </>
          )}
        </SizeTableContainer>
        
        <SizeGuideInfo>
          <InfoTitle>معلومات إضافية حول المقاسات</InfoTitle>
          <InfoList>
            <InfoItem>
              <InfoIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </InfoIcon>
              <InfoText>
                المقاسات قد تختلف قليلاً بين التصاميم المختلفة، يرجى الاطلاع على تفاصيل المقاسات في صفحة كل منتج.
              </InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </InfoIcon>
              <InfoText>
                نقدم خدمة التفصيل حسب المقاسات الخاصة بك. إذا كنت بحاجة إلى مقاس مخصص، يرجى التواصل معنا.
              </InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </InfoIcon>
              <InfoText>
                لتصاميم الأعراس والمناسبات الخاصة، نوصي بطلب المقاس قبل 4-6 أسابيع من تاريخ المناسبة للسماح بالتعديلات اللازمة.
              </InfoText>
            </InfoItem>
          </InfoList>
        </SizeGuideInfo>
        
        <StyledContactSection>
          <Heading title="هل تحتاج إلى مساعدة في اختيار المقاس المناسب؟" weight={500} />
          <SubHeading 
            title="فريق خدمة العملاء لدينا جاهز لمساعدتك" 
            size="lg" 
          />
          <ContactButton href="/contact">تواصل معنا</ContactButton>
        </StyledContactSection>
      </StyledSizeGuideContent>
    </StyledSizeGuidePage>
  );
};

export default SizeGuidePage;

// Styled Components
const StyledSizeGuidePage = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const StyledSizeGuideContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StyledPageHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  
  &::after {
    content: '';
    display: block;
    width: 6rem;
    height: 2px;
    background-color: var(--neutral-300);
    margin: 2rem auto 0;
  }
`;

const SizeGuideIntro = styled.div`
  margin-bottom: 4rem;
  
  p {
    font-size: var(--text-md);
    line-height: 1.7;
    color: var(--neutral-700);
    margin-bottom: 1.5rem;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-bottom: 1px solid var(--neutral-200);
  margin-bottom: 4rem;
  padding-bottom: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CategoryTab = styled.button`
  padding: 1.2rem 2.5rem;
  font-size: var(--text-md);
  font-weight: 500;
  color: ${({ active }) => active ? 'var(--white)' : 'var(--neutral-800)'};
  background-color: ${({ active }) => active ? 'var(--neutral-900)' : 'var(--neutral-100)'};
  border: 1px solid ${({ active }) => active ? 'var(--neutral-900)' : 'var(--neutral-300)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active }) => active ? 'var(--neutral-900)' : 'var(--neutral-200)'};
  }
`;

const SizeTableContainer = styled.div`
  margin-bottom: 5rem;
`;

const SizeTableTitle = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 1.5rem;
`;

const SizeTableDescription = styled.p`
  font-size: var(--text-md);
  line-height: 1.7;
  color: var(--neutral-700);
  margin-bottom: 3rem;
`;

const SizeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 3rem;
  
  th {
    background-color: var(--neutral-100);
    padding: 1.5rem;
    text-align: right;
    font-weight: 600;
    font-size: var(--text-md);
    color: var(--neutral-800);
    border: 1px solid var(--neutral-300);
  }
  
  td {
    padding: 1.5rem;
    font-size: var(--text-md);
    color: var(--neutral-700);
    border: 1px solid var(--neutral-300);
  }
  
  tr:nth-child(even) {
    background-color: var(--neutral-50);
  }
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const SizeNote = styled.p`
  font-size: var(--text-md);
  color: var(--neutral-700);
  background-color: var(--neutral-50);
  padding: 1.5rem;
  border-right: 4px solid var(--neutral-400);
  margin-bottom: 2rem;
`;

const MeasurementGuide = styled.div`
  background-color: var(--neutral-50);
  padding: 2.5rem;
  border-radius: 0.5rem;
  margin-top: 3rem;
`;

const MeasurementTitle = styled.h4`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 2rem;
`;

const MeasurementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MeasurementItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MeasurementName = styled.span`
  font-weight: 600;
  font-size: var(--text-md);
  color: var(--neutral-800);
`;

const MeasurementDescription = styled.p`
  font-size: var(--text-md);
  line-height: 1.6;
  color: var(--neutral-700);
`;

const SizeGuideInfo = styled.div`
  background-color: var(--neutral-50);
  padding: 3rem;
  border-radius: 0.5rem;
  margin-bottom: 5rem;
`;

const InfoTitle = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2.5rem;
  text-align: center;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const InfoIcon = styled.div`
  color: var(--neutral-600);
  flex-shrink: 0;
`;

const InfoText = styled.p`
  font-size: var(--text-md);
  line-height: 1.7;
  color: var(--neutral-700);
`;

const StyledContactSection = styled.div`
  background-color: var(--neutral-100);
  padding: 4rem;
  text-align: center;
  border-radius: 0.5rem;
`;

const ContactButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 1.5rem 3rem;
  background-color: var(--neutral-900);
  color: var(--white);
  font-size: var(--text-md);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--neutral-800);
  }
`;