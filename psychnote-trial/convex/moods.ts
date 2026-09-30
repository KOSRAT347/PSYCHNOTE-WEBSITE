import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addMoodEntry = mutation({
  args: {
    userId: v.string(),
    mood: v.union(
      v.literal("very_happy"),
      v.literal("happy"),
      v.literal("neutral"),
      v.literal("sad"),
      v.literal("very_sad")
    ),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if user already has a mood entry for today
    const existingMood = await ctx.db
      .query("moods")
      .withIndex("by_user_and_date", (q) => 
        q.eq("userId", args.userId).eq("date", today)
      )
      .first();

    if (existingMood) {
      // Update existing mood entry
      await ctx.db.patch(existingMood._id, {
        mood: args.mood,
        reason: args.reason,
      });
      return existingMood._id;
    } else {
      // Create new mood entry
      return await ctx.db.insert("moods", {
        userId: args.userId,
        mood: args.mood,
        reason: args.reason,
        date: today,
      });
    }
  },
});

export const getTodayMood = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split('T')[0];
    
    return await ctx.db
      .query("moods")
      .withIndex("by_user_and_date", (q) => 
        q.eq("userId", args.userId).eq("date", today)
      )
      .first();
  },
});

export const getUserMoods = query({
  args: { 
    userId: v.string(),
    days: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const daysToFetch = args.days || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysToFetch);
    const startDateStr = startDate.toISOString().split('T')[0];

    return await ctx.db
      .query("moods")
      .withIndex("by_user_and_date", (q) => 
        q.eq("userId", args.userId).gte("date", startDateStr)
      )
      .collect();
  },
});

export const getMoodStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const moods = await ctx.db
      .query("moods")
      .withIndex("by_user_and_date", (q) => q.eq("userId", args.userId))
      .collect();

    if (moods.length === 0) {
      return {
        totalDays: 0,
        averageScore: 0,
        distribution: {
          very_happy: 0,
          happy: 0,
          neutral: 0,
          sad: 0,
          very_sad: 0,
        },
      };
    }

    // Calculate mood scores (1-5 scale)
    const moodScores: Record<string, number> = {
      very_sad: 1,
      sad: 2,
      neutral: 3,
      happy: 4,
      very_happy: 5,
    };

    const totalScore = moods.reduce((sum, mood) => sum + moodScores[mood.mood], 0);
    const averageScore = totalScore / moods.length;

    // Calculate distribution
    const distribution = {
      very_happy: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      very_sad: 0,
    };

    moods.forEach((mood) => {
      distribution[mood.mood as keyof typeof distribution]++;
    });

    return {
      totalDays: moods.length,
      averageScore,
      distribution,
    };
  },
});

export const getMoodRecommendations = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const recentMoods = await ctx.db
      .query("moods")
      .withIndex("by_user_and_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(7);

    if (recentMoods.length === 0) {
      return {
        recommendations: [
          "ابدأ بتسجيل مزاجك يومياً لنتمكن من مساعدتك بشكل أفضل",
          "حاول ملاحظة الأنماط في مشاعرك وما يؤثر عليها"
        ],
        solutions: []
      };
    }

    const moodScores: Record<string, number> = {
      very_sad: 1,
      sad: 2,
      neutral: 3,
      happy: 4,
      very_happy: 5,
    };

    const averageRecentScore = recentMoods.reduce((sum, mood) => 
      sum + moodScores[mood.mood], 0) / recentMoods.length;

    const sadDays = recentMoods.filter(m => m.mood === 'sad' || m.mood === 'very_sad').length;
    const happyDays = recentMoods.filter(m => m.mood === 'happy' || m.mood === 'very_happy').length;

    return generateMoodBasedSolutions(averageRecentScore, sadDays, happyDays, recentMoods.length);
  },
});

function generateMoodBasedSolutions(averageScore: number, sadDays: number, happyDays: number, totalDays: number) {
  const sadPercentage = (sadDays / totalDays) * 100;
  const happyPercentage = (happyDays / totalDays) * 100;

  if (averageScore >= 4) {
    // Generally happy
    return {
      recommendations: [
        "🌟 حالتك النفسية ممتازة! حافظ على هذا المستوى",
        "شارك إيجابيتك مع الآخرين",
        "استمر في الأنشطة التي تجعلك سعيداً"
      ],
      solutions: [
        "📝 اكتب عن الأشياء التي تجعلك سعيداً لتتذكرها في الأوقات الصعبة",
        "🤝 ساعد شخص آخر - العطاء يزيد السعادة",
        "📸 التقط صور للحظات الجميلة",
        "🎯 ضع أهداف جديدة لتحافظ على الدافعية",
        "🏃‍♀️ مارس نشاط جديد تحبه"
      ]
    };
  } else if (averageScore >= 3) {
    // Neutral to good
    return {
      recommendations: [
        "حالتك متوازنة، يمكنك تحسينها أكثر",
        "ركز على الأنشطة التي ترفع معنوياتك",
        "حاول إضافة المزيد من الأنشطة الممتعة ليومك"
      ],
      solutions: [
        "🎵 استمع لموسيقى تحبها لمدة 30 دقيقة يومياً",
        "🌱 ابدأ هواية جديدة أو نشاط إبداعي",
        "☀️ اقض وقت أكثر في الهواء الطلق",
        "📞 تواصل مع الأصدقاء والعائلة",
        "🍎 اهتم بتغذيتك وشرب الماء",
        "😴 حسن من جودة نومك"
      ]
    };
  } else if (sadPercentage > 50) {
    // Frequently sad
    return {
      recommendations: [
        "لاحظنا أنك تشعر بالحزن كثيراً مؤخراً",
        "من المهم أن تعتني بنفسك وتطلب المساعدة",
        "تذكر أن هذه المشاعر مؤقتة وستتحسن"
      ],
      solutions: [
        "🆘 تحدث مع مختص نفسي إذا استمر الحزن",
        "🤗 اطلب الدعم من الأصدقاء والعائلة",
        "🧘‍♀️ مارس تمارين التنفس والاسترخاء",
        "📝 اكتب عن مشاعرك في مذكرة",
        "🏃‍♂️ مارس الرياضة الخفيفة مثل المشي",
        "🎨 جرب الأنشطة الإبداعية للتعبير عن المشاعر",
        "💙 اطلب المساعدة من مختص في الصحة النفسية"
      ]
    };
  } else {
    // Mixed or low mood
    return {
      recommendations: [
        "مزاجك متقلب مؤخراً، هذا طبيعي أحياناً",
        "حاول تحديد الأسباب وراء تقلبات المزاج",
        "ركز على الاستقرار والروتين الصحي"
      ],
      solutions: [
        "📊 احتفظ بمذكرة لتتبع ما يؤثر على مزاجك",
        "⏰ حافظ على روتين يومي ثابت",
        "🍎 اهتم بالتغذية المتوازنة",
        "😴 نظم أوقات النوم والاستيقاظ",
        "🧘‍♀️ مارس التأمل أو اليوغا",
        "🌿 جرب العلاج بالطبيعة - اقض وقت في الحدائق"
      ]
    };
  }
}
