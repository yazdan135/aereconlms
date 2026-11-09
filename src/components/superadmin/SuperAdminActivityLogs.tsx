import React, { useState } from 'react';
import {
  Activity,
  Search,
  Filter,
  Download,
  Shield,
  Clock,
  Laptop,
} from 'lucide-react';
import { MOCK_ACTIVITY_LOGS } from '../../utils/mockRbacData';

export const SuperAdminActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState(MOCK_ACTIVITY_LOGS);
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  const filtered = logs.filter((l) => {
    const matchSearch =
      l.userName.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase());
    const matchMod = moduleFilter === 'all' || l.module.toLowerCase().includes(moduleFilter.toLowerCase());
    return matchSearch && matchMod;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            System Activity Trail
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Activity Logs & Root Audit</h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="text-xs p-2 rounded-xl border border-slate-200 bg-white"
        >
          <option value="all">All Modules</option>
          <option value="Roles">Roles & Permissions</option>
          <option value="Finance">Finance & Payments</option>
          <option value="Batches">Batches</option>
          <option value="Classroom">Classroom & Videos</option>
          <option value="Certificates">Certificates</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator / User</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">IP & Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{log.userName}</td>
                  <td className="py-3 px-4 text-slate-600">{log.module}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-md leading-relaxed">{log.description}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[10px]">
                    {log.ipAddress} • {log.device}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

