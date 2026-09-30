import { query } from "./_generated/server";
import { v } from "convex/values";

// Expanded daily content with more variety
const DAILY_CONTENT = [
  {
    type: "fact" as const,
    title: "حقيقة نفسية",
    content: "الضحك يحفز إفراز الإندورفين، وهو مسكن طبيعي للألم ومحسن للمزاج.",
    category: "علم النفس الإيجابي"
  },
  {
    type: "myth" as const,
    title: "خطأ شائع",
    content: "خطأ: 'الأشخاص الأقوياء لا يحتاجون مساعدة نفسية'. الحقيقة: طلب المساعدة علامة على القوة والوعي الذاتي.",
    category: "الصحة النفسية"
  },
  {
    type: "exercise" as const,
    title: "تمرين الامتنان",
    content: "اكتب 3 أشياء تشعر بالامتنان لها اليوم، مهما كانت صغيرة. هذا يعيد برمجة دماغك للتركيز على الإيجابيات.",
    category: "تمارين يومية"
  },
  {
    type: "fact" as const,
    title: "حقيقة علمية",
    content: "النوم الجيد (7-9 ساعات) يحسن الذاكرة والتركيز ويقلل من القلق والاكتئاب بنسبة تصل إلى 30%.",
    category: "النوم والصحة"
  },
  {
    type: "exercise" as const,
    title: "تمرين التأمل السريع",
    content: "اجلس مريحاً، أغمض عينيك، وركز على تنفسك لمدة دقيقتين فقط. لا تحكم على أفكارك، فقط لاحظها واتركها تمر.",
    category: "التأمل"
  },
  {
    type: "fact" as const,
    title: "حقيقة مذهلة",
    content: "دماغك يستهلك 20% من طاقة جسمك رغم أنه يشكل 2% فقط من وزنك. لذلك التغذية الجيدة مهمة للصحة النفسية.",
    category: "علم الأعصاب"
  },
  {
    type: "myth" as const,
    title: "خرافة شائعة",
    content: "خطأ: 'الاكتئاب مجرد حزن عادي'. الحقيقة: الاكتئاب اضطراب طبي معقد يؤثر على كيمياء الدماغ ويحتاج علاجاً مهنياً.",
    category: "الاكتئاب"
  },
  {
    type: "exercise" as const,
    title: "تقنية 5-4-3-2-1",
    content: "عند الشعور بالقلق، حدد: 5 أشياء تراها، 4 تلمسها، 3 تسمعها، 2 تشمها، 1 تتذوقه. هذا يعيدك للحظة الحالية.",
    category: "إدارة القلق"
  },
  {
    type: "fact" as const,
    title: "قوة العلاقات",
    content: "الأشخاص الذين لديهم علاقات اجتماعية قوية يعيشون أطول بنسبة 50% ويتمتعون بصحة نفسية أفضل.",
    category: "العلاقات الاجتماعية"
  },
  {
    type: "exercise" as const,
    title: "تمرين التنفس العميق",
    content: "تنفس من الأنف لـ4 ثوانِ، احبس النفس لـ4 ثوانِ، أخرج من الفم لـ6 ثوانِ. كرر 5 مرات لتهدئة الجهاز العصبي.",
    category: "تقنيات الاسترخاء"
  },
  {
    type: "myth" as const,
    title: "فهم خاطئ",
    content: "خطأ: 'القلق دائماً ضار'. الحقيقة: القلق الطبيعي مفيد ويحمينا من الخطر، لكن القلق المفرط هو الذي يحتاج علاجاً.",
    category: "اضطرابات القلق"
  },
  {
    type: "fact" as const,
    title: "تأثير الرياضة",
    content: "30 دقيقة من المشي يومياً تحسن المزاج بنفس فعالية بعض الأدوية المضادة للاكتئاب، وتقلل التوتر بنسبة 40%.",
    category: "النشاط البدني"
  },
  {
    type: "exercise" as const,
    title: "تمرين إعادة التأطير",
    content: "عندما تواجهك فكرة سلبية، اسأل نفسك: 'هل هذا صحيح 100%؟ ما البديل الأكثر توازناً؟' ثم أعد صياغة الفكرة بإيجابية.",
    category: "العلاج المعرفي"
  },
  {
    type: "fact" as const,
    title: "قوة الموسيقى",
    content: "الاستماع للموسيقى يحفز إفراز الدوبامين والسيروتونين، مما يحسن المزاج ويقلل الألم والتوتر.",
    category: "العلاج بالفن"
  },
  {
    type: "exercise" as const,
    title: "تمرين اللطف الذاتي",
    content: "تحدث مع نفسك كما تتحدث مع صديق عزيز. بدلاً من انتقاد نفسك، قل: 'هذا صعب، لكنني أبذل قصارى جهدي'.",
    category: "تقدير الذات"
  }
];

export const getTodayContent = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    // Use day of year to select content, ensuring it changes daily
    const contentIndex = dayOfYear % DAILY_CONTENT.length;
    
    return {
      ...DAILY_CONTENT[contentIndex],
      date: today.toISOString().split('T')[0]
    };
  },
});

export const getAllContent = query({
  args: {},
  handler: async (ctx) => {
    return DAILY_CONTENT;
  },
});

export const getContentByType = query({
  args: { type: v.union(v.literal("fact"), v.literal("myth"), v.literal("exercise")) },
  handler: async (ctx, args) => {
    return DAILY_CONTENT.filter(content => content.type === args.type);
  },
});
