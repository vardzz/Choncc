"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, Globe, Layers, Menu, Plus, User } from "lucide-react";
import { useState } from "react";

export type Workspace = {
  id: string | number;
  name: string;
  health?: string;
  type?: string;
  tag?: string;
  members?: number;
};

export interface WorkspaceSidebarProps {
  workspaces: Workspace[];
  activeWorkspaceId: string | number;
  onSelectWorkspace: (workspaceId: string | number) => void;
  onNewWorkspace: () => void;
}

const iconMap = [Layers, Briefcase, Globe, User];
const colorMap = [
  "from-[#425243] to-[#6B7C6D]",
  "from-[#2A2A2A] to-[#566457]",
  "from-[#4A5D4B] to-[#8EA98F]",
  "from-[#1F1F1F] to-[#556356]",
];

export function WorkspaceSidebar({
  workspaces,
  activeWorkspaceId,
  onSelectWorkspace,
  onNewWorkspace,
}: WorkspaceSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-full shrink-0 flex-col overflow-hidden border-r border-[#C2D8C4]/12 bg-[#2A2A2A]/75 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="border-b border-[#C2D8C4]/12 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {!isCollapsed ? (
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#A1AAA1]">Workspaces</p>
            </div>
          ) : null}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border border-[#C2D8C4]/20 text-[#B0B9B0] transition-colors duration-300 hover:bg-[#C2D8C4]/10 hover:text-[#F5F5F5]"
            onClick={() => setIsCollapsed((current) => !current)}
            aria-label={isCollapsed ? "Expand workspace sidebar" : "Collapse workspace sidebar"}
          >
            <Menu className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {isCollapsed ? (
        <div className="px-3 pt-3">
          <div className="flex justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl border border-[#C2D8C4]/20 text-[#B0B9B0] hover:bg-[#C2D8C4]/10 hover:text-[#F5F5F5]"
              onClick={onNewWorkspace}
              aria-label="New Workspace"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-3 pt-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full justify-start gap-2 rounded-2xl border-dashed border-[#C2D8C4]/20 bg-transparent text-[#B0B9B0] hover:border-[#C2D8C4]/35 hover:bg-[#C2D8C4]/10 hover:text-[#F5F5F5]"
            onClick={onNewWorkspace}
            aria-label="New Workspace"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-sm font-medium">New Workspace</span>
          </Button>
        </div>
      )}

      <div className={`min-h-0 flex-1 p-3 pt-2 transition-all duration-300 ${isCollapsed ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <ScrollArea className="h-full pr-1">
          <div className="space-y-2.5">
            {workspaces.map((workspace, index) => {
              const Icon = iconMap[index % iconMap.length];
              const iconColor = colorMap[index % colorMap.length];
              const isActive = workspace.id === activeWorkspaceId;

              return (
                <Card
                  key={workspace.id}
                  className={`cursor-pointer border transition-colors duration-300 ${
                    isActive
                        ? "border-[#C2D8C4]/28 bg-[#C2D8C4]/12 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                        : "border-[#C2D8C4]/12 bg-[#222222]/45 hover:border-[#C2D8C4]/22 hover:bg-[#2A2A2A]/70"
                  }`}
                  onClick={() => onSelectWorkspace(workspace.id)}
                >
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${iconColor}`}>
                      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                    {!isCollapsed ? (
                      <>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium tracking-tight text-[#F5F5F5]">{workspace.name}</p>
                          <p className="truncate text-xs text-[#AEB7AE]">
                            {workspace.tag ?? workspace.type ?? "Workspace"}
                            {workspace.members !== undefined
                              ? ` - ${workspace.members} member${workspace.members === 1 ? "" : "s"}`
                              : workspace.health
                                ? ` - ${workspace.health}`
                                : ""}
                          </p>
                        </div>
                        {isActive ? (
                          <Badge variant="secondary" className="ml-auto border border-[#C2D8C4]/25 bg-[#3A4A3B]/70 text-[#E4ECE4]">
                            Active
                          </Badge>
                        ) : null}
                      </>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>

    </aside>
  );
}
