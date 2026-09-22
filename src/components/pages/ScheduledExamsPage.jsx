import React, { useState } from 'react';

export default function ScheduledExamsPage({ scheduledList, onStartExam, onToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredExams = scheduledList.filter(exam => {
    if (searchQuery && !exam.name.toLowerCase().includes(searchQuery.toLowerCase()) && !exam.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterType === 'Mandatory' && !exam.mandatory) return false;
    if (filterType === 'Online' && !exam.mode.includes('Online')) return false;
    if (filterType === 'Center' && !exam.mode.includes('Center') && !exam.mode.includes('Lab')) return false;
    return true;
  });

  const getExamIcon = (exam) => {
    const text = (exam.name + ' ' + exam.subject + ' ' + exam.category).toLowerCase();
    if (text.includes('azure') || text.includes('cloud')) return 'cloud';
    if (text.includes('python') || text.includes('algorithm')) return 'terminal';
    if (text.includes('biology') || text.includes('neet')) return 'biotech';
    if (text.includes('jee') || text.includes('physics')) return 'functions';
    return 'calendar_month';
  };

  const handleAddToCalendar = (exam) => {
    if (onToast) {
      onToast({
        title: 'Calendar Reminder Added',
        message: `Event for ${exam.name} on ${exam.date} at ${exam.startTime} added to your calendar.`,
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
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md",
      iconBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/30"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP COLORFUL SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white shadow-soft-card flex flex-col justify-between border border-teal-300/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-200">Total Scheduled</span>
            <span className="material-symbols-outlined text-[20px] text-white/80">event</span>
          </div>
          <div className="text-3xl font-black tracking-tight mt-2">{scheduledList.length} Tests</div>
          <div className="mt-3 p-2.5 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-between text-xs font-black">
            <span>Confirmed Slots</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">100%</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 shadow-soft-card flex flex-col justify-between border border-amber-300/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900/80">Next Assessment</span>
            <span className="material-symbols-outlined text-[20px] text-slate-800">schedule</span>
          </div>
          <div className="text-3xl font-black tracking-tight mt-2">In 2 Days</div>
          <div className="mt-3 p-2.5 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-between text-xs font-black">
            <span>12 Sep 2026</span>
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px]">10:00 AM</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#ff6551] to-[#e04e3b] text-white shadow-soft-card flex flex-col justify-between border border-rose-300/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-white/90">Mandatory Mocks</span>
            <span className="material-symbols-outlined text-[20px] text-white/80">priority_high</span>
          </div>
          <div className="text-3xl font-black tracking-tight mt-2">
            {scheduledList.filter(e => e.mandatory).length} Mandatory
          </div>
          <div className="mt-3 p-2.5 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-between text-xs font-black">
            <span>Required Benchmark</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">Critical</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white shadow-soft-card flex flex-col justify-between border border-slate-600/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Timezone Sync</span>
            <span className="material-symbols-outlined text-[20px] text-white/80">public</span>
          </div>
          <div className="text-3xl font-black tracking-tight mt-2">IST (UTC+5:30)</div>
          <div className="mt-3 p-2.5 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-between text-xs font-black">
            <span>Active Server</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">Synced</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER BAR & FILTERS */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-5 shadow-soft-card border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-white mb-1 border border-white/30">
            <span className="material-symbols-outlined text-[15px]">event</span>
            Academic Timetable
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Scheduled Examinations</h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Mandatory', 'Online', 'Center'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-white text-[#0a4b56] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {type === 'All' ? 'All Schedules' : type}
            </button>
          ))}
        </div>
      </div>

      {/* 3. SCHEDULED EXAM FULLY-COLORED CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam, idx) => {
          const theme = cardColorPalettes[idx % cardColorPalettes.length];

          return (
            <div 
              key={exam.id}
              className={`${theme.bg} rounded-3xl p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl ${theme.iconBg} flex items-center justify-center font-bold shadow-sm border border-white/20`}>
                    <span className="material-symbols-outlined text-[22px]">{getExamIcon(exam)}</span>
                  </div>

                  <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                    exam.mandatory ? 'bg-rose-400 text-slate-900 font-extrabold' : 'bg-white/20 text-white border border-white/30'
                  }`}>
                    {exam.mandatory ? 'Mandatory Mock' : 'Optional Mock'}
                  </span>
                </div>

                <h3 className="font-black text-lg text-white leading-snug mb-1 drop-shadow-sm">
                  {exam.name}
                </h3>
                <p className={`${theme.subText} text-xs font-semibold mb-4`}>
                  {exam.subject} • Mode: <strong className="text-white font-extrabold">{exam.mode}</strong>
                </p>

                <div className={`${theme.metaBg} rounded-2xl p-3.5 space-y-1.5 text-xs font-semibold mb-5`}>
                  <div className="flex justify-between">
                    <span className="opacity-80">Date & Time:</span>
                    <span className="text-white font-black">{exam.date} @ {exam.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Duration:</span>
                    <span className="text-white font-black">{exam.durationMins || 60} mins</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center gap-2">
                <button
                  onClick={() => onStartExam(exam)}
                  className={`flex-1 h-11 rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer`}
                >
                  <span>Enter Test Window</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>

                <button
                  onClick={() => handleAddToCalendar(exam)}
                  className={`w-11 h-11 rounded-2xl ${theme.iconBtn} active:scale-95 transition-all flex items-center justify-center cursor-pointer`}
                  title="Add to Calendar"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
