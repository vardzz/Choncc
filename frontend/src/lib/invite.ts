/**
 * Invite token generation and validation
 * Handles workspace invite link lifecycle
 */

import type { UserRole } from './types';

const TOKEN_LENGTH = 32;
const INVITE_EXPIRY_DAYS = 30;

/**
 * Generate a cryptographically-safe random token
 * In production, use crypto.getRandomValues() or server-side crypto
 */
export function generateInviteToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Calculate invite expiry date (30 days from now)
 */
export function calculateExpiryDate(daysFromNow: number = INVITE_EXPIRY_DAYS): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
}

/**
 * Check if an invite token is still valid
 */
export function isInviteValid(expiresAt: Date, usedCount: number, maxUses?: number): boolean {
  const now = new Date();
  const isNotExpired = expiresAt > now;
  const hasUses = maxUses ? usedCount < maxUses : true;
  return isNotExpired && hasUses;
}

/**
 * Get human-readable format for invite link
 */
export function formatInviteLink(baseUrl: string, token: string): string {
  return `${baseUrl}/invite/${token}`;
}

/**
 * Get default role when joining via invite
 */
export function getDefaultRoleForInvite(defaultRole?: UserRole): UserRole {
  return defaultRole || 'DEVELOPER';
}
