import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { JsonLd } from '@/components/shared/JsonLd';
import { laws, getLawBySlug, getArticleByNumber, getRelatedArticles, formatArticleNumber } from '@/data/lawsData';
import Link from 'next/link';

interface ArticlePageProps { params: { locale: Locale; slug: string; articleNumber: string }; }

export async function generateMetadata({ params }: ArticlePageProps) {
  const law = getLawBySlug(params.slug);
  if (!law) return {};
  const articleNum = parseInt(params.articleNumber);
  const article = getArticleByNumber(law, articleNum);
  if (!article) return {};
  return generateSEO({
    title: `ماده ${formatArticleNumber(articleNum)} ${law.title} | قوانین حقوقی`,
    description: article.text.slice(0, 160),
    url: `/laws/${params.slug}/${params.articleNumber}`,
    locale: params.locale,
  });
}

export async function generateStaticParams() {
  const params: { slug: string; articleNumber: string }[] = [];
  for (const law of laws) {
    for (const article of law.articles) {
      params.push({ slug: law.slug, articleNumber: article.number.toString() });
    }
  }
  return params;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const dict = await getDictionary(params.locale);
  const law = getLawBySlug(params.slug);
  
  if (!law) {
    return (
      <div className="p-20 text-center text-muted-foreground">
        {params.locale === 'fa' ? 'قانون یافت نشد' : 'Law not found'}
      </div>
    );
  }

  const articleNum = parseInt(params.articleNumber);
  const article = getArticleByNumber(law, articleNum);

  if (!article) {
    return (
      <div className="p-20 text-center text-muted-foreground">
        {params.locale === 'fa' ? 'ماده یافت نشد' : 'Article not found'}
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(law, article);
  const prevArticle = getArticleByNumber(law, articleNum - 1);
  const nextArticle = getArticleByNumber(law, articleNum + 1);

  return (
    <div className="page-transition">
      <JsonLd type="BreadcrumbList" data={{ items: [
        { name: params.locale === 'fa' ? 'خانه' : 'Home', url: 'https://vakilahmadzadeh.ir' },
        { name: params.locale === 'fa' ? 'قوانین' : 'Laws', url: `https://vakilahmadzadeh.ir/${params.locale}/laws` },
        { name: law.title, url: `https://vakilahmadzadeh.ir/${params.locale}/laws/${params.slug}` },
        { name: `ماده ${formatArticleNumber(articleNum)}`, url: `https://vakilahmadzadeh.ir/${params.locale}/laws/${params.slug}/${params.articleNumber}` },
      ]}} />
      
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[
            { label: params.locale === 'fa' ? 'قوانین' : 'Laws', href: `/${params.locale}/laws` },
            { label: law.title, href: `/${params.locale}/laws/${params.slug}` },
            { label: `ماده ${formatArticleNumber(articleNum)}` },
          ]} locale={params.locale} />
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-500/10 rounded-full text-accent-400 text-sm">{law.category}</span>
              <span className="text-white/40 text-sm">{law.year}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {params.locale === 'fa' ? `ماده ${formatArticleNumber(articleNum)} ${law.title}` : `Article ${articleNum} - ${law.title}`}
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <article className="card p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent-500/10 flex items-center justify-center">
                  <span className="text-accent-600 dark:text-accent-400 font-bold text-xl">
                    {formatArticleNumber(articleNum)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {params.locale === 'fa' ? `ماده ${formatArticleNumber(articleNum)}` : `Article ${articleNum}`}
                  </h2>
                  <p className="text-sm text-muted-foreground">{law.title}</p>
                </div>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground">
                  {article.text}
                </p>
              </div>
            </div>

            <div className="border-t border-border/50 pt-6">
              <ShareButtons
                url={`/${params.locale}/laws/${params.slug}/${params.articleNumber}`}
                title={`${params.locale === 'fa' ? 'ماده' : 'Article'} ${formatArticleNumber(articleNum)} ${law.title}`}
                locale={params.locale}
              />
            </div>
          </article>

          {relatedArticles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">
                {params.locale === 'fa' ? 'مواد مرتبط' : 'Related Articles'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((relArticle) => (
                  <Link
                    key={relArticle.number}
                    href={`/${params.locale}/laws/${params.slug}/${relArticle.number}`}
                    className="card p-4 hover-lift group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent-600 dark:text-accent-400 font-bold text-sm">
                          {formatArticleNumber(relArticle.number)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                          {params.locale === 'fa' ? `ماده ${formatArticleNumber(relArticle.number)}` : `Article ${relArticle.number}`}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{relArticle.text}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            {prevArticle ? (
              <Link
                href={`/${params.locale}/laws/${params.slug}/${prevArticle.number}`}
                className="btn-secondary gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {params.locale === 'fa' ? `ماده ${formatArticleNumber(prevArticle.number)}` : `Article ${prevArticle.number}`}
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/${params.locale}/laws/${params.slug}/${nextArticle.number}`}
                className="btn-primary gap-2"
              >
                {params.locale === 'fa' ? `ماده ${formatArticleNumber(nextArticle.number)}` : `Article ${nextArticle.number}`}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href={`/${params.locale}/laws/${params.slug}`} className="btn-secondary">
              {params.locale === 'fa' ? '← بازگشت به لیست مواد' : '← Back to Articles'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
