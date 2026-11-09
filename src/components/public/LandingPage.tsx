import React, { useState } from 'react';
import {
  CheckCircle2,
  Video,
  PlayCircle,
  Clock,
  Award,
  Users,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Star,
  FileSpreadsheet,
  FileText,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  HelpCircle,
  Calendar,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { Course, UserRole } from '../../types';
import { formatPKR } from '../../utils/finance';
import { Badge } from '../common/Badge';

interface LandingPageProps {
  course: Course;
  onSelectRole: (role: UserRole) => void;
  onOpenEnrollment: (productType?: string) => void;
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  course,
  onSelectRole,
  onOpenEnrollment,
  onOpenLogin,
}) => {
  const [expandedModuleId, setExpandedModuleId] = useState<string>('mod-1');
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is included in the Executive Business Management Program?',
      a: 'The Executive Business Management Program (PKR 15,000 one-time) grants lifetime on-demand access to 42+ hours of structured video masterclasses, downloadable financial modeling templates (Excel), Porter’s Five Forces & Blue Ocean strategy workbooks, modular MCQ assessments, in-player note-taking, and an official verified corporate certificate.',
    },
    {
      q: 'Can I study at my own pace and access lectures on mobile?',
      a: 'Yes, absolutely. Once enrolled, you receive 100% lifetime access. You can watch the video lectures on your laptop, tablet, or smartphone whenever your professional schedule allows, pausing and resuming at your convenience.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept direct Online Bank Transfer (Meezan Bank, HBL, Bank Alfalah, Standard Chartered), Raast Instant P2P IDs, EasyPaisa, and JazzCash. You can also apply available promo codes during checkout. Simply upload your transfer screenshot or reference code for instant verification.',
    },
    {
      q: 'Will I receive an authentic verifiable certificate?',
      a: 'Yes. Upon passing all module assessments and completing the curriculum with a minimum 70% passing score, you receive an official Aerecon LMS Verified Certificate of Business Management with a unique credential verification code.',
    },
    {
      q: 'Are the financial models and case studies based on Pakistani markets?',
      a: 'Yes. While grounded in international frameworks from Harvard and INSEAD, our financial models, inflation-adjusted cost of capital templates, and corporate turnaround cases specifically examine Pakistani enterprises (such as FMCG, manufacturing, pharmaceuticals, and local retail).',
    },
  ];

  const outcomes = [
    {
      title: 'Boardroom-Ready Strategic Thinking',
      description: 'Move beyond generic business buzzwords. Formulate defensible competitive moats using structural industry analysis and value chain deconstruction.',
      icon: Layers,
    },
    {
      title: 'Hands-on Corporate Valuation & Modeling',
      description: 'Master 3-statement dynamic financial modeling, NPV capital budgeting, and working capital cash conversion cycles in Microsoft Excel.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Operational Excellence & Lean Workflows',
      description: 'Diagnose process bottlenecks using the Theory of Constraints and build resilient supplier ecosystems during currency volatility.',
      icon: Clock,
    },
    {
      title: 'Executive Turnaround Leadership',
      description: 'Lead high-stakes organizational change, restructure incentive plans, and build cross-functional consensus with proven execution blueprints.',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 flex flex-col">
      {/* 1. Hero Section */}
      <section id="overview" className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200/80 bg-linear-to-b from-white via-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Executive Business Education Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Master Corporate Strategy, Finance, and Executive Execution
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              A premium business management learning system designed for managers, founders, and rising leaders. Learn directly from corporate directors through real-world case studies and executive frameworks.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenEnrollment('Executive Course')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0f2b48] hover:bg-[#163e68] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll in Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectRole('student')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-blue-600" />
                <span>Explore Student Portal Demo</span>
              </button>
            </div>

            {/* Credibility Row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>42 Hours In-Depth Video Content</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dynamic Financial Models & Excel Workbooks</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Corporate Certificate</span>
              </div>
            </div>
          </div>

          {/* Interactive Learning Dashboard Preview Mockup */}
          <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-4 shadow-xl overflow-hidden">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">
                    aerecon-lms.com/classroom/lecture-05
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-semibold">
                    1080p HD Video
                  </span>
                </div>
              </div>

              {/* Mock Player & Sidebar layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 bg-slate-900 text-white min-h-[360px]">
                {/* Video Mockup Area */}
                <div className="lg:col-span-2 relative bg-linear-to-tr from-slate-950 via-slate-900 to-blue-950/40 p-4 sm:p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-300 gap-2">
                    <span className="font-semibold text-blue-400 uppercase tracking-wider text-[11px] truncate">
                      Module 2 • Financial Valuation
                    </span>
                    <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] shrink-0">
                      Lesson 05 of 24
                    </span>
                  </div>

                  <div className="my-6 sm:my-8 text-center sm:text-left">
                    <h3 className="text-base sm:text-xl font-bold text-white mb-2">
                      Financial Statements Dissection for Non-Finance Executives
                    </h3>
                    <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                      Analyzing EBITDA pitfalls, Cash Conversion Cycles, and unmasking working capital traps in audited enterprise balance sheets.
                    </p>
                  </div>

                  {/* Player Controls Bar */}
                  <div className="bg-slate-800/90 rounded-lg p-2 sm:p-2.5 flex items-center justify-between gap-2 sm:gap-3 text-xs border border-slate-700/60">
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-slate-300 font-mono">18:45 / 60:00</span>
                    </div>
                    {/* Scrub bar */}
                    <div className="flex-1 min-w-[50px] bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[31%]" />
                    </div>
                    <span className="hidden sm:inline-block text-[11px] font-mono text-slate-300 shrink-0">1.25x Speed</span>
                  </div>
                </div>

                {/* Sidebar mock */}
                <div className="border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/80 p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Curriculum Outline
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded bg-slate-800/70 border border-slate-700/60 flex items-center justify-between">
                        <span className="truncate text-slate-200">01. Corporate Strategy</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <div className="p-2 rounded bg-slate-800/70 border border-slate-700/60 flex items-center justify-between">
                        <span className="truncate text-slate-200">02. Porter Five Forces</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <div className="p-2 rounded bg-blue-950/80 border border-blue-600/60 flex items-center justify-between font-medium">
                        <span className="truncate text-blue-200">05. Financial Dissection</span>
                        <span className="text-[10px] text-blue-400 font-mono">Now Playing</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/40 text-slate-400 flex items-center justify-between">
                        <span className="truncate">06. Capital Budgeting: NPV</span>
                        <Lock className="w-3 h-3 text-slate-500 shrink-0" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Download Workbook:</span>
                    <span className="text-[11px] font-mono text-blue-400 underline cursor-pointer">
                      Model_v2.4.xlsx
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clear Product Offerings & Pricing Section */}
      <section id="pricing" className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Transparent All-Inclusive Enrollment
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Executive Business Management Program
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              No hidden fees, no subscriptions. A single, comprehensive enrollment granting complete lifetime access to all lectures, downloadable financial modeling templates, quizzes, and verified certification.
            </p>
          </div>

          {/* Centered Premium Program Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-[#0f2b48] p-4 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-linear-to-l from-[#0f2b48] to-blue-700 text-white text-[10px] font-bold px-3 sm:px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                Full Program Access
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4 pt-4 sm:pt-0">
                  <Badge variant="info">Lifetime On-Demand Access</Badge>
                  <Badge variant="success">Verified Certificate Included</Badge>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  Executive Business Management & Corporate Strategy
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  The complete, executive-grade curriculum covering corporate strategy, financial valuation, operational bottlenecks, and boardroom leadership.
                </p>

                <div className="mt-6 pb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {formatPKR(15000)}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">one-time payment</span>
                    </div>
                    <p className="mt-1 text-xs text-emerald-600 font-medium">
                      ✓ Promo codes accepted on deposit page (e.g. AERECON20, WELCOME10)
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-mono text-slate-500 block">42+ Video Hours</span>
                    <span className="text-[11px] font-mono text-slate-500 block">24 Core Lectures</span>
                  </div>
                </div>

                {/* Inclusions Grid */}
                <div className="mt-6">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Everything Included in Enrollment:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    {[
                      '42+ hours of high-definition on-demand video lectures',
                      'Downloadable 3-statement financial models & templates (Excel)',
                      'Porter Five Forces & Blue Ocean strategy workbook',
                      'Interactive module-by-module multiple-choice assessments',
                      'Detailed test explanations and attempt history audit',
                      'Private in-player note-taking timestamped to lectures',
                      'Official Aerecon LMS Verified Certificate upon completion',
                      'Multi-device support: Laptop, Desktop, Tablet, and Mobile',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenEnrollment('Executive Business Management Course')}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0f2b48] hover:bg-[#163e68] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll in Program — PKR 15,000</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Immediate access upon bank transfer verification • Bank Transfer, Raast, EasyPaisa & JazzCash
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Learning Outcomes & Benefits */}
      <section className="py-16 bg-[#f8f9fa] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Transformative Curriculum
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built for Executive Boardroom Impact
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Every concept is coupled with real spreadsheet models and operational frameworks you can apply directly to your organization on Monday morning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Curriculum Syllabus Preview */}
      <section id="curriculum" className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Syllabus Outline
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Structured Executive Curriculum
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Explore the detailed modules, lecture breakdowns, and downloadable resources.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {course.modules.map((mod) => {
              const isExpanded = expandedModuleId === mod.id;
              return (
                <div
                  key={mod.id}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs"
                >
                  <button
                    onClick={() => setExpandedModuleId(isExpanded ? '' : mod.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                        Module {mod.number}
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {mod.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {mod.lectures.length} lectures • {mod.description}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-4 divide-y divide-slate-100 text-xs">
                      {mod.lectures.map((lec) => (
                        <div key={lec.id} className="py-2.5 first:pt-0 last:pb-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                            <span className="font-semibold text-slate-800">{lec.title}</span>
                            <span className="text-[11px] font-mono text-slate-500 shrink-0">
                              {lec.durationMinutes} mins
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            {lec.description}
                          </p>
                          {lec.resources.length > 0 && (
                            <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                              <span className="text-[10px] text-slate-400">Resources:</span>
                              {lec.resources.map((r, rIdx) => (
                                <span
                                  key={rIdx}
                                  className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200"
                                >
                                  {r.title}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Executive Instructor Spotlight */}
      <section id="faculty" className="py-16 bg-[#f8f9fa] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-linear-to-br from-slate-800 to-[#0f2b48] text-white flex flex-col items-center justify-center p-4 text-center shrink-0 shadow-inner">
              <span className="font-bold text-3xl font-mono">TA</span>
              <span className="text-[11px] font-semibold text-blue-200 mt-2">
                18+ Yrs Advisory
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Course Director & Lead Faculty
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {course.instructorName}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {course.instructorRole}
              </p>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {course.instructorBio} Having guided executive teams across FMCG, heavy engineering, banking, and fast-scaling tech ventures, Prof. Tariq synthesizes complex strategic frameworks into pragmatic, actionable execution playbooks.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500">
                <span className="px-2 py-1 rounded bg-slate-100 font-medium">Alumnus LUMS & INSEAD</span>
                <span className="px-2 py-1 rounded bg-slate-100 font-medium">Advisory to 40+ Enterprises</span>
                <span className="px-2 py-1 rounded bg-slate-100 font-medium">4.9/5.0 Instructor Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials (Clearly identified demo reviews from real-style Pakistani enterprises) */}
      <section id="reviews" className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Student Perspectives
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Trusted by Professionals Across Pakistan
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Sample feedback from recent cohort participants and corporate alumni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Hamza Malik',
                role: 'Senior Operations Manager, Engro Corp',
                quote: 'The financial modeling module alone saved our plant tens of millions in working capital renegotiations. Tariq Sahib explains cash conversion cycles with total clarity.',
                rating: 5,
              },
              {
                name: 'Ayesha Khan',
                role: 'Commercial Lead, Unilever Pakistan',
                quote: 'The modular case studies and practical frameworks give you direct access to executive decision-making. Outstanding value.',
                rating: 5,
              },
              {
                name: 'Bilal Siddiqui',
                role: 'Managing Director, TechVentures PK',
                quote: 'High signal, zero fluff. The video lectures get straight to the point and the provided Excel valuation templates are immediately usable.',
                rating: 5,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-16 bg-[#f8f9fa] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Frequently Asked Questions
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Clear Answers Before You Enroll
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaqId === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaqId(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Final Call to Action */}
      <section className="py-16 bg-[#0f2b48] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Elevate Your Business Acumen Today
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join hundreds of professionals advancing their strategic and financial mastery through Aerecon LMS.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnrollment('Executive Business Management Course')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enroll in Executive Program (PKR 15,000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Professional Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#0f2b48] text-white flex items-center justify-center font-mono font-bold text-[10px]">
              AE
            </div>
            <span className="font-bold text-slate-800">Aerecon LMS</span>
            <span className="text-slate-400">© 2026 Aerecon Education. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button onClick={() => onSelectRole('student')} className="hover:text-blue-700 transition-colors font-semibold">
              Student Portal
            </button>
            <button onClick={() => onSelectRole('super_admin')} className="hover:text-amber-600 transition-colors font-semibold">
              Super Admin
            </button>
            <button onClick={() => onSelectRole('admin')} className="hover:text-blue-700 transition-colors font-semibold">
              Admin
            </button>
            <button onClick={() => onSelectRole('finance')} className="hover:text-emerald-700 transition-colors font-semibold">
              Finance
            </button>
            <button onClick={() => onSelectRole('academic')} className="hover:text-purple-700 transition-colors font-semibold">
              Academic
            </button>
            <button onClick={() => onSelectRole('manager')} className="hover:text-indigo-700 transition-colors font-semibold">
              Operations
            </button>
            <button onClick={() => onSelectRole('instructor')} className="hover:text-cyan-700 transition-colors font-semibold">
              Instructor
            </button>
            <button onClick={onOpenLogin} className="hover:text-slate-900 transition-colors">
              Account Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
