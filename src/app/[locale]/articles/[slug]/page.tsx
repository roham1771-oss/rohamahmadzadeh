import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { JsonLd } from '@/components/shared/JsonLd';
import { generateSEO } from '@/lib/seo';
import Link from 'next/link';

interface ArticleDetailPageProps { params: { locale: Locale; slug: string }; }

export async function generateMetadata({ params }: ArticleDetailPageProps) {
  const article = articles[params.slug];
  if (!article) return {};
  const title = params.locale === 'fa' ? article.titleFa : article.titleEn;
  const desc = (params.locale === 'fa' ? article.excerptFa : article.excerptEn) || '';
  return generateSEO({
    title,
    description: desc.slice(0, 160),
    url: `/articles/${params.slug}`,
    locale: params.locale,
  });
}

export async function generateStaticParams() {
  return [
    { slug: 'criminal-law-intro' },
    { slug: 'family-law-iran' },
    { slug: 'property-disputes' },
    { slug: 'online-legal-consultation' },
    { slug: 'labor-laws' },
    { slug: 'commercial-contracts' },
    { slug: 'new-mehrieh-law-1404' },
    { slug: 'new-tax-law-1404' },
    { slug: 'commercial-law-reforms-1404' },
  ];
}

const articles: Record<string, any> = {
  'criminal-law-intro': { titleFa: 'آشنایی با حقوق کیفری', titleEn: 'Introduction to Criminal Law', category: 'کیفری', publishedAt: '2025-10-22', contentFa: 'حقوق کیفری شاخه‌ای از حقوق است که به جرائم و مجازات‌ها می‌پردازد. در این مقاله با مفاهیم پایه حقوق کیفری آشنا می‌شویم.\n\nجرائم عبارتند از اعمالی که قانونگذار آنها را ممنوع اعلام کرده و برای آنها مجازات تعیین نموده است.\n\nانواع جرائم شامل جرائم عمدی، غيرعمدی و شبه عمدی است.', contentEn: 'Criminal law is a branch of law that deals with crimes and punishments.', excerptFa: 'مروری بر مفاهیم پایه حقوق کیفری', excerptEn: 'An overview of basic criminal law concepts' },
  'family-law-iran': { titleFa: 'حقوق خانواده در ایران', titleEn: 'Family Law in Iran', category: 'خانواده', publishedAt: '2025-10-20', contentFa: 'حقوق خانواده شامل قوانین مربوط به ازدواج، طلاق، نفقه، حضانت فرزندان و سایر مسائل خانوادگی است.\n\nدر حقوق ایران، ازدواج یک قرارداد مدنی است که با رعایت شروط قانونی منعقد می‌شود.', contentEn: 'Family law includes laws related to marriage, divorce, alimony, and child custody.', excerptFa: 'بررسی قوانین خانواده', excerptEn: 'Review of family laws' },
  'property-disputes': { titleFa: 'دعاوی ملکی و نکات مهم', titleEn: 'Property Disputes', category: 'ملکی', publishedAt: '2025-10-18', contentFa: 'دعاوی ملکی از شایع‌ترین دعاوی در محاکم قضایی است. این دعاوی شامل خلع ید، تخلیه، الزام به تنظیم سند و غیره می‌شود.', contentEn: 'Property disputes are among the most common litigation cases.', excerptFa: 'راهنمای جامع دعاوی ملکی', excerptEn: 'Guide to property disputes' },
  'online-legal-consultation': { titleFa: 'مشاوره حقوقی آنلاین', titleEn: 'Online Legal Consultation', category: 'مشاوره', publishedAt: '2025-10-15', contentFa: 'مشاوره حقوقی آنلاین امکان دریافت راهنمایی حقوقی از طریق اینترنت را فراهم می‌کند.', contentEn: 'Online legal consultation provides legal guidance through the internet.', excerptFa: 'مزایای مشاوره حقوقی آنلاین', excerptEn: 'Benefits of online legal consultation' },
  'labor-laws': { titleFa: 'قوانین کار و تأمین اجتماعی', titleEn: 'Labor Laws', category: 'کار', publishedAt: '2025-10-12', contentFa: 'قانون کار رابطه بین کارگر و کارفرما را تنظیم می‌کند و حقوق و تعهدات طرفین را مشخص می‌نماید.', contentEn: 'Labor law regulates the relationship between employers and employees.', excerptFa: 'بررسی مهم‌ترین قوانین کار', excerptEn: 'Review of important labor laws' },
  'commercial-contracts': { titleFa: 'قراردادهای تجاری', titleEn: 'Commercial Contracts', category: 'تجارت', publishedAt: '2025-10-10', contentFa: 'قراردادهای تجاری نقش مهمی در روابط اقتصادی دارند. تنظیم صحیح قرارداد می‌تواند از بسیاری اختلافات جلوگیری کند.', contentEn: 'Commercial contracts play an important role in economic relations.', excerptFa: 'نکات مهم در تنظیم قراردادهای تجاری', excerptEn: 'Important points in commercial contracts' },
  'new-mehrieh-law-1404': {
    titleFa: 'قانون جدید مهریه با ۱۴ سکه در سال ۱۴۰۴',
    titleEn: 'New Dowry Law: Maximum 14 Coins in 1404',
    category: 'خانواده',
    publishedAt: '2025-12-03',
    excerptFa: 'بررسی قانون جدید مهریه مصوب مجلس شورای اسلامی در سال ۱۴۰۴ که سقف حمایت قضایی از مهریه را به ۱۴ سکه کاهش داده است.',
    excerptEn: 'Analysis of the new dowry law passed by the Iranian Parliament in 1404, reducing judicial support ceiling to 14 coins.',
    contentFa: `مجلس شورای اسلامی در سال ۱۴۰۴ قانون جدیدی در خصوص مهریه تصویب کرد که تحولی بزرگ در نظام حقوقی خانواده ایجاد نموده است. بر اساس این مصوبه، سقف حمایت قضایی از مهریه از ۱۱۰ سکه تمام بهار آزادی به تنها ۱۴ سکه کاهش یافته است.

## مهم‌ترین تغییرات قانون جدید مهریه

### کاهش سقف حمایت کیفری
بر اساس قانون جدید، پرداخت مهریه تنها تا سقف ۱۴ سکه مجازات حبس خواهد داشت. برای مبالغ مهریه بالاتر از ۱۴ سکه، وصول مازاد تنها در صورت تمکن مالی و دارا بودن زوج امکان‌پذیر خواهد بود.

### تغییر پارادایم از مجازات به وصول
این مصوبه نشان‌دهنده یک تغییر اساسی در نگرش قانون‌گذار از "مجازات محوری" به "وصول محوری" است. برای دهه‌ها، حبس ابزار اصلی فشار برای وصول مهریه محسوب می‌شد. حالا قانون به صراحت می‌گوید که هدف، دریافت مهریه است، نه تنبیه زوج.

### تأثیر بر کاهش جمعیت کیفری
با وجود بیش از ۲۵ هزار زندانی مهریه در کشور، این مصوبه می‌تواند اثر فوری و کاهنده بر جمعیت زندان‌ها داشته باشد. بسیاری از این زندانیان با اجرای این قانون واجد شرایط آزادی خواهند شد.

## نکات مهم حقوقی برای زوجین

- توافق اولیه زوجین بر سر مهریه‌های بالا (حتی ۳۰۰ سکه) همچنان معتبر است
- اما ضمانت اجرای کیفری برای آن حذف شده است
- برای وصول مازاد بر ۱۴ سکه، باید تمکن مالی زوج احراز شود
- نقش اداره تصدیق اموال و دارایی‌ها در این فرآیند بسیار پررنگ شده است

## چالش‌های اجرایی

مهم‌ترین چالش اجرایی این قانون، "احراز تمکن مالی" زوج است. معیارهای سنجش دارایی و درآمد مرد در قانون جدید نیاز به شفافیت کامل دارد. نحوه رسیدگی به ادعای عدم تمکن و نیز امکان پنهان‌سازی اموال توسط زوج، از دیگر نقاط کانونی اختلاف و پیچیدگی‌های آینده خواهد بود.

## مشاوره حقوقی

برای اطلاع از جزئیات بیشتر قانون جدید مهریه و تأثیرات آن بر پرونده‌های خانواده، با دفتر وکالت احمدزاده تماس بگیرید. وکلای مجرب ما آماده ارائه مشاوره تخصصی در این خصوص هستند.`,
    contentEn: `The Iranian Parliament passed a new law on dowry (mehrieh) in 1404, creating a significant transformation in family law. According to this legislation, the judicial support ceiling for dowry has been reduced from 110 Bahar Azadi coins to only 14 coins.

## Key Changes in the New Dowry Law

### Reduction in Criminal Support Ceiling
Under the new law, imprisonment penalties for dowry payment will only apply up to a maximum of 14 coins. For dowry amounts exceeding 14 coins, collection of the excess is only possible if the husband has financial means.

### Shift from Punishment to Collection
This legislation represents a fundamental shift in legislative approach from "punishment-oriented" to "collection-oriented." For decades, imprisonment was the main pressure tool for dowry collection.

### Impact on Prison Population
With over 25,000 dowry prisoners in the country, this legislation could have an immediate reducing effect on the prison population.

## Important Legal Points for Couples

- Initial agreements on high dowry amounts (even 300 coins) remain valid
- But the criminal enforcement mechanism has been removed
- For collection exceeding 14 coins, the husband's financial capacity must be established
- The role of the Asset Verification Department has become prominent

## Legal Consultation

For more information about the new dowry law and its effects on family cases, contact Ahmadzadeh Law Office. Our experienced lawyers are ready to provide specialized consultation.`,
  },
  'new-tax-law-1404': {
    titleFa: 'قانون مالیات جدید در ایران ۱۴۰۴',
    titleEn: 'New Tax Law in Iran 1404',
    category: 'مالی',
    publishedAt: '2025-07-01',
    excerptFa: 'بررسی جامع تغییرات قانون مالیات جدید در سال ۱۴۰۴ شامل افزایش معافیت مالیاتی، نرخ پلکانی و تأثیر بر کسب‌وکارها.',
    excerptEn: 'Comprehensive analysis of the new tax law changes in 1404 including increased tax exemptions, progressive rates, and business impacts.',
    contentFa: `قانون مالیات جدید در سال ۱۴۰۴ با تغییرات گسترده‌ای همراه شده است که تأثیرات عمیقی بر اقتصاد، کسب‌وکارها و زندگی روزمره شهروندان خواهد گذاشت.

## مهم‌ترین تغییرات قانون مالیات جدید

### ۱. افزایش سقف معافیت مالیاتی حقوق
یکی از برجسته‌ترین تغییرات، افزایش ۱۰۰ درصدی سقف معافیت مالیاتی حقوق نسبت به سال ۱۴۰۳ است. بر اساس قانون بودجه ۱۴۰۴، درآمد سالانه تا سقف ۲,۸۸۰,۰۰۰,۰۰۰ ریال (معادل ۲۸۸ میلیون تومان) از پرداخت مالیات معاف است.

### جدول نرخ‌های پلکانی مالیات حقوق در سال ۱۴۰۴:

| سقف درآمد سالانه (ریال) | نرخ مالیات |
|-------------------------|------------|
| تا ۲,۸۸۰,۰۰۰,۰۰۰ | معاف |
| ۲,۸۸۰,۰۰۰,۰۰۱ تا ۴,۰۰۰,۰۰۰,۰۰۰ | ۱۰٪ |
| ۴,۰۰۰,۰۰۰,۰۰۱ تا ۶,۰۰۰,۰۰۰,۰۰۰ | ۱۵٪ |
| ۶,۰۰۰,۰۰۰,۰۰۱ تا ۸,۰۰۰,۰۰۰,۰۰۰ | ۲۰٪ |
| بیش از ۸,۰۰۰,۰۰۰,۰۰۰ | ۲۵٪ |

### ۲. افزایش نرخ مالیات بر ارزش افزوده
نرخ مالیات بر ارزش افزوده از ۹٪ به ۱۰٪ افزایش یافته است. این افزایش با هدف جبران کسری بودجه دولت اعمال شده است.

### ۳. مالیات بر دارایی‌های لوکس
قانون مالیات جدید، مالیات بر دارایی‌های لوکس مانند خودروهای با ارزش بیش از ۳ میلیارد تومان و املاک مسکونی گران‌قیمت را گسترش داده است.

## تأثیر قانون مالیات جدید بر کسب‌وکارها

### کارفرمایان و تکالیف جدید
کارفرمایان در سال ۱۴۰۴ موظف‌اند پیش از پرداخت حقوق، اطلاعات کارکنان و مبالغ پرداختی را در سامانه مودیان ثبت کنند.

### مشاغل کوچک و معافیت‌ها
برای حمایت از مشاغل کوچک، قانون مالیات جدید معافیت‌هایی برای درآمدهای سالانه تا سقف ۱۴۴ میلیون تومان در نظر گرفته است.

## نقش سامانه مودیان

از دی‌ماه ۱۴۰۴، تمامی صورت‌حساب‌های خارج از سامانه مودیان از نظر سازمان امور مالیاتی نامعتبر تلقی می‌شوند. این بدان معناست که کسب‌وکارها باید تمام تراکنش‌های خود را در این سامانه ثبت کنند.

## مشاوره مالیاتی

برای اطلاع از جزئیات بیشتر قانون مالیات جدید و نحوه رعایت تکالیف مالیاتی، با دفتر وکالت احمدزاده تماس بگیرید.`,
    contentEn: `The new tax law in Iran for 1404 has brought extensive changes that will deeply impact the economy, businesses, and citizens' daily lives.

## Key Changes in the New Tax Law

### 1. Increased Tax Exemption Ceiling
One of the most prominent changes is the 100% increase in the tax exemption ceiling for salaries compared to 1403. Annual income up to 2,880,000,000 Rials (288 million Tomans) is exempt from tax.

### 2. Increased Value Added Tax Rate
The VAT rate has increased from 9% to 10% to compensate for government budget deficits.

### 3. Luxury Asset Tax
The new tax law has expanded luxury asset taxes on vehicles worth over 3 billion Tomans and expensive residential properties.

## Impact on Businesses

### New Employer Obligations
Employers must register employee information and payment amounts in the tax system before salary payments.

### Small Business Exemptions
Exemptions are provided for annual incomes up to 144 million Tomans to support small businesses.

## Legal Consultation

For more information about the new tax law, contact Ahmadzadeh Law Office.`,
  },
  'commercial-law-reforms-1404': {
    titleFa: 'اصلاحات قانون تجارت در سال ۱۴۰۴',
    titleEn: 'Commercial Law Reforms in 1404',
    category: 'تجارت',
    publishedAt: '2025-04-23',
    excerptFa: 'بررسی مهم‌ترین اصلاحات قانون تجارت در سال ۱۴۰۴ و تأثیر آن بر شرکت‌ها و معاملات تجاری.',
    excerptEn: 'Analysis of the most important commercial law reforms in 1404 and their impact on companies and commercial transactions.',
    contentFa: `قانون تجارت ایران پس از گذشت نزدیک به ۹۰ سال از تصویب اولین نسخه آن، در سال ۱۴۰۴ اصلاحات مهمی را تجربه کرده است. این اصلاحات با هدف پاسخگویی به نیازهای روز اقتصاد و تجارت الکترونیک اعمال شده است.

## مهم‌ترین اصلاحات قانون تجارت

### ۱. تعریف تاجر و معاملات تجاری
ماده ۲ قانون تجارت انواع فعالیت‌های تجاری را تعریف می‌کند. هر کاری که شامل موارد زیر باشد جزو معاملات تجاری محسوب می‌شود:
- خرید یا گرفتن هر نوع مال به قصد فروش یا اجاره
- حمل و نقل از راه خشکی یا آب یا هوا
- هر نوع عملیات دلالی یا حق‌العمل‌کاری
- تأسیس و به کار انداختن کارخانه
- عملیات حراجی
- نمایشگاه‌های عمومی
- هر نوع عملیات صرافی و بانکی

### ۲. انواع شرکت‌های تجاری
ماده ۲۰ قانون تجارت ۷ نوع شرکت تجاری را تعریف می‌کند:
- شرکت سهامی (خاص و عام)
- شرکت با مسئولیت محدود
- شرکت تضامنی
- شرکت مختلط غیر سهامی
- شرکت مختلط سهامی
- شرکت نسبی
- شرکت تعاونی تولید و مصرف

### ۳. دفاتر تجارتی
قانون جدید تجارت چهار نوع دفتر تجارتی را الزامی می‌داند:
- دفتر روزنامه: ثبت مطالبات، دیون، داد و ستد تجارتی
- دفتر کل: خلاصه معاملات تجاری از دفتر روزنامه
- دفتر دارایی: ثبت کلیه دارایی‌های منقول و غیر منقول
- دفتر کپیه: ثبت مراسلات و مخابرات تاجر

## تأثیر اصلاحات بر کسب‌وکارها

### مزایای اصلاح قانون تجارت
- شفافیت بیشتر در روابط تجاری
- حمایت بهتر از حقوق تجار و بازرگانان
- سازگاری با تجارت الکترونیک
- کاهش اختلافات تجاری

### چالش‌های جدید
- نیاز به به‌روزرسانی قراردادهای تجاری
- آشنایی با تغییرات جدید قانونی
- رعایت الزامات جدید ثبتی

## مشاوره حقوقی تجاری

برای اطلاع از جزئیات بیشتر اصلاحات قانون تجارت و تأثیر آن بر کسب‌وکار خود، با دفتر وکالت احمدزاده تماس بگیرید. وکلای مجرب ما در زمینه حقوق تجاری آماده ارائه مشاوره تخصصی هستند.`,
    contentEn: `Iran's Commercial Law has undergone important reforms in 1404, nearly 90 years after the first version was enacted. These reforms aim to address the needs of the modern economy and electronic commerce.

## Key Commercial Law Reforms

### 1. Definition of Merchant and Commercial Transactions
Article 2 defines various commercial activities including buying/selling, transportation, brokerage, factory operations, auctions, and banking.

### 2. Types of Commercial Companies
Article 20 defines 7 types of commercial companies: joint-stock (private/public), limited liability, general partnership, limited partnership, joint-stock partnership, proportional partnership, and cooperative.

### 3. Commercial Books
The new law requires four types of commercial books: daily book, ledger, asset book, and copy book.

## Impact on Businesses

### Benefits
- Greater transparency in commercial relations
- Better protection of merchants' rights
- Compatibility with e-commerce
- Reduced commercial disputes

## Legal Consultation

For more information about commercial law reforms, contact Ahmadzadeh Law Office.`,
  },
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
      <JsonLd type="Article" data={{
        title,
        description: excerpt,
        url: `https://rohamahmadzadeh.ir/${params.locale}/articles/${params.slug}`,
        publishedAt: article.publishedAt,
        updatedAt: article.publishedAt,
      }} />
      <JsonLd type="BreadcrumbList" data={{ items: [
        { name: params.locale === 'fa' ? 'خانه' : 'Home', url: 'https://rohamahmadzadeh.ir' },
        { name: params.locale === 'fa' ? 'مقالات' : 'Articles', url: `https://rohamahmadzadeh.ir/${params.locale}/articles` },
        { name: title, url: `https://rohamahmadzadeh.ir/${params.locale}/articles/${params.slug}` },
      ]}} />
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
