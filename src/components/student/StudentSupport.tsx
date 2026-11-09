import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileQuestion,
} from 'lucide-react';
import { MOCK_SUPPORT_TICKETS } from '../../utils/mockRbacData';

export const StudentSupport: React.FC<{
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}> = ({ onShowToast }) => {
  const [tickets, setTickets] = useState(MOCK_SUPPORT_TICKETS);
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const newTicket = {
      id: `tkt-${Date.now()}`,
      studentId: 'stu-101',
      studentName: 'Hamza Malik',
      subject: subject.trim(),
      message: message.trim(),
      status: 'Open' as const,
      priority,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    };

    setTickets([newTicket, ...tickets]);
    setSubject('');
    setMessage('');
    onShowToast('Support ticket dispatched to academic operations.', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic & Technical Support</h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct communication channel with executive mentors, financial ledger auditors, and LMS engineers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket Submission Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            Open a New Support Ticket
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject / Query Title</label>
              <input
                type="text"
                placeholder="e.g. Formula error in Lecture 06 model"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Urgency Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Low">Low — General curriculum inquiry</option>
                <option value="Medium">Medium — Technical / Video playback</option>
                <option value="High">High — Grand Examination or Certificate block</option>
                <option value="Urgent">Urgent — Payment or Live Zoom link issue</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Detailed Explanation</label>
              <textarea
                rows={5}
                placeholder="Provide specific details so our mentors or operational team can swiftly assist you..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Submit Inquiry
            </button>
          </form>
        </div>

        {/* Tickets History List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Your Communication History</h3>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">{t.id}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.priority === 'Urgent'
                          ? 'bg-red-50 text-red-700'
                          : t.priority === 'High'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {t.priority}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : t.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-xs">{t.subject}</h4>
                <p className="text-slate-600 leading-relaxed">{t.message}</p>

                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400">
                  <span>Logged: {t.createdAt}</span>
                  {t.assignedTo && <span>Assigned: {t.assignedTo}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

