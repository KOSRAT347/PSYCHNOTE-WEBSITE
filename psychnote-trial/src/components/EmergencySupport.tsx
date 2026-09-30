import { useTranslation } from "../contexts/TranslationContext";
import { TECH } from "../i18n/emergencyTechniques";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { getUserSessionId } from "../utils/userSession";

export function EmergencySupport() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionId, setSessionId] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  const userId = getUserSessionId();
  const serverTech = useQuery(
    api.emergency.getEmergencyTechnique,
    selectedType ? { type: selectedType as any } : "skip"
  );
  const startSession = useMutation(api.emergency.startEmergencySession);
  const completeSession = useMutation(api.emergency.completeEmergencySession);
  const userSessions = useQuery(api.emergency.getUserEmergencySessions, { userId });
  const { language, t } = useTranslation();
  const tr = TECH[selectedType]?.[language];
  const technique = serverTech && tr ? { ...serverTech, ...tr } : serverTech;

  const emergencyTypes = [
    {
      id: "stress",
      title: t("e_stress_t"),
      description: t("e_stress_d"),
      icon: "😤",
      color: "bg-red-100 border-red-300 hover:bg-red-200"
    },
    {
      id: "negative_thoughts",
      title: t("e_neg_t"),
      description: t("e_neg_d"),
      icon: "🌧️",
      color: "bg-gray-100 border-gray-300 hover:bg-gray-200"
    },
    {
      id: "anxiety_attack",
      title: t("e_anx_t"),
      description: t("e_anx_d"),
      icon: "💨",
      color: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
    },
    {
      id: "sudden_distress",
      title: t("e_sud_t"),
      description: t("e_sud_d"),
      icon: "😔",
      color: "bg-blue-100 border-blue-300 hover:bg-blue-200"
    }
  ];

  const handleStartSession = async (type: string) => {
    try {
      const id = await startSession({ userId, type: type as any });
      setSessionId(id);
      setSelectedType(type);
      setCurrentStep(0);
      setIsActive(true);
      toast.success(t("e_started"));
    } catch (error) {
      toast.error(t("e_start_err"));
    }
  };

  const handleCompleteSession = async () => {
    try {
      await completeSession({ userId, sessionId: sessionId as any });
      setIsActive(false);
      setSelectedType("");
      setCurrentStep(0);
      setSessionId("");
      toast.success(t("e_done"));
    } catch (error) {
      toast.error(t("e_done_err"));
    }
  };

  const nextStep = () => {
    if (technique && currentStep < technique.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteSession();
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setSelectedType("");
    setCurrentStep(0);
    setSessionId("");
  };

  if (isActive && technique) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">
              {emergencyTypes.find(t => t.id === selectedType)?.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{technique.title}</h2>
            <p className="text-gray-600">{technique.message}</p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t("e_step").replace("{a}", String(currentStep + 1)).replace("{b}", String(technique.steps.length))}</span>
              <span>{Math.round(((currentStep + 1) / technique.steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / technique.steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-white p-8 rounded-lg border shadow-sm text-center">
            <div className="text-6xl mb-6">🧘‍♀️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {technique.steps[currentStep]}
            </h3>
            
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={resetSession}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t("e_stop")}
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {currentStep < technique.steps.length - 1 ? t("e_next") : t("e_finish")}
              </button>
            </div>
          </div>

          {/* Encouragement */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800">
              {t("e_encourage")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("e_head")}</h2>
      <p className="text-gray-600 mb-6">
        {t("e_sub")}
      </p>

      {/* Emergency Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {emergencyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleStartSession(type.id)}
            className={`p-6 rounded-lg border-2 text-right transition-all ${type.color}`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{type.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Sessions */}
      {userSessions && userSessions.length > 0 && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("e_recent")}</h3>
          <div className="space-y-3">
            {userSessions.slice(0, 5).map((session) => {
              return (
                <div key={session._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🆘</span>
                    <div>
                      <div className="font-medium text-gray-800">{session.technique}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(session._creationTime).toLocaleDateString('ar')}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    session.completed 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {session.completed ? t("e_complete") : t("e_incomplete")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Self-Care Tips */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-xl">💙</span>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">{t("e_remember")}</p>
            <p>
              {t("e_note")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
