import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'رهام احمدزاده | وکیل در کرج | وکیل پایه یک دادگستری',
    template: '%s | رهام احمدزاده وکیل کرج',
  },
  description: 'رهام احمدزاده، وکیل پایه یک دادگستری در کرج و تهران. مشاوره و وکالت تخصصی در دعاوی کیفری، خانواده، ملکی و حقوقی. بهترین وکیل کرج.',
  keywords: ['وکیل در کرج', 'وکیل کرج', 'وکیل تهران', 'بهترین وکیل کرج', 'وکیل خوب کرج', 'رهام احمدزاده', 'وکیل پایه یک دادگستری', 'وکیل دادگستری کرج', 'مشاوره حقوقی کرج', 'دفتر وکالت کرج', 'وکیل خانواده کرج', 'وکیل کیفری کرج', 'وکیل ملکی کرج', 'وکیل خوب', 'بهترین وکیل'],
  authors: [{ name: 'Roham Ahmadzadeh' }],
  creator: 'Roham Ahmadzadeh',
  metadataBase: new URL(process.env.SITE_URL || 'https://rohamahmadzadeh.ir'),
  other: {
    'google-site-verification': 'THFEOoY2uCvDN2pgnrDWkbeiimP-2GIsugSl9WDRYoA',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: 'دفتر وکالت احمدزاده',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1929' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
