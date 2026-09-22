import React from 'react';

export default function AttemptDetailsModal({ attempt, onClose, onRetake }) {
  if (!attempt) return null;

  const isPass = attempt.result === 'Pass';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-md ${
              isPass ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-[#ff6551] border border-rose-200'
            }`}>
              <span className="material-symbols-outlined text-[24px]">
                {isPass ? 'emoji_events' : 'sentiment_dissatisfied'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{attempt.grade}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  isPass ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-[#ff6551] border-rose-200'
                }`}>
                  {attempt.result}
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight mt-0.5">{attempt.exam}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Score</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{attempt.score}</div>
              <span className="text-xs font-extrabold text-emerald-600">{attempt.scorePercent}%</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Rank</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{attempt.rank}</div>
              <span className="text-xs font-semibold text-slate-500">In Session</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Duration</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{attempt.duration}</div>
              <span className="text-xs font-semibold text-slate-500">Time Taken</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Attempts</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{attempt.attempts}</div>
              <span className="text-xs font-semibold text-slate-500">Slot Used</span>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="p-5 rounded-3xl bg-slate-50/80 border border-slate-100 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Question Breakdown</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
                  ✓
                </span>
                <div>
                  <div className="text-[11px] text-slate-400 font-bold">Correct</div>
                  <div className="font-black text-base text-slate-900">{attempt.correct}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                <span className="w-8 h-8 rounded-xl bg-rose-50 text-[#ff6551] flex items-center justify-center font-black text-sm">
                  ✕
                </span>
                <div>
                  <div className="text-[11px] text-slate-400 font-bold">Incorrect</div>
                  <div className="font-black text-base text-slate-900">{attempt.wrong}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-sm">
                  —
                </span>
                <div>
                  <div className="text-[11px] text-slate-400 font-bold">Skipped</div>
                  <div className="font-black text-base text-slate-900">{attempt.skipped}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="p-5 rounded-3xl bg-teal-50/50 border border-teal-100">
            <span className="text-xs font-extrabold text-[#0a4b56] uppercase tracking-wider">Attempt Notes & Diagnostic</span>
            <p className="text-xs text-slate-700 mt-2 font-semibold leading-relaxed">
              {attempt.details || "Performance recorded successfully in academic archive."}
            </p>
            <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              <span>Taken on {attempt.date}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close Window
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onRetake) onRetake(attempt);
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white text-xs font-extrabold hover:shadow-lg hover:shadow-[#0a4b56]/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">replay</span>
            <span>Retake Exam</span>
          </button>
        </div>
      </div>
    </div>
  );
}

