import React, { useState } from 'react';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Users,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
  Search,
  Filter,
  Save,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import {
  Role,
  UserProfile,
  PermissionModule,
  PermissionAction,
  PermissionScope,
  Permission,
} from '../../types';
import { MOCK_ROLES, MOCK_USERS } from '../../utils/mockRbacData';

interface SuperAdminRolesPermissionsProps {
  onShowToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

const ALL_MODULES: { id: PermissionModule; label: string }[] = [
  { id: 'students', label: 'Students Roster & Telemetry' },
  { id: 'courses', label: 'Curriculum & Courses' },
  { id: 'lectures', label: 'Recorded Lectures & Videos' },
  { id: 'examinations', label: 'Examinations & Lecture Tests' },
  { id: 'question-bank', label: 'MCQ Question Bank' },
  { id: 'grand-tests', label: 'Grand Examination Engine' },
  { id: 'certificates', label: 'Certificates & Credentials' },
  { id: 'payments', label: 'Student Payments & Ledgers' },
  { id: 'expenses', label: 'Institutional Expenses' },
  { id: 'batches', label: 'Batches & Cohorts' },
  { id: 'live-sessions', label: 'Live Zoom Sessions' },
  { id: 'users', label: 'User Directory & Accounts' },
  { id: 'roles', label: 'Roles & Delegation Matrix' },
  { id: 'reports', label: 'Analytics & P&L Reports' },
  { id: 'announcements', label: 'Platform Announcements' },
  { id: 'settings', label: 'System Security Settings' },
];

const ALL_ACTIONS: { id: PermissionAction; label: string }[] = [
  { id: 'view', label: 'View' },
  { id: 'create', label: 'Create' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
  { id: 'approve', label: 'Approve' },
  { id: 'reject', label: 'Reject' },
  { id: 'export', label: 'Export' },
  { id: 'manage', label: 'Manage' },
  { id: 'assign', label: 'Assign' },
  { id: 'publish', label: 'Publish' },
];

export const SuperAdminRolesPermissions: React.FC<SuperAdminRolesPermissionsProps> = ({
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'matrix' | 'users'>('roles');
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);

  // Selected role for Matrix editor
  const [selectedRoleForMatrix, setSelectedRoleForMatrix] = useState<Role>(MOCK_ROLES[1]); // default to Admin
  const [editablePermissions, setEditablePermissions] = useState<Permission[]>(
    MOCK_ROLES[1].permissions
  );
  const [hasUnsavedMatrixChanges, setHasUnsavedMatrixChanges] = useState(false);

  // Modal for creating custom role
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('#3b82f6');

  // User-specific custom permission overrides drawer
  const [selectedUserForOverride, setSelectedUserForOverride] = useState<UserProfile | null>(null);
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // Switch role in Matrix
  const handleSelectRoleInMatrix = (role: Role) => {
    setSelectedRoleForMatrix(role);
    setEditablePermissions(JSON.parse(JSON.stringify(role.permissions)));
    setHasUnsavedMatrixChanges(false);
  };

  // Toggle specific action for a module in active role
  const handleToggleMatrixCell = (module: PermissionModule, action: PermissionAction) => {
    if (selectedRoleForMatrix.id === 'role-super-admin') {
      onShowToast('Super Admin role permissions are immutable root permissions.', 'warning');
      return;
    }

    setHasUnsavedMatrixChanges(true);
    setEditablePermissions((prev) => {
      const existingModulePerm = prev.find((p) => p.module === module);
      if (existingModulePerm) {
        const hasAction = existingModulePerm.actions.includes(action);
        const updatedActions = hasAction
          ? existingModulePerm.actions.filter((a) => a !== action)
          : [...existingModulePerm.actions, action];

        return prev.map((p) =>
          p.module === module ? { ...p, actions: updatedActions } : p
        );
      } else {
        return [...prev, { module, actions: [action], scope: 'all' }];
      }
    });
  };

  const handleSetModuleScope = (module: PermissionModule, scope: PermissionScope) => {
    setHasUnsavedMatrixChanges(true);
    setEditablePermissions((prev) => {
      const existing = prev.find((p) => p.module === module);
      if (existing) {
        return prev.map((p) => (p.module === module ? { ...p, scope } : p));
      }
      return [...prev, { module, actions: ['view'], scope }];
    });
  };

  const handleSelectAllForModule = (module: PermissionModule) => {
    setHasUnsavedMatrixChanges(true);
    const allActionIds = ALL_ACTIONS.map((a) => a.id);
    setEditablePermissions((prev) => {
      const exists = prev.find((p) => p.module === module);
      if (exists) {
        return prev.map((p) => (p.module === module ? { ...p, actions: allActionIds } : p));
      }
      return [...prev, { module, actions: allActionIds, scope: 'all' }];
    });
  };

  const handleDeselectAllForModule = (module: PermissionModule) => {
    setHasUnsavedMatrixChanges(true);
    setEditablePermissions((prev) => prev.filter((p) => p.module !== module));
  };

  const handleSaveMatrixChanges = () => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === selectedRoleForMatrix.id
          ? { ...r, permissions: editablePermissions, updatedAt: 'Just now' }
          : r
      )
    );
    setHasUnsavedMatrixChanges(false);
    onShowToast(`Permissions updated for role "${selectedRoleForMatrix.name}"!`, 'success');
  };

  const handleResetMatrixDefaults = () => {
    setEditablePermissions(JSON.parse(JSON.stringify(selectedRoleForMatrix.permissions)));
    setHasUnsavedMatrixChanges(false);
    onShowToast('Reset permissions to role defaults.', 'info');
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newRole: Role = {
      id: `role-custom-${Date.now()}`,
      name: newRoleName.trim(),
      description: newRoleDescription.trim() || 'Custom delegated operational role.',
      color: newRoleColor,
      isSystem: false,
      permissions: [
        { module: 'students', actions: ['view'], scope: 'assigned' },
        { module: 'batches', actions: ['view'], scope: 'assigned' },
      ],
      userCount: 0,
      createdAt: '2026-11-04',
      updatedAt: 'Just now',
    };

    setRoles([...roles, newRole]);
    setShowCreateRoleModal(false);
    setNewRoleName('');
    setNewRoleDescription('');
    onShowToast(`Custom role "${newRole.name}" created successfully.`, 'success');
  };

  const isActionAllowedInMatrix = (module: PermissionModule, action: PermissionAction): boolean => {
    const perm = editablePermissions.find((p) => p.module === module);
    return perm ? perm.actions.includes(action) : false;
  };

  const getModuleScope = (module: PermissionModule): PermissionScope => {
    const perm = editablePermissions.find((p) => p.module === module);
    return perm?.scope || 'all';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Super Admin Control Center
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Role & Permission Management
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateRoleModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Custom Role
          </button>
        </div>
      </div>

      {/* ─── TABS ─── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'roles'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All System Roles ({roles.length})
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'matrix'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Interactive Permission Matrix
          {hasUnsavedMatrixChanges && (
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" /> Individual User Overrides
        </button>
      </div>

      {/* ─── TAB 1: ALL ROLES DIRECTORY ─── */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Role Profile</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Assigned Users</th>
                  <th className="py-3 px-4">Modules Covered</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roles.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="font-bold text-slate-900">{r.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{r.description}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                      {r.userCount} users
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {r.permissions.length} modules
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          r.isSystem
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {r.isSystem ? 'System Core' : 'Custom Delegated'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{r.updatedAt}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          handleSelectRoleInMatrix(r);
                          setActiveTab('matrix');
                        }}
                        className="px-2.5 py-1 text-blue-600 hover:text-blue-700 font-semibold text-xs rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Configure Matrix
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 2: INTERACTIVE PERMISSION MATRIX ─── */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          {/* Matrix Top Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-600">Active Role Matrix:</label>
              <select
                value={selectedRoleForMatrix.id}
                onChange={(e) => {
                  const found = roles.find((r) => r.id === e.target.value);
                  if (found) handleSelectRoleInMatrix(found);
                }}
                className="text-xs font-bold p-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} {r.isSystem ? '(System)' : '(Custom)'}
                  </option>
                ))}
              </select>

              {hasUnsavedMatrixChanges && (
                <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Unsaved Changes
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetMatrixDefaults}
                disabled={!hasUnsavedMatrixChanges}
                className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
              </button>
              <button
                onClick={handleSaveMatrixChanges}
                disabled={!hasUnsavedMatrixChanges}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </div>

          {/* Interactive Table Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 min-w-[200px]">Functional Module</th>
                  <th className="py-3 px-3 min-w-[140px]">Data Scope</th>
                  {ALL_ACTIONS.map((a) => (
                    <th key={a.id} className="py-3 px-2 text-center min-w-[65px]">
                      {a.label}
                    </th>
                  ))}
                  <th className="py-3 px-3 text-right">Quick Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ALL_MODULES.map((mod) => {
                  const currentScope = getModuleScope(mod.id);

                  return (
                    <tr key={mod.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {mod.label}
                      </td>

                      {/* Scope Selector */}
                      <td className="py-3 px-3">
                        <select
                          value={currentScope}
                          onChange={(e) =>
                            handleSetModuleScope(mod.id, e.target.value as PermissionScope)
                          }
                          className="w-full text-[11px] p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700"
                        >
                          <option value="all">All Records</option>
                          <option value="assigned">Assigned Only</option>
                          <option value="specific-courses">Specific Courses</option>
                          <option value="specific-batches">Specific Batches</option>
                          <option value="own">Own Records</option>
                        </select>
                      </td>

                      {/* Action Matrix Toggles */}
                      {ALL_ACTIONS.map((action) => {
                        const isChecked = isActionAllowedInMatrix(mod.id, action.id);
                        return (
                          <td key={action.id} className="py-3 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleMatrixCell(mod.id, action.id)}
                              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                            />
                          </td>
                        );
                      })}

                      {/* Quick Select Buttons */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1 text-[10px]">
                          <button
                            onClick={() => handleSelectAllForModule(mod.id)}
                            className="px-1.5 py-0.5 rounded text-blue-600 hover:bg-blue-50 font-semibold"
                          >
                            All
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            onClick={() => handleDeselectAllForModule(mod.id)}
                            className="px-1.5 py-0.5 rounded text-slate-500 hover:bg-slate-100"
                          >
                            None
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 3: USER SPECIFIC PERMISSION OVERRIDES ─── */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Users List (5 cols) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search staff & managers..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {users
                .filter(
                  (u) =>
                    u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                    u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
                )
                .map((user) => {
                  const isSelected = selectedUserForOverride?.id === user.id;
                  const hasCustom = user.customPermissions && user.customPermissions.length > 0;

                  return (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUserForOverride(user)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-400 text-blue-950 font-medium'
                          : 'bg-white border-slate-200/60 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600 shrink-0">
                          {user.fullName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="truncate text-xs">
                          <div className="font-semibold text-slate-900 truncate">{user.fullName}</div>
                          <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                          {user.role}
                        </span>
                        {hasCustom && (
                          <div className="text-[9px] text-amber-600 font-semibold mt-0.5">Custom Overrides</div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Right Column: User Override Configuration (7 cols) */}
          <div className="lg:col-span-7">
            {selectedUserForOverride ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedUserForOverride.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Default Role: <strong className="text-slate-800 uppercase">{selectedUserForOverride.role}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setUsers((prev) =>
                        prev.map((u) =>
                          u.id === selectedUserForOverride.id ? { ...u, customPermissions: undefined } : u
                        )
                      );
                      setSelectedUserForOverride({
                        ...selectedUserForOverride,
                        customPermissions: undefined,
                      });
                      onShowToast('Permissions reset to standard role defaults.', 'info');
                    }}
                    className="px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    Reset to Role Defaults
                  </button>
                </div>

                {/* Scope & Overrides Callout */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="font-semibold text-slate-900">Super Admin User Delegation Policy</div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Super Admin can restrict or elevate this user’s permissions without changing their public title.
                    For example, grant this Manager permission to manage Batch 08, but revoke access to Student Delete and Payment Verifications.
                  </p>
                </div>

                {/* Custom Modules Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Assigned Permission Overrides
                  </h4>

                  <div className="space-y-2">
                    {ALL_MODULES.slice(0, 6).map((m) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-slate-900">{m.label}</div>
                          <div className="text-[10px] text-slate-400">Scope: Assigned Records</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1.5 text-slate-600">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="accent-blue-600 rounded"
                            />
                            View
                          </label>
                          <label className="flex items-center gap-1.5 text-slate-600">
                            <input
                              type="checkbox"
                              defaultChecked={m.id === 'students'}
                              className="accent-blue-600 rounded"
                            />
                            Edit
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={() => onShowToast('User delegation permissions saved & applied immediately.', 'success')}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs"
                    >
                      Save User Delegations
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-xs text-center text-slate-400 space-y-2">
                <Users className="w-10 h-10 mx-auto text-slate-300" />
                <h4 className="text-sm font-semibold text-slate-600">No User Selected</h4>
                <p className="text-xs text-slate-400">
                  Select a user from the directory to review and customize their specific access matrix.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── CREATE CUSTOM ROLE MODAL ─── */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create Custom System Role</h3>
              <button
                onClick={() => setShowCreateRoleModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Academic Coordinator"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  placeholder="Operational responsibilities and data boundary description..."
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Badge Color</label>
                <div className="flex items-center gap-2">
                  {['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewRoleColor(c)}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                        newRoleColor === c ? 'scale-125 ring-2 ring-slate-900' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateRoleModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  Create & Configure Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

