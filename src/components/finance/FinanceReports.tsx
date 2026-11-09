import React from 'react';
import {
  CircleDollarSign,
  TrendingUp,
  Download,
  Calendar,
  Receipt,
} from 'lucide-react';
import { FinancialRecord, ExpenseRecord, RefundRecord } from '../../types';

interface FinanceReportsProps {
  financialRecords: FinancialRecord[];
  expenses: ExpenseRecord[];
  refunds: RefundRecord[];
}

export const FinanceReports: React.FC<FinanceReportsProps> = ({
  financialRecords,
  expenses,
  refunds,
}) => {
  const totalRevenue = financialRecords
    .filter((f) => f.type === 'Income' && f.status === 'Completed')
    .reduce((acc, f) => acc + f.amountPKR, 0);

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amountPKR, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            Audited Financial Statements
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Revenue Reports & P&L Statement</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Gross Collected Income</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">PKR {totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Operating Overhead</span>
          <div className="text-2xl font-bold text-red-600 mt-1">PKR {totalExpenses.toLocaleString()}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Net Institutional Surplus</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">PKR {netProfit.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Settled Transaction Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Amount (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {financialRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{r.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{r.category}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">{r.referenceNumber}</td>
                  <td className="py-3 px-4 text-slate-600">{r.paymentMethod}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                    +{r.amountPKR.toLocaleString()}
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

