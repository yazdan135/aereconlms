import React, { useState } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  Menu,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Globe,
  CheckCircle2,
  X,
  ExternalLink,
  Shield,
  CircleDollarSign,
  BookOpen,
  UserCheck,
  LayoutDashboard,
  Layers,
  ArrowRight,
  Sparkles,
  BookMarked,
  Award,
  HelpCircle,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { UserRole, AppNotification } from '../../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  notifications: AppNotification[];
  onMarkNotificationsRead: () => void;
  onOpenEnrollmentModal?: () => void;
  onOpenLoginModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  onOpenSearch,
  onToggleSidebar,
  notifications,
  onMarkNotificationsRead,
  onOpenEnrollmentModal,
  onOpenLoginModal,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<
    UserRole,
    { label: string; shortLabel: string; icon: React.ReactNode; badge: string; desc: string }
  > = {
    public: {
      label: 'Public Website',
      shortLabel: 'Public',
      icon: <Globe className="w-4 h-4 text-blue-600" />,
      badge: 'Course Catalog & Admissions',
      desc: 'Browse syllabus, executive faculty, reviews & pricing',
    },
    student: {
      label: 'Student Portal',
      shortLabel: 'Student',
      icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
      badge: 'Enrolled Learner',
      desc: '1080p classroom, video analytics, quizzes & certs',
    },
    manager: {
      label: 'Operations Manager',
      shortLabel: 'Ops Manager',
      icon: <Briefcase className="w-4 h-4 text-indigo-600" />,
      badge: 'Student & Cohort Ops',
      desc: 'Live telemetry, device security & skip monitoring',
    },
    admin: {
      label: 'Admin Portal',
      shortLabel: 'Admin',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      badge: 'Curriculum & General Admin',
      desc: 'Course management, announcements & batch controls',
    },
    super_admin: {
      label: 'Super Admin',
      shortLabel: 'Super Admin',
      icon: <Shield className="w-4 h-4 text-amber-500" />,
      badge: 'Root Authority & RBAC',
      desc: 'Unrestricted control, roles matrix & audit logs',
    },
    finance: {
      label: 'Finance Manager',
      shortLabel: 'Finance',
      icon: <CircleDollarSign className="w-4 h-4 text-emerald-600" />,
      badge: 'Ledgers, P&L & Audits',
      desc: 'Bank deposit verifications, refunds & P&L statements',
    },
    academic: {
      label: 'Academic Manager',
      shortLabel: 'Academic',
      icon: <BookOpen className="w-4 h-4 text-purple-600" />,
      badge: 'Pedagogy & Question Bank',
      desc: 'Question bank, rubrics & exam grading standards',
    },
    instructor: {
      label: 'Instructor Portal',
      shortLabel: 'Instructor',
      icon: <UserCheck className="w-4 h-4 text-cyan-600" />,
      badge: 'Faculty Live Classes',
      desc: 'Zoom cohorts, attendance rosters & student feedback',
    },
  };

  const allAvailableRoles: UserRole[] = [
    'public',
    'student',
    'super_admin',
    'manager',
    'admin',
    'finance',
    'academic',
    'instructor',
  ];

  const handleSelectRole = (role: UserRole) => {
    onRoleChange(role);
    setShowRoleMenu(false);
    setIsMobileMenuOpen(false);
  };

  const publicNavLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Curriculum', href: '#curriculum' },
    { label: 'Pricing & Fees', href: '#pricing' },
    { label: 'Lead Faculty', href: '#faculty' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faq' },
  ];

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (currentRole !== 'public') {
      onRoleChange('public');
      setTimeout(() => {
        const el = document.querySelector(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand Logo & Portal Sidebar Menu (when logged into portal) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {currentRole !== 'public' && (
              <button
                onClick={onToggleSidebar}
                aria-label="Toggle navigation drawer"
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Open Portal Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div
              onClick={() => handleSelectRole('public')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-xs group-hover:bg-blue-900 transition-colors shrink-0">
                <span className="font-mono text-xs">AE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-900 leading-none">
                  AERECON
                </span>
                <span className="text-[10px] font-semibold text-blue-700 tracking-wider uppercase mt-0.5">
                  Executive LMS
                </span>
              </div>
            </div>
          </div>

          {/* Center (Desktop): Public Navigation Links */}
          {currentRole === 'public' && (
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
              {publicNavLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleScrollTo(link.href)}
                  className="hover:text-blue-700 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right: Actions, Search, Role Switcher, Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Desktop Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl transition-all w-36 lg:w-52 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="flex-1 text-left truncate">Search curriculum...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search curriculum"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Role Switcher Option (Desktop & Tablet Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                aria-label="Switch workspace portal role"
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 transition-all cursor-pointer shadow-2xs hover:border-slate-300"
                title="Switch Workspace View"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {roleLabels[currentRole]?.icon}
                  <span className="hidden sm:inline font-bold text-slate-900 truncate">
                    {roleLabels[currentRole]?.label}
                  </span>
                  <span className="sm:hidden font-bold truncate">
                    {roleLabels[currentRole]?.shortLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${
                    showRoleMenu ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Desktop Role Dropdown Menu */}
              {showRoleMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowRoleMenu(false)} />
                  <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-xs sm:max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>Switch Workspace Role & View</span>
                      <span className="text-[10px] text-blue-600 font-semibold font-mono">
                        8 Portals
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto py-1 divide-y divide-slate-50">
                      {allAvailableRoles.map((role) => (
                        <button
                          key={role}
                          onClick={() => handleSelectRole(role)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                            currentRole === role
                              ? 'bg-blue-50/80 font-bold text-blue-900'
                              : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <div className="shrink-0">{roleLabels[role].icon}</div>
                            <div className="min-w-0">
                              <div className="text-slate-900 font-semibold truncate">
                                {roleLabels[role].label}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {roleLabels[role].desc}
                              </div>
                            </div>
                          </div>
                          {currentRole === role && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  if (unreadCount > 0) onMarkNotificationsRead();
                }}
                aria-label="View notifications"
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotifMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifMenu(false)} />
                  <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-sm sm:max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900">Notifications</span>
                      <span className="text-[11px] text-slate-500">
                        {notifications.length} total
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-slate-50 text-xs">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-slate-800">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.timeAgo}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Desktop Auth / User Identity */}
            <div className="hidden md:flex items-center">
              {currentRole === 'public' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenLoginModal}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onOpenEnrollmentModal}
                    className="text-xs font-semibold text-white bg-[#0f2b48] hover:bg-blue-900 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Enroll Now
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-slate-100 shrink-0">
                    {currentRole === 'student'
                      ? 'HM'
                      : currentRole === 'super_admin'
                      ? 'SA'
                      : currentRole === 'finance'
                      ? 'FM'
                      : currentRole === 'academic'
                      ? 'AM'
                      : currentRole === 'instructor'
                      ? 'TA'
                      : currentRole === 'manager'
                      ? 'ZK'
                      : 'AD'}
                  </div>
                  <div className="hidden lg:block text-left max-w-[130px]">
                    <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                      {currentRole === 'student'
                        ? 'Hamza Malik'
                        : currentRole === 'super_admin'
                        ? 'Dr. Tariq Amin'
                        : currentRole === 'finance'
                        ? 'Muneeb Ur Rehman'
                        : currentRole === 'academic'
                        ? 'Prof. Baig'
                        : currentRole === 'instructor'
                        ? 'Prof. Tariq'
                        : currentRole === 'manager'
                        ? 'Zainab Khurram'
                        : 'Sarah Jahangir'}
                    </div>
                    <div className="text-[10px] text-slate-400 capitalize font-medium truncate">
                      {currentRole.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile navigation menu'}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Hamburger Menu Sheet) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in drawer container */}
          <aside className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  AE
                </div>
                <div>
                  <span className="font-bold text-slate-950 text-sm block leading-none">
                    AERECON
                  </span>
                  <span className="text-[10px] text-blue-700 font-semibold uppercase tracking-wider">
                    Executive LMS
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Active Role Card */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {currentRole === 'public'
                      ? 'PUB'
                      : currentRole === 'student'
                      ? 'STU'
                      : currentRole === 'super_admin'
                      ? 'SUP'
                      : currentRole === 'finance'
                      ? 'FIN'
                      : currentRole === 'instructor'
                      ? 'INS'
                      : 'OPS'}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                      Active Workspace
                    </span>
                    <span className="text-xs font-bold text-slate-900 block">
                      {roleLabels[currentRole]?.label}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                  Live
                </span>
              </div>

              {/* SECTION: Switch Workspace Role (The core requested feature!) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Switch Workspace Role
                  </span>
                  <span className="text-[10px] text-blue-700 font-semibold font-mono">
                    8 Available
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-2.5">
                  Tap any portal below to instantly view that role&apos;s UI & permissions:
                </p>

                <div className="space-y-1.5">
                  {allAvailableRoles.map((role) => {
                    const isCurrent = currentRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => handleSelectRole(role)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
                              isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {roleLabels[role].icon}
                          </div>
                          <div className="min-w-0">
                            <span
                              className={`text-xs font-bold block truncate ${
                                isCurrent ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {roleLabels[role].label}
                            </span>
                            <span
                              className={`text-[10px] block truncate ${
                                isCurrent ? 'text-blue-100' : 'text-slate-400'
                              }`}
                            >
                              {roleLabels[role].desc}
                            </span>
                          </div>
                        </div>

                        {isCurrent ? (
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Public Website Navigation Links */}
              {currentRole === 'public' && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Course Information
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {publicNavLinks.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleScrollTo(item.href)}
                        className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions (Sign In / Enroll / Portal Sidebar) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {currentRole === 'public' ? (
                  <>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenEnrollmentModal?.();
                      }}
                      className="w-full py-2.5 px-4 bg-[#0f2b48] hover:bg-blue-900 text-white rounded-xl font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Enroll in Course</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenLoginModal?.();
                      }}
                      className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-blue-600" />
                      <span>Sign In to Account</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onToggleSidebar();
                    }}
                    className="w-full py-2.5 px-4 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-700" />
                    <span>Open Portal Navigation Drawer</span>
                  </button>
                )}

                {/* Search in Hamburger */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full py-2 px-3 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Search All Lectures & Modules</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3.5 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 text-center">
              AERECON LMS v3.4 • Multi-Role Executive Architecture
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
