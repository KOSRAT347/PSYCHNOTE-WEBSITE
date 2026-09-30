// Client-side translations of the techniques served (in Arabic) by convex/emergency.ts.
// Kurdish = DRAFT, needs native review. Arabic comes from the server unchanged.
type T = { title: string; steps: string[]; message: string };
export const TECH: Record<string, Record<string, T>> = {
  stress: {
    en: { title: 'The 4-7-8 breathing technique', steps: ['Sit in a comfortable position', 'Breathe in through your nose for 4 seconds', 'Hold your breath for 7 seconds', 'Breathe out through your mouth for 8 seconds', 'Repeat this 4 times'], message: 'Stress is a normal feeling. This exercise helps your nervous system relax.' },
    ckb: { title: 'تەکنیکی هەناسەدانی 4-7-8', steps: ['لە دانیشتنێکی ئاسوودە دابنیشە', 'بۆ ماوەی 4 چرکە لە لووتەوە هەناسە بدە', 'بۆ ماوەی 7 چرکە هەناسەت ڕابگرە', 'بۆ ماوەی 8 چرکە لە دەمەوە هەناسە بدەرەوە', 'ئەمە 4 جار دووبارە بکەرەوە'], message: 'فشار هەستێکی ئاساییە. ئەم ڕاهێنانە یارمەتی سیستەمی دەمارەکانت دەدات ئارام ببێتەوە.' },
    bdn: { title: 'تەکنیکا هەناسەدانێ 4-7-8', steps: ['ل دانیشتنەکا ب ئارام دانیشە', 'بۆ 4 چرکان ژ لووتی ڤە هەناسەیێ ببە', 'بۆ 7 چرکان هەناسا خۆ ڕاگرە', 'بۆ 8 چرکان ژ دەڤی ڤە هەناسەیێ بدە دەر', 'ئەڤێ 4 جاران دووبارە بکە'], message: 'گرژی هەستەکێ ئاساییە. ئەڤ ڕاهێنانە هاریکاریا سیستەما دەمارێن تە دکەت ئارام ببیت.' },
  },
  negative_thoughts: {
    en: { title: 'Cognitive reframing technique', steps: ['Write down the negative thought', 'Ask yourself: is this 100% true?', 'What is the evidence for and against it?', 'How would I advise a friend in the same situation?', 'Rewrite the thought in a more balanced way'], message: 'Our thoughts are not facts. We can change how we think to feel better.' },
    ckb: { title: 'تەکنیکی دووبارە داڕشتنەوەی بیر', steps: ['بیرە نەرێنییەکە بنووسە', 'لە خۆت بپرسە: ئایا ئەمە 100% ڕاستە؟', 'بەڵگەی لایەنگر و دژ چییە؟', 'ئەگەر هاوڕێیەک لە هەمان بارودۆخدا بوایە چی ئامۆژگاری دەکەم؟', 'بیرەکە بە شێوەیەکی هاوسەنگتر دووبارە بنووسەوە'], message: 'بیرەکانمان ڕاستی نین. دەتوانین شێوازی بیرکردنەوەمان بگۆڕین بۆ ئەوەی باشتر هەست بکەین.' },
    bdn: { title: 'تەکنیکا ڤەگوهارتنا ئەندێشەیێ', steps: ['ئەندێشا نەرێنی بنڤیسە', 'ژ خۆ بپرسە: ئەرێ ئەڤە 100% ڕاستە؟', 'بەلگەیێن ل دژ و ل گەل چنە؟', 'ئەز دێ چ ئامۆژگاریا هەڤالەکێ ل هەمان بارودۆخی کەم؟', 'ئەندێشێ ب ڕەنگەکێ هاوسەنگتر ڤە بنڤیسە'], message: 'ئەندێشێن مە ڕاستی نینن. ئەم دشێین ڕێبازا ئەندێشەکرنا خۆ بگوهۆڕین دا باشتر هەست پێ بکەین.' },
  },
  anxiety_attack: {
    en: { title: 'The 5-4-3-2-1 grounding technique', steps: ['Look around and name 5 things you see', 'Touch 4 things with different textures', 'Listen for 3 different sounds', 'Notice 2 different smells', 'Taste one thing, or focus on the taste in your mouth'], message: 'Anxiety attacks are temporary and not harmful. This exercise brings you back to the present.' },
    ckb: { title: 'تەکنیکی 5-4-3-2-1 بۆ گەڕانەوە بۆ ئێستا', steps: ['سەیری دەوروبەرت بکە و 5 شت ناو ببە کە دەیانبینیت', 'دەست بە 4 شت بدە کە ملسیان جیاوازە', 'گوێ لە 3 دەنگی جیاواز بگرە', 'هەست بە 2 بۆنی جیاواز بکە', 'تامی یەک شت بکە یان سەرنج بدە لە تامی دەمت'], message: 'هێرشی نیگەرانی کاتین و زیانبەخش نین. ئەم ڕاهێنانە دەتگەڕێنێتەوە بۆ ئێستا.' },
    bdn: { title: 'تەکنیکا 5-4-3-2-1 بۆ ڤەگەڕیانێ بۆ ئێستێ', steps: ['ل دەوروبەرێ خۆ بنێڕە و 5 تشتان ناڤ بکە یێن تو دبینی', 'دەستێ خۆ ل 4 تشتان بدە یێن ب ڕەنگێن جودا', 'گوهێ خۆ بدە 3 دەنگێن جودا', 'هەستێ ب 2 بۆنێن جودا بکە', 'تامێ تشتەکی بکە یان سەرنجێ بدە تامێ دەڤێ خۆ'], message: 'هێرشێن دلەڕاوکێ دەمکینە و زیانبەخش نینن. ئەڤ ڕاهێنانە تە ڤەدگەڕینیت بۆ ئێستێ.' },
  },
  sudden_distress: {
    en: { title: 'Progressive muscle relaxation', steps: ['Start with your toes: tense them, then relax', 'Move to your leg muscles: tense, then relax', 'Tense your stomach muscles, then relax', 'Tense your shoulder and neck muscles, then relax', 'Finally, tense your face muscles, then relax'], message: 'Sudden distress will pass. Your body needs to relax and calm down.' },
    ckb: { title: 'تەکنیکی پشووی ماسولکەیی هەنگاو بە هەنگاو', steps: ['لە پەنجەی پێیەکانتەوە دەستپێبکە: توند بیانگرە پاشان شلیان بکەرەوە', 'بچۆ بۆ ماسولکەی قاچەکان: توند بیانگرە پاشان شلیان بکەرەوە', 'ماسولکەی سکت توند بگرە پاشان شلی بکەرەوە', 'ماسولکەی شان و ملت توند بگرە پاشان شلیان بکەرەوە', 'لە کۆتاییدا ماسولکەی ڕووت توند بگرە پاشان شلیان بکەرەوە'], message: 'تەنگانەی لەناکاو تێدەپەڕێت. جەستەت پێویستی بە پشوو و ئارامییە.' },
    bdn: { title: 'تەکنیکا حەوانەوا ماسولکان پێنگاڤ ب پێنگاڤ', steps: ['ژ تیپێن پێیێن خۆ دەستپێ بکە: توند بگرە پاشی شل بکە', 'بچە ماسولکێن پێیان: توند بگرە پاشی شل بکە', 'ماسولکێن زکێ توند بگرە پاشی شل بکە', 'ماسولکێن شان و ملی توند بگرە پاشی شل بکە', 'د دوماهیێ دا ماسولکێن ڕویی توند بگرە پاشی شل بکە'], message: 'تەنگاڤیا ناکاو دێ بورت. لەشێ تە پێدڤی ب حەوانەوە و ئارامیێ یە.' },
  },
};
