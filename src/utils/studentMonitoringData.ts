import {
  Student,
  StudentLectureAnalytics,
  StudentQuizRecord,
  StudentAuditLog,
  StudentLoginSession,
  StudentNote,
} from '../types';

export const MOCK_STUDENT_DETAILED_DATA: Record<
  string,
  {
    lectureAnalytics: StudentLectureAnalytics[];
    quizRecords: StudentQuizRecord[];
    notesList: StudentNote[];
    auditLogs: StudentAuditLog[];
    loginSessions: StudentLoginSession[];
  }
> = {
  // 1. Hamza Malik (Senior Operations Manager - Cohort 8)
  'stu-101': {
    lectureAnalytics: [
      {
        lectureId: 'lec-101',
        lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 45,
        watchPercent: 100,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '45 mins (Full playback)',
        playbackSpeed: '1.25x',
        skippedSegments: [],
        rewatchedSegments: ['Rewatched 12:15 → 16:40 (Differentiating operational effectiveness) [x2]'],
        lastWatchedAt: '2026-10-18 11:20 PKT',
      },
      {
        lectureId: 'lec-102',
        lectureTitle: '02. Industry Structure & Porter’s Five Forces',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 52,
        watchPercent: 78,
        watchStatus: 'Partially Watched',
        totalWatchTimeFormatted: '40 mins 35 secs',
        playbackSpeed: '1.5x',
        skippedSegments: [
          {
            fromFormatted: '04:15',
            toFormatted: '08:30',
            duration: '4m 15s',
            fromSeconds: 255,
            toSeconds: 510,
            reason: 'Fast-forwarded: Introductory textbook definitions of buyer power',
          },
          {
            fromFormatted: '22:00',
            toFormatted: '26:10',
            duration: '4m 10s',
            fromSeconds: 1320,
            toSeconds: 1570,
            reason: 'Bypassed: Regional retail case background overview',
          },
          {
            fromFormatted: '48:10',
            toFormatted: '52:00',
            duration: '3m 50s',
            fromSeconds: 2890,
            toSeconds: 3120,
            reason: 'Skipped closing summary credits',
          },
        ],
        rewatchedSegments: ['Rewatched 14:00 → 18:30 (Supplier leverage equation) [x1]'],
        lastWatchedAt: '2026-10-24 19:45 PKT',
      },
      {
        lectureId: 'lec-103',
        lectureTitle: '03. Value Chain Analysis & Margin Optimization',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 48,
        watchPercent: 95,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '45 mins 40 secs',
        playbackSpeed: '1.0x',
        skippedSegments: [
          {
            fromFormatted: '00:00',
            toFormatted: '02:20',
            duration: '2m 20s',
            fromSeconds: 0,
            toSeconds: 140,
            reason: 'Skipped introductory title splash screen & overview recap',
          },
        ],
        rewatchedSegments: ['Rewatched 28:00 → 33:15 (Inbound logistics cost drivers) [x3]'],
        lastWatchedAt: '2026-10-29 21:10 PKT',
      },
      {
        lectureId: 'lec-104',
        lectureTitle: '04. Blue Ocean Strategy & Market Creation',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 55,
        watchPercent: 62,
        watchStatus: 'Partially Watched',
        totalWatchTimeFormatted: '34 mins 10 secs',
        playbackSpeed: '1.5x',
        skippedSegments: [
          {
            fromFormatted: '11:30',
            toFormatted: '19:40',
            duration: '8m 10s',
            fromSeconds: 690,
            toSeconds: 1180,
            reason: 'Fast-forwarded: Red Ocean rivalry matrix historical slides',
          },
          {
            fromFormatted: '35:20',
            toFormatted: '47:50',
            duration: '12m 30s',
            fromSeconds: 2120,
            toSeconds: 2870,
            reason: 'Skipped: Detailed international case study breakdown',
          },
        ],
        rewatchedSegments: [],
        lastWatchedAt: 'Today, 09:30 AM',
      },
      {
        lectureId: 'lec-201',
        lectureTitle: '05. Financial Statements Dissection for Non-Finance Executives',
        moduleTitle: 'Module 2: Corporate Finance',
        durationMinutes: 60,
        watchPercent: 100,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '60 mins',
        playbackSpeed: '1.0x',
        skippedSegments: [],
        rewatchedSegments: ['Rewatched 32:00 → 41:00 (Cash Conversion Cycle vs EBITDA) [x2]'],
        lastWatchedAt: '2026-11-01 14:15 PKT',
      },
      {
        lectureId: 'lec-202',
        lectureTitle: '06. Capital Budgeting: NPV, IRR & Payback Periods',
        moduleTitle: 'Module 2: Corporate Finance',
        durationMinutes: 65,
        watchPercent: 25,
        watchStatus: 'Partially Watched',
        totalWatchTimeFormatted: '16 mins 15 secs',
        playbackSpeed: '1.25x',
        skippedSegments: [
          {
            fromFormatted: '08:00',
            toFormatted: '14:20',
            duration: '6m 20s',
            fromSeconds: 480,
            toSeconds: 860,
            reason: 'Skipped theoretical WACC derivations',
          },
        ],
        rewatchedSegments: [],
        lastWatchedAt: 'Yesterday, 10:14 AM',
      },
      {
        lectureId: 'lec-203',
        lectureTitle: '07. Working Capital Management & Cash Conversion Cycle',
        moduleTitle: 'Module 2: Corporate Finance',
        durationMinutes: 48,
        watchPercent: 0,
        watchStatus: 'Not Started',
        totalWatchTimeFormatted: '0 mins',
        playbackSpeed: '1.0x',
        skippedSegments: [],
        lastWatchedAt: 'Never',
      },
    ],
    quizRecords: [
      {
        quizId: 'quiz-mod-1',
        quizTitle: 'Module 1 Assessment: Strategic Advantage & Industry Analysis',
        moduleTitle: 'Module 1: Strategic Analysis',
        scorePercent: 90,
        totalQuestions: 5,
        correctCount: 4.5,
        status: 'Passed',
        attemptDate: '2026-10-28 16:30 PKT',
        timeSpentMinutes: 14,
        questions: [
          {
            questionText:
              'According to Porter’s Five Forces, which of the following market conditions creates the highest supplier bargaining power?',
            studentOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
            correctOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
            isCorrect: true,
            explanation:
              'High differentiation and high switching costs prevent buyers from substituting, giving suppliers tremendous pricing leverage.',
          },
          {
            questionText: 'What fundamental distinction separates strategic positioning from operational effectiveness?',
            studentOption: 'Strategic positioning is performing different activities than rivals, or similar activities in different ways',
            correctOption: 'Strategic positioning is performing different activities than rivals, or similar activities in different ways',
            isCorrect: true,
            explanation:
              'Operational effectiveness is performing similar activities better. Strategic positioning delivers unique value through deliberate trade-offs.',
          },
          {
            questionText: 'In Porter’s Value Chain framework, which of the following is classified as a PRIMARY activity?',
            studentOption: 'Inbound Logistics & Operations',
            correctOption: 'Inbound Logistics & Operations',
            isCorrect: true,
            explanation:
              'Primary activities directly involve physical creation, sale, maintenance and support of a product (Inbound Logistics, Operations, Outbound, Marketing, Service).',
          },
          {
            questionText: 'Which strategic mechanism is at the heart of Blue Ocean Strategy?',
            studentOption: 'Simultaneous pursuit of differentiation and low cost (Value Innovation)',
            correctOption: 'Simultaneous pursuit of differentiation and low cost (Value Innovation)',
            isCorrect: true,
            explanation:
              'Value innovation breaks the traditional value-cost trade-off by driving down costs while driving up value for buyers.',
          },
          {
            questionText: 'What industry condition most severely accelerates destructive price-discounting wars?',
            studentOption: 'Low fixed costs and rapid industry growth',
            correctOption: 'High fixed costs, high exit barriers, and slow market growth',
            isCorrect: false,
            explanation:
              'When fixed costs and exit barriers are high, firms cannot easily leave and must run capacity at all costs, resulting in aggressive price cutting.',
          },
        ],
      },
      {
        quizId: 'quiz-mod-2',
        quizTitle: 'Module 2 Assessment: Financial Modeling & Working Capital',
        moduleTitle: 'Module 2: Corporate Finance',
        scorePercent: 80,
        totalQuestions: 5,
        correctCount: 4,
        status: 'Passed',
        attemptDate: '2026-11-01 17:15 PKT',
        timeSpentMinutes: 18,
        questions: [
          {
            questionText: 'Why is Net Present Value (NPV) theoretically superior to Internal Rate of Return (IRR)?',
            studentOption: 'NPV assumes reinvestment of cash flows at the firm’s actual cost of capital, whereas IRR assumes reinvestment at the IRR rate',
            correctOption: 'NPV assumes reinvestment of cash flows at the firm’s actual cost of capital, whereas IRR assumes reinvestment at the IRR rate',
            isCorrect: true,
            explanation:
              'Reinvesting at the cost of capital is realistic. IRR’s assumption of reinvestment at high internal rates distorts mutually exclusive project rankings.',
          },
          {
            questionText: 'How is the Cash Conversion Cycle (CCC) calculated?',
            studentOption: 'DIO (Days Inventory) + DSO (Days Sales Outstanding) - DPO (Days Payable Outstanding)',
            correctOption: 'DIO (Days Inventory) + DSO (Days Sales Outstanding) - DPO (Days Payable Outstanding)',
            isCorrect: true,
            explanation:
              'CCC measures how long cash is tied up in working capital from inventory purchase to cash collection from customers.',
          },
          {
            questionText: 'Which non-cash expense is added back to Net Income to derive Operating Cash Flow?',
            studentOption: 'Depreciation & Amortization',
            correctOption: 'Depreciation & Amortization',
            isCorrect: true,
            explanation:
              'Depreciation is an accounting accrual that reduced net income but involved no immediate cash outflow.',
          },
          {
            questionText: 'If a company has high EBITDA but negative Operating Cash Flow, what is the most likely cause?',
            studentOption: 'Excessive working capital absorption due to ballooning receivables or unsellable inventory',
            correctOption: 'Excessive working capital absorption due to ballooning receivables or unsellable inventory',
            isCorrect: true,
            explanation:
              'Revenue recognized without cash collection increases paper EBITDA while cash remains locked in unpaid debtor balances.',
          },
          {
            questionText: 'Under high inflation and currency depreciation, what adjustment must be made to the discount rate?',
            studentOption: 'Discount rate should be lowered to stimulate project approvals',
            correctOption: 'Cost of equity and debt must be adjusted upward using Fisher equation to incorporate expected inflation risk premium',
            isCorrect: false,
            explanation:
              'Discount rates must reflect real hurdle expectations plus an inflation and sovereign risk premium to avoid value-destroying investments.',
          },
        ],
      },
    ],
    notesList: [
      {
        id: 'note-h-1',
        lectureId: 'lec-101',
        lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
        timestampSeconds: 765,
        content:
          'Operational effectiveness vs Strategic positioning: Operational improvements are easily copied by Pakistani rivals within 6-12 months. True advantage requires non-substitutable activities.',
        tags: ['Strategy', 'CompetitiveMoat'],
        updatedAt: '2026-10-18 11:35 PKT',
      },
      {
        id: 'note-h-2',
        lectureId: 'lec-102',
        lectureTitle: '02. Industry Structure & Porter’s Five Forces',
        timestampSeconds: 980,
        content:
          'Key insight on supplier power in manufacturing: Single-sourcing high-grade packaging materials from abroad leaves gross margins vulnerable to dollar exchange rate shocks.',
        tags: ['SupplyChain', 'RiskMitigation'],
        updatedAt: '2026-10-24 20:05 PKT',
      },
      {
        id: 'note-h-3',
        lectureId: 'lec-103',
        lectureTitle: '03. Value Chain Analysis & Margin Optimization',
        timestampSeconds: 1845,
        content:
          'Working capital equation: DSO + DIO - DPO. Renegotiating payment terms from 30 days to 60 days on raw materials yields instant 18M PKR liquidity buffer for plant operations.',
        tags: ['Finance', 'WorkingCapital'],
        updatedAt: '2026-10-29 21:40 PKT',
      },
      {
        id: 'note-h-4',
        lectureId: 'lec-201',
        lectureTitle: '05. Financial Statements Dissection',
        timestampSeconds: 2210,
        content:
          'EBITDA is vanity, Cash is sanity. Check Cash Flow from Operations line before approving any capital expenditure expansion proposal.',
        tags: ['FinancialAudit', 'BoardroomRule'],
        updatedAt: '2026-11-01 14:45 PKT',
      },
    ],
    auditLogs: [
      {
        id: 'aud-101',
        timestamp: '2026-11-03 10:14:02 PKT',
        action: 'AUTHENTICATION_SUCCESS',
        category: 'AUTH',
        description: 'User authenticated successfully via Web Browser (Chrome 131 on Windows 11)',
        ipAddress: '182.185.122.45',
        device: 'Dell XPS 15 (Laptop)',
        severity: 'info',
      },
      {
        id: 'aud-102',
        timestamp: '2026-11-03 10:16:45 PKT',
        action: 'VIDEO_SEEK_FORWARD',
        category: 'VIDEO',
        description: 'Bypassed 8m 10s (from 11:30 to 19:40) in Lecture 04: Blue Ocean Strategy',
        ipAddress: '182.185.122.45',
        device: 'Dell XPS 15 (Laptop)',
        severity: 'warning',
      },
      {
        id: 'aud-103',
        timestamp: '2026-11-03 10:28:10 PKT',
        action: 'PLAYBACK_SPEED_ALTERED',
        category: 'VIDEO',
        description: 'Changed player playback speed multiplier to 1.5x',
        ipAddress: '182.185.122.45',
        device: 'Dell XPS 15 (Laptop)',
        severity: 'info',
      },
      {
        id: 'aud-104',
        timestamp: '2026-11-02 21:15:30 PKT',
        action: 'AUTHENTICATION_SUCCESS',
        category: 'AUTH',
        description: 'User logged in via Safari on Apple iPhone 15 Pro (iOS 18.1)',
        ipAddress: '39.42.18.90',
        device: 'Apple iPhone 15 Pro (Mobile)',
        severity: 'info',
      },
      {
        id: 'aud-105',
        timestamp: '2026-11-02 21:34:22 PKT',
        action: 'ASSESSMENT_SUBMITTED',
        category: 'QUIZ',
        description: 'Completed Module 1 Assessment with score 90% (4.5/5 Marks) - Result: PASSED',
        ipAddress: '39.42.18.90',
        device: 'Apple iPhone 15 Pro (Mobile)',
        severity: 'success',
      },
      {
        id: 'aud-106',
        timestamp: '2026-11-01 14:46:12 PKT',
        action: 'STUDY_NOTE_SAVED',
        category: 'NOTE',
        description: 'Created timestamped private study note at 36:50 in Lecture 05: Financial Dissection',
        ipAddress: '182.185.122.45',
        device: 'Dell XPS 15 (Laptop)',
        severity: 'info',
      },
      {
        id: 'aud-107',
        timestamp: '2026-10-31 18:20:00 PKT',
        action: 'CONCURRENT_LOGIN_DETECTED',
        category: 'SECURITY',
        description: 'Simultaneous login detected from IP 111.119.187.3 (Islamabad) while active session in Lahore',
        ipAddress: '111.119.187.3',
        device: 'Apple iPad Pro (Tablet)',
        severity: 'warning',
      },
    ],
    loginSessions: [
      {
        id: 'sess-101',
        deviceType: 'Laptop',
        deviceName: 'Dell XPS 15 (Windows 11 Pro 64-bit)',
        os: 'Windows 11 Build 22631',
        browser: 'Google Chrome 131.0.6778.86',
        ipAddress: '182.185.122.45',
        city: 'Lahore, Punjab',
        isp: 'PTCL Broadband (Pakistan Telecommunication Company)',
        loginTime: 'Today, 10:14 AM PKT',
        lastActive: 'Active Now (Streaming Lecture 04)',
        status: 'Active',
      },
      {
        id: 'sess-102',
        deviceType: 'Mobile',
        deviceName: 'Apple iPhone 15 Pro (A2848)',
        os: 'iOS 18.1.0',
        browser: 'Mobile Safari 18.1',
        ipAddress: '39.42.18.90',
        city: 'Karachi, Sindh',
        isp: 'Jazz 4G LTE (Pakistan Mobile Communications Ltd)',
        loginTime: 'Yesterday, 09:15 PM PKT',
        lastActive: 'Yesterday, 10:02 PM PKT',
        status: 'Logged Out',
      },
      {
        id: 'sess-103',
        deviceType: 'Tablet',
        deviceName: 'Apple iPad Pro 11-inch (M4)',
        os: 'iPadOS 17.5.1',
        browser: 'Safari Mobile 17.5',
        ipAddress: '111.119.187.3',
        city: 'Islamabad, Capital Territory',
        isp: 'Nayatel Fiber Gigabit Network',
        loginTime: '2026-10-31 18:20 PKT',
        lastActive: '2026-10-31 19:40 PKT',
        status: 'Logged Out',
        isSuspicious: true,
      },
    ],
  },

  // 2. Ayesha Khan (Commercial Lead - High Achiever)
  'stu-102': {
    lectureAnalytics: [
      {
        lectureId: 'lec-101',
        lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 45,
        watchPercent: 100,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '45 mins (Full playback)',
        playbackSpeed: '1.0x',
        skippedSegments: [],
        rewatchedSegments: ['Rewatched 20:00 → 25:30 [x1]'],
        lastWatchedAt: '2026-09-12 18:00 PKT',
      },
      {
        lectureId: 'lec-102',
        lectureTitle: '02. Industry Structure & Porter’s Five Forces',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 52,
        watchPercent: 100,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '52 mins',
        playbackSpeed: '1.0x',
        skippedSegments: [],
        rewatchedSegments: ['Rewatched 15:00 → 22:00 [x2]'],
        lastWatchedAt: '2026-09-15 20:30 PKT',
      },
      {
        lectureId: 'lec-103',
        lectureTitle: '03. Value Chain Analysis & Margin Optimization',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 48,
        watchPercent: 100,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '48 mins',
        playbackSpeed: '1.25x',
        skippedSegments: [],
        rewatchedSegments: [],
        lastWatchedAt: '2026-09-18 21:00 PKT',
      },
      {
        lectureId: 'lec-104',
        lectureTitle: '04. Blue Ocean Strategy & Market Creation',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 55,
        watchPercent: 96,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '53 mins',
        playbackSpeed: '1.0x',
        skippedSegments: [
          {
            fromFormatted: '00:00',
            toFormatted: '02:00',
            duration: '2m 00s',
            fromSeconds: 0,
            toSeconds: 120,
            reason: 'Skipped introductory music & slide intro',
          },
        ],
        rewatchedSegments: [],
        lastWatchedAt: '2026-09-22 19:15 PKT',
      },
      {
        lectureId: 'lec-201',
        lectureTitle: '05. Financial Statements Dissection',
        moduleTitle: 'Module 2: Corporate Finance',
        durationMinutes: 60,
        watchPercent: 100,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '60 mins',
        playbackSpeed: '1.0x',
        skippedSegments: [],
        rewatchedSegments: ['Rewatched 40:00 → 49:00 (Balance sheet health check) [x2]'],
        lastWatchedAt: '2026-10-02 22:00 PKT',
      },
    ],
    quizRecords: [
      {
        quizId: 'quiz-mod-1',
        quizTitle: 'Module 1 Assessment: Strategic Advantage',
        moduleTitle: 'Module 1: Strategic Analysis',
        scorePercent: 100,
        totalQuestions: 5,
        correctCount: 5,
        status: 'Passed',
        attemptDate: '2026-09-25 15:40 PKT',
        timeSpentMinutes: 11,
        questions: [
          {
            questionText: 'According to Porter’s Five Forces, which market condition creates highest supplier power?',
            studentOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
            correctOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
            isCorrect: true,
            explanation: 'Correct answer selected.',
          },
          {
            questionText: 'What fundamental distinction separates strategic positioning from operational effectiveness?',
            studentOption: 'Strategic positioning is performing different activities than rivals, or similar activities in different ways',
            correctOption: 'Strategic positioning is performing different activities than rivals, or similar activities in different ways',
            isCorrect: true,
            explanation: 'Correct answer selected.',
          },
          {
            questionText: 'In Porter’s Value Chain framework, which of the following is classified as a PRIMARY activity?',
            studentOption: 'Inbound Logistics & Operations',
            correctOption: 'Inbound Logistics & Operations',
            isCorrect: true,
            explanation: 'Correct answer selected.',
          },
          {
            questionText: 'Which strategic mechanism is at the heart of Blue Ocean Strategy?',
            studentOption: 'Simultaneous pursuit of differentiation and low cost (Value Innovation)',
            correctOption: 'Simultaneous pursuit of differentiation and low cost (Value Innovation)',
            isCorrect: true,
            explanation: 'Correct answer selected.',
          },
          {
            questionText: 'What industry condition most severely accelerates destructive price-discounting wars?',
            studentOption: 'High fixed costs, high exit barriers, and slow market growth',
            correctOption: 'High fixed costs, high exit barriers, and slow market growth',
            isCorrect: true,
            explanation: 'Correct answer selected.',
          },
        ],
      },
    ],
    notesList: [
      {
        id: 'note-a-1',
        lectureId: 'lec-102',
        lectureTitle: '02. Industry Structure & Porter’s Five Forces',
        timestampSeconds: 1200,
        content: 'FMCG distribution network represents our core moat against imported foreign brands.',
        tags: ['FMCG', 'Strategy'],
        updatedAt: '2026-09-15 21:00 PKT',
      },
    ],
    auditLogs: [
      {
        id: 'aud-201',
        timestamp: '2026-11-02 20:45:10 PKT',
        action: 'AUTHENTICATION_SUCCESS',
        category: 'AUTH',
        description: 'Login via Apple MacBook Pro 16 (macOS Sequoia) from StormFiber Karachi',
        ipAddress: '175.107.214.12',
        device: 'MacBook Pro 16 (Laptop)',
        severity: 'info',
      },
    ],
    loginSessions: [
      {
        id: 'sess-201',
        deviceType: 'Laptop',
        deviceName: 'Apple MacBook Pro 16 (Apple M3 Max)',
        os: 'macOS Sequoia 15.1',
        browser: 'Safari 18.1',
        ipAddress: '175.107.214.12',
        city: 'Karachi, Sindh',
        isp: 'StormFiber (Cybernet Internet Services)',
        loginTime: 'Yesterday, 08:45 PM PKT',
        lastActive: 'Yesterday, 10:30 PM PKT',
        status: 'Active',
      },
    ],
  },

  // 3. Bilal Siddiqui (Self-Paced Tech Founder)
  'stu-103': {
    lectureAnalytics: [
      {
        lectureId: 'lec-101',
        lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 45,
        watchPercent: 100,
        watchStatus: 'Completed',
        totalWatchTimeFormatted: '45 mins',
        playbackSpeed: '1.75x',
        skippedSegments: [],
        rewatchedSegments: [],
        lastWatchedAt: '2026-10-05 23:10 PKT',
      },
      {
        lectureId: 'lec-102',
        lectureTitle: '02. Industry Structure & Porter’s Five Forces',
        moduleTitle: 'Module 1: Strategic Analysis',
        durationMinutes: 52,
        watchPercent: 55,
        watchStatus: 'Partially Watched',
        totalWatchTimeFormatted: '28 mins 30 secs',
        playbackSpeed: '2.0x',
        skippedSegments: [
          {
            fromFormatted: '15:00',
            toFormatted: '38:30',
            duration: '23m 30s',
            fromSeconds: 900,
            toSeconds: 2310,
            reason: 'Heavy fast-forward through traditional manufacturing case studies',
          },
        ],
        rewatchedSegments: [],
        lastWatchedAt: '2026-10-14 02:40 PKT',
      },
    ],
    quizRecords: [
      {
        quizId: 'quiz-mod-1',
        quizTitle: 'Module 1 Assessment: Strategic Advantage',
        moduleTitle: 'Module 1: Strategic Analysis',
        scorePercent: 70,
        totalQuestions: 5,
        correctCount: 3.5,
        status: 'Passed',
        attemptDate: '2026-10-15 03:10 PKT',
        timeSpentMinutes: 8,
        questions: [
          {
            questionText: 'According to Porter’s Five Forces, which market condition creates highest supplier power?',
            studentOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
            correctOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
            isCorrect: true,
            explanation: 'Correct answer selected.',
          },
          {
            questionText: 'What fundamental distinction separates strategic positioning from operational effectiveness?',
            studentOption: 'Operational effectiveness is identical to strategic positioning',
            correctOption: 'Strategic positioning is performing different activities than rivals, or similar activities in different ways',
            isCorrect: false,
            explanation: 'Operational effectiveness is not strategic positioning.',
          },
        ],
      },
    ],
    notesList: [
      {
        id: 'note-b-1',
        lectureId: 'lec-101',
        lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
        timestampSeconds: 540,
        content: 'Software venture unit economics: LTV / CAC ratio must exceed 3.5x before scaling sales outreach.',
        tags: ['SaaS', 'StartupValuation'],
        updatedAt: '2026-10-05 23:25 PKT',
      },
    ],
    auditLogs: [
      {
        id: 'aud-301',
        timestamp: '2026-10-31 02:12:00 PKT',
        action: 'AUTHENTICATION_SUCCESS',
        category: 'AUTH',
        description: 'Login via Lenovo ThinkPad (Ubuntu Linux 24.04) from Nayatel Islamabad',
        ipAddress: '111.68.102.15',
        device: 'Lenovo ThinkPad X1 Carbon (Laptop)',
        severity: 'info',
      },
    ],
    loginSessions: [
      {
        id: 'sess-301',
        deviceType: 'Laptop',
        deviceName: 'Lenovo ThinkPad X1 Carbon (Ubuntu Linux)',
        os: 'Ubuntu 24.04 LTS (x86_64)',
        browser: 'Firefox 132.0',
        ipAddress: '111.68.102.15',
        city: 'Islamabad, ICT',
        isp: 'Nayatel Fiber Gigabit',
        loginTime: '3 days ago, 02:12 AM PKT',
        lastActive: '3 days ago, 04:10 AM PKT',
        status: 'Logged Out',
      },
    ],
  },
};

// Fallback generator for other students so every student has full rich inspection data
export function getStudentMonitoringDetails(student: Student) {
  const existing = MOCK_STUDENT_DETAILED_DATA[student.id];
  if (existing) {
    return existing;
  }

  // Generate realistic generic data for students without specific mocks
  const defaultAnalytics: StudentLectureAnalytics[] = [
    {
      lectureId: 'lec-101',
      lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
      moduleTitle: 'Module 1: Strategic Analysis',
      durationMinutes: 45,
      watchPercent: student.progressPercent > 50 ? 100 : student.progressPercent * 2,
      watchStatus: student.progressPercent > 50 ? 'Completed' : 'Partially Watched',
      totalWatchTimeFormatted: `${Math.round(45 * (student.progressPercent / 100))} mins`,
      playbackSpeed: '1.25x',
      skippedSegments:
        student.progressPercent < 80
          ? [
              {
                fromFormatted: '05:10',
                toFormatted: '09:40',
                duration: '4m 30s',
                fromSeconds: 310,
                toSeconds: 580,
                reason: 'Fast-forward seek during case study introduction',
              },
            ]
          : [],
      rewatchedSegments: ['Rewatched 18:20 → 21:00 [x1]'],
      lastWatchedAt: student.lastActive,
    },
    {
      lectureId: 'lec-102',
      lectureTitle: '02. Industry Structure & Porter’s Five Forces',
      moduleTitle: 'Module 1: Strategic Analysis',
      durationMinutes: 52,
      watchPercent: student.completedLecturesCount >= 2 ? 100 : 35,
      watchStatus: student.completedLecturesCount >= 2 ? 'Completed' : 'Partially Watched',
      totalWatchTimeFormatted: student.completedLecturesCount >= 2 ? '52 mins' : '18 mins 12 secs',
      playbackSpeed: '1.0x',
      skippedSegments: [
        {
          fromFormatted: '12:00',
          toFormatted: '17:30',
          duration: '5m 30s',
          fromSeconds: 720,
          toSeconds: 1050,
          reason: 'Skipped theoretical slides on buyer concentration',
        },
      ],
      lastWatchedAt: student.lastActive,
    },
  ];

  const defaultQuizzes: StudentQuizRecord[] = [
    {
      quizId: 'quiz-mod-1',
      quizTitle: 'Module 1 Assessment: Strategic Advantage',
      moduleTitle: 'Module 1: Strategic Analysis',
      scorePercent: student.progressPercent > 60 ? 80 : 60,
      totalQuestions: 5,
      correctCount: student.progressPercent > 60 ? 4 : 3,
      status: student.progressPercent >= 50 ? 'Passed' : 'Failed',
      attemptDate: student.enrollmentDate,
      timeSpentMinutes: 15,
      questions: [
        {
          questionText: 'According to Porter’s Five Forces, which market condition creates highest supplier power?',
          studentOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
          correctOption: 'Suppliers supply highly differentiated inputs with substantial switching costs',
          isCorrect: true,
          explanation: 'High differentiation and switching costs create supplier pricing leverage.',
        },
        {
          questionText: 'What fundamental distinction separates strategic positioning from operational effectiveness?',
          studentOption:
            student.progressPercent > 60
              ? 'Strategic positioning is performing different activities than rivals, or similar activities in different ways'
              : 'Operational effectiveness is the same as strategic positioning',
          correctOption: 'Strategic positioning is performing different activities than rivals, or similar activities in different ways',
          isCorrect: student.progressPercent > 60,
          explanation: 'Operational effectiveness is performing similar activities better; strategic positioning delivers unique value.',
        },
      ],
    },
  ];

  const defaultNotes: StudentNote[] = [
    {
      id: `note-${student.id}-1`,
      lectureId: 'lec-101',
      lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
      timestampSeconds: 840,
      content: 'Key takeaway on market dynamics and strategic positioning vs operational effectiveness.',
      tags: ['Strategy', 'Notes'],
      updatedAt: student.enrollmentDate,
    },
  ];

  const defaultAuditLogs: StudentAuditLog[] = [
    {
      id: `aud-${student.id}-1`,
      timestamp: `${student.enrollmentDate} 10:00:00 PKT`,
      action: 'ENROLLMENT_CONFIRMED',
      category: 'AUTH',
      description: 'Account activated for Executive Business Management Program',
      ipAddress: '182.185.90.14',
      device: 'Mobile (Android/iOS)',
      severity: 'success',
    },
    {
      id: `aud-${student.id}-2`,
      timestamp: `${student.lastActive}`,
      action: 'AUTHENTICATION_SUCCESS',
      category: 'AUTH',
      description: `User signed in from ${student.status === 'Suspended' ? 'Unrecognized IP' : 'Authorized Device'}`,
      ipAddress: student.status === 'Suspended' ? '203.124.45.99' : '182.185.90.14',
      device: student.status === 'Suspended' ? 'Unknown Linux Client' : 'HP Pavilion 15 (Windows Laptop)',
      severity: student.status === 'Suspended' ? 'warning' : 'info',
    },
  ];

  const defaultLoginSessions: StudentLoginSession[] = [
    {
      id: `sess-${student.id}-1`,
      deviceType: student.id === 'stu-104' ? 'Mobile' : 'Laptop',
      deviceName: student.id === 'stu-104' ? 'Samsung Galaxy S24 Ultra (Android 14)' : 'HP Pavilion 15 (Windows 11)',
      os: student.id === 'stu-104' ? 'Android 14 (OneUI 6.1)' : 'Windows 11 Home',
      browser: student.id === 'stu-104' ? 'Chrome Mobile 131.0' : 'Microsoft Edge 131.0',
      ipAddress: student.status === 'Suspended' ? '203.124.45.99' : '182.185.90.14',
      city: 'Lahore, Punjab',
      isp: 'PTCL Broadband (DSL/Fiber)',
      loginTime: student.lastActive,
      lastActive: student.lastActive,
      status: student.status === 'Active' ? 'Active' : 'Logged Out',
      isSuspicious: student.status === 'Suspended',
    },
  ];

  return {
    lectureAnalytics: defaultAnalytics,
    quizRecords: defaultQuizzes,
    notesList: defaultNotes,
    auditLogs: defaultAuditLogs,
    loginSessions: defaultLoginSessions,
  };
}

