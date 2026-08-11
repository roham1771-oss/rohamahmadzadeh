import type { Metadata } from 'next';
import { locales, isRTL, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { Providers } from '@/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/shared/CookieConsent';
import { LawyerContactPopup } from '@/components/shared/LawyerContactPopup';
import { FloatingContact } from '@/components/shared/FloatingContact';
import { Toaster } from 'react-hot-toast';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  const seo = dict.seo?.home || {};
  return {
    title: { default: seo.title || dict.common?.siteName || '', template: `%s | ${dict.common?.siteName || ''}` },
    description: seo.description || '',
    keywords: seo.keywords || '',
    openGraph: {
      locale: params.locale === 'fa' ? 'fa_IR' : 'en_US',
      title: seo.title || '',
      description: seo.description || '',
      siteName: dict.common?.siteName || '',
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const dict = await getDictionary(params.locale);
  const rtl = isRTL(params.locale);

  return (
    <html lang={params.locale} dir={rtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="THFEOoY2uCvDN2pgnrDWkbeiimP-2GIsugSl9WDRYoA" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {params.locale === 'fa' && (
          <link
            href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers dict={dict} locale={params.locale}>
          <Header dict={dict} locale={params.locale} />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} locale={params.locale} />
          <CookieConsent dict={dict} />
          <LawyerContactPopup dict={dict} />
          <FloatingContact />
          <Toaster
            position={rtl ? 'top-left' : 'top-right'}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
