import React, { useState } from 'react';

export default function CompletedExamsPage({ attempts, onViewResult, onRetakeExam, onBackToDashboard }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');

  const subjects = ['All', ...new Set(attempts.map(a => a.subject))];

  const filteredAttempts = attempts.filter(att => {
    if (searchQuery && !att.exam.toLowerCase().includes(searchQuery.toLowerCase()) && !att.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (resultFilter !== 'All' && att.result !== resultFilter) return false;
    if (subjectFilter !== 'All' && att.subject !== subjectFilter) return false;
    return true;
  });

  const totalCompleted = attempts.length;
  const passedCount = attempts.filter(a => a.result === 'Pass').length;
  const passRate = totalCompleted > 0 ? Math.round((passedCount / totalCompleted) * 100) : 0;

  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-teal-100 border border-white/10",
      subText: "text-teal-100/90 font-medium",
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP METRIC SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        <div className="bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-teal-300/20">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-teal-200">Total Completed</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{totalCompleted}</div>
            <div className="text-[9px] sm:text-[11px] text-teal-100 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Verified Submissions</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">task_alt</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-amber-300/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-900/80">Passed Exams</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{passedCount}</div>
            <div className="text-[9px] sm:text-[11px] text-slate-900 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">High Competency</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">verified</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-center text-slate-900 shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">workspace_premium</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-slate-600/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300">Average Pass Rate</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{passRate}%</div>
            <div className="text-[9px] sm:text-[11px] text-slate-300 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Overall Percentile</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">monitoring</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">insights</span>
          </div>
        </div>
      </div>

      {/* 2. CONTROLS & FILTER BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-5 shadow-soft-card border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Pass', 'Fail'].map((status) => (
            <button
              key={status}
              onClick={() => setResultFilter(status)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                resultFilter === status
                  ? 'bg-white text-[#0a4b56] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {status === 'All' ? 'All Results' : status === 'Pass' ? 'Passed Only' : 'Failed Only'}
            </button>
          ))}

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="bg-white/15 h-9 px-3 rounded-2xl text-xs font-bold text-white outline-none border border-white/20 cursor-pointer ml-2 backdrop-blur-md"
          >
            {subjects.map(subj => (
              <option key={subj} value={subj} className="bg-slate-900 text-white">
                {subj === 'All' ? '— All Subjects —' : subj}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-72 bg-white/15 backdrop-blur-md rounded-2xl flex items-center px-3.5 h-10 gap-2 border border-white/20">
          <span className="material-symbols-outlined text-white/70 text-[18px]">search</span>
          <input
            type="text"
            placeholder="Search completed exam..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/60 font-semibold"
          />
        </div>
      </div>

      {/* 3. COMPLETED EXAMS FULLY-COLORED CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredAttempts.map((att, idx) => {
          const isPassed = att.result === 'Pass';
          const percent = att.percentage || att.scorePercent || 80;
          const theme = cardColorPalettes[idx % cardColorPalettes.length];

          return (
            <div 
              key={att.id}
              className={`${theme.bg} rounded-3xl p-3.5 sm:p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  {/* Circular Score Gauge */}
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                    <svg className="w-9 h-9 sm:w-12 sm:h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={isPassed ? '#4ade80' : '#f87171'}
                        strokeWidth="3.5"
                        strokeDasharray={`${percent}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-[9px] sm:text-[11px] font-black text-white">{percent}%</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-amber-300 text-[9px] sm:text-xs tracking-tighter hidden sm:inline-block">★★★★★</span>
                    <span className={`text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${
                      isPassed ? 'bg-emerald-400 text-slate-900 font-extrabold' : 'bg-rose-400 text-slate-900 font-extrabold'
                    }`}>
                      {att.result}
                    </span>
                  </div>
                </div>

                <h3 className="font-black text-xs sm:text-lg text-white leading-snug mb-1 drop-shadow-sm line-clamp-2">
                  {att.exam}
                </h3>
                <p className={`${theme.subText} text-[10px] sm:text-xs font-semibold mb-3 truncate`}>
                  {att.subject} • {att.date || '15 Sep 2026'}
                </p>

                <div className={`${theme.metaBg} rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[9px] sm:text-xs font-bold mb-4 gap-0.5 sm:gap-0`}>
                  <span>Marks: <strong className="text-white font-black">{att.score}</strong></span>
                  <span className="text-white/40 hidden sm:inline">|</span>
                  <span>Time: <strong className="text-white font-black">{att.timeSpent || '42m'}</strong></span>
                </div>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-white/20 flex items-center justify-between gap-1.5 sm:gap-2">
                <button
                  onClick={() => onViewResult(att)}
                  className={`flex-1 h-8 sm:h-10 text-[10px] sm:text-xs rounded-xl sm:rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer px-1.5 sm:px-4`}
                >
                  <span className="truncate">View Results</span>
                  <span className="material-symbols-outlined text-[13px] sm:text-[15px] shrink-0">arrow_forward</span>
                </button>

                {onRetakeExam && (
                  <button
                    onClick={() => onRetakeExam(att)}
                    className={`h-8 sm:h-10 px-2 sm:px-3.5 rounded-xl sm:rounded-2xl ${theme.iconBtn} active:scale-95 transition-all cursor-pointer shrink-0`}
                    title="Retake Exam"
                  >
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px]">replay</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
