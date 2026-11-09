import React, { useState } from 'react';
import {
  UserRole,
  Course,
  Quiz,
  ZoomSession,
  StudentNote,
  Student,
  Batch,
  PaymentVerification,
  FinancialRecord,
  ExpenseRecord,
  RefundRecord,
  Certificate,
  Announcement,
  AppNotification,
  StudentNavPage,
  ManagerNavPage,
  AdminNavPage,
  SuperAdminNavPage,
  FinanceNavPage,
  AcademicNavPage,
  InstructorNavPage,
} from './types';
import {
  INITIAL_COURSE,
  INITIAL_QUIZZES,
  INITIAL_ZOOM_SESSIONS,
  INITIAL_NOTES,
  INITIAL_STUDENTS,
  INITIAL_BATCHES,
  INITIAL_PAYMENT_VERIFICATIONS,
  INITIAL_FINANCIAL_RECORDS,
  INITIAL_EXPENSES,
  INITIAL_REFUNDS,
  INITIAL_CERTIFICATES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
} from './utils/mockData';

// Common UI
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer, ToastMessage } from './components/common/ToastContainer';
import { SearchModal } from './components/common/SearchModal';
import { PermissionProvider } from './rbac/PermissionContext';

// Public components
import { LandingPage } from './components/public/LandingPage';
import { EnrollmentModal } from './components/public/EnrollmentModal';
import { AuthModals } from './components/public/AuthModals';

// Student Portal components
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentClassroom } from './components/student/StudentClassroom';
import { StudentExaminations } from './components/student/StudentExaminations';
import { StudentTests } from './components/student/StudentTests';
import { StudentGrandTest } from './components/student/StudentGrandTest';
import { StudentLiveClasses } from './components/student/StudentLiveClasses';
import { StudentOnlineBatch } from './components/student/StudentOnlineBatch';
import { StudentNotes } from './components/student/StudentNotes';
import { StudentCertificates } from './components/student/StudentCertificates';
import { StudentAnnouncements } from './components/student/StudentAnnouncements';
import { StudentSupport } from './components/student/StudentSupport';
import { StudentProfile } from './components/student/StudentProfile';

// Super Admin Portal components
import { SuperAdminDashboard } from './components/superadmin/SuperAdminDashboard';
import { SuperAdminRolesPermissions } from './components/superadmin/SuperAdminRolesPermissions';
import { SuperAdminUsers } from './components/superadmin/SuperAdminUsers';
import { SuperAdminActivityLogs } from './components/superadmin/SuperAdminActivityLogs';
import { SuperAdminSecurityEvents } from './components/superadmin/SuperAdminSecurityEvents';
import { SuperAdminFinancialReports } from './components/superadmin/SuperAdminFinancialReports';
import { SuperAdminSettings } from './components/superadmin/SuperAdminSettings';

// Finance Portal components
import { FinanceDashboard } from './components/finance/FinanceDashboard';
import { FinancePaymentVerification } from './components/finance/FinancePaymentVerification';
import { FinanceExpenses } from './components/finance/FinanceExpenses';
import { FinanceReports } from './components/finance/FinanceReports';

// Instructor Portal components
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { InstructorCourses } from './components/instructor/InstructorCourses';
import { InstructorBatches } from './components/instructor/InstructorBatches';
import { InstructorLiveSessions } from './components/instructor/InstructorLiveSessions';

// Manager Portal components (Strictly NO Finance)
import { ManagerDashboard } from './components/manager/ManagerDashboard';
import { ManagerStudents } from './components/manager/ManagerStudents';
import { ManagerCourses } from './components/manager/ManagerCourses';
import { ManagerQuestionBank } from './components/manager/ManagerQuestionBank';
import { ManagerZoomSessions } from './components/manager/ManagerZoomSessions';
import { ManagerBatches } from './components/manager/ManagerBatches';
import { ManagerCertificates } from './components/manager/ManagerCertificates';
import { ManagerAnnouncements } from './components/manager/ManagerAnnouncements';
import { ManagerReports } from './components/manager/ManagerReports';

// Admin Portal components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminPaymentVerification } from './components/admin/AdminPaymentVerification';
import { AdminFinancials } from './components/admin/AdminFinancials';
import { AdminEnrollments } from './components/admin/AdminEnrollments';
import { AdminStaff } from './components/admin/AdminStaff';
import { AdminSettings } from './components/admin/AdminSettings';

export default function App() {
  // Global Role & Page Routing
  const [role, setRole] = useState<UserRole>('public');
  const [studentPage, setStudentPage] = useState<StudentNavPage>('dashboard');
  const [superAdminPage, setSuperAdminPage] = useState<SuperAdminNavPage>('dashboard');
  const [adminPage, setAdminPage] = useState<AdminNavPage>('dashboard');
  const [financePage, setFinancePage] = useState<FinanceNavPage>('dashboard');
  const [academicPage, setAcademicPage] = useState<AcademicNavPage>('dashboard');
  const [managerPage, setManagerPage] = useState<ManagerNavPage>('dashboard');
  const [instructorPage, setInstructorPage] = useState<InstructorNavPage>('dashboard');

  // Application Data States
  const [course, setCourse] = useState<Course>(INITIAL_COURSE);
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [zoomSessions, setZoomSessions] = useState<ZoomSession[]>(INITIAL_ZOOM_SESSIONS);
  const [notes, setNotes] = useState<StudentNote[]>(INITIAL_NOTES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [paymentVerifications, setPaymentVerifications] = useState<PaymentVerification[]>(
    INITIAL_PAYMENT_VERIFICATIONS
  );
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>(
    INITIAL_FINANCIAL_RECORDS
  );
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);
  const [refunds, setRefunds] = useState<RefundRecord[]>(INITIAL_REFUNDS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Student specific interaction state
  const [completedLectureIds, setCompletedLectureIds] = useState<string[]>([
    'lec-101',
    'lec-102',
    'lec-103',
    'lec-201',
  ]);
  const [selectedLectureForClassroom, setSelectedLectureForClassroom] = useState<string>('lec-202');

  // UI Dialog States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [enrollmentDefaultProduct, setEnrollmentDefaultProduct] = useState<string>(
    'Executive Business Management Course'
  );
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState<'login' | 'register' | 'forgot'>('login');

  // Sidebar responsive state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Toast Notification state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Student Interactions
  const handleToggleCompleteLecture = (lectureId: string) => {
    setCompletedLectureIds((prev) =>
      prev.includes(lectureId) ? prev.filter((id) => id !== lectureId) : [...prev, lectureId]
    );
  };

  const handleSaveNote = (newNoteData: {
    lectureId: string;
    lectureTitle: string;
    content: string;
    timestampSeconds: number;
  }) => {
    const newNote: StudentNote = {
      id: `note-${Date.now()}`,
      lectureId: newNoteData.lectureId,
      lectureTitle: newNoteData.lectureTitle,
      timestampSeconds: newNoteData.timestampSeconds,
      content: newNoteData.content,
      tags: ['StudyNote'],
      updatedAt: 'Just now',
    };
    setNotes([newNote, ...notes]);
  };

  const handleUpdateNote = (id: string, newContent: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, content: newContent, updatedAt: 'Just now' } : n)));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleQuizCompleted = (quizId: string, scorePercent: number) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId
          ? {
              ...q,
              status: 'Completed',
              lastScorePercent: scorePercent,
              lastAttemptDate: '2026-11-04',
            }
          : q
      )
    );
  };

  // Manager Interactions
  const handleUpdateStudentStatus = (
    studentId: string,
    newStatus: 'Active' | 'Suspended' | 'Graduated'
  ) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s))
    );
  };

  // Payment Verification
  const handleVerifyPayment = (id: string, status: 'Approved' | 'Rejected', reason?: string) => {
    const item = paymentVerifications.find((p) => p.id === id);
    if (!item) return;

    setPaymentVerifications((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              reviewedBy: 'Finance / Admin Verification Office',
              rejectionReason: reason,
            }
          : p
      )
    );

    if (status === 'Approved') {
      const newIncome: FinancialRecord = {
        id: `fin-${Date.now()}`,
        date: '2026-11-04',
        type: 'Income',
        category: item.productType,
        description: `Enrollment: ${item.studentName}`,
        amountPKR: item.amountPKR,
        referenceNumber: item.transactionReference,
        paymentMethod: item.paymentMethod,
        status: 'Completed',
      };
      setFinancialRecords([newIncome, ...financialRecords]);

      const exists = students.find((s) => s.email === item.studentEmail);
      if (!exists) {
        const isRecorded = item.productType.includes('Recorded') || item.productType.includes('Course');
        const newStu: Student = {
          id: `stu-${Date.now()}`,
          name: item.studentName,
          email: item.studentEmail,
          phone: item.phone,
          batch: isRecorded ? 'Recorded Self-Paced' : 'Cohort 8 (Evening)',
          enrolledProducts: isRecorded ? ['Recorded'] : ['LiveZoom'],
          progressPercent: 0,
          completedLecturesCount: 0,
          totalLecturesCount: 10,
          status: 'Active',
          enrollmentDate: '2026-11-04',
          lastActive: 'Just approved',
        };
        setStudents([newStu, ...students]);
      }
    }
  };

  // Public Enrollment Submission
  const handleSubmitEnrollment = (newVerification: PaymentVerification) => {
    setPaymentVerifications([newVerification, ...paymentVerifications]);
    showToast(
      'Enrollment payment submitted! Awaiting bank deposit clearance from our finance team.',
      'success'
    );
  };

  const pendingCount = paymentVerifications.filter((p) => p.status === 'Pending').length;

  // Resolve current active page per role
  const getCurrentPage = () => {
    if (role === 'student') return studentPage;
    if (role === 'super_admin') return superAdminPage;
    if (role === 'admin') return adminPage;
    if (role === 'finance') return financePage;
    if (role === 'academic') return academicPage;
    if (role === 'manager') return managerPage;
    if (role === 'instructor') return instructorPage;
    return 'dashboard';
  };

  const handlePageChange = (page: string) => {
    if (role === 'student') setStudentPage(page as StudentNavPage);
    if (role === 'super_admin') setSuperAdminPage(page as SuperAdminNavPage);
    if (role === 'admin') setAdminPage(page as AdminNavPage);
    if (role === 'finance') setFinancePage(page as FinanceNavPage);
    if (role === 'academic') setAcademicPage(page as AcademicNavPage);
    if (role === 'manager') setManagerPage(page as ManagerNavPage);
    if (role === 'instructor') setInstructorPage(page as InstructorNavPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PermissionProvider role={role}>
      <div className="min-h-screen bg-[#f8f9fa] text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900 w-full overflow-x-hidden">
        {/* Universal Top Navigation */}
        <Navbar
          currentRole={role}
          onRoleChange={(newRole) => {
            setRole(newRole);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleSidebar={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
          notifications={notifications}
          onMarkNotificationsRead={() =>
            setNotifications(notifications.map((n) => ({ ...n, read: true })))
          }
          onOpenEnrollmentModal={() => {
            setEnrollmentDefaultProduct('Executive Business Management Course');
            setIsEnrollmentOpen(true);
          }}
          onOpenLoginModal={() => {
            setAuthInitialView('login');
            setIsAuthOpen(true);
          }}
        />

        {/* Main Content Area */}
        {role === 'public' ? (
          // Public Website View
          <main className="flex-1 w-full min-w-0">
            <LandingPage
              course={course}
              onSelectRole={(targetRole) => {
                setRole(targetRole);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenEnrollment={(prod) => {
                if (prod) setEnrollmentDefaultProduct(prod);
                setIsEnrollmentOpen(true);
              }}
              onOpenLogin={() => {
                setAuthInitialView('login');
                setIsAuthOpen(true);
              }}
            />
          </main>
        ) : (
          // Authenticated Portal Layout
          <div className="flex-1 flex w-full min-w-0">
            {/* Universal Sidebar */}
            <Sidebar
              role={role}
              currentPage={getCurrentPage()}
              onPageChange={handlePageChange}
              isOpenMobile={isSidebarOpenMobile}
              onCloseMobile={() => setIsSidebarOpenMobile(false)}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              pendingPaymentCount={pendingCount}
            />

            {/* Main App Canvas */}
            <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto w-full">
              {/* ══════════════ 1. SUPER ADMIN PORTAL ══════════════ */}
              {role === 'super_admin' && (
                <>
                  {superAdminPage === 'dashboard' && (
                    <SuperAdminDashboard
                      students={students}
                      batches={batches}
                      paymentVerifications={paymentVerifications}
                      financialRecords={financialRecords}
                      onNavigate={(p) => setSuperAdminPage(p as SuperAdminNavPage)}
                    />
                  )}
                  {superAdminPage === 'roles-permissions' && (
                    <SuperAdminRolesPermissions onShowToast={showToast} />
                  )}
                  {superAdminPage === 'users' && (
                    <SuperAdminUsers onShowToast={showToast} />
                  )}
                  {superAdminPage === 'activity-logs' && (
                    <SuperAdminActivityLogs />
                  )}
                  {superAdminPage === 'security-events' && (
                    <SuperAdminSecurityEvents />
                  )}
                  {superAdminPage === 'financial-reports' && (
                    <SuperAdminFinancialReports
                      financialRecords={financialRecords}
                      expenses={expenses}
                      refunds={refunds}
                    />
                  )}
                  {superAdminPage === 'settings' && (
                    <SuperAdminSettings onShowToast={showToast} />
                  )}
                  {superAdminPage === 'students' && (
                    <ManagerStudents
                      students={students}
                      onUpdateStudentStatus={handleUpdateStudentStatus}
                      onShowToast={showToast}
                    />
                  )}
                  {superAdminPage === 'courses' && (
                    <ManagerCourses course={course} onShowToast={showToast} />
                  )}
                  {superAdminPage === 'question-bank' && (
                    <ManagerQuestionBank
                      initialQuestions={quizzes.flatMap((q) => q.questions)}
                      onShowToast={showToast}
                    />
                  )}
                  {superAdminPage === 'examinations' && (
                    <StudentExaminations
                      quizzes={quizzes}
                      completedLectureIds={completedLectureIds}
                      onNavigateToTest={() => setSuperAdminPage('dashboard')}
                      onShowToast={showToast}
                    />
                  )}
                  {superAdminPage === 'grand-tests' && (
                    <StudentGrandTest
                      quizzes={quizzes}
                      completedLectureIds={completedLectureIds}
                      onShowToast={showToast}
                    />
                  )}
                  {superAdminPage === 'certificates' && (
                    <ManagerCertificates
                      certificates={certificates}
                      students={students}
                      onIssueCertificate={(c) => setCertificates([c, ...certificates])}
                      onShowToast={showToast}
                    />
                  )}
                  {superAdminPage === 'batches' && (
                    <ManagerBatches
                      batches={batches}
                      students={students}
                      onShowToast={showToast}
                    />
                  )}
                  {superAdminPage === 'payments' && (
                    <AdminPaymentVerification
                      verifications={paymentVerifications}
                      onVerifyPayment={handleVerifyPayment}
                      onShowToast={showToast}
                    />
                  )}
                  {superAdminPage === 'expenses' && (
                    <FinanceExpenses expenses={expenses} onShowToast={showToast} />
                  )}
                </>
              )}

              {/* ══════════════ 2. FINANCE MANAGER PORTAL ══════════════ */}
              {role === 'finance' && (
                <>
                  {financePage === 'dashboard' && (
                    <FinanceDashboard
                      paymentVerifications={paymentVerifications}
                      financialRecords={financialRecords}
                      expenses={expenses}
                      refunds={refunds}
                      onNavigate={(p) => setFinancePage(p as FinanceNavPage)}
                    />
                  )}
                  {financePage === 'payment-verification' && (
                    <FinancePaymentVerification
                      verifications={paymentVerifications}
                      onVerifyPayment={handleVerifyPayment}
                      onShowToast={showToast}
                    />
                  )}
                  {financePage === 'expenses' && (
                    <FinanceExpenses expenses={expenses} onShowToast={showToast} />
                  )}
                  {financePage === 'revenue-reports' && (
                    <FinanceReports
                      financialRecords={financialRecords}
                      expenses={expenses}
                      refunds={refunds}
                    />
                  )}
                </>
              )}

              {/* ══════════════ 3. ACADEMIC MANAGER PORTAL ══════════════ */}
              {role === 'academic' && (
                <>
                  {academicPage === 'dashboard' && (
                    <ManagerDashboard
                      students={students}
                      batches={batches}
                      zoomSessions={zoomSessions}
                      quizzes={quizzes}
                      onNavigate={(p) => setAcademicPage(p as AcademicNavPage)}
                    />
                  )}
                  {academicPage === 'courses' && (
                    <ManagerCourses course={course} onShowToast={showToast} />
                  )}
                  {academicPage === 'question-bank' && (
                    <ManagerQuestionBank
                      initialQuestions={quizzes.flatMap((q) => q.questions)}
                      onShowToast={showToast}
                    />
                  )}
                  {academicPage === 'students' && (
                    <ManagerStudents
                      students={students}
                      onUpdateStudentStatus={handleUpdateStudentStatus}
                      onShowToast={showToast}
                    />
                  )}
                  {academicPage === 'certificates' && (
                    <ManagerCertificates
                      certificates={certificates}
                      students={students}
                      onIssueCertificate={(c) => setCertificates([c, ...certificates])}
                      onShowToast={showToast}
                    />
                  )}
                  {academicPage === 'reports' && <ManagerReports />}
                </>
              )}

              {/* ══════════════ 4. INSTRUCTOR / TEACHER PORTAL ══════════════ */}
              {role === 'instructor' && (
                <>
                  {instructorPage === 'dashboard' && (
                    <InstructorDashboard
                      onNavigate={(p) => setInstructorPage(p as InstructorNavPage)}
                    />
                  )}
                  {instructorPage === 'my-courses' && (
                    <InstructorCourses course={course} />
                  )}
                  {instructorPage === 'my-batches' && (
                    <InstructorBatches batches={batches} />
                  )}
                  {instructorPage === 'live-sessions' && (
                    <InstructorLiveSessions sessions={zoomSessions} />
                  )}
                </>
              )}

              {/* ══════════════ 5. STUDENT LEARNER PORTAL ══════════════ */}
              {role === 'student' && (
                <>
                  {studentPage === 'dashboard' && (
                    <StudentDashboard
                      course={course}
                      zoomSessions={zoomSessions}
                      quizzes={quizzes}
                      notes={notes}
                      completedLectureIds={completedLectureIds}
                      onNavigate={(targetPage, extraId) => {
                        if (extraId) setSelectedLectureForClassroom(extraId);
                        setStudentPage(targetPage);
                      }}
                    />
                  )}
                  {studentPage === 'classroom' && (
                    <StudentClassroom
                      course={course}
                      initialLectureId={selectedLectureForClassroom}
                      completedLectureIds={completedLectureIds}
                      onToggleCompleteLecture={handleToggleCompleteLecture}
                      notes={notes}
                      onSaveNote={handleSaveNote}
                      onShowToast={showToast}
                      onNavigateToTest={() => setStudentPage('tests')}
                    />
                  )}
                  {studentPage === 'examinations' && (
                    <StudentExaminations
                      quizzes={quizzes}
                      completedLectureIds={completedLectureIds}
                      onNavigateToTest={(qId) => setStudentPage('tests')}
                      onShowToast={showToast}
                    />
                  )}
                  {studentPage === 'tests' && (
                    <StudentTests
                      quizzes={quizzes}
                      onQuizCompleted={handleQuizCompleted}
                      onShowToast={showToast}
                    />
                  )}
                  {studentPage === 'grand-test' && (
                    <StudentGrandTest
                      quizzes={quizzes}
                      completedLectureIds={completedLectureIds}
                      onShowToast={showToast}
                      onNavigateToCertificates={() => setStudentPage('certificates')}
                    />
                  )}
                  {studentPage === 'live-classes' && (
                    <StudentLiveClasses
                      zoomSessions={zoomSessions}
                      onShowToast={showToast}
                    />
                  )}
                  {studentPage === 'my-batch' && <StudentOnlineBatch />}
                  {studentPage === 'notes' && (
                    <StudentNotes
                      notes={notes}
                      onAddNote={handleSaveNote}
                      onDeleteNote={handleDeleteNote}
                      onUpdateNote={handleUpdateNote}
                      onShowToast={showToast}
                    />
                  )}
                  {studentPage === 'certificates' && (
                    <StudentCertificates
                      certificate={certificates[0]}
                      onShowToast={showToast}
                    />
                  )}
                  {studentPage === 'announcements' && (
                    <StudentAnnouncements announcements={announcements} />
                  )}
                  {studentPage === 'support' && (
                    <StudentSupport onShowToast={showToast} />
                  )}
                  {studentPage === 'profile' && <StudentProfile onShowToast={showToast} />}
                </>
              )}

              {/* ══════════════ 6. OPERATIONS / STUDENT MANAGER PORTAL ══════════════ */}
              {role === 'manager' && (
                <>
                  {managerPage === 'dashboard' && (
                    <ManagerDashboard
                      students={students}
                      batches={batches}
                      zoomSessions={zoomSessions}
                      quizzes={quizzes}
                      onNavigate={(p) => setManagerPage(p)}
                    />
                  )}
                  {managerPage === 'students' && (
                    <ManagerStudents
                      students={students}
                      onUpdateStudentStatus={handleUpdateStudentStatus}
                      onShowToast={showToast}
                    />
                  )}
                  {managerPage === 'courses' && (
                    <ManagerCourses course={course} onShowToast={showToast} />
                  )}
                  {managerPage === 'question-bank' && (
                    <ManagerQuestionBank
                      initialQuestions={quizzes.flatMap((q) => q.questions)}
                      onShowToast={showToast}
                    />
                  )}
                  {managerPage === 'live-sessions' && (
                    <ManagerZoomSessions
                      sessions={zoomSessions}
                      batches={batches}
                      onAddSession={(newS) => setZoomSessions([newS, ...zoomSessions])}
                      onShowToast={showToast}
                    />
                  )}
                  {managerPage === 'batches' && (
                    <ManagerBatches
                      batches={batches}
                      students={students}
                      onShowToast={showToast}
                    />
                  )}
                  {managerPage === 'certificates' && (
                    <ManagerCertificates
                      certificates={certificates}
                      students={students}
                      onIssueCertificate={(c) => setCertificates([c, ...certificates])}
                      onShowToast={showToast}
                    />
                  )}
                  {managerPage === 'announcements' && (
                    <ManagerAnnouncements
                      announcements={announcements}
                      onAddAnnouncement={(a) => setAnnouncements([a, ...announcements])}
                      onShowToast={showToast}
                    />
                  )}
                  {managerPage === 'reports' && <ManagerReports />}
                </>
              )}

              {/* ══════════════ 7. ADMIN PORTAL ══════════════ */}
              {role === 'admin' && (
                <>
                  {adminPage === 'dashboard' && (
                    <AdminDashboard
                      paymentVerifications={paymentVerifications}
                      financialRecords={financialRecords}
                      students={students}
                      onNavigate={(p) => setAdminPage(p as AdminNavPage)}
                      onVerifyPayment={handleVerifyPayment}
                    />
                  )}
                  {adminPage === 'payment-verification' && (
                    <AdminPaymentVerification
                      verifications={paymentVerifications}
                      onVerifyPayment={handleVerifyPayment}
                      onShowToast={showToast}
                    />
                  )}
                  {adminPage === 'financials' && (
                    <AdminFinancials
                      financialRecords={financialRecords}
                      initialExpenses={expenses}
                      initialRefunds={refunds}
                      onShowToast={showToast}
                    />
                  )}
                  {adminPage === 'staff' && <AdminStaff onShowToast={showToast} />}
                  {adminPage === 'enrollments' && (
                    <AdminEnrollments
                      students={students}
                      onManualEnroll={(s) => setStudents([s, ...students])}
                      onShowToast={showToast}
                    />
                  )}
                  {adminPage === 'courses' && (
                    <ManagerCourses course={course} onShowToast={showToast} />
                  )}
                  {adminPage === 'students' && (
                    <ManagerStudents
                      students={students}
                      onUpdateStudentStatus={handleUpdateStudentStatus}
                      onShowToast={showToast}
                    />
                  )}
                  {adminPage === 'settings' && <AdminSettings onShowToast={showToast} />}
                </>
              )}
            </main>
          </div>
        )}

        {/* Global Modals */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          course={course}
          onSelectLecture={(lecId) => {
            setSelectedLectureForClassroom(lecId);
            setRole('student');
            setStudentPage('classroom');
            showToast('Navigated to lecture classroom', 'info');
          }}
        />

        <EnrollmentModal
          isOpen={isEnrollmentOpen}
          onClose={() => setIsEnrollmentOpen(false)}
          defaultProduct={enrollmentDefaultProduct}
          onSubmitEnrollment={handleSubmitEnrollment}
        />

        <AuthModals
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          initialView={authInitialView}
          onLoginSuccess={(selectedRole) => {
            setRole(selectedRole);
            showToast(`Signed in to ${selectedRole.replace('_', ' ').toUpperCase()} portal`, 'success');
          }}
        />

        {/* Toast Alert Container */}
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    </PermissionProvider>
  );
}
