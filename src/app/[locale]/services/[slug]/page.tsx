import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { JsonLd } from '@/components/shared/JsonLd';
import { generateSEO } from '@/lib/seo';
import Link from 'next/link';

interface ServiceDetailPageProps { params: { locale: Locale; slug: string }; }

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const service = services[params.slug];
  if (!service) return {};
  const title = params.locale === 'fa' ? service.titleFa : service.titleEn;
  const desc = params.locale === 'fa' ? service.descriptionFa : service.descriptionEn;
  return generateSEO({
    title,
    description: desc.slice(0, 160),
    url: `/services/${params.slug}`,
    locale: params.locale,
  });
}

export async function generateStaticParams() {
  return [
    { slug: 'criminal' },
    { slug: 'family' },
    { slug: 'civil' },
    { slug: 'commercial' },
    { slug: 'property' },
    { slug: 'consultation' },
  ];
}

const services: Record<string, any> = {
  'criminal': { titleFa: 'دعاوی کیفری', titleEn: 'Criminal Law', descriptionFa: 'مشاوره و خدمات حقوقی در دعاوی کیفری ارائه می‌شود. این خدمات شامل شکایت کیفری، دفاع در پرونده‌های کیفری، و پیگیری مراحل دادرسی کیفری است.', descriptionEn: 'Legal consultation and services in criminal cases.' },
  'family': { titleFa: 'دعاوی خانواده', titleEn: 'Family Law', descriptionFa: 'حمایت حقوقی در زمینه دعاوی خانوادگی و مسائل مربوط آن شامل طلاق، نفقه، حضانت فرزندان، مهریه و جهیزیه.', descriptionEn: 'Legal support in family disputes and related issues.' },
  'civil': { titleFa: 'دعاوی حقوقی و مدنی', titleEn: 'Civil Law', descriptionFa: 'خدمات حقوقی در دعاوی مالی و ملکی به‌طور کامل شامل دعاوی مطالبات، الزام به انجام تعهد، و خسارات.', descriptionEn: 'Complete legal services in financial and property disputes.' },
  'commercial': { titleFa: 'حقوق تجارت', titleEn: 'Commercial Law', descriptionFa: 'مشاوره در زمینه قراردادهای تجاری و شرکت‌ها، ثبت شرکت، تغییرات شرکتی و دعاوی تجاری.', descriptionEn: 'Consultation on commercial contracts and companies.' },
  'property': { titleFa: 'دعاوی ملکی', titleEn: 'Property Law', descriptionFa: 'خدمات حقوقی در دعاوی ملکی شامل خلع ید، تخلیه، الزام به تنظیم سند، و اختلافات ملکی.', descriptionEn: 'Services in property disputes and real estate.' },
  'consultation': { titleFa: 'مشاوره حقوقی', titleEn: 'Legal Consultation', descriptionFa: 'ارائه مشاوره حقوقی تخصصی در تمامی زمینه‌های حقوقی به صورت حضوری و آنلاین.', descriptionEn: 'Providing specialized legal consultation in all areas.' },
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const dict = await getDictionary(params.locale);
  const service = services[params.slug];
  if (!service) return <div className="p-20 text-center text-muted-foreground">خدمت یافت نشد</div>;

  const title = params.locale === 'fa' ? service.titleFa : service.titleEn;
  const description = params.locale === 'fa' ? service.descriptionFa : service.descriptionEn;

  return (
    <div className="page-transition">
      <JsonLd type="LegalService" />
      <JsonLd type="BreadcrumbList" data={{ items: [
        { name: params.locale === 'fa' ? 'خانه' : 'Home', url: 'https://rohamahmadzadeh.ir' },
        { name: params.locale === 'fa' ? 'خدمات' : 'Services', url: `https://rohamahmadzadeh.ir/${params.locale}/services` },
        { name: title, url: `https://rohamahmadzadeh.ir/${params.locale}/services/${params.slug}` },
      ]}} />
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: dict?.nav?.services || 'Services', href: `/${params.locale}/services` }, { label: title }]} locale={params.locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">{title}</h1>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-12 p-8 bg-accent-500/10 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-4">{params.locale === 'fa' ? 'نیاز به مشاوره دارید؟' : 'Need Consultation?'}</h3>
            <Link href={`/${params.locale}/contact`} className="btn-primary">{dict?.services?.consultNow || 'Consult Now'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
