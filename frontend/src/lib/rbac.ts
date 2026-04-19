/**
 * Role-Based Access Control (RBAC) Matrix
 * Defines permissions for each action based on user role
 */

import type { CSSProperties } from "react";
import type { UserRole } from "./types";

export type PermissionAction = 
  | 'create-backlog-task'
  | 'reorder-backlog'
  | 'create-sprint-subtask'
  | 'move-board-cards'
  | 'view-board'
  | 'manage-sprint-timer';

// RBAC Permission Matrix
const RBAC_MATRIX: Record<PermissionAction, Set<UserRole>> = {
  'create-backlog-task': new Set(['PRODUCT_OWNER']),
  'reorder-backlog': new Set(['PRODUCT_OWNER']),
  'create-sprint-subtask': new Set(['SCRUM_MASTER']),
  'move-board-cards': new Set(['SCRUM_MASTER', 'DEVELOPER']),
  'view-board': new Set(['PRODUCT_OWNER', 'SCRUM_MASTER', 'DEVELOPER']),
  'manage-sprint-timer': new Set(['SCRUM_MASTER']),
};

/**
 * Check if a role has permission for an action
 */
export function hasPermission(
  userRole: UserRole,
  action: PermissionAction
): boolean {
  return RBAC_MATRIX[action].has(userRole);
}

/**
 * Get all allowed actions for a role
 */
export function getAllowedActions(userRole: UserRole): PermissionAction[] {
  return (Object.keys(RBAC_MATRIX) as PermissionAction[]).filter(
    (action) => hasPermission(userRole, action)
  );
}

/**
 * Check if role can manage members (only PRODUCT_OWNER)
 */
export function canManageMembers(userRole: UserRole): boolean {
  return userRole === 'PRODUCT_OWNER';
}

/**
 * Check if role can create invite links (only PRODUCT_OWNER)
 */
export function canCreateInviteLink(userRole: UserRole): boolean {
  return userRole === 'PRODUCT_OWNER';
}

/**
 * Check if role can view members list (all roles)
 */
export function canViewMembers(userRole: UserRole): boolean {
  return true;
}

// UI Helper: when restricted=true, disable interaction and dim the UI.
export function getRestrictionClass(restricted: boolean): string {
  return restricted ? 'opacity-40 cursor-not-allowed pointer-events-none' : '';
}

export function getRestrictionStyle(restricted: boolean): CSSProperties {
  return restricted ? { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' } : {};
}
