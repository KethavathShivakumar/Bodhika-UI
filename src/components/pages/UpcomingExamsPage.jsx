import React, { useState } from 'react';

export default function UpcomingExamsPage({ exams = [], onTakeExam, onViewHistory, onToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [sortBy, setSortBy] = useState('soonest');

  const availableGrades = ['All', ...new Set(exams.map(e => e.grade).filter(Boolean))];

  const filteredExams = exams.filter(e => {
    const matchesSearch = !searchTerm || e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || e.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || e.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const cardHeaderGradients = [
    "from-[#0a4b56] to-[#109c90]",
    "from-[#ff6551] to-[#e04e3b]",
    "from-[#f4ad42] to-[#d9911e]",
    "from-[#1d273e] to-[#2d3748]",
    "from-[#3b82f6] to-[#1d4ed8]",
    "from-[#10b981] to-[#047857]"
  ];

  const getSubjectIcon = (subject = '') => {
    const subj = subject.toLowerCase();
    if (subj.includes('cloud') || subj.includes('azure') || subj.includes('aws')) return 'cloud';
    if (subj.includes('bio') || subj.includes('life')) return 'biotech';
    if (subj.includes('math') || subj.includes('calc')) return 'functions';
    if (subj.includes('code') || subj.includes('dev')) return 'code';
    if (subj.includes('chem') || subj.includes('sci')) return 'science';
    return 'assignment';
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* PAGE HEADER */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#0a4b56] via-[#109c90] to-[#0d7d74] p-6 sm:p-8 text-white shadow-lg overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-black tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Upcoming Assessment Catalog
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Upcoming Examinations
          </h1>
          <p className="text-teal-100/90 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
            Browse and attempt scheduled competitive tests, practice drills, and topic evaluations designed to benchmark your progress.
          </p>
        </div>

        {/* Quick Stats Banner Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-center min-w-[110px]">
            <span className="block text-2xl font-black text-white">{exams.length}</span>
            <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wider">Total Tests</span>
          </div>
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-center min-w-[110px]">
            <span className="block text-2xl font-black text-amber-300">Live</span>
            <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wider">Status</span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-3xl p-5 shadow-soft-card border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search upcoming exams by title or subject..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a4b56]/30 focus:border-[#0a4b56] transition-all"
          />
        </div>

        {/* Grade Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {availableGrades.map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                selectedGrade === grade
                  ? 'bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 font-bold'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* EXAM CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0a4b56]">event_available</span>
            <span>Available Upcoming Exams</span>
          </h2>
          <span className="text-xs font-black text-[#0a4b56] bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            {filteredExams.length} {filteredExams.length === 1 ? 'Exam' : 'Exams'}
          </span>
        </div>

        {filteredExams.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-soft-card border border-slate-100 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <span className="material-symbols-outlined text-3xl">search_off</span>
            </div>
            <h3 className="text-base font-black text-slate-800">No Upcoming Exams Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No tests matched your current filter criteria. Try adjusting your search term or grade filter.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedGrade('All'); }}
              className="px-5 py-2.5 rounded-2xl bg-[#0a4b56] text-white text-xs font-black hover:bg-[#083c45] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam, idx) => {
              const gradient = cardHeaderGradients[idx % cardHeaderGradients.length];
              const icon = getSubjectIcon(exam.subject);

              return (
                <div
                  key={exam.id || idx}
                  className="bg-white rounded-3xl p-6 shadow-soft-card border border-slate-100 hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Header Banner */}
                    <div className={`w-full h-36 rounded-2xl bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform`}>
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white uppercase tracking-wider">
                          {exam.subject || 'General'}
                        </span>
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-400 text-slate-900 shadow-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-ping"></span>
                          Open
                        </span>
                      </div>

                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <span className="material-symbols-outlined text-2xl">{icon}</span>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Grade Target</p>
                          <p className="text-xs font-black text-white">{exam.grade || 'Standard'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="pt-4 space-y-2">
                      <h3 className="font-black text-base text-slate-900 group-hover:text-[#0a4b56] transition-colors leading-snug line-clamp-2">
                        {exam.name}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#0a4b56]">help</span>
                          {exam.questions} Questions
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#ff6551]">schedule</span>
                          {exam.timeMin || 60} mins
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-6 space-y-2">
                    <button
                      onClick={() => onTakeExam(exam)}
                      className="w-full h-11 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white text-xs font-black hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Start Assessment</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                    
                    <button
                      onClick={() => onToast && onToast(`Reminder set for ${exam.name}`, 'info')}
                      className="w-full py-2 text-center text-[11px] font-black text-slate-500 hover:text-[#0a4b56] transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">notifications</span>
                      <span>Set Calendar Reminder</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
