'use client';

import { useState, useEffect } from 'react';

interface CookieConsentProps {
  dict: any;
}

export function CookieConsent({ dict }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container-custom">
        <div className="bg-white dark:bg-primary-950 border border-border rounded-xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                {dict?.common?.cookieNotice || 'This website uses cookies'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict?.common?.cookieNotice || 'We use cookies to improve your experience on our website. By continuing to use this site, you agree to our use of cookies.'}
              </p>
            </div>
            <button
              onClick={accept}
              className="btn-primary shrink-0"
            >
              {dict?.common?.acceptCookies || 'Accept'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
