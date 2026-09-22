import React, { useState } from 'react';

export default function ExamTrackerPage({ directoryList, onUpdateStatus, onToast }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');

  const filteredItems = directoryList.filter(item => {
    if (filterQuery && !item.title.toLowerCase().includes(filterQuery.toLowerCase()) && !item.subTitle?.toLowerCase().includes(filterQuery.toLowerCase())) {
      return false;
    }
    if (trackFilter !== 'All' && item.track !== trackFilter) return false;
    return true;
  });

  const registeredCount = directoryList.filter(i => i.status === 'Registered').length;
  const completedCount = directoryList.filter(i => i.status === 'Completed').length;
  const skippingCount = directoryList.filter(i => i.status === 'Skipping').length;
  const remainingCount = directoryList.length - registeredCount - completedCount - skippingCount;

  const handleStatusChange = (id, newStatus) => {
    onUpdateStatus(id, newStatus);
    if (onToast) {
      onToast({
        title: 'Status Updated',
        message: `Exam status set to "${newStatus}". Tracker summary refreshed.`,
        type: 'success'
      });
    }
  };

  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-teal-100 border border-white/10",
      subText: "text-teal-100/90 font-medium",
      btnActive: "bg-white text-[#0a4b56] font-black shadow-md",
      btnInactive: "bg-white/15 text-white hover:bg-white/25 border border-white/20"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btnActive: "bg-white text-[#1e1b4b] font-black shadow-md",
      btnInactive: "bg-white/15 text-white hover:bg-white/25 border border-white/20"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btnActive: "bg-white text-[#7c2d12] font-black shadow-md",
      btnInactive: "bg-white/15 text-white hover:bg-white/25 border border-white/20"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btnActive: "bg-white text-[#4c1d95] font-black shadow-md",
      btnInactive: "bg-white/15 text-white hover:bg-white/25 border border-white/20"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* PAGE HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a4b56] via-[#109c90] to-[#1d273e] p-8 text-white shadow-2xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <span className="material-symbols-outlined text-[16px]">checklist</span>
              <span>Application Pipeline & Status Board</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
              My Exam Tracker Board
            </h1>
            <p className="text-sm text-teal-100/90 font-medium leading-relaxed">
              Organize, track application progress, and manage registration milestones for your targeted entrance examinations.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-2xl font-black text-amber-300">{directoryList.length}</div>
              <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Tracked Exams</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. TOP SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-teal-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-100">Registered</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">{registeredCount} Active</div>
            <div className="text-xs text-teal-100/90 font-medium">Official Applications</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Application Status</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">Active</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#00c853] to-[#009624] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">Completed</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">{completedCount} Finished</div>
            <div className="text-xs text-emerald-100/90 font-medium">Results Recorded</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Result Saved</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">100%</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#ff6551] to-[#e04e3b] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-100">Skipping</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">do_not_disturb_on</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">{skippingCount} Omitted</div>
            <div className="text-xs text-rose-100/90 font-medium">Opted Out</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Archived</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">Inactive</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-950 shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-300/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900/80">Remaining</span>
            <div className="w-10 h-10 rounded-2xl bg-black/10 flex items-center justify-center text-slate-950 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">hourglass_empty</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">{remainingCount} Target</div>
            <div className="text-xs text-slate-900/80 font-medium">In Pipeline</div>
          </div>
          <div className="p-3 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-black/10">
            <span>Pipeline</span>
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-extrabold text-slate-950">Pending</span>
          </div>
        </div>
      </div>

      {/* 2. SEARCH TOOLBAR */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-5 shadow-soft-card border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 text-white/70 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search tracked exam title or category..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl text-xs font-semibold text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      {/* 3. TRACKED ITEMS FULLY-COLORED CARDS GRID */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-soft-card border border-slate-100">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">fact_check</span>
          <h3 className="text-base font-bold text-slate-800">No tracked exams match your search</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const theme = cardColorPalettes[idx % cardColorPalettes.length];

            return (
              <div 
                key={item.id}
                className={`${theme.bg} rounded-3xl p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center font-bold shadow-sm border border-white/20`}>
                      <span className="material-symbols-outlined text-[24px]">app_registration</span>
                    </div>

                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${theme.badge}`}>
                      {item.status || 'Target'}
                    </span>
                  </div>

                  <h3 className="font-black text-lg text-white leading-snug mb-2 drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className={`${theme.subText} text-xs font-medium line-clamp-2 mb-5`}>
                    {item.subTitle || item.category || 'Entrance Examination'}
                  </p>

                  <div className={`${theme.metaBg} rounded-2xl p-4 flex items-center justify-between text-xs font-bold mb-5`}>
                    <span className="opacity-80">Deadline:</span>
                    <strong className="text-white font-black">{item.regDeadline || '30 Sep 2026'}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20 flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(item.id, 'Registered')}
                    className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                      item.status === 'Registered' ? theme.btnActive : theme.btnInactive
                    }`}
                  >
                    Registered
                  </button>
                  <button
                    onClick={() => handleStatusChange(item.id, 'Completed')}
                    className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                      item.status === 'Completed' ? theme.btnActive : theme.btnInactive
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
