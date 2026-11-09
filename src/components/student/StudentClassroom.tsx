import React, { useState, useEffect } from 'react';
import {
  Lock,
  CheckCircle2,
  Play,
  FileCheck2,
  FileText,
  Download,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import { Course, Lecture, StudentNote } from '../../types';
import { VideoPlayer } from '../video/VideoPlayer';

interface StudentClassroomProps {
  course: Course;
  initialLectureId?: string;
  completedLectureIds: string[];
  onToggleCompleteLecture: (lectureId: string) => void;
  notes: StudentNote[];
  onSaveNote: (data: {
    lectureId: string;
    lectureTitle: string;
    content: string;
    timestampSeconds: number;
  }) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigateToTest?: (quizId?: string) => void;
}

export const StudentClassroom: React.FC<StudentClassroomProps> = ({
  course,
  initialLectureId,
  completedLectureIds,
  onToggleCompleteLecture,
  notes,
  onSaveNote,
  onShowToast,
  onNavigateToTest,
}) => {
  // Flatten all lectures to establish strict chronological sequence
  const allLectures: Lecture[] = course.modules.flatMap((m) => m.lectures);

  // Active selected lecture
  const [selectedLectureId, setSelectedLectureId] = useState<string>(() => {
    if (initialLectureId && allLectures.some((l) => l.id === initialLectureId)) {
      return initialLectureId;
    }
    return allLectures[0]?.id || 'lec-101';
  });

  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(
    course.modules.map((m) => m.id)
  );

  // Note taking state
  const [noteContent, setNoteContent] = useState('');
  const [currentPlaybackSeconds, setCurrentPlaybackSeconds] = useState(0);

  // Active lecture object
  const activeLecture =
    allLectures.find((l) => l.id === selectedLectureId) || allLectures[0];

  const activeLectureIndex = allLectures.findIndex((l) => l.id === activeLecture?.id);

  // ─── STRICT SEQUENTIAL UNLOCK RULE ───
  // Lecture 0 is always unlocked.
  // Lecture N is unlocked only if Lecture N - 1 is completed.
  const isLectureUnlocked = (lectureIndex: number): boolean => {
    if (lectureIndex === 0) return true;
    const prevLecture = allLectures[lectureIndex - 1];
    return prevLecture ? completedLectureIds.includes(prevLecture.id) : false;
  };

  const isActiveLectureUnlocked = isLectureUnlocked(activeLectureIndex);
  const isCurrentCompleted = completedLectureIds.includes(activeLecture?.id || '');

  // Notes for currently selected lecture
  const currentLectureNotes = notes.filter((n) => n.lectureId === activeLecture?.id);

  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModuleIds((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleSelectLecture = (lec: Lecture, index: number) => {
    if (!isLectureUnlocked(index)) {
      onShowToast(
        'This lecture is locked. Complete the previous lecture and pass its test to unlock.',
        'warning'
      );
      return;
    }
    setSelectedLectureId(lec.id);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || !activeLecture) return;

    onSaveNote({
      lectureId: activeLecture.id,
      lectureTitle: activeLecture.title,
      content: noteContent.trim(),
      timestampSeconds: Math.floor(currentPlaybackSeconds),
    });

    setNoteContent('');
    onShowToast('Study note recorded with video timestamp!', 'success');
  };

  const handleVideoCompleted = () => {
    if (!activeLecture) return;
    if (!isCurrentCompleted) {
      onToggleCompleteLecture(activeLecture.id);
      onShowToast(
        `Lecture completed! Associated MCQ assessment for "${activeLecture.title}" is now unlocked.`,
        'success'
      );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── CLASSROOM HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            {course.title}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {activeLecture?.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#syllabus-drawer"
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Syllabus ({completedLectureIds.length}/{allLectures.length})</span>
          </a>

          {isCurrentCompleted ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Completed & Verified
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
              <Clock className="w-4 h-4 text-amber-600" />
              In Progress (Test Required)
            </div>
          )}
        </div>
      </div>

      {/* ─── TWO-PANE LEARNING LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / MAIN COLUMN: VIDEO PLAYER + MATERIALS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player or Locked Overlay */}
          {isActiveLectureUnlocked ? (
            <VideoPlayer
              videoUrl={activeLecture?.videoUrl || ''}
              lectureTitle={activeLecture?.title || ''}
              studentName="Hamza Malik"
              studentId="STU-PK-101"
              completionThreshold={90}
              onProgress={(pct, cur) => setCurrentPlaybackSeconds(cur)}
              onComplete={handleVideoCompleted}
              onSecurityEvent={(type, details) => {
                onShowToast(`Security Notice: ${type}`, 'warning');
              }}
            />
          ) : (
            <div className="aspect-video w-full bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-white border border-slate-800">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Lecture Locked</h3>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-6">
                Aerecon Edu follows a strict sequential mastery curriculum. Complete the previous lecture and pass its
                associated MCQ test to automatically unlock this lecture.
              </p>
              <button
                onClick={() => {
                  const prevLec = allLectures[activeLectureIndex - 1];
                  if (prevLec) setSelectedLectureId(prevLec.id);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Go to Previous Lecture
              </button>
            </div>
          )}

          {/* ─── TEST & ASSESSMENT CALLOUT ─── */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Lecture Sequential MCQ Examination</h4>
                <p className="text-xs text-slate-500">
                  {isCurrentCompleted
                    ? 'Assessment completed. Next lecture is unlocked.'
                    : 'Passing score (70%) unlocks the next lecture in the sequence.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (onNavigateToTest) onNavigateToTest();
                else onShowToast('Navigating to Tests terminal', 'info');
              }}
              className="w-full sm:w-auto justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              {isCurrentCompleted ? 'Review Test Results' : 'Take Lecture Test'}
            </button>
          </div>

          {/* ─── LECTURE DETAILS & KEY TAKEAWAYS ─── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Executive Overview</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeLecture?.description}
              </p>
            </div>

            {activeLecture?.keyTakeaways && activeLecture.keyTakeaways.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Strategic Competencies & Takeaways
                </h4>
                <ul className="space-y-2">
                  {activeLecture.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Downloadable Resources */}
            {activeLecture?.resources && activeLecture.resources.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Downloadable Executive Resources & Workbooks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeLecture.resources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="truncate">
                          <div className="text-xs font-medium text-slate-800 truncate">{res.title}</div>
                          <div className="text-[10px] text-slate-400">
                            {res.type.toUpperCase()} • {res.size || '1.5 MB'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onShowToast(`Downloading ${res.title}...`, 'info')}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── INLINE STUDY NOTES ─── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-600" />
                Study Notes for this Lecture
              </h3>
              <span className="text-[11px] text-slate-400">
                Current timestamp: {Math.floor(currentPlaybackSeconds / 60)}:
                {(Math.floor(currentPlaybackSeconds) % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Type your strategic observation or formula note. It will automatically be tagged with the active video timestamp..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder-slate-400"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!noteContent.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Save Timestamped Note
                </button>
              </div>
            </form>

            {currentLectureNotes.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-100">
                {currentLectureNotes.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/50 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-blue-700 bg-blue-100/60 px-1.5 py-0.5 rounded font-semibold">
                        {Math.floor(n.timestampSeconds / 60)}:
                        {(n.timestampSeconds % 60).toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.updatedAt}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{n.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MODULE & SEQUENTIAL LECTURE DRAWER (4 COLS) */}
        <div id="syllabus-drawer" className="lg:col-span-4 space-y-4 scroll-mt-20">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Course Syllabus</h3>
                <span className="text-[11px] text-slate-400">
                  {completedLectureIds.length} of {allLectures.length} Lectures Done
                </span>
              </div>
              <span className="text-xs font-bold text-blue-600">
                {Math.round((completedLectureIds.length / allLectures.length) * 100)}%
              </span>
            </div>

            {/* Modules Accordion List */}
            <div className="space-y-3 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
              {course.modules.map((mod) => {
                const isExpanded = expandedModuleIds.includes(mod.id);
                return (
                  <div key={mod.id} className="rounded-xl border border-slate-200/70 overflow-hidden">
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModuleExpand(mod.id)}
                      className="w-full p-3 bg-slate-50 flex items-center justify-between text-left hover:bg-slate-100/70 transition-colors"
                    >
                      <div>
                        <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                          Module {mod.number}
                        </div>
                        <div className="text-xs font-semibold text-slate-800 line-clamp-1">{mod.title}</div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {/* Lecture List within Module */}
                    {isExpanded && (
                      <div className="divide-y divide-slate-100 bg-white">
                        {mod.lectures.map((lec) => {
                          const globalIdx = allLectures.findIndex((l) => l.id === lec.id);
                          const unlocked = isLectureUnlocked(globalIdx);
                          const isCompleted = completedLectureIds.includes(lec.id);
                          const isSelected = selectedLectureId === lec.id;

                          return (
                            <button
                              key={lec.id}
                              onClick={() => handleSelectLecture(lec, globalIdx)}
                              className={`w-full p-2.5 text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50/80 text-blue-900'
                                  : unlocked
                                  ? 'hover:bg-slate-50 text-slate-700'
                                  : 'opacity-60 bg-slate-50/40 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              {/* Status Icon */}
                              <div className="mt-0.5 shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : unlocked ? (
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                      isSelected ? 'border-blue-600 text-blue-600' : 'border-slate-300'
                                    }`}
                                  >
                                    <Play className="w-2 h-2 fill-current" />
                                  </div>
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div
                                  className={`text-xs leading-snug line-clamp-2 ${
                                    isSelected ? 'font-semibold text-blue-950' : 'font-medium'
                                  }`}
                                >
                                  {lec.title}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                                  <span>{lec.durationMinutes} min</span>
                                  <span>•</span>
                                  <span>{isCompleted ? 'Passed' : unlocked ? 'Ready' : 'Locked'}</span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
