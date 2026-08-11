import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { JsonLd } from '@/components/shared/JsonLd';
import { laws, getLawBySlug, formatArticleNumber } from '@/data/lawsData';
import Link from 'next/link';

interface LawDetailPageProps { params: { locale: Locale; slug: string }; }

export async function generateMetadata({ params }: LawDetailPageProps) {
  const law = getLawBySlug(params.slug);
  if (!law) return {};
  return generateSEO({
    title: `${law.title} | قوانین حقوقی`,
    description: law.description.slice(0, 160),
    url: `/laws/${params.slug}`,
    locale: params.locale,
  });
}

export async function generateStaticParams() {
  return laws.map(law => ({ slug: law.slug }));
}

export default async function LawDetailPage({ params }: LawDetailPageProps) {
  const dict = await getDictionary(params.locale);
  const law = getLawBySlug(params.slug);
  
  if (!law) {
    return (
      <div className="p-20 text-center text-muted-foreground">
        {params.locale === 'fa' ? 'قانون یافت نشد' : 'Law not found'}
      </div>
    );
  }

  return (
    <div className="page-transition">
      <JsonLd type="BreadcrumbList" data={{ items: [
        { name: params.locale === 'fa' ? 'خانه' : 'Home', url: 'https://vakilahmadzadeh.ir' },
        { name: params.locale === 'fa' ? 'قوانین' : 'Laws', url: `https://vakilahmadzadeh.ir/${params.locale}/laws` },
        { name: law.title, url: `https://vakilahmadzadeh.ir/${params.locale}/laws/${params.slug}` },
      ]}} />
      
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[
            { label: params.locale === 'fa' ? 'قوانین' : 'Laws', href: `/${params.locale}/laws` },
            { label: law.title },
          ]} locale={params.locale} />
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-500/10 rounded-full text-accent-400 text-sm">{law.category}</span>
              <span className="text-white/40 text-sm">{law.year}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{law.title}</h1>
            <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">{law.description}</p>
            <div className="mt-4 text-white/40 text-sm">
              {params.locale === 'fa'
                ? `${law.articleCount.toLocaleString('fa-IR')} ماده`
                : `${law.articleCount} articles`}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {law.articles.length > 0 ? (
            <div className="space-y-4">
              {law.articles.map((article) => (
                <Link
                  key={article.number}
                  href={`/${params.locale}/laws/${params.slug}/${article.number}`}
                  className="block card p-6 hover-lift group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                      <span className="text-accent-600 dark:text-accent-400 font-bold text-lg">
                        {formatArticleNumber(article.number)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {params.locale === 'fa' ? `ماده ${formatArticleNumber(article.number)}` : `Article ${article.number}`}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {article.text}
                      </p>
                      {article.relatedArticleNumbers && article.relatedArticleNumbers.length > 0 && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-accent-600 dark:text-accent-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <span>
                            {params.locale === 'fa'
                              ? `${article.relatedArticleNumbers.length} ماده مرتبط`
                              : `${article.relatedArticleNumbers.length} related articles`}
                          </span>
                        </div>
                      )}
                    </div>
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent-500/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {params.locale === 'fa' ? 'مواد این قانون به زودی اضافه می‌شود' : 'Articles for this law coming soon'}
              </h3>
              <p className="text-muted-foreground">
                {params.locale === 'fa' ? 'در حال جمع‌آوری و بارگذاری مواد قانونی هستیم.' : 'We are collecting and loading law articles.'}
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href={`/${params.locale}/laws`} className="btn-secondary">
              {params.locale === 'fa' ? '← بازگشت به لیست قوانین' : '← Back to Laws'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
