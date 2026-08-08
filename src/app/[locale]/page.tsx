import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { CTASection } from '@/components/sections/CTASection';
import { LatestArticles } from '@/components/sections/LatestArticles';
import { generateSEO } from '@/lib/seo';
import { JsonLd } from '@/components/shared/JsonLd';

interface HomePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params }: HomePageProps) {
  const dict = await getDictionary(params.locale);
  return generateSEO({
    title: dict.seo?.home?.title,
    description: dict.seo?.home?.description,
    url: params.locale === 'fa' ? '/' : '/en',
    locale: params.locale,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const dict = await getDictionary(params.locale);

  const services = [
    { id: '1', titleFa: 'دعاوی کیفری', titleEn: 'Criminal Law', slug: 'criminal', descriptionFa: 'مشاوره و خدمات حقوقی در دعاوی کیفری ارائه می‌شود.', descriptionEn: 'Legal consultation and services in criminal cases.', icon: 'Shield', category: 'کیفری' },
    { id: '2', titleFa: 'دعاوی خانواده', titleEn: 'Family Law', slug: 'family', descriptionFa: 'حمایت حقوقی در زمینه دعاوی خانوادگی و مسائل مربوط آن.', descriptionEn: 'Legal support in family disputes and related issues.', icon: 'Users', category: 'خانواده' },
    { id: '3', titleFa: 'دعاوی حقوقی و مدنی', titleEn: 'Civil Law', slug: 'civil', descriptionFa: 'خدمات حقوقی در دعاوی مالی و ملکی به‌طور کامل.', descriptionEn: 'Complete legal services in financial and property disputes.', icon: 'Scale', category: 'حقوقی' },
  ];

  const articles = [
    { id: '1', titleFa: 'آشنایی با حقوق کیفری', titleEn: 'Introduction to Criminal Law', slug: 'criminal-law-intro', excerptFa: 'مروری بر مفاهیم پایه حقوق کیفری', excerptEn: 'An overview of basic criminal law concepts', coverImage: null, category: 'کیفری', publishedAt: '2025-10-22', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '2', titleFa: 'حقوق خانواده در ایران', titleEn: 'Family Law in Iran', slug: 'family-law-iran', excerptFa: 'بررسی قوانین خانواده', excerptEn: 'Review of family laws', coverImage: null, category: 'خانواده', publishedAt: '2025-10-20', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '3', titleFa: 'دعاوی ملکی', titleEn: 'Property Disputes', slug: 'property-disputes', excerptFa: 'راهنمای دعاوی ملکی', excerptEn: 'Guide to property disputes', coverImage: null, category: 'ملکی', publishedAt: '2025-10-18', contentFa: 'محتوا', contentEn: 'Content' },
  ];

  return (
    <div className="page-transition">
      <JsonLd type="LegalService" />
      <JsonLd type="Person" />
      <JsonLd type="BreadcrumbList" data={{ items: [
        { name: params.locale === 'fa' ? 'خانه' : 'Home', url: params.locale === 'fa' ? 'https://rohamahmadzadeh.ir' : 'https://rohamahmadzadeh.ir/en' },
      ]}} />
      <HeroSection dict={dict} locale={params.locale} />
      <StatsSection dict={dict} locale={params.locale} />
      <ServicesPreview dict={dict} locale={params.locale} services={services} />
      <WhyUsSection dict={dict} locale={params.locale} />
      <LatestArticles dict={dict} locale={params.locale} articles={articles} />
      <CTASection dict={dict} locale={params.locale} />
    </div>
  );
}
