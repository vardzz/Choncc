"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Globe,
  Layers,
  Menu,
  Moon,
  Plus,
  Sparkles,
  Sun,
  User,
} from "lucide-react";

const workspaces = [
  { name: "Dentara", subtitle: "Health - 6m", icon: Layers, color: "bg-sky-500" },
  { name: "Horizon AI", subtitle: "AI/ML - 4m", icon: Briefcase, color: "bg-violet-500" },
  { name: "Personal Portfolio", subtitle: "Web - 1m", icon: Globe, color: "bg-emerald-500" },
  { name: "Personal", subtitle: "Tasks - 1m", icon: User, color: "bg-orange-500" },
];

const backlogItems = [
  { title: "OAuth2 integration", priority: "HIGH", category: "Backend" },
  { title: "Onboarding screens", priority: "MEDIUM", category: "UI/UX" },
  { title: "Data table component", priority: "LOW", category: "Frontend" },
  { title: "Notifications panel", priority: "LOW", category: "Frontend" },
];

function priorityClass(priority: string) {
  if (priority === "HIGH") {
    return "border-red-500/40 bg-red-500/10 text-red-300";
  }
  if (priority === "MEDIUM") {
    return "border-amber-500/40 bg-amber-500/10 text-amber-300";
  }
  return "border-sky-500/40 bg-sky-500/10 text-sky-300";
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-[#0B0914] text-zinc-100">
      <div className="h-full bg-[radial-gradient(circle_at_15%_0%,rgba(139,92,246,0.20),transparent_35%),radial-gradient(circle_at_85%_100%,rgba(59,130,246,0.10),transparent_40%)]">
        <header className="h-14 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-600/90">
                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Choncc</span>
              <Separator orientation="vertical" className="bg-white/20" />
              <span className="text-sm text-zinc-400">Dentara</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                <Sun className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                <Switch checked onCheckedChange={() => undefined} aria-label="Theme toggle" />
                <Moon className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
              </div>
              <Avatar className="h-9 w-9 border border-violet-400/40 bg-violet-600">
                <AvatarFallback className="bg-violet-600 text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="grid h-[calc(100vh-3.5rem)] grid-cols-1 lg:grid-cols-[250px_1fr_300px]">
          <Sidebar className="hidden border-r border-white/10 bg-slate-950/35 lg:block">
            <SidebarHeader>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                <span>Workspaces</span>
                <Menu className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <Button variant="outline" className="mt-3 w-full justify-start border-dashed text-zinc-400">
                <Plus className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                New Workspace
              </Button>
            </SidebarHeader>
            <SidebarContent className="h-[calc(100%-5.5rem)]">
              <ScrollArea className="h-full pr-1">
                <div className="space-y-2">
                  {workspaces.map((workspace, index) => {
                    const WorkspaceIcon = workspace.icon;

                    return (
                      <Card
                        key={workspace.name}
                        className={cn(
                          "border-white/10 bg-transparent p-0",
                          index === 0 && "border-violet-400/30 bg-violet-500/10",
                        )}
                      >
                        <CardContent className="flex items-center gap-3 p-3">
                          <div className={cn("inline-flex h-8 w-8 items-center justify-center rounded-xl", workspace.color)}>
                            <WorkspaceIcon className="h-4 w-4 text-white" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-zinc-100">{workspace.name}</p>
                            <p className="truncate text-xs text-zinc-500">{workspace.subtitle}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </SidebarContent>
          </Sidebar>

          <main className="min-h-0 overflow-hidden px-3 py-3 sm:px-4 sm:py-4">{children}</main>

          <Sidebar className="hidden border-l border-white/10 bg-slate-950/35 lg:block">
            <SidebarHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-100">Backlog</h2>
                  <p className="text-xs text-zinc-500">4 tasks</p>
                </div>
                <Menu className="mt-1 h-4 w-4 text-zinc-500" aria-hidden="true" />
              </div>
            </SidebarHeader>
            <SidebarContent className="flex h-[calc(100%-5.5rem)] flex-col gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">New Task</p>
                <div className="space-y-2.5">
                  <Input placeholder="Task title..." />
                  <Select defaultValue="frontend">
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="uiux">UI/UX</option>
                  </Select>
                  <Button className="w-full bg-violet-700 hover:bg-violet-600">+ Add to Backlog</Button>
                </div>
              </div>

              <ScrollArea className="min-h-0 flex-1 pr-1">
                <div className="space-y-3 pb-3">
                  {backlogItems.map((task) => (
                    <Card key={task.title} className="bg-zinc-900/80">
                      <CardContent className="space-y-3 p-4">
                        <Badge className={priorityClass(task.priority)}>{task.priority}</Badge>
                        <p className="text-sm font-semibold text-zinc-100">{task.title}</p>
                        <Badge variant="secondary" className="w-fit bg-emerald-500/20 text-emerald-300">
                          {task.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <Tooltip content="Backlog is simulated until backend is ready" className="w-full">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-400">
                  Temporary local demo data
                </div>
              </Tooltip>
            </SidebarContent>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
