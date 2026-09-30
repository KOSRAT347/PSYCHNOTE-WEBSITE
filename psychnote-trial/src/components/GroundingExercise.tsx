import { useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const NUMS = [5, 4, 3, 2, 1];

export function GroundingExercise() {
  const { t } = useTranslation();
  const [i, setI] = useState(-1);
  const done = i >= NUMS.length;
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5 text-center">
      <h4 className="mb-1 font-semibold text-gray-800">{t('g_title')}</h4>
      {i < 0 && <p className="mb-3 text-sm text-gray-600">{t('g_intro')}</p>}
      {i >= 0 && !done && (
        <div className="my-3">
          <div className="text-5xl font-bold text-emerald-700">{NUMS[i]}</div>
          <p className="mt-1 font-medium text-gray-800">{t(`g${i + 1}`)}</p>
        </div>
      )}
      {done && <p className="my-3 font-medium text-gray-800">{t('g_done')}</p>}
      <button onClick={() => setI(done ? -1 : i + 1)} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700">
        {i < 0 ? t('g_start') : done ? t('g_again') : t('g_next')}
      </button>
    </div>
  );
}
