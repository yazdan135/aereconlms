import React, { useState } from 'react';
import { ZoomSession, Batch } from '../../types';
import { Video, Plus, Calendar, Clock, ExternalLink, Link2, Copy, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface ManagerZoomSessionsProps {
  sessions: ZoomSession[];
  batches: Batch[];
  onAddSession: (session: ZoomSession) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ManagerZoomSessions: React.FC<ManagerZoomSessionsProps> = ({
  sessions,
  batches,
  onAddSession,
  onShowToast,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [batchName, setBatchName] = useState(batches[0]?.name || 'Cohort 8 (Executive Evening)');
  const [date, setDate] = useState('2026-11-12');
  const [timePKT, setTimePKT] = useState('07:30 PM - 09:30 PM PKT');
  const [meetingId, setMeetingId] = useState('894 2190 4425');
  const [passcode, setPasscode] = useState('AER2026');
  const [agendaText, setAgendaText] = useState('Live Case Study Discussion\nGroup Q&A Workshop');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newSession: ZoomSession = {
      id: `zoom-${Date.now()}`,
      title,
      batchName,
      instructorName: 'Prof. Tariq Amin',
      date,
      timePKT,
      durationMinutes: 120,
      meetingId,
      passcode,
      zoomLink: `https://zoom.us/j/${meetingId.replace(/\s+/g, '')}?pwd=${passcode}`,
      status: 'Upcoming',
      agenda: agendaText.split('\n').filter((l) => l.trim()),
    };

    onAddSession(newSession);
    setShowModal(false);
    setTitle('');
    onShowToast('New Live Zoom session scheduled and notifications sent to batch', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Live Zoom Classes Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure weekly interactive cohorts, Zoom meeting links, passcodes, and session agendas.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Zoom Session</span>
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="purple">{session.batchName}</Badge>
                <Badge variant={session.status === 'Completed' ? 'neutral' : 'info'}>
                  {session.status}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-900">{session.title}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{session.timePKT}</span>
                </div>
                <div>
                  <span className="text-slate-400">Meeting ID:</span>{' '}
                  <span className="font-mono font-bold text-slate-800">{session.meetingId}</span>
                </div>
              </div>

              {session.agenda.length > 0 && (
                <div className="pt-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Agenda: </span>
                  {session.agenda.join(' • ')}
                </div>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <a
                href={session.zoomLink}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Launch Host URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Schedule Live Cohort Session"
        description="Set up an interactive Zoom masterclass for an active batch."
        maxWidth="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Cohort Batch
            </label>
            <select
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
            >
              {batches.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Session Topic Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Corporate Governance & Executive Incentive Design"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Time (PKT)
              </label>
              <input
                type="text"
                value={timePKT}
                onChange={(e) => setTimePKT(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Zoom Meeting ID
              </label>
              <input
                type="text"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Passcode
              </label>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Session Agenda (one point per line)
            </label>
            <textarea
              rows={3}
              value={agendaText}
              onChange={(e) => setAgendaText(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
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
              Schedule Session
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
