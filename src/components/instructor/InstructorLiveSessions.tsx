import React from 'react';
import { Video, Calendar, Clock, ExternalLink } from 'lucide-react';
import { ZoomSession } from '../../types';

export const InstructorLiveSessions: React.FC<{ sessions: ZoomSession[] }> = ({ sessions }) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Live Zoom Session Moderation</h1>
        <p className="text-xs text-slate-500 mt-1">
          Launch live video broadcasts, review meeting links, and manage attendance logs.
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {s.batchName}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{s.date} • {s.timePKT}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
              <div className="text-xs text-slate-500 font-mono">
                Meeting ID: {s.meetingId} • Passcode: {s.passcode}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={s.zoomLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Video className="w-4 h-4" /> Start Broadcast as Host
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

