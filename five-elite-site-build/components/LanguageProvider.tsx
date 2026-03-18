'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { content, localeLabels, type Locale } from '@/lib/content';

type ContextType = {
  locale: Locale;
  setLocale: (value: Locale) => void;
};

const Ctx = createContext<ContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = localStorage.getItem('five-elite-locale') as Locale | null;
    if (stored && ['en', 'ru', 'id'].includes(stored)) setLocaleState(stored);
  }, []);

  const setLocale = (value: Locale) => {
    localStorage.setItem('five-elite-locale', value);
    setLocaleState(value);
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return {
    locale: ctx.locale,
    setLocale: ctx.setLocale,
    t: content[ctx.locale],
    labels: localeLabels
  };
}
