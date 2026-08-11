'use client';

import { useState, useEffect, useCallback } from 'react';

interface LawyerContactPopupProps {
  dict: any;
}

export function LawyerContactPopup({ dict }: LawyerContactPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem('lawyerContactPopupSeen', 'true');
  }, []);

  useEffect(() => {
    const seen = localStorage.getItem('lawyerContactPopupSeen');
    if (seen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePopup]);

  if (!isOpen) return null;

  const t = dict?.popup || {};

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-5 transition-all duration-300"
      style={{
        background: 'rgba(15, 23, 42, 0.48)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePopup();
      }}
      aria-hidden={!isOpen}
    >
      <div
        className="w-full max-w-[410px] bg-white dark:bg-gray-900 rounded-[18px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.22),0_8px_25px_rgba(0,0,0,0.08)] animate-in fade-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lawyerPopupTitle"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-7 text-center relative">
          <button
            onClick={closePopup}
            className="absolute top-3 left-3.5 w-[34px] h-[34px] border-0 rounded-full bg-white/10 text-white text-2xl leading-none cursor-pointer hover:bg-white/20 transition-colors"
            aria-label={t.close || 'بستن'}
            type="button"
          >
            ×
          </button>

          <div className="w-[58px] h-[58px] mx-auto mb-4 rounded-full flex items-center justify-center text-[27px] bg-[hsl(43,74%,50%,0.15)] border border-[hsl(43,74%,50%,0.45)]">
            ⚖
          </div>

          <h2
            id="lawyerPopupTitle"
            className="m-0 text-[21px] font-bold leading-[1.7]"
          >
            {t.title || 'نیاز به مشاوره حقوقی دارید؟'}
          </h2>

          <p className="mt-2 text-gray-400 text-sm leading-[2]">
            {t.subtitle || 'اگر درباره پرونده یا موضوع حقوقی خود نیاز به راهنمایی دارید، می‌توانید با ما تماس بگیرید.'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          <a
            href="https://wa.me/989357770066"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white no-underline py-3.5 px-[18px] rounded-[11px] text-base font-bold shadow-[0_8px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_25px_rgba(37,211,102,0.32)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            تماس با واتساپ
          </a>

          <a
            href="tel:+989357770066"
            className="w-full flex items-center justify-center gap-2.5 bg-[#b8942e] hover:bg-[#9f7d22] text-white no-underline py-3.5 px-[18px] rounded-[11px] text-base font-bold shadow-[0_8px_20px_rgba(184,148,46,0.25)] hover:shadow-[0_12px_25px_rgba(184,148,46,0.32)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-xl">☎</span>
            تماس تلفنی
          </a>

          <button
            type="button"
            onClick={closePopup}
            className="w-full border-0 bg-transparent text-gray-500 hover:text-gray-800 dark:hover:text-white py-3.5 px-2.5 pt-2 text-sm cursor-pointer transition-colors"
          >
            {t.continueButton || 'فعلاً ادامه مشاهده سایت'}
          </button>

          <p className="text-center mt-3 text-[11px] text-gray-400">
            {t.note || 'پاسخگویی در ساعات کاری'}
          </p>
        </div>
      </div>
    </div>
  );
}
