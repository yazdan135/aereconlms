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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; badge: string }> = {
    public: {
      label: 'Public Website',
      icon: <Globe className="w-3.5 h-3.5 text-slate-600" />,
      badge: 'Public Course Catalog',
    },
    student: {
      label: 'Student Portal',
      icon: <GraduationCap className="w-3.5 h-3.5 text-blue-600" />,
      badge: 'Enrolled Learner',
    },
    manager: {
      label: 'Operations Manager',
      icon: <Briefcase className="w-3.5 h-3.5 text-indigo-600" />,
      badge: 'Student & Cohort Ops',
    },
    admin: {
      label: 'Admin Portal',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
      badge: 'Curriculum & General Admin',
    },
    super_admin: {
      label: 'Super Admin',
      icon: <Shield className="w-3.5 h-3.5 text-amber-500" />,
      badge: 'Root Authority & RBAC',
    },
    finance: {
      label: 'Finance Manager',
      icon: <CircleDollarSign className="w-3.5 h-3.5 text-emerald-600" />,
      badge: 'Ledgers, P&L & Audits',
    },
    academic: {
      label: 'Academic Manager',
      icon: <BookOpen className="w-3.5 h-3.5 text-purple-600" />,
      badge: 'Pedagogy & Question Bank',
    },
    instructor: {
      label: 'Instructor Portal',
      icon: <UserCheck className="w-3.5 h-3.5 text-cyan-600" />,
      badge: 'Faculty Live Classes',
    },
  };

  const allAvailableRoles: UserRole[] = [
    'public',
    'student',
    'super_admin',
    'admin',
    'finance',
    'academic',
    'manager',
    'instructor',
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Left: Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {currentRole !== 'public' && (
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            onClick={() => onRoleChange('public')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-xs group-hover:bg-blue-900 transition-colors">
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

        {/* Center / Action: Role Switcher & Search Bar */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Mobile Search Icon Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search curriculum"
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl transition-all w-44 lg:w-56 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="flex-1 text-left truncate">Search courses, modules...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Interactive Persona / Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              aria-label="Switch portal view"
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 transition-colors cursor-pointer max-w-[140px] sm:max-w-none"
            >
              <div className="flex items-center gap-1.5 truncate">
                {roleLabels[currentRole]?.icon}
                <span className="hidden sm:inline font-bold text-slate-900 truncate">
                  {roleLabels[currentRole]?.label}
                </span>
                <span className="sm:hidden font-bold truncate">
                  {currentRole === 'public'
                    ? 'Public'
                    : currentRole === 'super_admin'
                    ? 'Admin'
                    : currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {showRoleMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowRoleMenu(false)} />
                <div className="absolute right-0 mt-1.5 w-[calc(100vw-1.5rem)] max-w-xs sm:max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Workspace Role & View
                  </div>

                  <div className="max-h-80 overflow-y-auto py-1">
                    {allAvailableRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          onRoleChange(role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                          currentRole === role
                            ? 'bg-blue-50/80 font-bold text-blue-900'
                            : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {roleLabels[role].icon}
                          <div>
                            <div className="text-slate-900 font-semibold">{roleLabels[role].label}</div>
                            <div className="text-[10px] text-slate-400">{roleLabels[role].badge}</div>
                          </div>
                        </div>
                        {currentRole === role && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Actions & User Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Notifications Button */}
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
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
              )}
            </button>

            {showNotifMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifMenu(false)} />
                <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-sm sm:max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <span className="text-[11px] text-slate-500">{notifications.length} total</span>
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

          {/* Contextual Actions */}
          {currentRole === 'public' ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={onOpenLoginModal}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={onOpenEnrollmentModal}
                className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-2.5 sm:px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                Enroll
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-slate-200">
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
              <div className="hidden sm:block text-left max-w-[140px] lg:max-w-none">
                <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                  {currentRole === 'student'
                    ? 'Hamza Malik'
                    : currentRole === 'super_admin'
                    ? 'Dr. Tariq Amin (Super Admin)'
                    : currentRole === 'finance'
                    ? 'Muneeb Ur Rehman'
                    : currentRole === 'academic'
                    ? 'Prof. Asadullah Baig'
                    : currentRole === 'instructor'
                    ? 'Prof. Tariq Amin'
                    : currentRole === 'manager'
                    ? 'Zainab Khurram (Ops)'
                    : 'Sarah Jahangir'}
                </div>
                <div className="text-[10px] text-slate-400 capitalize font-medium truncate">
                  {currentRole.replace('_', ' ')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
