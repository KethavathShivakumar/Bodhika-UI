import React, { useState } from 'react';

export default function ResourcePreviewModal({ resource, onClose }) {
  const [downloading, setDownloading] = useState(false);

  if (!resource) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Mock instant file download trigger
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(resource, null, 2)], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = resource.fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#ff6551] flex items-center justify-center font-bold shadow-md">
              <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#ff6551] uppercase">{resource.company}</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-bold">{resource.pages} Pages</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-bold">{resource.questionsCount} Questions</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight mt-0.5">{resource.fileName}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="p-5 rounded-3xl bg-teal-50/60 border border-teal-100">
            <h4 className="font-extrabold text-sm text-slate-900">{resource.title}</h4>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{resource.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Document Preview & Sample Solutions
              </span>
              <span className="text-xs text-[#0a4b56] font-extrabold px-3 py-1 rounded-full bg-teal-50">Verified Question Bank</span>
            </div>

            {resource.contentPreview && resource.contentPreview.map((item, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white text-xs flex items-center justify-center font-black shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </span>
                  <div className="space-y-2 flex-1">
                    <p className="text-xs font-extrabold text-slate-900 leading-relaxed">{item.q}</p>
                    <div className="text-xs text-slate-600 bg-white p-3.5 rounded-2xl border-l-4 border-[#0a4b56] border-slate-100 shadow-sm font-medium leading-relaxed">
                      <span className="font-extrabold text-[#0a4b56]">Solution / Explanation: </span>
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close Preview
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white text-xs font-extrabold hover:shadow-lg hover:shadow-[#0a4b56]/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {downloading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Downloading {resource.fileName}...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download PDF ({resource.pages} pgs)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

