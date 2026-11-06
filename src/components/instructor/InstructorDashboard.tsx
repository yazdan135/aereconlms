import React from 'react';
import {
  BookOpen,
  CalendarCheck,
  Users,
  Video,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface InstructorDashboardProps {
  onNavigate: (page: string) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">
            Faculty & Academic Mentor Portal
          </span>
          <h1 className="text-2xl font-bold mt-1">Welcome, Prof. Tariq Amin</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            You are currently assigned as Executive Academic Director for Cohort 8 and the Executive Business Management syllabus.
          </p>
        </div>

        <button
          onClick={() => onNavigate('live-sessions')}
          className="px-4 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Video className="w-4 h-4" /> Start Next Live Session
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Assigned Courses</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">1 Program</div>
          <span className="text-[11px] text-slate-400">Executive Business Management</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Assigned Live Batches</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">2 Cohorts</div>
          <span className="text-[11px] text-indigo-600 font-semibold">Cohort 8 & Cohort 9</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Active Students Mentored</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">57 Executives</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Average attendance: 94%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Upcoming Live Workshops</h3>
            <button
              onClick={() => onNavigate('live-sessions')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              View Schedule
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="font-bold text-slate-900 text-xs">
              Live Case Discussion: Turnaround Strategy of Indus Motors
            </div>
            <div className="text-[11px] text-slate-500">Cohort 8 • Thursday, Nov 05, 07:30 PM PKT</div>
            <div className="text-[10px] text-indigo-700 font-mono">Zoom ID: 894 2190 4421</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Assigned Cohort Roster</h3>
            <button
              onClick={() => onNavigate('my-batches')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Manage Batches
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
            <div className="font-bold text-indigo-950 text-xs">Cohort 8 (Executive Evening)</div>
            <div className="text-[11px] text-indigo-800">38 Enrolled • Capacity 45</div>
            <div className="text-[11px] text-slate-500">Mondays & Thursdays, 7:30 PM - 9:30 PM PKT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

