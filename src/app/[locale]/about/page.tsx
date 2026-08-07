import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { SectionHeader } from '@/components/shared/SectionHeader';
import Image from 'next/image';

interface AboutPageProps { params: { locale: Locale }; }

export async function generateMetadata({ params }: AboutPageProps) {
  const dict = await getDictionary(params.locale);
  return generateSEO({ title: dict.seo?.about?.title, description: dict.seo?.about?.description, url: '/about', locale: params.locale });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const dict = await getDictionary(params.locale);
  const about = dict.about || {};
  const isRTL = params.locale === 'fa';

  const values = [
    { key: 'integrity', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-accent-500 to-accent-600' },
    { key: 'excellence', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'from-emerald-500 to-emerald-600' },
    { key: 'respect', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'from-blue-500 to-blue-600' },
    { key: 'transparency', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'from-purple-500 to-purple-600' },
  ];

  const timeline = [
    { year: '2014', titleEn: 'Started Legal Practice', titleFa: 'شروع فعالیت حقوقی' },
    { year: '2016', titleEn: 'Established Law Office', titleFa: 'تأسیس دفتر وکالت' },
    { year: '2018', titleEn: 'Expanded Practice Areas', titleFa: 'گسترش حوزه‌های تخصصی' },
    { year: '2020', titleEn: 'Digital Transformation', titleFa: 'تحول دیجیتال' },
    { year: '2022', titleEn: 'International Legal Services', titleFa: 'خدمات حقوقی بین‌المللی' },
  ];

  return (
    <div className="page-transition">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: dict?.nav?.about || 'About' }]} locale={params.locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">{about.title || 'About Us'}</h1>
          <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">{about.subtitle || ''}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">{about.biography || 'Biography'}</h2>
              <p className="text-muted-foreground leading-relaxed">{about.biographyText || ''}</p>
              <h3 className="text-2xl font-bold text-foreground">{about.approach || 'Our Approach'}</h3>
              <p className="text-muted-foreground leading-relaxed">{about.approachText || ''}</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-border/50">
                <Image
                  src="/images/attorney-about.jpg"
                  alt={dict?.common?.attorneyName || 'Roham Ahmadzadeh'}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <SectionHeader title={about.values || 'Our Values'} />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.key} className="card p-8 text-center hover-lift group">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">{(about as Record<string, string>)[value.key] || value.key}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title={about.experience || 'Professional Experience'} />
          <div className="mt-12 max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-accent-500/25">{item.year}</div>
                  {index < timeline.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-accent-500/50 to-border mt-2" />}
                </div>
                <div className="pt-3">
                  <h3 className="font-semibold text-lg">{isRTL ? item.titleFa : item.titleEn}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
