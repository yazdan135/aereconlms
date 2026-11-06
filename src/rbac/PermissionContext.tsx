import React, { createContext, useContext } from 'react';
import { UserRole, Permission, PermissionModule, PermissionAction } from '../types';
import { hasPermission as checkPerm } from './permissions';

interface RbacCtx {
  hasPermission: (module: PermissionModule | string, action: PermissionAction | string) => boolean;
  currentRole: UserRole;
}

const RbacContext = createContext<RbacCtx>({
  hasPermission: () => false,
  currentRole: 'public',
});

/**
 * Provides RBAC permission checking to the entire subtree.
 *
 * Usage:
 *   <PermissionProvider role="finance">
 *     <PermissionGate module="payments" action="approve">
 *       <ApproveButton />
 *     </PermissionGate>
 *   </PermissionProvider>
 */
export const PermissionProvider: React.FC<{
  role: UserRole;
  customPermissions?: Permission[];
  children: React.ReactNode;
}> = ({ role, customPermissions, children }) => {
  const hasPermission = (module: string, action: string): boolean =>
    checkPerm(role, module, action, customPermissions);

  return (
    <RbacContext.Provider value={{ hasPermission, currentRole: role }}>
      {children}
    </RbacContext.Provider>
  );
};

/** Access the RBAC context from any descendant component. */
export const usePermission = (): RbacCtx => useContext(RbacContext);
