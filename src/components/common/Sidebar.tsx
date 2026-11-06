import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  FileCheck2,
  FileText,
  Award,
  CalendarCheck,
  FolderTree,
  BellRing,
  BarChart3,
  Receipt,
  UserCheck,
  CircleDollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  GraduationCap,
  HelpCircle,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Database,
  Layers,
  Lock,
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  role: UserRole;
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  pendingPaymentCount?: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeVariant?: 'blue' | 'amber' | 'emerald';
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  currentPage,
  onPageChange,
  isOpenMobile,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  pendingPaymentCount = 0,
}) => {
  if (role === 'public') return null;

  // ─── SUPER ADMIN NAVIGATION (UNRESTRICTED CONTROL) ───
  const superAdminNav: NavItem[] = [
    { id: 'dashboard', label: 'Platform Overview', icon: LayoutDashboard },
    { id: 'roles-permissions', label: 'Roles & Permissions', icon: Shield },
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'students', label: 'Students Roster', icon: GraduationCap },
    { id: 'courses', label: 'Curriculum & Lectures', icon: FolderTree },
    { id: 'question-bank', label: 'Question Bank', icon: Database },
    { id: 'examinations', label: 'Examinations', icon: FileCheck2 },
    { id: 'grand-tests', label: 'Grand Examinations', icon: Award },
    { id: 'certificates', label: 'Certificate Issuance', icon: Award },
    { id: 'batches', label: 'Cohorts & Batches', icon: CalendarCheck },
    {
      id: 'payments',
      label: 'Fee Verifications',
      icon: Receipt,
      badge: pendingPaymentCount > 0 ? pendingPaymentCount : undefined,
      badgeVariant: 'amber',
    },
    { id: 'financial-reports', label: 'Financial Reports & P&L', icon: TrendingUp },
    { id: 'activity-logs', label: 'Activity Logs', icon: ClipboardList },
    { id: 'security-events', label: 'Security & Telemetry', icon: AlertTriangle },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  // ─── ADMIN NAVIGATION ───
  const adminNav: NavItem[] = [
    { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
    {
      id: 'payment-verification',
      label: 'Payment Verification',
      icon: Receipt,
      badge: pendingPaymentCount > 0 ? pendingPaymentCount : undefined,
      badgeVariant: 'amber',
    },
    { id: 'financials', label: 'Financial Hub & Ledger', icon: CircleDollarSign },
    { id: 'enrollments', label: 'Enrollment Applications', icon: UserCheck },
    { id: 'staff', label: 'Staff & Roles', icon: Users },
    { id: 'courses', label: 'Course Oversight', icon: FolderTree },
    { id: 'students', label: 'All Students', icon: GraduationCap },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  // ─── FINANCE MANAGER NAVIGATION (CONFIDENTIAL FINANCIAL ACCESS ONLY) ───
  const financeNav: NavItem[] = [
    { id: 'dashboard', label: 'Financial Overview', icon: LayoutDashboard },
    {
      id: 'payment-verification',
      label: 'Payment Verifications',
      icon: Receipt,
      badge: pendingPaymentCount > 0 ? pendingPaymentCount : undefined,
      badgeVariant: 'amber',
    },
    { id: 'expenses', label: 'Institutional Expenses', icon: CircleDollarSign },
    { id: 'revenue-reports', label: 'P&L & Revenue Reports', icon: TrendingUp },
  ];

  // ─── ACADEMIC MANAGER NAVIGATION (PEDAGOGY & CURRICULUM, NO FINANCE) ───
  const academicNav: NavItem[] = [
    { id: 'dashboard', label: 'Academic Overview', icon: LayoutDashboard },
    { id: 'courses', label: 'Curriculum & Lectures', icon: FolderTree },
    { id: 'question-bank', label: 'MCQ Question Bank', icon: Database },
    { id: 'students', label: 'Student Progress', icon: GraduationCap },
    { id: 'certificates', label: 'Certificate Verification', icon: Award },
    { id: 'reports', label: 'Academic Reports', icon: BarChart3 },
  ];

  // ─── OPERATIONS / STUDENT MANAGER NAVIGATION (STUDENT LIFE CYCLE, NO FINANCE) ───
  const managerNav: NavItem[] = [
    { id: 'dashboard', label: 'Operations Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Student Oversight & Telemetry', icon: Users },
    { id: 'batches', label: 'Batches & Cohorts', icon: CalendarCheck },
    { id: 'live-sessions', label: 'Live Zoom Sessions', icon: Video },
    { id: 'certificates', label: 'Certificate Approval Queue', icon: Award },
    { id: 'announcements', label: 'Announcements', icon: BellRing },
    { id: 'reports', label: 'Operational Analytics', icon: BarChart3 },
  ];

  // ─── INSTRUCTOR / TEACHER NAVIGATION (ASSIGNED ONLY) ───
  const instructorNav: NavItem[] = [
    { id: 'dashboard', label: 'Faculty Overview', icon: LayoutDashboard },
    { id: 'my-courses', label: 'My Assigned Courses', icon: BookOpen },
    { id: 'my-batches', label: 'My Cohort Batches', icon: CalendarCheck },
    { id: 'live-sessions', label: 'Live Video Broadcasts', icon: Video },
  ];

  // ─── STUDENT NAVIGATION ───
  const studentNav: NavItem[] = [
    { id: 'dashboard', label: 'My Learning Hub', icon: LayoutDashboard },
    { id: 'classroom', label: 'Video Lectures', icon: BookOpen },
    { id: 'examinations', label: 'Examinations', icon: FileCheck2 },
    { id: 'tests', label: 'MCQ Assessment Test', icon: FileCheck2 },
    { id: 'grand-test', label: 'Grand Examination', icon: Award },
    { id: 'certificates', label: 'My Verified Certificate', icon: Award },
    { id: 'live-classes', label: 'Join Online Lectures', icon: Video },
    { id: 'my-batch', label: 'My Online Cohort', icon: CalendarCheck },
    { id: 'notes', label: 'Timestamped Notes', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: BellRing },
    { id: 'support', label: 'Mentor Support', icon: HelpCircle },
    { id: 'profile', label: 'Account & Security', icon: Settings },
  ];

  const currentNavItems: NavItem[] =
    role === 'super_admin'
      ? superAdminNav
      : role === 'admin'
      ? adminNav
      : role === 'finance'
      ? financeNav
      : role === 'academic'
      ? academicNav
      : role === 'manager'
      ? managerNav
      : role === 'instructor'
      ? instructorNav
      : studentNav;

  const roleTitle =
    role === 'super_admin'
      ? 'Super Admin Portal'
      : role === 'admin'
      ? 'Institutional Admin'
      : role === 'finance'
      ? 'Finance & Accounts'
      : role === 'academic'
      ? 'Academic Management'
      : role === 'manager'
      ? 'Operations Hub'
      : role === 'instructor'
      ? 'Faculty Portal'
      : 'Student Classroom';

  const content = (
    <div className="h-full flex flex-col justify-between select-none">
      <div className="py-3">
        {/* Workspace Title */}
        <div className="px-4 mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {roleTitle}
          </span>
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation items list */}
        <nav className="space-y-1 px-2.5">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/90 text-blue-900 shadow-xs border border-blue-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-blue-700' : 'text-slate-400'
                  }`}
                />
                {!isCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                      item.badgeVariant === 'amber'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Info Banner */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px]">
          <div className="flex items-center gap-2 mb-1 text-slate-800 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Aerecon Edu v3.4</span>
          </div>
          <p className="text-slate-500 leading-relaxed text-[10px]">
            Enterprise multi-role educational management platform.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 bg-white border-r border-slate-200/80 transition-all duration-200 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="sticky top-15 h-[calc(100vh-3.75rem)] overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex"
          onClick={onCloseMobile}
        >
          <div
            className="w-72 max-w-[85vw] bg-white h-full shadow-2xl p-2 animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
};
