"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { TaskCard } from "@/components/workspace/board-kanban";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";

type BacklogPaneProps = {
  backlogTasks: KanbanTask[];
  onAddTask: (title: string, category: string) => void;
  currentRole: UserRole;
};

const CATEGORIES = ["Frontend", "Backend", "Design", "DevOps", "Documentation"];

export function BacklogPane({ backlogTasks, onAddTask, currentRole }: BacklogPaneProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle, category);
    setTitle("");
  };

  const canCreateTask = hasPermission(currentRole, "create-backlog-task");
  const canReorderBacklog = hasPermission(currentRole, "reorder-backlog");

  return (
    <aside
      className={`flex shrink-0 flex-col overflow-hidden border-r border-[#DDE5DD] bg-[#FFFFFF] transition-all duration-300 dark:border-[rgba(194,216,196,0.05)] dark:bg-gradient-to-b dark:from-[#1A1A1A] dark:to-[#222222] ${
        isCollapsed ? "w-14" : "w-80"
      }`}
    >
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          aria-label="Expand backlog sidebar"
          className="flex h-full min-h-0 w-full cursor-pointer flex-col items-center justify-start gap-5 px-2 py-3 text-left"
        >
          <div className="flex flex-1 items-center justify-center">
            <span
              className="select-none text-[10px] font-semibold uppercase tracking-[0.34em] text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Backlog
            </span>
          </div>
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#DDE5DD] bg-[#FFFFFF] px-4 py-3 dark:border-[rgba(194,216,196,0.05)] dark:bg-[rgba(34,34,34,0.8)] dark:backdrop-blur-[20px]">
            <h3 className="text-sm font-semibold text-[#222222] dark:text-[#C2D8C4]">Backlog</h3>
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded transition hover:bg-[rgba(194,216,196,0.16)] dark:hover:bg-[rgba(194,216,196,0.12)]"
              aria-label="Collapse backlog"
            >
              ✕
            </button>
          </div>

          {/* Create Task Form */}
          <form onSubmit={handleSubmit} className="border-b border-[#DDE5DD] p-4 space-y-3 dark:border-[rgba(194,216,196,0.05)]">
            <div
              className={`space-y-2 ${getRestrictionClass(!canCreateTask)}`}
              title={
                !canCreateTask
                  ? "Only Product Owner can create tasks"
                  : undefined
              }
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title..."
                disabled={!canCreateTask}
                    className="w-full rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-3 py-2 text-sm text-[#222222] placeholder:text-[rgba(34,34,34,0.5)] outline-none transition focus:border-[#C2D8C4] disabled:opacity-50 disabled:cursor-not-allowed dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:placeholder:text-[rgba(194,216,196,0.4)] dark:focus:border-[#C2D8C4] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              />

              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!canCreateTask}
                  className="flex-1 rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-2 py-2 text-xs text-[#222222] outline-none transition focus:border-[#C2D8C4] disabled:opacity-50 disabled:cursor-not-allowed dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:focus:border-[#C2D8C4]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={!canCreateTask || !title.trim()}
                  className="px-3 py-2 rounded-lg bg-[#C2D8C4] text-[#222222] font-semibold text-sm hover:bg-[#B1C7B3] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 dark:bg-gradient-to-r dark:from-[#C2D8C4] dark:to-[#A8BDAA] dark:text-[#222222]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!canCreateTask && (
              <p className="text-xs text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">
                Only Product Owner can create tasks
              </p>
            )}
          </form>

          {/* Backlog Tasks */}
          <Droppable
            droppableId="Backlog"
            isDropDisabled={!canReorderBacklog}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 overflow-y-auto p-3 space-y-2 ${
                  snapshot.isDraggingOver ? "bg-[rgba(194,216,196,0.14)] dark:bg-[rgba(194,216,196,0.08)]" : ""
                } ${getRestrictionClass(!canReorderBacklog && backlogTasks.length > 0)}`}
                title={
                  !canReorderBacklog && backlogTasks.length > 0
                    ? "Only Product Owner and Scrum Master can reorder backlog"
                    : undefined
                }
              >
                {backlogTasks.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">
                    <p className="text-xs text-center">
                      No backlog tasks yet.<br/>
                      {canCreateTask ? "Create one to get started!" : "Awaiting tasks from Product Owner"}
                    </p>
                  </div>
                ) : (
                  backlogTasks.map((task, idx) => (
                    <TaskCard key={task.id} task={task} index={idx} />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </>
      )}
    </aside>
  );
}
