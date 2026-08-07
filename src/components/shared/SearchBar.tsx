'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  locale: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = 'Search...', locale, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (onSearch) {
        onSearch(value);
      }
    }, 300),
    [onSearch]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-primary-950 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>
    </form>
  );
}
