import React, { useState } from 'react';

export default function ExaminationListPage({ exams, onTakeExam, onViewHistory, onToast }) {
  const [searchName, setSearchName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');

  const filteredExams = exams.filter(e => {
    if (searchName && !e.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (selectedGrade !== 'All' && e.grade !== selectedGrade) return false;
    return true;
  });

  const cardHeaderGradients = [
    "from-[#0a4b56] to-[#109c90]",
    "from-[#ff6551] to-[#e04e3b]",
    "from-[#f4ad42] to-[#d9911e]",
    "from-[#1d273e] to-[#2d3748]",
    "from-[#3b82f6] to-[#1d4ed8]",
    "from-[#10b981] to-[#047857]"
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* HERO BANNER */}
      <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#fff0ea] via-[#f7f0ff] to-[#eef2ff] p-6 sm:p-10 border border-white/80 shadow-soft-card overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Soft Radial Glow Effects */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />

        {/* Left Side: 3D Student Avatar in Floating Glass Sphere */}
        <div className="relative z-10 flex items-center justify-center shrink-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white/50 backdrop-blur-md p-3 border border-white/70 shadow-float flex items-center justify-center animate-float-slow">
            {/* Glowing inner orb */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#a0c4ff] to-[#c77dff] flex items-center justify-center overflow-hidden shadow-inner">
              <svg viewBox="0 0 200 200" fill="none" className="w-40 h-40 drop-shadow-md">
                <path d="M60 90 C60 40 140 40 140 90 C140 110 130 125 125 105 C115 80 85 80 75 105 C70 125 60 110 60 90 Z" fill="#2d3748" />
                <path d="M70 100 C70 70 130 70 130 100 C130 135 120 150 100 150 C80 150 70 135 70 100 Z" fill="#ffd1b3" />
                <circle cx="88" cy="105" r="5" fill="#2d3748" />
                <circle cx="112" cy="105" r="5" fill="#2d3748" />
                <circle cx="89" cy="103" r="1.5" fill="#ffffff" />
                <circle cx="113" cy="103" r="1.5" fill="#ffffff" />
                <path d="M92 122 Q100 130 108 122" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M60 160 C60 145 80 140 100 140 C120 140 140 145 140 160 L150 200 L50 200 Z" fill="#7986cb" />
              </svg>
            </div>

            {/* Orbiting Feature Icons */}
            <div className="absolute -top-1 left-2 w-9 h-9 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#0a4b56] animate-bounce-soft">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div className="absolute top-10 -right-2 w-9 h-9 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#ff6551]">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </div>
            <div className="absolute bottom-4 -left-2 w-9 h-9 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#f4ad42]">
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
            </div>
          </div>
        </div>

        {/* Right Side: E-Learning Benefits & Features */}
        <div className="relative z-10 flex-1 space-y-5 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-black text-[#0a4b56] shadow-sm mb-2 border border-teal-100">
              ✨ Welcome back, Kethavath!
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Bodhika Assessment Portal
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1.5 max-w-lg leading-relaxed">
              Track your competency benchmarks, schedule upcoming competitive mock tests, and view instant performance analytics.
            </p>
          </div>

          {/* Benefit Icons Chips */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 pt-2">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#0a4b56]">
                <span className="material-symbols-outlined text-[20px]">timer</span>
              </div>
              <span className="text-[11px] font-black text-slate-800">Timed Tests</span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#ff6551]">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
              </div>
              <span className="text-[11px] font-black text-slate-800">Real-Time Analytics</span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#f4ad42]">
                <span className="material-symbols-outlined text-[20px]">military_tech</span>
              </div>
              <span className="text-[11px] font-black text-slate-800">Certified Badges</span>
            </div>
          </div>
        </div>

      </div>

      {/* FEATURED EXAM CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Featured Examinations</h2>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Explore active practice drills and evaluation tests</p>
          </div>
          <span className="text-xs font-bold text-[#0a4b56] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            {filteredExams.length} Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExams.map((exam, idx) => {
            const gradient = cardHeaderGradients[idx % cardHeaderGradients.length];

            return (
              <div 
                key={exam.id}
                className="bg-white rounded-3xl p-5 shadow-soft-card border border-slate-100 hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Soft Card Header / Icon Container */}
                  <div className={`w-full h-32 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                    <span className="material-symbols-outlined text-[48px] text-white/90 drop-shadow-md">
                      {exam.subject?.includes('Azure') ? 'cloud' : exam.subject?.includes('Biology') ? 'biotech' : 'assignment'}
                    </span>

                    {/* Rating Stars */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black text-amber-500 flex items-center gap-1 shadow-sm">
                      <span>★★★★☆</span>
                      <span className="text-slate-700 font-extrabold">4.8</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-wider">
                      {exam.subject || 'General'}
                    </div>
                  </div>

                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0a4b56] border border-teal-100">
                    {exam.grade || 'Standard'}
                  </span>

                  <h3 className="font-black text-base text-slate-900 group-hover:text-[#0a4b56] transition-colors mt-2 leading-snug line-clamp-2">
                    {exam.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold mt-1">
                    {exam.questions} Questions • {exam.timeMin || 60} mins
                  </p>
                </div>

                {/* Action CTA Button */}
                <button
                  onClick={() => onTakeExam(exam)}
                  className="w-full mt-5 h-10 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white text-xs font-black hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Take Exam</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

