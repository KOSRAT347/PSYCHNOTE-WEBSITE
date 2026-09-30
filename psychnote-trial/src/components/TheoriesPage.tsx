import { useState } from "react";

export function TheoriesPage() {
  const [selectedTheory, setSelectedTheory] = useState<string>("");
  const [showIntroduction, setShowIntroduction] = useState(true);

  const theoriesData = [
    {
      id: "psychoanalysis",
      title: "نظرية التحليل النفسي",
      author: "سيجموند فرويد",
      icon: "🧠",
      color: "bg-purple-100 border-purple-300",
      description: "نظرية تركز على اللاوعي والدوافع المكبوتة في تفسير السلوك الإنساني",
      mainConcepts: [
        "الهو (Id): الجانب الغريزي والرغبات الأساسية",
        "الأنا (Ego): الجانب الواقعي الذي يوازن بين الهو والأنا العليا",
        "الأنا العليا (Superego): الضمير والقيم الأخلاقية",
        "مراحل النمو النفسي الجنسي الخمس",
        "آليات الدفاع النفسية",
        "تفسير الأحلام كطريق للاوعي"
      ],
      applications: [
        "العلاج النفسي التحليلي",
        "فهم الصراعات النفسية الداخلية",
        "تحليل الأحلام والرموز",
        "علاج الاضطرابات النفسية المزمنة"
      ],
      strengths: [
        "أول نظرية شاملة للشخصية",
        "أهمية اللاوعي في السلوك",
        "تأثير الطفولة على الشخصية"
      ],
      limitations: [
        "صعوبة إثبات المفاهيم علمياً",
        "التركيز المفرط على الجنس",
        "تجاهل العوامل الاجتماعية والثقافية"
      ]
    },
    {
      id: "behavioral",
      title: "النظرية السلوكية",
      author: "ب.ف. سكنر",
      icon: "🔄",
      color: "bg-blue-100 border-blue-300",
      description: "نظرية تركز على السلوك المُلاحظ والتعلم من خلال التكييف والتعزيز",
      mainConcepts: [
        "التكييف الكلاسيكي (بافلوف)",
        "التكييف الإجرائي (سكنر)",
        "التعزيز الإيجابي والسلبي",
        "العقاب والانطفاء",
        "جداول التعزيز",
        "تشكيل السلوك تدريجياً"
      ],
      applications: [
        "تعديل السلوك",
        "العلاج السلوكي",
        "برامج التعليم",
        "إدارة السلوك في المدارس"
      ],
      strengths: [
        "قابلية القياس والملاحظة",
        "فعالية في تغيير السلوك",
        "أساس علمي قوي"
      ],
      limitations: [
        "تجاهل العمليات المعرفية",
        "تبسيط مفرط للسلوك الإنساني",
        "قلة الاهتمام بالمشاعر والأفكار"
      ]
    },
    {
      id: "self_theory",
      title: "نظرية الذات",
      author: "كارل روجرز",
      icon: "💫",
      color: "bg-green-100 border-green-300",
      description: "نظرية إنسانية تركز على الذات والنمو الشخصي والإمكانات الإنسانية",
      mainConcepts: [
        "مفهوم الذات الحقيقية والمثالية",
        "الحاجة الإيجابية غير المشروطة",
        "التطابق بين الخبرة والذات",
        "الميل نحو تحقيق الذات",
        "الشروط الضرورية للنمو النفسي",
        "التقبل غير المشروط"
      ],
      applications: [
        "العلاج المتمركز حول العميل",
        "الإرشاد النفسي الإنساني",
        "التعليم التفاعلي",
        "تطوير الذات والنمو الشخصي"
      ],
      strengths: [
        "التركيز على الإيجابيات الإنسانية",
        "احترام كرامة الفرد",
        "فعالية في العلاج النفسي"
      ],
      limitations: [
        "مثالية مفرطة في النظرة للإنسان",
        "قلة التركيز على العوامل البيولوجية",
        "صعوبة التطبيق مع بعض الاضطرابات"
      ]
    },
    {
      id: "rebt",
      title: "نظرية العلاج العقلاني الانفعالي السلوكي",
      author: "ألبرت إليس",
      icon: "🧩",
      color: "bg-orange-100 border-orange-300",
      description: "نظرية تركز على تغيير الأفكار اللاعقلانية لتحسين المشاعر والسلوك",
      mainConcepts: [
        "نموذج ABC (الحدث-المعتقد-النتيجة)",
        "المعتقدات العقلانية واللاعقلانية",
        "الأفكار التلقائية السلبية",
        "التحدي المعرفي للأفكار",
        "إعادة البناء المعرفي",
        "الواجبات المنزلية السلوكية"
      ],
      applications: [
        "علاج الاكتئاب والقلق",
        "إدارة الغضب",
        "تحسين الثقة بالنفس",
        "علاج الرهاب الاجتماعي"
      ],
      strengths: [
        "فعالية مثبتة علمياً",
        "قصر مدة العلاج",
        "تعليم مهارات للحياة"
      ],
      limitations: [
        "قد يكون صعباً على بعض العملاء",
        "التركيز المفرط على العقلانية",
        "قلة الاهتمام بالعوامل اللاواعية"
      ]
    },
    {
      id: "gestalt",
      title: "نظرية الجشطلت في الإرشاد النفسي",
      author: "فريتز بيرلز",
      icon: "🎭",
      color: "bg-pink-100 border-pink-300",
      description: "نظرية تركز على الوعي الحالي والخبرة المباشرة والكلية في الإرشاد",
      mainConcepts: [
        "الوعي بالهنا والآن",
        "الشكل والخلفية في الإدراك",
        "التماس والانسحاب",
        "المقاومة كآلية دفاعية",
        "التجارب غير المكتملة",
        "الحوار الداخلي"
      ],
      applications: [
        "العلاج الجشطلتي",
        "تطوير الوعي الذاتي",
        "حل الصراعات الداخلية",
        "العلاج الجماعي"
      ],
      strengths: [
        "التركيز على الخبرة المباشرة",
        "فعالية في زيادة الوعي",
        "مرونة في التطبيق"
      ],
      limitations: [
        "قد يكون مكثفاً عاطفياً",
        "يتطلب مهارات عالية من المعالج",
        "قلة البحوث التجريبية"
      ]
    },
    {
      id: "reality_therapy",
      title: "نظرية العلاج الواقعي",
      author: "وليم جلاسر",
      icon: "🎯",
      color: "bg-teal-100 border-teal-300",
      description: "نظرية تركز على الاختيار والمسؤولية الشخصية في تحقيق الحاجات الأساسية",
      mainConcepts: [
        "نظرية الاختيار",
        "الحاجات الأساسية الخمس",
        "السلوك الكلي (التفكير، الفعل، الشعور، الفسيولوجيا)",
        "العالم الجودة الشخصي",
        "المسؤولية الشخصية",
        "التركيز على الحاضر والمستقبل"
      ],
      applications: [
        "الإرشاد المدرسي",
        "علاج الإدمان",
        "الإرشاد الأسري",
        "إدارة السلوك"
      ],
      strengths: [
        "التركيز على المسؤولية الشخصية",
        "عملية وقابلة للتطبيق",
        "إيجابية في النظرة للإنسان"
      ],
      limitations: [
        "قد تتجاهل العوامل اللاواعية",
        "صعوبة مع الاضطرابات الشديدة",
        "التركيز المفرط على الاختيار"
      ]
    },
    {
      id: "individual_psychology",
      title: "نظرية الإرشاد الفردي",
      author: "ألفرد أدلر",
      icon: "👤",
      color: "bg-indigo-100 border-indigo-300",
      description: "نظرية تركز على الفرد ككل وسعيه للتفوق والانتماء الاجتماعي",
      mainConcepts: [
        "السعي للتفوق والكمال",
        "الشعور بالنقص ومجمع النقص",
        "الاهتمام الاجتماعي",
        "أسلوب الحياة الفردي",
        "الأهداف الخيالية",
        "الذكريات المبكرة"
      ],
      applications: [
        "الإرشاد الفردي",
        "العلاج الأسري",
        "الإرشاد المهني",
        "تطوير الشخصية"
      ],
      strengths: [
        "النظرة الشمولية للفرد",
        "التركيز على الأهداف المستقبلية",
        "الاهتمام بالجانب الاجتماعي"
      ],
      limitations: [
        "قلة التركيز على اللاوعي",
        "صعوبة قياس بعض المفاهيم",
        "التبسيط المفرط أحياناً"
      ]
    },
    {
      id: "family_therapy",
      title: "نظرية الإرشاد الأسري",
      author: "متعددة المدارس",
      icon: "👨‍👩‍👧‍👦",
      color: "bg-yellow-100 border-yellow-300",
      description: "نظرية تركز على الأسرة كنظام وتأثير العلاقات الأسرية على الفرد",
      mainConcepts: [
        "الأسرة كنظام",
        "الحدود والأدوار الأسرية",
        "أنماط التواصل الأسري",
        "التوازن والتغيير في النظام",
        "الأجيال والتاريخ الأسري",
        "التحالفات والصراعات"
      ],
      applications: [
        "العلاج الأسري",
        "إرشاد الأزواج",
        "حل المشاكل الأسرية",
        "تحسين التواصل الأسري"
      ],
      strengths: [
        "النظرة الشاملة للمشاكل",
        "فعالية في حل المشاكل الأسرية",
        "التركيز على العلاقات"
      ],
      limitations: [
        "تعقيد في التطبيق",
        "صعوبة إشراك جميع أفراد الأسرة",
        "قد تتجاهل المشاكل الفردية"
      ]
    },
    {
      id: "social_learning",
      title: "النظرية الاجتماعية المعرفية",
      author: "ألبرت باندورا",
      icon: "👥",
      color: "bg-red-100 border-red-300",
      description: "نظرية تركز على التعلم من خلال الملاحظة والنمذجة والتفاعل الاجتماعي",
      mainConcepts: [
        "التعلم بالملاحظة والنمذجة",
        "الحتمية المتبادلة",
        "فعالية الذات",
        "التنظيم الذاتي",
        "التعلم الرمزي",
        "التعزيز الذاتي"
      ],
      applications: [
        "تعديل السلوك",
        "العلاج المعرفي السلوكي",
        "برامج التدريب",
        "التعليم الاجتماعي"
      ],
      strengths: [
        "دمج العوامل المعرفية والسلوكية",
        "أهمية النمذجة في التعلم",
        "قابلية التطبيق العملي"
      ],
      limitations: [
        "تعقيد في بعض المفاهيم",
        "قلة التركيز على العوامل البيولوجية",
        "صعوبة قياس بعض المتغيرات"
      ]
    },
    {
      id: "kohler",
      title: "نظرية كوهلر في التعلم بالاستبصار",
      author: "ولفجانج كوهلر",
      icon: "💡",
      color: "bg-cyan-100 border-cyan-300",
      description: "نظرية تركز على التعلم المفاجئ والاستبصار في حل المشكلات",
      mainConcepts: [
        "التعلم بالاستبصار",
        "إعادة تنظيم المجال الإدراكي",
        "الفهم المفاجئ للحلول",
        "انتقال أثر التعلم",
        "التعلم الكلي مقابل الجزئي",
        "دور الخبرة السابقة"
      ],
      applications: [
        "حل المشكلات الإبداعي",
        "التعليم القائم على الفهم",
        "تطوير التفكير النقدي",
        "العلاج المعرفي"
      ],
      strengths: [
        "التركيز على الفهم العميق",
        "أهمية الاستبصار في التعلم",
        "تطبيقات تعليمية مفيدة"
      ],
      limitations: [
        "صعوبة التنبؤ بحدوث الاستبصار",
        "قلة البحوث التجريبية",
        "تركيز محدود على أنواع معينة من التعلم"
      ]
    }
  ];

  const selectedTheoryData = theoriesData.find(t => t.id === selectedTheory);

  if (selectedTheory && selectedTheoryData) {
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedTheory("")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedTheoryData.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedTheoryData.title}</h2>
                <p className="text-gray-600">{selectedTheoryData.author}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`p-6 rounded-lg border-2 mb-8 ${selectedTheoryData.color}`}>
            <p className="text-gray-700 text-lg">{selectedTheoryData.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Concepts */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🔑 المفاهيم الأساسية
              </h3>
              <ul className="space-y-3">
                {selectedTheoryData.mainConcepts.map((concept, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700 text-sm">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🎯 التطبيقات العملية
              </h3>
              <ul className="space-y-3">
                {selectedTheoryData.applications.map((application, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700 text-sm">{application}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                ✅ نقاط القوة
              </h3>
              <ul className="space-y-3">
                {selectedTheoryData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700 text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                ⚠️ القيود والانتقادات
              </h3>
              <ul className="space-y-3">
                {selectedTheoryData.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700 text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">💡</span>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">ملاحظة مهمة:</p>
                <p>
                  كل نظرية لها مساهماتها الفريدة في فهم السلوك الإنساني. في الممارسة العملية، 
                  يستخدم المختصون غالباً مزيجاً من النظريات حسب حالة كل عميل واحتياجاته الخاصة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">النظريات النفسية</h2>
          <p className="text-gray-600">
            تعرف على أهم النظريات في علم النفس والإرشاد النفسي
          </p>
        </div>

        {/* Introduction Section */}
        {showIntroduction && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">مقدمة عن النظريات النفسية</h3>
              <button
                onClick={() => setShowIntroduction(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">📖</span>
                  تعريف النظرية
                </h4>
                <p className="text-gray-700 text-sm">
                  النظرية هي مجموعة من المبادئ والمفاهيم المترابطة التي تفسر ظاهرة معينة 
                  وتساعد في فهم السلوك الإنساني والتنبؤ به وتوجيه التدخلات العلاجية.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-green-600">⭐</span>
                  أهمية النظرية
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• توفر إطاراً لفهم السلوك</li>
                  <li>• توجه الممارسة العلاجية</li>
                  <li>• تساعد في التنبؤ بالنتائج</li>
                  <li>• تنظم المعرفة العلمية</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <span className="text-purple-600">✨</span>
                  خصائص النظرية الجيدة
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• الوضوح والدقة</li>
                  <li>• قابلية الاختبار</li>
                  <li>• الشمولية</li>
                  <li>• البساطة والاقتصاد</li>
                  <li>• القدرة على التنبؤ</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Theories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {theoriesData.map((theory) => (
            <button
              key={theory.id}
              onClick={() => setSelectedTheory(theory.id)}
              className={`p-6 rounded-lg border-2 text-right transition-all hover:shadow-md ${theory.color} group`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform">{theory.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{theory.title}</h3>
                  <p className="text-sm text-gray-600">{theory.author}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-right leading-relaxed">{theory.description}</p>
            </button>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔄 مقارنة سريعة بين النظريات</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3 font-semibold">النظرية</th>
                  <th className="text-right p-3 font-semibold">التركيز الرئيسي</th>
                  <th className="text-right p-3 font-semibold">المدة</th>
                  <th className="text-right p-3 font-semibold">الأسلوب</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">التحليل النفسي</td>
                  <td className="p-3">اللاوعي والماضي</td>
                  <td className="p-3">طويلة المدى</td>
                  <td className="p-3">استبصاري</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">السلوكية</td>
                  <td className="p-3">السلوك المُلاحظ</td>
                  <td className="p-3">قصيرة المدى</td>
                  <td className="p-3">توجيهي</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">نظرية الذات</td>
                  <td className="p-3">النمو الشخصي</td>
                  <td className="p-3">متوسطة المدى</td>
                  <td className="p-3">غير توجيهي</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">العقلاني الانفعالي</td>
                  <td className="p-3">الأفكار والمعتقدات</td>
                  <td className="p-3">قصيرة المدى</td>
                  <td className="p-3">توجيهي ونشط</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 text-xl">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-2">ملاحظة أكاديمية:</p>
              <p className="mb-2">
                هذه المعلومات مخصصة للتعليم والتوعية النفسية. كل نظرية لها مساهماتها الفريدة 
                وتطبيقاتها المختلفة في الممارسة النفسية والإرشادية.
              </p>
              <p className="font-medium">
                للحصول على فهم أعمق، يُنصح بدراسة هذه النظريات من مصادرها الأصلية والمراجع المتخصصة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
