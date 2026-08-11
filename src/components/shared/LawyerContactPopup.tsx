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
    }, 10000);

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
        <div className="p-6">
          <div className="text-center ltr text-lg font-bold text-gray-800 dark:text-white mb-5">
            0935 777 0066
          </div>

          <a
            href="tel:09357770066"
            className="w-full flex items-center justify-center gap-2.5 bg-[#b8942e] hover:bg-[#9f7d22] text-white no-underline py-3.5 px-[18px] rounded-[11px] text-base font-bold shadow-[0_8px_20px_rgba(184,148,46,0.25)] hover:shadow-[0_12px_25px_rgba(184,148,46,0.32)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-xl">☎</span>
            {t.callButton || 'تماس با وکیل'}
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
