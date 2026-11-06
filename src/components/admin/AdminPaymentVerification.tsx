import React, { useState } from 'react';
import { PaymentVerification } from '../../types';
import { formatPKR } from '../../utils/finance';
import {
  Receipt,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileText,
  ShieldCheck,
  Building2,
  Copy,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface AdminPaymentVerificationProps {
  verifications: PaymentVerification[];
  onVerifyPayment: (id: string, status: 'Approved' | 'Rejected', reason?: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AdminPaymentVerification: React.FC<AdminPaymentVerificationProps> = ({
  verifications,
  onVerifyPayment,
  onShowToast,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedVerification, setSelectedVerification] = useState<PaymentVerification | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Transaction reference not found in bank statement.');

  const filtered = verifications.filter((v) => {
    const matchesSearch =
      v.studentName.toLowerCase().includes(search.toLowerCase()) ||
      v.transactionReference.toLowerCase().includes(search.toLowerCase()) ||
      v.studentEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (v: PaymentVerification) => {
    onVerifyPayment(v.id, 'Approved');
    setSelectedVerification(null);
    onShowToast(`Payment approved! ${v.studentName} activated for ${v.productType}`, 'success');
  };

  const handleReject = (v: PaymentVerification) => {
    onVerifyPayment(v.id, 'Rejected', rejectionReason);
    setSelectedVerification(null);
    onShowToast(`Verification rejected for ${v.studentName}`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Fee Deposit Verification Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit manual Pakistani bank transfers, Raast P2P transaction references, and digital wallet receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning">
            {verifications.filter((v) => v.status === 'Pending').length} Pending Audits
          </Badge>
          <Badge variant="success">
            {verifications.filter((v) => v.status === 'Approved').length} Approved
          </Badge>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student, email, reference code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-600 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none"
          >
            <option value="All">All Verification Statuses</option>
            <option value="Pending">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Verification Data Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-semibold">Student & Contact</th>
                <th className="px-4 py-3 font-semibold">Program Enrolled</th>
                <th className="px-4 py-3 font-semibold">Amount & Method</th>
                <th className="px-4 py-3 font-semibold">Transaction Reference</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Audit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{item.studentName}</div>
                    <div className="text-[11px] text-slate-400">{item.studentEmail}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-800">{item.productType}</span>
                    <div className="text-[10px] text-slate-400">{item.submittedAt}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold font-mono text-emerald-700">
                      {formatPKR(item.amountPKR)}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.paymentMethod} {item.bankName ? `(${item.bankName})` : ''}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">
                    {item.transactionReference}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        item.status === 'Approved'
                          ? 'success'
                          : item.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }
                      dot
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedVerification(item)}
                      className="px-3 py-1 rounded-md text-xs font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 transition-colors"
                    >
                      Audit Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slip Audit & Verification Modal */}
      {selectedVerification && (
        <Modal
          isOpen={!!selectedVerification}
          onClose={() => setSelectedVerification(null)}
          title={`Payment Verification: ${selectedVerification.studentName}`}
          description={`Reference: ${selectedVerification.transactionReference} • Submitted: ${selectedVerification.submittedAt}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setSelectedVerification(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {selectedVerification.status !== 'Rejected' && (
                  <button
                    onClick={() => handleReject(selectedVerification)}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                  >
                    Reject Slip
                  </button>
                )}
                {selectedVerification.status !== 'Approved' && (
                  <button
                    onClick={() => handleApprove(selectedVerification)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Grant Enrollment Access</span>
                  </button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Payment Details */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">Student:</span>
                <span className="font-semibold text-slate-900">{selectedVerification.studentName}</span>
                <span className="text-[11px] text-slate-500 block">{selectedVerification.studentEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Program Selected:</span>
                <span className="font-semibold text-slate-900">{selectedVerification.productType}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Payable Amount:</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">
                  {formatPKR(selectedVerification.amountPKR)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Method:</span>
                <span className="font-semibold text-slate-800">
                  {selectedVerification.paymentMethod} {selectedVerification.bankName}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Bank Transaction ID / Slip Code:</span>
                <span className="font-mono font-bold text-slate-900 text-sm bg-white p-1 rounded border border-slate-200 inline-block mt-0.5">
                  {selectedVerification.transactionReference}
                </span>
              </div>
            </div>

            {/* Simulated Bank Receipt Slip Visual */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Attached Bank Payment Document Proof:
              </label>
              <div className="p-4 rounded-xl border border-slate-300 bg-white text-center space-y-2">
                <FileText className="w-8 h-8 text-blue-600 mx-auto" />
                <div className="text-xs font-mono font-semibold text-slate-800">
                  {selectedVerification.proofDocumentUrl}
                </div>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Receipt timestamped on Meezan Bank digital core banking engine matching IBFT reference.
                </p>
              </div>
            </div>

            {selectedVerification.status === 'Pending' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Optional Rejection Reason (if rejecting):
                </label>
                <input
                  type="text"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-rose-600 outline-none"
                />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
