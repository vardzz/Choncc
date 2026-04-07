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
  "from-sky-500 to-cyan-500",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
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
      className={`h-full border-r border-white/10 bg-slate-950/45 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      } shrink-0 overflow-hidden`}
    >
      <div className="border-b border-white/10 px-3 py-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 rounded-lg border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            onClick={() => setIsCollapsed((current) => !current)}
            aria-label={isCollapsed ? "Expand workspace sidebar" : "Collapse workspace sidebar"}
          >
            <Menu className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          {!isCollapsed ? <span className="select-none">Workspaces</span> : null}
        </div>
      </div>

      <div className="border-b border-white/10 px-2 py-2">
        {!isCollapsed ? (
          <Button
            variant="outline"
            className="w-full justify-start border-dashed border-white/15 bg-transparent text-zinc-400 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
            onClick={onNewWorkspace}
          >
            <Plus className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            New Workspace
          </Button>
        ) : (
          <div className="flex justify-center">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg border-none text-zinc-300 hover:bg-white/5 hover:text-white"
              onClick={onNewWorkspace}
              aria-label="New Workspace"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      <div className={isCollapsed ? "hidden pointer-events-none opacity-0" : "h-[calc(100%-8.25rem)] p-3 pt-2"}>
        <ScrollArea className="h-full pr-1">
          <div className="space-y-2">
            {workspaces.map((workspace, index) => {
              const Icon = iconMap[index % iconMap.length];
              const iconColor = colorMap[index % colorMap.length];
              const isActive = workspace.id === activeWorkspaceId;

              return (
                <Card
                  key={workspace.id}
                  className={`cursor-pointer border transition ${
                    isActive
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-transparent hover:border-white/15 hover:bg-white/5"
                  }`}
                  onClick={() => onSelectWorkspace(workspace.id)}
                >
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${iconColor}`}>
                      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-100">{workspace.name}</p>
                      <p className="truncate text-xs text-zinc-500">
                        {workspace.tag ?? workspace.type ?? "Workspace"}
                        {workspace.members !== undefined
                          ? ` - ${workspace.members} member${workspace.members === 1 ? "" : "s"}`
                          : workspace.health
                            ? ` - ${workspace.health}`
                            : ""}
                      </p>
                    </div>
                    {isActive ? (
                      <Badge variant="secondary" className="ml-auto bg-violet-500/20 text-violet-300">
                        Active
                      </Badge>
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
