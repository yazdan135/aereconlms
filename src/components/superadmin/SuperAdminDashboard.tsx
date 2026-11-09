import React from 'react';
import {
  Shield,
  Users,
  BookOpen,
  Receipt,
  Award,
  Video,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Activity,
  Layers,
  Settings,
  CircleDollarSign,
} from 'lucide-react';
import { Student, Batch, PaymentVerification, FinancialRecord } from '../../types';
import { MOCK_ACTIVITY_LOGS, MOCK_SECURITY_EVENTS } from '../../utils/mockRbacData';

interface SuperAdminDashboardProps {
  students: Student[];
  batches: Batch[];
  paymentVerifications: PaymentVerification[];
  financialRecords: FinancialRecord[];
  onNavigate: (page: string) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  students,
  batches,
  paymentVerifications,
  financialRecords,
  onNavigate,
}) => {
  const totalRevenue = financialRecords
    .filter((f) => f.type === 'Income' && f.status === 'Completed')
    .reduce((acc, f) => acc + f.amountPKR, 0);

  const pendingPaymentsCount = paymentVerifications.filter((p) => p.status === 'Pending').length;
  const activeStudentsCount = students.filter((s) => s.status === 'Active').length;
  const recordedStudentsCount = students.filter((s) => s.enrolledProducts.includes('Recorded')).length;
  const liveStudentsCount = students.filter((s) => s.enrolledProducts.includes('LiveZoom')).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── PLATFORM CONTROL BANNER ─── */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            Root Super Administration Authority
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Aerecon Edu Enterprise Management
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Centralized platform oversight with role delegation matrix, full revenue ledgers, student tracking telemetry, and IP capture deterrents.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('roles-permissions')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4" /> Delegate Permissions
          </button>
          <button
            onClick={() => onNavigate('users')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors cursor-pointer"
          >
            Manage Users
          </button>
        </div>
      </div>

      {/* ─── CORE KPI METRICS ROW ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{students.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">{activeStudentsCount} Active</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Gross Revenue</span>
            <CircleDollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            PKR {(totalRevenue / 1000).toFixed(0)}k
          </div>
          <span className="text-[11px] text-slate-400">Total verified inflows</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Pending Audits</span>
            <Receipt className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{pendingPaymentsCount}</div>
          <span className="text-[11px] text-slate-400">Fee slips awaiting review</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Active Batches</span>
            <Video className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{batches.length}</div>
          <span className="text-[11px] text-slate-400">Cohorts running</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Security Alerts</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-600">{MOCK_SECURITY_EVENTS.length}</div>
          <span className="text-[11px] text-slate-400">Capture/IP incidents</span>
        </div>
      </div>

      {/* ─── TWO COLUMN CONTENT: REVENUE & ACTIVITY LOGS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Products Distribution & Quick Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Product Enrollment Breakdown</h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-blue-950">Recorded Course Masterclass</div>
                  <div className="text-[11px] text-blue-700">Fee: PKR 15,000 / Lifetime</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-950">{recordedStudentsCount}</div>
                  <div className="text-[10px] text-blue-600">Students</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-indigo-950">Live Zoom Classes Cohorts</div>
                  <div className="text-[11px] text-indigo-700">Fee: PKR 6,000 / Month</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-indigo-950">{liveStudentsCount || 38}</div>
                  <div className="text-[10px] text-indigo-600">Active Seats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Operations Matrix */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Super Admin Quick Launch
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('roles-permissions')}
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-left font-semibold text-slate-800"
              >
                Roles & Permissions
              </button>
              <button
                onClick={() => onNavigate('users')}
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-left font-semibold text-slate-800"
              >
                Staff Directory
              </button>
              <button
                onClick={() => onNavigate('financial-reports')}
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-left font-semibold text-slate-800"
              >
                Financial P&L
              </button>
              <button
                onClick={() => onNavigate('security-events')}
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-left font-semibold text-slate-800"
              >
                Security Events
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Institutional Activity Logs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Recent Platform Activity & Audit Logs</h3>
            </div>
            <button
              onClick={() => onNavigate('activity-logs')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Full Audit Trail <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {MOCK_ACTIVITY_LOGS.slice(0, 5).map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.userName}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{log.description}</p>
                  <div className="text-[10px] text-slate-400">
                    IP: {log.ipAddress} • {log.device}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

