import { useTranslation } from '../contexts/TranslationContext';

// Safe neutral page used by the quick-exit button.
const EXIT_URL = 'https://www.google.com';

export function CrisisBar({ onHelp }: { onHelp: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="sticky top-16 z-10 mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
      <span className="min-w-[140px] flex-1 text-sm text-red-800">{t('crisisMsg')}</span>
      <button onClick={onHelp} className="rounded-md border border-red-300 bg-white px-3 py-1 text-sm text-red-700 hover:bg-red-100">
        {t('crisisHelp')}
      </button>
      <button
        onClick={() => window.location.replace(EXIT_URL)}
        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
      >
        {t('crisisExit')}
      </button>
    </div>
  );
}
