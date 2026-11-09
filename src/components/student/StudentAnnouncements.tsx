import React from 'react';
import { BellRing, Calendar, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Announcement } from '../../types';

export const StudentAnnouncements: React.FC<{ announcements?: Announcement[] }> = ({
  announcements = [],
}) => {
  const defaultAnnouncements: Announcement[] = [
    {
      id: 'ann-1',
      title: 'Cohort 8 Live Breakout Case Study Rescheduled to 08:00 PM PKT',
      body: 'Please note that Thursday’s live valuation workshop will commence at 8:00 PM PKT instead of 7:30 PM due to mentor corporate board commitments. Meeting ID and passcode remain unchanged.',
      targetAudience: 'Live Cohort 8',
      priority: 'Important',
      postedAt: 'Today, 09:15 AM',
      author: 'Prof. Tariq Amin',
    },
    {
      id: 'ann-2',
      title: 'Module 2 Excel Valuation Template (v2.4) Uploaded',
      body: 'The updated Three-Statement financial model with inflation-adjusted WACC sensitivity tables is now live in the Resource section of Lecture 06.',
      targetAudience: 'Recorded Students',
      priority: 'Normal',
      postedAt: 'Yesterday, 04:30 PM',
      author: 'Academic Administration',
    },
    {
      id: 'ann-3',
      title: 'Grand Examination Protocol & Browser Integrity Verification',
      body: 'All students reaching Lecture 10 are reminded that the Grand Examination features timed assessment and browser window integrity monitoring. Ensure stable broadband connection before launching.',
      targetAudience: 'All',
      priority: 'Urgent',
      postedAt: '3 days ago',
      author: 'Operations Director',
    },
  ];

  const list = announcements.length > 0 ? announcements : defaultAnnouncements;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Institutional Announcements</h1>
        <p className="text-xs text-slate-500 mt-1">
          Official notifications from mentors, academic management, and operations.
        </p>
      </div>

      <div className="space-y-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.priority === 'Urgent'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : item.priority === 'Important'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {item.priority}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Audience: {item.targetAudience}</span>
              </div>
              <span className="text-[11px] text-slate-400">{item.postedAt}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.body}</p>

            <div className="pt-2 text-[11px] text-slate-400 font-medium">Author: {item.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

