"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";
import { TaskCard } from "@/components/workspace/board";

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
      className={`flex shrink-0 flex-col overflow-hidden border-r border-[#C2D8C4]/12 bg-[#2A2A2A]/70 transition-all duration-300 ${
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
              className="select-none text-[10px] font-semibold uppercase tracking-[0.34em] text-[#AEB7AE]"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Backlog
            </span>
          </div>
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#C2D8C4]/12 bg-[#222222]/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-[#F5F5F5]">Backlog</h3>
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="p-1 hover:bg-[#C2D8C4]/10 rounded transition"
              aria-label="Collapse backlog"
            >
              ✕
            </button>
          </div>

          {/* Create Task Form */}
          <form onSubmit={handleSubmit} className="border-b border-[#C2D8C4]/12 p-4 space-y-3">
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
                className="w-full rounded-lg bg-[#222222]/70 border border-[#C2D8C4]/20 px-3 py-2 text-sm text-[#F5F5F5] placeholder:text-[#A0A0A0] outline-none transition focus:border-[#C2D8C4]/50 focus:bg-[#222222] disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!canCreateTask}
                  className="flex-1 rounded-lg bg-[#222222]/70 border border-[#C2D8C4]/20 px-2 py-2 text-xs text-[#F5F5F5] outline-none transition focus:border-[#C2D8C4]/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-3 py-2 rounded-lg bg-[#C2D8C4] text-[#222222] font-semibold text-sm hover:bg-[#C2D8C4]/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!canCreateTask && (
              <p className="text-xs text-[#A0A0A0]">
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
                  snapshot.isDraggingOver ? "bg-[#C2D8C4]/5" : ""
                } ${getRestrictionClass(!canReorderBacklog && backlogTasks.length > 0)}`}
                title={
                  !canReorderBacklog && backlogTasks.length > 0
                    ? "Only Product Owner and Scrum Master can reorder backlog"
                    : undefined
                }
              >
                {backlogTasks.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-[#A0A0A0]">
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
