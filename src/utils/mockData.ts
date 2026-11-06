import {
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
} from '../types';

export const INITIAL_COURSE: Course = {
  id: 'course-bm-01',
  title: 'Executive Business Management & Strategy',
  slug: 'executive-business-management-strategy',
  tagline: 'Master corporate strategy, financial valuation, operations, and executive leadership.',
  description:
    'A comprehensive, real-world business program crafted for high-performing professionals, founders, and managers. Designed around case studies from Pakistani enterprises and global multinationals, bridging academic theory with boardroom execution.',
  pricePKR: 15000,
  totalHours: 42,
  totalLectures: 24,
  rating: 4.9,
  reviewsCount: 384,
  instructorName: 'Prof. Tariq Amin',
  instructorRole: 'Former Strategy Director at Engro & Senior Corporate Advisor',
  instructorBio:
    'Over 18 years leading multi-million dollar business transformations, M&A integrations, and executive development across South Asia and the Middle East. Alumnus of LUMS & INSEAD.',
  modules: [
    {
      id: 'mod-1',
      number: 1,
      title: 'Strategic Analysis & Competitive Advantage',
      description: 'Understanding industry dynamics, Porter five forces, value chain mapping, and sustainable differentiation.',
      lectures: [
        {
          id: 'lec-101',
          moduleId: 'mod-1',
          title: '01. Fundamentals of Modern Corporate Strategy',
          durationMinutes: 45,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Introduction to strategic intent, mission alignment, and diagnosing external market turbulence in competitive economies.',
          keyTakeaways: [
            'Differentiate operational effectiveness from strategic positioning',
            'Define core competencies that withstand margin erosion',
            'Framework for continuous environmental scanning'
          ],
          resources: [
            { title: 'Lecture 01 Slides Deck (PDF)', type: 'pdf', size: '3.4 MB', url: '#' },
            { title: 'Strategy Formulation Workbook', type: 'xlsx', size: '1.2 MB', url: '#' }
          ],
          isCompleted: true,
          isLocked: false
        },
        {
          id: 'lec-102',
          moduleId: 'mod-1',
          title: '02. Industry Structure & Porter’s Five Forces',
          durationMinutes: 52,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Deep dive into supplier leverage, buyer power, barrier to entry, substitute threat, and rivalry intensity with practical FMCG case studies.',
          keyTakeaways: [
            'Mapping supplier concentration versus buyer sensitivity',
            'Defensive moat creation against low-cost entrants',
            'Applying Five Forces to emerging digital platforms'
          ],
          resources: [
            { title: 'Industry Structural Analysis Template', type: 'xlsx', size: '890 KB', url: '#' }
          ],
          isCompleted: true,
          isLocked: false
        },
        {
          id: 'lec-103',
          moduleId: 'mod-1',
          title: '03. Value Chain Analysis & Margin Optimization',
          durationMinutes: 48,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Deconstructing primary and secondary activities to unearth hidden cost drivers and unique value differentiators.',
          keyTakeaways: [
            'Identifying high-margin activity hubs across inbound and outbound logistics',
            'Cross-functional synergy between procurement and technology infrastructure'
          ],
          resources: [
            { title: 'Value Chain Mapping Grid', type: 'pdf', size: '1.8 MB', url: '#' }
          ],
          isCompleted: true,
          isLocked: false
        },
        {
          id: 'lec-104',
          moduleId: 'mod-1',
          title: '04. Blue Ocean Strategy & Market Creation',
          durationMinutes: 55,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          description: 'Escaping red ocean bloodbaths by reconstructing market boundaries and pursuing value innovation simultaneously.',
          keyTakeaways: [
            'Strategy Canvas and Four Actions Framework (Eliminate, Reduce, Raise, Create)',
            'Case Study: How regional fintech disruptors unbundled traditional commercial banking'
          ],
          resources: [
            { title: 'Strategy Canvas Template (PPTX)', type: 'pdf', size: '2.1 MB', url: '#' }
          ],
          isCompleted: false,
          isLocked: false
        }
      ]
    },
    {
      id: 'mod-2',
      number: 2,
      title: 'Corporate Financial Decision-Making & Valuation',
      description: 'Capital budgeting, DCF valuation, working capital optimization, and financial statement ratio analysis.',
      lectures: [
        {
          id: 'lec-201',
          moduleId: 'mod-2',
          title: '05. Financial Statements Dissection for Non-Finance Executives',
          durationMinutes: 60,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          description: 'Navigating Income Statements, Balance Sheets, and Cash Flow Statements to diagnose business health beyond vanity metrics.',
          keyTakeaways: [
            'The critical difference between EBITDA, operating cash flow, and free cash flow',
            'Working capital cycle anomalies that signal liquidity traps'
          ],
          resources: [
            { title: 'Three-Statement Financial Model (Excel)', type: 'xlsx', size: '4.8 MB', url: '#' },
            { title: 'Balance Sheet Health Checklist', type: 'pdf', size: '920 KB', url: '#' }
          ],
          isCompleted: true,
          isLocked: false
        },
        {
          id: 'lec-202',
          moduleId: 'mod-2',
          title: '06. Capital Budgeting: NPV, IRR & Payback Periods',
          durationMinutes: 65,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
          description: 'Rigorous investment appraisal tools. How to calculate hurdle rates, discount cash flows, and compare mutually exclusive capital projects.',
          keyTakeaways: [
            'Weighted Average Cost of Capital (WACC) computation in high inflation regimes',
            'Why NPV always trumps IRR in capital rationing scenarios'
          ],
          resources: [
            { title: 'NPV & IRR Dynamic Calculator (Excel)', type: 'xlsx', size: '2.3 MB', url: '#' }
          ],
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'lec-203',
          moduleId: 'mod-2',
          title: '07. Working Capital Management & Cash Conversion Cycle',
          durationMinutes: 48,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          description: 'Optimizing Days Sales Outstanding (DSO), Inventory Turnover, and Payable cycles to unlock internal cash liquidity.',
          keyTakeaways: [
            'Strategies for renegotiating credit terms with vendors',
            'Safety stock formulas balancing stockout risk with holding costs'
          ],
          resources: [
            { title: 'Cash Flow Forecast 13-Week Model', type: 'xlsx', size: '1.9 MB', url: '#' }
          ],
          isCompleted: false,
          isLocked: false
        }
      ]
    },
    {
      id: 'mod-3',
      number: 3,
      title: 'Operations, Lean Systems & Supply Chain Resilience',
      description: 'Streamlining processes, Six Sigma bottlenecks, demand forecasting, and vendor lifecycle management.',
      lectures: [
        {
          id: 'lec-301',
          moduleId: 'mod-3',
          title: '08. Process Bottlenecks & Theory of Constraints',
          durationMinutes: 50,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'Goldratt’s Theory of Constraints applied to manufacturing, logistics, and service delivery workflows.',
          keyTakeaways: [
            'Identify drum-buffer-rope synchronization points',
            'Cost implications of idle capacity versus starving the bottleneck'
          ],
          resources: [
            { title: 'Process Flow Audit Sheet', type: 'pdf', size: '1.4 MB', url: '#' }
          ],
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'lec-302',
          moduleId: 'mod-3',
          title: '09. Supply Chain Agility & Geopolitical Risk Mitigation',
          durationMinutes: 54,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
          description: 'Building dual-source vendor ecosystems, currency hedging for imports, and inventory buffers against macro shocks.',
          keyTakeaways: [
            'Total Cost of Ownership (TCO) calculation for foreign vs local sourcing',
            'Vendor scorecard metrics and SLA enforcement'
          ],
          resources: [
            { title: 'Vendor Audit & Scorecard Matrix', type: 'xlsx', size: '1.1 MB', url: '#' }
          ],
          isCompleted: false,
          isLocked: true
        }
      ]
    },
    {
      id: 'mod-4',
      number: 4,
      title: 'Executive Leadership, Governance & Change Execution',
      description: 'Culture engineering, Kotter’s 8-step transformation, boardroom ethics, and high-performance talent retention.',
      lectures: [
        {
          id: 'lec-401',
          moduleId: 'mod-4',
          title: '10. Leading Organizational Turnarounds & Change',
          durationMinutes: 62,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Psychological inertia, coalition building, communicating urgency, and anchoring changes into corporate culture.',
          keyTakeaways: [
            'Overcoming middle-management resistance with transparent incentive redesign',
            'Milestone governance frameworks that prevent initiative fatigue'
          ],
          resources: [
            { title: 'Kotter 8-Step Execution Blueprint', type: 'pdf', size: '2.5 MB', url: '#' }
          ],
          isCompleted: false,
          isLocked: true
        }
      ]
    }
  ]
};

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-01',
    title: 'Module 1 Assessment: Strategic Advantage & Industry Analysis',
    moduleTitle: 'Module 1: Strategic Analysis',
    description: 'Test your understanding of Porter’s Five Forces, Blue Ocean strategy, and value chain dynamics.',
    durationMinutes: 20,
    passingScorePercent: 70,
    questionsCount: 5,
    totalMarks: 50,
    status: 'Completed',
    lastScorePercent: 80,
    lastAttemptDate: '2026-10-24',
    questions: [
      {
        id: 'q-101',
        text: 'In Porter’s Five Forces framework, which factor increases the bargaining power of buyers?',
        category: 'Strategy',
        difficulty: 'Basic',
        options: [
          'High switching costs between competing vendors',
          'Products are undifferentiated standard commodities',
          'The buyer purchases in very small, irregular volumes',
          'Suppliers pose a credible threat of forward integration'
        ],
        correctOptionIndex: 1,
        explanation: 'When products are standardized or commoditized, buyers can easily play competitors against one another with negligible switching friction.'
      },
      {
        id: 'q-102',
        text: 'What is the primary objective of Blue Ocean Strategy according to Kim & Mauborgne?',
        category: 'Strategy',
        difficulty: 'Intermediate',
        options: [
          'Aggressively discounting prices to undercut existing incumbents in saturated markets',
          'Creating uncontested market space and making the competition irrelevant through value innovation',
          'Forming defensive cartel alliances with dominant industry suppliers',
          'Maximizing litigation against patent infringements'
        ],
        correctOptionIndex: 1,
        explanation: 'Blue Ocean Strategy focuses on unlocking new demand and offering superior buyer utility while simultaneously driving down costs.'
      },
      {
        id: 'q-103',
        text: 'Which of the following belongs to the primary activities of Porter’s Value Chain?',
        category: 'Operations',
        difficulty: 'Basic',
        options: [
          'Human Resource Management',
          'Technology Infrastructure Development',
          'Inbound Logistics',
          'Procurement of Enterprise Software'
        ],
        correctOptionIndex: 2,
        explanation: 'Inbound logistics, operations, outbound logistics, marketing & sales, and service form the 5 primary activities.'
      },
      {
        id: 'q-104',
        text: 'A company experiencing high capital intensity, sluggish growth, and specialized assets usually faces:',
        category: 'Strategy',
        difficulty: 'Advanced',
        options: [
          'High exit barriers leading to fierce price wars',
          'Low supplier power due to excess production capacity',
          'Immediate entry of foreign conglomerate competitors',
          'Elastic cross-industry customer demand'
        ],
        correctOptionIndex: 0,
        explanation: 'Specialized assets and high asset liquidation friction create stubborn exit barriers, compelling trapped firms to discount aggressively.'
      },
      {
        id: 'q-105',
        text: 'Strategic Positioning primarily requires a company to:',
        category: 'Strategy',
        difficulty: 'Intermediate',
        options: [
          'Achieve identical cost structures to the market benchmark leader',
          'Perform different activities or perform similar activities in distinctly unique ways',
          'Outsource all human talent recruitment to automated vendors',
          'Maximize advertising expenditures across every available media channel'
        ],
        correctOptionIndex: 1,
        explanation: 'As Michael Porter argues, operational effectiveness is about doing things better, but strategic positioning is about choosing a distinct value bundle.'
      }
    ]
  },
  {
    id: 'quiz-02',
    title: 'Module 2 Assessment: Corporate Finance & Valuation',
    moduleTitle: 'Module 2: Corporate Finance',
    description: 'Practical evaluation on NPV vs IRR calculations, working capital cycles, and debt-equity capital structure.',
    durationMinutes: 25,
    passingScorePercent: 70,
    questionsCount: 5,
    totalMarks: 50,
    status: 'Available',
    questions: [
      {
        id: 'q-201',
        text: 'When choosing between two mutually exclusive projects with differing cash flow timings, which metric is most reliable?',
        category: 'Finance',
        difficulty: 'Intermediate',
        options: [
          'Internal Rate of Return (IRR)',
          'Net Present Value (NPV)',
          'Accounting Rate of Return (ARR)',
          'Simple Payback Period'
        ],
        correctOptionIndex: 1,
        explanation: 'NPV assumes reinvestment at the realistic cost of capital (WACC), whereas IRR unrealistic reinvestment at the project’s own internal return.'
      },
      {
        id: 'q-202',
        text: 'How is the Cash Conversion Cycle (CCC) calculated?',
        category: 'Finance',
        difficulty: 'Intermediate',
        options: [
          'Days Inventory Outstanding + Days Sales Outstanding - Days Payable Outstanding',
          'Gross Revenue / Total Working Capital Assets',
          'EBITDA - Depreciation & Amortization Expense',
          'Current Assets divided by Quick Liquid Liabilities'
        ],
        correctOptionIndex: 0,
        explanation: 'CCC measures the net duration in days between paying cash for inventory inputs and collecting cash from customer receivables.'
      },
      {
        id: 'q-203',
        text: 'What happens to the Net Present Value (NPV) of a future cash inflow if the discount rate increases?',
        category: 'Finance',
        difficulty: 'Basic',
        options: [
          'The NPV increases proportionally',
          'The NPV decreases because future money is discounted more heavily',
          'The NPV remains completely unchanged',
          'The NPV converts to an equity dividend'
        ],
        correctOptionIndex: 1,
        explanation: 'A higher discount rate reflects higher risk or cost of capital, lowering the discounted present value of future dollar inflows.'
      },
      {
        id: 'q-204',
        text: 'Which financial ratio best reflects a company’s ability to cover its debt interest obligations from operating profits?',
        category: 'Finance',
        difficulty: 'Basic',
        options: [
          'Interest Coverage Ratio (EBIT / Interest Expense)',
          'Debt-to-Equity Ratio',
          'Return on Assets (ROA)',
          'Asset Turnover Ratio'
        ],
        correctOptionIndex: 0,
        explanation: 'The interest coverage ratio gauges how many times over operational operating profit (EBIT) can comfortably pay current financial interest charges.'
      },
      {
        id: 'q-205',
        text: 'Free Cash Flow to Firm (FCFF) represents cash available to:',
        category: 'Finance',
        difficulty: 'Advanced',
        options: [
          'Common shareholders only after preferred stock dividends',
          'Both equity holders and debt capital providers after mandatory CapEx and working capital investments',
          'Government tax authorities for advance corporate levy payments',
          'Vendor accounts payable settlement balances'
        ],
        correctOptionIndex: 1,
        explanation: 'FCFF measures the operational cash surplus generated by business assets that is claimable by both debt lenders and equity owners.'
      }
    ]
  }
];

export const INITIAL_ZOOM_SESSIONS: ZoomSession[] = [
  {
    id: 'zoom-801',
    title: 'Live Case Discussion: Turnaround Strategy of Indus Motors',
    batchName: 'Cohort 8 (Executive Evening)',
    instructorName: 'Prof. Tariq Amin',
    date: '2026-11-05',
    timePKT: '07:30 PM - 09:30 PM PKT',
    durationMinutes: 120,
    meetingId: '894 2190 4421',
    passcode: 'AER2026',
    zoomLink: 'https://zoom.us/j/89421904421?pwd=mockZoomMeetingLinkForDemo',
    status: 'Upcoming',
    attendanceStatus: 'Pending',
    agenda: [
      'Deconstructing supply chain disruptions during forex restrictions',
      'Local vendor localization incentives and margin defense',
      'Interactive breakout room case study exercise (30 mins)',
      'Live Q&A and individual project consultations'
    ]
  },
  {
    id: 'zoom-802',
    title: 'Financial Modeling Workshop: Building 3-Statement Valuations',
    batchName: 'Cohort 8 (Executive Evening)',
    instructorName: 'Prof. Tariq Amin',
    date: '2026-11-09',
    timePKT: '07:30 PM - 09:30 PM PKT',
    durationMinutes: 120,
    meetingId: '894 2190 4422',
    passcode: 'AER2026',
    zoomLink: 'https://zoom.us/j/89421904422?pwd=mockZoomMeetingLinkForDemo',
    status: 'Upcoming',
    attendanceStatus: 'Pending',
    agenda: [
      'Hands-on Excel live walkthrough: dynamic revenue schedules',
      'Debt amortization and circular interest schedule mechanics',
      'Sensitivity analysis with data tables (WACC vs Terminal Growth Rate)'
    ]
  },
  {
    id: 'zoom-799',
    title: 'Competitive Moats & Pricing Power in Inflationary Environments',
    batchName: 'Cohort 8 (Executive Evening)',
    instructorName: 'Prof. Tariq Amin',
    date: '2026-10-28',
    timePKT: '07:30 PM - 09:30 PM PKT',
    durationMinutes: 120,
    meetingId: '894 2190 4419',
    passcode: 'AER2026',
    zoomLink: 'https://zoom.us/j/89421904419',
    status: 'Completed',
    attendanceStatus: 'Present',
    recordingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    agenda: [
      'Elasticity measurement across business-to-business enterprise contracts',
      'Contractual escalation clauses and pass-through strategies'
    ]
  }
];

export const INITIAL_NOTES: StudentNote[] = [
  {
    id: 'note-01',
    lectureId: 'lec-102',
    lectureTitle: '02. Industry Structure & Porter’s Five Forces',
    timestampSeconds: 1420,
    content: 'Key takeaway on supplier concentration: When raw material providers form an oligopoly (e.g. specialized polymers or local packaging boards), gross margins are dictated by their cost-plus clauses unless backward integration is feasible.',
    tags: ['Porter', 'Suppliers', 'Moats'],
    updatedAt: '2026-10-22 21:14'
  },
  {
    id: 'note-02',
    lectureId: 'lec-201',
    lectureTitle: '05. Financial Statements Dissection for Non-Finance Executives',
    timestampSeconds: 2100,
    content: 'Rule of thumb: Never rely solely on EBITDA for capital-heavy manufacturing companies. Maintenance CapEx is real cash out the door, even if depreciation is non-cash on the P&L.',
    tags: ['Finance', 'EBITDA', 'CapEx'],
    updatedAt: '2026-10-25 18:30'
  },
  {
    id: 'note-03',
    lectureId: 'lec-101',
    lectureTitle: '01. Fundamentals of Modern Corporate Strategy',
    timestampSeconds: 680,
    content: 'Operational effectiveness vs Strategy: Benchmarking best practices raises the productivity bar for everyone, but leads to competitive convergence. Strategy is deliberately crafting distinct trade-offs.',
    tags: ['Strategy', 'Trade-offs'],
    updatedAt: '2026-10-20 14:05'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-101',
    name: 'Hamza Malik',
    email: 'hamza.malik@enterprise.pk',
    phone: '+92 300 8472910',
    batch: 'Cohort 8 (Evening)',
    enrolledProducts: ['Recorded'],
    progressPercent: 68,
    completedLecturesCount: 4,
    totalLecturesCount: 10,
    status: 'Active',
    enrollmentDate: '2026-09-15',
    lastActive: 'Today, 10:14 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'stu-102',
    name: 'Ayesha Khan',
    email: 'ayesha.k@fmcggroup.com',
    phone: '+92 321 4591023',
    batch: 'Cohort 8 (Evening)',
    enrolledProducts: ['Recorded'],
    progressPercent: 92,
    completedLecturesCount: 8,
    totalLecturesCount: 10,
    status: 'Active',
    enrollmentDate: '2026-09-10',
    lastActive: 'Yesterday, 8:45 PM'
  },
  {
    id: 'stu-103',
    name: 'Bilal Siddiqui',
    email: 'bilal.siddiqui@techventures.io',
    phone: '+92 333 9128471',
    batch: 'Recorded Self-Paced',
    enrolledProducts: ['Recorded'],
    progressPercent: 45,
    completedLecturesCount: 3,
    totalLecturesCount: 10,
    status: 'Active',
    enrollmentDate: '2026-10-01',
    lastActive: '3 days ago'
  },
  {
    id: 'stu-104',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@pharmasolutions.pk',
    phone: '+92 312 6789012',
    batch: 'Cohort 8 (Evening)',
    enrolledProducts: ['Recorded'],
    progressPercent: 30,
    completedLecturesCount: 2,
    totalLecturesCount: 10,
    status: 'Active',
    enrollmentDate: '2026-10-12',
    lastActive: 'Today, 8:05 AM'
  },
  {
    id: 'stu-105',
    name: 'Usman Tariq',
    email: 'usman.tariq@textilespak.com',
    phone: '+92 345 1234567',
    batch: 'Cohort 7 (Graduated)',
    enrolledProducts: ['Recorded'],
    progressPercent: 100,
    completedLecturesCount: 10,
    totalLecturesCount: 10,
    status: 'Graduated',
    enrollmentDate: '2026-07-01',
    lastActive: '1 week ago'
  },
  {
    id: 'stu-106',
    name: 'Zainab Qureshi',
    email: 'zainab.q@logistics360.com',
    phone: '+92 301 9876543',
    batch: 'Cohort 8 (Evening)',
    enrolledProducts: ['Recorded'],
    progressPercent: 55,
    completedLecturesCount: 5,
    totalLecturesCount: 10,
    status: 'Active',
    enrollmentDate: '2026-09-20',
    lastActive: '2 days ago'
  },
  {
    id: 'stu-107',
    name: 'Raza Ali Shah',
    email: 'raza.shah@agriindustries.pk',
    phone: '+92 322 3456789',
    batch: 'Cohort 8 (Evening)',
    enrolledProducts: ['Recorded'],
    progressPercent: 15,
    completedLecturesCount: 1,
    totalLecturesCount: 10,
    status: 'Suspended',
    enrollmentDate: '2026-09-18',
    lastActive: '18 days ago'
  }
];

export const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch-08',
    code: 'BM-2026-COHORT-8',
    name: 'Cohort 8 (Executive Evening)',
    schedule: 'Mondays & Thursdays, 7:30 PM - 9:30 PM PKT',
    studentCount: 38,
    maxStudents: 45,
    startDate: '2026-10-15',
    instructor: 'Prof. Tariq Amin',
    status: 'Active'
  },
  {
    id: 'batch-09',
    code: 'BM-2026-COHORT-9',
    name: 'Cohort 9 (Weekend Intensive)',
    schedule: 'Saturdays & Sundays, 10:00 AM - 1:00 PM PKT',
    studentCount: 19,
    maxStudents: 40,
    startDate: '2026-11-20',
    instructor: 'Prof. Tariq Amin',
    status: 'Upcoming'
  },
  {
    id: 'batch-07',
    code: 'BM-2026-COHORT-7',
    name: 'Cohort 7 (Executive Summer)',
    schedule: 'Mondays & Thursdays, 7:30 PM - 9:30 PM PKT',
    studentCount: 42,
    maxStudents: 42,
    startDate: '2026-07-01',
    instructor: 'Prof. Tariq Amin',
    status: 'Completed'
  }
];

export const INITIAL_PAYMENT_VERIFICATIONS: PaymentVerification[] = [
  {
    id: 'pay-v-901',
    studentName: 'Kamran Ashraf',
    studentEmail: 'kamran.ashraf@faysalbank.com',
    phone: '+92 302 4433221',
    productType: 'Executive Business Management Course',
    amountPKR: 15000,
    originalAmountPKR: 15000,
    paymentMethod: 'Bank Transfer',
    bankName: 'Meezan Bank Ltd (Aerecon LMS A/C # 0102-01034492)',
    transactionReference: 'IBFT-MZB-99823104',
    submittedAt: 'Today, 09:22 AM',
    proofDocumentUrl: 'Meezan_Transfer_Receipt_99823104.pdf',
    status: 'Pending'
  },
  {
    id: 'pay-v-902',
    studentName: 'Mariam Farooq',
    studentEmail: 'mariam.farooq@consulting.pk',
    phone: '+92 333 5566778',
    productType: 'Executive Business Management Course',
    amountPKR: 12000,
    originalAmountPKR: 15000,
    promoCode: 'AERECON20',
    discountPKR: 3000,
    paymentMethod: 'Raast',
    bankName: 'Raast P2P Direct',
    transactionReference: 'RAAST-PK-449102834',
    submittedAt: 'Today, 08:15 AM',
    proofDocumentUrl: 'Raast_Payment_MariamF_Slip.png',
    status: 'Pending'
  },
  {
    id: 'pay-v-903',
    studentName: 'Saad Ur Rehman',
    studentEmail: 'saad.rehman@cementgroup.com',
    phone: '+92 321 8899001',
    productType: 'Executive Business Management Course',
    amountPKR: 15000,
    originalAmountPKR: 15000,
    paymentMethod: 'Bank Transfer',
    bankName: 'Habib Bank Limited (HBL)',
    transactionReference: 'HBL-FT-77291044',
    submittedAt: 'Yesterday, 04:30 PM',
    proofDocumentUrl: 'HBL_Online_Slip_7729.pdf',
    status: 'Approved',
    reviewedBy: 'Admin (Director Operations)'
  },
  {
    id: 'pay-v-904',
    studentName: 'Nida Jawaid',
    studentEmail: 'nida.jawaid@edu.pk',
    phone: '+92 345 6677889',
    productType: 'Executive Business Management Course',
    amountPKR: 13500,
    originalAmountPKR: 15000,
    promoCode: 'WELCOME10',
    discountPKR: 1500,
    paymentMethod: 'EasyPaisa',
    transactionReference: 'EP-902148910',
    submittedAt: 'Yesterday, 02:10 PM',
    proofDocumentUrl: 'EasyPaisa_Deposit_Proof.png',
    status: 'Approved',
    reviewedBy: 'Admin (Finance Lead)'
  },
  {
    id: 'pay-v-905',
    studentName: 'Ahsan Mumtaz',
    studentEmail: 'ahsan.m@invalidmail.com',
    phone: '+92 311 0000000',
    productType: 'Executive Business Management Course',
    amountPKR: 15000,
    originalAmountPKR: 15000,
    paymentMethod: 'JazzCash',
    transactionReference: 'JC-000129-INVALID',
    submittedAt: '2 days ago',
    proofDocumentUrl: 'Corrupted_screenshot.jpg',
    status: 'Rejected',
    reviewedBy: 'Admin',
    rejectionReason: 'Transaction reference number not found in bank statement records; screenshot illegible.'
  }
];

export const INITIAL_FINANCIAL_RECORDS: FinancialRecord[] = [
  {
    id: 'fin-01',
    date: '2026-11-01',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment: Saad Ur Rehman',
    amountPKR: 15000,
    referenceNumber: 'HBL-FT-77291044',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    id: 'fin-02',
    date: '2026-11-01',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment (Promo WELCOME10): Nida Jawaid',
    amountPKR: 13500,
    referenceNumber: 'EP-902148910',
    paymentMethod: 'EasyPaisa',
    status: 'Completed'
  },
  {
    id: 'fin-03',
    date: '2026-10-30',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment: Bilal Siddiqui',
    amountPKR: 15000,
    referenceNumber: 'IBFT-ALF-481902',
    paymentMethod: 'Bank Alfalah',
    status: 'Completed'
  },
  {
    id: 'fin-04',
    date: '2026-10-29',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment: Hamza Malik',
    amountPKR: 15000,
    referenceNumber: 'RAAST-PK-110293',
    paymentMethod: 'Raast',
    status: 'Completed'
  },
  {
    id: 'fin-05',
    date: '2026-10-28',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment: Ayesha Khan',
    amountPKR: 15000,
    referenceNumber: 'IBFT-MZB-883912',
    paymentMethod: 'Meezan Bank',
    status: 'Completed'
  },
  {
    id: 'fin-06',
    date: '2026-10-25',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment (Promo AERECON20): Tariq Pervez',
    amountPKR: 12000,
    referenceNumber: 'RAAST-PK-110294',
    paymentMethod: 'Raast',
    status: 'Completed'
  },
  {
    id: 'fin-07',
    date: '2026-10-22',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment: Zainab Qureshi',
    amountPKR: 15000,
    referenceNumber: 'IBFT-MCB-991024',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    id: 'fin-08',
    date: '2026-10-20',
    type: 'Income',
    category: 'Recorded Business Management Course',
    description: 'Enrollment: Fatima Zahra',
    amountPKR: 15000,
    referenceNumber: 'JC-88192014',
    paymentMethod: 'JazzCash',
    status: 'Completed'
  }
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-01',
    date: '2026-10-31',
    category: 'Instructor Honorarium',
    description: 'Executive Curriculum & Lecture Masterclass Compensation (Oct 2026)',
    amountPKR: 35000,
    approvedBy: 'Executive Board',
    receiptNumber: 'HON-OCT-2026-01'
  },
  {
    id: 'exp-02',
    date: '2026-10-28',
    category: 'Cloud Infrastructure',
    description: 'Cloud Video CDN Streaming & High-Bitrate Server Licenses',
    amountPKR: 8500,
    approvedBy: 'Director Operations',
    receiptNumber: 'ZM-INV-99231'
  },
  {
    id: 'exp-03',
    date: '2026-10-25',
    category: 'Cloud Infrastructure',
    description: 'Cloud Storage & Video Streaming Bandwidth (Global CDN)',
    amountPKR: 6200,
    approvedBy: 'Tech Lead',
    receiptNumber: 'AWS-CDN-1029'
  },
  {
    id: 'exp-04',
    date: '2026-10-20',
    category: 'Marketing',
    description: 'LinkedIn Executive Sponsorship & Professional Outreach',
    amountPKR: 12000,
    approvedBy: 'Marketing Lead',
    receiptNumber: 'LI-ADS-4491'
  }
];

export const INITIAL_REFUNDS: RefundRecord[] = [
  {
    id: 'ref-01',
    date: '2026-10-18',
    studentName: 'Taimoor Baig',
    transactionRef: 'IBFT-MZB-771892',
    amountPKR: 6000,
    reason: 'Accidental double payment via Raast and Mobile App simultaneously',
    status: 'Processed'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-8801',
    credentialCode: 'AER-2026-BM-8921',
    studentName: 'Hamza Malik',
    studentEmail: 'hamza.malik@enterprise.pk',
    courseTitle: 'Executive Business Management & Corporate Strategy',
    issueDate: '2026-10-24',
    scorePercent: 92,
    instructorName: 'Prof. Tariq Amin',
    verified: true
  },
  {
    id: 'cert-8802',
    credentialCode: 'AER-2026-BM-8840',
    studentName: 'Usman Tariq',
    studentEmail: 'usman.tariq@textilespak.com',
    courseTitle: 'Executive Business Management & Corporate Strategy',
    issueDate: '2026-09-30',
    scorePercent: 95,
    instructorName: 'Prof. Tariq Amin',
    verified: true
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Upcoming Guest Speaker Session: M&A Valuations in Pakistan',
    body: 'We are thrilled to announce that for our Thursday session on Nov 5th, former CFO of Engro Polymer will join Prof. Tariq Amin to review deal structures.',
    targetAudience: 'Live Cohort 8',
    priority: 'Important',
    postedAt: 'Yesterday at 3:00 PM',
    author: 'Prof. Tariq Amin'
  },
  {
    id: 'ann-02',
    title: 'Financial Modeling Workbook v2.4 Released',
    body: 'An updated Excel workbook has been uploaded under Lecture 05 with automated dynamic sensitivity tables.',
    targetAudience: 'All',
    priority: 'Normal',
    postedAt: '3 days ago',
    author: 'Course Coordinator'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-01',
    title: 'Curriculum Milestone',
    message: 'New executive case study "Turnaround Strategy of Indus Motors" is available in Module 2.',
    timeAgo: '1 hour ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-02',
    title: 'Quiz 1 Scored',
    message: 'You scored 80% (40/50 marks) on Strategic Advantage Assessment.',
    timeAgo: '2 days ago',
    read: true,
    type: 'success'
  },
  {
    id: 'notif-03',
    title: 'New Resource Added',
    message: '3-Statement Financial Model template is now available for download in Lecture 05.',
    timeAgo: '4 days ago',
    read: true,
    type: 'info'
  }
];
