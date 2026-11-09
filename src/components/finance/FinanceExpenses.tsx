import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Receipt,
  CheckCircle2,
} from 'lucide-react';
import { ExpenseRecord } from '../../types';

interface FinanceExpensesProps {
  expenses: ExpenseRecord[];
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const FinanceExpenses: React.FC<FinanceExpensesProps> = ({
  expenses: initialExpenses,
  onShowToast,
}) => {
  const [expenseList, setExpenseList] = useState<ExpenseRecord[]>(initialExpenses);
  const [showAddModal, setShowAddModal] = useState(false);

  // New expense form
  const [category, setCategory] = useState<ExpenseRecord['category']>('Zoom Licenses');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(10000);
  const [receiptNumber, setReceiptNumber] = useState('');

  const totalExpense = expenseList.reduce((acc, e) => acc + e.amountPKR, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || amount <= 0) return;

    const newRec: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      date: '2026-11-04',
      category,
      description: description.trim(),
      amountPKR: amount,
      approvedBy: 'Finance Lead (Muneeb)',
      receiptNumber: receiptNumber || `RCP-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setExpenseList([newRec, ...expenseList]);
    setShowAddModal(false);
    setDescription('');
    setReceiptNumber('');
    onShowToast(`Expense of PKR ${amount.toLocaleString()} logged in ledger.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
            Operational Outflows & Overhead
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Institutional Expense Ledger</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Record Operating Expense
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 font-medium">Total Recorded Operating Expenses</span>
          <div className="text-2xl font-bold text-red-600 mt-1">
            PKR {totalExpense.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Expense Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Receipt / Invoice #</th>
                <th className="py-3 px-4">Authorized By</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenseList.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{exp.date}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-sm">{exp.description}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{exp.receiptNumber}</td>
                  <td className="py-3 px-4 text-slate-600">{exp.approvedBy}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-red-600 whitespace-nowrap">
                    -PKR {exp.amountPKR.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Record Institutional Expense</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expense Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Instructor Honorarium">Instructor Honorarium</option>
                  <option value="Zoom Licenses">Zoom Licenses & Cloud Infrastructure</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure & CDN</option>
                  <option value="Marketing">Marketing & Student Acquisition</option>
                  <option value="Operations">Operations & Administrative</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Monthly Enterprise Zoom 500-seat license renewal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount (PKR)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Invoice / Receipt Number</label>
                <input
                  type="text"
                  placeholder="e.g. INV-ZM-9021"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

