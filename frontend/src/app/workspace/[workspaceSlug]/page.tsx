"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { DashboardNavbar } from "@/components/workspace/navbar";
import { WorkspaceSidebar } from "@/components/workspace/sidebar";
import { BacklogPane } from "@/components/workspace/backlog";
import { BoardPane } from "@/components/workspace/board";
import { WorkspaceThemeProvider } from "@/components/workspace/workspace-theme-provider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { KanbanTask, Workspace, WorkspaceMember } from "@/lib/types";
import { hasPermission } from "@/lib/rbac";

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
    id: "tsk-100",
    title: "Implement role-based sprint workflow",
    taskType: "PRODUCT_BACKLOG_ITEM",
    status: "In Progress",
    priority: "HIGH",
    category: "Backend",
    storyPoints: 8,
    assignee: "",
    tags: ["Scrum"],
    dateRange: "Apr 08 - Apr 21",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-101",
    title: "Define RBAC matrix in policy layer",
    taskType: "SPRINT_SUBTASK",
    parentTaskId: "tsk-100",
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
    title: "Apply role locks in workspace UI",
    taskType: "SPRINT_SUBTASK",
    parentTaskId: "tsk-100",
    status: "In Progress",
    priority: "MEDIUM",
    category: "Frontend",
    storyPoints: 3,
    assignee: "Ava Kim",
    tags: ["UI"],
    dateRange: "Apr 08 - Apr 12",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-103",
    title: "Document Definition of Done",
    taskType: "PRODUCT_BACKLOG_ITEM",
    status: "Backlog",
    priority: "MEDIUM",
    category: "Documentation",
    storyPoints: 3,
    assignee: "",
    tags: ["Scrum"],
    dateRange: "Apr 14 - Apr 21",
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

  const reconcileParentStatuses = (allTasks: KanbanTask[]): KanbanTask[] => {
    const subtasksByParent = allTasks.reduce<Record<string, KanbanTask[]>>((acc, task) => {
      if (task.taskType !== "SPRINT_SUBTASK" || !task.parentTaskId) {
        return acc;
      }

      if (!acc[task.parentTaskId]) {
        acc[task.parentTaskId] = [];
      }

      acc[task.parentTaskId].push(task);
      return acc;
    }, {});

    return allTasks.map((task) => {
      if (task.taskType !== "PRODUCT_BACKLOG_ITEM") {
        return task;
      }

      const relatedSubtasks = subtasksByParent[task.id] ?? [];
      if (relatedSubtasks.length === 0) {
        return task;
      }

      const allDone = relatedSubtasks.every((subtask) => subtask.status === "Done");
      if (allDone && task.status !== "Done") {
        return { ...task, status: "Done" };
      }

      if (!allDone && (task.status === "Done" || task.status === "Backlog")) {
        return { ...task, status: "In Progress" };
      }

      return task;
    });
  };

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

    if (!currentMember || !hasPermission(currentMember.role, "move-board-cards")) {
      return;
    }

    setTasks((prevTasks) =>
      reconcileParentStatuses(
        prevTasks.map((task) =>
          task.id === draggableId && task.taskType === "SPRINT_SUBTASK"
            ? {
                ...task,
                status: nextStatus,
              }
            : task
        )
      )
    );
  };

  const workspaceTasks = tasks.filter((t) => t.workspaceId === workspace?.id);
  const productBacklogItems = workspaceTasks.filter((task) => task.taskType === "PRODUCT_BACKLOG_ITEM");
  const sprintBacklogItems = workspaceTasks.filter(
    (task) => task.taskType === "SPRINT_SUBTASK" && task.status !== "Backlog"
  );

  if (!workspace || !currentMember) {
    return (
      <WorkspaceThemeProvider>
        <div className="flex h-screen items-center justify-center bg-[#F9FAF9] dark:bg-[#222222]">
          <div className="text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">Loading workspace...</div>
        </div>
      </WorkspaceThemeProvider>
    );
  }

  return (
    <WorkspaceThemeProvider>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen flex-col bg-[#F9FAF9] text-[#222222] dark:bg-[#222222] dark:text-[#C2D8C4]">
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
              backlogTasks={productBacklogItems}
              onAddTask={(title, category) => {
                const newTask: KanbanTask = {
                  id: `tsk-${Date.now()}`,
                  title,
                  taskType: "PRODUCT_BACKLOG_ITEM",
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
              onCreateSubtask={(parentTaskId, title, category) => {
                const newSubtask: KanbanTask = {
                  id: `sub-${Date.now()}`,
                  title,
                  taskType: "SPRINT_SUBTASK",
                  parentTaskId,
                  category,
                  status: "To Do",
                  priority: "MEDIUM",
                  storyPoints: 1,
                  assignee: "",
                  tags: ["Subtask"],
                  dateRange: "",
                  workspaceId: workspace.id,
                };

                setTasks((prevTasks) => reconcileParentStatuses([...prevTasks, newSubtask]));
              }}
              currentRole={currentMember.role}
            />

            {/* Right Pane: Kanban Board */}
            <BoardPane 
              tasks={sprintBacklogItems}
              currentRole={currentMember.role}
            />
          </div>
        </div>
      </DragDropContext>
    </WorkspaceThemeProvider>
  );
}
