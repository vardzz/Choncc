"use client";

import { useRouter } from "next/navigation";
import { Plus, Menu, Layers, Bot, Globe, User } from "lucide-react";
import { useState } from "react";
import type { Workspace } from "@/lib/types";

type WorkspaceSidebarProps = {
  workspaces: Workspace[];
  activeSlug: string;
};

export function WorkspaceSidebar({ workspaces, activeSlug }: WorkspaceSidebarProps) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activityByIndex = ["6m", "4m", "1m", "1m"];

  return (
    <>
      {/* Main Sidebar */}
      <aside
        className={`flex shrink-0 flex-col border-r border-[#DDE5DD] bg-[#FFFFFF] overflow-hidden transition-all duration-300 dark:border-[rgba(194,216,196,0.05)] dark:bg-gradient-to-b dark:from-[#1A1A1A] dark:to-[#222222] ${
          isCollapsed ? "w-14" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center p-4 border-b border-[#DDE5DD] bg-[#FFFFFF] dark:border-[rgba(194,216,196,0.05)] dark:bg-[rgba(34,34,34,0.8)] dark:backdrop-blur-[20px]">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-1.5 text-[rgba(34,34,34,0.5)] hover:bg-[rgba(194,216,196,0.2)] hover:text-[#222222] transition dark:text-[rgba(194,216,196,0.4)] dark:hover:bg-[rgba(194,216,196,0.12)] dark:hover:text-[#C2D8C4]"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <Menu className="h-4 w-4" />
          </button>
          {!isCollapsed && (
            <h3 className="ml-3 text-xs font-semibold uppercase tracking-wider text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">
              Workspaces
            </h3>
          )}
        </div>

        {!isCollapsed && (
          <>
            {/* New Workspace Button */}
            <div className="border-b border-[#DDE5DD] p-3 dark:border-[rgba(194,216,196,0.05)]">
              <button
                onClick={() => router.push("/workspace")}
                className="flex w-full items-center gap-2 rounded-xl border border-dashed border-[#DDE5DD] px-4 py-3 text-left text-[rgba(34,34,34,0.5)] transition hover:border-[#C2D8C4] hover:bg-[rgba(194,216,196,0.16)] hover:text-[#222222] dark:border-[rgba(194,216,196,0.2)] dark:text-[rgba(194,216,196,0.4)] dark:hover:border-[rgba(194,216,196,0.4)] dark:hover:bg-[rgba(194,216,196,0.12)] dark:hover:text-[#C2D8C4]"
                title="New workspace"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm font-semibold">New Workspace</span>
              </button>
            </div>

            {/* Workspaces List */}
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {workspaces.map((ws, index) => {
                const isActive = activeSlug === ws.slug;
                const metaText = `${ws.description || "General"} \u00B7 ${activityByIndex[index] || "1m"}`;

                const iconConfig =
                  ws.slug.includes("dentara")
                    ? { Icon: Layers, iconBg: "bg-[#2E9DE8]", iconColor: "text-[#FFFFFF]" }
                    : ws.slug.includes("horizon")
                    ? { Icon: Bot, iconBg: "bg-[#8B5CF6]", iconColor: "text-[#FFFFFF]" }
                    : ws.slug.includes("portfolio")
                    ? { Icon: Globe, iconBg: "bg-[#10B981]", iconColor: "text-[#FFFFFF]" }
                    : { Icon: User, iconBg: "bg-[#F59E0B]", iconColor: "text-[#FFFFFF]" };

                const { Icon, iconBg, iconColor } = iconConfig;

                return (
                  <button
                    key={ws.id}
                    onClick={() => router.push(`/workspace/${ws.slug}`)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-[#C2D8C4] bg-[rgba(194,216,196,0.18)] dark:border-[rgba(194,216,196,0.28)] dark:bg-[rgba(194,216,196,0.1)]"
                        : "border-transparent hover:border-[#DDE5DD] hover:bg-[rgba(194,216,196,0.12)] dark:hover:border-[rgba(194,216,196,0.2)] dark:hover:bg-[rgba(194,216,196,0.08)]"
                    }`}
                    title={ws.name}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                      <Icon className={`h-4 w-4 ${iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xl font-semibold leading-none text-[#222222] dark:text-[#C2D8C4]">
                        {ws.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">{metaText}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Collapsed Rail: Menu at top, plus at bottom only */}
        {isCollapsed && (
          <div className="flex flex-1 flex-col justify-end border-t border-[#DDE5DD] p-2 dark:border-[rgba(194,216,196,0.05)]">
            <button
              onClick={() => router.push("/workspace")}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE5DD] text-[rgba(34,34,34,0.5)] transition hover:border-[#C2D8C4] hover:bg-[rgba(194,216,196,0.16)] hover:text-[#222222] dark:border-[rgba(194,216,196,0.2)] dark:text-[rgba(194,216,196,0.4)] dark:hover:border-[rgba(194,216,196,0.4)] dark:hover:bg-[rgba(194,216,196,0.12)] dark:hover:text-[#C2D8C4]"
              title="New workspace"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
