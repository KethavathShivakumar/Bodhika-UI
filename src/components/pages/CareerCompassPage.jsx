import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function CareerCompassPage({ questions, onNavigateToExam, onToast }) {
  const [answers, setAnswers] = useState({
    1: 'tech',
    2: 'code',
    3: 'dev',
    4: 'algo',
    5: 'tech_leader'
  });
  const [result, setResult] = useState(null);

  const handleSelect = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleGenerateRecommendations = () => {
    const trackScores = {
      'Engineering & Technology': 0,
      'Medical & Health': 0,
      'Management & Commerce': 0,
      'Design, Arts & Culture': 0,
      'Law & Government': 0
    };

    questions.forEach(q => {
      const chosenOpt = q.options.find(o => o.id === answers[q.id]);
      if (chosenOpt && chosenOpt.track && trackScores[chosenOpt.track] !== undefined) {
        trackScores[chosenOpt.track] += 1;
      } else if (chosenOpt && chosenOpt.track) {
        trackScores[chosenOpt.track] = (trackScores[chosenOpt.track] || 0) + 1;
      }
    });

    const topTrack = Object.keys(trackScores).reduce((a, b) => trackScores[a] > trackScores[b] ? a : b);

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }

    setResult({
      track: topTrack,
      confidence: '94% Match',
      recommendedExams: [
        { title: 'JEE Main 2027', category: 'Engineering', daysLeft: 91 },
        { title: 'SAT 2026-27', category: 'International', daysLeft: 33 },
        { title: 'DP-900: Azure Data Fundamentals', category: 'Cloud Certification', daysLeft: 15 }
      ],
      careers: ['Distributed Systems Architect', 'AI/ML Infrastructure Engineer', 'Algorithmic Researcher'],
      advisory: 'Your answers demonstrate exceptionally high analytical orientation combined with deep focus on programmatic construction and algorithmic reasoning.'
    });

    if (onToast) {
      onToast({
        title: 'Profile Diagnostic Complete',
        message: `Your recommended path is: ${topTrack}`,
        type: 'success'
      });
    }
  };

  const questionCardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      numBg: "bg-white/20 text-white backdrop-blur-md border border-white/30",
      selectedOpt: "bg-white text-[#0a4b56] font-black shadow-md border-white",
      unselectedOpt: "bg-black/20 text-white/90 border-white/20 hover:bg-black/30"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      numBg: "bg-white/20 text-white backdrop-blur-md border border-white/30",
      selectedOpt: "bg-white text-[#1e1b4b] font-black shadow-md border-white",
      unselectedOpt: "bg-black/20 text-white/90 border-white/20 hover:bg-black/30"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      numBg: "bg-white/20 text-white backdrop-blur-md border border-white/30",
      selectedOpt: "bg-white text-[#7c2d12] font-black shadow-md border-white",
      unselectedOpt: "bg-black/20 text-white/90 border-white/20 hover:bg-black/30"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      numBg: "bg-white/20 text-white backdrop-blur-md border border-white/30",
      selectedOpt: "bg-white text-[#4c1d95] font-black shadow-md border-white",
      unselectedOpt: "bg-black/20 text-white/90 border-white/20 hover:bg-black/30"
    },
    {
      bg: "bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#10b981] text-white border-emerald-300/30",
      numBg: "bg-white/20 text-white backdrop-blur-md border border-white/30",
      selectedOpt: "bg-white text-[#064e3b] font-black shadow-md border-white",
      unselectedOpt: "bg-black/20 text-white/90 border-white/20 hover:bg-black/30"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* PAGE HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a4b56] via-[#109c90] to-[#1d273e] p-8 text-white shadow-2xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <span className="material-symbols-outlined text-[16px]">explore</span>
              <span>Cognitive Assessment Engine</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
              Career Compass Diagnostic
            </h1>
            <p className="text-sm text-teal-100/90 font-medium leading-relaxed">
              Answer the cognitive orientation diagnostic to discover high-affinity academic career paths and mapped entrance examinations.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-2xl font-black text-amber-300">5</div>
              <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Questions</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. TOP SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-teal-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-100">Diagnostic Mode</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">5 Questions</div>
            <div className="text-xs text-teal-100/90 font-medium">Cognitive Alignment</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Assessment Status</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">Active</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-950 shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-300/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900/80">Match Accuracy</span>
            <div className="w-10 h-10 rounded-2xl bg-black/10 flex items-center justify-center text-slate-950 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">target</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">94% Confidence</div>
            <div className="text-xs text-slate-900/80 font-medium">Target Pathways</div>
          </div>
          <div className="p-3 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-black/10">
            <span>Accuracy Benchmark</span>
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-extrabold text-slate-950">High</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#00c853] to-[#009624] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">Mapped Exams</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">recommend</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">3 Recommended</div>
            <div className="text-xs text-emerald-100/90 font-medium">Direct Directory Link</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Recommendations</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">Ready</span>
          </div>
        </div>
      </div>

      {/* 2. QUESTIONS FULLY-COLORED CARDS STACK */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedVal = answers[q.id];
          const theme = questionCardColorPalettes[qIdx % questionCardColorPalettes.length];

          return (
            <div key={q.id} className={`${theme.bg} rounded-3xl p-6 md:p-8 shadow-soft-card border overflow-hidden space-y-4`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-2xl ${theme.numBg} flex items-center justify-center text-sm font-black shrink-0 shadow-md`}>
                  {q.id}
                </div>
                <div>
                  <h3 className="font-black text-lg text-white leading-snug drop-shadow-sm">{q.title}</h3>
                  <p className="text-xs text-white/80 font-medium mt-0.5">{q.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {q.options.map((opt) => {
                  const isSelected = selectedVal === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? theme.selectedOpt
                          : theme.unselectedOpt
                      }`}
                    >
                      <div className="font-black text-xs mb-1">{opt.text}</div>
                      <div className={`text-[11px] leading-relaxed opacity-90 ${isSelected ? '' : 'text-white/80'}`}>
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          onClick={handleGenerateRecommendations}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white font-black text-sm hover:shadow-xl hover:shadow-[#0a4b56]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Generate Career & Exam Alignment Analysis</span>
          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
        </button>

        {/* Diagnostic Result Output Card */}
        {result && (
          <div className="bg-gradient-to-br from-[#1d273e] via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-8 shadow-2xl border border-teal-300/30 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="text-xs font-black px-4 py-1.5 rounded-full bg-emerald-400 text-slate-900 shadow-sm">
                {result.confidence}
              </span>
              <span className="text-xs font-extrabold text-teal-200 uppercase tracking-wider">Diagnostic Result</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">{result.track}</h2>
              <p className="text-xs text-white/90 font-medium leading-relaxed bg-black/20 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                {result.advisory}
              </p>
            </div>

            <button
              onClick={() => onNavigateToExam()}
              className="px-6 py-3.5 rounded-2xl bg-white text-[#0a4b56] text-xs font-black hover:bg-teal-50 transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Explore Mapped Exams in Directory</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
