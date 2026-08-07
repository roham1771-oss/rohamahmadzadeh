import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';

interface CTASectionProps {
  dict: any;
  locale: string;
}

export function CTASection({ dict, locale }: CTASectionProps) {
  const cta = dict?.home?.cta || {};

  return (
    <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent-600 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container-custom text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {cta.title || 'حفاظت از حقوق شما'}
        </h2>
        <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          {cta.subtitle || 'برای مشاوره و اطلاعات بیشتر، با ما تماس بگیرید و حقوق خود را تضمین کنید.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-primary-950 font-semibold rounded-xl transition-all duration-300 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/25 active:scale-95"
          >
            {cta.button || 'Request Free Consultation'}
            <svg className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href={`tel:${CONTACT_INFO.phoneEn}`}
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm active:scale-95"
            dir="ltr"
          >
            <svg className="w-5 h-5 mr-3 rtl:ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
