import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Video, FileText, ArrowRight, User } from 'lucide-react';
import { Course } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onSelectLecture: (lectureId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  course,
  onSelectLecture,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const lectures: Array<{ id: string; title: string; module: string; desc: string }> = [];
    course.modules.forEach((mod) => {
      mod.lectures.forEach((lec) => {
        if (
          lec.title.toLowerCase().includes(q) ||
          lec.description.toLowerCase().includes(q) ||
          lec.keyTakeaways.some((t) => t.toLowerCase().includes(q))
        ) {
          lectures.push({
            id: lec.id,
            title: lec.title,
            module: mod.title,
            desc: lec.description,
          });
        }
      });
    });

    return lectures;
  }, [query, course]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 p-2 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search lectures, topics, financial concepts (e.g. NPV, Five Forces)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm outline-none text-slate-800 placeholder-slate-400 bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-4 text-center text-xs text-slate-400">
              Type to search through all modules, video lectures, and business case studies.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No results found for &ldquo;<span className="font-semibold">{query}</span>&rdquo;. Try searching for &ldquo;Strategy&rdquo;, &ldquo;Capital Budgeting&rdquo;, or &ldquo;Porter&rdquo;.
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectLecture(item.id);
                    onClose();
                  }}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 text-left transition-colors group"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.module}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigation: Click or Enter to select</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
