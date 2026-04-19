"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { TaskCard } from "@/components/workspace/board-kanban";
import { Select } from "@/components/ui/select";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";

type BacklogPaneProps = {
  backlogTasks: KanbanTask[];
  onAddTask: (title: string, category: string, storyPoints: number, priority: KanbanTask["priority"]) => void;
  onCreateSubtask: (parentTaskId: string, title: string, category: string) => void;
  currentRole: UserRole;
};

const CATEGORIES = ["Frontend", "Backend", "Design", "DevOps", "Documentation"];

export function BacklogPane({ backlogTasks, onAddTask, onCreateSubtask, currentRole }: BacklogPaneProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [storyPoints, setStoryPoints] = useState("0");
  const [priority, setPriority] = useState<KanbanTask["priority"]>("MEDIUM");
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [selectedParentId, setSelectedParentId] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const parsedPoints = Number.parseInt(storyPoints, 10);
    const safePoints = Number.isNaN(parsedPoints) || parsedPoints < 0 ? 0 : parsedPoints;

    onAddTask(trimmedTitle, category, safePoints, priority);
    setTitle("");
    setStoryPoints("0");
    setPriority("MEDIUM");
  };

  const canCreateTask = hasPermission(currentRole, "create-backlog-task");
  const canReorderBacklog = hasPermission(currentRole, "reorder-backlog");
  const canCreateSprintSubtasks = hasPermission(currentRole, "create-sprint-subtask");

  const handleSubtaskSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = subtaskTitle.trim();
    if (!trimmedTitle || !selectedParentId) return;

    onCreateSubtask(selectedParentId, trimmedTitle, category);
    setSubtaskTitle("");
  };

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
          {(canCreateTask || canCreateSprintSubtasks) && (
            <div className="border-b border-[#DDE5DD] p-4 space-y-3 dark:border-[rgba(194,216,196,0.05)]">
              {canCreateTask && (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Task title..."
                      className="w-full rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-3 py-2 text-sm text-[#222222] placeholder:text-[rgba(34,34,34,0.5)] outline-none transition focus:border-[#C2D8C4] dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:placeholder:text-[rgba(194,216,196,0.4)] dark:focus:border-[#C2D8C4] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        min={0}
                        value={storyPoints}
                        onChange={(e) => setStoryPoints(e.target.value)}
                        placeholder="Story points"
                        className="h-9 w-full rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-3 py-2 text-xs text-[#222222] outline-none transition focus:border-[#C2D8C4] dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:focus:border-[#C2D8C4]"
                      />

                      <Select
                        value={priority}
                        onValueChange={(value) => setPriority(value as KanbanTask["priority"])}
                        className="h-9 w-full rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-2 py-2 text-xs text-[#222222] shadow-none transition focus:border-[#C2D8C4] hover:bg-[#FFFFFF] dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:focus:border-[#C2D8C4]"
                      >
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Easy</option>
                      </Select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex-1">
                        <Select
                          value={category}
                          onValueChange={setCategory}
                          className="h-9 w-full rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-2 py-2 text-xs text-[#222222] shadow-none transition focus:border-[#C2D8C4] hover:bg-[#FFFFFF] dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:focus:border-[#C2D8C4]"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <button
                        type="submit"
                        disabled={!title.trim()}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C2D8C4] text-[#222222] font-semibold text-sm hover:bg-[#B1C7B3] transition disabled:opacity-40 disabled:cursor-not-allowed dark:bg-gradient-to-r dark:from-[#C2D8C4] dark:to-[#A8BDAA] dark:text-[#222222]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {canCreateTask && canCreateSprintSubtasks && (
                <div className="pt-1 border-t border-[#DDE5DD] dark:border-[rgba(194,216,196,0.05)]" />
              )}

              {canCreateSprintSubtasks && (
                <form onSubmit={handleSubtaskSubmit} className="space-y-2">
                  <p className="text-xs font-semibold text-[#222222] dark:text-[#C2D8C4]">Sprint Breakdown (Scrum Master)</p>
                  <Select
                    value={selectedParentId}
                    onValueChange={setSelectedParentId}
                    className="h-9 w-full rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-2 py-2 text-xs text-[#222222] shadow-none transition focus:border-[#C2D8C4] hover:bg-[#FFFFFF] dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:focus:border-[#C2D8C4]"
                  >
                    <option value="">Select product backlog item</option>
                    {backlogTasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.title}
                      </option>
                    ))}
                  </Select>
                  <input
                    type="text"
                    value={subtaskTitle}
                    onChange={(e) => setSubtaskTitle(e.target.value)}
                    placeholder="Specific subtask..."
                    className="w-full rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] px-3 py-2 text-sm text-[#222222] placeholder:text-[rgba(34,34,34,0.5)] outline-none transition focus:border-[#C2D8C4] dark:border-[rgba(194,216,196,0.2)] dark:bg-[rgba(42,42,42,0.6)] dark:text-[#C2D8C4] dark:placeholder:text-[rgba(194,216,196,0.4)] dark:focus:border-[#C2D8C4]"
                  />
                  <button
                    type="submit"
                    disabled={!selectedParentId || !subtaskTitle.trim()}
                    className="w-full rounded-lg border border-[#C2D8C4] bg-[rgba(194,216,196,0.2)] px-3 py-2 text-xs font-semibold text-[#222222] transition hover:bg-[rgba(194,216,196,0.3)] disabled:opacity-40 disabled:cursor-not-allowed dark:border-[rgba(194,216,196,0.3)] dark:bg-[rgba(194,216,196,0.12)] dark:text-[#C2D8C4] dark:hover:bg-[rgba(194,216,196,0.18)]"
                  >
                    Add Sprint Subtask
                  </button>
                </form>
              )}
            </div>
          )}

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
                    ? "Only Product Owner can reorder backlog"
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
