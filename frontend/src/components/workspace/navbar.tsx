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
      <header className="relative z-[70] h-14 shrink-0 overflow-visible border-b border-[#DDE5DD] bg-[rgba(255,255,255,0.86)] px-5 backdrop-blur-[20px] dark:border-[rgba(194,216,196,0.05)] dark:bg-[rgba(34,34,34,0.8)] dark:backdrop-blur-[20px]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(90deg,rgba(34,34,34,0.14)_0%,rgba(194,216,196,0.2)_45%,rgba(34,34,34,0.14)_100%)] opacity-90 blur-lg" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C2D8C4]/35 to-transparent" />

        <div className="relative flex h-full items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <ChonccIcon size="sm" />
            <div className="flex items-center gap-3">
              <p className="text-base font-black tracking-tight text-[#222222] dark:text-[#C2D8C4]">Choncc</p>
              <span className="h-4 w-px bg-[rgba(34,34,34,0.12)] dark:bg-[rgba(194,216,196,0.2)]" />
              <p className="text-xs font-medium text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.7)]">{activeWorkspaceName}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative z-[80]" ref={menuRef}>
              <button
                type="button"
                onClick={() => setDropOpen(!dropOpen)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-2.5 py-1.5 text-xs font-medium text-[#222222] shadow-[0_4px_20px_rgba(194,216,196,0.15)] transition hover:border-[#C2D8C4] focus:outline-none dark:border-[rgba(194,216,196,0.15)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
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
                    className="absolute right-0 top-full z-[90] mt-2 w-48 rounded-2xl border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] shadow-[0_10px_30px_rgba(194,216,196,0.15)] overflow-hidden dark:border-[rgba(194,216,196,0.15)] dark:bg-[rgba(42,42,42,0.6)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  >
                    {MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMenuClick(item.id)}
                          className={`w-full px-4 py-3 text-left text-sm font-medium transition ${
                            item.danger
                              ? "text-[#D94B4B] hover:bg-[rgba(217,75,75,0.1)]"
                              : "text-[#222222] hover:bg-[rgba(194,216,196,0.18)] dark:text-[#C2D8C4] dark:hover:bg-[rgba(194,216,196,0.12)]"
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
