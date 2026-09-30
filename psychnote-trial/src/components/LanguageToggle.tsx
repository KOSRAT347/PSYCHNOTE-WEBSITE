import { useTranslation } from '../contexts/TranslationContext';
import { LANGUAGES, Language } from '../i18n/extra';

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="rounded-lg border border-gray-200 bg-white/90 px-2 py-2 text-sm"
      aria-label="Language"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );
}
