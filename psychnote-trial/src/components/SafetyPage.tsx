import { useState } from "react";

export function SafetyPage() {
  const [expandedSection, setExpandedSection] = useState<string>("");

  const safetyTopics = [
    {
      id: "self_harm",
      title: "أفكار إيذاء النفس",
      icon: "⚠️",
      color: "bg-red-100 border-red-300",
      content: [
        "التفكير في إيذاء النفس أو الانتحار",
        "الشعور بأن الحياة لا تستحق العيش",
        "التخطيط لطرق إيذاء النفس",
        "الشعور بأنك عبء على الآخرين",
        "فقدان الأمل في المستقبل",
        "الانعزال التام عن الآخرين",
        "التخلص من الممتلكات الشخصية",
        "كتابة رسائل وداع"
      ]
    },
    {
      id: "severe_depression",
      title: "اكتئاب شديد",
      icon: "😔",
      color: "bg-blue-100 border-blue-300",
      content: [
        "حزن عميق مستمر لأكثر من أسبوعين",
        "فقدان الاهتمام بجميع الأنشطة",
        "تغيرات شديدة في الشهية والوزن",
        "اضطرابات النوم (أرق أو نوم مفرط)",
        "تعب شديد وفقدان الطاقة",
        "صعوبة في التركيز واتخاذ القرارات",
        "مشاعر ذنب مفرطة أو انعدام القيمة",
        "أفكار متكررة عن الموت",
        "عدم القدرة على أداء المهام اليومية"
      ]
    },
    {
      id: "panic_attacks",
      title: "نوبات هلع متكررة",
      icon: "💨",
      color: "bg-yellow-100 border-yellow-300",
      content: [
        "نوبات خوف شديد تأتي فجأة",
        "تسارع في ضربات القلب",
        "صعوبة في التنفس أو شعور بالاختناق",
        "تعرق شديد ورعشة",
        "ألم في الصدر",
        "دوخة أو شعور بالإغماء",
        "خوف من فقدان السيطرة أو الموت",
        "تجنب الأماكن خوفاً من النوبات",
        "تأثير على الحياة اليومية والعمل"
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">متى أحتاج مساعدة مختص؟</h2>
          <p className="text-gray-600">
            هذه الصفحة تساعدك على معرفة متى تحتاج للتواصل مع مختص في الصحة النفسية
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🚨</span>
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-2">تحذير مهم</h3>
              <p className="text-red-700 mb-4">
                إذا كنت تفكر في إيذاء نفسك أو الآخرين، أو تشعر بأنك في خطر فوري، يرجى التواصل مع خدمات الطوارئ أو مختص في الصحة النفسية فوراً.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Topics */}
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800">علامات تستدعي التدخل المهني</h3>
          
          {safetyTopics.map((topic) => (
            <div key={topic.id} className={`border-2 rounded-lg ${topic.color}`}>
              <button
                onClick={() => setExpandedSection(expandedSection === topic.id ? "" : topic.id)}
                className="w-full p-6 text-right flex items-center justify-between hover:bg-opacity-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{topic.icon}</span>
                  <h4 className="text-lg font-semibold text-gray-800">{topic.title}</h4>
                </div>
                <span className="text-2xl text-gray-600">
                  {expandedSection === topic.id ? "−" : "+"}
                </span>
              </button>
              
              {expandedSection === topic.id && (
                <div className="px-6 pb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-3">
                      العلامات التحذيرية:
                    </h5>
                    <ul className="space-y-2">
                      {topic.content.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-800 font-medium">
                        إذا كنت تعاني من هذه الأعراض، يُنصح بشدة بالتواصل مع مختص في الصحة النفسية فوراً.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* When to Seek Help */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🩺 متى تطلب المساعدة المهنية؟</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">الأعراض الجسدية:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• تغيرات شديدة في النوم أو الشهية</li>
                <li>• آلام جسدية بدون سبب طبي واضح</li>
                <li>• تعب مستمر وفقدان الطاقة</li>
                <li>• مشاكل في التركيز والذاكرة</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">التأثير على الحياة:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• صعوبة في أداء المهام اليومية</li>
                <li>• مشاكل في العلاقات الاجتماعية</li>
                <li>• تراجع في الأداء الدراسي أو المهني</li>
                <li>• تجنب الأنشطة المهمة</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Help Types */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🏥 أنواع المساعدة المهنية</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">طبيب نفسي</h4>
              <p className="text-sm text-gray-700">
                يمكنه تشخيص الاضطرابات النفسية ووصف الأدوية إذا لزم الأمر
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">أخصائي نفسي</h4>
              <p className="text-sm text-gray-700">
                يقدم العلاج النفسي والاستشارة النفسية المتخصصة
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">مستشار نفسي</h4>
              <p className="text-sm text-gray-700">
                يساعد في التعامل مع التحديات النفسية والاجتماعية
              </p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 text-xl">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-2">تنبيه مهم:</p>
              <p className="mb-2">
                هذه المعلومات للتوعية فقط وليست بديلاً عن الاستشارة المهنية.
              </p>
              <p className="font-medium">
                لا تتردد في طلب المساعدة - طلب المساعدة علامة على القوة وليس الضعف.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
