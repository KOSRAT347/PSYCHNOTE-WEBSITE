import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { Assessment } from "./components/Assessment";
import { MoodTracker } from "./components/MoodTracker";
import { EmergencySupport } from "./components/EmergencySupport";
import { DailyContent } from "./components/DailyContent";
import { StudentCorner } from "./components/StudentCorner";
import { SafetyPage } from "./components/SafetyPage";
import { DisordersInfo } from "./components/DisordersInfo";
import { TheoriesPage } from "./components/TheoriesPage";
import { Menu, MenuPage } from "./components/Menu";
import { CrisisBar } from "./components/CrisisBar";
import { AssessmentNotice } from "./components/AssessmentNotice";
import { ScreeningScales } from "./components/ScreeningScales";
import { AccessibilityControls } from "./components/AccessibilityControls";
import { LanguageToggle } from "./components/LanguageToggle";
import { useTranslation } from "./contexts/TranslationContext";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <div className="flex items-center gap-3">
          {/* Cihan University Duhok Logo */}
          <a href="https://duhokcihan.edu.krd/ar" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <img
              src="https://i.ibb.co/tPzWHtjF/logo-cihan.png"
              alt="Cihan University Duhok"
              className="h-12 w-auto object-contain"
            />
          </a>
          <div className="w-px h-8 bg-gray-300 mx-1" />
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🧠</span>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PSYCHNOTE
            </h2>
            <p className="text-xs text-gray-600">{t("appDescription")}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <AccessibilityControls />
          <LanguageToggle />
          <Menu onMenuClick={() => setShowMenu(true)} />
        </div>
      </header>
      <main className="flex-1 p-4">
        {showMenu ? (
          <div>
            <button
              onClick={() => setShowMenu(false)}
              className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t("backToHome")}
            </button>
            <MenuPage />
          </div>
        ) : (
          <Content />
        )}
      </main>
      <footer className="bg-white border-t py-4 px-6 text-center text-xs text-gray-500">
        <p>{t("copyrightText")}</p>
        <p>{t("footerIp")}</p>
        <p>{t("developerLine")}</p>
      </footer>
      <Toaster />
    </div>
  );
}

export default App;

function Content() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const h = (e: Event) => setActiveTab((e as CustomEvent<string>).detail);
    window.addEventListener("psychnote:goto", h);
    return () => window.removeEventListener("psychnote:goto", h);
  }, []);

  const tabs = [
    { id: "dashboard", label: t("home"), icon: "🏠" },
    { id: "mood", label: t("mood"), icon: "😊" },
    { id: "assessment", label: t("assessment"), icon: "📋" },
    { id: "emergency", label: t("emergency"), icon: "🚑" },
    { id: "content", label: t("content"), icon: "📚" },
    { id: "student", label: t("student"), icon: "🎓" },
    { id: "theories", label: t("theories"), icon: "📖" },
    { id: "safety", label: t("safety"), icon: "🛡️" },
    { id: "disorders", label: t("disorders"), icon: "🧬" },
    { id: "screening", label: t("screening"), icon: "📝" },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-0">
      <CrisisBar onHelp={() => setActiveTab("emergency")} />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("welcomeMessage")}
        </h1>
        <p className="text-gray-600">{t("welcomeSubtext")}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6 bg-white rounded-lg p-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "mood" && <MoodTracker />}
        {activeTab === "assessment" && (<><AssessmentNotice /><Assessment /></>)}
        {activeTab === "emergency" && <EmergencySupport />}
        {activeTab === "content" && <DailyContent />}
        {activeTab === "student" && <StudentCorner />}
        {activeTab === "theories" && <TheoriesPage />}
        {activeTab === "safety" && <SafetyPage />}
        {activeTab === "disorders" && <DisordersInfo />}
        {activeTab === "screening" && <ScreeningScales />}
      </div>

      {/* Mobile bottom navigation */}
      {showMore && (
        <div className="md:hidden fixed bottom-16 inset-x-2 z-20 grid grid-cols-2 gap-1 rounded-lg border bg-white p-2 shadow-lg">
          {tabs.slice(4).map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowMore(false); }}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${activeTab === tab.id ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}>
              <span>{tab.icon}</span><span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 flex border-t bg-white">
        {tabs.slice(0, 4).map((tab) => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowMore(false); }}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${activeTab === tab.id ? "text-blue-700 font-medium" : "text-gray-600"}`}>
            <span className="text-lg">{tab.icon}</span><span>{tab.label}</span>
          </button>
        ))}
        <button onClick={() => setShowMore(!showMore)} className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] text-gray-600">
          <span className="text-lg">⋯</span><span>{t("more")}</span>
        </button>
      </nav>
    </div>
  );
}
