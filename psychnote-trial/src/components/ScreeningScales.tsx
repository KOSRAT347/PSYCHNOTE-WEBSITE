import { useState } from 'react';
import { HELPLINES } from '../config/emergency';

const OPTS = ['أبداً', 'عدة أيام', 'أكثر من نصف الأيام', 'كل يوم تقريباً'];
const SCALES = {
  phq9: { name: 'PHQ-9 (المزاج)', items: [
    'قلة الاهتمام أو المتعة في القيام بالأشياء', 'الشعور بالإحباط أو الحزن أو اليأس',
    'صعوبة في النوم أو الاستمرار فيه، أو النوم أكثر من اللازم', 'الشعور بالتعب أو قلة الطاقة',
    'ضعف الشهية أو الإفراط في الأكل', 'الشعور بسوء تجاه نفسك، أو بأنك فاشل أو خذلت نفسك أو أهلك',
    'صعوبة في التركيز، مثل قراءة الدراسة أو متابعة التلفاز',
    'الحركة أو الكلام ببطء شديد يلاحظه الآخرون، أو العكس: توتر وحركة أكثر من المعتاد',
    'أفكار بأنك لو كنت ميتاً لكان أفضل، أو أفكار بإيذاء نفسك بطريقة ما'],
    bands: [[4, 'ضئيلة'], [9, 'خفيفة'], [14, 'متوسطة'], [19, 'متوسطة إلى شديدة'], [27, 'شديدة']] as [number, string][] },
  gad7: { name: 'GAD-7 (القلق)', items: [
    'الشعور بالعصبية أو القلق أو التوتر', 'عدم القدرة على التوقف عن القلق أو السيطرة عليه',
    'القلق الزائد بشأن أمور مختلفة', 'صعوبة في الاسترخاء', 'التململ لدرجة يصعب معها الجلوس بهدوء',
    'الانزعاج أو العصبية بسهولة', 'الخوف كأن شيئاً فظيعاً قد يحدث'],
    bands: [[4, 'ضئيلة'], [9, 'خفيفة'], [14, 'متوسطة'], [21, 'شديدة']] as [number, string][] },
};
type Key = keyof typeof SCALES;

export function ScreeningScales() {
  const [key, setKey] = useState<Key>('phq9');
  const [ans, setAns] = useState<number[]>([]);
  const [result, setResult] = useState(false);
  const sc = SCALES[key];
  const pick = (k: Key) => { setKey(k); setAns([]); setResult(false); };
  const complete = sc.items.every((_, i) => ans[i] !== undefined);
  const total = ans.reduce((a, b) => a + (b ?? 0), 0);
  const level = sc.bands.find(([max]) => total <= max)?.[1] ?? '';
  const risk = key === 'phq9' && (ans[8] ?? 0) > 0;

  return (
    <div className="p-6">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">مقاييس الفحص الأولي</h2>
      <p className="mb-4 text-sm text-gray-600">مقياسان يُستخدمان عالمياً للفحص الأولي. النتيجة لا تعني تشخيصاً، وتبقى على جهازك ولا تُحفظ.</p>
      <div className="mb-4 flex gap-2">
        {(Object.keys(SCALES) as Key[]).map((k) => (
          <button key={k} onClick={() => pick(k)} className={`rounded-md border px-3 py-1 text-sm ${key === k ? 'border-blue-300 bg-blue-100 text-blue-700' : 'text-gray-600'}`}>{SCALES[k].name}</button>
        ))}
      </div>
      {!result ? (
        <>
          <p className="mb-3 font-medium text-gray-800">خلال الأسبوعين الماضيين، كم مرة أزعجتك المشكلات التالية؟</p>
          <div className="space-y-4">
            {sc.items.map((q, i) => (
              <fieldset key={q} className="rounded-lg border p-3">
                <legend className="px-1 text-sm text-gray-800">{i + 1}. {q}</legend>
                <div className="mt-1 flex flex-wrap gap-2">
                  {OPTS.map((o, v) => (
                    <label key={o} className={`cursor-pointer rounded-md border px-3 py-1 text-xs ${ans[i] === v ? 'border-blue-300 bg-blue-100 text-blue-700' : 'text-gray-600'}`}>
                      <input type="radio" className="sr-only" name={`${key}-${i}`} checked={ans[i] === v} onChange={() => { const n = [...ans]; n[i] = v; setAns(n); }} />{o}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <button disabled={!complete} onClick={() => setResult(true)} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">عرض النتيجة</button>
        </>
      ) : (
        <div className="space-y-3">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="font-medium text-gray-800">مجموعك: {total} — أعراض {level}</p>
            <p className="mt-1 text-sm text-gray-700">
              {total >= 10 ? 'ننصحك بالتحدث مع مختص نفسي أو مرشد في الجامعة لفهم ما تمر به ودعمك.' : 'استمر في العناية بنفسك، ويمكنك إعادة المقياس بعد أسبوعين أو عند تغيّر حالك.'}
            </p>
          </div>
          {risk && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="font-semibold text-red-800">أجبتَ بوجود أفكار بإيذاء النفس، وهذا مهم</p>
              <p className="my-2 text-sm text-gray-800">من فضلك تحدث مع شخص تثق به أو جهة مختصة اليوم، ولا تبقَ وحدك.</p>
              {HELPLINES.map((h) => <a key={h.number} href={`tel:${h.number}`} className="mr-2 inline-block rounded-md bg-red-600 px-3 py-1 text-sm text-white">{h.name}: {h.number}</a>)}
              <button onClick={() => window.dispatchEvent(new CustomEvent('psychnote:goto', { detail: 'emergency' }))} className="rounded-md border border-red-300 bg-white px-3 py-1 text-sm text-red-700">صفحة الإسعاف النفسي</button>
            </div>
          )}
          <button onClick={() => { setAns([]); setResult(false); }} className="rounded-lg border px-4 py-2 text-sm text-gray-700">إعادة المقياس</button>
          <p className="text-xs text-gray-500">المصدر: PHQ-9 وGAD-7 من تطوير Spitzer وKroenke وزملائهما. الصياغة العربية هنا غير رسمية وتحتاج مراجعة مختص قبل النشر.</p>
        </div>
      )}
    </div>
  );
}
