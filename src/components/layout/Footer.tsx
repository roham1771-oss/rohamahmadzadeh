import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_INFO } from '@/lib/constants';

interface FooterProps {
  dict: any;
  locale: string;
}

export function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isRTL = locale === 'fa';
  const address = isRTL ? CONTACT_INFO.address : CONTACT_INFO.addressEn;
  const hours = isRTL ? CONTACT_INFO.workingHours : CONTACT_INFO.workingHoursEn;
  const phoneDisplay = isRTL ? CONTACT_INFO.phone : CONTACT_INFO.phoneEn;

  return (
    <footer className="relative bg-primary-900 dark:bg-primary-950 text-white no-print overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-600 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-accent-500/30">
                <Image
                  src="/images/attorney.jpg"
                  alt={dict?.common?.attorneyName || 'Roham Ahmadzadeh'}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold">{dict?.common?.attorneyName || 'Roham Ahmadzadeh'}</p>
                <p className="text-sm text-white/50">{dict?.common?.attorneyTitle || 'Attorney at Law'}</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {dict?.about?.biographyText?.slice(0, 150) || 'Professional legal services with over a decade of experience.'}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { href: CONTACT_INFO.whatsapp, label: 'واتساپ', color: 'hover:bg-[#25D366]/20 hover:text-[#25D366]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                { href: CONTACT_INFO.telegram, label: 'تلگرام', color: 'hover:bg-[#0088CC]/20 hover:text-[#0088CC]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
                { href: CONTACT_INFO.instagram, label: 'اینستاگرام', color: 'hover:bg-[#E4405F]/20 hover:text-[#E4405F]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                { href: CONTACT_INFO.eitaa, label: 'ایتا', color: 'hover:bg-[#000000]/20 hover:text-[#333]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-lg">{dict?.nav?.services || 'Services'}</h3>
            <ul className="space-y-3 text-sm text-white/50">
              {[
                dict?.services?.civil || 'Civil Law',
                dict?.services?.criminal || 'Criminal Law',
                dict?.services?.family || 'Family Law',
                dict?.services?.commercial || 'Commercial Law',
                dict?.services?.property || 'Property Law',
              ].map((service) => (
                <li key={service}>
                  <Link href={`/${locale}/services`} className="hover:text-accent-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-accent-500/50 rounded-full group-hover:bg-accent-400 transition-colors" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-lg">{dict?.common?.contact || 'Contact'}</h3>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {address}
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span dir="ltr">{phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {CONTACT_INFO.email}
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {hours}
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-lg">{dict?.common?.newsletter || 'Newsletter'}</h3>
            <p className="text-sm text-white/50">{dict?.common?.newsletterDesc || 'Stay updated'}</p>
            <form className="space-y-3" action="/api/newsletter" method="POST">
              <input
                type="email"
                placeholder={dict?.common?.emailPlaceholder || 'Email'}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 transition-all duration-300"
              />
              <button type="submit" className="w-full bg-accent-500 text-primary-950 font-semibold py-3 rounded-xl hover:bg-accent-400 transition-all duration-300 text-sm active:scale-95">
                {dict?.common?.subscribe || 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {currentYear} {dict?.common?.siteName || 'Ahmadzadeh Law Office'}. {dict?.common?.allRightsReserved || 'All rights reserved'}.</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{dict?.common?.privacyPolicy || 'Privacy Policy'}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{dict?.common?.terms || 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
