import React, { useState } from 'react';
import { Batch, Student } from '../../types';
import { Badge } from '../common/Badge';
import {
  CalendarCheck,
  Users,
  Save,
  CheckCircle2,
  Clock,
  Plus,
  Video,
  X,
  AlertCircle,
} from 'lucide-react';
import { calculateBatchAttendanceRate } from '../../utils/learning';

interface ManagerBatchesProps {
  batches: Batch[];
  students: Student[];
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const ManagerBatches: React.FC<ManagerBatchesProps> = ({
  batches: initialBatches,
  students,
  onShowToast,
}) => {
  const [batchesList, setBatchesList] = useState<Batch[]>(initialBatches);
  const [selectedBatchId, setSelectedBatchId] = useState<string>(initialBatches[0]?.id || 'batch-08');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create batch form
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchCode, setNewBatchCode] = useState('');
  const [newInstructor, setNewInstructor] = useState('Prof. Tariq Amin');
  const [newCapacity, setNewCapacity] = useState(35);
  const [newSchedule, setNewSchedule] = useState('Tuesdays & Fridays, 7:30 PM - 9:30 PM PKT');
  const [newMeetingUrl, setNewMeetingUrl] = useState('');

  // Attendance records
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({
    'stu-101': 'Present',
    'stu-102': 'Present',
    'stu-104': 'Present',
    'stu-106': 'Late',
    'stu-107': 'Absent',
  });

  const selectedBatch = batchesList.find((b) => b.id === selectedBatchId) || batchesList[0];
  const batchStudents = students.filter(
    (s) => s.batch.includes('Cohort 8') || s.batch === selectedBatch?.name
  );

  const attendanceEntries = batchStudents.map((s) => ({
    status: attendanceMap[s.id] || 'Present',
  }));
  const rate = calculateBatchAttendanceRate(attendanceEntries);

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveAttendance = () => {
    onShowToast(`Attendance saved for ${selectedBatch.name}. Session Rate: ${rate}%`, 'success');
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;

    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      code: newBatchCode.trim() || `BM-2026-COHORT-${batchesList.length + 7}`,
      name: newBatchName.trim(),
      schedule: newSchedule,
      studentCount: 0,
      maxStudents: newCapacity,
      startDate: '2026-11-15',
      instructor: newInstructor,
      status: 'Upcoming',
    };

    setBatchesList([...batchesList, newBatch]);
    setShowCreateModal(false);
    setNewBatchName('');
    setNewBatchCode('');
    onShowToast(`New online batch "${newBatch.name}" created!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            Online Live Cohorts
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Batch Management & Attendance
          </h1>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Batch
        </button>
      </div>

      {/* Batches Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {batchesList.map((b) => {
          const isSelected = b.id === selectedBatchId;
          return (
            <div
              key={b.id}
              onClick={() => setSelectedBatchId(b.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all shadow-xs ${
                isSelected
                  ? 'bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold uppercase text-slate-400">
                  {b.code}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{b.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{b.schedule}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>
                  {b.studentCount} / {b.maxStudents} Enrolled
                </span>
                <span className="font-semibold text-slate-800">{b.instructor}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Attendance Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
              Selected: {selectedBatch?.name}
            </span>
            <h3 className="text-sm font-bold text-slate-900">Cohort Attendance & Participation Log</h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Rate: {rate}% Present
            </span>
            <button
              onClick={handleSaveAttendance}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save Attendance
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Enrolled Cohort</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Attendance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batchStudents.map((s) => {
                const cur = attendanceMap[s.id] || 'Present';
                return (
                  <tr key={s.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                    <td className="py-3 px-4 text-slate-500">{s.email}</td>
                    <td className="py-3 px-4 text-slate-600">{s.batch}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cur === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : cur === 'Late'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {cur}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        {(['Present', 'Late', 'Absent'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(s.id, st)}
                            className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                              cur === st
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Batch Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create Online Live Batch</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Batch Name</label>
                <input
                  type="text"
                  placeholder="e.g. Cohort 9 (Weekend Intensive Masterclass)"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Batch Code / ID</label>
                  <input
                    type="text"
                    placeholder="BM-2026-COHORT-9"
                    value={newBatchCode}
                    onChange={(e) => setNewBatchCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Instructor</label>
                <input
                  type="text"
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Class Schedule & Cadence</label>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meeting Platform URL (Zoom)</label>
                <input
                  type="url"
                  placeholder="https://zoom.us/j/89421904421?pwd=..."
                  value={newMeetingUrl}
                  onChange={(e) => setNewMeetingUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
