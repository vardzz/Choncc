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
  "from-zinc-700 to-zinc-500",
  "from-zinc-800 to-zinc-600",
  "from-zinc-700 to-zinc-400",
  "from-zinc-900 to-zinc-600",
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
      className={`h-full border-r border-black/5 bg-white/70 transition-all duration-500 ease-in-out dark:border-white/5 dark:bg-zinc-900/55 ${
        isCollapsed ? "w-16" : "w-64"
      } shrink-0 overflow-hidden`}
    >
      <div className="border-b border-black/5 px-3 py-3 transition-colors duration-500 ease-in-out dark:border-white/5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 rounded-lg border border-black/10 text-zinc-500 transition-colors duration-500 ease-in-out hover:bg-black/5 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
            onClick={() => setIsCollapsed((current) => !current)}
            aria-label={isCollapsed ? "Expand workspace sidebar" : "Collapse workspace sidebar"}
          >
            <Menu className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          {!isCollapsed ? <span className="select-none">Workspaces</span> : null}
        </div>
      </div>

      <div className="border-b border-black/5 px-2 py-2 transition-colors duration-500 ease-in-out dark:border-white/5">
        {!isCollapsed ? (
          <Button
            variant="outline"
            className="w-full justify-start border-dashed border-black/10 bg-transparent text-zinc-600 transition-colors duration-500 ease-in-out hover:border-zinc-400 hover:bg-zinc-200/40 hover:text-zinc-900 dark:border-white/15 dark:text-zinc-400 dark:hover:border-zinc-400 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-100"
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
              className="h-8 w-8 rounded-lg border-none text-zinc-600 transition-colors duration-500 ease-in-out hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-zinc-100"
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
                  className={`cursor-pointer border transition-colors duration-500 ease-in-out ${
                    isActive
                      ? "border-zinc-300/70 bg-zinc-100/80 shadow-sm shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-800/60 dark:shadow-none"
                      : "border-black/5 bg-white/45 hover:border-zinc-300 hover:bg-zinc-100/70 dark:border-white/5 dark:bg-transparent dark:hover:border-zinc-700 dark:hover:bg-zinc-800/40"
                  }`}
                  onClick={() => onSelectWorkspace(workspace.id)}
                >
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${iconColor}`}>
                      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium tracking-tight text-zinc-900 transition-colors duration-500 ease-in-out dark:text-zinc-100">{workspace.name}</p>
                      <p className="truncate text-xs text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">
                        {workspace.tag ?? workspace.type ?? "Workspace"}
                        {workspace.members !== undefined
                          ? ` - ${workspace.members} member${workspace.members === 1 ? "" : "s"}`
                          : workspace.health
                            ? ` - ${workspace.health}`
                            : ""}
                      </p>
                    </div>
                    {isActive ? (
                      <Badge variant="secondary" className="ml-auto border border-black/10 bg-zinc-200 text-zinc-700 transition-colors duration-500 ease-in-out dark:border-white/10 dark:bg-zinc-700 dark:text-zinc-100">
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
