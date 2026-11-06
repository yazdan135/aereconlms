import React from 'react';
import {
  BookOpen,
  FileCheck2,
  Award,
  Video,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  AlertCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import {
  Course,
  ZoomSession,
  Quiz,
  StudentNote,
  StudentNavPage,
} from '../../types';

interface StudentDashboardProps {
  course: Course;
  zoomSessions: ZoomSession[];
  quizzes: Quiz[];
  notes: StudentNote[];
  completedLectureIds: string[];
  onNavigate: (page: StudentNavPage, extraId?: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  course,
  zoomSessions,
  quizzes,
  notes,
  completedLectureIds,
  onNavigate,
}) => {
  // Aggregate calculations
  const allLectures = course.modules.flatMap((m) => m.lectures);
  const totalLecturesCount = allLectures.length;
  const completedCount = completedLectureIds.length;
  const courseProgressPercent = Math.round((completedCount / totalLecturesCount) * 100);

  const completedQuizzes = quizzes.filter((q) => q.status === 'Completed');
  const passedQuizzes = quizzes.filter(
    (q) => q.status === 'Completed' && (q.lastScorePercent ?? 0) >= q.passingScorePercent
  );

  // Grand test eligibility requires all lectures complete and all quizzes passed
  const isGrandTestEligible =
    completedCount >= totalLecturesCount && passedQuizzes.length >= quizzes.length;

  // Next up lecture to study
  const nextLecture =
    allLectures.find((lec) => !completedLectureIds.includes(lec.id)) || allLectures[0];

  const upcomingSession = zoomSessions.find((s) => s.status === 'Upcoming');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── WELCOME BANNER ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-blue-800/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            Executive Business Management Program
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Welcome back, Hamza Malik
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your sequential learning track is active. Finish each video and pass its lecture test to unlock the next chapter.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('classroom', nextLecture?.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Continue Learning ({nextLecture ? nextLecture.title.slice(0, 32) + '...' : 'Classroom'})
            </button>
            <button
              onClick={() => onNavigate('examinations')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              View Examination Progress
            </button>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ─── KPI METRICS ROW ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Course Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Course Progress</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-2">{courseProgressPercent}%</div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${courseProgressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            {completedCount} of {totalLecturesCount} lectures completed
          </span>
        </div>

        {/* Tests Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tests Passed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-2">
            {passedQuizzes.length} <span className="text-sm font-normal text-slate-400">/ {quizzes.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${quizzes.length > 0 ? (passedQuizzes.length / quizzes.length) * 100 : 0}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Average Score: {completedQuizzes.length > 0 ? '78%' : 'N/A'}
          </span>
        </div>

        {/* Grand Test Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Grand Test</span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isGrandTestEligible ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 mb-1">
            {isGrandTestEligible ? 'Unlocked & Ready' : 'Prerequisites Locked'}
          </div>
          <span className="text-[11px] text-slate-500 block leading-tight">
            {isGrandTestEligible
              ? 'Qualifies for Official Certification'
              : `${quizzes.length - passedQuizzes.length} tests remaining before unlock`}
          </span>
        </div>

        {/* Live Cohort Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Live Classes</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 mb-1">Cohort 8 (Evening)</div>
          <span className="text-[11px] text-slate-500 block leading-tight">
            Next: {upcomingSession ? upcomingSession.date : 'Thursday, 7:30 PM'}
          </span>
        </div>
      </div>

      {/* ─── TWO COLUMN MAIN CONTENT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Continue Learning & Curriculum Highlights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Up Next Module */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-900">Current Study Sequence</h3>
              </div>
              <button
                onClick={() => onNavigate('classroom')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                Full Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                  Up Next • Lecture 06
                </div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {nextLecture?.title || '06. Capital Budgeting: NPV, IRR & Hurdle Rates'}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {nextLecture?.durationMinutes || 65} mins
                  </span>
                  <span>•</span>
                  <span>Sequential Test Required</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('classroom', nextLecture?.id)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Start Lecture
              </button>
            </div>

            {/* Sequential Steps Mini Roadmap */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                Sequential Verification Progress
              </h4>
              <div className="space-y-2">
                {allLectures.slice(0, 5).map((lec, idx) => {
                  const done = completedLectureIds.includes(lec.id);
                  return (
                    <div
                      key={lec.id}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 truncate max-w-md">
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-400 shrink-0">
                            {idx + 1}
                          </div>
                        )}
                        <span className={`truncate ${done ? 'text-slate-600 line-through' : 'font-medium text-slate-800'}`}>
                          {lec.title}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          done ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {done ? 'Test Passed' : 'Locked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Study Notes Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-semibold text-slate-900">Your Lecture Notes & Models</h3>
              </div>
              <button
                onClick={() => onNavigate('notes')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                All Notes ({notes.length}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {notes.slice(0, 2).map((note) => (
                <div
                  key={note.id}
                  onClick={() => onNavigate('notes')}
                  className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-800">{note.lectureTitle}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {Math.floor(note.timestampSeconds / 60)}:{(note.timestampSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live Session & Quick Support */}
        <div className="space-y-6">
          {/* Upcoming Live Zoom Class */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-indigo-700 font-semibold text-sm">
              <Video className="w-4 h-4" />
              <span>Assigned Live Cohort</span>
            </div>

            {upcomingSession ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                  <div className="text-xs font-bold text-indigo-950 leading-snug">{upcomingSession.title}</div>
                  <div className="flex items-center gap-2 text-xs text-indigo-800">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{upcomingSession.date}</span>
                  </div>
                  <div className="text-[11px] text-indigo-700 font-mono">{upcomingSession.timePKT}</div>
                  <div className="text-[11px] text-slate-600">Instructor: {upcomingSession.instructorName}</div>
                </div>

                <a
                  href={upcomingSession.zoomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  Join Live Zoom Session
                </a>

                <div className="text-[11px] text-slate-400 text-center">
                  Meeting ID: {upcomingSession.meetingId} • Pass: {upcomingSession.passcode}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No scheduled sessions today.</p>
            )}

            <button
              onClick={() => onNavigate('live-classes')}
              className="mt-4 w-full py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Online Classes Hub
            </button>
          </div>

          {/* Verification & Grand Test Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Certificate Prerequisites
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>100% Video Completion</span>
                <span className={courseProgressPercent === 100 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                  {courseProgressPercent}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>All Lecture Tests Passed</span>
                <span className={passedQuizzes.length === quizzes.length ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                  {passedQuizzes.length}/{quizzes.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Comprehensive Grand Test</span>
                <span className="text-slate-400">70% Required</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('grand-test')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Grand Test Terminal
            </button>
          </div>

          {/* Direct Support */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/70 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs font-semibold text-slate-900">Need Academic Support?</div>
                <div className="text-[11px] text-slate-500">Submit a mentor question</div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('support')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Ask Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
