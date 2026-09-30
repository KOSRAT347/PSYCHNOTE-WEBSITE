interface MenuProps {
  onMenuClick: () => void;
}

export function Menu({ onMenuClick }: MenuProps) {
  return (
    <button
      onClick={onMenuClick}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="القائمة"
    >
      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}

export function MenuPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <a href="https://duhokcihan.edu.krd/ar" target="_blank" rel="noopener noreferrer">
              <img
                src="https://i.ibb.co/tPzWHtjF/logo-cihan.png"
                alt="Cihan University Duhok"
                className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </a>
            <div className="w-px h-12 bg-gray-300" />
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">🧠</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            PSYCHNOTE
          </h1>
          <p className="text-gray-600">منصة توعوية لمتابعة حالتك النفسية وتقديم دعم أولي غير تشخيصي</p>
        </div>

        {/* Affiliation Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg mb-8 text-white text-center">

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <a href="https://duhokcihan.edu.krd/ar" target="_blank" rel="noopener noreferrer">
              <img src="https://i.ibb.co/tPzWHtjF/logo-cihan.png" alt="Cihan University Duhok" className="h-14 w-auto object-contain hover:opacity-80 transition-opacity" />
            </a>
            <div style={{ width: "1px", height: "48px", backgroundColor: "rgba(255,255,255,0.4)" }} />
            <div>
              <p className="text-lg font-bold">زانکویا جیهان دهوک</p>
              <p className="text-sm opacity-90">بەشی پەروەردا گشتی - دەرونناسی</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Why This Website Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">❓</span>
              </div>
              لماذا هذا الموقع؟
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              أنشأت هذا الموقع بصفتي طالباً في قسم علم النفس، بهدف نشر الوعي بالصحة النفسية وتقديم محتوى نفسي مبسّط يساعد على فهم المشاعر والتعامل مع الضغوط اليومية بأسلوب علمي وإنساني.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">🎯</span>
                  الهدف الرئيسي
                </h3>
                <p className="text-gray-600 text-sm">
                  نشر الوعي بالصحة النفسية وتقديم الدعم الأولي للأشخاص الذين يحتاجون المساعدة
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-green-600">📚</span>
                  المحتوى العلمي
                </h3>
                <p className="text-gray-600 text-sm">
                  جميع المعلومات مبنية على أسس علمية ومصادر موثوقة في مجال علم النفس
                </p>
              </div>
            </div>
          </div>

          {/* App Features */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-2xl border border-indigo-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">🧠</span>
              </div>
              مميزات PSYCHNOTE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl mb-3">😊</div>
                <h3 className="font-semibold text-gray-800 mb-2">متتبع المزاج</h3>
                <p className="text-gray-600 text-sm">
                  تتبع مزاجك اليومي وراقب تحسن حالتك النفسية
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-gray-800 mb-2">التقييم الذاتي</h3>
                <p className="text-gray-600 text-sm">
                  اختبارات نفسية للتوعية وفهم حالتك بشكل أفضل
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl mb-3">🚑</div>
                <h3 className="font-semibold text-gray-800 mb-2">الإسعاف النفسي</h3>
                <p className="text-gray-600 text-sm">
                  تقنيات فورية للتعامل مع القلق والتوتر
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-800 mb-2">المحتوى اليومي</h3>
                <p className="text-gray-600 text-sm">
                  معلومات يومية ونصائح علمية للصحة النفسية
                </p>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">🔗</span>
              </div>
              روابط التواصل
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              يمكنكم متابعتي والتواصل معي عبر المنصّات التالية:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/k0srat1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 text-xl mb-1">Instagram</div>
                  <div className="text-gray-500 mb-2">@k0srat1</div>
                  <div className="text-sm text-gray-600">
                    تابعني للحصول على نصائح يومية للصحة النفسية
                  </div>
                </div>
              </a>

              {/* Telegram Link */}
              <a
                href="https://t.me/ETUU4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 text-xl mb-1">Telegram</div>
                  <div className="text-gray-500 mb-2">@ETUU4</div>
                  <div className="text-sm text-gray-600">
                    للتواصل المباشر والاستفسارات
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Developer Info */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-8 rounded-2xl border border-yellow-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">👨‍💻</span>
              </div>
              عن المطور
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">KOSRAT A. JOQI</h3>
                  <p className="text-gray-600">طالب علم النفس</p>
                  <p className="text-gray-500 text-sm">طالب في جامعة جيهان دهوك</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">🎓</span>
                  <p className="text-gray-700">
                    طالب في قسم علم النفس، مهتم بنشر الوعي النفسي
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">💡</span>
                  <p className="text-gray-700">
                    مؤمن بأهمية الصحة النفسية وضرورة توفير الدعم للجميع
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">🌟</span>
                  <p className="text-gray-700">
                    هدفي مساعدة الأشخاص على فهم مشاعرهم والتعامل معها بطريقة صحية
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-br from-red-50 to-pink-100 p-8 rounded-2xl border border-red-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">⚠️</span>
              </div>
              ملاحظات مهمة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <span className="text-red-600">📋</span>
                  طبيعة المحتوى
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• هذا الموقع مخصص للتوعية والتثقيف النفسي</li>
                  <li>• المحتوى لا يغني عن الاستشارة المهنية</li>
                  <li>• لا يُستخدم للتشخيص الطبي</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <span className="text-red-600">🏥</span>
                  متى تطلب المساعدة المهنية
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• عند الشعور بأفكار إيذاء النفس</li>
                  <li>• في حالة الاكتئاب الشديد</li>
                  <li>• عند تأثر الحياة اليومية بشكل كبير</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2">© 2025 PSYCHNOTE. All rights reserved.</p>
            <p className="text-gray-500 text-sm">جميع الحقوق محفوظة • تم التطوير بواسطة KOSRAT A. JOQI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
