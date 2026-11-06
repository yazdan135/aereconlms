import React, { useState } from 'react';
import { Course, Module, Lecture } from '../../types';
import { FolderTree, Plus, Video, Clock, FileSpreadsheet, FileText, CheckCircle2, ChevronDown, Edit2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface ManagerCoursesProps {
  course: Course;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ManagerCourses: React.FC<ManagerCoursesProps> = ({ course, onShowToast }) => {
  const [modules, setModules] = useState<Module[]>(course.modules);
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(course.modules[0]?.id || 'mod-1');

  // Form states
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureDuration, setLectureDuration] = useState('45');
  const [lectureDesc, setLectureDesc] = useState('');
  const [keyTakeaway, setKeyTakeaway] = useState('');

  const handleAddLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureTitle.trim()) return;

    const newLec: Lecture = {
      id: `lec-${Date.now()}`,
      moduleId: selectedModuleId,
      title: lectureTitle,
      durationMinutes: parseInt(lectureDuration) || 45,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: lectureDesc || 'Detailed executive breakdown of concepts.',
      keyTakeaways: keyTakeaway ? [keyTakeaway] : ['Core strategic principle application'],
      resources: [{ title: 'Lecture Notes Deck (PDF)', type: 'pdf', url: '#' }],
      isCompleted: false,
      isLocked: false,
    };

    setModules((prev) =>
      prev.map((mod) => (mod.id === selectedModuleId ? { ...mod, lectures: [...mod.lectures, newLec] } : mod))
    );

    setShowAddLectureModal(false);
    setLectureTitle('');
    setLectureDesc('');
    setKeyTakeaway('');
    onShowToast('New lecture added to curriculum module', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Curriculum & Video Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize modules, upload lecture recordings, manage Excel models, and set lesson sequence.
          </p>
        </div>

        <button
          onClick={() => setShowAddLectureModal(true)}
          className="px-3.5 py-2 rounded-lg bg-[#0f2b48] hover:bg-[#163e68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lecture</span>
        </button>
      </div>

      {/* Program Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info">Flagship Executive Program</Badge>
            <span className="text-xs text-slate-400 font-mono">ID: {course.id}</span>
          </div>
          <h2 className="text-base font-bold text-slate-900">{course.title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lead Faculty: {course.instructorName} • {modules.length} Modules •{' '}
            {modules.flatMap((m) => m.lectures).length} Total Lectures
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge variant="success" dot>Published & Active</Badge>
        </div>
      </div>

      {/* Modules and Lectures Tree */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden"
          >
            <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                  Module {mod.number}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-slate-600">
                  {mod.lectures.length} Lectures
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {mod.lectures.map((lec, idx) => (
                <div
                  key={lec.id}
                  className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-slate-400 text-xs w-5 shrink-0">
                      {idx + 1}.
                    </span>
                    <Video className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">{lec.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {lec.description}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <span className="font-mono text-slate-500 text-[11px]">
                      {lec.durationMinutes} mins
                    </span>
                    {lec.resources.length > 0 && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {lec.resources.length} files
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Lecture Modal */}
      <Modal
        isOpen={showAddLectureModal}
        onClose={() => setShowAddLectureModal(false)}
        title="Add New Course Lecture"
        description="Append a new high-definition lecture and resources to the syllabus."
        maxWidth="lg"
      >
        <form onSubmit={handleAddLecture} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Module
            </label>
            <select
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
            >
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  Module {m.number}: {m.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lecture Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 11. Mergers, Acquisitions & Deal Synergy"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Duration (mins)
              </label>
              <input
                type="number"
                value={lectureDuration}
                onChange={(e) => setLectureDuration(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Executive Description
            </label>
            <textarea
              rows={3}
              placeholder="Detailed syllabus notes and core concepts covered..."
              value={lectureDesc}
              onChange={(e) => setLectureDesc(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Key Takeaway
            </label>
            <input
              type="text"
              placeholder="e.g. Valuation multiples vs discounted cash flow deal bounds"
              value={keyTakeaway}
              onChange={(e) => setKeyTakeaway(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddLectureModal(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              Save Lecture
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
