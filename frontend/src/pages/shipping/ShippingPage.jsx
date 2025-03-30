import React from "react";
import styled from "styled-components";
import Heading from "../../components/heading/Heading";
import SubHeading from "../../components/heading/SubHeading";


const ShippingPage = () => {
  return (
    <StyledShippingPage>
      <StyledShippingContent>
        <StyledPageHeader>
          <Heading title="الشحن والتوصيل" weight={500} />
          <SubHeading 
            title="معلومات مفصلة حول سياسة الشحن والتوصيل لدينا"
            size="lg" 
          />
        </StyledPageHeader>

        <StyledSectionContainer>
          <StyledSection>
            <SectionTitle>طرق الشحن المتاحة</SectionTitle>
            <SectionText>
              نوفر خدمة توصيل سريعة وآمنة لجميع أنحاء المغرب ودول العالم. نتعامل مع شركات شحن موثوقة لضمان وصول منتجاتك بأمان وفي الوقت المحدد.
            </SectionText>
            
            <ShippingMethodsTable>
              <thead>
                <tr>
                  <TableHeader>منطقة الشحن</TableHeader>
                  <TableHeader>طريقة الشحن</TableHeader>
                  <TableHeader>مدة التوصيل المتوقعة</TableHeader>
                  <TableHeader>تكلفة الشحن</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>داخل المغرب - المدن الرئيسية</TableCell>
                  <TableCell>شحن سريع</TableCell>
                  <TableCell>2-3 أيام عمل</TableCell>
                  <TableCell>50 - 100 درهم</TableCell>
                </tr>
                <tr>
                  <TableCell>داخل المغرب - المناطق النائية</TableCell>
                  <TableCell>شحن قياسي</TableCell>
                  <TableCell>3-5 أيام عمل</TableCell>
                  <TableCell>100 - 150 درهم</TableCell>
                </tr>
                <tr>
                  <TableCell>دول الشرق الأوسط وشمال أفريقيا</TableCell>
                  <TableCell>شحن دولي</TableCell>
                  <TableCell>5-10 أيام عمل</TableCell>
                  <TableCell>200 - 350 درهم</TableCell>
                </tr>
                <tr>
                  <TableCell>أوروبا وأمريكا الشمالية</TableCell>
                  <TableCell>شحن دولي مميز</TableCell>
                  <TableCell>7-14 يوم عمل</TableCell>
                  <TableCell>350 - 550 درهم</TableCell>
                </tr>
                <tr>
                  <TableCell>باقي دول العالم</TableCell>
                  <TableCell>شحن دولي مميز</TableCell>
                  <TableCell>14-21 يوم عمل</TableCell>
                  <TableCell>450 - 750 درهم</TableCell>
                </tr>
              </tbody>
            </ShippingMethodsTable>
          </StyledSection>

          <StyledSection>
            <SectionTitle>الشحن المجاني</SectionTitle>
            <SectionText>
              نقدم شحناً مجانياً للطلبات التي تتجاوز قيمة معينة:
            </SectionText>
            <FeatureList>
              <FeatureItem>للطلبات داخل المغرب: شحن مجاني للطلبات التي تتجاوز 3000 درهم</FeatureItem>
              <FeatureItem>للطلبات الدولية: شحن مجاني للطلبات التي تتجاوز 7000 درهم</FeatureItem>
            </FeatureList>
          </StyledSection>

          <StyledSection>
            <SectionTitle>تتبع الشحنة</SectionTitle>
            <SectionText>
              بمجرد شحن طلبك، سنرسل لك رسالة بريد إلكتروني تحتوي على رقم التتبع ورابط لمتابعة حالة الشحنة. يمكنك أيضًا تسجيل الدخول إلى حسابك على موقعنا والانتقال إلى قسم "طلباتي" لمراقبة حالة طلبك.
            </SectionText>
          </StyledSection>

          <StyledSection>
            <SectionTitle>التوصيل في نفس اليوم</SectionTitle>
            <SectionText>
              نقدم خدمة التوصيل في نفس اليوم في المدن الرئيسية التالية داخل المغرب:
            </SectionText>
            <FeatureList>
              <FeatureItem>الرباط</FeatureItem>
              <FeatureItem>الدار البيضاء</FeatureItem>
              <FeatureItem>مراكش</FeatureItem>
            </FeatureList>
            <SectionText>
              تنطبق هذه الخدمة على الطلبات المقدمة قبل الساعة 12 ظهرًا، وتخضع لرسوم إضافية قدرها 150 درهم.
            </SectionText>
          </StyledSection>

          <StyledSection>
            <SectionTitle>سياسة التوصيل</SectionTitle>
            <SectionText>
              عند استلام الطلب، يرجى التحقق من المنتج قبل توقيع إيصال الاستلام. في حالة وجود أي ضرر أو عيب واضح، يرجى رفض استلام المنتج وإبلاغنا على الفور.
            </SectionText>
            <SectionText>
              إذا لم يكن أحد متواجدًا لاستلام الطلب، سيترك مندوب التوصيل إشعارًا وسيحاول التوصيل مرة أخرى في اليوم التالي. بعد ثلاث محاولات توصيل غير ناجحة، سيتم إعادة المنتج إلى مستودعنا وسيتم التواصل معك لترتيب التسليم مرة أخرى.
            </SectionText>
          </StyledSection>

          <StyledSection>
            <SectionTitle>الأسئلة الشائعة حول الشحن</SectionTitle>
            <FAQItem>
              <FAQQuestion>هل يمكنني تغيير عنوان التوصيل بعد تقديم الطلب؟</FAQQuestion>
              <FAQAnswer>
                نعم، يمكنك تغيير عنوان التوصيل إذا لم يتم شحن طلبك بعد. يرجى الاتصال بخدمة العملاء في أقرب وقت ممكن مع ذكر رقم الطلب والعنوان الجديد.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>هل يمكنني اختيار تاريخ ووقت محدد للتسليم؟</FAQQuestion>
              <FAQAnswer>
                للأسف، لا يمكننا ضمان تواريخ وأوقات تسليم محددة نظرًا لاعتمادنا على شركات الشحن الخارجية. ومع ذلك، يمكنك إضافة تعليمات خاصة بالتسليم في ملاحظات الطلب، وسنبذل قصارى جهدنا لاستيعابها.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>هل تقدمون الشحن الدولي لجميع البلدان؟</FAQQuestion>
              <FAQAnswer>
                نعم، نحن نشحن إلى معظم دول العالم. إذا كان لديك أي شك حول توفر الشحن إلى بلدك، يرجى التواصل معنا قبل إتمام الطلب.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>كيف يتم تغليف المنتجات للشحن؟</FAQQuestion>
              <FAQAnswer>
                نولي اهتمامًا كبيرًا لتغليف منتجاتنا. يتم تغليف جميع القطع بعناية في أكياس قماشية خاصة لحمايتها من الغبار، ثم توضع في صناديق مقوية لضمان وصولها بحالة ممتازة.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>ماذا يحدث إذا لم أكن متواجدًا عند وصول الطلب؟</FAQQuestion>
              <FAQAnswer>
                إذا لم تكن متواجدًا، سيترك مندوب التوصيل إشعارًا وسيحاول التوصيل مرة أخرى. بعد ثلاث محاولات غير ناجحة، سيتم إعادة المنتج إلينا. يمكنك الاتصال بنا لترتيب عملية إعادة الشحن، والتي قد تخضع لرسوم إضافية.
              </FAQAnswer>
            </FAQItem>
          </StyledSection>
        </StyledSectionContainer>

        <StyledContactSection>
          <Heading title="هل لديك المزيد من الأسئلة؟" weight={500} />
          <SubHeading 
            title="فريق خدمة العملاء لدينا متاح للإجابة على استفساراتك" 
            size="lg" 
          />
          <ContactButton href="/contact">تواصل معنا</ContactButton>
        </StyledContactSection>
      </StyledShippingContent>
    </StyledShippingPage>
  );
};

export default ShippingPage;

// Styled Components
const StyledShippingPage = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const StyledShippingContent = styled.div`
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

const ShippingMethodsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
`;

const TableHeader = styled.th`
  background-color: var(--neutral-100);
  padding: 1.5rem;
  text-align: right;
  font-weight: 600;
  font-size: var(--text-md);
  color: var(--neutral-800);
  border: 1px solid var(--neutral-300);
`;

const TableCell = styled.td`
  padding: 1.5rem;
  font-size: var(--text-md);
  color: var(--neutral-700);
  border: 1px solid var(--neutral-300);
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