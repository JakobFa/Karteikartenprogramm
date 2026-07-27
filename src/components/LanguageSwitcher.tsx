import { LANGUAGES } from '../i18n';
import { useLanguage } from '../LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Sprache / Language">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          className={`lang-btn ${l.code === lang ? 'active' : ''}`}
          onClick={() => setLang(l.code)}
          title={l.label}
          aria-pressed={l.code === lang}
        >
          <span aria-hidden="true">{l.flag}</span>
          <span className="lang-label">{l.label}</span>
        </button>
      ))}
    </div>
  );
}
