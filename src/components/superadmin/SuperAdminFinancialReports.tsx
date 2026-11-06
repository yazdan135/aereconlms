import React, { useState } from 'react';
import {
  CircleDollarSign,
  TrendingUp,
  Receipt,
  Download,
  Filter,
  Calendar,
} from 'lucide-react';
import { FinancialRecord, ExpenseRecord, RefundRecord } from '../../types';

interface SuperAdminFinancialReportsProps {
  financialRecords: FinancialRecord[];
  expenses: ExpenseRecord[];
  refunds: RefundRecord[];
}

export const SuperAdminFinancialReports: React.FC<SuperAdminFinancialReportsProps> = ({
  financialRecords,
  expenses,
  refunds,
}) => {
  const [period, setPeriod] = useState<'All' | 'Month' | 'Quarter'>('All');

  const totalIncome = financialRecords
    .filter((f) => f.type === 'Income' && f.status === 'Completed')
    .reduce((acc, f) => acc + f.amountPKR, 0);

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amountPKR, 0);
  const totalRefunds = refunds.reduce((acc, r) => acc + r.amountPKR, 0);
  const netProfit = totalIncome - totalExpenses - totalRefunds;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            Executive Ledger & Profitability
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Institutional Financial Reports</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Gross Realized Revenue</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            PKR {totalIncome.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Operating Expenses</span>
          <div className="text-2xl font-bold text-red-600 mt-1">
            PKR {totalExpenses.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Processed Refunds</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            PKR {totalRefunds.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Net Profit / Surplus</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            PKR {netProfit.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Income & Fee Settlement Audit Table</h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Product Category</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Method & Ref</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {financialRecords.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/60">
                <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{r.date}</td>
                <td className="py-3 px-4 font-semibold text-slate-800">{r.category}</td>
                <td className="py-3 px-4 text-slate-600">{r.description}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">
                  {r.paymentMethod} • {r.referenceNumber}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                  +PKR {r.amountPKR.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

