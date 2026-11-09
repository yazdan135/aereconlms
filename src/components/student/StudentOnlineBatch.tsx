import React from 'react';
import {
  CalendarCheck,
  Users,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
} from 'lucide-react';

export const StudentOnlineBatch: React.FC = () => {
  const batchDetails = {
    name: 'Cohort 8 (Executive Evening Masterclass)',
    code: 'BM-2026-COHORT-8',
    instructor: 'Prof. Tariq Amin',
    enrolledCount: 38,
    maxCapacity: 45,
    schedule: 'Mondays & Thursdays, 7:30 PM - 9:30 PM PKT',
    platform: 'Zoom Enterprise Video Infrastructure',
    activeMonth: 'November 2026',
    status: 'Active',
  };

  const attendanceRecords = [
    { session: 'Competitive Moats & Pricing Power', date: '2026-10-28', status: 'Present', duration: '120m' },
    { session: 'Value Chain Mapping Case Study', date: '2026-10-24', status: 'Present', duration: '115m' },
    { session: 'Financial Statements Dissection Workshop', date: '2026-10-21', status: 'Late (15m)', duration: '105m' },
    { session: 'Blue Ocean Strategy In Emerging Markets', date: '2026-10-17', status: 'Present', duration: '120m' },
    { session: 'Orientation & Executive Case Method', date: '2026-10-14', status: 'Present', duration: '90m' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Online Cohort & Batch</h1>
        <p className="text-xs text-slate-500 mt-1">
          Detailed schedule, peer cohort members, and personal live attendance audit.
        </p>
      </div>

      {/* Cohort Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {batchDetails.code}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{batchDetails.name}</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> {batchDetails.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
          <div>
            <div className="text-slate-400">Executive Mentor</div>
            <div className="font-semibold text-slate-800 mt-0.5">{batchDetails.instructor}</div>
          </div>
          <div>
            <div className="text-slate-400">Class Cadence</div>
            <div className="font-semibold text-slate-800 mt-0.5">{batchDetails.schedule}</div>
          </div>
          <div>
            <div className="text-slate-400">Cohort Enrolled</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              {batchDetails.enrolledCount} / {batchDetails.maxCapacity} Students
            </div>
          </div>
          <div>
            <div className="text-slate-400">Platform</div>
            <div className="font-semibold text-indigo-700 mt-0.5">{batchDetails.platform}</div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Personal Live Attendance History</h3>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Attendance Rate: 95%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Live Session Title</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-right">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceRecords.map((rec, i) => (
                <tr key={i} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-medium text-slate-900">{rec.session}</td>
                  <td className="py-3 px-4 text-slate-500">{rec.date}</td>
                  <td className="py-3 px-4 text-slate-600">{rec.duration}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        rec.status.includes('Present')
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" /> {rec.status}
                    </span>
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

