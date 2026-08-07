import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { FAQAccordion } from '@/components/shared/FAQAccordion';

interface FAQPageProps { params: { locale: Locale }; }

export async function generateMetadata({ params }: FAQPageProps) {
  const dict = await getDictionary(params.locale);
  return generateSEO({ title: dict.seo?.faq?.title, description: dict.seo?.faq?.description, url: '/faq', locale: params.locale });
}

export default async function FAQPage({ params }: FAQPageProps) {
  const dict = await getDictionary(params.locale);

  const faqs = [
    { id: '1', questionFa: 'هزینه مشاوره حقوقی چقدر است؟', questionEn: 'How much does legal consultation cost?', answerFa: 'مشاوره اولیه به صورت رایگان ارائه می‌شود. هزینه مشاوره تخصصی بسته به نوع پرونده متفاوت است.', answerEn: 'Initial consultation is free. Specialized consultation fees vary depending on the type of case.', category: 'عمومی', sortOrder: 1, isActive: true },
    { id: '2', questionFa: 'چگونه می‌توانم وقت مشاوره بگیرم؟', questionEn: 'How can I schedule a consultation?', answerFa: 'از طریق فرم تماس، تلفن یا واتساپ می‌توانید وقت مشاوره رزرو کنید.', answerEn: 'You can schedule a consultation through the contact form, phone, or WhatsApp.', category: 'عمومی', sortOrder: 2, isActive: true },
    { id: '3', questionFa: 'آیا امکان مشاوره آنلاین وجود دارد؟', questionEn: 'Is online consultation available?', answerFa: 'بله، مشاوره از طریق واتساپ و تماس تصویری امکان‌پذیر است.', answerEn: 'Yes, consultation is available via WhatsApp and video calls.', category: 'عمومی', sortOrder: 3, isActive: true },
    { id: '4', questionFa: 'مدت زمان رسیدگی به پرونده چقدر است؟', questionEn: 'How long does case processing take?', answerFa: 'بسته به نوع پرونده و پیچیدگی آن متفاوت است. در جلسه مشاوره زمان تقریبی اعلام می‌شود.', answerEn: 'It varies depending on the type and complexity of the case. Approximate time is announced in the consultation meeting.', category: 'پرونده‌ها', sortOrder: 4, isActive: true },
    { id: '5', questionFa: 'در چه زمینه‌هایی وکالت می‌کنید؟', questionEn: 'What areas do you practice?', answerFa: 'دعاوی کیفری، خانواده، حقوقی و مدنی، ملکی، تجاری و مشاوره حقوقی.', answerEn: 'Criminal, family, civil, property, commercial law, and legal consultation.', category: 'تخصصی', sortOrder: 5, isActive: true },
    { id: '6', questionFa: 'آیا امکان پرداخت اقساطی حق الوکاله وجود دارد؟', questionEn: 'Is installment payment available for attorney fees?', answerFa: 'بله، در صورت توافق امکان پرداخت اقساطی وجود دارد.', answerEn: 'Yes, installment payment is available upon agreement.', category: 'مالی', sortOrder: 6, isActive: true },
  ];

  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <div className="page-transition">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: dict?.nav?.faq || 'FAQ' }]} locale={params.locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">{dict?.faq?.title || 'FAQ'}</h1>
          <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">{dict?.faq?.subtitle || ''}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {categories.map((cat) => (
            <div key={cat} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 gradient-text">{cat}</h2>
              <FAQAccordion items={faqs.filter(f => f.category === cat)} locale={params.locale} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
