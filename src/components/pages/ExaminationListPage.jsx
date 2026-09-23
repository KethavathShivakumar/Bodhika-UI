import React, { useState } from 'react';

export default function ExaminationListPage({ exams, onTakeExam, onViewHistory, onToast }) {
  const [searchName, setSearchName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');

  const filteredExams = exams.filter(e => {
    if (searchName && !e.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (selectedGrade !== 'All' && e.grade !== selectedGrade) return false;
    return true;
  });

  const cardSolidColors = [
    "bg-[#0d7d74]", // Teal
    "bg-[#e55347]", // Coral Red
    "bg-[#d9822b]", // Golden Amber
    "bg-[#232d3f]", // Slate Navy
    "bg-[#2563eb]", // Electric Blue
    "bg-[#059669]", // Emerald Green
    "bg-[#0f766e]", // Dark Teal
    "bg-[#ea580c]"  // Orange Red
  ];

  const getSubjectIcon = (exam) => {
    const text = (exam.subject || exam.name || exam.category || '').toLowerCase();
    if (text.includes('cloud') || text.includes('azure') || text.includes('aws')) return 'cloud';
    if (text.includes('bio') || text.includes('life') || text.includes('neet')) return 'biotech';
    if (text.includes('math') || text.includes('physics') || text.includes('jee')) return 'functions';
    if (text.includes('code') || text.includes('python') || text.includes('algo') || text.includes('computer') || text.includes('technical')) return 'code';
    if (text.includes('cricket') || text.includes('gk') || text.includes('sports')) return 'history_edu';
    return 'assignment';
  };

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
            const solidBg = cardSolidColors[idx % cardSolidColors.length];

            return (
              <div 
                key={exam.id}
                className="bg-white rounded-[32px] p-5 shadow-soft-card border border-slate-100/90 hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Top Header Card Banner */}
                  <div className={`w-full h-40 rounded-[24px] ${solidBg} p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform`}>
                    {/* Top Right Subject Badge Pill */}
                    <div className="flex justify-end">
                      <span className="text-[10px] font-black px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-white uppercase tracking-wider truncate max-w-[190px]">
                        {exam.subject || exam.category || 'General'}
                      </span>
                    </div>

                    {/* Large Centered Icon */}
                    <div className="flex items-center justify-center my-auto">
                      <span className="material-symbols-outlined text-[48px] text-white/95 drop-shadow-sm">
                        {getSubjectIcon(exam)}
                      </span>
                    </div>

                    {/* Bottom Left Rating Badge */}
                    <div className="flex justify-start">
                      <div className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black text-amber-500 flex items-center gap-1 shadow-sm">
                        <span>★★★★★</span>
                        <span className="text-slate-800 font-extrabold">{exam.rating || '4.8'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="pt-3.5">
                    <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-teal-50 text-[#0a4b56] border border-teal-100 inline-block">
                      {exam.grade || exam.category || 'Standard Assessment'}
                    </span>
                  </div>

                  {/* Exam Title */}
                  <h3 className="font-black text-base text-slate-900 group-hover:text-[#0a4b56] transition-colors leading-snug mt-2.5 line-clamp-2">
                    {exam.name}
                  </h3>

                  {/* Subtitle Details */}
                  <p className="text-xs text-slate-400 font-semibold mt-1.5 flex items-center gap-1.5">
                    <span>{exam.questions || 10} Questions</span>
                    <span>•</span>
                    <span>{exam.timeMin || 60} mins</span>
                  </p>
                </div>

                {/* Take Exam Action Button */}
                <button
                  onClick={() => onTakeExam(exam)}
                  className="w-full mt-6 h-11 rounded-full bg-[#109c90] hover:bg-[#0a4b56] text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Take Exam</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

