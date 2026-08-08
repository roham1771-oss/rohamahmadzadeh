'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  dict: any;
  locale: string;
}

export function HeroSection({ dict, locale }: HeroSectionProps) {
  const hero = dict?.home?.hero || {};
  const tagline = dict?.home?.tagline || 'پاسداری از حق، دفاع بر پایه قانون';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container-custom py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 backdrop-blur-sm rounded-full text-accent-400 text-sm font-medium mb-4 border border-accent-500/20">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                {hero.subtitle || dict?.common?.attorneyTitle || 'Attorney at Law'}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-accent-400 text-lg md:text-xl font-medium mb-4"
            >
              «{tagline}»
            </motion.p>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {hero.title || dict?.common?.attorneyName || 'Roham Ahmadzadeh'}
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {hero.description || 'Professional legal services with over a decade of experience.'}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center"
            >
              <Link
                href={`/${locale}/contact`}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-primary-950 font-semibold rounded-xl transition-all duration-300 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/25 w-full sm:w-auto active:scale-95"
              >
                <span className="relative z-10">{hero.cta || 'Request Consultation'}</span>
                <svg className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30 w-full sm:w-auto backdrop-blur-sm"
              >
                {hero.ctaSecondary || 'View Services'}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 flex items-center gap-8 lg:justify-start justify-center text-white/40"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">مشاوره</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">پاسخگویی ۲۴ ساعته</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-3xl blur-2xl" />

              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/20">
                <Image
                  src="/images/attorney.jpg"
                  alt={dict?.common?.attorneyName || 'Roham Ahmadzadeh'}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
