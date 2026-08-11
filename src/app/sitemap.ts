import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { laws } from '@/data/lawsData';

const services = [
  'civil', 'criminal', 'family', 'commercial', 'property',
  'labor', 'administrative', 'international',
];

const articles = [
  'criminal-law-intro', 'family-law-iran', 'property-disputes',
  'online-legal-consultation', 'labor-laws', 'commercial-contracts',
  'new-mehrieh-law-1404', 'new-tax-law-1404', 'commercial-law-reforms-1404',
  'check-dishonor-law', 'identity-fraud-warning', 'rental-contract-1405',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticPages = ['', '/about', '/services', '/articles', '/faq', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}/fa${page}`,
      lastModified,
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa${page}`,
          'en': `${baseUrl}/en${page}`,
        },
      },
    });
    entries.push({
      url: `${baseUrl}/en${page}`,
      lastModified,
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa${page}`,
          'en': `${baseUrl}/en${page}`,
        },
      },
    });
  }

  for (const slug of services) {
    entries.push({
      url: `${baseUrl}/fa/services/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa/services/${slug}`,
          'en': `${baseUrl}/en/services/${slug}`,
        },
      },
    });
    entries.push({
      url: `${baseUrl}/en/services/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa/services/${slug}`,
          'en': `${baseUrl}/en/services/${slug}`,
        },
      },
    });
  }

  for (const slug of articles) {
    entries.push({
      url: `${baseUrl}/fa/articles/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa/articles/${slug}`,
          'en': `${baseUrl}/en/articles/${slug}`,
        },
      },
    });
    entries.push({
      url: `${baseUrl}/en/articles/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa/articles/${slug}`,
          'en': `${baseUrl}/en/articles/${slug}`,
        },
      },
    });
  }

  for (const law of laws) {
    entries.push({
      url: `${baseUrl}/fa/laws/${law.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa/laws/${law.slug}`,
          'en': `${baseUrl}/en/laws/${law.slug}`,
        },
      },
    });
    entries.push({
      url: `${baseUrl}/en/laws/${law.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'fa': `${baseUrl}/fa/laws/${law.slug}`,
          'en': `${baseUrl}/en/laws/${law.slug}`,
        },
      },
    });
    for (const article of law.articles) {
      entries.push({
        url: `${baseUrl}/fa/laws/${law.slug}/${article.number}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            'fa': `${baseUrl}/fa/laws/${law.slug}/${article.number}`,
            'en': `${baseUrl}/en/laws/${law.slug}/${article.number}`,
          },
        },
      });
      entries.push({
        url: `${baseUrl}/en/laws/${law.slug}/${article.number}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            'fa': `${baseUrl}/fa/laws/${law.slug}/${article.number}`,
            'en': `${baseUrl}/en/laws/${law.slug}/${article.number}`,
          },
        },
      });
    }
  }

  return entries;
}
