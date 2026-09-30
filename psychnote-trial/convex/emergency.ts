import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const EMERGENCY_TECHNIQUES = {
  stress: {
    title: "تقنية التنفس 4-7-8",
    steps: [
      "اجلس في وضعية مريحة",
      "تنفس من الأنف لمدة 4 ثوانِ",
      "احبس النفس لمدة 7 ثوانِ", 
      "أخرج النفس من الفم لمدة 8 ثوانِ",
      "كرر هذا 4 مرات"
    ],
    message: "التوتر شعور طبيعي. هذا التمرين سيساعد جهازك العصبي على الاسترخاء."
  },
  negative_thoughts: {
    title: "تقنية إعادة الصياغة المعرفية",
    steps: [
      "اكتب الفكرة السلبية",
      "اسأل نفسك: هل هذا صحيح 100%؟",
      "ما الدليل المؤيد والمعارض؟",
      "كيف سأنصح صديقاً في نفس الموقف؟",
      "أعد صياغة الفكرة بشكل أكثر توازناً"
    ],
    message: "أفكارنا ليست حقائق. يمكننا تغيير طريقة تفكيرنا لنشعر بتحسن."
  },
  anxiety_attack: {
    title: "تقنية 5-4-3-2-1 للتأريض",
    steps: [
      "انظر حولك وحدد 5 أشياء تراها",
      "لمس 4 أشياء مختلفة الملمس",
      "استمع إلى 3 أصوات مختلفة",
      "شم رائحتين مختلفتين",
      "تذوق شيئاً واحداً أو ركز على طعم فمك"
    ],
    message: "نوبات القلق مؤقتة وغير ضارة. هذا التمرين سيعيدك للحظة الحالية."
  },
  sudden_distress: {
    title: "تقنية الاسترخاء التدريجي",
    steps: [
      "ابدأ بأصابع قدميك - شدها ثم أرخها",
      "انتقل لعضلات الساقين - شدها ثم أرخها",
      "شد عضلات البطن ثم أرخها",
      "شد عضلات الكتفين والرقبة ثم أرخها",
      "أخيراً شد عضلات الوجه ثم أرخها"
    ],
    message: "الضيق المفاجئ سيمر. جسمك يحتاج للاسترخاء والهدوء."
  }
};

export const getEmergencyTechnique = query({
  args: {
    type: v.union(
      v.literal("stress"),
      v.literal("negative_thoughts"),
      v.literal("anxiety_attack"),
      v.literal("sudden_distress")
    )
  },
  handler: async (ctx, args) => {
    return EMERGENCY_TECHNIQUES[args.type];
  },
});

export const startEmergencySession = mutation({
  args: {
    userId: v.string(),
    type: v.union(
      v.literal("stress"),
      v.literal("negative_thoughts"),
      v.literal("anxiety_attack"),
      v.literal("sudden_distress")
    )
  },
  handler: async (ctx, args) => {
    const technique = EMERGENCY_TECHNIQUES[args.type];
    
    return await ctx.db.insert("emergencySupport", {
      userId: args.userId,
      technique: technique.title,
      completed: false,
    });
  },
});

export const completeEmergencySession = mutation({
  args: { userId: v.string(), sessionId: v.id("emergencySupport") },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session || session.userId !== args.userId) {
      throw new Error("Session not found");
    }

    await ctx.db.patch(args.sessionId, { completed: true });
    return session;
  },
});

export const getUserEmergencySessions = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("emergencySupport")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(10);
  },
});
