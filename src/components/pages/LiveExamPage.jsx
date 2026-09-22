import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function LiveExamPage({ exam, onCompleteExam, onExitExam, onToast }) {
  const questions = exam?.questions || [];
  const totalQuestions = questions.length || 1;
  const initialDuration = (exam?.durationMin || 15) * 60;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState({});
  const [reviewQuestions, setReviewQuestions] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({ 1: true });
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [layoutMode, setLayoutMode] = useState('stacked');
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [examResult, setExamResult] = useState(null);

  // Active countdown timer
  useEffect(() => {
    if (examResult) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examResult]);

  const currentQ = questions[currentQIndex] || questions[0];

  const goToQuestion = (index) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQIndex(index);
      setVisitedQuestions(prev => ({ ...prev, [questions[index].id]: true }));
    }
  };

  const handleSelectOption = (optId) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
    setSkippedQuestions(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    setReviewQuestions(prev => {
      const copy = { ...prev };
      if (copy[currentQ.id]) {
        delete copy[currentQ.id];
        onToast({ title: 'Flag Removed', message: `Question ${currentQ.id} unflagged.`, type: 'info' });
      } else {
        copy[currentQ.id] = true;
        onToast({ title: 'Marked for Review', message: `Question ${currentQ.id} flagged for review.`, type: 'info' });
      }
      return copy;
    });
  };

  const handleSkip = () => {
    setSkippedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
    if (currentQIndex < totalQuestions - 1) {
      goToQuestion(currentQIndex + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
      goToQuestion(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      goToQuestion(currentQIndex - 1);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.keys(reviewQuestions).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleSubmitExam = () => {
    setShowSubmitModal(false);

    let correctCount = 0;
    let wrongCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      } else if (selectedAnswers[q.id] !== undefined) {
        wrongCount++;
      }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passThreshold = exam?.passPercent || 60;
    const passed = scorePercent >= passThreshold;

    if (passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // safe fallback
      }
    }

    const resultData = {
      id: `att-${Date.now()}`,
      rank: passed ? "#1" : "#2",
      exam: exam?.name || "Official Examination",
      grade: exam?.grade || "Academic Evaluation",
      subject: exam?.subject || "Examination Assessment",
      score: `${correctCount} / ${totalQuestions}`,
      scorePercent,
      correct: correctCount,
      wrong: wrongCount,
      skipped: totalQuestions - answeredCount,
      result: passed ? "Pass" : "Fail",
      attempts: `${(exam?.attemptsUsed || 1) + 1}/${exam?.attemptsAllowed || 3}`,
      duration: formatTimer(initialDuration - timeLeft),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      details: passed
        ? `Congratulations! You successfully cleared ${exam?.name || 'the examination'} with ${scorePercent}% (Cutoff: ${passThreshold}%).`
        : `Passing cutoff (${passThreshold}%) was not reached on this attempt. Review question solutions below.`
    };

    setExamResult(resultData);
    if (onCompleteExam) {
      onCompleteExam(resultData);
    }
    onToast({
      title: passed ? 'Exam Passed! 🎉' : 'Exam Submitted',
      message: `Attained Score: ${scorePercent}%. Result: ${resultData.result}`,
      type: passed ? 'success' : 'error'
    });
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Top Guidelines Banner */}
      {showInstructions && (
        <div className="bg-teal-50/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-teal-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0a4b56] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0a4b56]">Active Session Guidelines</h4>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                Select your answer for each question. You can bookmark questions for review before submitting.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            className="px-4 py-1.5 rounded-full bg-[#0a4b56] text-white text-xs font-black hover:bg-[#109c90] transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Exam Title & Metadata Header */}
      <div className="bg-white rounded-3xl p-6 shadow-soft-card border border-slate-100/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-[#0a4b56] uppercase tracking-wider">
              {exam?.grade || 'Standard'}
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs font-bold text-slate-500">{exam?.category}</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            {exam?.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold mt-2">
            <span>Subject: <strong className="text-slate-900">{exam?.subject}</strong></span>
            <span>•</span>
            <span>Questions: <strong className="text-slate-900">{totalQuestions}</strong></span>
            <span>•</span>
            <span>Pass Cutoff: <strong className="text-[#0a4b56]">{exam?.passPercent || 60}%</strong></span>
          </div>
        </div>

        {/* Right Stats: Timer & Layout Switcher */}
        <div className="flex flex-wrap items-center gap-4 self-end md:self-auto">
          <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setLayoutMode('stacked')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${layoutMode === 'stacked' ? 'bg-white shadow-sm text-slate-900 font-black' : 'text-slate-500'}`}
            >
              Stacked
            </button>
            <button
              onClick={() => setLayoutMode('side-by-side')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${layoutMode === 'side-by-side' ? 'bg-white shadow-sm text-slate-900 font-black' : 'text-slate-500'}`}
            >
              Side-by-side
            </button>
          </div>

          {/* Time Left Counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px] animate-pulse">timer</span>
            <span className="text-xs font-bold">Time Left:</span>
            <span className="text-base font-mono font-black">{formatTimer(timeLeft)}</span>
          </div>

          {/* Answered counter */}
          <div className="text-xs font-black text-slate-800 bg-teal-50 px-3.5 py-2 rounded-2xl border border-teal-100">
            Answered: <span className="text-[#0a4b56]">{answeredCount}</span> / {totalQuestions}
          </div>

          <button
            onClick={onExitExam}
            className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors px-2 py-1 cursor-pointer"
          >
            Exit Exam
          </button>
        </div>
      </div>

      {/* Question Navigator Palette */}
      <div className="bg-white rounded-3xl p-5 shadow-soft-card border border-slate-100/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-4 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#0a4b56]"></span>
              <span className="text-slate-700">Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700">Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-600"></span>
              <span className="text-slate-700">Review ({reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="text-slate-700">Skipped</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span className="text-slate-500">Not visited</span>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-semibold">Click number to jump</span>
        </div>

        {/* Numbers Palette Row */}
        <div className="flex flex-wrap items-center gap-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentQIndex;
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isReviewed = reviewQuestions[q.id];
            const isSkipped = skippedQuestions[q.id];
            const isVisited = visitedQuestions[q.id];

            let paletteStyle = "bg-slate-100 text-slate-500 border-transparent";
            if (isAnswered) {
              paletteStyle = "bg-emerald-500 text-white font-black shadow-sm";
            } else if (isReviewed) {
              paletteStyle = "bg-purple-600 text-white font-black shadow-sm";
            } else if (isSkipped) {
              paletteStyle = "bg-amber-400 text-slate-900 font-black";
            } else if (isVisited) {
              paletteStyle = "bg-slate-200 text-slate-800 font-bold";
            }

            if (isCurrent) {
              paletteStyle = "bg-[#0a4b56] text-white font-black ring-4 ring-teal-200 scale-105 z-10 shadow-md";
            }

            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(idx)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs transition-all cursor-pointer relative ${paletteStyle}`}
              >
                <span>{idx + 1}</span>
                {isReviewed && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Workspace */}
      <div className={`grid gap-6 ${layoutMode === 'side-by-side' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Question & Options Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-card border border-slate-100/90 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-2xl bg-[#0a4b56] text-white flex items-center justify-center font-black text-xs shadow-sm">
                {currentQ.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-50 text-[#0a4b56] text-xs font-black border border-teal-100">
                {currentQ.type}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleReview}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1 border cursor-pointer ${
                  reviewQuestions[currentQ.id]
                    ? 'bg-purple-100 text-purple-900 border-purple-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {reviewQuestions[currentQ.id] ? 'bookmark_added' : 'bookmark_border'}
                </span>
                <span>{reviewQuestions[currentQ.id] ? 'Review Flagged' : 'Mark for Review'}</span>
              </button>

              <button
                onClick={handleSkip}
                className="px-3.5 py-1.5 rounded-2xl bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-black transition-colors border border-amber-200 cursor-pointer"
              >
                Skip
              </button>
              <button
                onClick={handlePrev}
                disabled={currentQIndex === 0}
                className="px-3.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-colors disabled:opacity-40 cursor-pointer"
              >
                ‹ Prev
              </button>
              <button
                onClick={handleNext}
                disabled={currentQIndex === totalQuestions - 1}
                className="px-4 py-1.5 rounded-2xl bg-[#0a4b56] text-white text-xs font-black hover:bg-[#109c90] transition-colors disabled:opacity-40 cursor-pointer"
              >
                Next ›
              </button>
            </div>
          </div>

          {/* Question Statement */}
          <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed pt-2">
            {currentQ.question}
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options?.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <label
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className="block cursor-pointer select-none group"
                >
                  <div
                    className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-teal-50/70 border-[#0a4b56] shadow-sm ring-2 ring-[#0a4b56]/20'
                        : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#0a4b56] text-white shadow-sm'
                          : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                      }`}
                    >
                      {opt.id}
                    </div>
                    <span className="text-sm font-bold text-slate-900 leading-normal flex-1">
                      {opt.text}
                    </span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[22px] text-[#0a4b56]">
                        check_circle
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">
              Question {currentQIndex + 1} of {totalQuestions}
            </span>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-black hover:bg-[#0a4b56] transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              <span>Submit Exam</span>
            </button>
          </div>
        </div>

        {/* Side-by-side Panel */}
        {layoutMode === 'side-by-side' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-card border border-slate-100/90 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-black text-base text-slate-900">Live Session Matrix</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Review your current progress before finalizing your submission.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-center">
                  <span className="text-[10px] uppercase font-black text-[#0a4b56]">Answered</span>
                  <div className="text-2xl font-black text-[#0a4b56] mt-0.5">{answeredCount}</div>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 text-center border border-purple-200">
                  <span className="text-[10px] uppercase font-black text-purple-800">For Review</span>
                  <div className="text-2xl font-black text-purple-800 mt-0.5">{reviewCount}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 text-center border border-slate-100">
                  <span className="text-[10px] uppercase font-black text-slate-400">Unanswered</span>
                  <div className="text-2xl font-black text-rose-600 mt-0.5">{unansweredCount}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 font-bold">
              Passing Cutoff: {exam?.passPercent || 60}% required to clear.
            </div>
          </div>
        )}
      </div>

      {/* Submit Confirmation Dialog */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-float border border-slate-100 max-w-md w-full p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0a4b56] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900">Submit Examination?</h3>
                <p className="text-xs text-slate-400 font-semibold">Confirm your choices before concluding</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 space-y-2 text-xs border border-slate-100 font-bold">
              <div className="flex justify-between">
                <span className="text-slate-500">Answered:</span>
                <span className="font-black text-[#0a4b56]">{answeredCount} of {totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unanswered:</span>
                <span className="font-black text-rose-600">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Marked for Review:</span>
                <span className="font-black text-purple-700">{reviewCount}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Time Left:</span>
                <span className="font-mono font-black text-slate-900">{formatTimer(timeLeft)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-full text-xs font-black text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Continue Exam
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-full bg-[#0a4b56] text-white text-xs font-black hover:bg-[#109c90] transition-opacity shadow-sm cursor-pointer"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Score Modal */}
      {examResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-float border border-slate-100 max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  examResult.result === 'Pass' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  <span className="material-symbols-outlined text-[28px]">
                    {examResult.result === 'Pass' ? 'verified' : 'cancel'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">{examResult.grade}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase ${
                      examResult.result === 'Pass' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {examResult.result}
                    </span>
                  </div>
                  <h3 className="font-black text-xl text-slate-900 mt-0.5">{examResult.exam}</h3>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">Attained Score</span>
                  <div className="text-4xl font-black text-slate-900 mt-1">{examResult.scorePercent}%</div>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {examResult.correct} correct out of {totalQuestions} questions ({examResult.details})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-2xl text-center min-w-[90px] shadow-sm border border-slate-100">
                    <div className="text-xs text-slate-400 font-bold">Correct</div>
                    <div className="text-lg font-black text-emerald-600">{examResult.correct}</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl text-center min-w-[90px] shadow-sm border border-slate-100">
                    <div className="text-xs text-slate-400 font-bold">Wrong</div>
                    <div className="text-lg font-black text-rose-600">{examResult.wrong}</div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl text-center min-w-[90px] shadow-sm border border-slate-100">
                    <div className="text-xs text-slate-400 font-bold">Time</div>
                    <div className="text-lg font-black text-slate-900">{examResult.duration}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Answer Review & Explanations</h4>
                {questions.map((q, idx) => {
                  const studentAns = selectedAnswers[q.id];
                  const isCorrect = studentAns === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                          }`}>
                            {isCorrect ? '✓' : '✕'}
                          </span>
                          <span className="text-xs font-black text-slate-900">Question {idx + 1}</span>
                        </div>
                        <span className={`text-[11px] font-black ${isCorrect ? 'text-emerald-700' : studentAns ? 'text-rose-600' : 'text-slate-400'}`}>
                          {isCorrect ? 'Correct' : studentAns ? `Incorrect (Choice: ${studentAns})` : 'Skipped'}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-800">{q.question}</p>

                      <div className="p-3 rounded-xl bg-white text-xs text-slate-600 font-semibold border border-slate-100">
                        <span className="font-black text-[#0a4b56]">Explanation: </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onExitExam}
                className="px-5 py-2 rounded-full text-xs font-black text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Back to Available Exams
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAnswers({});
                  setSkippedQuestions({});
                  setReviewQuestions({});
                  setCurrentQIndex(0);
                  setTimeLeft(initialDuration);
                  setExamResult(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#0a4b56] text-white text-xs font-black hover:bg-[#109c90] transition-opacity flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">replay</span>
                <span>Retake Exam</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

