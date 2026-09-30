import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getUserSessionId } from "../utils/userSession";

export function Dashboard() {
  const userId = getUserSessionId();
  const todayMood = useQuery(api.moods.getTodayMood, { userId });
  const moodStats = useQuery(api.moods.getMoodStats, { userId });
  const recentAssessments = useQuery(api.assessments.getUserAssessments, { userId });

  const quickTips = [
    {
      icon: "🧘‍♀️",
      title: "تمرين التنفس العميق",
      description: "خذ نفساً عميقاً لمدة 4 ثوانٍ، احبسه لـ 4 ثوانٍ، ثم أخرجه في 6 ثوانٍ",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: "💧",
      title: "اشرب الماء",
      description: "الجفاف يؤثر على المزاج والتركيز. اشرب كوباً من الماء الآن",
      color: "bg-cyan-50 border-cyan-200"
    },
    {
      icon: "🌱",
      title: "فكر في شيء إيجابي",
      description: "اذكر ثلاثة أشياء تشعر بالامتنان لها اليوم",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: "🚶‍♂️",
      title: "تحرك قليلاً",
      description: "المشي لـ 5 دقائق يحسن الدورة الدموية ويرفع المزاج",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const mentalHealthFacts = [
    "💡 هل تعلم أن 20 دقيقة من المشي يومياً تقلل من أعراض الاكتئاب؟",
    "🧠 النوم الجيد لـ 7-9 ساعات يحسن الذاكرة والمزاج بشكل كبير",
    "🎵 الاستماع للموسيقى يحفز إفراز الدوبامين ويحسن المزاج",
    "🤝 التواصل الاجتماعي الإيجابي يقوي جهاز المناعة النفسية"
  ];

  const todayFact = mentalHealthFacts[new Date().getDate() % mentalHealthFacts.length];

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      very_happy: "😄",
      happy: "😊",
      neutral: "😐",
      sad: "😔",
      very_sad: "😢"
    };
    return moodMap[mood] || "😐";
  };

  const getMoodLabel = (mood: string) => {
    const moodMap: Record<string, string> = {
      very_happy: "سعيد جداً",
      happy: "سعيد",
      neutral: "عادي",
      sad: "حزين",
      very_sad: "حزين جداً"
    };
    return moodMap[mood] || "غير محدد";
  };

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          أهلاً بك في PSYCHNOTE! 👋
        </h1>
        <p className="text-gray-600">كيف حالك اليوم؟ دعنا نعتني بصحتك النفسية معاً</p>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Mood */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">مزاجك اليوم</h3>
          {todayMood ? (
            <div className="text-center">
              <div className="text-4xl mb-2">{getMoodEmoji(todayMood.mood)}</div>
              <p className="text-gray-700 font-medium">{getMoodLabel(todayMood.mood)}</p>
              {todayMood.reason && (
                <p className="text-sm text-gray-600 mt-2 italic">"{todayMood.reason}"</p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">❓</div>
              <p className="text-gray-600">لم تسجل مزاجك بعد</p>
              <p className="text-sm text-blue-600 mt-1">انتقل لقسم "مزاجي" لتسجيله</p>
            </div>
          )}
        </div>

        {/* Mood Statistics */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">إحصائياتك</h3>
          {moodStats && moodStats.totalDays > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">المتوسط العام:</span>
                <span className="font-bold text-green-600">{moodStats.averageScore.toFixed(1)}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">أيام التتبع:</span>
                <span className="font-bold text-green-600">{moodStats.totalDays}</span>
              </div>
              <div className="text-center mt-4">
                <div className="text-2xl">
                  {moodStats.averageScore >= 4 ? "🌟" : 
                   moodStats.averageScore >= 3 ? "😊" : 
                   moodStats.averageScore >= 2 ? "😐" : "💙"}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {moodStats.averageScore >= 4 ? "حالة ممتازة!" : 
                   moodStats.averageScore >= 3 ? "حالة جيدة" : 
                   moodStats.averageScore >= 2 ? "حالة متوسطة" : "تحتاج عناية"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-gray-600 text-sm">ابدأ بتسجيل مزاجك لرؤية الإحصائيات</p>
            </div>
          )}
        </div>

        {/* Recent Assessment */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">آخر تقييم</h3>
          {recentAssessments && recentAssessments.length > 0 ? (
            <div className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-gray-700 font-medium">
                {recentAssessments[0].type === 'anxiety' ? 'تقييم القلق' :
                 recentAssessments[0].type === 'depression' ? 'تقييم الاكتئاب' :
                 recentAssessments[0].type === 'stress' ? 'تقييم التوتر' : 'تقدير الذات'}
              </p>
              <p className="text-lg font-bold text-purple-600 mt-1">
                {recentAssessments[0].score}/20
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {new Date(recentAssessments[0]._creationTime).toLocaleDateString('ar')}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-gray-600 text-sm">لم تجر أي تقييم بعد</p>
              <p className="text-sm text-purple-600 mt-1">انتقل لقسم "تقييم ذاتي"</p>
            </div>
          )}
        </div>
      </div>

      {/* Daily Fact */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-100 p-6 rounded-xl border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          حقيقة نفسية اليوم
        </h3>
        <p className="text-gray-700 text-lg">{todayFact}</p>
      </div>

      {/* Quick Tips */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">نصائح سريعة لتحسين مزاجك</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTips.map((tip, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${tip.color} hover:shadow-md transition-shadow`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors text-center">
            <div className="text-2xl mb-2">😊</div>
            <div className="text-sm font-medium text-gray-800">سجل مزاجك</div>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm font-medium text-gray-800">تقييم ذاتي</div>
          </button>
          <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors text-center">
            <div className="text-2xl mb-2">🚑</div>
            <div className="text-sm font-medium text-gray-800">إسعاف نفسي</div>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-800">محتوى يومي</div>
          </button>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-100 p-6 rounded-xl border border-indigo-200 text-center">
        <div className="text-3xl mb-3">🌟</div>
        <blockquote className="text-lg text-gray-700 italic mb-2">
          "الصحة النفسية ليست وجهة، بل رحلة يومية من الاهتمام بالذات"
        </blockquote>
        <p className="text-sm text-gray-600">- فريق PSYCHNOTE</p>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">تذكير مهم:</p>
            <p>هذه المنصة للتوعية والدعم الأولي فقط. في حالة الحاجة لمساعدة مهنية، يرجى التواصل مع مختص في الصحة النفسية.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
