import { useState } from "react";

interface Disorder {
  title: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
}

interface DisorderCategory {
  title: string;
  icon: string;
  color: string;
  disorders: Record<string, Disorder>;
}

export function DisordersInfo() {
  const [selectedCategory, setSelectedCategory] = useState<string>("anxiety");
  const [selectedDisorder, setSelectedDisorder] = useState<string>("");

  const disorderCategories: Record<string, DisorderCategory> = {
    anxiety: {
      title: "اضطرابات القلق",
      icon: "😰",
      color: "bg-yellow-50 border-yellow-300",
      disorders: {
        generalized_anxiety: {
          title: "اضطراب القلق العام",
          symptoms: [
            "قلق مفرط ومستمر حول أحداث الحياة اليومية",
            "صعوبة في السيطرة على القلق",
            "توتر عضلي وإرهاق",
            "صعوبة في التركيز",
            "اضطرابات النوم"
          ],
          causes: [
            "العوامل الوراثية",
            "اختلال في كيمياء الدماغ",
            "الضغوط النفسية المزمنة",
            "الأحداث الصادمة"
          ],
          treatment: [
            "العلاج المعرفي السلوكي",
            "تقنيات الاسترخاء والتأمل",
            "العلاج الدوائي (مضادات القلق)",
            "تمارين التنفس العميق",
            "ممارسة الرياضة بانتظام"
          ]
        },
        panic_disorder: {
          title: "اضطراب الهلع",
          symptoms: [
            "نوبات هلع مفاجئة ومتكررة",
            "خفقان سريع في القلب",
            "تعرق وارتجاف",
            "ضيق في التنفس",
            "خوف من الموت أو فقدان السيطرة"
          ],
          causes: [
            "الاستعداد الوراثي",
            "التغيرات في وظائف الدماغ",
            "الضغط النفسي الشديد",
            "التغيرات الهرمونية"
          ],
          treatment: [
            "العلاج المعرفي السلوكي",
            "تقنيات التعرض التدريجي",
            "مضادات الاكتئاب",
            "تقنيات التأريض",
            "تجنب المنشطات"
          ]
        },
        social_anxiety: {
          title: "اضطراب القلق الاجتماعي",
          symptoms: [
            "خوف شديد من المواقف الاجتماعية",
            "تجنب التفاعلات الاجتماعية",
            "احمرار الوجه والتعرق",
            "صعوبة في التحدث أمام الآخرين",
            "خوف من الحكم السلبي"
          ],
          causes: [
            "العوامل الوراثية",
            "تجارب اجتماعية سلبية",
            "انخفاض الثقة بالنفس",
            "البيئة الأسرية المفرطة في الحماية"
          ],
          treatment: [
            "العلاج السلوكي المعرفي",
            "التدريب على المهارات الاجتماعية",
            "العلاج بالتعرض",
            "تقنيات الاسترخاء",
            "العلاج الجماعي"
          ]
        },
        phobias: {
          title: "الرهاب المحدد",
          symptoms: [
            "خوف مفرط من شيء أو موقف محدد",
            "تجنب الشيء المخيف",
            "أعراض جسدية عند التعرض للمثير",
            "تأثير على الحياة اليومية",
            "إدراك أن الخوف مفرط"
          ],
          causes: [
            "تجربة صادمة مع المثير",
            "التعلم من الآخرين",
            "العوامل الوراثية",
            "تغيرات في كيمياء الدماغ"
          ],
          treatment: [
            "العلاج بالتعرض التدريجي",
            "تقنيات الاسترخاء",
            "العلاج المعرفي السلوكي",
            "إزالة التحسس المنهجي",
            "العلاج الدوائي في الحالات الشديدة"
          ]
        }
      }
    },
    depression: {
      title: "اضطرابات المزاج",
      icon: "😔",
      color: "bg-blue-50 border-blue-300",
      disorders: {
        major_depression: {
          title: "الاكتئاب الشديد",
          symptoms: [
            "مزاج منخفض معظم الوقت",
            "فقدان الاهتمام بالأنشطة",
            "تغيرات في الشهية والوزن",
            "اضطرابات النوم",
            "التعب وانخفاض الطاقة",
            "مشاعر اليأس والذنب",
            "صعوبة في التركيز"
          ],
          causes: [
            "اختلال في النواقل العصبية",
            "العوامل الوراثية",
            "الأحداث الصادمة",
            "الضغوط النفسية المزمنة",
            "بعض الأدوية والحالات الطبية"
          ],
          treatment: [
            "مضادات الاكتئاب",
            "العلاج النفسي",
            "العلاج المعرفي السلوكي",
            "العلاج بالضوء",
            "ممارسة الرياضة",
            "تحسين نمط الحياة"
          ]
        },
        bipolar_disorder: {
          title: "اضطراب ثنائي القطب",
          symptoms: [
            "نوبات هوس (مزاج مرتفع مفرط)",
            "نوبات اكتئاب شديدة",
            "تقلبات مزاجية حادة",
            "سلوك متهور أثناء الهوس",
            "أفكار متسارعة",
            "قلة الحاجة للنوم"
          ],
          causes: [
            "العوامل الوراثية القوية",
            "اختلال في كيمياء الدماغ",
            "الضغوط النفسية",
            "تعاطي المواد المخدرة"
          ],
          treatment: [
            "مثبتات المزاج",
            "مضادات الذهان",
            "العلاج النفسي",
            "العلاج الأسري",
            "تنظيم نمط النوم",
            "تجنب المحفزات"
          ]
        },
        seasonal_depression: {
          title: "الاكتئاب الموسمي",
          symptoms: [
            "اكتئاب يحدث في فصول معينة",
            "زيادة في النوم والشهية",
            "الرغبة الشديدة في الكربوهيدرات",
            "زيادة الوزن",
            "انخفاض الطاقة"
          ],
          causes: [
            "قلة التعرض لأشعة الشمس",
            "اختلال في الساعة البيولوجية",
            "انخفاض مستوى السيروتونين",
            "زيادة إنتاج الميلاتونين"
          ],
          treatment: [
            "العلاج بالضوء",
            "مضادات الاكتئاب",
            "العلاج النفسي",
            "زيادة التعرض للضوء الطبيعي",
            "ممارسة الرياضة"
          ]
        }
      }
    },
    trauma: {
      title: "اضطرابات الصدمة والضغط",
      icon: "💔",
      color: "bg-red-50 border-red-300",
      disorders: {
        ptsd: {
          title: "اضطراب ما بعد الصدمة",
          symptoms: [
            "ذكريات مؤلمة متكررة",
            "كوابيس وأحلام مزعجة",
            "تجنب المحفزات المرتبطة بالصدمة",
            "تغيرات سلبية في المزاج والتفكير",
            "فرط اليقظة والانتباه",
            "ردود فعل مفرطة للمفاجآت"
          ],
          causes: [
            "التعرض لحدث صادم",
            "الحروب والكوارث",
            "الاعتداء الجسدي أو الجنسي",
            "الحوادث الخطيرة",
            "فقدان شخص عزيز بطريقة مأساوية"
          ],
          treatment: [
            "العلاج المعرفي السلوكي للصدمة",
            "العلاج بحركة العين (EMDR)",
            "العلاج بالتعرض",
            "مضادات الاكتئاب",
            "العلاج الجماعي",
            "تقنيات الاسترخاء"
          ]
        },
        acute_stress: {
          title: "اضطراب الضغط الحاد",
          symptoms: [
            "أعراض تشبه اضطراب ما بعد الصدمة",
            "تحدث خلال شهر من الحدث الصادم",
            "انفصال عن الواقع",
            "فقدان الذاكرة الجزئي",
            "تجنب المحفزات"
          ],
          causes: [
            "التعرض المباشر لحدث صادم",
            "مشاهدة حدث صادم",
            "معرفة تعرض شخص قريب لصدمة",
            "التعرض المتكرر لتفاصيل صادمة"
          ],
          treatment: [
            "العلاج النفسي الفوري",
            "تقنيات التأقلم",
            "الدعم الاجتماعي",
            "العلاج الدوائي قصير المدى",
            "تقنيات الاسترخاء"
          ]
        }
      }
    },
    eating: {
      title: "اضطرابات الأكل",
      icon: "🍽️",
      color: "bg-pink-50 border-pink-300",
      disorders: {
        anorexia: {
          title: "فقدان الشهية العصبي",
          symptoms: [
            "تقييد شديد لتناول الطعام",
            "خوف مفرط من زيادة الوزن",
            "تشويه في صورة الجسم",
            "انخفاض شديد في الوزن",
            "انقطاع الدورة الشهرية"
          ],
          causes: [
            "العوامل الوراثية",
            "الضغوط الاجتماعية والثقافية",
            "الكمالية والسيطرة",
            "تاريخ من الصدمات",
            "اضطرابات نفسية أخرى"
          ],
          treatment: [
            "العلاج الغذائي المتخصص",
            "العلاج النفسي الأسري",
            "العلاج المعرفي السلوكي",
            "إعادة التأهيل الغذائي",
            "العلاج الطبي للمضاعفات"
          ]
        },
        bulimia: {
          title: "الشره المرضي العصبي",
          symptoms: [
            "نوبات أكل مفرطة",
            "سلوكيات تعويضية (قيء، ملينات)",
            "انشغال مفرط بالوزن والشكل",
            "تقلبات في الوزن",
            "مشاكل في الأسنان واللثة"
          ],
          causes: [
            "العوامل النفسية والاجتماعية",
            "الضغط للحصول على جسم مثالي",
            "تاريخ من الحميات القاسية",
            "اضطرابات المزاج",
            "تجارب صادمة"
          ],
          treatment: [
            "العلاج المعرفي السلوكي",
            "العلاج الغذائي",
            "مضادات الاكتئاب",
            "العلاج الجماعي",
            "تحسين صورة الجسم"
          ]
        },
        binge_eating: {
          title: "اضطراب الأكل بنهم",
          symptoms: [
            "نوبات أكل مفرطة متكررة",
            "شعور بفقدان السيطرة أثناء الأكل",
            "الأكل بسرعة غير طبيعية",
            "الأكل حتى الشعور بالامتلاء المؤلم",
            "مشاعر الذنب والخجل"
          ],
          causes: [
            "العوامل الوراثية",
            "الضغوط النفسية",
            "تاريخ من الحميات",
            "اضطرابات المزاج",
            "صدمات الطفولة"
          ],
          treatment: [
            "العلاج المعرفي السلوكي",
            "العلاج الجدلي السلوكي",
            "العلاج الغذائي",
            "مضادات الاكتئاب",
            "العلاج الجماعي"
          ]
        }
      }
    },
    personality: {
      title: "اضطرابات الشخصية",
      icon: "🎭",
      color: "bg-purple-50 border-purple-300",
      disorders: {
        borderline: {
          title: "اضطراب الشخصية الحدية",
          symptoms: [
            "علاقات غير مستقرة ومكثفة",
            "تقلبات مزاجية حادة",
            "خوف من الهجر",
            "سلوك متهور ومؤذي للذات",
            "اضطراب في الهوية",
            "مشاعر فراغ مزمنة"
          ],
          causes: [
            "صدمات الطفولة",
            "الإهمال أو سوء المعاملة",
            "العوامل الوراثية",
            "اختلال في وظائف الدماغ",
            "البيئة الأسرية غير المستقرة"
          ],
          treatment: [
            "العلاج الجدلي السلوكي",
            "العلاج المعرفي السلوكي",
            "العلاج النفسي طويل المدى",
            "العلاج الدوائي للأعراض",
            "تعلم مهارات التأقلم"
          ]
        },
        narcissistic: {
          title: "اضطراب الشخصية النرجسية",
          symptoms: [
            "شعور مفرط بالأهمية الذاتية",
            "حاجة مستمرة للإعجاب",
            "نقص في التعاطف",
            "أوهام العظمة",
            "استغلال الآخرين",
            "غطرسة وتكبر"
          ],
          causes: [
            "أساليب التربية المتطرفة",
            "الإفراط في المدح أو النقد",
            "العوامل الوراثية",
            "صدمات الطفولة",
            "عدم الاستقرار العاطفي"
          ],
          treatment: [
            "العلاج النفسي طويل المدى",
            "العلاج المعرفي السلوكي",
            "تطوير التعاطف",
            "العلاج الجماعي",
            "تحسين العلاقات الشخصية"
          ]
        }
      }
    },
    attention: {
      title: "اضطرابات الانتباه والسلوك",
      icon: "🎯",
      color: "bg-orange-50 border-orange-300",
      disorders: {
        adhd: {
          title: "اضطراب نقص الانتباه وفرط الحركة",
          symptoms: [
            "صعوبة في التركيز والانتباه",
            "فرط الحركة والنشاط",
            "الاندفاعية",
            "صعوبة في إنهاء المهام",
            "النسيان وفقدان الأشياء",
            "صعوبة في التنظيم"
          ],
          causes: [
            "العوامل الوراثية",
            "اختلال في كيمياء الدماغ",
            "عوامل بيئية أثناء الحمل",
            "إصابات الدماغ",
            "التعرض للسموم"
          ],
          treatment: [
            "الأدوية المنشطة",
            "العلاج السلوكي",
            "التدريب على المهارات",
            "تعديل البيئة",
            "العلاج الأسري",
            "تقنيات إدارة الوقت"
          ]
        },
        ocd: {
          title: "اضطراب الوسواس القهري",
          symptoms: [
            "أفكار وسواسية متكررة",
            "سلوكيات قهرية متكررة",
            "قلق شديد عند عدم أداء الطقوس",
            "إدراك أن السلوك مفرط",
            "تأثير على الحياة اليومية"
          ],
          causes: [
            "العوامل الوراثية",
            "اختلال في السيروتونين",
            "تغيرات في بنية الدماغ",
            "الضغوط النفسية",
            "العدوى البكتيرية (في بعض الحالات)"
          ],
          treatment: [
            "العلاج المعرفي السلوكي",
            "العلاج بالتعرض ومنع الاستجابة",
            "مثبطات امتصاص السيروتونين",
            "العلاج الأسري",
            "تقنيات الاسترخاء"
          ]
        }
      }
    }
  };

  const categories = Object.keys(disorderCategories);

  const handleDisorderSelect = (disorderId: string) => {
    setSelectedDisorder(selectedDisorder === disorderId ? "" : disorderId);
  };

  const getSelectedDisorder = (): Disorder | null => {
    if (!selectedCategory || !selectedDisorder) return null;
    const category = disorderCategories[selectedCategory];
    return category?.disorders[selectedDisorder] || null;
  };

  const selectedDisorderData = getSelectedDisorder();

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          دليل الاضطرابات النفسية 📚
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          تعرف على الاضطرابات النفسية المختلفة، أعراضها، أسبابها، وطرق علاجها. 
          هذه المعلومات للتوعية فقط وليست بديلاً عن التشخيص المهني.
        </p>
      </div>

      {/* Category Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">اختر فئة الاضطرابات:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((categoryId) => {
            const category = disorderCategories[categoryId];
            return (
              <button
                key={categoryId}
                onClick={() => {
                  setSelectedCategory(categoryId);
                  setSelectedDisorder("");
                }}
                className={`p-4 rounded-lg border-2 transition-all text-right ${
                  selectedCategory === categoryId
                    ? `${category.color} shadow-md scale-105`
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.title}</h3>
                    <p className="text-sm text-gray-600">
                      {Object.keys(category.disorders).length} اضطراب
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disorders List */}
      {selectedCategory && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {disorderCategories[selectedCategory].title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(disorderCategories[selectedCategory].disorders).map(([disorderId, disorder]) => (
              <button
                key={disorderId}
                onClick={() => handleDisorderSelect(disorderId)}
                className={`p-4 rounded-lg border text-right transition-all ${
                  selectedDisorder === disorderId
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <h3 className="font-semibold text-gray-800 mb-2">{disorder.title}</h3>
                <p className="text-sm text-gray-600">
                  انقر للمزيد من التفاصيل
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disorder Details */}
      {selectedDisorderData && (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedDisorderData.title}
              </h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto rounded"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Symptoms */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                  🔍 الأعراض
                </h3>
                <ul className="space-y-2">
                  {selectedDisorderData.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                  🧬 الأسباب
                </h3>
                <ul className="space-y-2">
                  {selectedDisorderData.causes.map((cause, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-yellow-700">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatment */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  💊 العلاج
                </h3>
                <ul className="space-y-2">
                  {selectedDisorderData.treatment.map((treatment, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">ℹ️</span>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">ملاحظة مهمة:</p>
                  <p>
                    هذه المعلومات للتوعية فقط. إذا كنت تعاني من هذه الأعراض، 
                    يُنصح بشدة بالتواصل مع مختص في الصحة النفسية للحصول على تشخيص وعلاج مناسب.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact */}
      <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center justify-center gap-2">
            🆘 في حالة الطوارئ
          </h3>
          <p className="text-red-700 mb-4">
            إذا كنت تواجه أفكار إيذاء النفس أو الآخرين، اطلب المساعدة فوراً من المختصين في الصحة النفسية أو أقرب مستشفى
          </p>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-gray-600 text-xl">📖</span>
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">مصادر إضافية:</p>
            <p>
              للمزيد من المعلومات، يمكنك زيارة المواقع المتخصصة في الصحة النفسية أو 
              التواصل مع الجمعيات النفسية المحلية للحصول على الدعم والإرشاد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
