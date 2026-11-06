import React, { useState } from 'react';
import { Question } from '../../types';
import { FileCheck2, Plus, Search, Check, HelpCircle } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface ManagerQuestionBankProps {
  initialQuestions: Question[];
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ManagerQuestionBank: React.FC<ManagerQuestionBankProps> = ({
  initialQuestions,
  onShowToast,
}) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New question form
  const [qText, setQText] = useState('');
  const [qCategory, setQCategory] = useState('Strategy');
  const [qDifficulty, setQDifficulty] = useState<'Basic' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [qExplanation, setQExplanation] = useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      q.explanation.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || q.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !opt0.trim() || !opt1.trim()) return;

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: qText,
      category: qCategory,
      difficulty: qDifficulty,
      options: [opt0, opt1, opt2 || 'Option 3', opt3 || 'Option 4'],
      correctOptionIndex: correctIdx,
      explanation: qExplanation || 'Standard faculty textbook benchmark explanation.',
    };

    setQuestions([newQuestion, ...questions]);
    setShowAddModal(false);
    // Reset
    setQText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setQExplanation('');
    onShowToast('New assessment question added to bank', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Assessment Question Bank</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain rigorous multiple-choice assessments with verified answer keys and faculty explanations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add MCQ to Bank</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-600 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Strategy">Strategy</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">#{idx + 1}</span>
                <Badge variant="purple">{q.category}</Badge>
                <Badge
                  variant={
                    q.difficulty === 'Basic'
                      ? 'success'
                      : q.difficulty === 'Intermediate'
                      ? 'info'
                      : 'warning'
                  }
                >
                  {q.difficulty}
                </Badge>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">ID: {q.id}</span>
            </div>

            <div className="text-xs font-semibold text-slate-900 leading-relaxed">
              {q.text}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {q.options.map((opt, optIdx) => {
                const isCorrect = q.correctOptionIndex === optIdx;
                return (
                  <div
                    key={optIdx}
                    className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200 font-medium'
                        : 'bg-slate-50 text-slate-700 border-slate-200/70'
                    }`}
                  >
                    <span>{opt}</span>
                    {isCorrect && (
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 font-mono">
                        <Check className="w-3 h-3" />
                        Correct
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Faculty Explanation: </span>
              {q.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Question to Bank"
        description="Write question text, four options, and specify the correct answer."
        maxWidth="xl"
      >
        <form onSubmit={handleAddQuestion} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={qCategory}
                onChange={(e) => setQCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
              >
                <option value="Strategy">Strategy</option>
                <option value="Finance">Corporate Finance</option>
                <option value="Operations">Operations & Supply Chain</option>
                <option value="Leadership">Executive Leadership</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Difficulty Level
              </label>
              <select
                value={qDifficulty}
                onChange={(e) => setQDifficulty(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
              >
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Question Statement *
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. In capital budgeting, why is NPV preferred over IRR during non-normal cash flows?"
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Answer Options & Mark Correct:
            </label>
            {[
              { val: opt0, setVal: setOpt0, idx: 0, label: 'Option A' },
              { val: opt1, setVal: setOpt1, idx: 1, label: 'Option B' },
              { val: opt2, setVal: setOpt2, idx: 2, label: 'Option C' },
              { val: opt3, setVal: setOpt3, idx: 3, label: 'Option D' },
            ].map((opt) => (
              <div key={opt.idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctIdx === opt.idx}
                  onChange={() => setCorrectIdx(opt.idx)}
                  className="w-4 h-4 text-blue-600 accent-blue-600"
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  required={opt.idx < 2}
                  placeholder={`${opt.label} text`}
                  value={opt.val}
                  onChange={(e) => opt.setVal(e.target.value)}
                  className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Faculty Explanation (shown after submission)
            </label>
            <textarea
              rows={2}
              placeholder="Explain why the selected option is correct based on business principles..."
              value={qExplanation}
              onChange={(e) => setQExplanation(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              Add Question
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
