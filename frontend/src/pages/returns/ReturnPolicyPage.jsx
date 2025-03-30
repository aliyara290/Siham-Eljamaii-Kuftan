import React from "react";
import styled from "styled-components";
import Heading from "../../components/heading/Heading";
import SubHeading from "../../components/heading/SubHeading";


const ReturnPolicyPage = () => {
  return (
    <StyledReturnPolicyPage>
      <StyledReturnPolicyContent>
        <StyledPageHeader>
          <Heading title="سياسة الإرجاع" weight={500} />
          <SubHeading 
            title="تفاصيل سياسة الإرجاع والاستبدال لضمان رضاك التام عن منتجاتنا"
            size="lg" 
          />
        </StyledPageHeader>

        <StyledSectionContainer>
          <StyledSection>
            <SectionTitle>شروط الإرجاع</SectionTitle>
            <SectionText>
              نحن نسعى دائمًا لتقديم منتجات عالية الجودة تلبي توقعاتك. ومع ذلك، إذا لم تكن راضيًا تمامًا عن مشترياتك، فيمكنك إرجاعها وفقًا للشروط التالية:
            </SectionText>
            
            <FeatureList>
              <FeatureItem>يجب تقديم طلب الإرجاع في غضون 14 يومًا من تاريخ استلام المنتج.</FeatureItem>
              <FeatureItem>يجب أن تكون المنتجات بحالتها الأصلية، غير مستخدمة، وبكامل تغليفها وملصقاتها.</FeatureItem>
              <FeatureItem>يجب تقديم إيصال الشراء أو إثبات الشراء مع طلب الإرجاع.</FeatureItem>
              <FeatureItem>المنتجات المصممة خصيصًا حسب الطلب غير قابلة للإرجاع إلا في حالة وجود عيوب تصنيع.</FeatureItem>
              <FeatureItem>المجوهرات والإكسسوارات غير قابلة للإرجاع لأسباب تتعلق بالنظافة، إلا في حالة وجود عيوب.</FeatureItem>
            </FeatureList>
          </StyledSection>

          <StyledSection>
            <SectionTitle>عملية الإرجاع</SectionTitle>
            <SectionText>
              لإرجاع أو استبدال منتج، يرجى اتباع الخطوات التالية:
            </SectionText>
            
            <ProcessSteps>
              <ProcessStep>
                <StepNumber>1</StepNumber>
                <StepContent>
                  <StepTitle>الاتصال بخدمة العملاء</StepTitle>
                  <StepDescription>
                    قم بالتواصل مع فريق خدمة العملاء عبر البريد الإلكتروني على info@siham-kuftan.com أو عبر الهاتف على +212 520 123456 في غضون 14 يومًا من استلام طلبك.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
              
              <ProcessStep>
                <StepNumber>2</StepNumber>
                <StepContent>
                  <StepTitle>تعبئة نموذج الإرجاع</StepTitle>
                  <StepDescription>
                    بعد الموافقة على طلب الإرجاع، سنرسل لك نموذج إرجاع يجب تعبئته وإرفاقه مع المنتج المرتجع.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
              
              <ProcessStep>
                <StepNumber>3</StepNumber>
                <StepContent>
                  <StepTitle>تغليف المنتج</StepTitle>
                  <StepDescription>
                    قم بتغليف المنتج بعناية في العبوة الأصلية أو عبوة مناسبة مع التأكد من إرفاق نموذج الإرجاع وإيصال الشراء.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
              
              <ProcessStep>
                <StepNumber>4</StepNumber>
                <StepContent>
                  <StepTitle>شحن المنتج</StepTitle>
                  <StepDescription>
                    قم بإرسال المنتج إلى العنوان المحدد في نموذج الإرجاع. نوصي باستخدام خدمة شحن مع إمكانية التتبع.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
              
              <ProcessStep>
                <StepNumber>5</StepNumber>
                <StepContent>
                  <StepTitle>معالجة الإرجاع</StepTitle>
                  <StepDescription>
                    بمجرد استلامنا للمنتج، سنقوم بفحصه ومعالجة طلب الإرجاع أو الاستبدال في غضون 5-7 أيام عمل.
                  </StepDescription>
                </StepContent>
              </ProcessStep>
            </ProcessSteps>
          </StyledSection>

          <StyledSection>
            <SectionTitle>رد المبالغ والاستبدال</SectionTitle>
            <SectionText>
              بعد استلام وفحص المنتج المرتجع، سنقوم بمعالجة طلبك وفقًا لخيارك:
            </SectionText>
            
            <OptionList>
              <OptionItem>
                <OptionTitle>استرداد المبلغ</OptionTitle>
                <OptionDescription>
                  سيتم رد المبلغ بنفس طريقة الدفع الأصلية التي استخدمتها للشراء. قد يستغرق ظهور المبلغ المسترد في حسابك ما يصل إلى 14 يومًا، اعتمادًا على البنك الذي تتعامل معه.
                </OptionDescription>
              </OptionItem>
              
              <OptionItem>
                <OptionTitle>استبدال المنتج</OptionTitle>
                <OptionDescription>
                  إذا كنت ترغب في استبدال المنتج بلون أو حجم مختلف، سنقوم بشحن البديل بمجرد توفره. في حالة وجود فرق في السعر، سيتم تحصيله أو رده حسب الحالة.
                </OptionDescription>
              </OptionItem>
              
              <OptionItem>
                <OptionTitle>رصيد في المتجر</OptionTitle>
                <OptionDescription>
                  يمكنك اختيار الحصول على رصيد في المتجر يمكن استخدامه في عمليات شراء مستقبلية. الرصيد في المتجر صالح لمدة عام واحد من تاريخ الإصدار.
                </OptionDescription>
              </OptionItem>
            </OptionList>
          </StyledSection>

          <StyledSection>
            <SectionTitle>تكاليف الإرجاع</SectionTitle>
            <SectionText>
              يتحمل العميل تكلفة شحن المنتجات المرتجعة، إلا في الحالات التالية:
            </SectionText>
            
            <FeatureList>
              <FeatureItem>استلام منتج به عيب تصنيع.</FeatureItem>
              <FeatureItem>استلام منتج مختلف عما تم طلبه.</FeatureItem>
              <FeatureItem>استلام منتج تالف أثناء الشحن.</FeatureItem>
            </FeatureList>
            
            <SectionText>
              في الحالات المذكورة أعلاه، سنقوم بتغطية تكاليف الشحن لاستعادة المنتج وإرسال البديل.
            </SectionText>
          </StyledSection>

          <StyledSection>
            <SectionTitle>الأسئلة الشائعة حول الإرجاع</SectionTitle>
            <FAQItem>
              <FAQQuestion>هل يمكنني إرجاع منتج تم شراؤه خلال فترة التخفيضات؟</FAQQuestion>
              <FAQAnswer>
                نعم، المنتجات المشتراة خلال فترة التخفيضات تخضع لنفس سياسة الإرجاع، باستثناء المنتجات المميزة بعلامة "لا يمكن إرجاعها" أو "البيع النهائي".
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>كم من الوقت يستغرق معالجة الإرجاع؟</FAQQuestion>
              <FAQAnswer>
                بمجرد استلامنا للمنتج المرتجع، تستغرق عملية الفحص 2-3 أيام عمل. بعد الموافقة على الإرجاع، يتم معالجة الاسترداد في غضون 5-7 أيام عمل.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>ماذا لو تغير رأيي بعد تقديم طلب الإرجاع؟</FAQQuestion>
              <FAQAnswer>
                إذا غيرت رأيك بعد تقديم طلب الإرجاع، يرجى الاتصال بخدمة العملاء في أسرع وقت ممكن. إذا لم يتم شحن المنتج المرتجع بعد، يمكننا إلغاء طلب الإرجاع.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>هل يمكنني إرجاع جزء من الطلب فقط؟</FAQQuestion>
              <FAQAnswer>
                نعم، يمكنك إرجاع منتج واحد أو أكثر من طلبك دون الحاجة إلى إرجاع جميع المنتجات.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>ماذا لو اكتشفت عيبًا في المنتج بعد فترة الإرجاع؟</FAQQuestion>
              <FAQAnswer>
                جميع منتجاتنا مغطاة بضمان ضد عيوب التصنيع لمدة 6 أشهر من تاريخ الشراء. إذا اكتشفت عيبًا بعد فترة الإرجاع، يرجى التواصل مع خدمة العملاء مع تقديم صور للعيب.
              </FAQAnswer>
            </FAQItem>
          </StyledSection>
        </StyledSectionContainer>

        <StyledContactSection>
          <Heading title="هل تحتاج إلى مساعدة إضافية؟" weight={500} />
          <SubHeading 
            title="فريق خدمة العملاء لدينا جاهز للإجابة على أي استفسارات لديك" 
            size="lg" 
          />
          <ContactButton href="/contact">تواصل معنا</ContactButton>
        </StyledContactSection>
      </StyledReturnPolicyContent>
    </StyledReturnPolicyPage>
  );
};

export default ReturnPolicyPage;

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
    background-color: var(--neutral-400);
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

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 2.5rem 0;
`;

const OptionItem = styled.div`
  border-right: 2px solid var(--neutral-300);
  padding-right: 2rem;
`;

const OptionTitle = styled.h4`
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 1rem;
`;

const OptionDescription = styled.p`
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