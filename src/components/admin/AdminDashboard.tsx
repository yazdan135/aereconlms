import React from 'react';
import {
  CircleDollarSign,
  Receipt,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { PaymentVerification, FinancialRecord, Student, AdminNavPage } from '../../types';
import { formatPKR, calculateGrossRevenue, calculateTotalExpenses, calculateNetIncome, calculateProfitMarginPercent } from '../../utils/finance';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';

interface AdminDashboardProps {
  paymentVerifications: PaymentVerification[];
  financialRecords: FinancialRecord[];
  students: Student[];
  onNavigate: (page: AdminNavPage) => void;
  onVerifyPayment: (id: string, status: 'Approved' | 'Rejected', reason?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  paymentVerifications,
  financialRecords,
  students,
  onNavigate,
  onVerifyPayment,
}) => {
  const pendingVerifications = paymentVerifications.filter((p) => p.status === 'Pending');
  const grossRevenue = calculateGrossRevenue(financialRecords);
  const totalExpenses = 61700; // From expense records
  const netIncome = calculateNetIncome(grossRevenue, totalExpenses, 6000);
  const margin = calculateProfitMarginPercent(netIncome, grossRevenue);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Executive Administration & Finance
            </span>
            <Badge variant="success">Full Access</Badge>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Aerecon LMS Administrative Command
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time financial audits, payment verification queue, enrollment governance, and platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('payment-verification')}
            className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Review Verifications ({pendingVerifications.length})</span>
          </button>
          <button
            onClick={() => onNavigate('financials')}
            className="px-3.5 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CircleDollarSign className="w-3.5 h-3.5" />
            <span>P&L Statement</span>
          </button>
        </div>
      </div>

      {/* Financial Executive KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Gross Collections"
          value={formatPKR(grossRevenue)}
          subtext="Verified course & cohort fee deposits"
          icon={CircleDollarSign}
          trend={{ value: '+22.4% MoM', isPositive: true }}
          highlight
        />
        <StatCard
          label="Pending Verification"
          value={pendingVerifications.length}
          subtext={`${formatPKR(
            pendingVerifications.reduce((sum, p) => sum + p.amountPKR, 0)
          )} awaiting bank slip audit`}
          icon={Receipt}
        />
        <StatCard
          label="Total Active Enrollees"
          value={students.length}
          subtext="Corporate executives & managers"
          icon={Users}
        />
        <StatCard
          label="Net Operating Margin"
          value={`${margin}%`}
          subtext={`${formatPKR(netIncome)} net operating income`}
          icon={TrendingUp}
          trend={{ value: 'Strong margin', isPositive: true }}
        />
      </div>

      {/* Verification Queue Immediate Action Box */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Incoming Fee Verification Queue
            </h3>
            {pendingVerifications.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {pendingVerifications.length} Requires Review
              </span>
            )}
          </div>
          <button
            onClick={() => onNavigate('payment-verification')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
          >
            Open Full Verification Ledger →
          </button>
        </div>

        {pendingVerifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            All submitted student payments have been audited and verified.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingVerifications.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="warning" dot>Pending Audit</Badge>
                    <span className="font-semibold text-slate-900">{item.studentName}</span>
                    <span className="text-slate-400">({item.studentEmail})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                    <span>Program: <strong className="text-slate-800">{item.productType}</strong></span>
                    <span>•</span>
                    <span>Amount: <strong className="text-emerald-700 font-mono">{formatPKR(item.amountPKR)}</strong></span>
                    <span>•</span>
                    <span>Method: {item.paymentMethod}</span>
                    <span>•</span>
                    <span>Ref: <strong className="font-mono text-slate-800">{item.transactionReference}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onVerifyPayment(item.id, 'Approved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Activate</span>
                  </button>
                  <button
                    onClick={() => onVerifyPayment(item.id, 'Rejected', 'Reference code did not match statement')}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-semibold text-xs transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Financial Snapshot vs Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Sources Summary */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Revenue Stream Performance</h3>
            <span className="text-xs text-slate-400">PKR Currency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Product 1: Recorded */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                Recorded Masterclass
              </span>
              <div className="text-xl font-bold font-mono text-slate-900">
                {formatPKR(60000)}
              </div>
              <p className="text-[11px] text-slate-500">
                4 enrolled students • PKR 15,000 per lifetime seat
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[71%]" />
              </div>
              <span className="text-[10px] text-slate-400">71.4% of total top-line revenue</span>
            </div>

            {/* Product 2: Live Zoom */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                Live Zoom Cohorts
              </span>
              <div className="text-xl font-bold font-mono text-slate-900">
                {formatPKR(24000)}
              </div>
              <p className="text-[11px] text-slate-500">
                4 active monthly subscriptions • PKR 6,000/month
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[29%]" />
              </div>
              <span className="text-[10px] text-slate-400">28.6% of recurring monthly revenue</span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={() => onNavigate('financials')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
            >
              View Full Profit & Loss Breakdown →
            </button>
          </div>
        </div>

        {/* Platform Quick Health */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Platform Infrastructure Status</h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Zoom Enterprise API</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Video CDN Bandwidth</span>
              <span className="text-slate-900 font-mono font-semibold">1080p Ultra HD (99.98%)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Raast / Bank Webhooks</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" /> Operational
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('settings')}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors text-center"
            >
              Platform Configuration Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
