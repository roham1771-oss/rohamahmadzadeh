import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const services = [
  'civil', 'criminal', 'family', 'commercial', 'property',
  'labor', 'administrative', 'international',
];

const articles = [
  'criminal-law-intro', 'family-law-iran', 'property-disputes',
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

  return entries;
}
