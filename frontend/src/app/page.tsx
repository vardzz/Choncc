"use client";

import { BacklogSidebar, type Task as BacklogTask, type TaskStatus } from "@/components/dashboard/backlog";
import { DashboardMain } from "@/components/dashboard/main";
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { type Workspace } from "@/components/dashboard/workspace";
import { WorkspaceSidebar } from "@/components/dashboard/workspace";
import { useMemo, useState } from "react";

const initialWorkspaces: Workspace[] = [
  { id: "ws-dentara", name: "Dentara", health: "6m", type: "Health" },
  { id: "ws-horizon", name: "Horizon AI", health: "4m", type: "AI/ML" },
  { id: "ws-portfolio", name: "Personal Portfolio", health: "1m", type: "Web" },
  { id: "ws-personal", name: "Personal", health: "1m", type: "Tasks" },
];

const initialTasks: BacklogTask[] = [
  {
    id: "tsk-101",
    title: "Setup CI/CD pipeline",
    status: "To Do",
    priority: "HIGH",
    category: "Backend",
    storyPoints: 5,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-102",
    title: "Responsive nav sidebar",
    status: "To Do",
    priority: "MEDIUM",
    category: "Frontend",
    storyPoints: 3,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-103",
    title: "User settings page",
    status: "In Progress",
    priority: "MEDIUM",
    category: "UI/UX",
    storyPoints: 4,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-104",
    title: "Search with Elastic",
    status: "In Progress",
    priority: "HIGH",
    category: "Backend",
    storyPoints: 5,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-105",
    title: "Dark mode tokens",
    status: "Review",
    priority: "LOW",
    category: "UI/UX",
    storyPoints: 2,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-106",
    title: "Skeleton loading states",
    status: "Done",
    priority: "LOW",
    category: "Frontend",
    storyPoints: 2,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-107",
    title: "OAuth2 integration",
    status: "Backlog",
    priority: "HIGH",
    category: "Backend",
    storyPoints: 3,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-108",
    title: "Onboarding screens",
    status: "Backlog",
    priority: "MEDIUM",
    category: "UI/UX",
    storyPoints: 2,
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-109",
    title: "Data table component",
    status: "Backlog",
    priority: "LOW",
    category: "Frontend",
    storyPoints: 2,
    workspaceId: "ws-dentara",
  },
];

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(String(initialWorkspaces[0]?.id ?? "ws-dentara"));
  const [tasks, setTasks] = useState<BacklogTask[]>(initialTasks);

  const activeWorkspace = useMemo(
    () => workspaces.find((workspace) => workspace.id === activeWorkspaceId) ?? workspaces[0],
    [activeWorkspaceId, workspaces],
  );

  const workspaceTasks = useMemo(
    () => tasks.filter((task) => task.workspaceId === activeWorkspaceId),
    [tasks, activeWorkspaceId],
  );

  const boardTasks = workspaceTasks.filter((task) => task.status !== "Backlog");
  const backlogTasks = workspaceTasks.filter((task) => task.status === "Backlog");

  const addTask = (title: string, category: string) => {
    setTasks((current) => {
      const newTask: BacklogTask = {
        id: `tsk-${Date.now()}`,
        title,
        status: "Backlog",
        priority: "MEDIUM",
        category,
        storyPoints: 2,
        workspaceId: activeWorkspaceId,
      };

      return [newTask, ...current];
    });
  };

  const moveTask = (taskId: string, status: TaskStatus) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) return task;
        return { ...task, status };
      }),
    );
  };

  const promoteTaskToTodo = (taskId: string) => {
    moveTask(taskId, "To Do");
  };

  const createWorkspace = (name: string) => {
    setWorkspaces((current) => {
      const workspace: Workspace = {
        id: `ws-${Date.now()}`,
        name,
        health: "0m",
        type: "General",
      };

      return [workspace, ...current];
    });
  };

  const switchWorkspace = (workspaceId: string | number) => {
    setActiveWorkspaceId(String(workspaceId));
  };

  return (
    <div
      className={`h-screen overflow-hidden text-white ${
        theme === "dark"
          ? "bg-slate-950"
          : "bg-zinc-100 text-zinc-950"
      }`}
    >
      <div className="h-full bg-[radial-gradient(circle_at_12%_0%,rgba(139,92,246,0.22),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(59,130,246,0.16),transparent_40%)]">
        <div className="grid h-full grid-rows-[56px_1fr]">
          <DashboardNavbar
            activeWorkspaceName={activeWorkspace?.name ?? "Workspace"}
            isDarkMode={theme === "dark"}
            onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          />

          <div className="grid min-h-0 grid-cols-[auto_1fr_auto]">
            <WorkspaceSidebar
              workspaces={workspaces}
              activeWorkspaceId={activeWorkspaceId}
              onSelectWorkspace={switchWorkspace}
              onNewWorkspace={() => {
                const name = window.prompt("Workspace name");
                if (!name) return;
                const trimmed = name.trim();
                if (!trimmed) return;
                createWorkspace(trimmed);
              }}
            />
            <main className="min-h-0 px-3 py-3">
              <DashboardMain boardTasks={boardTasks} onMoveTask={moveTask} />
            </main>
            <BacklogSidebar backlogTasks={backlogTasks} onAddTask={addTask} onPromoteTask={promoteTaskToTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}
