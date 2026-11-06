import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  ArrowRight,
  RotateCcw,
  Eye,
  Award,
  Filter,
  BarChart2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { Quiz, Question } from '../../types';

interface StudentExaminationsProps {
  quizzes: Quiz[];
  completedLectureIds: string[];
  onNavigateToTest: (quizId?: string) => void;
  onShowToast?: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const StudentExaminations: React.FC<StudentExaminationsProps> = ({
  quizzes,
  completedLectureIds,
  onNavigateToTest,
  onShowToast,
}) => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Passed' | 'Failed' | 'Available' | 'Locked'>('All');
  const [selectedQuizForReview, setSelectedQuizForReview] = useState<Quiz | null>(null);

  // Statistics
  const totalTests = quizzes.length;
  const attemptedTests = quizzes.filter((q) => q.status === 'Completed').length;
  const passedTests = quizzes.filter(
    (q) => q.status === 'Completed' && (q.lastScorePercent ?? 0) >= q.passingScorePercent
  ).length;
  const failedTests = quizzes.filter(
    (q) => q.status === 'Completed' && (q.lastScorePercent ?? 0) < q.passingScorePercent
  ).length;
  const availableTests = quizzes.filter((q) => q.status === 'Available').length;
  const lockedTests = Math.max(0, totalTests - (attemptedTests + availableTests));

  const averageScore =
    attemptedTests > 0
      ? Math.round(
          quizzes
            .filter((q) => q.status === 'Completed')
            .reduce((acc, q) => acc + (q.lastScorePercent || 0), 0) / attemptedTests
        )
      : 0;

  // Filter list
  const filteredQuizzes = quizzes.filter((q) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Passed')
      return q.status === 'Completed' && (q.lastScorePercent ?? 0) >= q.passingScorePercent;
    if (filterStatus === 'Failed')
      return q.status === 'Completed' && (q.lastScorePercent ?? 0) < q.passingScorePercent;
    if (filterStatus === 'Available') return q.status === 'Available';
    if (filterStatus === 'Locked') return q.status === 'Upcoming';
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Academic Assessment Journey
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Examinations & Lecture Tests
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
          <Award className="w-4 h-4 text-blue-600" />
          Passing Standard: 70% Required for Sequence Unlock
        </div>
      </div>

      {/* ─── TOP METRICS BAR ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Total Tests</div>
          <div className="text-2xl font-bold text-slate-900">{totalTests}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Attempted</div>
          <div className="text-2xl font-bold text-blue-600">{attemptedTests}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Tests Passed</div>
          <div className="text-2xl font-bold text-emerald-600">{passedTests}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Tests Failed</div>
          <div className="text-2xl font-bold text-red-600">{failedTests}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Locked Tests</div>
          <div className="text-2xl font-bold text-slate-400">{lockedTests}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Average Score</div>
          <div className="text-2xl font-bold text-indigo-600">{averageScore}%</div>
        </div>
      </div>

      {/* ─── VISUAL PROGRESS BAR ─── */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Overall Examination Completion</span>
          <span>
            {passedTests} of {totalTests} Passed ({Math.round((passedTests / Math.max(1, totalTests)) * 100)}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
          <div
            className="bg-emerald-500 h-3 transition-all duration-500"
            style={{ width: `${(passedTests / Math.max(1, totalTests)) * 100}%` }}
            title="Passed"
          />
          <div
            className="bg-red-400 h-3 transition-all duration-500"
            style={{ width: `${(failedTests / Math.max(1, totalTests)) * 100}%` }}
            title="Failed (Retake Available)"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Passed & Unlocked
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Failed / Needs Retake
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-200 inline-block" /> Locked (Prerequisites pending)
            </span>
          </div>
          <span>Grand Test activates at 100% pass rate</span>
        </div>
      </div>

      {/* ─── FILTER TABS ─── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {(['All', 'Passed', 'Failed', 'Available', 'Locked'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterStatus === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── EXAMINATIONS HISTORY TABLE ─── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Examination</th>
                <th className="py-3 px-4">Curriculum Module</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Attempts</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredQuizzes.map((q) => {
                const isPassed = q.status === 'Completed' && (q.lastScorePercent ?? 0) >= q.passingScorePercent;
                const isFailed = q.status === 'Completed' && (q.lastScorePercent ?? 0) < q.passingScorePercent;
                const isAvailable = q.status === 'Available';
                const isLocked = q.status === 'Upcoming';

                return (
                  <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      {q.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600 truncate max-w-xs">
                      {q.moduleTitle}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold">
                      {q.lastScorePercent !== undefined ? (
                        <span className={isPassed ? 'text-emerald-700' : 'text-red-700'}>
                          {q.lastScorePercent}%
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {isPassed && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Passed
                        </span>
                      )}
                      {isFailed && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                          <XCircle className="w-3 h-3" /> Failed ({q.lastScorePercent}%)
                        </span>
                      )}
                      {isAvailable && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <Clock className="w-3 h-3" /> Ready
                        </span>
                      )}
                      {isLocked && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {q.status === 'Completed' ? 1 : 0} / 3 max
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {q.lastAttemptDate || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isPassed && (
                        <button
                          onClick={() => setSelectedQuizForReview(q)}
                          className="px-3 py-1 bg-white hover:bg-slate-50 text-blue-600 font-semibold border border-blue-200 rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          View Result
                        </button>
                      )}
                      {isFailed && (
                        <button
                          onClick={() => onNavigateToTest(q.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          Retake Test
                        </button>
                      )}
                      {isAvailable && (
                        <button
                          onClick={() => onNavigateToTest(q.id)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          Start Test
                        </button>
                      )}
                      {isLocked && (
                        <span className="text-slate-400 text-xs italic">Prerequisites required</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── TEST RESULT REVIEW MODAL ─── */}
      {selectedQuizForReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  Official Assessment Report
                </div>
                <h3 className="text-base font-bold text-slate-900">{selectedQuizForReview.title}</h3>
              </div>
              <button
                onClick={() => setSelectedQuizForReview(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Score Summary Banner */}
            <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-bold text-emerald-950">Status: PASSED</span>
                  <div className="text-emerald-800 text-[11px]">
                    Obtained Marks: {selectedQuizForReview.lastScorePercent}% (Passing: 70%)
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px] text-emerald-800">
                Attempt Date: {selectedQuizForReview.lastAttemptDate || '2026-10-24'}
              </div>
            </div>

            {/* Questions Review List */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              {selectedQuizForReview.questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      Q{idx + 1}. {q.text}
                    </span>
                    <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-mono">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.correctOptionIndex;
                      return (
                        <div
                          key={optIdx}
                          className={`p-2 rounded-lg flex items-center justify-between ${
                            isCorrect
                              ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-950 font-medium'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrect && (
                            <span className="text-[10px] text-emerald-700 font-bold">✓ Correct Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
                      <strong>Pedagogical Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50">
              <button
                onClick={() => setSelectedQuizForReview(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

