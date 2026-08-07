export const locales = ['fa', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fa';
export const localeNames: Record<Locale, string> = {
  fa: 'فارسی',
  en: 'English',
};
export const RTL_LOCALES: Locale[] = ['fa'];
export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}
