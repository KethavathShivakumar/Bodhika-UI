import React from 'react';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls Bar */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-[22px]">verified</span>
            <span className="font-extrabold text-xs text-slate-800">Verified Academic Credential</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white text-xs font-extrabold hover:shadow-md hover:shadow-[#0a4b56]/20 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div className="p-4 sm:p-8 overflow-y-auto flex items-center justify-center bg-slate-100/50">
          <div 
            id="printable-certificate"
            className="w-full bg-white text-gray-900 border-[8px] sm:border-[12px] border-double border-teal-900/30 p-6 sm:p-10 rounded-2xl relative shadow-2xl"
            style={{ maxWidth: '720px', minHeight: '500px' }}
          >
            {/* Corner Motifs */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#0a4b56]"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#0a4b56]"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#0a4b56]"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#0a4b56]"></div>

            {/* Header / Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0a4b56] text-xs tracking-widest uppercase font-extrabold mb-3">
                Bodhika Academic Council
              </div>
              <h1 className="font-serif text-3xl font-black tracking-tight text-slate-900 uppercase">
                {certificate.title}
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-extrabold mt-1">
                Official Examination Certification
              </p>
            </div>

            {/* Body */}
            <div className="text-center my-6 space-y-3">
              <p className="text-sm text-slate-500 italic font-serif">This is proudly presented to</p>
              <h2 className="text-2xl font-black text-slate-900 tracking-normal border-b-2 border-amber-400/60 pb-2 inline-block px-8">
                {certificate.recipientName}
              </h2>
              <p className="text-xs text-slate-500 font-semibold">Student ID: {certificate.studentId}</p>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed pt-2 font-medium">
                For demonstrating exceptional aptitude, mastery, and successfully clearing the examination:
              </p>
              <p className="text-lg font-extrabold text-[#0a4b56] pt-1">
                {certificate.examName}
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
                <span>Score Attained: {certificate.score}</span>
                <span>•</span>
                <span>Status: {certificate.grade}</span>
              </div>
            </div>

            {/* Footer & Signature */}
            <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-3 items-end text-center">
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400 font-bold">Verification ID:</div>
                <div className="text-xs font-mono font-black text-slate-800">{certificate.verificationCode}</div>
                <div className="text-[10px] text-slate-400 font-medium mt-1">Issued on {certificate.issueDate}</div>
              </div>

              {/* Gold Seal Motif */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-amber-400 bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center text-amber-800 shadow-lg">
                  <span className="material-symbols-outlined text-[32px]">verified</span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-base text-slate-800 font-bold">K. Riyatrix</div>
                <div className="border-t border-slate-400 w-32 ml-auto mt-1"></div>
                <div className="text-[11px] font-bold text-slate-600 mt-1">{certificate.signedBy}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

