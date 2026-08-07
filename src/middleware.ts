import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.trim();
  if (preferred && locales.includes(preferred as any)) {
    return preferred;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/manifest.json'
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!_next|api|favicon|.*\\.).*)'],
};
