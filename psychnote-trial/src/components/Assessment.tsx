import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { getUserSessionId } from "../utils/userSession";

export function Assessment() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const userId = getUserSessionId();
  const questions = useQuery(
    api.assessments.getAssessmentQuestions,
    selectedType ? { type: selectedType as any } : "skip"
  );
  const submitAssessment = useMutation(api.assessments.submitAssessment);
  const userAssessments = useQuery(api.assessments.getUserAssessments, { userId });

  const assessmentTypes = [
    { id: "anxiety", title: "تقييم القلق", icon: "😰", color: "bg-yellow-100 border-yellow-300" },
    { id: "depression", title: "تقييم الاكتئاب", icon: "😔", color: "bg-blue-100 border-blue-300" },
    { id: "stress", title: "تقييم التوتر", icon: "😤", color: "bg-red-100 border-red-300" },
    { id: "self_esteem", title: "تقدير الذات", icon: "💪", color: "bg-green-100 border-green-300" },
  ];

  const handleAnswerSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);

    if (currentQuestion < (questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      handleSubmitAssessment(newAnswers);
    }
  };

  const handleSubmitAssessment = async (finalAnswers: number[]) => {
    try {
      const result = await submitAssessment({
        userId,
        type: selectedType as any,
        answers: finalAnswers,
      });
      
      // Get the full assessment result
      const assessments = await userAssessments;
      const latestAssessment = assessments?.[0];
      
      setLastResult(latestAssessment);
      setShowResults(true);
      toast.success("تم إكمال التقييم بنجاح!");
    } catch (error) {
      toast.error("حدث خطأ في إرسال التقييم");
    }
  };

  const resetAssessment = () => {
    setSelectedType("");
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setLastResult(null);
  };

  const scaleLabels = [
    "لا أوافق بشدة",
    "لا أوافق",
    "محايد",
    "أوافق",
    "أوافق بشدة"
  ];

  // Self-esteem is reverse-keyed: a HIGH total is the healthy outcome.
  const getBand = (score: number, type?: string): "good" | "mid" | "high" => {
    const base = score <= 8 ? "good" : score <= 15 ? "mid" : "high";
    if (type !== "self_esteem") return base;
    return base === "good" ? "high" : base === "high" ? "good" : "mid";
  };
  const getScoreLevel = (score: number, type?: string) => {
    const b = getBand(score, type);
    if (type === "self_esteem") {
      if (b === "good") return { level: "مرتفع", color: "text-green-600", bg: "bg-green-50" };
      if (b === "mid") return { level: "متوسط", color: "text-yellow-600", bg: "bg-yellow-50" };
      return { level: "منخفض", color: "text-red-600", bg: "bg-red-50" };
    }
    if (b === "good") return { level: "منخفض", color: "text-green-600", bg: "bg-green-50" };
    if (b === "mid") return { level: "متوسط", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { level: "مرتفع", color: "text-red-600", bg: "bg-red-50" };
  };

  if (showResults && lastResult) {
    const scoreInfo = getScoreLevel(lastResult.score, lastResult.type);
    const band = getBand(lastResult.score, lastResult.type);
    const recommendations = lastResult.recommendations || [];
    const basicRecommendations = recommendations.slice(0, 4);
    const solutions = recommendations.slice(4);

    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border mb-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">تم إكمال التقييم</h2>
              <p className="text-gray-600">
                {assessmentTypes.find(t => t.id === selectedType)?.title}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className={`p-6 rounded-lg border ${scoreInfo.bg}`}>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-blue-600">
                    {lastResult.score}/20
                  </div>
                  <p className="text-gray-600 mb-2">النتيجة الإجمالية</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreInfo.color} bg-white`}>
                    مستوى {scoreInfo.level}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg border">
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="text-gray-600 mb-2">التقييم</p>
                  <p className="text-sm text-gray-500">
                    {band === "good" ? "حالتك جيدة نسبياً" : band === "mid" ? "تحتاج لبعض الاهتمام" : "يُنصح بطلب المساعدة المهنية"}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg border">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-gray-600 mb-2">الخطوة التالية</p>
                  <p className="text-sm text-gray-500">
                    {band === "good" ? "حافظ على نمط حياتك الصحي" : band === "mid" ? "طبق التوصيات المقترحة" : "اطلب المساعدة المهنية"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {basicRecommendations.length > 0 && (
            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                💡 التوصيات الأساسية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basicRecommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-blue-500 mt-1 text-lg">•</span>
                    <p className="text-gray-700 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solutions */}
          {solutions.length > 0 && (
            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🛠️ حلول عملية يمكنك تطبيقها
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solutions.map((solution: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-500 mt-1 text-lg">✓</span>
                    <p className="text-gray-700 text-sm">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Plan */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              📋 خطة العمل المقترحة
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-purple-600 font-bold">1</span>
                <p className="text-gray-700">ابدأ بتطبيق حل واحد من القائمة أعلاه اليوم</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-purple-600 font-bold">2</span>
                <p className="text-gray-700">تابع تقدمك عبر تسجيل مزاجك يومياً</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-purple-600 font-bold">3</span>
                <p className="text-gray-700">أعد التقييم بعد أسبوعين لمراقبة التحسن</p>
              </div>
              {band === "high" && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-600 font-bold">⚠️</span>
                  <p className="text-red-700">اطلب المساعدة المهنية - لا تتردد في التواصل مع مختص</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={resetAssessment}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              إجراء تقييم آخر
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedType && questions) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>السؤال {currentQuestion + 1} من {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {questions[currentQuestion]}
            </h2>

            <div className="space-y-3">
              {scaleLabels.map((label, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-right"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{label}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i <= index ? "bg-blue-500" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={resetAssessment}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                إلغاء التقييم
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">التقييم الذاتي</h2>
      <p className="text-gray-600 mb-6">
        اختر نوع التقييم الذي تريد إجراءه. ستحصل على تحليل مفصل وحلول عملية بناءً على نتائجك.
      </p>

      {/* Assessment Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {assessmentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-6 rounded-lg border-2 hover:shadow-md transition-all ${type.color} text-right`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{type.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{type.title}</h3>
                <p className="text-sm text-gray-600">5 أسئلة • حلول مخصصة</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Previous Assessments */}
      {userAssessments && userAssessments.length > 0 && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">التقييمات السابقة</h3>
          <div className="space-y-3">
            {userAssessments.slice(0, 5).map((assessment) => {
              const type = assessmentTypes.find(t => t.id === assessment.type);
              const scoreInfo = getScoreLevel(assessment.score, assessment.type);
              return (
                <div key={assessment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{type?.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{type?.title}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(assessment._creationTime).toLocaleDateString('ar')}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {assessment.score}/20
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${scoreInfo.color} ${scoreInfo.bg}`}>
                      {scoreInfo.level}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">تنبيه مهم:</p>
            <p>هذه التقييمات للتوعية والإرشاد فقط وليست بديلاً عن التشخيص المهني. ستحصل على حلول عملية مبنية على إجاباتك.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
