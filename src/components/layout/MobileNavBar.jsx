import React from 'react';

export default function MobileNavBar({ activePage, onNavigate }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-lg border-t border-slate-200/70 z-40 flex items-center justify-around px-2 shadow-float">
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all ${
          activePage === 'dashboard' ? 'text-brand-teal font-extrabold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">home</span>
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      <button
        onClick={() => onNavigate('timeline-deadlines')}
        className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all ${
          activePage === 'timeline-deadlines' ? 'text-brand-teal font-extrabold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">calendar_month</span>
        <span className="text-[10px] mt-0.5">Calendar</span>
      </button>

      <button
        onClick={() => onNavigate('study-resources', 'all')}
        className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all ${
          activePage === 'study-resources' ? 'text-brand-teal font-extrabold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">chat_bubble_outline</span>
        <span className="text-[10px] mt-0.5">Messages</span>
      </button>

      <button
        onClick={() => onNavigate('exampath-directory')}
        className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all ${
          activePage === 'exampath-directory' || activePage === 'exam-tracker' ? 'text-brand-teal font-extrabold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">grid_view</span>
        <span className="text-[10px] mt-0.5">More</span>
      </button>
    </div>
  );
}
