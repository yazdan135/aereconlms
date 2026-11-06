import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Save,
  Bell,
  Lock,
  Globe,
  Database,
  CheckCircle2,
} from 'lucide-react';

export const SuperAdminSettings: React.FC<{
  onShowToast?: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}> = ({ onShowToast }) => {
  const [recordedPrice, setRecordedPrice] = useState(15000);
  const [livePrice, setLivePrice] = useState(6000);
  const [passingScore, setPassingScore] = useState(70);
  const [completionThreshold, setCompletionThreshold] = useState(90);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onShowToast) onShowToast('System configuration & policy rules updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System & Platform Governance</h1>
        <p className="text-xs text-slate-500 mt-1">
          Global curriculum thresholds, enrollment pricing parameters, and intellectual property watermark settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            Product Enrollment Pricing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Recorded Course Fee (PKR)
              </label>
              <input
                type="number"
                value={recordedPrice}
                onChange={(e) => setRecordedPrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Live Zoom Class Monthly Fee (PKR)
              </label>
              <input
                type="number"
                value={livePrice}
                onChange={(e) => setLivePrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Sequential Learning & Examination Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Video Completion Telemetry Threshold (%)
              </label>
              <input
                type="number"
                min={50}
                max={100}
                value={completionThreshold}
                onChange={(e) => setCompletionThreshold(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Student must watch this proportion before lecture test unlocks.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Examination Passing Standard (%)
              </label>
              <input
                type="number"
                min={50}
                max={100}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Required score to unlock next sequential video.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
};

