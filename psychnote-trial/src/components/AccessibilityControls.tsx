import { useEffect, useState } from 'react';

const read = (k: string, d: string) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

export function AccessibilityControls() {
  const [size, setSize] = useState(() => Number(read('psychnote-font', '100')));
  const [dark, setDark] = useState(() => read('psychnote-dark', '0') === '1');
  useEffect(() => { document.documentElement.style.fontSize = `${size}%`; write('psychnote-font', String(size)); }, [size]);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); write('psychnote-dark', dark ? '1' : '0'); }, [dark]);
  const b = 'rounded-md border border-gray-200 bg-white/90 px-2 py-1 text-sm';
  return (
    <div className="flex items-center gap-1">
      <button className={b} aria-label="تصغير الخط" onClick={() => setSize((s) => Math.max(85, s - 10))}>A-</button>
      <button className={b} aria-label="تكبير الخط" onClick={() => setSize((s) => Math.min(130, s + 10))}>A+</button>
      <button className={b} aria-label="الوضع الداكن" onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</button>
    </div>
  );
}
