import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  EyeOff,
  CheckCircle2,
  Filter,
  Monitor,
} from 'lucide-react';
import { MOCK_SECURITY_EVENTS } from '../../utils/mockRbacData';

export const SuperAdminSecurityEvents: React.FC = () => {
  const [events, setEvents] = useState(MOCK_SECURITY_EVENTS);

  const handleResolve = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, resolved: true } : e))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
            Intellectual Property Defense
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Security Events & Capture Telemetry
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Incident Type</th>
              <th className="py-3 px-4">Lecture Affected</th>
              <th className="py-3 px-4">Client Telemetry</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-slate-50/60">
                <td className="py-3 px-4 font-bold text-slate-900">{ev.studentName}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      ev.eventType === 'SCREEN_CAPTURE'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    <EyeOff className="w-3 h-3" /> {ev.eventType}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600">{ev.lectureTitle || 'Platform Hub'}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">
                  {ev.ipAddress} • {ev.device}
                </td>
                <td className="py-3 px-4 text-slate-400">{ev.timestamp}</td>
                <td className="py-3 px-4 text-right">
                  {ev.resolved ? (
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleResolve(ev.id)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 rounded-lg text-xs"
                    >
                      Mark Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

