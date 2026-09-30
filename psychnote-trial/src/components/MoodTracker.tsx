import { useState } from "react";
import { MoodSupport } from "./MoodSupport";
import { useTranslation } from "../contexts/TranslationContext";
import { MoodChart } from "./MoodChart";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { getUserSessionId } from "../utils/userSession";

export function MoodTracker() {
  const { t } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [reason, setReason] = useState("");
  const [support, setSupport] = useState<{ mood: string; reason: string } | null>(null);
  
  const userId = getUserSessionId();
  const addMood = useMutation(api.moods.addMoodEntry);
  const todayMood = useQuery(api.moods.getTodayMood, { userId });
  const recentMoods = useQuery(api.moods.getUserMoods, { userId, days: 7 });
  const moodStats = useQuery(api.moods.getMoodStats, { userId });
  const moodRecommendations = useQuery(api.moods.getMoodRecommendations, { userId });

  const moods = [
    { id: "very_happy", emoji: "😄", label: t("m_very_happy"), color: "bg-green-500" },
    { id: "happy", emoji: "😊", label: t("m_happy"), color: "bg-green-400" },
    { id: "neutral", emoji: "😐", label: t("m_neutral"), color: "bg-yellow-400" },
    { id: "sad", emoji: "😔", label: t("m_sad"), color: "bg-orange-400" },
    { id: "very_sad", emoji: "😢", label: t("m_very_sad"), color: "bg-red-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    try {
      await addMood({
        userId,
        mood: selectedMood as any,
        reason: reason.trim() || undefined,
      });
      toast.success(t("m_ok"));
      setSupport({ mood: selectedMood, reason });
      setSelectedMood("");
      setReason("");
    } catch (error) {
      toast.error(t("m_err"));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("m_title")}</h2>

      {/* Today's Mood Entry */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {todayMood ? t("m_today") : t("m_how")}
        </h3>
        
        {todayMood ? (
          <div className="text-center">
            <div className="text-6xl mb-3">
              {moods.find(m => m.id === todayMood.mood)?.emoji}
            </div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              {moods.find(m => m.id === todayMood.mood)?.label}
            </p>
            {todayMood.reason && (
              <p className="text-gray-600 italic">"{todayMood.reason}"</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {t("m_update")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedMood === mood.id
                      ? "border-blue-500 bg-blue-50 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-xs font-medium text-gray-700">
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("m_why")}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="مثال: نجحت في امتحان، أو كان يوم صعب في العمل..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            
            <button
              type="submit"
              disabled={!selectedMood}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t("m_save")}
            </button>
          </form>
        )}
      </div>

      {support && <MoodSupport mood={support.mood} reason={support.reason} onClose={() => setSupport(null)} />}

      <MoodChart />

      {/* Mood Recommendations */}
      {moodRecommendations && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              💡 توصيات مخصصة لك
            </h3>
            <div className="space-y-3">
              {moodRecommendations.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-500 mt-1">•</span>
                  <p className="text-gray-700 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          {moodRecommendations.solutions.length > 0 && (
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🛠️ حلول عملية
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {moodRecommendations.solutions.map((solution: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-gray-700 text-sm">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mood Statistics */}
      {moodStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">الإحصائيات</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">المتوسط العام:</span>
                <span className="font-semibold">{moodStats.averageScore.toFixed(1)}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">عدد الأيام:</span>
                <span className="font-semibold">{moodStats.totalDays}</span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  {moodStats.averageScore >= 4 ? "🌟 حالتك النفسية ممتازة!" :
                   moodStats.averageScore >= 3 ? "😊 حالتك جيدة" :
                   moodStats.averageScore >= 2 ? "😐 حالة متوسطة" :
                   "💙 تحتاج لمزيد من العناية"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">توزيع المشاعر</h3>
            <div className="space-y-2">
              {moods.map((mood) => {
                const count = moodStats.distribution[mood.id as keyof typeof moodStats.distribution];
                const percentage = moodStats.totalDays > 0 ? (count / moodStats.totalDays) * 100 : 0;
                return (
                  <div key={mood.id} className="flex items-center gap-3">
                    <span className="text-lg">{mood.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{mood.label}</span>
                        <span>{count} ({Math.round(percentage)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${mood.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Recent Moods */}
      {recentMoods && recentMoods.length > 0 && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">آخر 7 أيام</h3>
          <div className="grid grid-cols-7 gap-2">
            {[...recentMoods].reverse().map((mood, index) => {
              const moodData = moods.find(m => m.id === mood.mood);
              return (
                <div key={mood._id} className="text-center">
                  <div className="text-2xl mb-1">{moodData?.emoji}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(mood.date).toLocaleDateString('ar', { weekday: 'short' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Important Notice */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">نصيحة:</p>
            <p>
              تتبع مزاجك يومياً يساعدك على فهم الأنماط والعوامل التي تؤثر على حالتك النفسية. 
              استخدم التوصيات والحلول المقترحة لتحسين مزاجك تدريجياً.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
