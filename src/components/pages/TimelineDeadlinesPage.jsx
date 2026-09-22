import React from 'react';

export default function TimelineDeadlinesPage({ onToast }) {
  const timelineGroups = [
    {
      month: "October 2026",
      events: [
        {
          id: "t-1",
          dateNum: "03",
          dateDay: "SAT",
          title: "SAT 2026-27 Reasoning Test",
          track: "International",
          priority: "HIGH PRIORITY",
          closingNote: "Registration closes Oct 03, 2026",
          centers: "Multiple Centers / Digital CBT",
          examWindow: "Exam: Aug, Sep, Oct, Nov, Dec 2026"
        },
        {
          id: "t-2",
          dateNum: "15",
          dateDay: "THU",
          title: "TOEFL iBT Examination",
          track: "International",
          priority: "NORMAL PRIORITY",
          closingNote: "Registration closes Oct 01, 2026",
          centers: "Online / Select Centers",
          examWindow: "Exam Window: Continuous Testing"
        }
      ]
    },
    {
      month: "November 2026",
      events: [
        {
          id: "t-3",
          dateNum: "01",
          dateDay: "SUN",
          title: "US Common App (Early Decision)",
          track: "International",
          priority: "HIGH PRIORITY",
          closingNote: "Deadline: Nov 1 (ED)",
          centers: "Online Portal Submission",
          examWindow: "Admission Cycle Fall 2027"
        },
        {
          id: "t-4",
          dateNum: "30",
          dateDay: "MON",
          title: "JEE Main 2027 (Session 1)",
          track: "Engineering & Technology",
          priority: "CRITICAL",
          closingNote: "Registration deadline: Late Nov 2026",
          centers: "All Major Cities across India",
          examWindow: "Examination Dates: Jan 21-30, 2027"
        }
      ]
    }
  ];

  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      subText: "text-teal-100/90 font-medium",
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md"
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
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              <span>Academic Timetable & Deadlines</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
              Important Dates & Key Deadlines
            </h1>
            <p className="text-sm text-teal-100/90 font-medium leading-relaxed">
              Track critical test dates, registration windows, and application deadlines across national and international exams.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-2xl font-black text-amber-300">4</div>
              <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Key Milestones</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. TOP SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#ff6551] to-[#e04e3b] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-100">Critical Deadlines</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">4 Urgent</div>
            <div className="text-xs text-rose-100/90 font-medium">Immediate focus required</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Action Required</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">High</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-950 shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-300/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900/80">Next 60 Days</span>
            <div className="w-10 h-10 rounded-2xl bg-black/10 flex items-center justify-center text-slate-950 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">7 Events</div>
            <div className="text-xs text-slate-900/80 font-medium">Calendar schedule</div>
          </div>
          <div className="p-3 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-black/10">
            <span>Calendar Windows</span>
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-extrabold text-slate-950">Upcoming</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-teal-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-100">Global Entrances</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">public</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">SAT & TOEFL</div>
            <div className="text-xs text-teal-100/90 font-medium">International track</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>US & Global</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">Active</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-600/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">National Exams</span>
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">flag</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">JEE Main 2027</div>
            <div className="text-xs text-slate-300 font-medium">Engineering Entrance</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>NTA Portal</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-extrabold">Verified</span>
          </div>
        </div>
      </div>

      {/* 2. TIMELINE GROUPS & FULLY-COLORED CARDS */}
      <div className="space-y-8">
        {timelineGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-[#0a4b56]" />
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{group.month}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.events.map((event, idx) => {
                const theme = cardColorPalettes[(gIdx * 2 + idx) % cardColorPalettes.length];

                return (
                  <div 
                    key={event.id}
                    className={`${theme.bg} rounded-3xl p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 group overflow-hidden border`}
                  >
                    {/* Date Badge Container */}
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md text-white flex flex-col items-center justify-center shrink-0 shadow-md border border-white/30 group-hover:scale-105 transition-transform">
                      <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase">{event.dateDay}</span>
                      <span className="text-2xl font-black leading-none">{event.dateNum}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full ${theme.badge}`}>
                          {event.track}
                        </span>

                        <span className="text-[10px] font-black px-3 py-1 rounded-full bg-rose-400 text-slate-900">
                          {event.priority}
                        </span>
                      </div>

                      <h3 className="font-black text-lg text-white leading-snug mb-1 drop-shadow-sm">
                        {event.title}
                      </h3>
                      <p className={`${theme.subText} text-xs font-medium mb-4 leading-relaxed`}>
                        {event.closingNote}
                      </p>

                      <button
                        onClick={() => {
                          if (onToast) {
                            onToast({ title: 'Calendar Sync', message: `Added ${event.title} to calendar.`, type: 'success' });
                          }
                        }}
                        className={`px-4 py-2.5 rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs`}
                      >
                        <span>Set Calendar Reminder</span>
                        <span className="material-symbols-outlined text-[16px]">notifications</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
