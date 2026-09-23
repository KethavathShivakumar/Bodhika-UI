import React, { useState } from 'react';

export default function ExamPathDirectoryPage({ directoryList, onTrackExam, onToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [bangaloreOnly, setBangaloreOnly] = useState(false);

  const categories = [
    'All',
    'Engineering & Technology',
    'Medical & Health',
    'Law & Government',
    'Management & Commerce',
    'Design, Arts & Culture',
    'Defence'
  ];

  const filteredExams = directoryList.filter(exam => {
    if (searchQuery && !exam.title.toLowerCase().includes(searchQuery.toLowerCase()) && !exam.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeCategory !== 'All' && exam.category !== activeCategory && exam.track !== activeCategory) {
      return false;
    }
    if (bangaloreOnly && !exam.isBangalore) return false;
    return true;
  });

  const registeredDoneCount = directoryList.filter(e => e.status === 'Registered' || e.status === 'Completed').length;
  const closingSoonCount = directoryList.filter(e => e.daysLeft <= 60).length;
  const bangaloreCount = directoryList.filter(e => e.isBangalore).length;

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
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a4b56] via-[#109c90] to-[#1d273e] p-8 text-white shadow-2xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <span className="material-symbols-outlined text-[16px]">explore</span>
              <span>Collegiate Benchmark Directory</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
              ExamPath Directory & Cutoff Hub
            </h1>
            <p className="text-sm text-teal-100/90 font-medium leading-relaxed">
              Browse national entrance examinations, upcoming registration deadlines, college cutoffs, and track target admissions.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-2xl font-black text-amber-300">{directoryList.length}</div>
              <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Entrances</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. TOP METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-teal-300/20">
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-teal-100 truncate">Total Directory</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-[20px]">school</span>
            </div>
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-xl sm:text-3xl font-black tracking-tight">{directoryList.length} Exams</div>
            <div className="text-[10px] sm:text-xs text-teal-100/90 font-medium">Verified entrances</div>
          </div>
          <div className="p-2 sm:p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-[9px] sm:text-xs font-bold border border-white/10">
            <span className="truncate">Verified</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/30 text-[8px] sm:text-[10px] font-extrabold shrink-0">100%</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#ff6551] to-[#e04e3b] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-300/20">
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-rose-100 truncate">Closing Soon</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-[20px]">timer</span>
            </div>
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-xl sm:text-3xl font-black tracking-tight">{closingSoonCount} Urgent</div>
            <div className="text-[10px] sm:text-xs text-rose-100/90 font-medium">Sub-60 days</div>
          </div>
          <div className="p-2 sm:p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-[9px] sm:text-xs font-bold border border-white/10">
            <span className="truncate">Deadline</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/30 text-[8px] sm:text-[10px] font-extrabold shrink-0">Urgent</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-950 shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-300/30">
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-900/80 truncate">In Tracker</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-black/10 flex items-center justify-center text-slate-950 backdrop-blur-sm shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-[20px]">bookmark_added</span>
            </div>
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-xl sm:text-3xl font-black tracking-tight">{registeredDoneCount} Active</div>
            <div className="text-[10px] sm:text-xs text-slate-900/80 font-medium">Saved targets</div>
          </div>
          <div className="p-2 sm:p-3 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-between text-[9px] sm:text-xs font-bold border border-black/10">
            <span className="truncate">Tracked</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-black/20 text-[8px] sm:text-[10px] font-extrabold text-slate-950 shrink-0">Saved</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-600/30">
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-300 truncate">Bangalore</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-[20px]">location_city</span>
            </div>
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-xl sm:text-3xl font-black tracking-tight">{bangaloreCount} Colleges</div>
            <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Local hubs</div>
          </div>
          <div className="p-2 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between text-[9px] sm:text-xs font-bold border border-white/10">
            <span className="truncate">Regional</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[8px] sm:text-[10px] font-extrabold shrink-0">BLR</span>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-5 shadow-soft-card border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 text-white/70 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search exam title, college name, or eligibility..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl text-xs font-semibold text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setBangaloreOnly(!bangaloreOnly)}
            className={`px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              bangaloreOnly
                ? 'bg-white text-[#0a4b56] shadow-md'
                : 'bg-white/15 text-white border border-white/20 hover:bg-white/25'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span>Bangalore Hubs Only</span>
          </button>
        </div>
      </div>

      {/* 3. DIRECTORY FULLY-COLORED CARDS GRID */}
      {filteredExams.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-soft-card border border-slate-100">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">find_in_page</span>
          <h3 className="text-base font-bold text-slate-800">No examination paths found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting search filters or location toggles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredExams.map((exam, idx) => {
            const theme = cardColorPalettes[idx % cardColorPalettes.length];

            return (
              <div 
                key={exam.id}
                className={`${theme.bg} rounded-3xl p-3.5 sm:p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${theme.iconBg} flex items-center justify-center font-bold shadow-sm border border-white/20 shrink-0`}>
                      <span className="material-symbols-outlined text-[18px] sm:text-[24px]">school</span>
                    </div>

                    <span className={`text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full ${theme.badge} shrink-0 truncate max-w-[90px] sm:max-w-none`}>
                      {exam.category || 'Entrance'}
                    </span>
                  </div>

                  <h3 className="font-black text-xs sm:text-lg text-white leading-snug mb-1 sm:mb-2 drop-shadow-sm line-clamp-2">
                    {exam.title}
                  </h3>
                  <p className={`${theme.subText} text-[10px] sm:text-xs font-medium line-clamp-2 mb-3 sm:mb-5 leading-relaxed`}>
                    {exam.description}
                  </p>

                  <div className={`${theme.metaBg} rounded-2xl p-2 sm:p-4 space-y-1 sm:space-y-2 text-[9px] sm:text-xs font-semibold mb-4 sm:mb-5`}>
                    <div className="flex justify-between items-center">
                      <span className="opacity-80 truncate">Deadline:</span>
                      <span className="text-white font-black truncate ml-1">{exam.deadline || '30 Sep 2026'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-80 truncate">Days Left:</span>
                      <span className="text-amber-300 font-black px-1.5 sm:px-2.5 py-0.5 rounded-full bg-white/20 text-[8px] sm:text-[11px] shrink-0">
                        {exam.daysLeft || 45}d left
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onTrackExam(exam.id, 'Registered');
                    if (onToast) {
                      onToast({ title: 'Exam Added to Tracker', message: `${exam.title} added to My Exam Tracker.`, type: 'success' });
                    }
                  }}
                  className={`w-full h-8 sm:h-11 text-[10px] sm:text-xs rounded-xl sm:rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer px-1.5 sm:px-4`}
                >
                  <span className="truncate">Add to Tracker</span>
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px] shrink-0">arrow_forward</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
