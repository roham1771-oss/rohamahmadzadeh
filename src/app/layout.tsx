import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'دفتر وکالت احمدزاده | وکیل پایه یک دادگستری',
    template: '%s | دفتر وکالت احمدزاده',
  },
  description: 'دفتر وکالت احمدزاده - رهام احمدزاده وکیل پایه یک دادگستری. مشاوره تخصصی حقوقی.',
  keywords: ['وکیل', 'وکیل دادگستری', 'مشاوره حقوقی', 'رهام احمدزاده', 'دفتر وکالت'],
  authors: [{ name: 'Roham Ahmadzadeh' }],
  creator: 'Roham Ahmadzadeh',
  metadataBase: new URL(process.env.SITE_URL || 'https://vakilahmadzadeh.ir'),
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
