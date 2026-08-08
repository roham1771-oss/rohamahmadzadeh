import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ArticleCard } from '@/components/shared/ArticleCard';

interface ArticlesPageProps { params: { locale: Locale }; }

export async function generateMetadata({ params }: ArticlesPageProps) {
  const dict = await getDictionary(params.locale);
  return generateSEO({ title: dict.seo?.articles?.title, description: dict.seo?.articles?.description, url: '/articles', locale: params.locale });
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const dict = await getDictionary(params.locale);

  const articles = [
    { id: '1', titleFa: 'آشنایی با حقوق کیفری', titleEn: 'Introduction to Criminal Law', slug: 'criminal-law-intro', excerptFa: 'مروری بر مفاهیم پایه حقوق کیفری و جرائم در قانون مجازات اسلامی', excerptEn: 'An overview of basic criminal law concepts', coverImage: null, category: 'کیفری', publishedAt: '2025-10-22', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '2', titleFa: 'حقوق خانواده در ایران', titleEn: 'Family Law in Iran', slug: 'family-law-iran', excerptFa: 'بررسی قوانین خانواده شامل ازدواج، طلاق و نفقه', excerptEn: 'Review of family laws', coverImage: null, category: 'خانواده', publishedAt: '2025-10-20', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '3', titleFa: 'دعاوی ملکی و نکات مهم', titleEn: 'Property Disputes', slug: 'property-disputes', excerptFa: 'راهنمای جامع دعاوی ملکی و نکات حقوقی مهم', excerptEn: 'Guide to property disputes', coverImage: null, category: 'ملکی', publishedAt: '2025-10-18', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '4', titleFa: 'مشاوره حقوقی آنلاین', titleEn: 'Online Legal Consultation', slug: 'online-legal-consultation', excerptFa: 'مزایای مشاوره حقوقی آنلاین', excerptEn: 'Benefits of online legal consultation', coverImage: null, category: 'مشاوره', publishedAt: '2025-10-15', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '5', titleFa: 'قوانین کار و تأمین اجتماعی', titleEn: 'Labor Laws', slug: 'labor-laws', excerptFa: 'بررسی مهم‌ترین قوانین کار', excerptEn: 'Review of important labor laws', coverImage: null, category: 'کار', publishedAt: '2025-10-12', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '6', titleFa: 'قراردادهای تجاری', titleEn: 'Commercial Contracts', slug: 'commercial-contracts', excerptFa: 'نکات مهم در تنظیم قراردادهای تجاری', excerptEn: 'Important points in commercial contracts', coverImage: null, category: 'تجارت', publishedAt: '2025-10-10', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '7', titleFa: 'قانون جدید مهریه با ۱۴ سکه در سال ۱۴۰۴', titleEn: 'New Dowry Law: Maximum 14 Coins in 1404', slug: 'new-mehrieh-law-1404', excerptFa: 'بررسی قانون جدید مهریه مصوب مجلس شورای اسلامی در سال ۱۴۰۴', excerptEn: 'Analysis of the new dowry law passed by the Iranian Parliament in 1404', coverImage: null, category: 'خانواده', publishedAt: '2025-12-03', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '8', titleFa: 'قانون مالیات جدید در ایران ۱۴۰۴', titleEn: 'New Tax Law in Iran 1404', slug: 'new-tax-law-1404', excerptFa: 'بررسی جامع تغییرات قانون مالیات جدید در سال ۱۴۰۴', excerptEn: 'Comprehensive analysis of the new tax law changes in 1404', coverImage: null, category: 'مالی', publishedAt: '2025-07-01', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '9', titleFa: 'اصلاحات قانون تجارت در سال ۱۴۰۴', titleEn: 'Commercial Law Reforms in 1404', slug: 'commercial-law-reforms-1404', excerptFa: 'بررسی مهم‌ترین اصلاحات قانون تجارت در سال ۱۴۰۴', excerptEn: 'Analysis of the most important commercial law reforms in 1404', coverImage: null, category: 'تجارت', publishedAt: '2025-04-23', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '10', titleFa: 'ابطال چک تضمینی؛ قوانین و نکات مهم', titleEn: 'Dishonored Guaranteed Checks: Laws and Key Points', slug: 'check-dishonor-law', excerptFa: 'بررسی پذیرش دعوای ابطال چک تضمینی در دیوان عالی کشور', excerptEn: 'Analysis of dishonored guaranteed check claims in the Supreme Court', coverImage: null, category: 'کیفری', publishedAt: '2025-08-07', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '11', titleFa: 'هشدار: شگردهای جدید جعل هویت و کلاهبرداری', titleEn: 'Warning: New Identity Fraud and Scam Techniques', slug: 'identity-fraud-warning', excerptFa: 'هشدار وکلای دادگستری درباره شگردهای جدید باندهای جعل هویت', excerptEn: 'Warning from lawyers about new identity fraud techniques', coverImage: null, category: 'کیفری', publishedAt: '2025-08-07', contentFa: 'محتوا', contentEn: 'Content' },
    { id: '12', titleFa: 'تمدید خودکار قراردادهای اجاره در سال ۱۴۰۵', titleEn: 'Automatic Renewal of Rental Contracts in 1405', slug: 'rental-contract-1405', excerptFa: 'مصوبه سران قوا درخصوص تمدید خودکار قراردادهای اجاره', excerptEn: 'Government heads resolution on automatic renewal of rental contracts', coverImage: null, category: 'ملکی', publishedAt: '2025-08-05', contentFa: 'محتوا', contentEn: 'Content' },
  ];

  return (
    <div className="page-transition">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: dict?.nav?.articles || 'Articles' }]} locale={params.locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">{dict?.articles?.title || 'Articles'}</h1>
          <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">{dict?.articles?.subtitle || ''}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} locale={params.locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
