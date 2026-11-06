export type UserRole = 'public' | 'student' | 'manager' | 'admin' | 'super_admin' | 'finance' | 'academic' | 'instructor';

export type StudentNavPage =
  | 'dashboard'
  | 'classroom'
  | 'examinations'
  | 'tests'
  | 'grand-test'
  | 'live-classes'
  | 'my-batch'
  | 'notes'
  | 'certificates'
  | 'announcements'
  | 'support'
  | 'profile';

export type ManagerNavPage =
  | 'dashboard'
  | 'students'
  | 'enrollment-requests'
  | 'courses'
  | 'question-bank'
  | 'batches'
  | 'live-sessions'
  | 'certificates'
  | 'announcements'
  | 'support'
  | 'reports';

export type AdminNavPage =
  | 'dashboard'
  | 'staff'
  | 'enrollments'
  | 'payment-verification'
  | 'financials'
  | 'courses'
  | 'students'
  | 'settings';

export type SuperAdminNavPage =
  | 'dashboard'
  | 'users'
  | 'roles-permissions'
  | 'students'
  | 'courses'
  | 'lectures'
  | 'examinations'
  | 'question-bank'
  | 'grand-tests'
  | 'certificates'
  | 'online-classes'
  | 'batches'
  | 'payments'
  | 'expenses'
  | 'financial-reports'
  | 'analytics'
  | 'activity-logs'
  | 'security-events'
  | 'settings';

export type FinanceNavPage =
  | 'dashboard'
  | 'payments'
  | 'payment-verification'
  | 'expenses'
  | 'refunds'
  | 'revenue-reports'
  | 'financial-history';

export type AcademicNavPage =
  | 'dashboard'
  | 'courses'
  | 'lectures'
  | 'question-bank'
  | 'examinations'
  | 'grand-tests'
  | 'students'
  | 'certificates'
  | 'reports';

export type InstructorNavPage =
  | 'dashboard'
  | 'my-courses'
  | 'my-batches'
  | 'my-students'
  | 'live-sessions'
  | 'attendance'
  | 'announcements';

// ─── Permission & RBAC Types ───────────────────────────────────────────────────

export type PermissionAction =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'export'
  | 'manage'
  | 'assign'
  | 'publish'
  | 'unpublish';

export type PermissionModule =
  | 'students'
  | 'courses'
  | 'lectures'
  | 'examinations'
  | 'certificates'
  | 'payments'
  | 'expenses'
  | 'batches'
  | 'users'
  | 'roles'
  | 'reports'
  | 'settings'
  | 'announcements'
  | 'question-bank'
  | 'grand-tests'
  | 'live-sessions';

export type PermissionScope =
  | 'all'
  | 'assigned'
  | 'specific-courses'
  | 'specific-batches'
  | 'specific-students'
  | 'own';

export interface Permission {
  module: PermissionModule;
  actions: PermissionAction[];
  scope?: PermissionScope;
  specificIds?: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  isSystem: boolean;
  permissions: Permission[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  roleId: string;
  status: 'Active' | 'Suspended' | 'Inactive';
  customPermissions?: Permission[];
  createdAt: string;
  lastLogin: string;
  avatarUrl?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  description: string;
  ipAddress: string;
  device: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}

export interface SecurityEvent {
  id: string;
  studentId: string;
  studentName: string;
  eventType: 'SCREEN_CAPTURE' | 'VISIBILITY_CHANGE' | 'DEVTOOLS_OPEN' | 'MULTIPLE_LOGIN' | 'SUSPICIOUS_IP';
  lectureId?: string;
  lectureTitle?: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  resolved: boolean;
}

export interface GrandTest {
  id: string;
  courseId: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  passingScorePercent: number;
  status: 'Locked' | 'Available' | 'Attempted' | 'Passed' | 'Failed';
  lastScorePercent?: number;
  lastAttemptDate?: string;
  questions: Question[];
}

export interface OnlineEnrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  batchId?: string;
  amountPKR: number;
  paymentMethod: string;
  transactionRef: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'BatchPending';
  submittedAt: string;
  approvedAt?: string;
}

export interface LiveSession {
  id: string;
  batchId: string;
  batchName: string;
  title: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  platform: string;
  meetingUrl: string;
  meetingId?: string;
  passcode?: string;
  status: 'Scheduled' | 'Live' | 'Completed' | 'Cancelled';
  notes?: string;
  recordingUrl?: string;
}

export interface SupportTicket {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Lecture {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  videoUrl: string;
  description: string;
  keyTakeaways: string[];
  resources: Array<{ title: string; type: 'pdf' | 'xlsx' | 'link'; size?: string; url: string }>;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  lectures: Lecture[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  pricePKR: number;
  totalHours: number;
  totalLectures: number;
  rating: number;
  reviewsCount: number;
  instructorName: string;
  instructorRole: string;
  instructorBio: string;
  modules: Module[];
}

export interface Question {
  id: string;
  testId?: string;
  text: string;
  category: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  moduleTitle: string;
  description: string;
  durationMinutes: number;
  passingScorePercent: number;
  questionsCount: number;
  totalMarks: number;
  questions: Question[];
  status: 'Available' | 'Completed' | 'Upcoming';
  lastScorePercent?: number;
  lastAttemptDate?: string;
}

export interface ZoomSession {
  id: string;
  title: string;
  batchName: string;
  instructorName: string;
  date: string;
  timePKT: string;
  durationMinutes: number;
  meetingId: string;
  passcode: string;
  zoomLink: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  attendanceStatus?: 'Present' | 'Absent' | 'Pending';
  recordingUrl?: string;
  agenda: string[];
}

export interface StudentNote {
  id: string;
  lectureId: string;
  lectureTitle: string;
  timestampSeconds: number;
  content: string;
  tags: string[];
  updatedAt: string;
}

export interface LectureSkipSegment {
  fromFormatted: string;
  toFormatted: string;
  duration: string;
  fromSeconds: number;
  toSeconds: number;
  reason: string;
}

export interface StudentLectureAnalytics {
  lectureId: string;
  lectureTitle: string;
  moduleTitle: string;
  durationMinutes: number;
  watchPercent: number;
  watchStatus: 'Completed' | 'Partially Watched' | 'Not Started';
  totalWatchTimeFormatted: string;
  playbackSpeed: string;
  skippedSegments: LectureSkipSegment[];
  rewatchedSegments?: string[];
  lastWatchedAt: string;
}

export interface StudentQuizQuestionDetail {
  questionText: string;
  studentOption: string;
  correctOption: string;
  isCorrect: boolean;
  explanation: string;
}

export interface StudentQuizRecord {
  quizId: string;
  quizTitle: string;
  moduleTitle: string;
  scorePercent: number;
  totalQuestions: number;
  correctCount: number;
  status: 'Passed' | 'Failed';
  attemptDate: string;
  timeSpentMinutes: number;
  questions: StudentQuizQuestionDetail[];
}

export interface StudentAuditLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'AUTH' | 'VIDEO' | 'QUIZ' | 'NOTE' | 'SECURITY';
  description: string;
  ipAddress: string;
  device: string;
  severity: 'info' | 'warning' | 'success';
}

export interface StudentLoginSession {
  id: string;
  deviceType: 'Laptop' | 'Desktop' | 'Mobile' | 'Tablet';
  deviceName: string;
  os: string;
  browser: string;
  ipAddress: string;
  city: string;
  isp: string;
  loginTime: string;
  lastActive: string;
  status: 'Active' | 'Logged Out';
  isSuspicious?: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  batch: string;
  enrolledProducts: ('Recorded' | 'LiveZoom')[];
  progressPercent: number;
  completedLecturesCount: number;
  totalLecturesCount: number;
  status: 'Active' | 'Suspended' | 'Graduated';
  enrollmentDate: string;
  lastActive: string;
  avatarUrl?: string;
  lectureAnalytics?: StudentLectureAnalytics[];
  quizRecords?: StudentQuizRecord[];
  notesList?: StudentNote[];
  auditLogs?: StudentAuditLog[];
  loginSessions?: StudentLoginSession[];
}

export interface Batch {
  id: string;
  code: string;
  name: string;
  schedule: string;
  studentCount: number;
  maxStudents: number;
  startDate: string;
  instructor: string;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface AttendanceEntry {
  studentId: string;
  studentName: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface PaymentVerification {
  id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  productType: string;
  amountPKR: number;
  originalAmountPKR?: number;
  promoCode?: string;
  discountPKR?: number;
  paymentMethod: 'Bank Transfer' | 'Raast' | 'EasyPaisa' | 'JazzCash';
  bankName?: string;
  transactionReference: string;
  submittedAt: string;
  proofDocumentUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: 'Income' | 'Expense' | 'Refund';
  category: string;
  description: string;
  amountPKR: number;
  referenceNumber: string;
  paymentMethod: string;
  status: 'Completed' | 'Pending' | 'Processing';
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: 'Instructor Honorarium' | 'Zoom Licenses' | 'Cloud Infrastructure' | 'Marketing' | 'Operations';
  description: string;
  amountPKR: number;
  approvedBy: string;
  receiptNumber: string;
}

export interface RefundRecord {
  id: string;
  date: string;
  studentName: string;
  transactionRef: string;
  amountPKR: number;
  reason: string;
  status: 'Processed' | 'Pending Review';
}

export interface Certificate {
  id: string;
  credentialCode: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  issueDate: string;
  scorePercent: number;
  instructorName: string;
  verified: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  targetAudience: 'All' | 'Recorded Students' | 'Live Cohort 8' | 'Managers Only';
  priority: 'Normal' | 'Important' | 'Urgent';
  postedAt: string;
  author: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}
