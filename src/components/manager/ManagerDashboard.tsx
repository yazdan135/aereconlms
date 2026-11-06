import React from 'react';
import {
  Users,
  CalendarCheck,
  FileCheck2,
  TrendingUp,
  FolderTree,
  BellRing,
  ArrowRight,
  Eye,
  FastForward,
  PlayCircle,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Student, Batch, Quiz, ManagerNavPage } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';

interface ManagerDashboardProps {
  students: Student[];
  batches: Batch[];
  zoomSessions?: any[];
  quizzes: Quiz[];
  onNavigate: (page: ManagerNavPage) => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  students,
  batches,
  quizzes,
  onNavigate,
}) => {
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const activeBatches = batches.filter((b) => b.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Operations Management Workspace
            </span>
            <Badge variant="purple">Academic & Cohort Oversight</Badge>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Platform Operational Command Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor student progression, video lecture completion rates, skip telemetry, and academic assessments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('students')}
            className="px-3 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Student Roster</span>
          </button>
          <button
            onClick={() => onNavigate('announcements')}
            className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BellRing className="w-3.5 h-3.5" />
            <span>Post Broadcast</span>
          </button>
        </div>
      </div>

      {/* Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Active Students"
          value={activeStudents}
          subtext="Across all enrolled cohorts"
          icon={Users}
          trend={{ value: '+14% this month', isPositive: true }}
        />
        <StatCard
          label="Active Cohort Groups"
          value={activeBatches}
          subtext="Cohort 8 currently progressing"
          icon={CalendarCheck}
        />
        <StatCard
          label="Avg Course Completion"
          value="58.2%"
          subtext="Across core video modules"
          icon={TrendingUp}
          trend={{ value: '+5.4%', isPositive: true }}
        />
        <StatCard
          label="Assessments Completed"
          value="184"
          subtext="78% average passing grade"
          icon={FileCheck2}
        />
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Student Video Engagement & Skip Alerts Monitor */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FastForward className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Real-Time Video Watch & Skip Telemetry
                </h3>
              </div>
              <button
                onClick={() => onNavigate('students')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
              >
                Inspect All Students ({students.length})
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  student: 'Hamza Malik',
                  action: 'Bypassed 8m 10s (from 11:30 to 19:40) in Lecture 04: Blue Ocean Strategy',
                  time: 'Today, 10:16 AM PKT',
                  severity: 'warning',
                  speed: '1.5x Speed',
                },
                {
                  student: 'Bilal Siddiqui',
                  action: 'Skipped 23m 30s during traditional manufacturing case studies in Lecture 02',
                  time: '3 days ago, 02:40 AM PKT',
                  severity: 'warning',
                  speed: '2.0x Speed',
                },
                {
                  student: 'Ayesha Khan',
                  action: 'Completed 100% full playback of Lecture 05: Financial Statements Dissection',
                  time: 'Yesterday, 08:45 PM PKT',
                  severity: 'success',
                  speed: '1.0x Speed',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.student}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-mono text-[11px] text-slate-500">{item.time}</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">
                        {item.speed}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{item.action}</p>
                  </div>
                  <Badge variant={item.severity === 'success' ? 'success' : 'warning'} size="sm">
                    {item.severity === 'success' ? 'Full Watched' : 'Skip Flag'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Video telemetry syncs automatically on lecture events</span>
            <button
              onClick={() => onNavigate('students')}
              className="text-blue-700 font-semibold hover:underline"
            >
              Open Student Management Console →
            </button>
          </div>
        </div>

        {/* Right Column: Student Progression Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Progress Distribution</h3>
            <span className="text-xs font-mono text-slate-400">{students.length} students</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between text-slate-700 mb-1">
                <span>Completed &gt; 80% (Near Graduation)</span>
                <span className="font-bold font-mono">28% (2 students)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[28%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-slate-700 mb-1">
                <span>Active 40% - 79% (In-Progress)</span>
                <span className="font-bold font-mono">43% (3 students)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[43%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-slate-700 mb-1">
                <span>New / &lt; 40% (Onboarding)</span>
                <span className="font-bold font-mono">29% (2 students)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[29%]" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('courses')}
              className="w-full py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>Review Curriculum Structure</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Student Roster Snippet */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Student Activity & Status</h3>
            <span className="text-xs text-slate-500">Live activity logs and lecture completions</span>
          </div>
          <button
            onClick={() => onNavigate('students')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            <span>View Full Roster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Cohort</th>
                <th className="px-4 py-3 font-semibold">Program</th>
                <th className="px-4 py-3 font-semibold">Progress</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.slice(0, 5).map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{stu.name}</div>
                    <div className="text-[11px] text-slate-400">{stu.email}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{stu.batch}</td>
                  <td className="px-4 py-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium">
                      Executive Masterclass
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full"
                          style={{ width: `${stu.progressPercent}%` }}
                        />
                      </div>
                      <span>{stu.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={stu.status === 'Active' ? 'success' : 'neutral'}>
                      {stu.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                    {stu.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
