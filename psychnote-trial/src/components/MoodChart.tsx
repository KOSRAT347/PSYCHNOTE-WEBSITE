import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getUserSessionId } from '../utils/userSession';
import { useTranslation } from '../contexts/TranslationContext';

const SCORE: Record<string, number> = { very_sad: 1, sad: 2, neutral: 3, happy: 4, very_happy: 5 };
const LKEYS = ['', 'm_very_sad', 'm_sad', 'm_neutral', 'm_happy', 'm_very_happy'];

export function MoodChart() {
  const [range, setRange] = useState<7 | 30>(7);
  const moods = useQuery(api.moods.getUserMoods, { userId: getUserSessionId(), days: 30 });
  const { t } = useTranslation();
  const LABEL = LKEYS.map((k) => (k ? t(k) : ''));
  const DAYS = t('c_days').split('|');
  if (!moods) return null;

  const all = moods.map((m: any) => ({ date: m.date as string, s: SCORE[m.mood] ?? 3 })).sort((a, b) => a.date.localeCompare(b.date));
  const cut = new Date(); cut.setDate(cut.getDate() - range);
  const data = all.filter((d) => d.date >= cut.toISOString().split('T')[0]);
  if (data.length < 2) {
    return <div className="mb-6 rounded-lg border bg-white p-6 text-sm text-gray-600">{t('c_empty')}</div>;
  }

  const W = 600, H = 200, padL = 70, padR = 16, padT = 12, padB = 24;
  const x = (i: number) => padL + (i * (W - padL - padR)) / (data.length - 1);
  const y = (s: number) => padT + ((5 - s) * (H - padT - padB)) / 4;
  const pts = data.map((d, i) => `${x(i)},${y(d.s)}`).join(' ');
  const avg = data.reduce((a, d) => a + d.s, 0) / data.length;

  // Weekday pattern (needs enough data to avoid misleading the user)
  let insight = '';
  if (all.length >= 7) {
    const sum = Array(7).fill(0), cnt = Array(7).fill(0);
    all.forEach((d) => { const w = new Date(d.date + 'T00:00:00').getDay(); sum[w] += d.s; cnt[w]++; });
    const overall = all.reduce((a, d) => a + d.s, 0) / all.length;
    let low = -1;
    for (let w = 0; w < 7; w++) if (cnt[w] >= 2 && (low < 0 || sum[w] / cnt[w] < sum[low] / cnt[low])) low = w;
    if (low >= 0 && overall - sum[low] / cnt[low] >= 0.5) {
      insight = t('c_insight').replace('{day}', DAYS[low]);
    }
  }

  return (
    <div className="mb-6 rounded-lg border bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{t('c_title')}</h3>
        <div className="flex gap-1">
          {[7, 30].map((r) => (
            <button key={r} onClick={() => setRange(r as 7 | 30)}
              className={`rounded-md border px-3 py-1 text-xs ${range === r ? 'border-blue-300 bg-blue-100 text-blue-700' : 'text-gray-600'}`}>
              {r === 7 ? t('c_7') : t('c_30')}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-2 text-sm text-gray-600">{t('c_avg')}: {avg.toFixed(1)} {t('c_of')}</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[320px]" role="img" aria-label="رسم خطي لمستوى المزاج اليومي" direction="ltr">
          {[1, 2, 3, 4, 5].map((s) => (
            <g key={s}>
              <line x1={padL} x2={W - padR} y1={y(s)} y2={y(s)} stroke="#e5e7eb" />
              <text x={padL - 6} y={y(s) + 4} textAnchor="end" fontSize="11" fill="#6b7280">{LABEL[s]}</text>
            </g>
          ))}
          <polyline points={pts} fill="none" stroke="#2563eb" strokeWidth="2" />
          {data.map((d, i) => <circle key={d.date} cx={x(i)} cy={y(d.s)} r="4" fill="#2563eb"><title>{`${d.date}: ${LABEL[d.s]}`}</title></circle>)}
        </svg>
      </div>
      {insight && <p className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">💡 {insight}</p>}
    </div>
  );
}
