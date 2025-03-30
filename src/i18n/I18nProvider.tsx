"use client";

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './index';
import { useParams } from 'next/navigation';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const params = useParams();
  
  useEffect(() => {
    // Changer la langue quand le paramètre locale change
    const locale = Array.isArray(params?.locale) 
      ? params?.locale[0] 
      : params?.locale;
      
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [params?.locale]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
