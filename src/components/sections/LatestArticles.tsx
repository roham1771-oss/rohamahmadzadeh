import Link from 'next/link';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ArticleCard } from '@/components/shared/ArticleCard';

interface LatestArticlesProps {
  dict: any;
  locale: string;
  articles: any[];
}

export function LatestArticles({ dict, locale, articles }: LatestArticlesProps) {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <SectionHeader
          title={dict?.articles?.latestArticles || 'Latest Articles'}
          subtitle={dict?.articles?.subtitle || 'Latest legal articles and analysis'}
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} locale={locale} />
          ))}
        </div>
        {articles.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/articles`}
              className="group inline-flex items-center justify-center px-6 py-3 border border-accent-500/30 text-accent-600 dark:text-accent-400 font-medium rounded-xl transition-all duration-300 hover:bg-accent-500/10 hover:border-accent-500/50 active:scale-95"
            >
              {dict?.common?.viewAll || 'View All'} {dict?.nav?.articles || 'Articles'}
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
