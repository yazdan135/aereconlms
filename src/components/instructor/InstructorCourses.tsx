import React from 'react';
import { BookOpen, Clock, Users, Star, FileText } from 'lucide-react';
import { Course } from '../../types';

export const InstructorCourses: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assigned Curriculum & Modules</h1>
        <p className="text-xs text-slate-500 mt-1">
          Read-only view of syllabus content, video runtimes, and pedagogical takeaways.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div>
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            Lead Mentor: {course.instructorName}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{course.title}</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{course.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-100">
          <div>
            <div className="text-slate-400">Total Modules</div>
            <div className="font-bold text-slate-800">{course.modules.length} Modules</div>
          </div>
          <div>
            <div className="text-slate-400">Total Lectures</div>
            <div className="font-bold text-slate-800">{course.totalLectures} Lectures</div>
          </div>
          <div>
            <div className="text-slate-400">Recorded Duration</div>
            <div className="font-bold text-slate-800">{course.totalHours} Hours</div>
          </div>
        </div>
      </div>

      {/* Module Overview */}
      <div className="space-y-4">
        {course.modules.map((mod) => (
          <div key={mod.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase">Module {mod.number}</span>
              <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {mod.lectures.map((lec) => (
                <div key={lec.id} className="py-2.5 flex items-center justify-between">
                  <div className="font-medium text-slate-800">{lec.title}</div>
                  <div className="text-slate-400 font-mono text-[11px]">{lec.durationMinutes}m</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

