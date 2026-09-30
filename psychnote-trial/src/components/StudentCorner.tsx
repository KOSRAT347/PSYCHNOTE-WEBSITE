import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { getUserSessionId } from "../utils/userSession";

export function StudentCorner() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const userId = getUserSessionId();
  const categories = useQuery(api.student.getAllStudentCategories);
  const content = useQuery(
    api.student.getStudentContent,
    selectedCategory ? { category: selectedCategory as any } : "skip"
  );
  const progress = useQuery(api.student.getStudentProgress, { userId });
  const recordProgress = useMutation(api.student.recordStudentProgress);

  const categoryIcons = {
    exam_anxiety: "📝",
    procrastination: "⏰",
    study_stress: "📚",
    time_management: "🗓️"
  };

  const categoryColors = {
    exam_anxiety: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200",
    procrastination: "bg-red-100 border-red-300 hover:bg-red-200",
    study_stress: "bg-blue-100 border-blue-300 hover:bg-blue-200",
    time_management: "bg-green-100 border-green-300 hover:bg-green-200"
  };

  const handleCompleteExercise = async (exercise: string) => {
    if (!selectedCategory) return;
    
    try {
      await recordProgress({
        userId,
        category: selectedCategory as any,
        exerciseCompleted: exercise,
      });
      toast.success("أحسنت! تم تسجيل تقدمك 🎉");
    } catch (error) {
      toast.error("حدث خطأ في تسجيل التقدم");
    }
  };

  if (selectedCategory && content) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedCategory("")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {categoryIcons[selectedCategory as keyof typeof categoryIcons]}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">{content.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tips Section */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                💡 نصائح مهمة
              </h3>
              <div className="space-y-3">
                {content.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-blue-500 mt-1 font-bold">{index + 1}</span>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercises Section */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🏃‍♂️ تمارين عملية
              </h3>
              <div className="space-y-4">
                {content.exercises.map((exercise, index) => {
                  const userProgress = progress?.find(p => p.category === selectedCategory);
                  const isCompleted = userProgress?.exerciseCompleted === exercise;
                  
                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 mb-3">{exercise}</p>
                      <button
                        onClick={() => handleCompleteExercise(exercise)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isCompleted
                            ? "bg-green-100 text-green-800 cursor-default"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        disabled={isCompleted}
                      >
                        {isCompleted ? "✅ مكتمل" : "جرب الآن"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Progress */}
          {progress && progress.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 تقدمك</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {progress.map((prog) => {
                  const category = categories?.find(c => c.id === prog.category);
                  return (
                    <div key={prog._id} className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl mb-2">
                        {categoryIcons[prog.category as keyof typeof categoryIcons]}
                      </div>
                      <div className="text-lg font-bold text-blue-600 mb-1">
                        {prog.progress}
                      </div>
                      <div className="text-xs text-gray-600">{category?.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">ركن الطالب 🎓</h2>
      <p className="text-gray-600 mb-6">
        مساحة مخصصة للطلاب للتعامل مع التحديات الأكاديمية والنفسية
      </p>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {categories?.map((category) => {
          const userProgress = progress?.find(p => p.category === category.id);
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 rounded-lg border-2 text-right transition-all ${
                categoryColors[category.id as keyof typeof categoryColors]
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">
                    {categoryIcons[category.id as keyof typeof categoryIcons]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      نصائح وتمارين عملية
                    </p>
                  </div>
                </div>
                {userProgress && (
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {userProgress.progress}
                    </div>
                    <div className="text-xs text-gray-500">تمرين</div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Student Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🌟 نصائح عامة للطلاب</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-1">•</span>
              <p className="text-gray-700 text-sm">
                <strong>نظم وقتك:</strong> استخدم تقويماً لتنظيم مواعيد الدراسة والامتحانات
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-1">•</span>
              <p className="text-gray-700 text-sm">
                <strong>خذ استراحات:</strong> استراحة كل ساعة تحسن التركيز والإنتاجية
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-1">•</span>
              <p className="text-gray-700 text-sm">
                <strong>اطلب المساعدة:</strong> لا تتردد في طلب المساعدة من الأساتذة أو الزملاء
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-1">•</span>
              <p className="text-gray-700 text-sm">
                <strong>اعتن بصحتك:</strong> النوم الجيد والتغذية الصحية أساس النجاح
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-1">•</span>
              <p className="text-gray-700 text-sm">
                <strong>تواصل اجتماعياً:</strong> حافظ على علاقاتك مع الأصدقاء والعائلة
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-1">•</span>
              <p className="text-gray-700 text-sm">
                <strong>كن إيجابياً:</strong> ركز على التقدم وليس الكمال
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Study Resources */}
      <div className="mt-6 bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 موارد مفيدة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl mb-2">🍅</div>
            <h4 className="font-medium text-gray-800 mb-1">تقنية البومودورو</h4>
            <p className="text-sm text-gray-600">25 دقيقة دراسة + 5 دقائق راحة</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl mb-2">🧘‍♂️</div>
            <h4 className="font-medium text-gray-800 mb-1">تمارين الاسترخاء</h4>
            <p className="text-sm text-gray-600">لتقليل التوتر والقلق</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 mb-1">تقنيات المذاكرة</h4>
            <p className="text-sm text-gray-600">طرق فعالة للحفظ والفهم</p>
          </div>
        </div>
      </div>
    </div>
  );
}
