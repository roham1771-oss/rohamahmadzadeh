'use client';

import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';

interface ProvidersProps {
  children: React.ReactNode;
  dict: any;
  locale: string;
}

export function Providers({ children, dict, locale }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
