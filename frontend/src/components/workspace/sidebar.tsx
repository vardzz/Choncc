"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import type { Workspace } from "@/lib/types";

type WorkspaceSidebarProps = {
  workspaces: Workspace[];
  activeSlug: string;
};

export function WorkspaceSidebar({ workspaces, activeSlug }: WorkspaceSidebarProps) {
  const router = useRouter();

  return (
    <aside className="flex shrink-0 flex-col w-64 border-r border-[#C2D8C4]/15 bg-[#2A2A2A]/70 overflow-y-auto">
      <div className="sticky top-0 p-4 border-b border-[#C2D8C4]/10 bg-[#222222]/50 backdrop-blur-md">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C2D8C4] mb-3">
          Workspaces
        </h3>
        <button
          onClick={() => router.push("/workspace")}
          className="w-full px-3 py-2 rounded-lg bg-[#C2D8C4]/10 border border-[#C2D8C4]/30 text-[#C2D8C4] font-medium text-sm hover:bg-[#C2D8C4]/20 transition flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Workspace
        </button>
      </div>

      <div className="flex-1 p-3 space-y-2">
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
    </aside>
  );
}
