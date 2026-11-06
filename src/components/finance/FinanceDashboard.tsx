import React from 'react';
import {
  CircleDollarSign,
  Receipt,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { PaymentVerification, FinancialRecord, ExpenseRecord, RefundRecord } from '../../types';

interface FinanceDashboardProps {
  paymentVerifications: PaymentVerification[];
  financialRecords: FinancialRecord[];
  expenses: ExpenseRecord[];
  refunds: RefundRecord[];
  onNavigate: (page: string) => void;
}

export const FinanceDashboard: React.FC<FinanceDashboardProps> = ({
  paymentVerifications,
  financialRecords,
  expenses,
  refunds,
  onNavigate,
}) => {
  const totalRevenue = financialRecords
    .filter((f) => f.type === 'Income' && f.status === 'Completed')
    .reduce((acc, f) => acc + f.amountPKR, 0);

  const recordedRevenue = financialRecords
    .filter((f) => f.category.includes('Recorded') && f.status === 'Completed')
    .reduce((acc, f) => acc + f.amountPKR, 0);

  const liveRevenue = financialRecords
    .filter((f) => f.category.includes('Live') && f.status === 'Completed')
    .reduce((acc, f) => acc + f.amountPKR, 0);

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amountPKR, 0);
  const netProfit = totalRevenue - totalExpenses;
  const pendingVerifications = paymentVerifications.filter((p) => p.status === 'Pending');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            Accounts & Financial Ledgers
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finance Management Portal</h1>
        </div>

        <button
          onClick={() => onNavigate('payment-verification')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Receipt className="w-4 h-4" /> Verify Pending Payments ({pendingVerifications.length})
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Revenue Collected</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            PKR {totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Verified income</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Pending Approvals</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {pendingVerifications.length} Slips
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Requires bank audit</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Expenses Recorded</span>
          <div className="text-2xl font-bold text-red-600 mt-1">
            PKR {totalExpenses.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Operational & Zoom licenses</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Net Realized Profit</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            PKR {netProfit.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Net surplus</span>
        </div>
      </div>

      {/* Pending Verifications Queue */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Pending Fee Deposit Verification Queue</h3>
          <button
            onClick={() => onNavigate('payment-verification')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Open Full Ledger <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {pendingVerifications.slice(0, 4).map((p) => (
            <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900">{p.studentName}</div>
                <div className="text-slate-500 text-[11px]">
                  {p.productType} • Amount: <strong className="text-slate-800">PKR {p.amountPKR.toLocaleString()}</strong>
                </div>
                <div className="text-slate-400 text-[10px] font-mono mt-0.5">
                  Ref: {p.transactionReference} ({p.paymentMethod}) • Submitted: {p.submittedAt}
                </div>
              </div>

              <button
                onClick={() => onNavigate('payment-verification')}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-lg text-xs hover:bg-emerald-100 transition-colors cursor-pointer self-start sm:self-auto"
              >
                Audit & Verify
              </button>
            </div>
          ))}
          {pendingVerifications.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-400">
              All payment submissions have been audited. No pending items.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

