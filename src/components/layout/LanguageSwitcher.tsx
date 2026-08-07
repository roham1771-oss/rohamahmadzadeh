'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale, isRTL } from '@/i18n/config';

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const otherLocale: Locale = locale === 'fa' ? 'en' : 'fa';

  return (
    <button
      onClick={() => switchLocale(otherLocale)}
      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-muted/50 transition-all duration-300 active:scale-95"
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <span>{localeNames[otherLocale]}</span>
    </button>
  );
}
