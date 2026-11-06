import React, { useState } from 'react';
import {
  CircleDollarSign,
  TrendingUp,
  Download,
  Plus,
  Receipt,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
} from 'lucide-react';
import { FinancialRecord, ExpenseRecord, RefundRecord } from '../../types';
import {
  formatPKR,
  generatePnLSummary,
  calculateGrossRevenue,
  calculateTotalExpenses,
  calculateNetIncome,
  calculateProfitMarginPercent,
} from '../../utils/finance';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface AdminFinancialsProps {
  financialRecords: FinancialRecord[];
  initialExpenses: ExpenseRecord[];
  initialRefunds: RefundRecord[];
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AdminFinancials: React.FC<AdminFinancialsProps> = ({
  financialRecords,
  initialExpenses,
  initialRefunds,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'pnl' | 'income' | 'expenses' | 'refunds'>('pnl');
  const [dateFilter, setDateFilter] = useState<'All' | 'Month' | 'Quarter'>('All');
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(initialExpenses);
  const [refunds, setRefunds] = useState<RefundRecord[]>(initialRefunds);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  // New Expense form
  const [expCategory, setExpCategory] = useState<ExpenseRecord['category']>('Instructor Honorarium');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('15000');
  const [expReceipt, setExpReceipt] = useState('INV-2026-');

  // Compute live P&L
  const pnl = generatePnLSummary(financialRecords, expenses, refunds);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc.trim() || !expAmount) return;

    const newExp: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      date: '2026-11-02',
      category: expCategory,
      description: expDesc,
      amountPKR: parseInt(expAmount) || 0,
      approvedBy: 'Admin (CFO)',
      receiptNumber: expReceipt || `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setExpenses([newExp, ...expenses]);
    setShowAddExpenseModal(false);
    setExpDesc('');
    setExpAmount('15000');
    onShowToast(`Expense of ${formatPKR(newExp.amountPKR)} recorded in P&L ledger`, 'success');
  };

  const handleExportCSV = () => {
    onShowToast('Exported Aerecon_LMS_Financial_Ledger_2026.csv', 'info');
  };

  const handleExportPDF = () => {
    onShowToast('Generated Aerecon_Executive_PnL_Report.pdf', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Corporate Financial Management
            </span>
            <Badge variant="purple">Demonstration Data</Badge>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Profit & Loss Statement & Financial Audits
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Realized cash collections across course enrollments and live cohorts vs operating expenditures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="px-3 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record OpEx Expense</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Financial Executive Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Gross Inflows"
          value={formatPKR(pnl.totalRevenue)}
          subtext="Course sales + cohort subscriptions"
          icon={CircleDollarSign}
          trend={{ value: 'PKR Realized', isPositive: true }}
          highlight
        />
        <StatCard
          label="Total Operational Expenses"
          value={formatPKR(pnl.totalExpenses)}
          subtext="Faculty honorarium, Zoom licenses, CDN"
          icon={Receipt}
        />
        <StatCard
          label="Processed Refunds"
          value={formatPKR(pnl.totalRefunds)}
          subtext={`${refunds.length} duplicate deposit refunded`}
          icon={ArrowDownRight}
        />
        <StatCard
          label="Net Operating Profit"
          value={formatPKR(pnl.netOperatingIncome)}
          subtext={`${pnl.operatingMarginPercent}% Net Operating Margin`}
          icon={TrendingUp}
          trend={{ value: `${pnl.operatingMarginPercent}%`, isPositive: true }}
        />
      </div>

      {/* Interactive Trend Chart: Monthly Income vs Expenses */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Monthly Cash Inflow vs Operating Expenditure Trend
            </h3>
            <span className="text-xs text-slate-500">
              Comparative visualization of collections and platform costs
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-600" />
              <span className="text-slate-700">Gross Collections (PKR)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-300" />
              <span className="text-slate-700">Operating Expenses (PKR)</span>
            </div>
          </div>
        </div>

        {/* Crisp Restrained SVG Bar Chart with Readability */}
        <div className="pt-2">
          <div className="h-48 w-full flex items-end justify-between gap-3 sm:gap-6 px-2 sm:px-6 border-b border-slate-200">
            {[
              { month: 'Jul 2026', income: 45000, expense: 28000 },
              { month: 'Aug 2026', income: 58000, expense: 32000 },
              { month: 'Sep 2026', income: 69000, expense: 39000 },
              { month: 'Oct 2026', income: 84000, expense: 61700 },
              { month: 'Nov (M-T-D)', income: 21000, expense: 12000 },
            ].map((col, idx) => {
              const maxScale = 90000;
              const incomeHeight = Math.round((col.income / maxScale) * 100);
              const expenseHeight = Math.round((col.expense / maxScale) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 sm:gap-2 h-full">
                    {/* Income Bar */}
                    <div
                      className="w-1/2 max-w-[28px] bg-blue-600 hover:bg-blue-700 rounded-t transition-all relative flex flex-col justify-start"
                      style={{ height: `${incomeHeight}%` }}
                    >
                      <div className="hidden group-hover:block absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                        {formatPKR(col.income)}
                      </div>
                    </div>

                    {/* Expense Bar */}
                    <div
                      className="w-1/2 max-w-[28px] bg-slate-300 hover:bg-slate-400 rounded-t transition-all relative flex flex-col justify-start"
                      style={{ height: `${expenseHeight}%` }}
                    >
                      <div className="hidden group-hover:block absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                        {formatPKR(col.expense)}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs font-semibold text-slate-600 mt-2 truncate">
                    {col.month}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-4">
            <span>PKR 0</span>
            <span>Target Scale: PKR 90,000 / month</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Financial Breakdown */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'pnl', label: 'Profit & Loss Statement (P&L)' },
          { id: 'income', label: `Realized Income (${financialRecords.length})` },
          { id: 'expenses', label: `Operating Expenses (${expenses.length})` },
          { id: 'refunds', label: `Refunds & Adjustments (${refunds.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Detailed P&L Breakdown */}
      {activeTab === 'pnl' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Aerecon Executive LMS — Statement of Profit or Loss
              </h3>
              <p className="text-xs text-slate-500">
                For the current operating period (Demonstration financials)
              </p>
            </div>
            <button
              onClick={handleExportPDF}
              className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Signed Audit Report</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {/* 1. REVENUE SECTION */}
            <div className="py-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center justify-between">
                <span>1. Operating Revenue Streams</span>
                <span className="font-mono text-emerald-700">{formatPKR(pnl.totalRevenue)}</span>
              </div>
              <div className="space-y-1.5 pl-4 text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Recorded Business Management Course (PKR 15,000 / seat)</span>
                  <span className="font-mono font-medium text-slate-800">
                    {formatPKR(pnl.grossCourseRevenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Live Zoom Masterclass Cohort Subscriptions (PKR 6,000 / mo)</span>
                  <span className="font-mono font-medium text-slate-800">
                    {formatPKR(pnl.liveClassesRevenue)}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. OPERATING EXPENSES SECTION */}
            <div className="py-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center justify-between">
                <span>2. Operational & Platform Expenditures</span>
                <span className="font-mono text-rose-700">({formatPKR(pnl.totalExpenses)})</span>
              </div>
              <div className="space-y-1.5 pl-4 text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Instructor Honorarium & Faculty Masterclass Compensation</span>
                  <span className="font-mono text-slate-800">
                    {formatPKR(pnl.instructorCosts)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cloud Video Streaming Infrastructure & Zoom Enterprise Licenses</span>
                  <span className="font-mono text-slate-800">
                    {formatPKR(pnl.platformAndHostingCosts)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Executive Outreach & Corporate LinkedIn Sponsorship</span>
                  <span className="font-mono text-slate-800">
                    {formatPKR(pnl.marketingCosts)}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. REFUNDS & ADJUSTMENTS */}
            <div className="py-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center justify-between">
                <span>3. Fee Refunds & Banking Adjustments</span>
                <span className="font-mono text-rose-700">({formatPKR(pnl.totalRefunds)})</span>
              </div>
              <div className="pl-4 text-slate-600 flex items-center justify-between">
                <span>Processed Overpayment & Accidental Duplicate Transfers</span>
                <span className="font-mono text-slate-800">{formatPKR(pnl.totalRefunds)}</span>
              </div>
            </div>

            {/* 4. NET OPERATING INCOME */}
            <div className="pt-4 flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                  Net Operating Income (EBIT)
                </span>
                <span className="text-[11px] text-slate-500">
                  Operating Profit Margin: <strong className="text-emerald-700 font-mono">{pnl.operatingMarginPercent}%</strong>
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold font-mono text-emerald-800 block">
                  {formatPKR(pnl.netOperatingIncome)}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold uppercase">
                  Healthy Positive Cash Flow
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Realized Income Table */}
      {activeTab === 'income' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Method & Ref #</th>
                  <th className="px-4 py-3 font-semibold text-right">Amount (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {financialRecords.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-mono">{t.date}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{t.category}</td>
                    <td className="px-4 py-3 text-slate-600">{t.description}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{t.paymentMethod}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t.referenceNumber}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">
                      +{formatPKR(t.amountPKR)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Operating Expenses Table */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Cost Category</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Receipt / Invoice #</th>
                  <th className="px-4 py-3 font-semibold text-right">Disbursed (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-mono">{e.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant="purple">{e.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{e.description}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{e.receiptNumber}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-rose-700">
                      -{formatPKR(e.amountPKR)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Refunds & Adjustments */}
      {activeTab === 'refunds' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Reason</th>
                  <th className="px-4 py-3 font-semibold">Bank Ref #</th>
                  <th className="px-4 py-3 font-semibold text-right">Refund Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {refunds.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-mono">{r.date}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{r.studentName}</td>
                    <td className="px-4 py-3 text-slate-600">{r.reason}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{r.transactionRef}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-amber-700">
                      -{formatPKR(r.amountPKR)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Expense Modal */}
      <Modal
        isOpen={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        title="Record Operating Expenditure"
        description="Log vendor, faculty, or infrastructure invoice into the P&L statement."
        maxWidth="md"
      >
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expense Category
            </label>
            <select
              value={expCategory}
              onChange={(e) => setExpCategory(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
            >
              <option value="Instructor Honorarium">Instructor Honorarium</option>
              <option value="Zoom Licenses">Zoom Enterprise Licenses</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure & CDN</option>
              <option value="Marketing">Marketing & Student Outreach</option>
              <option value="Operations">Operations & Compliance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expense Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Monthly cloud video CDN streaming cost"
              value={expDesc}
              onChange={(e) => setExpDesc(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount (PKR) *
              </label>
              <input
                type="number"
                required
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Invoice / Slip #
              </label>
              <input
                type="text"
                placeholder="INV-9902"
                value={expReceipt}
                onChange={(e) => setExpReceipt(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddExpenseModal(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              Post Expense
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
