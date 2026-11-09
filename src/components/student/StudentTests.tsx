import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { Quiz, Question } from '../../types';

interface StudentTestsProps {
  quizzes: Quiz[];
  onQuizCompleted: (quizId: string, scorePercent: number) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const StudentTests: React.FC<StudentTestsProps> = ({
  quizzes,
  onQuizCompleted,
  onShowToast,
}) => {
  // If activeQuiz is null, we show the quiz list; otherwise we're taking/reviewing a test
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Active examination execution states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [obtainedScorePercent, setObtainedScorePercent] = useState<number | null>(null);
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!activeQuiz || isExamSubmitted) return;

    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      onShowToast('Time expired! Your examination was automatically evaluated and submitted.', 'info');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, isExamSubmitted, timeLeftSeconds]);

  const startTest = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(quiz.durationMinutes * 60);
    setIsExamSubmitted(false);
    setObtainedScorePercent(null);
  };

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isExamSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const handleFinalSubmit = () => {
    if (!activeQuiz) return;
    setShowConfirmSubmitModal(false);

    // Calculate score
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / activeQuiz.questions.length) * 100);
    setObtainedScorePercent(percent);
    setIsExamSubmitted(true);

    onQuizCompleted(activeQuiz.id, percent);

    if (percent >= activeQuiz.passingScorePercent) {
      onShowToast(`Congratulations! You passed with ${percent}%. Next lecture unlocked.`, 'success');
    } else {
      onShowToast(`Score: ${percent}%. Minimum ${activeQuiz.passingScorePercent}% required. Retake available.`, 'error');
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If taking/reviewing an examination
  if (activeQuiz) {
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    const totalQ = activeQuiz.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;
    const isPassed =
      obtainedScorePercent !== null && obtainedScorePercent >= activeQuiz.passingScorePercent;

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* ─── TEST ACTIVE HEADER ─── */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
              {activeQuiz.moduleTitle}
            </span>
            <h2 className="text-lg font-bold text-slate-900">{activeQuiz.title}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {!isExamSubmitted ? (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                  timeLeftSeconds < 120
                    ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            ) : (
              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  isPassed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                Score: {obtainedScorePercent}% ({isPassed ? 'PASSED' : 'FAILED'})
              </div>
            )}

            {!isExamSubmitted ? (
              <button
                onClick={() => setShowConfirmSubmitModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setActiveQuiz(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Back to Tests Hub
              </button>
            )}
          </div>
        </div>

        {/* ─── RESULT SUMMARY CARD (IF SUBMITTED) ─── */}
        {isExamSubmitted && obtainedScorePercent !== null && (
          <div
            className={`p-6 rounded-2xl border ${
              isPassed
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-red-50/70 border-red-200 text-red-950'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold">
                  {isPassed
                    ? 'Assessment Passed — Next Chapter Unlocked!'
                    : 'Assessment Failed — Standard (70%) Not Met'}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isPassed
                    ? `You scored ${obtainedScorePercent}%. Your lecture completion has been recorded and the next video lecture in the syllabus is now unlocked.`
                    : `You scored ${obtainedScorePercent}%. Review the pedagogical explanations below and retake the assessment when ready.`}
                </p>

                {!isPassed && (
                  <button
                    onClick={() => startTest(activeQuiz)}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Test Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── ACTIVE QUESTION CARD ─── */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <span className="font-semibold text-slate-500">
              Question {currentQuestionIndex + 1} of {totalQ}
            </span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono text-[10px]">
              {currentQ.category} • {currentQ.difficulty}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {currentQ.text}
          </h3>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
              const isCorrectAnswer = isExamSubmitted && optIdx === currentQ.correctOptionIndex;
              const isWrongSelection = isExamSubmitted && isSelected && !isCorrectAnswer;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                  disabled={isExamSubmitted}
                  className={`w-full p-3 sm:p-3.5 rounded-xl border text-left text-xs transition-all flex items-start sm:items-center justify-between gap-2.5 cursor-pointer ${
                    isCorrectAnswer
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                      : isWrongSelection
                      ? 'bg-red-50 border-red-300 text-red-950 font-medium'
                      : isSelected
                      ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-medium'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed break-words">{opt}</span>
                  </div>

                  {isCorrectAnswer && (
                    <span className="text-[11px] font-bold text-emerald-700 shrink-0">✓ Correct</span>
                  )}
                  {isWrongSelection && (
                    <span className="text-[11px] font-bold text-red-600 shrink-0">✗ Your Answer</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation (Shown only after submission) */}
          {isExamSubmitted && currentQ.explanation && (
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed space-y-1">
              <div className="font-bold">Pedagogical Review & Explanation:</div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>

            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQ - 1, prev + 1))}
              disabled={currentQuestionIndex === totalQ - 1}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ─── QUESTION GRID NAVIGATOR ─── */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Examination Question Map</span>
            <span>
              {answeredCount} of {totalQ} Answered
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeQuiz.questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentQuestionIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white'
                      : isAnswered
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── CONFIRM SUBMISSION MODAL ─── */}
        {showConfirmSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Confirm Exam Submission?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have answered <strong>{answeredCount}</strong> of <strong>{totalQ}</strong> questions.
                Once submitted, answers cannot be modified and your score will be recorded.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmSubmitModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50"
                >
                  Continue Reviewing
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
                >
                  Yes, Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── QUIZ HUB LIST VIEW (DEFAULT) ───
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">MCQ Examination Terminal</h1>
        <p className="text-xs text-slate-500 mt-1">
          Each module lecture features its own sequential multiple-choice test. Passing unlocks the subsequent chapter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => {
          const isPassed =
            quiz.status === 'Completed' && (quiz.lastScorePercent ?? 0) >= quiz.passingScorePercent;
          const isFailed =
            quiz.status === 'Completed' && (quiz.lastScorePercent ?? 0) < quiz.passingScorePercent;

          return (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                    {quiz.moduleTitle}
                  </span>
                  {isPassed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed ({quiz.lastScorePercent}%)
                    </span>
                  ) : isFailed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      <XCircle className="w-3.5 h-3.5" /> Failed ({quiz.lastScorePercent}%)
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      Ready to Attempt
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900">{quiz.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{quiz.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {quiz.durationMinutes} mins
                  </span>
                  <span>•</span>
                  <span>{quiz.questionsCount} MCQs</span>
                </div>

                <button
                  onClick={() => startTest(quiz)}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                >
                  {quiz.status === 'Completed' ? 'Review / Retake' : 'Begin Test'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
