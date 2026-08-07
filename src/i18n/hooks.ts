'use client';

import { useParams } from 'next/navigation';
import { getDictionary } from './dictionaries';
import { Locale } from './config';
import { useEffect, useState } from 'react';

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'fa';
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(locale).then(setDict);
  }, [locale]);

  const t = (key: string): string => {
    if (!dict) return '';
    const keys = key.split('.');
    let value: any = dict;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };

  return { t, locale, dict };
}
