import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function DailyContent() {
  const todayContent = useQuery(api.content.getTodayContent);
  const allContent = useQuery(api.content.getAllContent);

  const getContentIcon = (type: string) => {
    switch (type) {
      case "fact": return "💡";
      case "myth": return "❌";
      case "exercise": return "🏃‍♂️";
      default: return "📚";
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case "fact": return "bg-blue-50 border-blue-200";
      case "myth": return "bg-red-50 border-red-200";
      case "exercise": return "bg-green-50 border-green-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">المحتوى اليومي</h2>

      {/* Today's Content */}
      {todayContent && (
        <div className={`p-6 rounded-lg border-2 mb-8 ${getContentColor(todayContent.type)}`}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{getContentIcon(todayContent.type)}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-800">{todayContent.title}</h3>
                <span className="px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600">
                  اليوم
                </span>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">{todayContent.content}</p>
              <span className="inline-block px-3 py-1 bg-white rounded-full text-xs text-gray-600">
                {todayContent.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content Library */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">مكتبة المحتوى</h3>
        <p className="text-gray-600 mb-4">
          استكشف مجموعة من الحقائق النفسية والتمارين المفيدة
        </p>
      </div>

      {allContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allContent.map((content, index) => (
            <div
              key={index}
              className={`p-5 rounded-lg border ${getContentColor(content.type)} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{getContentIcon(content.type)}</span>
                <h4 className="font-semibold text-gray-800">{content.title}</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                {content.content}
              </p>
              <span className="inline-block px-2 py-1 bg-white rounded text-xs text-gray-600">
                {content.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 نصائح للاستفادة القصوى</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-purple-600 mt-1">•</span>
            <p className="text-gray-700 text-sm">
              اقرأ المحتوى اليومي كل صباح لبدء يومك بمعلومة مفيدة
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-600 mt-1">•</span>
            <p className="text-gray-700 text-sm">
              طبق التمارين النفسية في حياتك اليومية لتحسين صحتك النفسية
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-600 mt-1">•</span>
            <p className="text-gray-700 text-sm">
              شارك المعلومات المفيدة مع أصدقائك وعائلتك
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-600 mt-1">•</span>
            <p className="text-gray-700 text-sm">
              تذكر أن التغيير الإيجابي يحتاج وقت وصبر
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
