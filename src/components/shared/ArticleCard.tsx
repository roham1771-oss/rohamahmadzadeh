import Link from 'next/link';
import Image from 'next/image';
import { formatDate, readingTime, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: {
    id: string;
    titleFa: string;
    titleEn: string;
    slug: string;
    excerptFa: string;
    excerptEn: string;
    coverImage?: string | null;
    category: string;
    publishedAt?: string | null;
    contentFa: string;
    contentEn: string;
  };
  locale: string;
}

export function ArticleCard({ article, locale }: ArticleCardProps) {
  const title = locale === 'fa' ? article.titleFa : article.titleEn;
  const excerpt = locale === 'fa' ? article.excerptFa : article.excerptEn;
  const content = locale === 'fa' ? article.contentFa : article.contentEn;
  const href = locale === 'fa' ? `/articles/${article.slug}` : `/en/articles/${article.slug}`;

  return (
    <article className="card group hover-lift overflow-hidden">
      <Link href={href}>
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 flex items-center justify-center">
              <svg className="w-12 h-12 text-accent-300 dark:text-accent-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="px-3 py-1 bg-accent-500/10 rounded-full text-accent-600 dark:text-accent-400 font-medium">
              {article.category}
            </span>
            {article.publishedAt && (
              <span>{formatDate(article.publishedAt, locale)}</span>
            )}
            <span>{readingTime(content)} min read</span>
          </div>
          <h3 className="font-semibold text-lg group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {truncate(excerpt, 150)}
          </p>
        </div>
      </Link>
    </article>
  );
}
