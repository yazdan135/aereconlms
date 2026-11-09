import React, { useState } from 'react';
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Award,
  MoreVertical,
  Eye,
  Check,
  PlayCircle,
  FastForward,
  Clock,
  FileCheck2,
  FileText,
  Shield,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Activity,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Student } from '../../types';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { getStudentMonitoringDetails } from '../../utils/studentMonitoringData';

interface ManagerStudentsProps {
  students: Student[];
  onUpdateStudentStatus: (studentId: string, newStatus: 'Active' | 'Suspended' | 'Graduated') => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ManagerStudents: React.FC<ManagerStudentsProps> = ({
  students,
  onUpdateStudentStatus,
  onShowToast,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended' | 'Graduated'>('All');
  const [batchFilter, setBatchFilter] = useState<string>('All');

  // Currently inspected student
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Active tab inside the Manage modal
  const [activeTab, setActiveTab] = useState<'overview' | 'skips' | 'quizzes' | 'notes' | 'audit' | 'devices'>(
    'overview'
  );

  // Filter for audit logs inside modal
  const [auditCategoryFilter, setAuditCategoryFilter] = useState<string>('ALL');

  // Search within notes
  const [notesSearch, setNotesSearch] = useState('');

  const batches = Array.from(new Set(students.map((s) => s.batch)));

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesBatch = batchFilter === 'All' || s.batch === batchFilter;
    return matchesSearch && matchesStatus && matchesBatch;
  });

  // Load detailed monitoring analytics when a student is selected
  const monitoringData = selectedStudent ? getStudentMonitoringDetails(selectedStudent) : null;

  // Filtered audit logs
  const filteredAuditLogs = monitoringData
    ? monitoringData.auditLogs.filter(
        (log) => auditCategoryFilter === 'ALL' || log.category === auditCategoryFilter
      )
    : [];

  // Filtered notes
  const filteredNotes = monitoringData
    ? monitoringData.notesList.filter(
        (n) =>
          n.content.toLowerCase().includes(notesSearch.toLowerCase()) ||
          n.lectureTitle.toLowerCase().includes(notesSearch.toLowerCase()) ||
          n.tags.some((t) => t.toLowerCase().includes(notesSearch.toLowerCase()))
      )
    : [];

  // Total skips counted for current student
  const totalSkipsCount =
    monitoringData?.lectureAnalytics.reduce((acc, curr) => acc + curr.skippedSegments.length, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Academic Roster & Deep Oversight</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time video lecture completion, exact skip timestamps, quiz answers, study notes, and IP device sessions.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          Showing {filteredStudents.length} of {students.length} Students
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-600 outline-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none w-full sm:w-auto"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Graduated">Graduated</option>
          </select>

          {/* Batch Filter */}
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none w-full sm:w-auto"
          >
            <option value="All">All Batches</option>
            {batches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-semibold">Student & Contact</th>
                <th className="px-4 py-3 font-semibold">Cohort Group</th>
                <th className="px-4 py-3 font-semibold">Curriculum Progress</th>
                <th className="px-4 py-3 font-semibold">Last Active</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Inspection Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0f2b48] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {stu.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{stu.name}</div>
                        <div className="text-[11px] text-slate-400">{stu.email}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{stu.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-medium">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                      {stu.batch}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            stu.progressPercent >= 80
                              ? 'bg-emerald-600'
                              : stu.progressPercent >= 40
                              ? 'bg-blue-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${stu.progressPercent}%` }}
                        />
                      </div>
                      <span>{stu.progressPercent}%</span>
                      <span className="text-[10px] text-slate-400">
                        ({stu.completedLecturesCount}/{stu.totalLecturesCount})
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] font-mono">
                    {stu.lastActive}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        stu.status === 'Active'
                          ? 'success'
                          : stu.status === 'Graduated'
                          ? 'purple'
                          : 'danger'
                      }
                    >
                      {stu.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedStudent(stu);
                        setActiveTab('overview');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0f2b48] hover:bg-[#163e68] transition-colors shadow-xs flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Manage & Audit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= COMPREHENSIVE STUDENT MANAGEMENT MODAL ================= */}
      {selectedStudent && monitoringData && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Management: ${selectedStudent.name}`}
          description={`ID: ${selectedStudent.id} • Enrolled: ${selectedStudent.enrollmentDate} • Cohort: ${selectedStudent.batch}`}
          maxWidth="5xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-slate-400 font-mono">
                Real-time activity audit stream connected
              </span>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close Console
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
              {[
                { id: 'overview', label: 'Overview & Status', icon: Activity },
                {
                  id: 'skips',
                  label: `Lecture Watch & Skips (${totalSkipsCount} Skips)`,
                  icon: FastForward,
                },
                {
                  id: 'quizzes',
                  label: `MCQs & Quiz Results (${monitoringData.quizRecords.length})`,
                  icon: FileCheck2,
                },
                {
                  id: 'notes',
                  label: `Study Notes (${monitoringData.notesList.length})`,
                  icon: FileText,
                },
                {
                  id: 'audit',
                  label: `Audit Logs (${monitoringData.auditLogs.length})`,
                  icon: Shield,
                },
                {
                  id: 'devices',
                  label: `Devices & IP Logins (${monitoringData.loginSessions.length})`,
                  icon: Globe,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: OVERVIEW & STATUS CONTROL */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Profile Card & Academic Status Switcher */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#0f2b48] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                      {selectedStudent.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          {selectedStudent.name}
                        </h3>
                        <Badge
                          variant={
                            selectedStudent.status === 'Active'
                              ? 'success'
                              : selectedStudent.status === 'Graduated'
                              ? 'purple'
                              : 'danger'
                          }
                        >
                          {selectedStudent.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedStudent.email} • {selectedStudent.phone}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Enrolled Cohort: <span className="font-semibold text-slate-700">{selectedStudent.batch}</span>
                      </p>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Change Student Status
                    </span>
                    <div className="flex items-center gap-1.5">
                      {(['Active', 'Suspended', 'Graduated'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            onUpdateStudentStatus(selectedStudent.id, st);
                            setSelectedStudent({ ...selectedStudent, status: st });
                            onShowToast(`Student status updated to ${st}`, 'success');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            selectedStudent.status === st
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4 Summary Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[11px] text-slate-500 block">Curriculum Progress</span>
                    <span className="text-xl font-bold font-mono text-blue-700 block mt-1">
                      {selectedStudent.progressPercent}%
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {selectedStudent.completedLecturesCount} of {selectedStudent.totalLecturesCount} Lectures Completed
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[11px] text-slate-500 block">Average Quiz Score</span>
                    <span className="text-xl font-bold font-mono text-emerald-700 block mt-1">
                      {monitoringData.quizRecords.length > 0
                        ? `${Math.round(
                            monitoringData.quizRecords.reduce((a, q) => a + q.scorePercent, 0) /
                              monitoringData.quizRecords.length
                          )}%`
                        : 'N/A'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {monitoringData.quizRecords.length} Quizzes Attempted
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[11px] text-slate-500 block">Lecture Skips Recorded</span>
                    <span className="text-xl font-bold font-mono text-amber-600 block mt-1">
                      {totalSkipsCount} Skips
                    </span>
                    <span className="text-[10px] text-slate-400">Across All Video Modules</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[11px] text-slate-500 block">Active Devices & IPs</span>
                    <span className="text-xl font-bold font-mono text-purple-700 block mt-1">
                      {monitoringData.loginSessions.length} Devices
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {monitoringData.loginSessions.find((s) => s.status === 'Active')?.city || 'Pakistan'}
                    </span>
                  </div>
                </div>

                {/* Quick Shortcuts to Deep Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div
                    onClick={() => setActiveTab('skips')}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Watch & Skip Analytics
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Inspect exact skipped minutes & speeds
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div
                    onClick={() => setActiveTab('quizzes')}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        MCQ Quiz Breakdown
                      </span>
                      <span className="text-[11px] text-slate-500">
                        View question-by-question student answers
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div
                    onClick={() => setActiveTab('devices')}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        IP & Device Security
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Check laptop vs mobile IP logins
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LECTURE WATCH & SKIP ANALYTICS ("kitne ab tk lecture kha kha se skip kara") */}
            {activeTab === 'skips' && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Automated Video Playback & Skip Tracking:</span> Every time the student seeks ahead, changes playback speed, or bypasses video sections, the LMS video telemetry records the exact timestamp interval.
                  </div>
                </div>

                {/* Lecture-by-Lecture Breakdown */}
                <div className="space-y-3">
                  {monitoringData.lectureAnalytics.map((lec) => (
                    <div
                      key={lec.lectureId}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {lec.lectureTitle}
                            </span>
                            <Badge
                              variant={
                                lec.watchStatus === 'Completed'
                                  ? 'success'
                                  : lec.watchStatus === 'Partially Watched'
                                  ? 'warning'
                                  : 'neutral'
                              }
                              size="sm"
                            >
                              {lec.watchStatus} ({lec.watchPercent}%)
                            </Badge>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {lec.moduleTitle} • Total Duration: {lec.durationMinutes} mins • Speed: {lec.playbackSpeed}
                          </span>
                        </div>

                        <div className="text-right text-xs">
                          <span className="font-semibold text-slate-800 font-mono block">
                            Watched: {lec.totalWatchTimeFormatted}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Last Streamed: {lec.lastWatchedAt}
                          </span>
                        </div>
                      </div>

                      {/* Visual Progress Timeline (Visualizing watched vs skipped blocks) */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span>00:00</span>
                          <span>Video Playback Timeline Coverage</span>
                          <span>{lec.durationMinutes}:00</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex border border-slate-200/80">
                          {lec.watchPercent === 0 ? (
                            <div className="w-full bg-slate-200 h-full" title="Not Started" />
                          ) : (
                            <>
                              <div
                                style={{ width: `${Math.min(100, lec.watchPercent)}%` }}
                                className="bg-emerald-500 h-full"
                                title={`Watched ${lec.watchPercent}%`}
                              />
                              {lec.skippedSegments.length > 0 && (
                                <div
                                  style={{
                                    width: `${Math.min(100 - lec.watchPercent, 20)}%`,
                                  }}
                                  className="bg-amber-400 h-full"
                                  title="Skipped Segment"
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Granular Skips List ("kha kha se skip kara") */}
                      <div className="pt-2 border-t border-slate-100">
                        {lec.skippedSegments.length > 0 ? (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                              <FastForward className="w-3.5 h-3.5" />
                              <span>
                                {lec.skippedSegments.length} Skip Event(s) Detected in this Lecture:
                              </span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {lec.skippedSegments.map((sk, skIdx) => (
                                <div
                                  key={skIdx}
                                  className="p-2 rounded-lg bg-rose-50/70 border border-rose-200 text-xs"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-rose-800">
                                      Skipped {sk.fromFormatted} → {sk.toFormatted}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 font-mono text-[10px] font-bold">
                                      {sk.duration}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-rose-700 mt-0.5">{sk.reason}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : lec.watchStatus === 'Completed' ? (
                          <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                              Full playback completed from start to finish without fast-forwarding.
                            </span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 italic">
                            No playback recorded yet for this lecture.
                          </div>
                        )}

                        {/* Rewatched Segments if any */}
                        {lec.rewatchedSegments && lec.rewatchedSegments.length > 0 && (
                          <div className="mt-2 text-[11px] text-blue-700 bg-blue-50/60 p-1.5 rounded flex items-center gap-1.5">
                            <RotateCcw className="w-3 h-3 text-blue-600 shrink-0" />
                            <span>
                              High Engagement: {lec.rewatchedSegments.join(' • ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: MCQS & QUIZ RESULTS ("mcqs ka result har") */}
            {activeTab === 'quizzes' && (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Granular Assessment Audit:</span> Review full question-by-question student responses, scoring percentage, correct vs incorrect options, and attempt dates.
                  </div>
                </div>

                <div className="space-y-4">
                  {monitoringData.quizRecords.map((quiz) => (
                    <div
                      key={quiz.quizId}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3"
                    >
                      {/* Quiz Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{quiz.quizTitle}</h4>
                            <Badge variant={quiz.status === 'Passed' ? 'success' : 'danger'}>
                              {quiz.status}
                            </Badge>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {quiz.moduleTitle} • Attempted on: {quiz.attemptDate} ({quiz.timeSpentMinutes} mins taken)
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-bold font-mono text-blue-700 block">
                            {quiz.scorePercent}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {quiz.correctCount} of {quiz.totalQuestions} Questions Correct
                          </span>
                        </div>
                      </div>

                      {/* Question by question breakdown */}
                      <div className="space-y-2.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Question-by-Question Submission Audit:
                        </span>

                        {quiz.questions.map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                              q.isCorrect
                                ? 'bg-emerald-50/40 border-emerald-200'
                                : 'bg-rose-50/40 border-rose-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-slate-900">
                                Q{qIdx + 1}. {q.questionText}
                              </span>
                              {q.isCorrect ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Correct (+1)</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded shrink-0">
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Incorrect (0)</span>
                                </span>
                              )}
                            </div>

                            <div className="text-[11px] space-y-1 pt-1">
                              <div>
                                <span className="text-slate-500">Student Selected: </span>
                                <span
                                  className={`font-semibold ${
                                    q.isCorrect ? 'text-emerald-800' : 'text-rose-800'
                                  }`}
                                >
                                  {q.studentOption}
                                </span>
                              </div>
                              {!q.isCorrect && (
                                <div>
                                  <span className="text-slate-500">Correct Answer: </span>
                                  <span className="font-semibold text-emerald-800">
                                    {q.correctOption}
                                  </span>
                                </div>
                              )}
                              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/50 italic">
                                Explanation: {q.explanation}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STUDENT STUDY NOTES ("jo jo wo notes take kr rha hai sab kuch") */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-900">{filteredNotes.length} Private Notes</span> taken by {selectedStudent.name} during lecture playback.
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search notes content or tags..."
                      value={notesSearch}
                      onChange={(e) => setNotesSearch(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">
                              {note.lectureTitle}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                              @ {Math.floor(note.timestampSeconds / 60)}:
                              {String(note.timestampSeconds % 60).padStart(2, '0')}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {note.updatedAt}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 font-sans">
                          {note.content}
                        </p>

                        <div className="flex items-center gap-1.5 pt-1">
                          {note.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                      No study notes found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: AUDIT LOGS ("ak ak audit logs or sab kuch") */}
            {activeTab === 'audit' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Chronological audit log tracking every LMS interaction with IP and device identity.
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Filter Event:</span>
                    <select
                      value={auditCategoryFilter}
                      onChange={(e) => setAuditCategoryFilter(e.target.value)}
                      className="text-xs p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none"
                    >
                      <option value="ALL">All Event Types</option>
                      <option value="AUTH">Authentication / Logins</option>
                      <option value="VIDEO">Video Playback & Skips</option>
                      <option value="QUIZ">Quiz Assessments</option>
                      <option value="NOTE">Study Notes</option>
                      <option value="SECURITY">Security / Concurrent</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-3.5 py-2.5 font-semibold">Timestamp (PKT)</th>
                        <th className="px-3.5 py-2.5 font-semibold">Action / Event</th>
                        <th className="px-3.5 py-2.5 font-semibold">Description</th>
                        <th className="px-3.5 py-2.5 font-semibold">Device & IP Address</th>
                        <th className="px-3.5 py-2.5 font-semibold">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAuditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-3.5 py-2.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="px-3.5 py-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              {log.action}
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-700 font-medium">
                            {log.description}
                          </td>
                          <td className="px-3.5 py-2.5 text-[11px]">
                            <div className="font-semibold text-slate-800">{log.device}</div>
                            <div className="font-mono text-slate-400 text-[10px]">
                              {log.ipAddress}
                            </div>
                          </td>
                          <td className="px-3.5 py-2.5">
                            <Badge
                              variant={
                                log.severity === 'success'
                                  ? 'success'
                                  : log.severity === 'warning'
                                  ? 'warning'
                                  : 'info'
                              }
                              size="sm"
                            >
                              {log.severity}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 6: DEVICES & IP TRACKING ("studen kis kis ip se login kr rha hai ke mobile hai ya laptop") */}
            {activeTab === 'devices' && (
              <div className="space-y-4">
                {/* Security Status Alert Box */}
                {monitoringData.loginSessions.some((s) => s.isSuspicious) ? (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">
                        Multi-Device / Suspicious Location Flag Detected
                      </span>
                      <p className="mt-0.5">
                        Logins detected across multiple Pakistani ISPs (PTCL and Nayatel) within overlapping session windows. Please audit for shared student credentials.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">Device Integrity Normal:</span> Logins originate from authorized hardware profile with consistent residential IP addresses.
                    </div>
                  </div>
                )}

                {/* Device Sessions Cards */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    All Logged Devices & IP Address Footprints:
                  </span>

                  {monitoringData.loginSessions.map((sess) => {
                    const isMobile = sess.deviceType === 'Mobile';
                    const isTablet = sess.deviceType === 'Tablet';
                    const Icon = isMobile ? Smartphone : isTablet ? Tablet : Laptop;

                    return (
                      <div
                        key={sess.id}
                        className={`p-4 rounded-xl border bg-white shadow-xs space-y-3 transition-all ${
                          sess.status === 'Active'
                            ? 'border-blue-400 ring-1 ring-blue-400/30'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isMobile
                                  ? 'bg-purple-100 text-purple-700'
                                  : isTablet
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">
                                  {sess.deviceName}
                                </span>
                                <Badge
                                  variant={
                                    sess.status === 'Active'
                                      ? 'success'
                                      : 'neutral'
                                  }
                                  size="sm"
                                  dot={sess.status === 'Active'}
                                >
                                  {sess.status === 'Active' ? 'Active Session' : 'Logged Out'}
                                </Badge>
                                {sess.isSuspicious && (
                                  <Badge variant="warning" size="sm">
                                    Location Mismatch
                                  </Badge>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500">
                                {sess.os} • {sess.browser}
                              </span>
                            </div>
                          </div>

                          <div className="text-left sm:text-right text-xs">
                            <span className="text-[11px] font-mono font-bold text-slate-900 block">
                              IP: {sess.ipAddress}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              {sess.city} ({sess.isp})
                            </span>
                          </div>
                        </div>

                        {/* Session Timestamps */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Device Category:</span>
                            <span className="font-semibold text-slate-800">{sess.deviceType}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">ISP Provider:</span>
                            <span className="font-semibold text-slate-800 truncate block">
                              {sess.isp}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Login Timestamp:</span>
                            <span className="font-mono text-slate-700">{sess.loginTime}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Last Heartbeat:</span>
                            <span className="font-mono text-slate-700">{sess.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
