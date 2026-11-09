import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Upload,
  Sparkles,
  FileText,
} from 'lucide-react';
import { ZoomSession } from '../../types';

interface StudentLiveClassesProps {
  zoomSessions: ZoomSession[];
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const StudentLiveClasses: React.FC<StudentLiveClassesProps> = ({
  zoomSessions,
  onShowToast,
}) => {
  // Enrolled status for Online Live Zoom Classes product (PKR 6,000/month)
  const [isLiveEnrolled, setIsLiveEnrolled] = useState(true);
  const [enrollmentStep, setEnrollmentStep] = useState<'info' | 'form' | 'pending'>('info');

  // Form states
  const [studentName, setStudentName] = useState('Hamza Malik');
  const [studentEmail, setStudentEmail] = useState('hamza.malik@enterprise.pk');
  const [phone, setPhone] = useState('+92 300 8472910');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Raast' | 'EasyPaisa' | 'JazzCash'>(
    'Bank Transfer'
  );
  const [transactionRef, setTransactionRef] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) {
      onShowToast('Please provide your bank deposit or transaction reference number.', 'error');
      return;
    }
    setEnrollmentStep('pending');
    onShowToast('Online class enrollment submitted! Awaiting payment audit and batch allocation.', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ─── TAB HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            Independent Educational Product
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Join Online Lectures & Live Zoom Sessions
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
          <Video className="w-4 h-4 text-indigo-600" />
          Subscription: PKR 6,000 / Month
        </div>
      </div>

      {/* ─── SCENARIO A: NOT ENROLLED (ENROLLMENT WORKFLOW) ─── */}
      {!isLiveEnrolled && (
        <div className="space-y-6">
          {enrollmentStep === 'info' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs space-y-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Interactive Executive Cohort
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Live Zoom Masterclass & Case Study Discussions
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Join Prof. Tariq Amin twice weekly for live Socratic case study debates, real-time Excel financial model
                  buildouts, and interactive breakout rooms. Separate from the self-paced recorded syllabus.
                </p>
              </div>

              {/* Product Pricing Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                  <div className="text-xs text-indigo-800 font-semibold mb-1">Monthly Subscription</div>
                  <div className="text-2xl font-bold text-indigo-950">PKR 6,000 <span className="text-xs font-normal">/ mo</span></div>
                  <span className="text-[11px] text-indigo-600 mt-1 block">Recurring live cohort access</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="text-xs text-slate-600 font-semibold mb-1">Weekly Cadence</div>
                  <div className="text-2xl font-bold text-slate-900">2 Sessions</div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Mondays & Thursdays (7:30 PM)</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="text-xs text-slate-600 font-semibold mb-1">Cohort Size</div>
                  <div className="text-2xl font-bold text-slate-900">35 Seats</div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Strictly capped for live engagement</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500">Instant batch assignment following finance verification</span>
                <button
                  onClick={() => setEnrollmentStep('form')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer text-center"
                >
                  Enroll in Live Cohort Now
                </button>
              </div>
            </div>
          )}

          {enrollmentStep === 'form' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs max-w-xl mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Live Cohort Enrollment Form</h3>
                <p className="text-xs text-slate-500">Fee: PKR 6,000 / month • Cohort 8 (Executive Evening)</p>
              </div>

              <form onSubmit={handleEnrollSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                {/* Bank Deposit Instruction Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="font-semibold text-slate-900 text-xs">Meezan Bank Ltd (Aerecon Edu Account)</div>
                  <div className="text-[11px] text-slate-600 font-mono">
                    Title: Aerecon Educational Services • A/C # 0102-01034492 • IBAN: PK55MEZN0001020103449201
                  </div>
                  <div className="text-[11px] text-slate-500">Deposit exact amount: PKR 6,000</div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Bank Transfer">Online Bank Transfer (IBFT)</option>
                    <option value="Raast">Raast Instant P2P</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="JazzCash">JazzCash</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bank Transaction Reference / TID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IBFT-MZB-99823104 or Raast ID"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setEnrollmentStep('info')}
                    className="w-full sm:w-auto px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 text-center cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-xs cursor-pointer text-center"
                  >
                    Submit Live Enrollment
                  </button>
                </div>
              </form>
            </div>
          )}

          {enrollmentStep === 'pending' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Payment Verification Pending</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your payment slip has been forwarded to the finance auditor. Once verified, your assigned batch schedule and
                secure Zoom credentials will activate here.
              </p>
              <button
                onClick={() => {
                  setIsLiveEnrolled(true);
                  onShowToast('Demo mode: Activated Live Cohort access!', 'success');
                }}
                className="text-xs text-indigo-600 font-semibold underline"
              >
                (Demo: Click to simulate instant finance approval)
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── SCENARIO B: ENROLLED STUDENT VIEW (BATCH SESSIONS & ZOOM ACCESS) ─── */}
      {isLiveEnrolled && (
        <div className="space-y-6">
          {/* Active Cohort Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled & Verified
              </div>
              <h2 className="text-xl font-bold text-slate-900">Cohort 8 (Executive Evening Masterclass)</h2>
              <p className="text-xs text-slate-500">
                Instructor: Prof. Tariq Amin • Schedule: Mondays & Thursdays (07:30 PM - 09:30 PM PKT)
              </p>
            </div>

            <div className="text-left md:text-right">
              <div className="text-xs text-slate-400">Monthly Status</div>
              <div className="text-xs font-bold text-emerald-700">Paid • Next Due: Dec 01, 2026</div>
            </div>
          </div>

          {/* Upcoming Live Sessions List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-4 h-4 text-indigo-600" />
              Upcoming Live Zoom Sessions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zoomSessions
                .filter((s) => s.status === 'Upcoming')
                .map((session) => (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                          Live Case Discussion
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {session.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{session.title}</h4>

                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {session.timePKT} ({session.durationMinutes}m)
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Meeting ID: {session.meetingId} • Pass: {session.passcode}
                        </div>
                      </div>

                      {session.agenda && session.agenda.length > 0 && (
                        <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                          <div className="font-semibold text-slate-700">Agenda:</div>
                          <ul className="list-disc list-inside space-y-0.5">
                            {session.agenda.slice(0, 2).map((a, i) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <a
                      href={session.zoomLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Video className="w-4 h-4" /> Join Live Zoom Classroom
                    </a>
                  </div>
                ))}
            </div>
          </div>

          {/* Past Sessions & Cloud Recordings */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Archived Cohort Recordings</h3>
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs">
              {zoomSessions
                .filter((s) => s.status === 'Completed')
                .map((session) => (
                  <div key={session.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{session.title}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Recorded on {session.date} • Attendance: {session.attendanceStatus}
                      </div>
                    </div>
                    {session.recordingUrl && (
                      <button
                        onClick={() => onShowToast('Opening high-definition Zoom cloud recording...', 'info')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs"
                      >
                        Watch Recording
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
