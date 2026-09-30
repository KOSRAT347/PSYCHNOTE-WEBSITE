export function AssessmentNotice() {
  return (
    <div className="m-6 mb-0 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
      هذا تقييم توعوي مختصر وغير معتمد علمياً، ولا يُعد تشخيصاً. للفحص الأولي بمقاييس معتمدة عالمياً استخدم تبويب «مقاييس معتمدة».
      <button onClick={() => window.dispatchEvent(new CustomEvent('psychnote:goto', { detail: 'screening' }))} className="mr-2 underline">
        افتح المقاييس المعتمدة
      </button>
    </div>
  );
}
