import { CONTACT_INFO, SITE_URL, SITE_NAME } from '@/lib/constants';

interface JsonLdProps {
  type: 'LegalService' | 'Person' | 'FAQPage' | 'Article' | 'BreadcrumbList' | 'WebPage';
  data?: Record<string, any>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let jsonLd: Record<string, any> = {};

  switch (type) {
    case 'LegalService':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: SITE_NAME,
        alternateName: 'Ahmadzadeh Law Office',
        url: SITE_URL,
        logo: `${SITE_URL}/images/attorney.jpg`,
        image: `${SITE_URL}/images/attorney.jpg`,
        description: 'دفتر وکالت احمدزاده - رهام احمدزاده وکیل پایه یک دادگستری در کرج',
        telephone: CONTACT_INFO.phoneEn,
        email: CONTACT_INFO.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'کرج، میدان معلم، ابتدای خیابان درختی، پلاک ۳۶۵، ساختمان ۱۱۷، واحد ۴',
          addressLocality: 'کرج',
          addressRegion: 'البرز',
          addressCountry: 'IR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.8400,
          longitude: 50.9391,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
            opens: '09:00',
            closes: '17:00',
          },
        ],
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'کرج' },
          { '@type': 'City', name: 'تهران' },
          { '@type': 'State', name: 'البرز' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'خدمات حقوقی',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'وکالت حقوق مدنی' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'وکالت حقوق کیفری' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'وکالت حقوق خانواده' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'وکالت حقوق ملکی' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'مشاوره حقوقی' } },
          ],
        },
        sameAs: [
          CONTACT_INFO.instagram,
          CONTACT_INFO.telegram,
          CONTACT_INFO.whatsapp,
        ],
        ...data,
      };
      break;

    case 'Person':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'رهام احمدزاده',
        alternateName: 'Roham Ahmadzadeh',
        jobTitle: 'وکیل پایه یک دادگستری',
        worksFor: {
          '@type': 'LegalService',
          name: SITE_NAME,
          url: SITE_URL,
        },
        url: SITE_URL,
        image: `${SITE_URL}/images/attorney.jpg`,
        telephone: CONTACT_INFO.phoneEn,
        email: CONTACT_INFO.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'کرج',
          addressRegion: 'البرز',
          addressCountry: 'IR',
        },
        sameAs: [
          CONTACT_INFO.instagram,
          CONTACT_INFO.telegram,
          CONTACT_INFO.whatsapp,
        ],
        ...data,
      };
      break;

    case 'FAQPage':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data?.questions?.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })) || [],
      };
      break;

    case 'Article':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data?.title,
        description: data?.description,
        image: data?.image,
        url: data?.url,
        datePublished: data?.publishedAt,
        dateModified: data?.updatedAt,
        author: {
          '@type': 'Person',
          name: 'رهام احمدزاده',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/attorney.jpg`,
          },
        },
        ...data,
      };
      break;

    case 'BreadcrumbList':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data?.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })) || [],
      };
      break;

    case 'WebPage':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data?.title,
        description: data?.description,
        url: data?.url,
        inLanguage: data?.locale === 'fa' ? 'fa-IR' : 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
        ...data,
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
