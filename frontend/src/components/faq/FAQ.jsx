import React, { useState } from "react";
import styled from "styled-components";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Heading from "../../components/heading/Heading";
import SubHeading from "../../components/heading/SubHeading";

const StyledFAQPage = styled.div`
  width: 100%;
  background-color: var(--white);
  padding-top: 12rem;
  padding-bottom: 6rem;
`;

const StyledFAQContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StyledFAQHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const StyledFAQCategories = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 3rem 0 5rem;
`;

const StyledCategoryButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${({ active }) => active ? "var(--neutral-900)" : "var(--neutral-100)"};
  color: ${({ active }) => active ? "var(--white)" : "var(--neutral-700)"};
  font-size: var(--text-md);
  font-weight: 500;
  border: 1px solid ${({ active }) => active ? "var(--neutral-900)" : "var(--neutral-300)"};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active }) => active ? "var(--neutral-900)" : "var(--neutral-200)"};
  }
`;

const StyledFAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 5rem;
`;

const StyledFAQItem = styled.div`
  border: 1px solid var(--neutral-200);
  overflow: hidden;
`;

const StyledFAQQuestion = styled.div`
  padding: 2rem;
  background-color: ${({ isOpen }) => isOpen ? "var(--neutral-900)" : "var(--white)"};
  color: ${({ isOpen }) => isOpen ? "var(--white)" : "var(--neutral-800)"};
  font-size: var(--text-md);
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ isOpen }) => isOpen ? "var(--neutral-900)" : "var(--neutral-100)"};
  }
`;

const StyledFAQAnswer = styled.div`
  max-height: ${({ isOpen }) => isOpen ? "50rem" : "0"};
  overflow: hidden;
  transition: max-height 0.5s ease;
  background-color: var(--white);
`;

const StyledFAQAnswerContent = styled.div`
  padding: 2rem;
  color: var(--neutral-700);
  font-size: var(--text-md);
  line-height: 1.6;
`;

const StyledContactCTA = styled.div`
  background-color: var(--neutral-100);
  padding: 4rem;
  text-align: center;
  margin-top: 6rem;
  border-radius: 0.5rem;
`;

const StyledContactButton = styled.a`
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

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  const categories = [
    { id: "general", label: "عام" },
    { id: "orders", label: "الطلبات" },
    { id: "shipping", label: "الشحن والتوصيل" },
    { id: "returns", label: "الإرجاع والاستبدال" },
    { id: "payment", label: "طرق الدفع" }
  ];

  // Combined FAQ data structure
  const faqData = {
    general: [
      {
        id: "general-1",
        question: "ما هي ساعات عمل خدمة العملاء؟",
        answer: "يعمل فريق خدمة العملاء لدينا من الساعة 9 صباحًا حتى 6 مساءً بتوقيت المغرب، من الأحد إلى الخميس. نسعى جاهدين للرد على جميع الاستفسارات في أسرع وقت ممكن خلال هذه الساعات."
      },
      {
        id: "general-2",
        question: "هل تقدمون خدمة تصميم القفطان حسب الطلب؟",
        answer: "نعم، نقدم خدمة تصميم وتفصيل القفطان حسب الطلب. يمكنك التواصل معنا عبر صفحة 'اتصل بنا' لمناقشة التفاصيل والمتطلبات الخاصة بك. سيقوم فريق المصممين لدينا بالعمل معك لإنشاء قطعة فريدة تناسب ذوقك ومتطلباتك."
      },
      {
        id: "general-3",
        question: "كيف يمكنني العناية بالقفطان؟",
        answer: "للحفاظ على جودة القفطان، نوصي بالتنظيف الجاف فقط للقطع المطرزة والمزخرفة. بالنسبة للقطع البسيطة، يمكن غسلها يدويًا باستخدام ماء بارد ومنظف لطيف. يجب تجنب استخدام المبيضات أو المنظفات القوية. للتخزين، احتفظ بالقفطان معلقًا في مكان جاف وبعيد عن أشعة الشمس المباشرة."
      },
      {
        id: "general-4",
        question: "هل منتجاتكم حصرية؟",
        answer: "نعم، جميع تصاميمنا حصرية ومصنوعة بواسطة حرفيين مهرة بكميات محدودة. نحن نؤمن بالجودة وليس الكمية، لذلك قد تكون بعض القطع محدودة العدد. هذا يضمن أن كل عميل يحصل على قطعة فريدة ومميزة."
      },
      {
        id: "general-5",
        question: "هل يمكنني زيارة معرضكم؟",
        answer: "نعم، يمكنك زيارة معرضنا في الرباط. نرحب بالزيارات من الأحد إلى الخميس من الساعة 10 صباحًا حتى 7 مساءً، ويوم السبت من 10 صباحًا حتى 5 مساءً. يفضل تحديد موعد مسبق للزيارات الخاصة وجلسات القياس."
      }
    ],
    orders: [
      {
        id: "orders-1",
        question: "كيف يمكنني تتبع طلبي؟",
        answer: "بمجرد شحن طلبك، ستتلقى بريدًا إلكترونيًا يحتوي على رقم التتبع ورابط لمتابعة حالة شحنتك. يمكنك أيضًا تسجيل الدخول إلى حسابك على موقعنا والانتقال إلى قسم 'طلباتي' لمراقبة حالة طلبك."
      },
      {
        id: "orders-2",
        question: "ما هي مدة تنفيذ الطلب؟",
        answer: "تستغرق معالجة الطلبات العادية من 1-3 أيام عمل. بالنسبة للقطع المتوفرة في المخزون، يتم الشحن عادة في غضون 24-48 ساعة. أما بالنسبة للقطع المصممة حسب الطلب، فقد تستغرق من 2-4 أسابيع اعتمادًا على التفاصيل والتطريز المطلوب."
      },
      {
        id: "orders-3",
        question: "هل يمكنني تعديل طلبي بعد تقديمه؟",
        answer: "يمكن إجراء تعديلات على الطلب في غضون ساعتين من وقت تقديمه. بعد ذلك، يدخل الطلب مرحلة المعالجة ولا يمكن تعديله. للتعديلات العاجلة، يرجى الاتصال بخدمة العملاء في أسرع وقت ممكن."
      },
      {
        id: "orders-4",
        question: "كيف يمكنني إلغاء طلبي؟",
        answer: "يمكن إلغاء الطلبات قبل شحنها. للإلغاء، يرجى الاتصال بخدمة العملاء في أقرب وقت ممكن مع ذكر رقم الطلب الخاص بك. إذا تم شحن الطلب بالفعل، فسيتعين عليك اتباع إجراءات الإرجاع."
      },
      {
        id: "orders-5",
        question: "هل هناك حد أدنى للطلب؟",
        answer: "لا، ليس هناك حد أدنى للطلب على موقعنا. يمكنك شراء منتج واحد أو عدة منتجات حسب رغبتك. ومع ذلك، قد تكون هناك رسوم شحن إضافية للطلبات الصغيرة، اعتمادًا على وجهتك."
      }
    ],
    shipping: [
      {
        id: "shipping-1",
        question: "ما هي تكلفة الشحن؟",
        answer: "تختلف تكلفة الشحن حسب الوجهة والوزن. الشحن داخل المغرب يبدأ من 50 درهم، بينما الشحن الدولي يبدأ من 200 درهم. نقدم شحنًا مجانيًا للطلبات التي تزيد قيمتها عن 3000 درهم داخل المغرب و7000 درهم للشحن الدولي."
      },
      {
        id: "shipping-2",
        question: "ما هي الدول التي تشحنون إليها؟",
        answer: "نحن نشحن إلى معظم دول العالم. قائمة الدول المتاحة للشحن موجودة في صفحة السداد. إذا لم تكن دولتك مدرجة، يرجى التواصل معنا للترتيبات الخاصة."
      },
      {
        id: "shipping-3",
        question: "كم من الوقت يستغرق وصول طلبي؟",
        answer: "تستغرق مواعيد التسليم المقدرة: 2-3 أيام عمل داخل المغرب، 5-10 أيام عمل إلى دول الشرق الأوسط وشمال أفريقيا، 7-14 يوم عمل إلى أوروبا وأمريكا الشمالية، و14-21 يوم عمل إلى بقية أنحاء العالم."
      },
      {
        id: "shipping-4",
        question: "هل يمكنني اختيار تاريخ ووقت محدد للتسليم؟",
        answer: "للأسف، لا يمكننا ضمان تواريخ وأوقات تسليم محددة نظرًا لاعتمادنا على شركات الشحن الخارجية. ومع ذلك، يمكنك إضافة تعليمات خاصة بالتسليم في ملاحظات الطلب، وسنبذل قصارى جهدنا لاستيعابها."
      },
      {
        id: "shipping-5",
        question: "هل تقدمون خدمة التوصيل في نفس اليوم؟",
        answer: "نعم، نقدم خدمة التوصيل في نفس اليوم في مدن محددة داخل المغرب (الرباط، الدار البيضاء، مراكش) للطلبات المقدمة قبل الساعة 12 ظهرًا. تطبق رسوم إضافية على هذه الخدمة."
      }
    ],
    returns: [
      {
        id: "returns-1",
        question: "ما هي سياسة الإرجاع الخاصة بكم؟",
        answer: "نقبل المرتجعات في غضون 14 يومًا من استلام الطلب، شريطة أن تكون المنتجات في حالتها الأصلية مع جميع البطاقات والتغليف. يرجى ملاحظة أن المنتجات المصممة حسب الطلب والمجوهرات والإكسسوارات غير قابلة للإرجاع إلا في حالة وجود عيوب."
      },
      {
        id: "returns-2",
        question: "كيف يمكنني إرجاع أو استبدال منتج؟",
        answer: "لإرجاع أو استبدال منتج، يرجى الاتصال بخدمة العملاء في غضون 14 يومًا من الاستلام. سنرسل لك نموذج إرجاع وتعليمات الشحن. بمجرد استلام المنتج المرتجع وفحصه، سنقوم بمعالجة الاسترداد أو الاستبدال."
      },
      {
        id: "returns-3",
        question: "من يتحمل تكلفة شحن المرتجعات؟",
        answer: "يتحمل العميل تكلفة شحن المرتجعات ما لم يكن السبب عيبًا في المنتج أو خطأ من طرفنا. في هذه الحالات، سنقوم بتغطية تكاليف الشحن لاستعادة المنتج وإرسال البديل."
      },
      {
        id: "returns-4",
        question: "كم من الوقت يستغرق معالجة المرتجعات والاستردادات؟",
        answer: "بمجرد استلامنا للمنتج المرتجع، تستغرق عملية الفحص 2-3 أيام عمل. بعد الموافقة على الإرجاع، يتم معالجة الاسترداد في غضون 5-7 أيام عمل. قد يستغرق ظهور المبلغ المسترد في حسابك ما يصل إلى 14 يومًا اعتمادًا على البنك الذي تتعامل معه."
      },
      {
        id: "returns-5",
        question: "هل هناك رسوم على المرتجعات؟",
        answer: "لا توجد رسوم على معالجة المرتجعات، ولكن يتحمل العميل تكاليف الشحن للإرجاع ما لم يكن هناك عيب في المنتج. إذا كنت ترغب في استبدال المنتج بمقاس أو لون مختلف، فلن تكون هناك رسوم إضافية بخلاف أي فرق في السعر."
      }
    ],
    payment: [
      {
        id: "payment-1",
        question: "ما هي طرق الدفع المقبولة؟",
        answer: "نقبل مجموعة متنوعة من طرق الدفع، بما في ذلك: بطاقات الائتمان والخصم (فيزا، ماستركارد، أمريكان إكسبرس)، الدفع عند الاستلام (داخل المغرب فقط)، والتحويل المصرفي، وخدمات الدفع الإلكتروني مثل PayPal."
      },
      {
        id: "payment-2",
        question: "هل معلومات الدفع الخاصة بي آمنة؟",
        answer: "نعم، نستخدم تقنيات تشفير متقدمة وبوابات دفع آمنة لضمان حماية معلوماتك. نحن لا نخزن تفاصيل بطاقة الائتمان الخاصة بك على خوادمنا، وجميع المعاملات تتم عبر قنوات آمنة ومشفرة."
      },
      {
        id: "payment-3",
        question: "متى يتم خصم المبلغ من حسابي؟",
        answer: "يتم خصم المبلغ من حسابك فور تأكيد الطلب. في حالة الدفع عند الاستلام، يتم تحصيل المبلغ عند استلام الطلب. أما بالنسبة للتحويلات المصرفية، فيجب إكمال التحويل في غضون 48 ساعة لتجنب إلغاء الطلب."
      },
      {
        id: "payment-4",
        question: "هل يمكنني الدفع بعملة أخرى غير الدرهم المغربي؟",
        answer: "نعم، يمكنك الدفع بعملات أخرى. يعرض موقعنا الأسعار بالدرهم المغربي، ولكن عند السداد ببطاقة ائتمان دولية، سيتم تحويل المبلغ تلقائيًا إلى عملتك المحلية وفقًا لأسعار الصرف الحالية التي يحددها البنك الخاص بك."
      },
      {
        id: "payment-5",
        question: "هل تقدمون خيارات الدفع بالتقسيط؟",
        answer: "نعم، نقدم خيارات الدفع بالتقسيط للطلبات التي تزيد قيمتها عن 5000 درهم من خلال شركائنا الماليين. يمكن تقسيم المبلغ على 3-6 أشهر بدون فوائد أو رسوم إضافية. للاستفادة من هذه الخدمة، يرجى اختيار 'الدفع بالتقسيط' عند السداد."
      }
    ]
  };

  return (
    <StyledFAQPage>
      <StyledFAQContent>
        <StyledFAQHeader>
          <Heading title="الأسئلة الشائعة" weight={500} />
          <SubHeading 
            title="تجد هنا إجابات لأكثر الأسئلة شيوعًا حول منتجاتنا وخدماتنا" 
            size="lg" 
          />
        </StyledFAQHeader>

        <StyledFAQCategories>
          {categories.map((category) => (
            <StyledCategoryButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </StyledCategoryButton>
          ))}
        </StyledFAQCategories>

        <StyledFAQList>
          {faqData[activeCategory].map((faq) => (
            <StyledFAQItem key={faq.id}>
              <StyledFAQQuestion 
                onClick={() => toggleQuestion(faq.id)}
                isOpen={openQuestionId === faq.id}
              >
                <span>{faq.question}</span>
                {openQuestionId === faq.id ? (
                  <ChevronUpIcon width={20} height={20} />
                ) : (
                  <ChevronDownIcon width={20} height={20} />
                )}
              </StyledFAQQuestion>
              <StyledFAQAnswer isOpen={openQuestionId === faq.id}>
                <StyledFAQAnswerContent>
                  {faq.answer}
                </StyledFAQAnswerContent>
              </StyledFAQAnswer>
            </StyledFAQItem>
          ))}
        </StyledFAQList>

        <StyledContactCTA>
          <Heading title="لم تجد إجابة لسؤالك؟" weight={500} />
          <SubHeading 
            title="فريق خدمة العملاء لدينا جاهز لمساعدتك" 
            size="lg" 
          />
          <StyledContactButton href="/contact">
            تواصل معنا
          </StyledContactButton>
        </StyledContactCTA>
      </StyledFAQContent>
    </StyledFAQPage>
  );
};

export default FAQ;