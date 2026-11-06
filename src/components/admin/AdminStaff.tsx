import React, { useState } from 'react';
import { Users, Plus, Shield, ShieldCheck, Mail, Phone, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Instructor';
  permissions: string;
  status: 'Active' | 'Invited';
}

interface AdminStaffProps {
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AdminStaff: React.FC<AdminStaffProps> = ({ onShowToast }) => {
  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: 'st-01',
      name: 'Dr. Tariq Amin',
      email: 'tariq.amin@aerecon.pk',
      role: 'Instructor',
      permissions: 'Curriculum, Live Zoom Host, Assessments',
      status: 'Active',
    },
    {
      id: 'st-02',
      name: 'Zeeshan Akhtar',
      email: 'zeeshan.ops@aerecon.pk',
      role: 'Manager',
      permissions: 'Student Roster, Batches, Attendance, Certificates (No Finance)',
      status: 'Active',
    },
    {
      id: 'st-03',
      name: 'Sanaullah Khan',
      email: 'sana.admin@aerecon.pk',
      role: 'Admin',
      permissions: 'Full Oversight, Financials, P&L, Payment Verifications',
      status: 'Active',
    },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Manager' | 'Instructor'>('Manager');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: StaffMember = {
      id: `st-${Date.now()}`,
      name: inviteName || 'Staff Member',
      email: inviteEmail,
      role: inviteRole,
      permissions:
        inviteRole === 'Admin'
          ? 'Full Oversight, Financials & P&L'
          : inviteRole === 'Manager'
          ? 'Operations, Student Roster & Batches'
          : 'Live Zoom Host & Curriculum',
      status: 'Invited',
    };

    setStaffList([...staffList, newMember]);
    setShowInviteModal(false);
    setInviteName('');
    setInviteEmail('');
    onShowToast(`Invitation email sent to ${inviteEmail} for role ${inviteRole}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Staff & Role Permissions</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage administrative privileges, operational manager access, and faculty credentials.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-3.5 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Staff Member</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-semibold">Staff Member</th>
                <th className="px-4 py-3 font-semibold">System Role</th>
                <th className="px-4 py-3 font-semibold">Authorized Permissions</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{member.name}</div>
                    <div className="text-[11px] text-slate-400">{member.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        member.role === 'Admin'
                          ? 'purple'
                          : member.role === 'Manager'
                          ? 'info'
                          : 'default'
                      }
                    >
                      {member.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs">{member.permissions}</td>
                  <td className="px-4 py-3">
                    <Badge variant={member.status === 'Active' ? 'success' : 'warning'} dot>
                      {member.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setStaffList(staffList.filter((s) => s.id !== member.id));
                        onShowToast('Staff member access revoked', 'info');
                      }}
                      className="text-xs text-slate-400 hover:text-rose-600 p-1"
                      title="Revoke access"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite New Staff Member"
        description="Grant administrative, managerial, or instructor access."
        maxWidth="md"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Asad Farooq"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Corporate Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="asad@aerecon.pk"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Role & Clearance
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
            >
              <option value="Manager">Operations Manager (No Financial Access)</option>
              <option value="Instructor">Faculty Instructor (Zoom Host & Assessments)</option>
              <option value="Admin">Full Executive Admin (P&L, Financials, Verification)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowInviteModal(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              Send Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
