"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Settings, User, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChonccIcon } from "@/components/ui/choncc-icon";
import { MembersModal } from "@/components/workspace/members-modal";
import { SettingsModal } from "@/components/workspace/settings-modal";
import type { Workspace, WorkspaceMember } from "@/lib/types";

type DashboardNavbarProps = {
  activeWorkspaceName: string;
  workspaceSlug: string;
};

const MENU_ITEMS = [
  { icon: Users, label: "Members", id: "members" },
  { icon: Settings, label: "Settings", id: "settings" },
  { icon: LogOut, label: "Logout", danger: true, id: "logout" },
];

// Mock current user and workspace
const mockCurrentUser = {
  id: "user-1",
  email: "po@example.com",
  name: "PO User",
  createdAt: new Date(),
};

const mockWorkspace: Workspace = {
  id: "ws-dentara",
  slug: "dentara",
  name: "Dentara",
  description: "Health platform",
  createdBy: "user-1",
  createdAt: new Date(),
  members: [
    {
      id: "mem-1",
      userId: "user-1",
      workspaceId: "ws-dentara",
      role: "PRODUCT_OWNER",
      joinedAt: new Date(),
      user: mockCurrentUser,
    },
    {
      id: "mem-2",
      userId: "user-2",
      workspaceId: "ws-dentara",
      role: "SCRUM_MASTER",
      joinedAt: new Date(),
      user: {
        id: "user-2",
        email: "sm@example.com",
        name: "Scrum Master",
        createdAt: new Date(),
      },
    },
    {
      id: "mem-3",
      userId: "user-3",
      workspaceId: "ws-dentara",
      role: "DEVELOPER",
      joinedAt: new Date(),
      user: {
        id: "user-3",
        email: "dev@example.com",
        name: "Developer",
        createdAt: new Date(),
      },
    },
  ],
  invites: [],
};

export function DashboardNavbar({ activeWorkspaceName, workspaceSlug }: DashboardNavbarProps) {
  const [dropOpen, setDropOpen] = useState(false);
  const [membersModalOpen, setMembersModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(event.target as Node)) return;
      setDropOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleMenuClick = (id: string) => {
    setDropOpen(false);
    if (id === "members") {
      setMembersModalOpen(true);
    } else if (id === "settings") {
      setSettingsModalOpen(true);
    } else if (id === "logout") {
      // Handle logout
      console.log("Logout");
    }
  };

  return (
    <>
      <header className="relative h-14 shrink-0 overflow-visible border-b border-[var(--ws-border)] bg-[var(--ws-surface)] px-5 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(90deg,rgba(34,34,34,0.14)_0%,rgba(194,216,196,0.2)_45%,rgba(34,34,34,0.14)_100%)] opacity-90 blur-lg" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C2D8C4]/35 to-transparent" />

        <div className="relative flex h-full items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <ChonccIcon size="sm" />
            <div className="flex items-center gap-3">
              <p className="text-base font-black tracking-tight text-[#F5F5F5]">Choncc</p>
              <span className="h-4 w-px bg-[#C2D8C4]/20" />
              <p className="text-xs font-medium text-[var(--ws-muted)]">{activeWorkspaceName}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setDropOpen(!dropOpen)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface-2)] px-2.5 py-1.5 text-xs font-medium text-[var(--ws-text)] backdrop-blur-md transition hover:border-[#C2D8C4]/40 focus:outline-none"
              >
                <User className="h-3.5 w-3.5" />
                Menu
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-surface)] backdrop-blur-xl overflow-hidden shadow-xl"
                  >
                    {MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMenuClick(item.id)}
                          className={`w-full px-4 py-3 text-left text-sm font-medium transition ${
                            item.danger
                              ? "text-red-400 hover:bg-red-500/10"
                              : "text-[var(--ws-text)] hover:bg-[var(--ws-accent-soft)]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Members Modal */}
      <MembersModal
        isOpen={membersModalOpen}
        onClose={() => setMembersModalOpen(false)}
        workspace={mockWorkspace}
        currentUser={mockCurrentUser}
        currentMember={mockWorkspace.members[0]}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </>
  );
}
