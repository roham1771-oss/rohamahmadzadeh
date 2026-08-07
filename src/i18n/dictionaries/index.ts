import type { Locale } from '../config';

const dictionaries = {
  fa: () => import('./fa.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
