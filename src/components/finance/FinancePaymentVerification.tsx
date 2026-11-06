import React, { useState } from 'react';
import {
  Receipt,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  FileText,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { PaymentVerification } from '../../types';

interface FinancePaymentVerificationProps {
  verifications: PaymentVerification[];
  onVerifyPayment: (id: string, status: 'Approved' | 'Rejected', reason?: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const FinancePaymentVerification: React.FC<FinancePaymentVerificationProps> = ({
  verifications,
  onVerifyPayment,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [search, setSearch] = useState('');
  const [selectedProof, setSelectedProof] = useState<PaymentVerification | null>(null);
  const [rejectionModalItem, setRejectionModalItem] = useState<PaymentVerification | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const filtered = verifications.filter((v) => {
    const matchFilter = filter === 'All' || v.status === filter;
    const matchSearch =
      v.studentName.toLowerCase().includes(search.toLowerCase()) ||
      v.transactionReference.toLowerCase().includes(search.toLowerCase()) ||
      v.studentEmail.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleApprove = (item: PaymentVerification) => {
    onVerifyPayment(item.id, 'Approved');
    onShowToast(`Payment for ${item.studentName} approved. Access activated.`, 'success');
  };

  const handleConfirmReject = () => {
    if (!rejectionModalItem) return;
    onVerifyPayment(rejectionModalItem.id, 'Rejected', rejectionReason || 'Transaction reference unverified');
    onShowToast(`Payment for ${rejectionModalItem.studentName} rejected.`, 'error');
    setRejectionModalItem(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            Bank Audit & Ledger Clearance
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Verification Queue</h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student, reference ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Product Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Method & TID</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{item.studentName}</div>
                  <div className="text-[10px] text-slate-400">{item.studentEmail}</div>
                </td>
                <td className="py-3 px-4 text-slate-700">{item.productType}</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">
                  PKR {item.amountPKR.toLocaleString()}
                  {item.promoCode && (
                    <span className="block text-[9px] text-blue-600 font-normal">
                      Promo: {item.promoCode} (-PKR {item.discountPKR})
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                  <div>{item.paymentMethod}</div>
                  <div className="text-[10px] text-slate-400">{item.transactionReference}</div>
                </td>
                <td className="py-3 px-4 text-slate-400">{item.submittedAt}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.status === 'Rejected'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setSelectedProof(item)}
                      className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg text-xs"
                    >
                      View Slip
                    </button>
                    {item.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(item)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setRejectionModalItem(item)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slip Proof Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Payment Deposit Receipt Proof</h3>
              <button onClick={() => setSelectedProof(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div><strong>Student:</strong> {selectedProof.studentName}</div>
              <div><strong>Transaction ID:</strong> {selectedProof.transactionReference}</div>
              <div><strong>Method:</strong> {selectedProof.paymentMethod}</div>
              <div><strong>Amount:</strong> PKR {selectedProof.amountPKR.toLocaleString()}</div>
              <div><strong>Document Attached:</strong> <span className="font-mono text-blue-600">{selectedProof.proofDocumentUrl}</span></div>
            </div>

            <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
              <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <span>Simulated Document View: Bank Transfer Confirmation Slip / Raast SMS Screenshot</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProof(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectionModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Reject Payment Submission</h3>
            <p className="text-xs text-slate-600">
              State the reason for rejection (e.g. invalid reference number, uncredited bank deposit):
            </p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Deposit not reflected in bank account statement after 24 hours..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <div className="flex justify-end gap-2 pt-2 text-xs">
              <button
                onClick={() => setRejectionModalItem(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

