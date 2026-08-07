import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ServiceCard } from '@/components/shared/ServiceCard';

interface ServicesPageProps { params: { locale: Locale }; }

export async function generateMetadata({ params }: ServicesPageProps) {
  const dict = await getDictionary(params.locale);
  return generateSEO({ title: dict.seo?.services?.title, description: dict.seo?.services?.description, url: '/services', locale: params.locale });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const dict = await getDictionary(params.locale);

  const services = [
    { id: '1', titleFa: 'دعاوی کیفری', titleEn: 'Criminal Law', slug: 'criminal', descriptionFa: 'مشاوره و خدمات حقوقی در دعاوی کیفری ارائه می‌شود.', descriptionEn: 'Legal consultation and services in criminal cases.', icon: 'Shield', category: 'کیفری' },
    { id: '2', titleFa: 'دعاوی خانواده', titleEn: 'Family Law', slug: 'family', descriptionFa: 'حمایت حقوقی در زمینه دعاوی خانوادگی و مسائل مربوط آن.', descriptionEn: 'Legal support in family disputes and related issues.', icon: 'Users', category: 'خانواده' },
    { id: '3', titleFa: 'دعاوی حقوقی و مدنی', titleEn: 'Civil Law', slug: 'civil', descriptionFa: 'خدمات حقوقی در دعاوی مالی و ملکی به‌طور کامل.', descriptionEn: 'Complete legal services in financial and property disputes.', icon: 'Scale', category: 'حقوقی' },
    { id: '4', titleFa: 'حقوق تجارت', titleEn: 'Commercial Law', slug: 'commercial', descriptionFa: 'مشاوره در زمینه قراردادهای تجاری و شرکت‌ها.', descriptionEn: 'Consultation on commercial contracts and companies.', icon: 'Briefcase', category: 'تجارت' },
    { id: '5', titleFa: 'دعاوی ملکی', titleEn: 'Property Law', slug: 'property', descriptionFa: ' servicios in property disputes and real estate.', descriptionEn: 'Services in property disputes and real estate.', icon: 'Home', category: 'ملکی' },
    { id: '6', titleFa: 'مشاوره حقوقی', titleEn: 'Legal Consultation', slug: 'consultation', descriptionFa: 'ارائه مشاوره حقوقی تخصصی در تمامی زمینه‌ها.', descriptionEn: 'Providing specialized legal consultation in all areas.', icon: 'Landmark', category: 'مشاوره' },
  ];

  return (
    <div className="page-transition">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: dict?.nav?.services || 'Services' }]} locale={params.locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">{dict?.services?.title || 'Legal Services'}</h1>
          <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">{dict?.services?.subtitle || ''}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} locale={params.locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
