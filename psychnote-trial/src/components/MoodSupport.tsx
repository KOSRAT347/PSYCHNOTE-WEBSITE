import { BreathingExercise } from './BreathingExercise';
import { GroundingExercise } from './GroundingExercise';
import { HELPLINES } from '../config/emergency';
import { useTranslation } from '../contexts/TranslationContext';

const norm = (s: string) => s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
const DANGER = ['انتحار', 'انتحر', 'اقتل نفسي', 'اموت', 'اريد الموت', 'انهي حياتي', 'لا اريد العيش', 'لا اريد ان اعيش', 'اؤذي نفسي', 'ايذاء نفسي'].map(norm);

type Cat = { label: string; kw: string[]; emp: string; steps: string[]; ref: string };
const CATS: Record<string, Cat> = {
  exam: { label: 'الدراسة', kw: ['امتحان', 'رسبت', 'رسوب', 'درجه', 'درجات', 'ماده', 'دراسه', 'نتيجه', 'اختبار'],
    emp: 'يبدو أن ضغط الدراسة أو النتيجة أثّر فيك، وهذا شعور شائع جداً عند الطلاب.',
    steps: ['خذ دقيقتين لتمرين التنفس أدناه، فالتوتر يصعّب التفكير.', 'اكتب ما تريد فعله لهذا اليوم فقط، دون قائمة طويلة.', 'تحدث إلى أستاذ المادة أو مرشد الكلية لمعرفة خياراتك بهدوء.'],
    ref: 'إذا استمر القلق أياماً أو أثّر على نومك، فالمرشد النفسي في الجامعة مكان مناسب.' },
  sleep: { label: 'النوم والتعب', kw: ['نوم', 'ارق', 'سهر', 'تعب', 'ارهاق', 'مرهق'],
    emp: 'قلة النوم تؤثر مباشرة على المزاج، ومن الطبيعي أن تشعر بالضيق عند الإرهاق.',
    steps: ['ابتعد عن الشاشات قبل النوم بنصف ساعة.', 'ثبّت موعد النوم والاستيقاظ حتى في العطلة.', 'تجنب المنبهات مساءً.'],
    ref: 'إذا استمر الأرق أكثر من أسبوعين، استشر طبيباً.' },
  family: { label: 'الأسرة', kw: ['اهل', 'اسره', 'ابي', 'امي', 'اخي', 'اخوتي', 'والد', 'بيت', 'خلاف'],
    emp: 'الخلافات داخل الأسرة مؤلمة لأنها تمس من نحبهم، ومشاعرك مفهومة.',
    steps: ['ابتعد قليلاً عن جو التوتر إن أمكن، ولو بمشي قصير.', 'اكتب ما تريد قوله بهدوء قبل أن تتحدث.', 'اختر وقتاً هادئاً للحديث مع شخص تثق به.'],
    ref: 'إذا كان الوضع مؤذياً أو يتكرر، فالتحدث مع مختص يساعدك على التعامل معه.' },
  lonely: { label: 'الوحدة', kw: ['وحيد', 'وحده', 'صديق', 'اصدقاء', 'لا احد', 'اشتقت', 'غربه'],
    emp: 'الشعور بالوحدة مؤلم، وكثيرون يمرون به خاصة في بداية الدراسة أو بعد الانتقال.',
    steps: ['أرسل رسالة قصيرة لشخص تعرفه.', 'انضم إلى نشاط أو نادٍ في الجامعة يناسب اهتمامك.', 'اخرج إلى مكان فيه ناس، فمجرد الوجود بين الآخرين يساعد.'],
    ref: 'إذا صارت الوحدة ثقيلة أو مستمرة، فالحديث مع مختص خطوة جيدة.' },
  money: { label: 'الوضع المادي', kw: ['مال', 'مادي', 'فلوس', 'مصروف', 'ديون', 'قسط', 'راتب', 'تكاليف'],
    emp: 'القلق المادي يستهلك طاقة كبيرة، ومن الطبيعي أن يعكّر مزاجك.',
    steps: ['اكتب مصروفاتك الأساسية بوضوح، فالأرقام المحددة أهدأ من القلق المبهم.', 'راجع إدارة الجامعة بشأن التسهيلات المتاحة.', 'اختر خطوة صغيرة واحدة تفعلها هذا الأسبوع.'],
    ref: 'إن أثّر الضغط على نومك أو صحتك، فتحدث إلى مختص.' },
  general: { label: 'عام', kw: [],
    emp: 'أشكرك على مشاركة شعورك، وهذه خطوة جيدة بحد ذاتها.',
    steps: ['خذ دقيقتين لتمرين التنفس أدناه.', 'اشرب ماءً وتحرك قليلاً أو اخرج للهواء.', 'تحدث إلى شخص تثق به، حتى بكلمات قليلة.'],
    ref: 'إذا استمر هذا الشعور عدة أيام، فالحديث مع مختص نفسي يساعدك.' },
};

// English + Kurdish danger phrases (DRAFT - review with a native speaker)
const DANGER_OTHER = ['suicide', 'kill myself', 'end my life', 'want to die', 'hurt myself', 'خۆکوشتن', 'خۆم بکوژم', 'بمرم', 'ژیانم کۆتایی پێبهێنم', 'ئازاری خۆم بدەم', 'خۆ بکوژم', 'ژیانا خۆ ب دوماهی بینم', 'ئێشاندنا خۆ'];
export function isDangerous(text: string) {
  const n = norm(text);
  const l = text.toLowerCase();
  return DANGER.some((k) => n.includes(k)) || DANGER_OTHER.some((k) => l.includes(k));
}

export function MoodSupport({ mood, reason, onClose }: { mood: string; reason: string; onClose: () => void }) {
  const { language, t } = useTranslation();
  const goEmergency = () => window.dispatchEvent(new CustomEvent('psychnote:goto', { detail: 'emergency' }));

  if (isDangerous(reason)) {
    return (
      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-5">
        <p className="mb-2 font-semibold text-red-800">{t('ms_cr_t')}</p>
        <p className="mb-3 text-sm text-gray-800">{t('ms_cr_b')}</p>
        {HELPLINES.map((h) => (
          <a key={h.number} href={`tel:${h.number}`} className="mb-2 mr-2 inline-block rounded-md bg-red-600 px-3 py-1 text-sm text-white">{h.name}: {h.number}</a>
        ))}
        <button onClick={goEmergency} className="rounded-md border border-red-300 bg-white px-3 py-1 text-sm text-red-700">{t('ms_cr_btn')}</button>
      </div>
    );
  }
  if (mood !== 'sad' && mood !== 'very_sad') return null;

  const n = norm(reason);
  const key = language === 'ar' ? (Object.keys(CATS).find((k) => CATS[k].kw.some((w) => n.includes(w))) ?? 'general') : 'general';
  const c: Cat = language === 'ar' ? CATS[key] : { label: '', kw: [], emp: t('ms_emp'), steps: [t('ms_s1'), t('ms_s2'), t('ms_s3')], ref: t('ms_ref') };
  return (
    <div className="mb-6 space-y-4">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded bg-white px-2 py-0.5 text-xs text-gray-600">{reason.trim() && language === 'ar' ? `التصنيف: ${c.label}` : t('ms_general_tag')}</span>
          <button onClick={onClose} className="text-xs text-gray-500 hover:text-gray-700">{t('ms_close')}</button>
        </div>
        <p className="mb-3 text-sm text-gray-800">{c.emp}</p>
        <p className="mb-1 text-sm font-medium text-gray-800">{t('ms_try')}</p>
        <ol className="mb-3 list-decimal space-y-1 pr-5 text-sm text-gray-800">{c.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        <p className="text-xs text-gray-600">{c.ref}</p>
        <p className="mt-2 text-xs text-gray-500">{t('ms_disc')}</p>
      </div>
      <BreathingExercise />
      <GroundingExercise />
    </div>
  );
}
