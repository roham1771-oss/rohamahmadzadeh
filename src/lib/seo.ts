import { Metadata } from 'next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './constants';
import { Locale } from '@/i18n/config';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  locale?: Locale;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

export function generateSEO({
  title,
  description,
  image,
  url,
  locale = 'fa',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Roham Ahmadzadeh',
  noindex = false,
}: SEOProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageDescription = description || SITE_DESCRIPTION;
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const ogImage = image || `${SITE_URL}/api/og?title=${encodeURIComponent(pageTitle)}`;

  return {
    title: pageTitle,
    description: pageDescription,
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_NAME,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: pageUrl,
      languages: {
        'fa': pageUrl.replace('/en', ''),
        'en': pageUrl.replace(SITE_URL, `${SITE_URL}/en`),
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: pageTitle }],
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      type: type as any,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}

export function generateArticleSEO(article: {
  titleFa: string;
  titleEn: string;
  slug: string;
  excerptFa: string | null;
  excerptEn: string | null;
  coverImage?: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
  category: string | null;
}, locale: Locale): Metadata {
  const title = locale === 'fa' ? article.titleFa : article.titleEn;
  const excerpt = (locale === 'fa' ? article.excerptFa : article.excerptEn) ?? '';
  const url = locale === 'fa'
    ? `/articles/${article.slug}`
    : `/en/articles/${article.slug}`;

  return generateSEO({
    title,
    description: excerpt,
    image: article.coverImage || undefined,
    url,
    locale,
    type: 'article',
    publishedTime: article.publishedAt?.toISOString() ?? '',
    modifiedTime: article.updatedAt.toISOString(),
  });
}

export function generateServiceSEO(service: {
  titleFa: string;
  titleEn: string;
  slug: string;
  descriptionFa: string | null;
  descriptionEn: string | null;
}, locale: Locale): Metadata {
  const title = locale === 'fa' ? service.titleFa : service.titleEn;
  const desc = (locale === 'fa' ? service.descriptionFa : service.descriptionEn) ?? '';
  const url = locale === 'fa'
    ? `/services/${service.slug}`
    : `/en/services/${service.slug}`;

  return generateSEO({
    title,
    description: desc.slice(0, 160),
    url,
    locale,
  });
}
