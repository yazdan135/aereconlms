import React, { useState } from 'react';
import {
  FileText,
  Clock,
  Trash2,
  Edit2,
  Plus,
  Search,
  Tag,
  Check,
  Bookmark,
} from 'lucide-react';
import { StudentNote } from '../../types';

interface StudentNotesProps {
  notes: StudentNote[];
  onAddNote: (data: {
    lectureId: string;
    lectureTitle: string;
    content: string;
    timestampSeconds: number;
  }) => void;
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, content: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const StudentNotes: React.FC<StudentNotesProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  onUpdateNote,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Extract all distinct tags
  const allTags = ['All', ...Array.from(new Set(notes.flatMap((n) => n.tags || [])))];

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.lectureTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || (n.tags && n.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const handleStartEdit = (note: StudentNote) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = (noteId: string) => {
    onUpdateNote(noteId, editContent);
    setEditingNoteId(null);
    onShowToast('Note updated successfully', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Study Notes & Timestamp Insights</h1>
        <p className="text-xs text-slate-500 mt-1">
          Personal lecture takeaways, formula deductions, and financial modeling observations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search notes content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Tag Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => {
          const isEditing = editingNoteId === note.id;
          const mins = Math.floor(note.timestampSeconds / 60);
          const secs = (note.timestampSeconds % 60).toString().padStart(2, '0');

          return (
            <div
              key={note.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                    {note.lectureTitle}
                  </div>
                  <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-bold shrink-0">
                    ⏱ {mins}:{secs}
                  </span>
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(note.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                )}

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Updated: {note.updatedAt}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(note)}
                    className="p-1 hover:text-blue-600 rounded cursor-pointer"
                    title="Edit Note"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      onDeleteNote(note.id);
                      onShowToast('Note deleted', 'info');
                    }}
                    className="p-1 hover:text-red-600 rounded cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
