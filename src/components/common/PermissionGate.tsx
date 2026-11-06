import React from 'react';
import { usePermission } from '../../rbac/PermissionContext';
import { PermissionModule, PermissionAction } from '../../types';

interface Props {
  module: PermissionModule | string;
  action: PermissionAction | string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGate: React.FC<Props> = ({
  module,
  action,
  fallback = null,
  children,
}) => {
  const { hasPermission } = usePermission();
  const allowed = hasPermission(module, action);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

