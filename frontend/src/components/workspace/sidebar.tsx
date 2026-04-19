"use client";

import { useRouter } from "next/navigation";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Workspace } from "@/lib/types";

type WorkspaceSidebarProps = {
  workspaces: Workspace[];
  activeSlug: string;
};

export function WorkspaceSidebar({ workspaces, activeSlug }: WorkspaceSidebarProps) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* Main Sidebar */}
      <aside
        className={`flex shrink-0 flex-col border-r border-[#C2D8C4]/15 bg-[#2A2A2A]/70 overflow-hidden transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-3 border-b border-[#C2D8C4]/10 bg-[#222222]/50 backdrop-blur-md">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C2D8C4]">
              Workspaces
            </h3>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-[#C2D8C4]/10 rounded-lg transition"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4 text-[#C2D8C4]" />
            ) : (
              <X className="h-4 w-4 text-[#C2D8C4]" />
            )}
          </button>
        </div>

        {/* New Workspace Button */}
        <div className="p-2 border-b border-[#C2D8C4]/10">
          <button
            onClick={() => router.push("/workspace")}
            className="w-full p-2 rounded-lg bg-[#C2D8C4]/10 border border-[#C2D8C4]/30 text-[#C2D8C4] hover:bg-[#C2D8C4]/20 transition flex items-center justify-center"
            title="New workspace"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Workspaces List */}
        {!isCollapsed && (
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => router.push(`/workspace/${ws.slug}`)}
                className={`w-full px-4 py-3 rounded-2xl text-left transition ${
                  activeSlug === ws.slug
                    ? "bg-[#C2D8C4]/20 border border-[#C2D8C4]/40"
                    : "bg-transparent border border-[#C2D8C4]/10 hover:border-[#C2D8C4]/30"
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    activeSlug === ws.slug ? "text-[#C2D8C4]" : "text-[#F5F5F5]"
                  }`}
                >
                  {ws.name}
                </p>
                <p className="text-xs text-[#A0A0A0] mt-0.5">{ws.description || "No description"}</p>
              </button>
            ))}
          </div>
        )}

        {/* Collapsed Icons List */}
        {isCollapsed && (
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => router.push(`/workspace/${ws.slug}`)}
                className={`w-full p-3 rounded-lg transition flex items-center justify-center ${
                  activeSlug === ws.slug
                    ? "bg-[#C2D8C4]/20 border border-[#C2D8C4]/40"
                    : "bg-transparent border border-[#C2D8C4]/10 hover:border-[#C2D8C4]/30"
                }`}
                title={ws.name}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeSlug === ws.slug
                      ? "bg-[#C2D8C4] text-[#222222]"
                      : "bg-[#C2D8C4]/30 text-[#C2D8C4]"
                  }`}
                >
                  {ws.name.charAt(0).toUpperCase()}
                </div>
              </button>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
