import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const STUDENT_CONTENT = {
  exam_anxiety: {
    title: "قلق الامتحانات",
    tips: [
      "خطط للمراجعة مسبقاً لتجنب الضغط اللحظي",
      "مارس تقنيات التنفس قبل الامتحان",
      "تذكر: القلق الخفيف يحسن الأداء، والمفرط يضره",
      "نم جيداً قبل الامتحان - السهر يضر أكثر مما ينفع"
    ],
    exercises: [
      "تمرين التصور الإيجابي: تخيل نفسك تؤدي الامتحان بهدوء وثقة",
      "تقنية 'ماذا لو': اكتب أسوأ سيناريو ثم اكتب كيف ستتعامل معه",
      "تمرين الاسترخاء: شد عضلاتك لـ5 ثوانِ ثم أرخها"
    ]
  },
  procrastination: {
    title: "المماطلة",
    tips: [
      "قسم المهام الكبيرة إلى خطوات صغيرة",
      "استخدم تقنية البومودورو (25 دقيقة عمل + 5 دقائق راحة)",
      "ابدأ بأسهل مهمة لكسر حاجز البداية",
      "كافئ نفسك بعد إنجاز كل مهمة"
    ],
    exercises: [
      "قاعدة الدقيقتين: إذا كانت المهمة تحتاج أقل من دقيقتين، افعلها فوراً",
      "تقنية 'فقط ابدأ': التزم بالعمل لـ10 دقائق فقط",
      "اكتب قائمة بـ3 مهام صغيرة وأنجزها اليوم"
    ]
  },
  study_stress: {
    title: "ضغط الدراسة",
    tips: [
      "خذ استراحة كل ساعة لمدة 10-15 دقيقة",
      "غير مكان الدراسة أحياناً لتجديد التركيز",
      "تحدث مع زملائك عن الضغوط - أنت لست وحدك",
      "تذكر أن درجاتك لا تحدد قيمتك كإنسان"
    ],
    exercises: [
      "تمرين إعادة التأطير: بدلاً من 'يجب أن أكون مثالياً' قل 'سأبذل قصارى جهدي'",
      "تقنية التنفس المربع: تنفس لـ4، احبس لـ4، أخرج لـ4، انتظر لـ4",
      "اكتب 3 أشياء تعلمتها اليوم بدلاً من التركيز على ما لم تنجزه"
    ]
  },
  time_management: {
    title: "إدارة الوقت النفسية",
    tips: [
      "حدد أولوياتك بناءً على الأهمية وليس الإلحاح فقط",
      "تعلم قول 'لا' للأنشطة غير المهمة",
      "خصص وقتاً للراحة والترفيه - هذا ليس ترفاً بل ضرورة",
      "استخدم تقويماً لتنظيم مواعيدك ومهامك"
    ],
    exercises: [
      "مصفوفة أيزنهاور: قسم مهامك إلى (مهم وعاجل، مهم غير عاجل، إلخ)",
      "تقنية تسجيل الوقت: راقب كيف تقضي وقتك لمدة يوم واحد",
      "تمرين التخطيط الأسبوعي: خطط لأسبوعك كل أحد"
    ]
  }
};

export const getStudentContent = query({
  args: {
    category: v.union(
      v.literal("exam_anxiety"),
      v.literal("procrastination"),
      v.literal("study_stress"),
      v.literal("time_management")
    )
  },
  handler: async (ctx, args) => {
    return STUDENT_CONTENT[args.category];
  },
});

export const getAllStudentCategories = query({
  args: {},
  handler: async (ctx) => {
    return Object.keys(STUDENT_CONTENT).map(key => ({
      id: key,
      title: STUDENT_CONTENT[key as keyof typeof STUDENT_CONTENT].title
    }));
  },
});

export const recordStudentProgress = mutation({
  args: {
    userId: v.string(),
    category: v.union(
      v.literal("exam_anxiety"),
      v.literal("procrastination"),
      v.literal("study_stress"),
      v.literal("time_management")
    ),
    exerciseCompleted: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if progress exists for this category
    const existingProgress = await ctx.db
      .query("studentProgress")
      .filter((q) => q.and(
        q.eq(q.field("userId"), args.userId),
        q.eq(q.field("category"), args.category)
      ))
      .first();

    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        exerciseCompleted: args.exerciseCompleted,
        progress: existingProgress.progress + 1,
      });
      return existingProgress._id;
    } else {
      return await ctx.db.insert("studentProgress", {
        userId: args.userId,
        category: args.category,
        exerciseCompleted: args.exerciseCompleted,
        progress: 1,
      });
    }
  },
});

export const getStudentProgress = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("studentProgress")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});
