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
