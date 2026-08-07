'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  locale: string;
}

export function Pagination({ currentPage, totalPages, basePath, locale }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${basePath}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + i;
  }).filter((p) => p <= totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={cn(
            'w-10 h-10 rounded-lg text-sm font-medium transition-colors',
            page === currentPage
              ? 'bg-primary-900 dark:bg-gold-500 text-white dark:text-primary-950'
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
          )}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
