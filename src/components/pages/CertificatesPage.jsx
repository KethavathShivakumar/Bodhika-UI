import React from 'react';

export default function CertificatesPage({ certificates, onViewCertificate }) {
  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-teal-100 border border-white/10",
      subText: "text-teal-100/90 font-medium",
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP METRICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        <div className="bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-slate-600/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300">Total Certificates</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{certificates.length} Earned</div>
            <div className="text-[9px] sm:text-[11px] text-slate-300 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Verified Credentials</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">workspace_premium</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-amber-300/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-900/80">Highest Distinction</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">Grade A+</div>
            <div className="text-[9px] sm:text-[11px] text-slate-900 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Top 2% Candidate</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">stars</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-center text-slate-900 shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">workspace_premium</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-teal-300/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-teal-200">Verification Status</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">100% Active</div>
            <div className="text-[9px] sm:text-[11px] text-teal-100 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Blockchain Ledger</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">verified</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">verified</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER BAR */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-soft-card border border-white/10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-white mb-1 border border-white/30">
          <span className="material-symbols-outlined text-[16px]">military_tech</span>
          Official Competency Credentials
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">My Examination Certificates</h1>
      </div>

      {/* 3. CERTIFICATES FULLY-COLORED CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {certificates.map((cert, idx) => {
          const theme = cardColorPalettes[idx % cardColorPalettes.length];

          return (
            <div 
              key={cert.id}
              className={`${theme.bg} rounded-3xl p-3.5 sm:p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${theme.iconBg} flex items-center justify-center font-bold shadow-sm border border-white/20 shrink-0`}>
                    <span className="material-symbols-outlined text-[18px] sm:text-[24px]">workspace_premium</span>
                  </div>

                  <span className={`text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${theme.badge} shrink-0 truncate max-w-[90px] sm:max-w-none`}>
                    {cert.status || 'Verified'}
                  </span>
                </div>

                <div className="text-amber-300 text-[9px] sm:text-xs mb-1 font-black">★★★★★</div>

                <h3 className="font-black text-xs sm:text-lg text-white leading-snug mb-1 drop-shadow-sm line-clamp-2">
                  {cert.examName}
                </h3>
                <p className={`${theme.subText} text-[10px] sm:text-xs font-semibold mb-3 truncate`}>
                  Recipient: <strong className="text-white font-extrabold">{cert.recipientName}</strong>
                </p>

                <div className={`${theme.metaBg} rounded-2xl p-2 sm:p-3.5 space-y-1 text-[9px] sm:text-xs font-semibold mb-4 sm:mb-5`}>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Date:</span>
                    <span className="text-white font-black truncate">{cert.issueDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">ID:</span>
                    <span className="font-mono text-white font-black text-[9px] sm:text-[11px] truncate">{cert.id}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onViewCertificate(cert)}
                className={`w-full h-8 sm:h-11 text-[11px] sm:text-xs rounded-xl sm:rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <span>View Certificate</span>
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">visibility</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
