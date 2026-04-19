"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { DashboardNavbar } from "@/components/workspace/navbar";
import { WorkspaceSidebar } from "@/components/workspace/sidebar";
import { BacklogPane } from "@/components/workspace/backlog";
import { BoardPane } from "@/components/workspace/board";
import { WorkspaceThemeProvider } from "@/components/workspace/workspace-theme-provider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { KanbanTask, Workspace, WorkspaceMember, WorkspaceContext } from "@/lib/types";

const BOARD_STATUSES: Array<KanbanTask["status"]> = ["Backlog", "To Do", "In Progress", "Review", "Done"];

function isBoardStatus(status: string): status is KanbanTask["status"] {
  return BOARD_STATUSES.includes(status as KanbanTask["status"]);
}

// Mock data - in production, fetch from backend
const mockWorkspaces: Workspace[] = [
  {
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
        user: { id: "user-1", email: "po@example.com", name: "PO User", createdAt: new Date() },
      },
    ],
    invites: [],
  },
  {
    id: "ws-horizon",
    slug: "horizon",
    name: "Horizon AI",
    description: "AI/ML project",
    createdBy: "user-1",
    createdAt: new Date(),
    members: [],
    invites: [],
  },
];

const mockTasks: KanbanTask[] = [
  {
    id: "tsk-101",
    title: "Setup CI/CD pipeline",
    status: "To Do",
    priority: "HIGH",
    category: "Backend",
    storyPoints: 5,
    assignee: "Jordan Diaz",
    tags: ["Infra"],
    dateRange: "Apr 08 - Apr 10",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-102",
    title: "Responsive nav sidebar",
    status: "To Do",
    priority: "MEDIUM",
    category: "Frontend",
    storyPoints: 3,
    assignee: "Ava Kim",
    tags: ["UI"],
    dateRange: "Apr 08 - Apr 12",
    workspaceId: "ws-dentara",
  },
];

const mockCurrentUser = {
  id: "user-1",
  email: "po@example.com",
  name: "PO User",
  createdAt: new Date(),
};

type WorkspacePageParams = {
  workspaceSlug: string;
};

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const workspaceSlug = params?.workspaceSlug as string;

  const [tasks, setTasks] = useState<KanbanTask[]>(mockTasks);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [currentMember, setCurrentMember] = useState<WorkspaceMember | null>(null);

  // Load workspace data
  useEffect(() => {
    const ws = mockWorkspaces.find((w) => w.slug === workspaceSlug);
    if (ws) {
      setWorkspace(ws);
      // In production, fetch current user's member record.
      // Fallback to creator-as-PO for local mock workspaces with empty member lists.
      const member =
        ws.members.find((m) => m.userId === mockCurrentUser.id) ??
        ws.members[0] ??
        {
          id: `mem-${ws.id}-${mockCurrentUser.id}`,
          userId: mockCurrentUser.id,
          workspaceId: ws.id,
          role: "PRODUCT_OWNER" as const,
          joinedAt: ws.createdAt,
          user: mockCurrentUser,
        };

      setCurrentMember(member);
    } else {
      router.push("/workspace");
    }
  }, [workspaceSlug, router]);

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (!isBoardStatus(destination.droppableId)) return;
    const nextStatus = destination.droppableId as KanbanTask["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggableId
          ? {
              ...task,
              status: nextStatus,
            }
          : task
      )
    );
  };

  const workspaceTasks = tasks.filter((t) => t.workspaceId === workspace?.id);

  if (!workspace || !currentMember) {
    return (
      <WorkspaceThemeProvider>
        <div className="flex h-screen items-center justify-center bg-[var(--ws-bg)]">
          <div className="text-[var(--ws-muted)]">Loading workspace...</div>
        </div>
      </WorkspaceThemeProvider>
    );
  }

  return (
    <WorkspaceThemeProvider>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen flex-col bg-[var(--ws-bg)] text-[var(--ws-text)]">
          {/* Navbar */}
          <DashboardNavbar 
            activeWorkspaceName={workspace.name}
            workspaceSlug={workspaceSlug}
          />

          {/* 3-Pane Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Pane: Workspace Sidebar */}
            <WorkspaceSidebar workspaces={mockWorkspaces} activeSlug={workspaceSlug} />

            {/* Center Pane: Backlog */}
            <BacklogPane 
              backlogTasks={workspaceTasks.filter((t) => t.status === "Backlog")}
              onAddTask={(title, category) => {
                const newTask: KanbanTask = {
                  id: `tsk-${Date.now()}`,
                  title,
                  category,
                  status: "Backlog",
                  priority: "MEDIUM",
                  storyPoints: 0,
                  assignee: "",
                  tags: [],
                  dateRange: "",
                  workspaceId: workspace.id,
                };
                setTasks((prevTasks) => [...prevTasks, newTask]);
              }}
              currentRole={currentMember.role}
            />

            {/* Right Pane: Kanban Board */}
            <BoardPane 
              tasks={workspaceTasks}
              currentRole={currentMember.role}
            />
          </div>
        </div>
      </DragDropContext>
    </WorkspaceThemeProvider>
  );
}
