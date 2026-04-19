/**
 * Core types for Choncc workspace system
 * Defines users, workspaces, roles, and invites
 */

// Role definitions for workspace members
export type UserRole = 'PRODUCT_OWNER' | 'SCRUM_MASTER' | 'DEVELOPER';

export type TaskType = 'PRODUCT_BACKLOG_ITEM' | 'SPRINT_SUBTASK';

// User base type
export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
};

// Workspace member (user + role context)
export type WorkspaceMember = {
  id: string;
  userId: string;
  workspaceId: string;
  role: UserRole;
  joinedAt: Date;
  user: User;
};

// Invite link
export type WorkspaceInvite = {
  token: string;
  workspaceId: string;
  createdBy: string;
  createdAt: Date;
  expiresAt: Date;
  defaultRole: UserRole;
  maxUses?: number;
  usedCount: number;
};

// Workspace aggregate
export type Workspace = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  createdBy: string;  // Product Owner ID
  createdAt: Date;
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
};

// Kanban task type (used in board)
export type KanbanTask = {
  id: string;
  title: string;
  taskType: TaskType;
  parentTaskId?: string;
  status: 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  storyPoints: number;
  assignee: string;
  tags: string[];
  dateRange: string;
  workspaceId: string;
};

// Context for current user in a workspace
export type WorkspaceContext = {
  workspace: Workspace;
  currentUser: User;
  currentMember: WorkspaceMember;
  isProductOwner: boolean;
  isScrumMaster: boolean;
  isDeveloper: boolean;
};
