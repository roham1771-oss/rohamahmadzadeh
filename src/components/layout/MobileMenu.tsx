'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  dict: any;
  locale: string;
  items: { href: string; label: string }[];
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, dict, locale, items, pathname }: MobileMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 lg:hidden transition-opacity duration-500',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div
        className={cn(
          'absolute top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-primary-950 shadow-2xl transition-transform duration-500 overflow-y-auto',
          locale === 'fa' ? 'right-0' : 'left-0',
          isOpen ? 'translate-x-0' : locale === 'fa' ? 'translate-x-full' : '-translate-x-full'
        )}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} onClick={onClose} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-accent-500/30">
                <Image
                  src="/images/attorney.jpg"
                  alt={dict?.common?.attorneyName || 'Roham Ahmadzadeh'}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">{dict?.common?.attorneyName || 'Roham Ahmadzadeh'}</p>
                <p className="text-xs text-muted-foreground">{dict?.common?.attorneyTitle || 'Attorney at Law'}</p>
              </div>
            </Link>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === `/${locale}${item.href}` ||
                (item.href !== '/' && pathname.includes(item.href));
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'text-accent-600 dark:text-accent-400 bg-accent-500/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-border/50 space-y-3">
            <Link
              href={`/${locale}/auth/login`}
              onClick={onClose}
              className="block w-full btn-primary text-center"
            >
              {dict?.common?.login || 'Login'}
            </Link>
            <Link
              href={`/${locale}/auth/register`}
              onClick={onClose}
              className="block w-full btn-secondary text-center"
            >
              {dict?.common?.register || 'Register'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
