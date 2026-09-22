import React from 'react';

export default function MyPerformancePage({ onNavigateToHistory }) {
  const performanceSubjects = [
    {
      subject: "DP-900: Azure Data Fundamentals",
      attemptsCount: 2,
      mostRecent: 75,
      best: 85,
      average: 80,
      progress: 75,
      color: "bg-gradient-to-r from-[#0a4b56] to-[#109c90]",
      summary: "High progress in Azure Cosmos DB and Data Factory pipelines."
    },
    {
      subject: "Verbal Ability & Aptitude",
      attemptsCount: 3,
      mostRecent: 90,
      best: 95,
      average: 88,
      progress: 90,
      color: "bg-gradient-to-r from-[#f4ad42] to-[#d9911e]",
      summary: "Exceptional peak score at 95% in Reading Comprehension."
    },
    {
      subject: "Python Data Structures & Code",
      attemptsCount: 4,
      mostRecent: 82,
      best: 88,
      average: 84,
      progress: 82,
      color: "bg-gradient-to-r from-[#1d273e] to-[#2d3748]",
      summary: "Consistent upward trajectory (+15%) in algorithm efficiency."
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white rounded-3xl p-6 shadow-soft-card flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-teal-200">Overall Accuracy</div>
            <div className="text-3xl font-black tracking-tight mt-1">84.5%</div>
            <div className="text-[11px] text-teal-200 font-semibold mt-2 flex items-center gap-1">
              <span>Updated Real-Time</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[24px]">monitoring</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 rounded-3xl p-6 shadow-soft-card flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-900/80">Total Attempts</div>
            <div className="text-3xl font-black tracking-tight mt-1">158</div>
            <div className="text-[11px] text-slate-900 font-semibold mt-2 flex items-center gap-1">
              <span>High Activity</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-center text-slate-900">
            <span className="material-symbols-outlined text-[24px]">history</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white rounded-3xl p-6 shadow-soft-card flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">Class Percentile</div>
            <div className="text-3xl font-black tracking-tight mt-1">Top 5%</div>
            <div className="text-[11px] text-slate-400 font-semibold mt-2 flex items-center gap-1">
              <span>Distinction Grade</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN PERFORMANCE GRAPH & PROGRESS BARS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 8 COLS: Performance Trajectory Curve */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 shadow-soft-card border border-slate-100/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 rounded-full text-xs font-black text-amber-900 mb-1 border border-amber-100">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  Annual Mastery Curve
                </div>
                <h3 className="font-black text-xl text-slate-900 tracking-tight">Performance Trajectory Graph</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Continuous score progression & peak rating metrics</p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-[#1d273e] text-white text-xs font-black shadow-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-400 text-[16px]">star</span>
                <span>4.8/5.0 Rating</span>
              </div>
            </div>

            {/* Smooth SVG Line Chart */}
            <div className="w-full h-72 relative my-4 bg-gradient-to-b from-slate-50/50 to-teal-50/20 rounded-3xl p-4 border border-slate-100/90 shadow-inner">
              <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="primaryCurveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a4b56" stopOpacity="0.4" />
                    <stop offset="70%" stopColor="#0a4b56" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#0a4b56" stopOpacity="0.0" />
                  </linearGradient>

                  <linearGradient id="secondaryCurveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f4ad42" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f4ad42" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="40" y1="30" x2="590" y2="30" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="40" y1="80" x2="590" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="40" y1="130" x2="590" y2="130" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="40" y1="180" x2="590" y2="180" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="40" y1="220" x2="590" y2="220" stroke="#cbd5e1" strokeWidth="1.5" />

                <text x="32" y="34" textAnchor="end" className="text-[10px] font-black fill-slate-400">100%</text>
                <text x="32" y="84" textAnchor="end" className="text-[10px] font-black fill-slate-400">80%</text>
                <text x="32" y="134" textAnchor="end" className="text-[10px] font-black fill-slate-400">60%</text>
                <text x="32" y="184" textAnchor="end" className="text-[10px] font-black fill-slate-400">40%</text>

                <path
                  d="M 50 140 Q 150 100 250 150 T 450 110 T 590 130 L 590 220 L 50 220 Z"
                  fill="url(#secondaryCurveGradient)"
                />
                <path
                  d="M 50 140 Q 150 100 250 150 T 450 110 T 590 130"
                  fill="none"
                  stroke="#f4ad42"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M 50 170 Q 150 120 250 180 T 450 60 T 590 110 L 590 220 L 50 220 Z"
                  fill="url(#primaryCurveGradient)"
                />
                <path
                  d="M 50 170 Q 150 120 250 180 T 450 60 T 590 110"
                  fill="none"
                  stroke="#0a4b56"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle cx="450" cy="60" r="7" fill="#0a4b56" stroke="#ffffff" strokeWidth="3.5" />
                <circle cx="450" cy="60" r="14" fill="#0a4b56" opacity="0.15" />

                <g transform="translate(450, 28)">
                  <rect x="-35" y="-14" width="70" height="22" rx="11" fill="#0a4b56" />
                  <text x="0" y="1" textAnchor="middle" fill="#ffffff" className="text-[10px] font-black">95% Peak</text>
                </g>
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 font-black uppercase tracking-wider pt-3 border-t border-slate-100">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLS: Subject Mastery Bars */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-soft-card border border-slate-100/90 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-base text-slate-900 tracking-tight mb-5">Subject Mastery</h3>

            <div className="space-y-5">
              {performanceSubjects.map((subj, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-slate-800">
                    <span className="truncate max-w-[180px]">{subj.subject}</span>
                    <span className="text-[#0a4b56]">{subj.progress}%</span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${subj.color}`}
                      style={{ width: `${subj.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateToHistory('all')}
            className="w-full mt-6 h-10 rounded-2xl bg-slate-900 text-white font-black text-xs hover:bg-[#0a4b56] transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Full History</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

      </div>

    </div>
  );
}

