import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import Link from 'next/link';

interface ArticleDetailPageProps { params: { locale: Locale; slug: string }; }

export async function generateStaticParams() {
  return [
    { slug: 'criminal-law-intro' },
    { slug: 'family-law-iran' },
    { slug: 'property-disputes' },
    { slug: 'online-legal-consultation' },
    { slug: 'labor-laws' },
    { slug: 'commercial-contracts' },
  ];
}

const articles: Record<string, any> = {
  'criminal-law-intro': { titleFa: 'آشنایی با حقوق کیفری', titleEn: 'Introduction to Criminal Law', category: 'کیفری', publishedAt: '2025-10-22', contentFa: 'حقوق کیفری شاخه‌ای از حقوق است که به جرائم و مجازات‌ها می‌پردازد. در این مقاله با مفاهیم پایه حقوق کیفری آشنا می‌شویم.\n\nجرائم عبارتند از اعمالی که قانونگذار آنها را ممنوع اعلام کرده و برای آنها مجازات تعیین نموده است.\n\nانواع جرائم شامل جرائم عمدی، غيرعمدی و شبه عمدی است.', contentEn: 'Criminal law is a branch of law that deals with crimes and punishments.', excerptFa: 'مروری بر مفاهیم پایه حقوق کیفری', excerptEn: 'An overview of basic criminal law concepts' },
  'family-law-iran': { titleFa: 'حقوق خانواده در ایران', titleEn: 'Family Law in Iran', category: 'خانواده', publishedAt: '2025-10-20', contentFa: 'حقوق خانواده شامل قوانین مربوط به ازدواج، طلاق، نفقه، حضانت فرزندان و سایر مسائل خانوادگی است.\n\nدر حقوق ایران، ازدواج یک قرارداد مدنی است که با رعایت شروط قانونی منعقد می‌شود.', contentEn: 'Family law includes laws related to marriage, divorce, alimony, and child custody.', excerptFa: 'بررسی قوانین خانواده', excerptEn: 'Review of family laws' },
  'property-disputes': { titleFa: 'دعاوی ملکی و نکات مهم', titleEn: 'Property Disputes', category: 'ملکی', publishedAt: '2025-10-18', contentFa: 'دعاوی ملکی از شایع‌ترین دعاوی در محاکم قضایی است. این دعاوی شامل خلع ید، تخلیه، الزام به تنظیم سند و غیره می‌شود.', contentEn: 'Property disputes are among the most common litigation cases.', excerptFa: 'راهنمای جامع دعاوی ملکی', excerptEn: 'Guide to property disputes' },
  'online-legal-consultation': { titleFa: 'مشاوره حقوقی آنلاین', titleEn: 'Online Legal Consultation', category: 'مشاوره', publishedAt: '2025-10-15', contentFa: 'مشاوره حقوقی آنلاین امکان دریافت راهنمایی حقوقی از طریق اینترنت را فراهم می‌کند.', contentEn: 'Online legal consultation provides legal guidance through the internet.', excerptFa: 'مزایای مشاوره حقوقی آنلاین', excerptEn: 'Benefits of online legal consultation' },
  'labor-laws': { titleFa: 'قوانین کار و تأمین اجتماعی', titleEn: 'Labor Laws', category: 'کار', publishedAt: '2025-10-12', contentFa: 'قانون کار رابطه بین کارگر و کارفرما را تنظیم می‌کند و حقوق و تعهدات طرفین را مشخص می‌نماید.', contentEn: 'Labor law regulates the relationship between employers and employees.', excerptFa: 'بررسی مهم‌ترین قوانین کار', excerptEn: 'Review of important labor laws' },
  'commercial-contracts': { titleFa: 'قراردادهای تجاری', titleEn: 'Commercial Contracts', category: 'تجارت', publishedAt: '2025-10-10', contentFa: 'قراردادهای تجاری نقش مهمی در روابط اقتصادی دارند. تنظیم صحیح قرارداد می‌تواند از بسیاری اختلافات جلوگیری کند.', contentEn: 'Commercial contracts play an important role in economic relations.', excerptFa: 'نکات مهم در تنظیم قراردادهای تجاری', excerptEn: 'Important points in commercial contracts' },
};

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const dict = await getDictionary(params.locale);
  const article = articles[params.slug];
  if (!article) return <div className="p-20 text-center text-muted-foreground">مقاله یافت نشد</div>;

  const title = params.locale === 'fa' ? article.titleFa : article.titleEn;
  const content = params.locale === 'fa' ? article.contentFa : article.contentEn;
  const excerpt = params.locale === 'fa' ? article.excerptFa : article.excerptEn;

  return (
    <div className="page-transition">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: dict?.nav?.articles || 'Articles', href: `/${params.locale}/articles` }, { label: title }]} locale={params.locale} />
          <div className="mt-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-4 text-sm text-white/60">
              <span className="px-3 py-1 bg-accent-500/10 rounded-full text-accent-400">{article.category}</span>
              {article.publishedAt && <span>{article.publishedAt}</span>}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">{title}</h1>
            <p className="text-white/60 mt-4 text-lg leading-relaxed">{excerpt}</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {content.split('\n').map((paragraph: string, i: number) => (paragraph.trim() && <p key={i}>{paragraph}</p>))}
          </article>
          <div className="mt-12 text-center">
            <Link href={`/${params.locale}/articles`} className="btn-secondary">{dict?.common?.back || 'Back'} {dict?.nav?.articles || 'Articles'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
