import React, { useState, useMemo } from 'react';

export default function ExamHistoryPage({ attempts, onBackToExams, onViewAttempt, onRetakeExam, initialSubject = 'All' }) {
  const [timeRange, setTimeRange] = useState('5');
  const [subjectFilter, setSubjectFilter] = useState(initialSubject);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const subjects = ['All', ...new Set(attempts.map(a => a.subject))];

  const subjectFilteredAttempts = useMemo(() => {
    return attempts.filter(att => {
      if (subjectFilter !== 'All' && att.subject !== subjectFilter) return false;
      return true;
    });
  }, [attempts, subjectFilter]);

  const chartAttempts = useMemo(() => {
    const list = [...subjectFilteredAttempts];
    const sliced = timeRange === '5' ? list.slice(0, 5) : timeRange === '10' ? list.slice(0, 10) : list;
    return sliced.reverse();
  }, [subjectFilteredAttempts, timeRange]);

  const totalExams = subjectFilteredAttempts.length;
  const passedCount = subjectFilteredAttempts.filter(a => a.result === 'Pass').length;
  const passRate = totalExams > 0 ? Math.round((passedCount / totalExams) * 100) : 0;
  
  const scoreValues = subjectFilteredAttempts.map(a => a.scorePercent || 80);
  const avgScore = scoreValues.length > 0 ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) : 0;
  const highestScore = scoreValues.length > 0 ? Math.max(...scoreValues) : 0;

  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 55;
  const paddingY = 35;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const points = useMemo(() => {
    if (chartAttempts.length === 0) return [];
    if (chartAttempts.length === 1) {
      return [{
        x: paddingX + chartWidth / 2,
        y: svgHeight - paddingY - ((chartAttempts[0].scorePercent || 80) / 100) * chartHeight,
        attempt: chartAttempts[0]
      }];
    }
    const step = chartWidth / (chartAttempts.length - 1);
    return chartAttempts.map((att, idx) => {
      const x = paddingX + idx * step;
      const y = svgHeight - paddingY - ((att.scorePercent || 80) / 100) * chartHeight;
      return { x, y, attempt: att };
    });
  }, [chartAttempts, chartWidth, chartHeight, svgHeight, paddingX, paddingY]);

  const linePath = useMemo(() => {
    if (points.length < 2) return '';
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;
      path += ` C ${controlX},${current.y} ${controlX},${next.y} ${next.x},${next.y}`;
    }
    return path;
  }, [points]);

  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-teal-100 border border-white/10",
      subText: "text-teal-100/90 font-medium",
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. METRIC SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white rounded-3xl p-6 shadow-soft-card flex items-center justify-between border border-teal-300/20">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-teal-200">Total Attempts</div>
            <div className="text-3xl font-black tracking-tight mt-1">{totalExams}</div>
            <div className="text-[11px] text-teal-100 font-semibold mt-2 flex items-center gap-1">
              <span>Pass Rate: {passRate}%</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[24px]">history_edu</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 rounded-3xl p-6 shadow-soft-card flex items-center justify-between border border-amber-300/30">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-900/80">Highest Score</div>
            <div className="text-3xl font-black tracking-tight mt-1">{highestScore}%</div>
            <div className="text-[11px] text-slate-900 font-semibold mt-2 flex items-center gap-1">
              <span>Personal Benchmark</span>
              <span className="material-symbols-outlined text-[14px]">stars</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-center text-slate-900">
            <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white rounded-3xl p-6 shadow-soft-card flex items-center justify-between border border-slate-600/30">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-300">Average Performance</div>
            <div className="text-3xl font-black tracking-tight mt-1">{avgScore}%</div>
            <div className="text-[11px] text-slate-300 font-semibold mt-2 flex items-center gap-1">
              <span>Across All Modules</span>
              <span className="material-symbols-outlined text-[14px]">monitoring</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[24px]">insights</span>
          </div>
        </div>
      </div>

      {/* 2. RECENT RESULTS PERFORMANCE GRAPH */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft-card border border-slate-100/90 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 rounded-full text-xs font-black text-[#0a4b56] mb-1 border border-teal-100">
              <span className="material-symbols-outlined text-[16px]">show_chart</span>
              Recent Results Trajectory
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Results Performance Graph</h2>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Chronological test scores and distinction benchmark analysis</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              {['5', '10', 'All'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    timeRange === range
                      ? 'bg-[#0a4b56] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {range === 'All' ? 'All' : `Last ${range}`}
                </button>
              ))}
            </div>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-slate-50 h-10 px-4 rounded-2xl text-xs font-bold text-slate-800 outline-none border border-slate-200 cursor-pointer shadow-sm focus:border-[#0a4b56]"
            >
              {subjects.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Subjects' : s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* TALL & RICH SVG GRAPH CONTAINER */}
        <div className="w-full h-88 relative my-4 bg-gradient-to-b from-slate-50/50 to-teal-50/20 rounded-3xl p-4 border border-slate-100/90 shadow-inner">
          <svg viewBox="0 0 800 260" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="recentResultsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#109c90" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#0a4b56" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0a4b56" stopOpacity="0.0" />
              </linearGradient>

              <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {[
              { val: '100%', y: 35 },
              { val: '75%', y: 81.25 },
              { val: '50%', y: 127.5 },
              { val: '25%', y: 173.75 },
              { val: '0%', y: 225 }
            ].map((grid, idx) => (
              <g key={idx}>
                <line x1="50" y1={grid.y} x2="780" y2={grid.y} stroke="#e2e8f0" strokeDasharray={idx === 4 ? '' : '4 4'} strokeWidth="1" />
                <text x="42" y={grid.y + 4} textAnchor="end" className="text-[11px] font-bold fill-slate-400">{grid.val}</text>
              </g>
            ))}

            <line x1="50" y1="72" x2="780" y2="72" stroke="#f4ad42" strokeWidth="2" strokeDasharray="6 6" />
            <text x="775" y="65" textAnchor="end" className="text-[10px] font-black fill-[#d9911e]">★ 80% Distinction Cutoff</text>

            {points.length > 1 && (
              <path
                d={`${linePath} L ${points[points.length - 1].x},225 L ${points[0].x},225 Z`}
                fill="url(#recentResultsGradient)"
              />
            )}

            {points.length > 1 && (
              <path
                d={linePath}
                fill="none"
                stroke="#0a4b56"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {points.map((pt, i) => {
              const isHovered = hoveredPoint === i;
              const isPassed = pt.attempt.result === 'Pass';
              const percent = pt.attempt.scorePercent || 80;

              return (
                <g key={i} className="cursor-pointer group" onMouseEnter={() => setHoveredPoint(i)} onMouseLeave={() => setHoveredPoint(null)}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? "14" : "9"}
                    fill={isPassed ? "#109c90" : "#ff6551"}
                    opacity="0.25"
                    className="transition-all duration-300"
                  />

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? "8" : "6"}
                    fill={isPassed ? "#f4ad42" : "#ff6551"}
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    className="transition-all duration-300"
                    filter="url(#nodeGlow)"
                  />

                  <text
                    x={pt.x}
                    y={pt.y - 14}
                    textAnchor="middle"
                    className="text-[12px] font-black fill-slate-900 pointer-events-none"
                  >
                    {percent}%
                  </text>

                  <text
                    x={pt.x}
                    y="245"
                    textAnchor="middle"
                    className="text-[10px] font-extrabold fill-slate-500 uppercase tracking-wider"
                  >
                    {pt.attempt.date || `Test ${i+1}`}
                  </text>
                </g>
              );
            })}
          </svg>

          {hoveredPoint !== null && points[hoveredPoint] && (
            <div
              className="absolute z-20 bg-slate-900 text-white rounded-2xl p-3.5 shadow-float pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4 transition-all duration-200 border border-slate-700"
              style={{
                left: `${(points[hoveredPoint].x / 800) * 100}%`,
                top: `${(points[hoveredPoint].y / 260) * 100}%`
              }}
            >
              <div className="text-[10px] font-black uppercase tracking-wider text-teal-300">
                {points[hoveredPoint].attempt.date} • {points[hoveredPoint].attempt.result}
              </div>
              <div className="text-xs font-black text-white truncate max-w-[200px] mt-0.5">
                {points[hoveredPoint].attempt.exam}
              </div>
              <div className="text-sm font-black text-[#f4ad42] mt-1">
                Score: {points[hoveredPoint].attempt.scorePercent || 80}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. ATTEMPTS FULLY-COLORED CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectFilteredAttempts.map((att, idx) => {
          const isPassed = att.result === 'Pass';
          const percent = att.scorePercent || 80;
          const theme = cardColorPalettes[idx % cardColorPalettes.length];

          return (
            <div 
              key={att.id}
              className={`${theme.bg} rounded-3xl p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Circular Score Gauge */}
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
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
                    <span className="absolute text-[11px] font-black text-white">{percent}%</span>
                  </div>

                  <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                    isPassed ? 'bg-emerald-400 text-slate-900 font-extrabold' : 'bg-rose-400 text-slate-900 font-extrabold'
                  }`}>
                    {att.result}
                  </span>
                </div>

                <h3 className="font-black text-lg text-white leading-snug mb-1 drop-shadow-sm">
                  {att.exam}
                </h3>
                <p className={`${theme.subText} text-xs font-semibold mb-4`}>
                  {att.subject} • Date: {att.date || '15 Sep 2026'}
                </p>

                <div className={`${theme.metaBg} rounded-2xl p-3 flex items-center justify-between text-xs font-bold mb-5`}>
                  <span>Score: <strong className="text-white font-black">{att.score}</strong></span>
                  <span className="text-white/40">•</span>
                  <span>Attempt #{att.attemptNumber || 1}</span>
                </div>
              </div>

              <button
                onClick={() => onViewAttempt(att)}
                className={`w-full h-11 rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer`}
              >
                <span>View Attempt Rationale</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
