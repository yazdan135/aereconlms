import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Key, Building2, Video, CheckCircle2 } from 'lucide-react';
import { formatPKR } from '../../utils/finance';
import { Badge } from '../common/Badge';

interface AdminSettingsProps {
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onShowToast }) => {
  const [bankTitle, setBankTitle] = useState('AERECON EDUCATION SMC PVT LTD');
  const [bankAccount, setBankAccount] = useState('0102-01034492');
  const [raastId, setRaastId] = useState('03008472910');
  const [zoomAccountId, setZoomAccountId] = useState('zm_acc_88492019482');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Platform settings and payment gateway configurations updated', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Platform Settings & Integrations</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure financial collection credentials, pricing parameters, and Zoom Video integration.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Strict Pricing Invariant Display */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Tuition & Course Pricing (Locked Policy)
              </h3>
              <p className="text-xs text-slate-500">
                Aerecon platform governance policy strictly prohibits bundled packages.
              </p>
            </div>
            <Badge variant="purple">Fixed Policy</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <span className="font-bold text-slate-800">Recorded Business Management Course</span>
              <div className="text-lg font-mono font-bold text-slate-900">
                {formatPKR(15000)}
              </div>
              <span className="text-[11px] text-slate-500">One-time payment • Lifetime access</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <span className="font-bold text-slate-800">Live Zoom Classes Cohort</span>
              <div className="text-lg font-mono font-bold text-slate-900">
                {formatPKR(6000)} / month
              </div>
              <span className="text-[11px] text-slate-500">Billed monthly • Interactive masterclass</span>
            </div>
          </div>
        </div>

        {/* Bank & Raast Gateway Configuration */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Fee Collection Bank Accounts (Shown on Public Checkout)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Account Title
              </label>
              <input
                type="text"
                value={bankTitle}
                onChange={(e) => setBankTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meezan Bank Account #
              </label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Raast Instant P2P ID
              </label>
              <input
                type="text"
                value={raastId}
                onChange={(e) => setRaastId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                EasyPaisa / JazzCash Merchant Merchant Number
              </label>
              <input
                type="text"
                defaultValue="0300-8472910"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Zoom Enterprise Integration Status */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-indigo-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Zoom Video Enterprise API
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified S2S OAuth Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Zoom Account ID
              </label>
              <input
                type="text"
                value={zoomAccountId}
                onChange={(e) => setZoomAccountId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                OAuth Client ID
              </label>
              <input
                type="password"
                defaultValue="••••••••••••••••"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Platform Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
