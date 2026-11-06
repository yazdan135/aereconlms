import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  Bell,
  Smartphone,
  Save,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const StudentProfile: React.FC<{
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'sessions'>('profile');

  // Form states
  const [fullName, setFullName] = useState('Hamza Malik');
  const [email, setEmail] = useState('hamza.malik@enterprise.pk');
  const [phone, setPhone] = useState('+92 300 8472910');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Personal profile updated successfully.', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      onShowToast('Please fill all password fields.', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    onShowToast('Password updated successfully. Session tokens refreshed.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account & Security Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your verified learner profile, authorized device sessions, and account credentials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Learner Profile
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'security'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Password & Integrity
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === 'sessions'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Logged In Devices (Audit)
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-xl space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
              HM
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{fullName}</h3>
              <p className="text-xs text-slate-500">Student ID: STU-PK-101 • Verified Learner</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address (Immutable)</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </form>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-xl space-y-5">
          <h3 className="text-sm font-bold text-slate-900">Change Authentication Password</h3>

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">New Strong Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" /> Update Password
            </button>
          </form>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Authorized Device Telemetry & IP Logs</h3>
          <p className="text-xs text-slate-500">
            Aerecon Edu logs IP addresses, hardware identifiers, and browser agents to safeguard institutional content.
          </p>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">Dell Latitude 7420 (Windows 11) • Active Now</div>
                <div className="text-[11px] text-slate-500">IP: 111.92.128.45 (PTCL Broadband, Lahore) • Chrome 129</div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                This Device
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">iPhone 15 Pro • Safari Mobile</div>
                <div className="text-[11px] text-slate-500">IP: 39.40.112.19 (Jazz 4G LTE, Lahore) • Last Active 2 days ago</div>
              </div>
              <button
                onClick={() => onShowToast('Device session terminated', 'info')}
                className="text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Revoke Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
