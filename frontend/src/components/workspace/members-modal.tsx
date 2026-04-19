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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto rounded-l-3xl border-l border-[#C2D8C4]/15 bg-[#2A2A2A] shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#C2D8C4]/10 bg-[#222222]/50 px-6 py-4 backdrop-blur-md">
              <h2 className="text-lg font-bold text-[#F5F5F5]">Team Members</h2>
              <button
                onClick={onClose}
                className="text-[#A0A0A0] hover:text-[#F5F5F5] transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Invite Section - Only for PO */}
              {canCreateInvite && (
                <div className="space-y-3">
                  <div className="pb-4 border-b border-[#C2D8C4]/10">
                    <h3 className="text-sm font-semibold text-[#C2D8C4] mb-3">
                      Generate Invite Link
                    </h3>
                    {!inviteLink ? (
                      <button
                        onClick={handleGenerateInvite}
                        className="w-full px-4 py-2 rounded-xl bg-[#C2D8C4] text-[#222222] font-semibold hover:bg-[#C2D8C4]/90 transition"
                      >
                        Create Invite Link
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#222222]/50 border border-[#C2D8C4]/20">
                          <input
                            type="text"
                            value={inviteLink}
                            readOnly
                            className="flex-1 bg-transparent text-xs text-[#F5F5F5] outline-none"
                          />
                          <button
                            onClick={handleCopyLink}
                            className="p-1.5 hover:bg-[#C2D8C4]/20 rounded transition"
                            title="Copy link"
                          >
                            <Copy className="h-4 w-4 text-[#C2D8C4]" />
                          </button>
                        </div>
                        {copiedToken && (
                          <p className="text-xs text-[#C2D8C4]">✓ Copied to clipboard</p>
                        )}
                        <button
                          onClick={() => setInviteLink("")}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#C2D8C4]/10 text-[#C2D8C4] hover:bg-[#C2D8C4]/20 transition"
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
                <h3 className="text-sm font-semibold text-[#F5F5F5]">
                  Members ({workspace.members.length})
                </h3>
                <div className="space-y-2">
                  {workspace.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#222222]/50 border border-[#C2D8C4]/10 hover:border-[#C2D8C4]/30 transition"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#F5F5F5]">
                          {member.user.name}
                          {member.userId === currentUser.id && (
                            <span className="ml-2 text-xs text-[#C2D8C4]">(You)</span>
                          )}
                        </p>
                        <p className="text-xs text-[#A0A0A0]">{member.user.email}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Role Badge */}
                        <div className="px-2.5 py-1 rounded-full bg-[#C2D8C4]/20 border border-[#C2D8C4]/30">
                          <p className="text-xs font-semibold text-[#C2D8C4]">
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
                            className="text-xs px-2 py-1 rounded bg-[#222222]/50 border border-[#C2D8C4]/20 text-[#F5F5F5] hover:border-[#C2D8C4]/40 transition outline-none"
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
                <p className="text-xs text-[#A0A0A0]">
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
