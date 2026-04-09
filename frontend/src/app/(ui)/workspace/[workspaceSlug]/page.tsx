"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { BacklogSidebar } from "@/components/dashboard/backlog";
import {
  MainBoard,
  type BoardColumns,
  type KanbanColumnId,
  type KanbanTask,
} from "@/components/dashboard/mainBoard";
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { type Workspace } from "@/components/dashboard/workspace";
import { WorkspaceSidebar } from "@/components/dashboard/workspace";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const initialWorkspaces: Workspace[] = [
  { id: "ws-dentara", name: "Dentara", health: "6m", type: "Health" },
  { id: "ws-horizon", name: "Horizon AI", health: "4m", type: "AI/ML" },
  { id: "ws-portfolio", name: "Personal Portfolio", health: "1m", type: "Web" },
  { id: "ws-personal", name: "Personal", health: "1m", type: "Tasks" },
];

type WorkspacePageParams = {
  workspaceSlug?: string;
};

type WorkspaceBoardState = Record<KanbanColumnId, KanbanTask[]>;

const initialTasks: Array<KanbanTask & { status: "Backlog" | "To Do" | "In Progress" | "Review" | "Done" }> = [
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
    dateRange: "Apr 07 - Apr 09",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-103",
    title: "User settings page",
    status: "In Progress",
    priority: "MEDIUM",
    category: "UI/UX",
    storyPoints: 4,
    assignee: "Noah Park",
    tags: ["Design"],
    dateRange: "Apr 09 - Apr 12",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-104",
    title: "Search with Elastic",
    status: "In Progress",
    priority: "HIGH",
    category: "Backend",
    storyPoints: 5,
    assignee: "Liam Stone",
    tags: ["Search"],
    dateRange: "Apr 07 - Apr 14",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-105",
    title: "Dark mode tokens",
    status: "Review",
    priority: "LOW",
    category: "UI/UX",
    storyPoints: 2,
    assignee: "Ella Wood",
    tags: ["Theming"],
    dateRange: "Apr 10 - Apr 12",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-106",
    title: "Skeleton loading states",
    status: "Done",
    priority: "LOW",
    category: "Frontend",
    storyPoints: 2,
    assignee: "Mason Reed",
    tags: ["Perf"],
    dateRange: "Apr 05 - Apr 06",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-107",
    title: "OAuth2 integration",
    status: "Backlog",
    priority: "HIGH",
    category: "Backend",
    storyPoints: 3,
    assignee: "Jordan Diaz",
    tags: ["Security"],
    dateRange: "Apr 12 - Apr 15",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-108",
    title: "Onboarding screens",
    status: "Backlog",
    priority: "MEDIUM",
    category: "UI/UX",
    storyPoints: 2,
    assignee: "Ava Kim",
    tags: ["Onboarding"],
    dateRange: "Apr 14 - Apr 16",
    workspaceId: "ws-dentara",
  },
  {
    id: "tsk-109",
    title: "Data table component",
    status: "Backlog",
    priority: "LOW",
    category: "Frontend",
    storyPoints: 2,
    assignee: "Noah Park",
    tags: ["Table"],
    dateRange: "Apr 16 - Apr 18",
    workspaceId: "ws-dentara",
  },
];

function slugifyWorkspaceName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function createEmptyWorkspaceBoard(): WorkspaceBoardState {
  return {
    backlog: [],
    todo: [],
    inprogress: [],
    review: [],
    done: [],
  };
}

function statusToColumnId(status: "Backlog" | "To Do" | "In Progress" | "Review" | "Done"): KanbanColumnId {
  if (status === "Backlog") return "backlog";
  if (status === "To Do") return "todo";
  if (status === "In Progress") return "inprogress";
  if (status === "Review") return "review";
  return "done";
}

function isColumnId(value: string): value is KanbanColumnId {
  return value === "backlog" || value === "todo" || value === "inprogress" || value === "review" || value === "done";
}

function buildInitialBoards(workspaces: Workspace[], tasks: Array<KanbanTask & { status: "Backlog" | "To Do" | "In Progress" | "Review" | "Done" }>) {
  const boards: Record<string, WorkspaceBoardState> = {};

  workspaces.forEach((workspace) => {
    boards[String(workspace.id)] = createEmptyWorkspaceBoard();
  });

  tasks.forEach((task) => {
    const workspaceId = String(task.workspaceId);
    if (!boards[workspaceId]) boards[workspaceId] = createEmptyWorkspaceBoard();
    boards[workspaceId][statusToColumnId(task.status)].push({
      id: task.id,
      title: task.title,
      category: task.category,
      priority: task.priority,
      workspaceId,
      storyPoints: task.storyPoints,
      assignee: task.assignee,
      tags: task.tags,
      dateRange: task.dateRange,
    });
  });

  return boards;
}

export default function WorkspacePage() {
  const router = useRouter();
  const params = useParams<WorkspacePageParams>();
  const slugInUrl = params.workspaceSlug ?? "";

  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(String(initialWorkspaces[0]?.id ?? "ws-dentara"));
  const [sprintIndex, setSprintIndex] = useState(9);
  const [workspaceBoards, setWorkspaceBoards] = useState<Record<string, WorkspaceBoardState>>(() =>
    buildInitialBoards(initialWorkspaces, initialTasks),
  );

  const workspaceSlugMap = useMemo(() => {
    const map = new Map<string, string>();
    workspaces.forEach((workspace) => {
      map.set(slugifyWorkspaceName(workspace.name), String(workspace.id));
    });
    return map;
  }, [workspaces]);

  const routeWorkspaceId = workspaceSlugMap.get(slugInUrl);
  const activeWorkspaceId = routeWorkspaceId ?? selectedWorkspaceId;

  useEffect(() => {
    if (!slugInUrl) return;
    if (routeWorkspaceId) return;

    const firstWorkspace = workspaces[0];
    if (!firstWorkspace) return;
    router.replace(`/workspace/${slugifyWorkspaceName(firstWorkspace.name)}`);
  }, [slugInUrl, routeWorkspaceId, router, workspaces]);

  const activeWorkspace = useMemo(
    () => workspaces.find((workspace) => String(workspace.id) === activeWorkspaceId) ?? workspaces[0],
    [activeWorkspaceId, workspaces],
  );

  const activeBoard = useMemo(
    () => workspaceBoards[activeWorkspaceId] ?? createEmptyWorkspaceBoard(),
    [workspaceBoards, activeWorkspaceId],
  );

  const boardColumns = useMemo<BoardColumns>(
    () => ({
      todo: activeBoard.todo,
      inprogress: activeBoard.inprogress,
      review: activeBoard.review,
      done: activeBoard.done,
    }),
    [activeBoard],
  );

  const capacityUsed = useMemo(
    () => [...activeBoard.todo, ...activeBoard.inprogress, ...activeBoard.review, ...activeBoard.done].reduce((sum, task) => sum + (task.sp ?? task.storyPoints ?? 2), 0),
    [activeBoard],
  );

  const addTask = (title: string, category: string) => {
    setWorkspaceBoards((current) => {
      const newTask: KanbanTask = {
        id: `tsk-${Date.now()}`,
        title,
        priority: "MEDIUM",
        category,
        storyPoints: 2,
        workspaceId: activeWorkspaceId,
        assignee: "Unassigned",
        tags: ["New"],
      };

      const workspaceBoard = current[activeWorkspaceId] ?? createEmptyWorkspaceBoard();

      return {
        ...current,
        [activeWorkspaceId]: {
          ...workspaceBoard,
          backlog: [newTask, ...workspaceBoard.backlog],
        },
      };
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (!isColumnId(source.droppableId) || !isColumnId(destination.droppableId)) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setWorkspaceBoards((current) => {
      const workspaceBoard = current[activeWorkspaceId] ?? createEmptyWorkspaceBoard();
      const sourceColumn = source.droppableId as KanbanColumnId;
      const destinationColumn = destination.droppableId as KanbanColumnId;

      const sourceItems = [...workspaceBoard[sourceColumn]];
      const [movedTask] = sourceItems.splice(source.index, 1);
      if (!movedTask) return current;

      if (sourceColumn === destinationColumn) {
        sourceItems.splice(destination.index, 0, movedTask);
        return {
          ...current,
          [activeWorkspaceId]: {
            ...workspaceBoard,
            [sourceColumn]: sourceItems,
          },
        };
      }

      const destinationItems = [...workspaceBoard[destinationColumn]];
      destinationItems.splice(destination.index, 0, { ...movedTask, workspaceId: activeWorkspaceId });

      return {
        ...current,
        [activeWorkspaceId]: {
          ...workspaceBoard,
          [sourceColumn]: sourceItems,
          [destinationColumn]: destinationItems,
        },
      };
    });
  };

  const createWorkspace = (name: string) => {
    const workspaceId = `ws-${Date.now()}`;
    const slug = slugifyWorkspaceName(name);

    setWorkspaces((current) => {
      const workspace: Workspace = {
        id: workspaceId,
        name,
        health: "0m",
        type: "General",
      };

      return [workspace, ...current];
    });

    setWorkspaceBoards((current) => ({
      ...current,
      [workspaceId]: createEmptyWorkspaceBoard(),
    }));

    setSelectedWorkspaceId(workspaceId);
    router.push(`/workspace/${slug}`);
  };

  const switchWorkspace = (workspaceId: string | number) => {
    const nextId = String(workspaceId);
    setSelectedWorkspaceId(nextId);

    const selectedWorkspace = workspaces.find((workspace) => String(workspace.id) === nextId);
    if (!selectedWorkspace) return;
    router.push(`/workspace/${slugifyWorkspaceName(selectedWorkspace.name)}`);
  };

  return (
    <div className="dark h-screen w-full flex flex-col overflow-hidden bg-zinc-950 text-zinc-50">
      <DashboardNavbar activeWorkspaceName={activeWorkspace?.name ?? "Workspace"} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 overflow-hidden">
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

          <BacklogSidebar backlogTasks={activeBoard.backlog} onAddTask={addTask} />

          <main className="min-w-0 flex-1 p-0">
            <MainBoard
              columns={boardColumns}
              sprintIndex={sprintIndex}
              onPrevSprint={() => setSprintIndex((current) => Math.max(0, current - 1))}
              onNextSprint={() => setSprintIndex((current) => Math.min(13, current + 1))}
              capacityUsed={capacityUsed}
              capacityTotal={20}
            />
          </main>
        </div>
      </DragDropContext>
    </div>
  );
}
