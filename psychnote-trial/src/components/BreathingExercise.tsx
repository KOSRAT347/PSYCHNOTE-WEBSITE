import { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const PHASES = [
  { k: 'b_in', secs: 4, scale: 1 },
  { k: 'b_hold', secs: 4, scale: 1 },
  { k: 'b_out', secs: 6, scale: 0.6 },
];

export function BreathingExercise() {
  const { t } = useTranslation();
  const [running, setRunning] = useState(false);
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(PHASES[0].secs);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((l) => {
        if (l > 1) return l - 1;
        const next = (idx + 1) % PHASES.length;
        if (next === 0) setRounds((r) => r + 1);
        setIdx(next);
        return PHASES[next].secs;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, idx]);

  const p = PHASES[idx];
  const toggle = () => {
    if (running) { setRunning(false); return; }
    setIdx(0); setLeft(PHASES[0].secs); setRunning(true);
  };

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-center">
      <h4 className="mb-1 font-semibold text-gray-800">{t('b_title')}</h4>
      <p className="mb-3 text-xs text-gray-600">{t('b_sub')}</p>
      <div className="flex h-40 items-center justify-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200 text-xl font-medium text-blue-800"
          style={{ transform: `scale(${running ? p.scale : 0.6})`, transition: `transform ${running ? p.secs : 1}s ease-in-out` }}
        >
          {running ? left : ''}
        </div>
      </div>
      <p className="mb-3 min-h-[24px] font-medium text-gray-800">{running ? t(p.k) : rounds ? t('b_done') : t('b_ready')}</p>
      <button onClick={toggle} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
        {running ? t('b_stop') : t('b_start')}
      </button>
      {rounds > 0 && <p className="mt-2 text-xs text-gray-500">{t('b_rounds')}: {rounds}</p>}
    </div>
  );
}
