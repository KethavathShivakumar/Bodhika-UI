import React, { useState } from 'react';

export default function TakeExamPage({ availableExams = [], onStartExam, onToast }) {
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const categories = ['All', 'Cloud & Data', 'Aptitude', 'Computer Science', 'Medical & Entrance'];

  const filteredExams = availableExams.filter(exam => {
    const name = exam.name || '';
    const subject = exam.subject || '';
    const category = exam.category || '';
    
    const matchesSearch = !searchQuery || 
      name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'Cloud & Data' && (category.includes('Cloud') || subject.includes('Azure') || subject.includes('Data'))) return true;
    if (categoryFilter === 'Aptitude' && (category.includes('Aptitude') || subject.includes('Verbal') || subject.includes('Reasoning'))) return true;
    if (categoryFilter === 'Computer Science' && (category.includes('Computer') || subject.includes('Python') || subject.includes('Algorithm'))) return true;
    if (categoryFilter === 'Medical & Entrance' && (category.includes('Medical') || subject.includes('Biology') || subject.includes('NEET') || subject.includes('JEE'))) return true;
    
    return true;
  });

  const cardHeaderGradients = [
    "from-[#0a4b56] to-[#109c90]",
    "from-[#ff6551] to-[#e04e3b]",
    "from-[#f4ad42] to-[#d9911e]",
    "from-[#1d273e] to-[#2d3748]",
    "from-[#3b82f6] to-[#1d4ed8]"
  ];

  const handleSelectExamForInstructions = (exam) => {
    setSelectedExam(exam);
    setAgreedToTerms(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToConfirmation = () => {
    if (!agreedToTerms) {
      if (onToast) {
        onToast({
          title: 'Agreement Required',
          message: 'Please check the box confirming you have read and agreed to the exam regulations.',
          type: 'error'
        });
      }
      return;
    }
    setShowConfirmModal(true);
  };

  const handleFinalConfirmStart = () => {
    setShowConfirmModal(false);
    if (onStartExam) {
      onStartExam(selectedExam);
    }
  };

  const getQuestionCount = (exam) => {
    if (exam.questionsCount) return exam.questionsCount;
    if (Array.isArray(exam.questions)) return exam.questions.length;
    if (typeof exam.questions === 'number') return exam.questions;
    return 10;
  };

  const getDuration = (exam) => {
    return exam.durationMin || exam.durationMins || exam.timeMin || 30;
  };

  const getPassCutoff = (exam) => {
    if (typeof exam.passPercent === 'number') return `${exam.passPercent}%`;
    return exam.passPercent || '60%';
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      
      {!selectedExam && (
        <>
          {/* 1. TOP METRIC SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white shadow-soft-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-200">Available Exams</span>
                <span className="material-symbols-outlined text-[20px] text-white/80">assignment</span>
              </div>
              <div className="text-3xl font-black tracking-tight mt-2">{availableExams.length} Ready</div>
              <div className="mt-3 p-2.5 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-between text-xs font-black">
                <span>Active Windows</span>
                <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">Instant Launch</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#ff6551] to-[#e04e3b] text-white shadow-soft-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-white/90">Attempts Policy</span>
                <span className="material-symbols-outlined text-[20px] text-white/80">history_edu</span>
              </div>
              <div className="text-3xl font-black tracking-tight mt-2">3 Attempts</div>
              <div className="mt-3 p-2.5 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-between text-xs font-black">
                <span>Best Score Tracked</span>
                <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">Highest</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 shadow-soft-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-900/80">Pass Threshold</span>
                <span className="material-symbols-outlined text-[20px] text-slate-800">verified</span>
              </div>
              <div className="text-3xl font-black tracking-tight mt-2">60% Cutoff</div>
              <div className="mt-3 p-2.5 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-between text-xs font-black">
                <span>Certificate Eligibility</span>
                <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px]">Passed</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white shadow-soft-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Proctoring AI</span>
                <span className="material-symbols-outlined text-[20px] text-white/80">security</span>
              </div>
              <div className="text-3xl font-black tracking-tight mt-2">Anti-Cheat Active</div>
              <div className="mt-3 p-2.5 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-between text-xs font-black">
                <span>Tab Lock & Timer</span>
                <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px]">Monitored</span>
              </div>
            </div>
          </div>

          {/* 2. HEADER BAR & SEARCH */}
          <div className="bg-white rounded-3xl p-5 shadow-soft-card border border-slate-100/90 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 rounded-full text-xs font-black text-[#0a4b56] mb-1 border border-teal-100">
                  <span className="material-symbols-outlined text-[15px]">play_circle</span>
                  Examination Execution Portal
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Assigned Examinations</h1>
              </div>

              <div className="w-full md:w-80 bg-slate-50 rounded-2xl flex items-center px-4 h-11 gap-2 border border-slate-200">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
                <input
                  type="text"
                  placeholder="Search assigned exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full text-slate-800 placeholder:text-slate-400 font-semibold"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3. AVAILABLE EXAMS CARDS GRID */}
          {filteredExams.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-soft-card border border-slate-100 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <span className="material-symbols-outlined text-3xl">assignment_late</span>
              </div>
              <h3 className="text-base font-black text-slate-800">No Examinations Match Criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No active exams were found for your search query or selected category filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}
                className="px-5 py-2.5 rounded-2xl bg-[#0a4b56] text-white text-xs font-black hover:bg-[#083c45] transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExams.map((exam, idx) => {
                const gradient = cardHeaderGradients[idx % cardHeaderGradients.length];
                const qCount = getQuestionCount(exam);
                const duration = getDuration(exam);
                const passCutoff = getPassCutoff(exam);

                return (
                  <div 
                    key={exam.id || idx}
                    className="bg-white rounded-3xl p-6 shadow-soft-card border border-slate-100 hover:shadow-hover-card hover:border-[#0a4b56]/40 transition-all flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      {/* Top Header Card Banner */}
                      <div className={`w-full h-28 rounded-2xl bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between mb-4 relative overflow-hidden group-hover:scale-[1.01] transition-transform`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white uppercase tracking-wider">
                            {exam.category || 'General'}
                          </span>
                          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-400 text-slate-900 shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-ping"></span>
                            Ready to Take
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-white/90">assignment_turned_in</span>
                            <span className="text-xs font-extrabold">{exam.grade || 'Standard'}</span>
                          </div>
                          <span className="text-[10px] font-black text-white/80">Attempts: {exam.attemptsUsed ? `${exam.attemptsUsed}/${exam.attemptsAllowed || 3}` : (exam.attempts || '0/3')}</span>
                        </div>
                      </div>

                      <h3 className="font-black text-base text-slate-900 group-hover:text-[#0a4b56] transition-colors leading-snug mb-1">
                        {exam.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold line-clamp-2 mb-4 leading-relaxed">
                        {exam.subject || exam.description || 'Standard competitive assessment drill.'}
                      </p>

                      <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-slate-600 mb-4 border border-slate-100">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-[#0a4b56]">help</span>
                          {qCount} Qs
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-[#ff6551]">schedule</span>
                          {duration} mins
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-[#f4ad42]">verified</span>
                          Cutoff: {passCutoff}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectExamForInstructions(exam)}
                      className="w-full h-11 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white font-black text-xs hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Review Rules & Start</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* View 2: Exam Instructions Mode */}
      {selectedExam && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-card border border-slate-100/90 space-y-6">
          <button
            onClick={() => setSelectedExam(null)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-black hover:bg-slate-200 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Exam List</span>
          </button>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 rounded-full text-xs font-black text-amber-800 mb-2 border border-amber-100">
              <span className="material-symbols-outlined text-[15px]">info</span>
              Official Examination Rules & Regulations
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{selectedExam.name}</h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Category: {selectedExam.category || 'General'} • Subject: {selectedExam.subject}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-teal-50 text-[#0a4b56] font-black text-xs flex flex-col items-center text-center border border-teal-100">
              <span className="material-symbols-outlined text-[24px] mb-1">help_outline</span>
              <span>{getQuestionCount(selectedExam)} Total Questions</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 text-amber-900 font-black text-xs flex flex-col items-center text-center border border-amber-100">
              <span className="material-symbols-outlined text-[24px] mb-1">timer</span>
              <span>{getDuration(selectedExam)} Minutes Duration</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-black text-xs flex flex-col items-center text-center border border-emerald-100">
              <span className="material-symbols-outlined text-[24px] mb-1">verified</span>
              <span>{getPassCutoff(selectedExam)} Passing Cutoff</span>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs text-slate-700 font-semibold leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-900 text-sm">General Instructions & Anti-Cheat Rules:</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              {selectedExam.instructions ? (
                selectedExam.instructions.map((inst, i) => <li key={i}>{inst}</li>)
              ) : (
                <>
                  <li>Ensure a stable internet connection. Switching browser tabs or windows is logged and proctored.</li>
                  <li>The timer starts immediately upon clicking <strong>Confirm & Launch Exam</strong>.</li>
                  <li>Questions can be marked for review and returned to before final submission.</li>
                </>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="agree-terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-[#0a4b56] focus:ring-[#0a4b56] cursor-pointer"
            />
            <label htmlFor="agree-terms" className="text-xs font-black text-slate-800 cursor-pointer select-none">
              I have read, understood, and agree to follow all examination rules.
            </label>
          </div>

          <button
            onClick={handleProceedToConfirmation}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white font-black text-sm hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confirm & Launch Exam</span>
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-float space-y-5 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Start Exam Session?</h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                You are about to launch <strong>{selectedExam?.name}</strong>. The countdown timer will start immediately.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 h-10 rounded-2xl bg-slate-100 text-slate-700 font-black text-xs hover:bg-slate-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalConfirmStart}
                className="flex-1 h-10 rounded-2xl bg-[#0a4b56] text-white font-black text-xs hover:bg-[#109c90] transition-all shadow-sm cursor-pointer"
              >
                Launch Test
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
