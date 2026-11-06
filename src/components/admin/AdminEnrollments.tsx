import React, { useState } from 'react';
import { Student } from '../../types';
import { UserCheck, Plus, Search, Building2, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface AdminEnrollmentsProps {
  students: Student[];
  onManualEnroll: (student: Student) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AdminEnrollments: React.FC<AdminEnrollmentsProps> = ({
  students,
  onManualEnroll,
  onShowToast,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+92 300 ');
  const [batch, setBatch] = useState('Cohort 8 (Evening)');
  const [product, setProduct] = useState<'Recorded' | 'LiveZoom' | 'Both'>('Both');

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newStu: Student = {
      id: `stu-${Date.now()}`,
      name,
      email,
      phone,
      batch,
      enrolledProducts: product === 'Both' ? ['Recorded', 'LiveZoom'] : [product],
      progressPercent: 0,
      completedLecturesCount: 0,
      totalLecturesCount: 10,
      status: 'Active',
      enrollmentDate: '2026-11-02',
      lastActive: 'Just enrolled',
    };

    onManualEnroll(newStu);
    setShowModal(false);
    setName('');
    setEmail('');
    onShowToast(`Manual enrollment completed for ${name}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Enrollments & Access Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manual student enrollment override, corporate corporate seat grants, and access provisioning.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Direct Enrollment</span>
        </button>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Email & Phone</th>
                <th className="px-4 py-3 font-semibold">Enrolled Products</th>
                <th className="px-4 py-3 font-semibold">Batch Assigned</th>
                <th className="px-4 py-3 font-semibold">Enrollment Date</th>
                <th className="px-4 py-3 font-semibold text-right">Access Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">{stu.name}</td>
                  <td className="px-4 py-3">
                    <div className="text-slate-800">{stu.email}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{stu.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {stu.enrolledProducts.map((p, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-medium border border-blue-200"
                        >
                          {p === 'Recorded' ? 'Recorded Course' : 'Live Zoom'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{stu.batch}</td>
                  <td className="px-4 py-3 text-slate-500">{stu.enrollmentDate}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Active Access
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Enroll Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Direct Manual Enrollment"
        description="Provision immediate portal access without waiting for external payment verification."
        maxWidth="md"
      >
        <form onSubmit={handleEnroll} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Asad Umar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="asad.umar@corporate.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              WhatsApp / Mobile Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Program Access
            </label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
            >
              <option value="Both">Both (Recorded Course + Live Zoom Cohort)</option>
              <option value="Recorded">Recorded Course Only (PKR 15,000)</option>
              <option value="LiveZoom">Live Zoom Classes Only (PKR 6,000/mo)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assign Live Batch Cohort
            </label>
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
            >
              <option value="Cohort 8 (Evening)">Cohort 8 (Executive Evening)</option>
              <option value="Cohort 9 (Weekend)">Cohort 9 (Weekend Intensive)</option>
              <option value="Recorded Self-Paced">Recorded Self-Paced</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              Confirm Enrollment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
