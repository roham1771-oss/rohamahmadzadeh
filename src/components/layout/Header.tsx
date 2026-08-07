'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { type Locale } from '@/i18n/config';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  dict: any;
  locale: Locale;
}

const navItems = (dict: any) => [
  { href: '/', label: dict?.nav?.home || 'Home' },
  { href: '/about', label: dict?.nav?.about || 'About' },
  { href: '/services', label: dict?.nav?.services || 'Services' },
  { href: '/articles', label: dict?.nav?.articles || 'Articles' },
  { href: '/faq', label: dict?.nav?.faq || 'FAQ' },
  { href: '/contact', label: dict?.nav?.contact || 'Contact' },
];

export function Header({ dict, locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const items = navItems(dict);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 no-print',
          isScrolled
            ? 'bg-white/80 dark:bg-primary-950/80 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-border/50'
            : 'bg-transparent'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl overflow-hidden border-2 border-accent-500/30 transition-all duration-300 group-hover:border-accent-500/60 group-hover:shadow-lg group-hover:shadow-accent-500/10">
                <Image
                  src="/images/attorney.jpg"
                  alt={dict?.common?.attorneyName || 'Roham Ahmadzadeh'}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-sm md:text-base leading-tight tracking-tight">{dict?.common?.attorneyName || 'Roham Ahmadzadeh'}</p>
                <p className="text-xs text-muted-foreground">{dict?.common?.attorneyTitle || 'Attorney at Law'}</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {items.map((item) => {
                const isActive = pathname === `/${locale}${item.href}` ||
                  (item.href !== '/' && pathname.includes(item.href));
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                      isActive
                        ? 'text-accent-600 dark:text-accent-400 bg-accent-500/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher locale={locale} />
              <ThemeToggle />
              <Link
                href={`/${locale}/auth/login`}
                className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5"
              >
                {dict?.common?.login || 'Login'}
              </Link>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        dict={dict}
        locale={locale}
        items={items}
        pathname={pathname}
      />
    </>
  );
}
