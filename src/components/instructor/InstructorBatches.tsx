import React from 'react';
import { Users, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';
import { Batch } from '../../types';

export const InstructorBatches: React.FC<{ batches: Batch[] }> = ({ batches }) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assigned Live Batches</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review cohort capacity, weekly cadence, and registered executive learners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                {batch.code}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  batch.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {batch.status}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{batch.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{batch.schedule}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Enrolled Students:</span>
                <span className="font-bold text-slate-900">
                  {batch.studentCount} / {batch.maxStudents}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full"
                  style={{ width: `${(batch.studentCount / batch.maxStudents) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

