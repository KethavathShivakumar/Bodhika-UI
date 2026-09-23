import React, { useState } from 'react';

export default function BrowseEnrollPage({ catalog, onEnroll, onBackToMyExams }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredCatalog = catalog.filter(exam => {
    if (searchQuery && !exam.name.toLowerCase().includes(searchQuery.toLowerCase()) && !exam.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedSubject !== 'All' && exam.subject !== selectedSubject) return false;
    if (selectedType !== 'All' && exam.type !== selectedType) return false;
    return true;
  });

  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      priceTag: "bg-white/25 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-teal-100 border border-white/10",
      subText: "text-teal-100/90 font-medium",
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      priceTag: "bg-white/25 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      priceTag: "bg-white/25 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      priceTag: "bg-white/25 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#10b981] text-white border-emerald-300/30",
      priceTag: "bg-white/25 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-emerald-100 border border-white/10",
      subText: "text-emerald-100/90 font-medium",
      btn: "bg-white text-[#064e3b] hover:bg-emerald-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#881337] via-[#be123c] to-[#e11d48] text-white border-rose-300/30",
      priceTag: "bg-white/25 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-rose-100 border border-white/10",
      subText: "text-rose-100/90 font-medium",
      btn: "bg-white text-[#881337] hover:bg-rose-50 font-black shadow-md"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP SUMMARY METRICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        <div className="bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-teal-300/20">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-teal-200">Catalog Exams</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{catalog.length} Available</div>
            <div className="text-[9px] sm:text-[11px] text-teal-100 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Verified Modules</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">storefront</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-amber-300/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-900/80">Featured Pathways</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">12 Categories</div>
            <div className="text-[9px] sm:text-[11px] text-slate-900 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">National & Global</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-center text-slate-900 shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">school</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-slate-600/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300">Instant Access</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">24/7 Portal</div>
            <div className="text-[9px] sm:text-[11px] text-slate-300 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Self-Paced Practice</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">bolt</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER & SEARCH BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-6 shadow-soft-card border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-white mb-1 border border-white/30">
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            Academic Marketplace
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Browse & Enroll in Examinations</h1>
        </div>

        <div className="w-full md:w-80 bg-white/15 backdrop-blur-md rounded-2xl flex items-center px-4 h-11 gap-2 border border-white/20">
          <span className="material-symbols-outlined text-white/70 text-[18px]">search</span>
          <input
            type="text"
            placeholder="Search exam or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/60 font-semibold"
          />
        </div>
      </div>

      {/* 3. CATALOG FULLY-COLORED CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredCatalog.map((exam, idx) => {
          const theme = cardColorPalettes[idx % cardColorPalettes.length];

          return (
            <div 
              key={exam.id}
              className={`${theme.bg} rounded-3xl p-3.5 sm:p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${theme.iconBg} flex items-center justify-center font-bold shadow-sm border border-white/20 shrink-0`}>
                    <span className="material-symbols-outlined text-[18px] sm:text-[22px]">assignment</span>
                  </div>
                  <span className={`text-[8px] sm:text-xs px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full ${theme.priceTag}`}>
                    {exam.price ? `$${exam.price}` : 'Free Access'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-300 text-[9px] sm:text-xs mb-1 font-black">
                  <span>★ 4.9</span>
                  <span className="text-white/80 font-bold text-[9px] sm:text-[11px] hidden sm:inline">(4.9)</span>
                </div>

                <h3 className="font-black text-xs sm:text-lg text-white leading-snug mb-1 sm:mb-1.5 drop-shadow-sm line-clamp-2">
                  {exam.name}
                </h3>
                <p className={`${theme.subText} text-[10px] sm:text-xs line-clamp-2 mb-3 sm:mb-4 leading-relaxed`}>
                  {exam.description || 'Comprehensive competency drill with detailed solution rationale.'}
                </p>

                <div className={`${theme.metaBg} rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[9px] sm:text-xs font-bold mb-4 sm:mb-5 gap-0.5 sm:gap-0`}>
                  <span>Qs: <strong className="text-white font-black">{exam.questions || 45}</strong></span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span>Time: <strong className="text-white font-black">{exam.timeMin || 60}m</strong></span>
                </div>
              </div>

              <button
                onClick={() => onEnroll(exam)}
                className={`w-full h-8 sm:h-11 text-[11px] sm:text-sm rounded-xl sm:rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <span>Enroll Now</span>
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">arrow_forward</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
