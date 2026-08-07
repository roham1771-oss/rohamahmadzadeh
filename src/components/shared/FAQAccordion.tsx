'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  questionFa: string;
  questionEn: string;
  answerFa: string;
  answerEn: string;
  category: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  locale: string;
}

export function FAQAccordion({ items, locale }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const question = locale === 'fa' ? item.questionFa : item.questionEn;
        const answer = locale === 'fa' ? item.answerFa : item.answerEn;
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="card overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between p-5 text-left rtl:text-right hover:bg-muted/50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-medium pr-4">{question}</span>
              <svg
                className={cn(
                  'w-5 h-5 shrink-0 transition-transform duration-200 text-muted-foreground',
                  isOpen && 'rotate-180'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96' : 'max-h-0'
              )}
            >
              <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                {answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
