import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const assessmentQuestions = {
  anxiety: [
    "أشعر بالقلق أو التوتر معظم الوقت",
    "أجد صعوبة في التحكم في مخاوفي",
    "أتجنب المواقف التي تجعلني أشعر بالقلق",
    "أعاني من أعراض جسدية مثل تسارع القلب أو التعرق",
    "القلق يؤثر على حياتي اليومية وعملي"
  ],
  depression: [
    "أشعر بالحزن أو اليأس معظم الوقت",
    "فقدت الاهتمام بالأنشطة التي كنت أستمتع بها",
    "أشعر بالتعب وانخفاض الطاقة باستمرار",
    "أواجه صعوبة في التركيز أو اتخاذ القرارات",
    "لدي أفكار سلبية عن نفسي أو المستقبل"
  ],
  stress: [
    "أشعر بالإرهاق من ضغوط الحياة اليومية",
    "أجد صعوبة في الاسترخاء أو الهدوء",
    "أشعر بالانفعال أو الغضب بسهولة",
    "أعاني من مشاكل في النوم بسبب التفكير المفرط",
    "الضغط يؤثر على علاقاتي وأدائي"
  ],
  self_esteem: [
    "أشعر بالرضا عن نفسي ومن أكون",
    "أثق في قدراتي ومهاراتي",
    "أتقبل أخطائي وأتعلم منها",
    "أشعر أنني أستحق الحب والاحترام",
    "أواجه التحديات بثقة وإيجابية"
  ]
};

export const getAssessmentQuestions = query({
  args: { 
    type: v.union(
      v.literal("anxiety"),
      v.literal("depression"), 
      v.literal("stress"),
      v.literal("self_esteem")
    )
  },
  handler: async (ctx, args) => {
    return assessmentQuestions[args.type];
  },
});

export const submitAssessment = mutation({
  args: {
    userId: v.string(),
    type: v.union(
      v.literal("anxiety"),
      v.literal("depression"),
      v.literal("stress"),
      v.literal("self_esteem")
    ),
    answers: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    // Calculate total score
    const score = args.answers.reduce((sum, answer) => sum + answer, 0);
    
    // Generate comprehensive recommendations and solutions
    const { recommendations, solutions, level } = generateComprehensiveSolutions(args.type, score);
    
    return await ctx.db.insert("assessments", {
      userId: args.userId,
      type: args.type,
      answers: args.answers,
      score,
      recommendations: [...recommendations, ...solutions],
    });
  },
});

export const getUserAssessments = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("assessments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getAssessmentStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const assessments = await ctx.db
      .query("assessments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (assessments.length === 0) {
      return null;
    }

    // Group by type and calculate averages
    const statsByType: Record<string, { scores: number[], average: number, count: number }> = {};
    
    assessments.forEach((assessment) => {
      if (!statsByType[assessment.type]) {
        statsByType[assessment.type] = { scores: [], average: 0, count: 0 };
      }
      statsByType[assessment.type].scores.push(assessment.score);
      statsByType[assessment.type].count++;
    });

    // Calculate averages
    Object.keys(statsByType).forEach((type) => {
      const typeStats = statsByType[type];
      typeStats.average = typeStats.scores.reduce((sum, score) => sum + score, 0) / typeStats.count;
    });

    return {
      totalAssessments: assessments.length,
      byType: statsByType,
      latestAssessment: assessments[assessments.length - 1],
    };
  },
});

function generateComprehensiveSolutions(type: string, score: number): { 
  recommendations: string[], 
  solutions: string[], 
  level: string 
} {
  let level: string;
  if (score <= 8) level = "low";
  else if (score <= 15) level = "medium";
  else level = "high";

  const solutionsByType: Record<string, Record<string, { recommendations: string[], solutions: string[] }>> = {
    anxiety: {
      low: {
        recommendations: [
          "مارس تمارين التنفس العميق يومياً لمدة 5-10 دقائق",
          "حافظ على روتين نوم منتظم (7-8 ساعات)",
          "قلل من تناول الكافيين والسكر"
        ],
        solutions: [
          "🧘‍♀️ تقنية التنفس 4-7-8: تنفس لـ4 ثوانِ، احبس لـ7، أخرج لـ8",
          "📱 استخدم تطبيقات التأمل مثل Headspace أو Calm",
          "🌿 اشرب شاي البابونج أو اللافندر قبل النوم",
          "📝 اكتب مخاوفك في دفتر واسأل نفسك: هل هذا واقعي؟",
          "🏃‍♂️ امش لمدة 20 دقيقة يومياً في الهواء الطلق"
        ]
      },
      medium: {
        recommendations: [
          "تعلم تقنيات الاسترخاء والتأمل",
          "مارس الرياضة بانتظام 3-4 مرات أسبوعياً",
          "تحدث مع أصدقائك أو عائلتك عن مشاعرك",
          "فكر في استشارة مختص إذا استمرت الأعراض"
        ],
        solutions: [
          "🎯 تقنية التأريض 5-4-3-2-1: حدد 5 أشياء تراها، 4 تلمسها، 3 تسمعها، 2 تشمها، 1 تتذوقه",
          "📊 احتفظ بمذكرة قلق: سجل متى تشعر بالقلق وما السبب",
          "🎵 استمع لموسيقى هادئة أو أصوات الطبيعة",
          "💪 مارس اليوغا أو تمارين الإطالة",
          "🗣️ تدرب على تقنيات التحدث الإيجابي مع النفس",
          "⏰ ضع حدود زمنية للقلق: اسمح لنفسك بالقلق لـ15 دقيقة فقط يومياً"
        ]
      },
      high: {
        recommendations: [
          "اطلب المساعدة من مختص في الصحة النفسية فوراً",
          "تجنب المواقف المثيرة للقلق مؤقتاً",
          "مارس تقنيات التأريض عند الشعور بالقلق",
          "لا تتردد في طلب الدعم من الأشخاص المقربين"
        ],
        solutions: [
          "🆘 اطلب المساعدة من مختص في الصحة النفسية فوراً",
          "🏥 احجز موعد مع طبيب نفسي أو أخصائي نفسي",
          "👥 انضم لمجموعة دعم للقلق",
          "💊 استشر طبيب حول إمكانية العلاج الدوائي",
          "📱 حمل تطبيق طوارئ للقلق مثل MindShift",
          "🏠 أنشئ مساحة آمنة في المنزل للاسترخاء",
          "📞 احتفظ بقائمة أرقام الأشخاص الذين يمكنك الاتصال بهم"
        ]
      }
    },
    depression: {
      low: {
        recommendations: [
          "حافظ على نشاطات تستمتع بها",
          "اقض وقتاً في الطبيعة أو تحت أشعة الشمس",
          "حافظ على التواصل الاجتماعي"
        ],
        solutions: [
          "☀️ اقض 15-30 دقيقة يومياً في ضوء الشمس",
          "📚 اقرأ كتاباً تحبه أو استمع لبودكاست ملهم",
          "🎨 مارس هواية إبداعية مثل الرسم أو الكتابة",
          "🤝 تواصل مع صديق واحد يومياً",
          "🎵 أنشئ قائمة تشغيل من الأغاني التي ترفع معنوياتك"
        ]
      },
      medium: {
        recommendations: [
          "ضع أهدافاً صغيرة قابلة للتحقيق",
          "مارس الرياضة أو المشي يومياً",
          "احتفظ بمذكرة للأفكار الإيجابية",
          "فكر في التحدث مع مستشار نفسي"
        ],
        solutions: [
          "📝 اكتب 3 أشياء تشعر بالامتنان لها كل يوم",
          "🏃‍♀️ ابدأ بالمشي 10 دقائق يومياً وزد تدريجياً",
          "🎯 ضع هدف صغير يومي (مثل ترتيب السرير)",
          "🍎 اهتم بتغذيتك: تناول الأوميغا 3 والفيتامينات",
          "😴 حافظ على روتين نوم ثابت",
          "📞 اطلب الدعم النفسي المتخصص عند الحاجة"
        ]
      },
      high: {
        recommendations: [
          "اطلب المساعدة المهنية فوراً",
          "تواصل مع مختص في الصحة النفسية",
          "لا تبق وحيداً - اطلب الدعم من الأصدقاء والعائلة",
          "تجنب اتخاذ قرارات مهمة في هذه الفترة"
        ],
        solutions: [
          "🆘 اطلب المساعدة المهنية فوراً من مختص نفسي",
          "🏥 اذهب لأقرب مستشفى أو عيادة نفسية",
          "👨‍⚕️ احجز موعد عاجل مع طبيب نفسي",
          "👥 أخبر شخص تثق به عن شعورك",
          "💊 لا تتردد في السؤال عن العلاج الدوائي",
          "🏠 اطلب من أحد البقاء معك إذا كنت تشعر بالخطر",
          "📱 حمل تطبيق طوارئ الصحة النفسية"
        ]
      }
    },
    stress: {
      low: {
        recommendations: [
          "نظم وقتك وأولوياتك",
          "خذ فترات راحة منتظمة",
          "مارس هوايات تساعدك على الاسترخاء"
        ],
        solutions: [
          "📅 استخدم تقنية البومودورو: 25 دقيقة عمل + 5 دقائق راحة",
          "🛁 خذ حمام دافئ مع الأملاح المعطرة",
          "🎵 استمع للموسيقى الهادئة أثناء العمل",
          "🌱 ازرع نبتة صغيرة واعتن بها",
          "📖 اقرأ لمدة 15 دقيقة قبل النوم"
        ]
      },
      medium: {
        recommendations: [
          "تعلم تقنيات إدارة الوقت",
          "مارس اليوغا أو التأمل",
          "قلل من الالتزامات غير الضرورية",
          "تحدث مع مختص حول استراتيجيات التعامل مع الضغط"
        ],
        solutions: [
          "📊 استخدم مصفوفة أيزنهاور لترتيب المهام",
          "🧘‍♀️ مارس التأمل لمدة 10 دقائق يومياً",
          "❌ تعلم قول 'لا' للطلبات الإضافية",
          "💆‍♀️ احجز جلسة مساج أو استرخاء",
          "🏃‍♂️ مارس رياضة تفريغ الطاقة مثل الملاكمة",
          "📝 اكتب قائمة بالأشياء التي تسبب لك التوتر وابحث عن حلول"
        ]
      },
      high: {
        recommendations: [
          "اطلب إجازة أو راحة من العمل إذا أمكن",
          "استشر طبيباً أو مختصاً في الصحة النفسية",
          "تجنب المنشطات والكحول",
          "ركز على الأساسيات: النوم والطعام والراحة"
        ],
        solutions: [
          "🏥 استشر طبيب حول تأثير التوتر على صحتك الجسدية",
          "💼 تحدث مع مديرك حول تقليل عبء العمل",
          "🧘‍♀️ احجز دورة في إدارة التوتر",
          "🏖️ خطط لإجازة قصيرة أو عطلة نهاية أسبوع",
          "👥 انضم لمجموعة دعم لإدارة التوتر",
          "💊 استشر طبيب حول مكملات المغنيسيوم أو فيتامين B"
        ]
      }
    },
    self_esteem: {
      low: {
        recommendations: [
          "تحدى الأفكار السلبية عن نفسك",
          "اكتب قائمة بنقاط قوتك وإنجازاتك",
          "تجنب مقارنة نفسك بالآخرين"
        ],
        solutions: [
          "📝 اكتب 5 نقاط قوة لديك واقرأها يومياً",
          "🏆 احتفل بالإنجازات الصغيرة",
          "🪞 قل لنفسك 3 أشياء إيجابية أمام المرآة",
          "📱 قلل من استخدام وسائل التواصل الاجتماعي",
          "🎯 ضع أهداف صغيرة وحققها"
        ]
      },
      medium: {
        recommendations: [
          "ضع أهدافاً واقعية وقابلة للتحقيق",
          "احتفل بالإنجازات الصغيرة",
          "احط نفسك بأشخاص إيجابيين وداعمين",
          "فكر في العلاج النفسي لتحسين الثقة بالنفس"
        ],
        solutions: [
          "📚 اقرأ كتب تطوير الذات",
          "🎨 تعلم مهارة جديدة تشعرك بالإنجاز",
          "💪 مارس الرياضة لتحسين صورة الجسم",
          "🗣️ تدرب على التحدث أمام المرآة",
          "👥 انضم لنشاطات اجتماعية أو تطوعية",
          "📝 احتفظ بمذكرة إنجازات يومية"
        ]
      },
      high: {
        recommendations: [
          "اطلب المساعدة من مختص في الصحة النفسية",
          "انضم لمجموعات الدعم",
          "تجنب الأشخاص أو المواقف السلبية",
          "ركز على الرعاية الذاتية والتعاطف مع النفس"
        ],
        solutions: [
          "👨‍⚕️ احجز جلسات علاج نفسي متخصص في تقدير الذات",
          "👥 انضم لمجموعة دعم لتقدير الذات",
          "📱 استخدم تطبيقات التأكيدات الإيجابية",
          "🎭 جرب العلاج بالفن أو الموسيقى",
          "📖 اقرأ عن قصص نجاح أشخاص تغلبوا على مشاكل مشابهة",
          "🧘‍♀️ مارس تقنيات التعاطف مع الذات"
        ]
      }
    }
  };

  const typeData = solutionsByType[type]?.[level];
  return {
    recommendations: typeData?.recommendations || [],
    solutions: typeData?.solutions || [],
    level
  };
}
