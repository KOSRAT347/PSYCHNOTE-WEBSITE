import { createContext, useContext, useState, ReactNode } from 'react';

import { Language, LANGUAGES, extra } from '../i18n/extra';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  ar: {
    // Header
    appName: 'PSYCHNOTE',
    appDescription: 'منصة توعوية لمتابعة حالتك النفسية وتقديم دعم أولي غير تشخيصي',
    
    // Navigation
    home: 'الرئيسية',
    mood: 'مزاجي',
    assessment: 'تقييم ذاتي',
    emergency: 'إسعاف نفسي',
    content: 'محتوى يومي',
    student: 'ركن الطالب',
    safety: 'أمان نفسي',
    disorders: 'الاضطرابات',
    menu: 'القائمة',
    backToHome: '← العودة للرئيسية',
    
    // Dashboard
    welcomeMessage: 'أهلاً بك في PSYCHNOTE! 👋',
    welcomeSubtext: 'كيف حالك اليوم؟ دعنا نعتني بصحتك النفسية معاً',
    
    // Mood Tracker
    moodTracker: 'متتبع المزاج',
    todayMood: 'مزاجك اليوم',
    howDoYouFeel: 'كيف تشعر اليوم؟',
    veryHappy: 'سعيد جداً',
    happy: 'سعيد',
    neutral: 'عادي',
    sad: 'حزين',
    verySad: 'حزين جداً',
    whyReason: 'ما السبب؟ (اختياري)',
    reasonPlaceholder: 'مثال: نجحت في امتحان، أو كان يوم صعب في العمل...',
    recordMood: 'سجل مزاجك',
    updateMoodAnytime: 'يمكنك تحديث مزاجك في أي وقت',
    statistics: 'الإحصائيات',
    overallAverage: 'المتوسط العام:',
    numberOfDays: 'عدد الأيام:',
    emotionDistribution: 'توزيع المشاعر',
    last7Days: 'آخر 7 أيام',
    
    // Assessment
    selfAssessment: 'التقييم الذاتي',
    assessmentDescription: 'اختر نوع التقييم الذي تريد إجراءه. هذه التقييمات للتوعية فقط وليست تشخيصاً طبياً.',
    anxietyAssessment: 'تقييم القلق',
    depressionAssessment: 'تقييم الاكتئاب',
    stressAssessment: 'تقييم التوتر',
    selfEsteemAssessment: 'تقدير الذات',
    questionsAndTime: '5 أسئلة • 3 دقائق',
    previousAssessments: 'التقييمات السابقة',
    assessmentComplete: 'تم إكمال التقييم',
    totalScore: 'النتيجة الإجمالية',
    recommendations: 'التوصيات:',
    takeAnotherAssessment: 'إجراء تقييم آخر',
    cancelAssessment: 'إلغاء التقييم',
    
    // Scale labels
    stronglyDisagree: 'لا أوافق بشدة',
    disagree: 'لا أوافق',
    neutral_scale: 'محايد',
    agree: 'أوافق',
    stronglyAgree: 'أوافق بشدة',
    
    // Emergency Support
    emergencySupport: 'الإسعاف النفسي',
    emergencyDescription: 'تقنيات سريعة للتعامل مع القلق والتوتر والضغط النفسي',
    breathingExercises: 'تمارين التنفس',
    relaxationTechniques: 'تقنيات الاسترخاء',
    groundingTechniques: 'تقنيات التأريض',
    quickHelp: 'مساعدة سريعة',
    
    // Daily Content
    dailyContent: 'المحتوى اليومي',
    dailyContentDescription: 'معلومات ونصائح يومية للصحة النفسية',
    todaysContent: 'محتوى اليوم',
    psychologicalFact: 'حقيقة نفسية',
    commonMyth: 'خطأ شائع',
    dailyExercise: 'تمرين يومي',
    
    // Student Corner
    studentCorner: 'ركن الطالب',
    studentDescription: 'موارد ونصائح خاصة للطلاب للتعامل مع ضغوط الدراسة',
    
    // Safety Page
    safetyPageTitle: 'متى أحتاج مساعدة مختص؟',
    safetyDescription: 'هذه الصفحة تساعدك على معرفة متى تحتاج للتواصل مع مختص في الصحة النفسية',
    importantWarning: 'تحذير مهم',
    warningText: 'إذا كنت تفكر في إيذاء نفسك أو الآخرين، أو تشعر بأنك في خطر فوري، يرجى التواصل مع خدمات الطوارئ أو مختص في الصحة النفسية فوراً.',
    warningSigns: 'علامات تستدعي التدخل المهني',
    selfHarmThoughts: 'أفكار إيذاء النفس',
    severeDepression: 'اكتئاب شديد',
    panicAttacks: 'نوبات هلع متكررة',
    whenToSeekHelp: 'متى تطلب المساعدة المهنية؟',
    physicalSymptoms: 'الأعراض الجسدية:',
    lifeImpact: 'التأثير على الحياة:',
    professionalHelpTypes: 'أنواع المساعدة المهنية',
    psychiatrist: 'طبيب نفسي',
    psychologist: 'أخصائي نفسي',
    counselor: 'مستشار نفسي',
    
    // Disorders Info
    disordersInfo: 'الاضطرابات النفسية',
    disordersDescription: 'تعرف على الاضطرابات النفسية الشائعة وأعراضها وطرق العلاج',
    depression: 'الاكتئاب',
    anxiety: 'اضطرابات القلق',
    bipolar: 'اضطراب ثنائي القطب',
    schizophrenia: 'الشيزوفرينيا',
    autism: 'اضطراب طيف التوحد',
    mainSymptoms: 'الأعراض الرئيسية',
    possibleCauses: 'الأسباب المحتملة',
    treatmentSupport: 'العلاج والدعم',
    
    // Menu Page
    whyThisWebsite: 'لماذا هذا الموقع؟',
    mainGoal: 'الهدف الرئيسي',
    scientificContent: 'المحتوى العلمي',
    appFeatures: 'مميزات PSYCHNOTE',
    socialLinks: 'روابط التواصل',
    aboutDeveloper: 'عن المطور',
    importantNotes: 'ملاحظات مهمة',
    contentNature: 'طبيعة المحتوى',
    whenToSeekProfessionalHelp: 'متى تطلب المساعدة المهنية',
    
    // Common
    important: 'مهم:',
    warning: 'تنبيه مهم:',
    disclaimer: 'هذه المعلومات للتوعية فقط وليست بديلاً عن الاستشارة المهنية.',
    copyrightText: '© 2025 PSYCHNOTE. All rights reserved.',
    developedBy: 'تم التطوير بواسطة KOSRAT A. JOQI',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Success/Error messages
    moodRecordedSuccess: 'تم تسجيل مزاجك بنجاح!',
    moodRecordError: 'حدث خطأ في تسجيل المزاج',
    assessmentCompleteSuccess: 'تم إكمال التقييم بنجاح!',
    assessmentSubmitError: 'حدث خطأ في إرسال التقييم',
  },
  en: {
    // Header
    appName: 'PSYCHNOTE',
    appDescription: 'An awareness platform for monitoring your mental health and providing initial non-diagnostic support',
    
    // Navigation
    home: 'Home',
    mood: 'My Mood',
    assessment: 'Self Assessment',
    emergency: 'Mental First Aid',
    content: 'Daily Content',
    student: 'Student Corner',
    safety: 'Mental Safety',
    disorders: 'Disorders',
    menu: 'Menu',
    backToHome: '← Back to Home',
    
    // Dashboard
    welcomeMessage: 'Welcome to PSYCHNOTE! 👋',
    welcomeSubtext: 'How are you feeling today? Let us take care of your mental health together',
    
    // Mood Tracker
    moodTracker: 'Mood Tracker',
    todayMood: 'Your Mood Today',
    howDoYouFeel: 'How do you feel today?',
    veryHappy: 'Very Happy',
    happy: 'Happy',
    neutral: 'Neutral',
    sad: 'Sad',
    verySad: 'Very Sad',
    whyReason: 'What\'s the reason? (Optional)',
    reasonPlaceholder: 'Example: Passed an exam, or had a difficult day at work...',
    recordMood: 'Record Your Mood',
    updateMoodAnytime: 'You can update your mood anytime',
    statistics: 'Statistics',
    overallAverage: 'Overall Average:',
    numberOfDays: 'Number of Days:',
    emotionDistribution: 'Emotion Distribution',
    last7Days: 'Last 7 Days',
    
    // Assessment
    selfAssessment: 'Self Assessment',
    assessmentDescription: 'Choose the type of assessment you want to take. These assessments are for awareness only and not medical diagnosis.',
    anxietyAssessment: 'Anxiety Assessment',
    depressionAssessment: 'Depression Assessment',
    stressAssessment: 'Stress Assessment',
    selfEsteemAssessment: 'Self-Esteem Assessment',
    questionsAndTime: '5 questions • 3 minutes',
    previousAssessments: 'Previous Assessments',
    assessmentComplete: 'Assessment Complete',
    totalScore: 'Total Score',
    recommendations: 'Recommendations:',
    takeAnotherAssessment: 'Take Another Assessment',
    cancelAssessment: 'Cancel Assessment',
    
    // Scale labels
    stronglyDisagree: 'Strongly Disagree',
    disagree: 'Disagree',
    neutral_scale: 'Neutral',
    agree: 'Agree',
    stronglyAgree: 'Strongly Agree',
    
    // Emergency Support
    emergencySupport: 'Mental First Aid',
    emergencyDescription: 'Quick techniques to deal with anxiety, stress, and psychological pressure',
    breathingExercises: 'Breathing Exercises',
    relaxationTechniques: 'Relaxation Techniques',
    groundingTechniques: 'Grounding Techniques',
    quickHelp: 'Quick Help',
    
    // Daily Content
    dailyContent: 'Daily Content',
    dailyContentDescription: 'Daily information and tips for mental health',
    todaysContent: 'Today\'s Content',
    psychologicalFact: 'Psychological Fact',
    commonMyth: 'Common Myth',
    dailyExercise: 'Daily Exercise',
    
    // Student Corner
    studentCorner: 'Student Corner',
    studentDescription: 'Resources and tips specifically for students to deal with academic stress',
    
    // Safety Page
    safetyPageTitle: 'When Do I Need Professional Help?',
    safetyDescription: 'This page helps you know when you need to contact a mental health professional',
    importantWarning: 'Important Warning',
    warningText: 'If you are thinking about harming yourself or others, or feel you are in immediate danger, please contact emergency services or a mental health professional immediately.',
    warningSigns: 'Warning Signs That Require Professional Intervention',
    selfHarmThoughts: 'Self-Harm Thoughts',
    severeDepression: 'Severe Depression',
    panicAttacks: 'Recurring Panic Attacks',
    whenToSeekHelp: 'When to Seek Professional Help?',
    physicalSymptoms: 'Physical Symptoms:',
    lifeImpact: 'Impact on Life:',
    professionalHelpTypes: 'Types of Professional Help',
    psychiatrist: 'Psychiatrist',
    psychologist: 'Psychologist',
    counselor: 'Counselor',
    
    // Disorders Info
    disordersInfo: 'Mental Disorders',
    disordersDescription: 'Learn about common mental disorders, their symptoms, and treatment methods',
    depression: 'Depression',
    anxiety: 'Anxiety Disorders',
    bipolar: 'Bipolar Disorder',
    schizophrenia: 'Schizophrenia',
    autism: 'Autism Spectrum Disorder',
    mainSymptoms: 'Main Symptoms',
    possibleCauses: 'Possible Causes',
    treatmentSupport: 'Treatment & Support',
    
    // Menu Page
    whyThisWebsite: 'Why This Website?',
    mainGoal: 'Main Goal',
    scientificContent: 'Scientific Content',
    appFeatures: 'PSYCHNOTE Features',
    socialLinks: 'Social Links',
    aboutDeveloper: 'About the Developer',
    importantNotes: 'Important Notes',
    contentNature: 'Content Nature',
    whenToSeekProfessionalHelp: 'When to Seek Professional Help',
    
    // Common
    important: 'Important:',
    warning: 'Important Notice:',
    disclaimer: 'This information is for awareness only and is not a substitute for professional consultation.',
    copyrightText: '© 2025 PSYCHNOTE. All rights reserved.',
    developedBy: 'Developed by KOSRAT A. JOQI',
    allRightsReserved: 'All rights reserved',
    
    // Success/Error messages
    moodRecordedSuccess: 'Your mood has been recorded successfully!',
    moodRecordError: 'An error occurred while recording your mood',
    assessmentCompleteSuccess: 'Assessment completed successfully!',
    assessmentSubmitError: 'An error occurred while submitting the assessment',
  }
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('psychnote-lang') as Language | null;
      if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;
    } catch { /* storage unavailable */ }
    return 'ar';
  });
  const setLanguage = (lang: Language) => {
    setLang(lang);
    try { localStorage.setItem('psychnote-lang', lang); } catch { /* ignore */ }
  };
  const dir = LANGUAGES.find((l) => l.code === language)?.dir ?? 'rtl';

  const t = (key: string): string => {
    const base = translations as Record<string, Record<string, string>>;
    return (
      base[language]?.[key] ?? extra[language]?.[key] ??
      base.ar[key] ?? extra.ar[key] ?? key
    );
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      <div dir={dir} className={language === 'en' ? 'font-english' : 'font-arabic'}>
        {children}
      </div>
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
