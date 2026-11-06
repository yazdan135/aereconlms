import React, { useState } from 'react';
import { Certificate, Student } from '../../types';
import { Award, Search, CheckCircle2, ShieldCheck, Plus, Check, Clock, XCircle } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface ManagerCertificatesProps {
  certificates: Certificate[];
  students: Student[];
  onIssueCertificate: (cert: Certificate) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const ManagerCertificates: React.FC<ManagerCertificatesProps> = ({
  certificates,
  students,
  onIssueCertificate,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'issued'>('pending');
  const [certs, setCerts] = useState<Certificate[]>(certificates);
  const [search, setSearch] = useState('');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedStudentEmail, setSelectedStudentEmail] = useState(students[0]?.email || '');

  // Mock pending certificate applications
  const [pendingApplications, setPendingApplications] = useState([
    {
      id: 'app-01',
      studentName: 'Hamza Malik',
      studentEmail: 'hamza.malik@enterprise.pk',
      courseTitle: 'Executive Business Management & Corporate Strategy',
      completionPercent: 100,
      grandTestScore: 85,
      appliedAt: 'Today, 08:30 AM',
      status: 'Pending Review',
    },
    {
      id: 'app-02',
      studentName: 'Ayesha Khan',
      studentEmail: 'ayesha.k@fmcggroup.com',
      courseTitle: 'Executive Business Management & Corporate Strategy',
      completionPercent: 100,
      grandTestScore: 92,
      appliedAt: 'Yesterday, 04:15 PM',
      status: 'Pending Review',
    },
  ]);

  const filtered = certs.filter(
    (c) =>
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.credentialCode.toLowerCase().includes(search.toLowerCase()) ||
      c.studentEmail.toLowerCase().includes(search.toLowerCase())
  );

  const handleApproveApplication = (app: typeof pendingApplications[0]) => {
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      credentialCode: `AER-2026-BM-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: app.studentName,
      studentEmail: app.studentEmail,
      courseTitle: app.courseTitle,
      issueDate: '2026-11-04',
      scorePercent: app.grandTestScore,
      instructorName: 'Prof. Tariq Amin',
      verified: true,
    };

    setCerts([newCert, ...certs]);
    onIssueCertificate(newCert);
    setPendingApplications(pendingApplications.filter((a) => a.id !== app.id));
    onShowToast(`Certificate approved & issued for ${app.studentName}! Credential: ${newCert.credentialCode}`, 'success');
  };

  const handleRejectApplication = (id: string, name: string) => {
    setPendingApplications(pendingApplications.filter((a) => a.id !== id));
    onShowToast(`Certificate application for ${name} rejected.`, 'error');
  };

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find((s) => s.email === selectedStudentEmail);
    if (!stu) return;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      credentialCode: `AER-2026-BM-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: stu.name,
      studentEmail: stu.email,
      courseTitle: 'Executive Business Management & Corporate Strategy',
      issueDate: '2026-11-04',
      scorePercent: 90,
      instructorName: 'Prof. Tariq Amin',
      verified: true,
    };

    setCerts([newCert, ...certs]);
    onIssueCertificate(newCert);
    setShowIssueModal(false);
    onShowToast(`Verified Certificate issued to ${stu.name}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            Credentials & Graduation
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Certificate Approval & Issuance
          </h1>
        </div>

        <button
          onClick={() => setShowIssueModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Issue Direct Certificate
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pending Applications ({pendingApplications.length})
        </button>
        <button
          onClick={() => setActiveTab('issued')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'issued'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Issued Credentials Registry ({certs.length})
        </button>
      </div>

      {activeTab === 'pending' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Grand Test Score</th>
                <th className="py-3 px-4">Video Progress</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{app.studentName}</div>
                    <div className="text-[10px] text-slate-400">{app.studentEmail}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{app.courseTitle}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                    {app.grandTestScore}% (Passed)
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      100% Watched
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{app.appliedAt}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleApproveApplication(app)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                      >
                        Approve & Issue
                      </button>
                      <button
                        onClick={() => handleRejectApplication(app.id, app.studentName)}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pendingApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No certificate applications currently pending review.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'issued' && (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search credential code (e.g. AER-2026-BM-8921)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <span className="text-xs text-slate-500">{filtered.length} issued credentials</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Credential Code</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {c.credentialCode}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{c.studentName}</div>
                      <div className="text-[10px] text-slate-400">{c.studentEmail}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{c.courseTitle}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                      {c.scorePercent}%
                    </td>
                    <td className="py-3 px-4 text-slate-500">{c.issueDate}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Direct Issue Modal */}
      <Modal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        title="Issue Verified Institutional Certificate"
        description="Select an enrolled student who has fulfilled curriculum graduation criteria."
        maxWidth="md"
      >
        <form onSubmit={handleIssue} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Qualifying Student
            </label>
            <select
              value={selectedStudentEmail}
              onChange={(e) => setSelectedStudentEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            >
              {students.map((s) => (
                <option key={s.id} value={s.email}>
                  {s.name} ({s.email}) — {s.progressPercent}% progress
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
            <div className="font-bold">Authorized Signatory: Prof. Tariq Amin</div>
            <div className="text-[11px] text-blue-700">
              A tamper-proof credential ID will be minted in the public verification directory.
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowIssueModal(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-xs"
            >
              Issue Certificate
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
