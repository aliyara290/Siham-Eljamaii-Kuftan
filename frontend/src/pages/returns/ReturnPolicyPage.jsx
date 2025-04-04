import React from "react";
import styled from "styled-components";
import Heading from "../../components/heading/Heading";
import SubHeading from "../../components/heading/SubHeading";

const NoReturnPolicyPage = () => {
  return (
    <StyledReturnPolicyPage>
      <StyledReturnPolicyContent>
        <StyledPageHeader>
          <Heading title="سياسة الإرجاع" weight={500} />
          <SubHeading 
            title="نعتذر، لا يمكن إرجاع أو تغيير المنتجات بعد الشراء"
            size="lg" 
          />
        </StyledPageHeader>

        <StyledSectionContainer>
          <StyledSection>
            <SectionTitle>سياسة عدم الإرجاع</SectionTitle>
            <SectionText>
              نظراً للطبيعة الخاصة لمنتجاتنا والجهد المبذول في تصميمها وتصنيعها يدوياً، تُطبق سياسة عدم الإرجاع أو التغيير على جميع المشتريات. لذا نرجو التأكد من اختيارك قبل إتمام عملية الشراء.
            </SectionText>
            
            <FeatureList>
              <FeatureItem>جميع المبيعات نهائية ولا يمكن استرداد قيمتها.</FeatureItem>
              <FeatureItem>لا نقبل إرجاع أو استبدال المنتجات بعد الشراء مهما كانت الأسباب.</FeatureItem>
              <FeatureItem>يجب التأكد من المقاس واللون والتصميم قبل إتمام عملية الشراء.</FeatureItem>
              <FeatureItem>لا يمكن إلغاء الطلب بعد تأكيده ودفع قيمته.</FeatureItem>
              <FeatureItem>المنتجات المصممة خصيصاً حسب الطلب غير قابلة للإلغاء بعد بدء التصنيع.</FeatureItem>
            </FeatureList>
          </StyledSection>

          <StyledSection>
            <SectionTitle>الاستثناءات المحدودة</SectionTitle>
            <SectionText>
              على الرغم من سياسة عدم الإرجاع، قد نقدم استثناءات محدودة جداً في الحالات التالية:
            </SectionText>
            
            <FeatureList>
              <FeatureItem>استلام منتج به عيب تصنيع واضح وجسيم يجعله غير قابل للاستخدام نهائياً (يجب تقديم الدليل خلال 24 ساعة من الاستلام).</FeatureItem>
              <FeatureItem>استلام منتج مختلف تماماً عما تم طلبه (يجب الإبلاغ خلال 24 ساعة من الاستلام).</FeatureItem>
            </FeatureList>
            
            <SectionText>
              في هالات الاستثناء المذكورة أعلاه، سيتم تقييم الحالة بشكل فردي من قبل فريقنا، ولا يوجد ضمان للإرجاع أو الاستبدال.
            </SectionText>
          </StyledSection>

          <StyledSection>
            <SectionTitle>التوصيات قبل الشراء</SectionTitle>
            <SectionText>
              نظراً لسياسة عدم الإرجاع، نوصي بالخطوات التالية قبل إتمام عملية الشراء:
            </SectionText>
            
            <ProcessSteps>
              <ProcessStep>
                <StepNumber>1</StepNumber>
                <StepContent>
                  <StepTitle>دراسة المنتج بعناية</StepTitle>
                  <StepDescription>
                    تأكد من قراءة وصف المنتج بدقة والاطلاع على جميع المعلومات المتعلقة بالمقاسات والخامات والألوان.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
              
              <ProcessStep>
                <StepNumber>2</StepNumber>
                <StepContent>
                  <StepTitle>التحقق من جدول المقاسات</StepTitle>
                  <StepDescription>
                    راجع جدول المقاسات بدقة وقم بقياس نفسك قبل اختيار المقاس المناسب. يمكنك الاطلاع على دليل المقاسات الخاص بنا.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
              
              <ProcessStep>
                <StepNumber>3</StepNumber>
                <StepContent>
                  <StepTitle>استشارة فريق المبيعات</StepTitle>
                  <StepDescription>
                    إذا كان لديك أي استفسار أو تردد، يرجى التواصل مع فريق المبيعات لدينا قبل الشراء للحصول على جميع المعلومات اللازمة.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
              
              <ProcessStep>
                <StepNumber>4</StepNumber>
                <StepContent>
                  <StepTitle>التأكد من الطلب</StepTitle>
                  <StepDescription>
                    قبل تأكيد الطلب، تحقق مرة أخرى من جميع التفاصيل بما في ذلك المقاس واللون والكمية وتفاصيل التوصيل.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
            </ProcessSteps>
          </StyledSection>

          <StyledSection>
            <SectionTitle>الأسئلة الشائعة حول سياسة الإرجاع</SectionTitle>
            <FAQItem>
              <FAQQuestion>لماذا لا تسمحون بإرجاع المنتجات؟</FAQQuestion>
              <FAQAnswer>
                منتجاتنا مصنوعة يدوياً وتتطلب وقتاً وجهداً كبيراً، كما أنها مصممة خصيصاً لكل عميل. ونظراً لطبيعة المنتجات التقليدية الفاخرة، لا يمكن إعادة بيعها بسهولة بعد تجربتها أو ارتدائها.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>ماذا لو كان المقاس غير مناسب لي؟</FAQQuestion>
              <FAQAnswer>
                نحن نقدم جدول مقاسات تفصيلي لكل منتج ونوصي بشدة بقياس نفسك بدقة أو مقارنة المقاسات بملابس مناسبة لديك قبل الطلب. يمكنك أيضاً التواصل معنا للاستشارة حول المقاس المناسب.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>ماذا لو كان هناك عيب في المنتج؟</FAQQuestion>
              <FAQAnswer>
                نحن نفحص كل منتج بعناية قبل شحنه لضمان خلوه من العيوب. في حالة نادرة جداً إذا كان هناك عيب تصنيع جسيم يجعل المنتج غير قابل للاستخدام، يمكنك إبلاغنا خلال 24 ساعة من استلام المنتج مع تقديم صور واضحة للعيب، وسنقوم بتقييم الحالة بشكل فردي.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>هل توفرون خدمة التعديل؟</FAQQuestion>
              <FAQAnswer>
                نحن نوفر خدمة التعديل بتكلفة إضافية في حال رغبتم في تغيير أي جزء من المنتج بعد استلامه، ولكن يجب أن يتم التواصل معنا لتقييم إمكانية التعديل والتكاليف المترتبة على ذلك.
              </FAQAnswer>
            </FAQItem>
          </StyledSection>
        </StyledSectionContainer>

        <StyledContactSection>
          <Heading title="هل تحتاج إلى مساعدة قبل الشراء؟" weight={500} />
          <SubHeading 
            title="فريق خدمة العملاء لدينا جاهز للإجابة على استفساراتك ومساعدتك في اختيار المنتج المناسب" 
            size="lg" 
          />
          <ContactButton href="/contact">تواصل معنا</ContactButton>
        </StyledContactSection>
      </StyledReturnPolicyContent>
    </StyledReturnPolicyPage>
  );
};

export default NoReturnPolicyPage;

// Styled Components
const StyledReturnPolicyPage = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const StyledReturnPolicyContent = styled.div`
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

const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const StyledSection = styled.div`
  border-bottom: 1px solid var(--neutral-200);
  padding-bottom: 3rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    right: 0;
    width: 4rem;
    height: 2px;
    background-color: var(--neutral-300);
  }
`;

const SectionText = styled.p`
  font-size: var(--text-md);
  line-height: 1.7;
  color: var(--neutral-700);
  margin-bottom: 2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 2rem 0;
`;

const FeatureItem = styled.li`
  font-size: var(--text-md);
  color: var(--neutral-700);
  margin-bottom: 1rem;
  padding-right: 2.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0.8rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: var(--danger-500);
  }
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 3rem 0;
`;

const ProcessStep = styled.div`
  display: flex;
  gap: 2rem;
`;

const StepNumber = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--neutral-100);
  color: var(--neutral-900);
  font-size: var(--text-lg);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 0.8rem;
`;

const StepDescription = styled.p`
  font-size: var(--text-md);
  line-height: 1.6;
  color: var(--neutral-700);
`;

const FAQItem = styled.div`
  margin-bottom: 2.5rem;
`;

const FAQQuestion = styled.h4`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 1rem;
`;

const FAQAnswer = styled.p`
  font-size: var(--text-md);
  line-height: 1.7;
  color: var(--neutral-700);
`;

const StyledContactSection = styled.div`
  background-color: var(--neutral-100);
  padding: 4rem;
  text-align: center;
  margin-top: 6rem;
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