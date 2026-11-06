import React, { useState } from 'react';
import { Announcement } from '../../types';
import { BellRing, Plus, Calendar, Megaphone, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface ManagerAnnouncementsProps {
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Announcement) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ManagerAnnouncements: React.FC<ManagerAnnouncementsProps> = ({
  announcements,
  onAddAnnouncement,
  onShowToast,
}) => {
  const [items, setItems] = useState<Announcement[]>(announcements);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState<'All' | 'Recorded Students' | 'Live Cohort 8' | 'Managers Only'>('All');
  const [priority, setPriority] = useState<'Normal' | 'Important' | 'Urgent'>('Normal');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      body,
      targetAudience: audience,
      priority,
      postedAt: 'Just now',
      author: 'Operations Lead',
    };

    setItems([newAnn, ...items]);
    onAddAnnouncement(newAnn);
    setShowModal(false);
    setTitle('');
    setBody('');
    onShowToast(`Broadcast announcement posted to ${audience}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Broadcast Announcements</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Send cohort-wide notices, syllabus updates, and live Zoom guest speaker notifications.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Broadcast</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {items.map((ann) => (
          <div
            key={ann.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    ann.priority === 'Urgent'
                      ? 'danger'
                      : ann.priority === 'Important'
                      ? 'warning'
                      : 'neutral'
                  }
                >
                  {ann.priority}
                </Badge>
                <span className="text-xs font-medium text-slate-500">
                  Target: <strong className="text-slate-800">{ann.targetAudience}</strong>
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{ann.postedAt}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{ann.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{ann.body}</p>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
              Published by {ann.author}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Broadcast New Announcement"
        description="Notify enrolled students or live cohorts."
        maxWidth="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
              >
                <option value="All">All Students & Batches</option>
                <option value="Live Cohort 8">Live Cohort 8 Only</option>
                <option value="Recorded Students">Recorded Course Students Only</option>
                <option value="Managers Only">Operations Team Only</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent Alert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Announcement Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule Change: Nov 5 Session moves to 8:00 PM PKT"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Message Content *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Provide clear details regarding the announcement..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
              Publish Broadcast
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
