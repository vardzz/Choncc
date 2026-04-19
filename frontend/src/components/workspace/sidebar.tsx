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
        className={`flex shrink-0 flex-col border-r border-[#C2D8C4]/15 bg-[#2A2A2A]/70 overflow-hidden transition-all duration-300 ${
          isCollapsed ? "w-14" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center p-4 border-b border-[#C2D8C4]/10 bg-[#222222]/50">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-1.5 text-[#A0A0A0] hover:bg-[#C2D8C4]/10 hover:text-[#C2D8C4] transition"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <Menu className="h-4 w-4" />
          </button>
          {!isCollapsed && (
            <h3 className="ml-3 text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">
              Workspaces
            </h3>
          )}
        </div>

        {!isCollapsed && (
          <>
            {/* New Workspace Button */}
            <div className="border-b border-[#C2D8C4]/10 p-3">
              <button
                onClick={() => router.push("/workspace")}
                className="flex w-full items-center gap-2 rounded-xl border border-dashed border-[#C2D8C4]/30 px-4 py-3 text-left text-[#A0A0A0] transition hover:border-[#C2D8C4]/45 hover:bg-[#C2D8C4]/10 hover:text-[#C2D8C4]"
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
                    ? { Icon: Layers, iconBg: "bg-sky-500", iconColor: "text-white" }
                    : ws.slug.includes("horizon")
                    ? { Icon: Bot, iconBg: "bg-violet-500", iconColor: "text-white" }
                    : ws.slug.includes("portfolio")
                    ? { Icon: Globe, iconBg: "bg-emerald-500", iconColor: "text-white" }
                    : { Icon: User, iconBg: "bg-orange-500", iconColor: "text-white" };

                const { Icon, iconBg, iconColor } = iconConfig;

                return (
                  <button
                    key={ws.id}
                    onClick={() => router.push(`/workspace/${ws.slug}`)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-[#C2D8C4]/40 bg-[#C2D8C4]/10"
                        : "border-transparent hover:border-[#C2D8C4]/30 hover:bg-[#222222]/45"
                    }`}
                    title={ws.name}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                      <Icon className={`h-4 w-4 ${iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <p className={`truncate text-xl font-semibold leading-none ${isActive ? "text-[#F5F5F5]" : "text-[#F5F5F5]"}`}>
                        {ws.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#A0A0A0]">{metaText}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Collapsed Rail: Menu at top, plus at bottom only */}
        {isCollapsed && (
          <div className="flex flex-1 flex-col justify-end border-t border-[#C2D8C4]/10 p-2">
            <button
              onClick={() => router.push("/workspace")}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#C2D8C4]/20 text-[#A0A0A0] transition hover:border-[#C2D8C4]/40 hover:bg-[#C2D8C4]/10 hover:text-[#C2D8C4]"
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
