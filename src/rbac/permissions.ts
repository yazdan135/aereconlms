import { Permission, UserRole } from '../types';

/**
 * Default permissions for every system role.
 * These are used when no custom overrides exist on a UserProfile.
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  public: [],

  super_admin: [
    { module: 'students',      actions: ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'export', 'manage', 'assign'] },
    { module: 'courses',       actions: ['view', 'create', 'edit', 'delete', 'publish', 'unpublish', 'export', 'manage'] },
    { module: 'lectures',      actions: ['view', 'create', 'edit', 'delete', 'publish', 'unpublish', 'manage'] },
    { module: 'examinations',  actions: ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'manage'] },
    { module: 'certificates',  actions: ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'export', 'manage'] },
    { module: 'payments',      actions: ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'export', 'manage'] },
    { module: 'expenses',      actions: ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage'] },
    { module: 'batches',       actions: ['view', 'create', 'edit', 'delete', 'manage', 'assign'] },
    { module: 'users',         actions: ['view', 'create', 'edit', 'delete', 'manage', 'assign'] },
    { module: 'roles',         actions: ['view', 'create', 'edit', 'delete', 'manage', 'assign'] },
    { module: 'reports',       actions: ['view', 'export', 'manage'] },
    { module: 'settings',      actions: ['view', 'edit', 'manage'] },
    { module: 'announcements', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { module: 'question-bank', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { module: 'grand-tests',   actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { module: 'live-sessions', actions: ['view', 'create', 'edit', 'delete', 'manage', 'assign'] },
  ],

  admin: [
    { module: 'students',      actions: ['view', 'create', 'edit', 'manage'] },
    { module: 'courses',       actions: ['view', 'create', 'edit', 'publish', 'unpublish', 'manage'] },
    { module: 'lectures',      actions: ['view', 'create', 'edit', 'publish', 'unpublish', 'manage'] },
    { module: 'examinations',  actions: ['view', 'create', 'edit', 'manage'] },
    { module: 'certificates',  actions: ['view', 'approve', 'reject', 'manage'] },
    { module: 'users',         actions: ['view', 'create', 'edit'] },
    { module: 'reports',       actions: ['view', 'export'] },
    { module: 'settings',      actions: ['view', 'edit'] },
    { module: 'announcements', actions: ['view', 'create', 'edit', 'delete'] },
    { module: 'question-bank', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { module: 'grand-tests',   actions: ['view', 'create', 'edit', 'manage'] },
    { module: 'batches',       actions: ['view', 'manage'] },
    { module: 'live-sessions', actions: ['view', 'manage'] },
  ],

  finance: [
    { module: 'payments', actions: ['view', 'approve', 'reject', 'export', 'manage'] },
    { module: 'expenses', actions: ['view', 'create', 'edit', 'export', 'manage'] },
    { module: 'reports',  actions: ['view', 'export'] },
  ],

  academic: [
    { module: 'courses',       actions: ['view', 'create', 'edit', 'publish', 'unpublish', 'manage'] },
    { module: 'lectures',      actions: ['view', 'create', 'edit', 'publish', 'unpublish', 'manage'] },
    { module: 'examinations',  actions: ['view', 'create', 'edit', 'manage'] },
    { module: 'question-bank', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { module: 'grand-tests',   actions: ['view', 'create', 'edit', 'manage'] },
    { module: 'certificates',  actions: ['view', 'manage'] },
    { module: 'students',      actions: ['view'] },
    { module: 'reports',       actions: ['view'] },
  ],

  manager: [
    { module: 'students',      actions: ['view', 'edit', 'manage', 'assign'] },
    { module: 'batches',       actions: ['view', 'create', 'edit', 'manage', 'assign'] },
    { module: 'live-sessions', actions: ['view', 'create', 'edit', 'manage'] },
    { module: 'certificates',  actions: ['view', 'approve', 'reject'] },
    { module: 'announcements', actions: ['view', 'create', 'edit', 'delete'] },
    { module: 'reports',       actions: ['view'] },
  ],

  instructor: [
    { module: 'courses',       actions: ['view'],        scope: 'assigned' },
    { module: 'batches',       actions: ['view'],        scope: 'assigned' },
    { module: 'students',      actions: ['view'],        scope: 'assigned' },
    { module: 'live-sessions', actions: ['view', 'edit'], scope: 'assigned' },
    { module: 'announcements', actions: ['view', 'create'] },
  ],

  student: [
    { module: 'courses',       actions: ['view'],           scope: 'own' },
    { module: 'lectures',      actions: ['view'],           scope: 'own' },
    { module: 'examinations',  actions: ['view'],           scope: 'own' },
    { module: 'certificates',  actions: ['view', 'create'], scope: 'own' },
    { module: 'batches',       actions: ['view'],           scope: 'own' },
    { module: 'live-sessions', actions: ['view'],           scope: 'own' },
  ],
};

/**
 * Check whether a given role (or custom permission set) grants a specific
 * action on a module.
 *
 * @param userRole       The user's base role.
 * @param module         Target permission module (e.g. 'payments').
 * @param action         The action to check (e.g. 'approve').
 * @param customPermissions  Optional per-user overrides that replace the
 *                       role defaults entirely when provided.
 */
export function hasPermission(
  userRole: UserRole,
  module: string,
  action: string,
  customPermissions?: Permission[]
): boolean {
  const permissions = customPermissions ?? DEFAULT_ROLE_PERMISSIONS[userRole] ?? [];
  return permissions.some(
    (p) => p.module === module && (p.actions as string[]).includes(action)
  );
}
