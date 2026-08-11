import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { JsonLd } from '@/components/shared/JsonLd';
import { laws, lawCategories } from '@/data/lawsData';
import Link from 'next/link';

interface LawsPageProps { params: { locale: Locale }; }

export async function generateMetadata({ params }: LawsPageProps) {
  return generateSEO({
    title: 'قوانین حقوقی ایران | وکیل کرج | رهام احمدزاده',
    description: 'فهرست کامل قوانین حقوقی ایران شامل قانون مدنی، آیین دادرسی مدنی و کیفری، قانون مجازات اسلامی و سایر قوانین مهم با تمامی مواد.',
    url: '/laws',
    locale: params.locale,
  });
}

export default async function LawsPage({ params }: LawsPageProps) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="page-transition">
      <JsonLd type="BreadcrumbList" data={{ items: [
        { name: params.locale === 'fa' ? 'خانه' : 'Home', url: 'https://vakilahmadzadeh.ir' },
        { name: params.locale === 'fa' ? 'قوانین' : 'Laws', url: `https://vakilahmadzadeh.ir/${params.locale}/laws` },
      ]}} />
      
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: params.locale === 'fa' ? 'قوانین' : 'Laws' }]} locale={params.locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">
            {params.locale === 'fa' ? 'قوانین حقوقی ایران' : 'Iranian Laws'}
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">
            {params.locale === 'fa'
              ? 'فهرست کامل قوانین حقوقی ایران با تمامی مواد و جزئیات'
              : 'Complete list of Iranian laws with all articles and details'}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laws.map((law) => (
              <Link key={law.slug} href={`/${params.locale}/laws/${law.slug}`} className="group">
                <div className="card p-6 h-full hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-accent-500/10 rounded-full text-accent-600 dark:text-accent-400 text-sm font-medium">
                      {law.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{law.year}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {law.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {law.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      {params.locale === 'fa' ? `${law.articleCount.toLocaleString('fa-IR')} ماده` : `${law.articleCount} articles`}
                    </span>
                    <span className="text-accent-600 dark:text-accent-400 text-sm font-medium group-hover:translate-x-[-4px] rtl:group-hover:translate-x-[4px] transition-transform">
                      {params.locale === 'fa' ? 'مشاهده مواد ←' : 'View Articles →'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
