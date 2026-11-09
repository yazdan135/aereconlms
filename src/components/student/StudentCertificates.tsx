import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  Share2,
  QrCode,
  FileCheck2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Certificate } from '../../types';

interface StudentCertificatesProps {
  certificate?: Certificate;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const StudentCertificates: React.FC<StudentCertificatesProps> = ({
  certificate,
  onShowToast,
}) => {
  // Application workflow state
  const [applicationStatus, setApplicationStatus] = useState<
    'NotEligible' | 'Eligible' | 'Submitted' | 'Approved'
  >(certificate ? 'Approved' : 'Eligible');

  const [studentFullName, setStudentFullName] = useState('Hamza Malik');
  const [dispatchAddress, setDispatchAddress] = useState('DHA Phase 5, Lahore, Pakistan');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationStatus('Submitted');
    onShowToast(
      'Your certificate application has been submitted successfully and is awaiting management approval.',
      'success'
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Verified Credentials & Certificates</h1>
        <p className="text-xs text-slate-500 mt-1">
          Official institutional credential issuance audited against completion of all video lectures and examinations.
        </p>
      </div>

      {/* ─── STATUS 1: ELIGIBLE TO APPLY ─── */}
      {applicationStatus === 'Eligible' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 text-xs">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold">Grand Examination Requirements Verified!</span> You have passed all module
              quizzes and the Grand Test. You may now submit your official credential application.
            </div>
          </div>

          <form onSubmit={handleApply} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name for Certificate (As per CNIC/Passport)
              </label>
              <input
                type="text"
                value={studentFullName}
                onChange={(e) => setStudentFullName(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Course Completed
              </label>
              <input
                type="text"
                value="Executive Business Management & Corporate Strategy"
                disabled
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Postal Address for Physical Hardcopy Certificate (Optional)
              </label>
              <input
                type="text"
                value={dispatchAddress}
                onChange={(e) => setDispatchAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4" /> Submit Certificate Application
            </button>
          </form>
        </div>
      )}

      {/* ─── STATUS 2: APPLICATION SUBMITTED / UNDER REVIEW ─── */}
      {applicationStatus === 'Submitted' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Clock className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Application Under Management Review</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your certificate application has been submitted successfully and is awaiting management approval.
            The academic director audits lecture skip analytics, IP telemetry, and Grand Test score verification before issuance.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-mono">
            Estimated Approval Window: 24-48 business hours
          </div>
        </div>
      )}

      {/* ─── STATUS 3: APPROVED & ISSUED CERTIFICATE PREVIEW ─── */}
      {applicationStatus === 'Approved' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified & Digitally Signed by Aerecon Edu</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onShowToast('Generating high-resolution vectorized PDF credential...', 'info')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF Certificate
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://aerecon.edu.pk/verify/AER-2026-BM-7719');
                  onShowToast('Verification URL copied to clipboard!', 'success');
                }}
                className="px-3 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Copy Verification Link
              </button>
            </div>
          </div>

          {/* ─── LUXURIOUS CERTIFICATE CANVAS PREVIEW (RESPONSIVE SCROLL CONTAINER) ─── */}
          <div className="overflow-x-auto pb-4 -mx-2 px-2">
            <div className="min-w-[620px] sm:min-w-0 relative aspect-[1.414/1] w-full bg-gradient-to-br from-white via-slate-50 to-amber-50/20 rounded-2xl border-8 border-double border-slate-300 p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col justify-between text-slate-900">
              {/* Corner Decorative Seals */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-600/40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-600/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-600/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-600/40" />

              {/* Header branding */}
              <div className="text-center space-y-1">
                <div className="text-xs font-bold tracking-[0.25em] text-blue-900 uppercase">
                  AERECON EDU • EXECUTIVE LEARNING INITIATIVE
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900">
                  Certificate of Academic Mastery
                </h2>
                <div className="text-[11px] text-slate-500 italic">This is to officially certify that</div>
              </div>

              {/* Student Name */}
              <div className="text-center py-4 my-auto">
                <div className="text-2xl sm:text-4xl font-serif font-bold text-blue-950 border-b-2 border-slate-300 pb-2 inline-block px-8">
                  {certificate?.studentName || 'Hamza Malik'}
                </div>
                <p className="text-xs text-slate-600 mt-3 max-w-lg mx-auto leading-relaxed">
                  has successfully fulfilled all curriculum prerequisites, passed sequential module examinations, and achieved
                  honors standard in the comprehensive Grand Examination for:
                </p>
                <div className="text-base sm:text-lg font-bold text-slate-900 mt-2 font-serif">
                  {certificate?.courseTitle || 'Executive Business Management & Corporate Strategy'}
                </div>
              </div>

              {/* Footer with Signatures & QR Code */}
              <div className="flex items-end justify-between pt-6 border-t border-slate-200 text-xs">
                {/* Instructor Signature */}
                <div className="text-center space-y-1">
                  <div className="font-serif italic text-base text-blue-900 font-semibold">Tariq Amin</div>
                  <div className="w-32 border-b border-slate-400 mx-auto" />
                  <div className="text-[10px] font-bold text-slate-800">Prof. Tariq Amin</div>
                  <div className="text-[9px] text-slate-400">Executive Academic Director</div>
                </div>

                {/* QR Verification Badge */}
                <div className="text-center space-y-1">
                  <div className="w-14 h-14 bg-white border border-slate-200 rounded-lg p-1 mx-auto flex items-center justify-center shadow-xs">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    ID: {certificate?.credentialCode || 'AER-2026-BM-7719'}
                  </div>
                  <div className="text-[8px] text-blue-600 underline">aerecon.edu.pk/verify</div>
                </div>

                {/* Registrar Signature */}
                <div className="text-center space-y-1">
                  <div className="font-serif italic text-base text-blue-900 font-semibold">Sarah Jahangir</div>
                  <div className="w-32 border-b border-slate-400 mx-auto" />
                  <div className="text-[10px] font-bold text-slate-800">Sarah Jahangir</div>
                  <div className="text-[9px] text-slate-400">Institutional Registrar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
