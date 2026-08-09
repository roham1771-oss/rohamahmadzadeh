import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { generateSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ContactForm } from '@/components/shared/ContactForm';
import { CONTACT_INFO } from '@/lib/constants';

interface ContactPageProps { params: { locale: Locale }; }

export async function generateMetadata({ params }: ContactPageProps) {
  const dict = await getDictionary(params.locale);
  return generateSEO({ title: dict.seo?.contact?.title, description: dict.seo?.contact?.description, url: '/contact', locale: params.locale });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const dict = await getDictionary(params.locale);
  const contact = dict.contact || {};
  const isRTL = params.locale === 'fa';

  return (
    <div className="page-transition">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom">
          <Breadcrumbs items={[{ label: dict?.nav?.contact || 'Contact' }]} locale={params.locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">{contact.title || 'Contact Us'}</h1>
          <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">{contact.subtitle || ''}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">{contact.form?.submit || 'Send Message'}</h2>
              <ContactForm dict={dict} locale={params.locale} />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{contact.info?.address || 'Contact Info'}</h2>
              <div className="space-y-4">
                {[
                  { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: contact.info?.address || 'Address', value: isRTL ? CONTACT_INFO.address : CONTACT_INFO.addressEn },
                  { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: params.locale === 'fa' ? 'تلفن دفتر' : 'Office Phone', value: isRTL ? CONTACT_INFO.phone : CONTACT_INFO.phoneEn, dir: 'ltr' },
                  { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: contact.info?.email || 'Email', value: CONTACT_INFO.email },
                  { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: contact.info?.hours || 'Hours', value: isRTL ? CONTACT_INFO.workingHours : CONTACT_INFO.workingHoursEn },
                ].map((item, i) => (
                  <div key={i} className="card p-5 flex items-start gap-4 group hover:border-accent-500/30 transition-colors duration-300">
                    <div className="w-10 h-10 bg-accent-500/10 rounded-xl flex items-center justify-center shrink-0 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-sm text-muted-foreground" dir={item.dir as any}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-sm mb-3">{params.locale === 'fa' ? 'پیام‌رسان‌ها و شبکه‌های اجتماعی' : 'Social Media & Messengers'}</h3>
                <p className="text-xs text-muted-foreground mb-4">{params.locale === 'fa' ? 'شماره دفتر از طریق واتساپ، ایتا و بله قابل دسترسی است' : 'Office number is accessible via WhatsApp, Eitaa, and Baleh'}</p>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { href: CONTACT_INFO.whatsapp, label: params.locale === 'fa' ? 'واتساپ' : 'WhatsApp', color: 'hover:bg-[#25D366]/10 hover:text-[#25D366]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                    { href: CONTACT_INFO.telegram, label: params.locale === 'fa' ? 'تلگرام' : 'Telegram', color: 'hover:bg-[#0088CC]/10 hover:text-[#0088CC]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
                    { href: CONTACT_INFO.instagram, label: params.locale === 'fa' ? 'اینستاگرام' : 'Instagram', color: 'hover:bg-[#E4405F]/10 hover:text-[#E4405F]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                    { href: CONTACT_INFO.eitaa, label: params.locale === 'fa' ? 'ایتا' : 'Eitaa', color: 'hover:bg-[#000000]/10 hover:text-[#333]', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg> },
                  ].map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl hover:bg-accent-500/10 transition-all duration-300 hover:scale-105" aria-label={social.label}>
                      <div className="text-muted-foreground group-hover:text-accent-500 transition-colors">{social.icon}</div>
                      <span className="text-[10px] text-muted-foreground">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-sm mb-3">{params.locale === 'fa' ? 'موقعیت روی نقشه' : 'Map Location'}</h3>
                <div className="aspect-video bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground text-sm">
                  {params.locale === 'fa' ? 'نقشه به زودی اضافه خواهد شد' : 'Map coming soon'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
