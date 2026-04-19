"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Workspace, WorkspaceMember, User } from "@/lib/types";
import { canManageMembers, canCreateInviteLink } from "@/lib/rbac";
import { generateInviteToken, formatInviteLink, calculateExpiryDate } from "@/lib/invite";

type MembersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  workspace: Workspace;
  currentUser: User;
  currentMember: WorkspaceMember;
};

export function MembersModal({
  isOpen,
  onClose,
  workspace,
  currentUser,
  currentMember,
}: MembersModalProps) {
  const [inviteLink, setInviteLink] = useState<string>("");
  const [copiedToken, setCopiedToken] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const isProductOwner = canManageMembers(currentMember.role);
  const canCreateInvite = canCreateInviteLink(currentMember.role);

  const handleGenerateInvite = () => {
    const token = generateInviteToken();
    const link = formatInviteLink(window.location.origin, token);
    setInviteLink(link);
  };

  const handleCopyLink = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto rounded-l-3xl border-l border-[#DDE5DD] bg-[#FFFFFF] shadow-[0_10px_30px_rgba(194,216,196,0.15)] dark:border-[rgba(194,216,196,0.15)] dark:bg-[#2A2A2A] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#DDE5DD] bg-[#FFFFFF] px-6 py-4 backdrop-blur-md dark:border-[rgba(194,216,196,0.15)] dark:bg-[rgba(34,34,34,0.8)] dark:backdrop-blur-[20px]">
              <h2 className="text-lg font-bold text-[#222222] dark:text-[#C2D8C4]">Team Members</h2>
              <button
                onClick={onClose}
                className="text-[rgba(34,34,34,0.5)] hover:text-[#222222] transition dark:text-[rgba(194,216,196,0.4)] dark:hover:text-[#C2D8C4]"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Invite Section - Only for PO */}
              {canCreateInvite && (
                <div className="space-y-3">
                  <div className="pb-4 border-b border-[#C2D8C4]/10">
                    <h3 className="text-sm font-semibold text-[#222222] dark:text-[#C2D8C4] mb-3">
                      Generate Invite Link
                    </h3>
                    {!inviteLink ? (
                      <button
                        onClick={handleGenerateInvite}
                        className="w-full px-4 py-2 rounded-xl bg-[#C2D8C4] text-[#222222] font-semibold hover:bg-[#B1C7B3] transition dark:bg-gradient-to-r dark:from-[#C2D8C4] dark:to-[#A8BDAA]"
                      >
                        Create Invite Link
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#FFFFFF] border border-[rgba(34,34,34,0.08)] dark:bg-[rgba(42,42,42,0.6)] dark:border-[rgba(194,216,196,0.2)]">
                          <input
                            type="text"
                            value={inviteLink}
                            readOnly
                            className="flex-1 bg-transparent text-xs text-[#222222] outline-none dark:text-[#C2D8C4]"
                          />
                          <button
                            onClick={handleCopyLink}
                            className="p-1.5 hover:bg-[rgba(194,216,196,0.18)] rounded transition dark:hover:bg-[rgba(194,216,196,0.12)]"
                            title="Copy link"
                          >
                            <Copy className="h-4 w-4 text-[#C2D8C4]" />
                          </button>
                        </div>
                        {copiedToken && (
                          <p className="text-xs text-[#222222] dark:text-[#C2D8C4]">✓ Copied to clipboard</p>
                        )}
                        <button
                          onClick={() => setInviteLink("")}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-[rgba(194,216,196,0.2)] text-[#222222] hover:bg-[rgba(194,216,196,0.3)] transition dark:bg-[rgba(194,216,196,0.12)] dark:text-[#C2D8C4] dark:hover:bg-[rgba(194,216,196,0.18)]"
                        >
                          Generate New
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Members List */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#222222] dark:text-[#C2D8C4]">
                  Members ({workspace.members.length})
                </h3>
                <div className="space-y-2">
                  {workspace.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#FFFFFF] border border-[rgba(34,34,34,0.08)] hover:border-[#C2D8C4] transition shadow-[0_4px_20px_rgba(194,216,196,0.15)] dark:bg-[rgba(42,42,42,0.6)] dark:border-[rgba(194,216,196,0.15)] dark:hover:border-[rgba(194,216,196,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#222222] dark:text-[#C2D8C4]">
                          {member.user.name}
                          {member.userId === currentUser.id && (
                            <span className="ml-2 text-xs text-[#222222] dark:text-[#C2D8C4]">(You)</span>
                          )}
                        </p>
                        <p className="text-xs text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">{member.user.email}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Role Badge */}
                        <div className="px-2.5 py-1 rounded-full bg-[rgba(194,216,196,0.2)] border border-[#C2D8C4] dark:bg-[rgba(194,216,196,0.12)] dark:border-[rgba(194,216,196,0.3)]">
                          <p className="text-xs font-semibold text-[#222222] dark:text-[#C2D8C4]">
                            {member.role.replace(/_/g, " ")}
                          </p>
                        </div>

                        {/* Role Dropdown - Only for PO to manage others */}
                        {isProductOwner && member.userId !== currentUser.id && (
                          <select
                            defaultValue={member.role}
                            onChange={(e) => {
                              console.log(`Change ${member.user.name} role to ${e.target.value}`);
                            }}
                            className="text-xs px-2 py-1 rounded bg-[#FFFFFF] border border-[rgba(34,34,34,0.08)] text-[#222222] hover:border-[#C2D8C4] transition outline-none dark:bg-[rgba(42,42,42,0.6)] dark:border-[rgba(194,216,196,0.2)] dark:text-[#C2D8C4] dark:hover:border-[rgba(194,216,196,0.4)]"
                          >
                            <option value="PRODUCT_OWNER">Product Owner</option>
                            <option value="SCRUM_MASTER">Scrum Master</option>
                            <option value="DEVELOPER">Developer</option>
                            <option value="STAKEHOLDER">Stakeholder</option>
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Text */}
              <div className="pt-4 border-t border-[#C2D8C4]/10">
                <p className="text-xs text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">
                  {isProductOwner
                    ? "As Product Owner, you can manage members and their roles."
                    : "You can view all team members and their roles."}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
