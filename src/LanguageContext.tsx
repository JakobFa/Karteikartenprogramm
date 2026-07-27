import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_LANG, TRANSLATIONS, PHRASES_BY_LANG, type Lang } from './i18n';

const STORAGE_KEY = 'karteikatzen-lang';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof TRANSLATIONS)[Lang];
  phrases: (typeof PHRASES_BY_LANG)[Lang];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored in TRANSLATIONS) return stored as Lang;
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang());

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: TRANSLATIONS[lang], phrases: PHRASES_BY_LANG[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
