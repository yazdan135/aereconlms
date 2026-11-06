import React from 'react';
import { BarChart3, TrendingUp, Users, CheckCircle2, Clock, Award } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';

export const ManagerReports: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Academic & Operational Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Objective evaluation metrics for learner retention, lecture completion, and cohort attendance.
        </p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Avg Course Completion"
          value="71.2%"
          subtext="Median across enrolled executives"
          icon={TrendingUp}
          trend={{ value: '+4.8%', isPositive: true }}
        />
        <StatCard
          label="First-Attempt Pass Rate"
          value="82.4%"
          subtext="On Module 1 & 2 Assessments"
          icon={CheckCircle2}
        />
        <StatCard
          label="Live Attendance Average"
          value="91.4%"
          subtext="Cohort 8 weekly Zoom attendance"
          icon={Users}
        />
        <StatCard
          label="Resource Download Rate"
          value="94%"
          subtext="Excel models downloaded"
          icon={Award}
        />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Completion Rates */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Completion Rate by Curriculum Module
            </h3>
            <span className="text-[11px] text-slate-400">All Active Cohorts</span>
          </div>

          <div className="space-y-4 text-xs">
            {[
              { mod: 'Module 1: Strategic Analysis & Five Forces', pct: 92, count: '64/70 completed' },
              { mod: 'Module 2: Corporate Financial Decision-Making', pct: 78, count: '55/70 completed' },
              { mod: 'Module 3: Operations & Theory of Constraints', pct: 54, count: '38/70 completed' },
              { mod: 'Module 4: Leadership & Turnaround Governance', pct: 32, count: '22/70 completed' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-slate-700 mb-1">
                  <span className="font-medium truncate max-w-xs">{item.mod}</span>
                  <span className="font-mono font-bold text-blue-700">{item.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cohort Attendance Trends */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Live Zoom Attendance History
            </h3>
            <Badge variant="purple">Cohort 8 (Evening)</Badge>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { session: 'Session 01: Strategy Orientation & Case Briefing', rate: 96, date: 'Oct 15' },
              { session: 'Session 02: Porter Five Forces & Moat Mapping', rate: 92, date: 'Oct 19' },
              { session: 'Session 03: Competitive Moats in High Inflation', rate: 89, date: 'Oct 24' },
              { session: 'Session 04: Turnaround Strategy of Indus Motors', rate: 94, date: 'Oct 28' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-900">{s.session}</div>
                  <div className="text-[11px] text-slate-400">{s.date}</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 block">{s.rate}%</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Attended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
