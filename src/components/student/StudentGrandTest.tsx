import React, { useState } from 'react';
import {
  Award,
  Lock,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';
import { Quiz, Question } from '../../types';
import { MOCK_GRAND_TESTS } from '../../utils/mockRbacData';

interface StudentGrandTestProps {
  quizzes: Quiz[];
  completedLectureIds: string[];
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigateToCertificates?: () => void;
}

export const StudentGrandTest: React.FC<StudentGrandTestProps> = ({
  quizzes,
  completedLectureIds,
  onShowToast,
  onNavigateToCertificates,
}) => {
  const grandTest = MOCK_GRAND_TESTS[0];

  // Eligibility evaluation
  const totalLecturesCount = 10;
  const completedLecturesCount = completedLectureIds.length;

  const totalQuizzes = quizzes.length;
  const passedQuizzesCount = quizzes.filter(
    (q) => q.status === 'Completed' && (q.lastScorePercent ?? 0) >= q.passingScorePercent
  ).length;

  const remainingTestsCount = Math.max(0, totalQuizzes - passedQuizzesCount);
  const isGrandTestUnlocked =
    completedLecturesCount >= totalLecturesCount && passedQuizzesCount >= totalQuizzes;

  // Test session state
  const [isTestInProgress, setIsTestInProgress] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<'Passed' | 'Failed' | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const handleStartExam = () => {
    setIsTestInProgress(true);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setTestResult(null);
  };

  const handleSubmitExam = () => {
    let correct = 0;
    grandTest.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correct++;
      }
    });

    const percent = Math.round((correct / grandTest.questions.length) * 100);
    setFinalScore(percent);
    setIsTestInProgress(false);

    if (percent >= grandTest.passingScorePercent) {
      setTestResult('Passed');
      onShowToast(`Grand Examination Passed! Score: ${percent}%. Certificate unlocked.`, 'success');
    } else {
      setTestResult('Failed');
      onShowToast(`Grand Examination not passed. Score: ${percent}%. Minimum 70% required.`, 'error');
    }
  };

  // ─── STATE 1: ACTIVE EXAM IN PROGRESS ───
  if (isTestInProgress) {
    const q = grandTest.questions[currentQIndex];
    const totalQ = grandTest.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              OFFICIAL GRAND EXAMINATION TERMINAL
            </div>
            <h2 className="text-lg font-bold">{grandTest.title}</h2>
          </div>
          <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 text-blue-300">
            <Clock className="w-4 h-4" /> 45:00
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 text-slate-500">
            <span className="font-semibold">
              Question {currentQIndex + 1} of {totalQ}
            </span>
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono text-[10px]">
              {q.category}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900">{q.text}</h3>

          <div className="space-y-2.5">
            {q.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => setSelectedAnswers((p) => ({ ...p, [currentQIndex]: optIdx }))}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-medium'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>

            {currentQIndex < totalQ - 1 ? (
              <button
                onClick={() => setCurrentQIndex((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white cursor-pointer"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-semibold text-white shadow-xs cursor-pointer"
              >
                Submit Grand Examination ({answeredCount}/{totalQ})
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── STATE 2: EXAM RESULT SUMMARY (PASSED OR FAILED) ───
  if (testResult) {
    const isPassed = testResult === 'Passed';
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div
          className={`p-8 rounded-3xl border text-center space-y-4 shadow-xl ${
            isPassed
              ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-200 text-emerald-950'
              : 'bg-gradient-to-b from-red-50 to-white border-red-200 text-red-950'
          }`}
        >
          <div
            className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-md ${
              isPassed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {isPassed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold">
              {isPassed ? 'Congratulations! Examination Passed' : 'Grand Examination Not Passed'}
            </h2>
            <div className="text-3xl font-extrabold font-mono py-2">
              Score: {finalScore}%
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              {isPassed
                ? 'Congratulations! You have successfully completed your course examination. You are now eligible to apply for your official verified certificate.'
                : 'You are not eligible for a certificate. Please contact the administration for further assistance or retake preparation.'}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            {isPassed ? (
              <button
                onClick={() => {
                  if (onNavigateToCertificates) onNavigateToCertificates();
                  else onShowToast('Navigate to Certificates tab to apply', 'info');
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2"
              >
                <Award className="w-4 h-4" /> Apply for Certificate
              </button>
            ) : (
              <button
                onClick={handleStartExam}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Retake Grand Examination
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── STATE 3: DEFAULT OVERVIEW (LOCKED VS AVAILABLE) ───
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Grand Test — Final Examination</h1>
        <p className="text-xs text-slate-500 mt-1">
          The ultimate comprehensive appraisal evaluating cross-module strategic acumen, valuation models, and operations.
        </p>
      </div>

      {!isGrandTestUnlocked ? (
        // ─── LOCKED STATE ───
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-lg font-bold text-slate-900">Grand Test Locked</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complete all lecture tests to unlock your Grand Test. All published videos must be watched and each corresponding lecture assessment passed.
            </p>
          </div>

          {/* Requirements Progress Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 max-w-lg mx-auto text-left space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Prerequisite Completion Status
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-slate-600">
                <FileCheck2 className="w-4 h-4 text-blue-600" /> Lectures Completed
              </span>
              <span className="font-semibold text-slate-800">
                {completedLecturesCount} / {totalLecturesCount}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Lecture Tests Passed
              </span>
              <span className="font-semibold text-slate-800">
                {passedQuizzesCount} / {totalQuizzes}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="flex items-center gap-2 text-slate-600">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Remaining Tests
              </span>
              <span className="font-bold text-amber-700">{remainingTestsCount} tests required</span>
            </div>
          </div>
        </div>
      ) : (
        // ─── UNLOCKED / AVAILABLE STATE ───
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Grand Test Unlocked & Ready
          </div>

          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl font-extrabold">{grandTest.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              All {totalLecturesCount} lecture modules and tests have been verified. You are officially cleared to attempt the comprehensive course examination.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md pt-2">
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <div className="text-lg font-bold">{grandTest.totalQuestions}</div>
              <div className="text-[10px] text-slate-300">Comprehensive MCQs</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <div className="text-lg font-bold">{grandTest.durationMinutes}m</div>
              <div className="text-[10px] text-slate-300">Timed Duration</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <div className="text-lg font-bold">70%</div>
              <div className="text-[10px] text-slate-300">Passing Threshold</div>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Award className="w-4 h-4" /> Start Grand Examination
          </button>
        </div>
      )}
    </div>
  );
};

