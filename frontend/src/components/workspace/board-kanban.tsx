"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission } from "@/lib/rbac";

type BoardKanbanProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

const BOARD_COLUMNS = [
  { id: "To Do", label: "To Do", color: "bg-[rgba(194,216,196,0.12)] dark:bg-[rgba(42,42,42,0.6)]" },
  { id: "In Progress", label: "In Progress", color: "bg-[rgba(194,216,196,0.16)] dark:bg-[rgba(42,42,42,0.6)]" },
  { id: "Review", label: "Review", color: "bg-[rgba(194,216,196,0.14)] dark:bg-[rgba(42,42,42,0.6)]" },
  { id: "Done", label: "Done", color: "bg-[rgba(194,216,196,0.12)] dark:bg-[rgba(42,42,42,0.6)]" },
];

function getPremiumDragStyle(
  style: CSSProperties | undefined,
  isDragging: boolean
): CSSProperties | undefined {
  if (!style || !isDragging) return style;

  return {
    ...style,
    // Keep the cursor visually above the card so the card trails underneath while dragging.
    transform: style.transform ? `${style.transform} translate3d(0px, 12px, 0px)` : undefined,
    transition: "transform 40ms linear",
    boxShadow: "0 24px 56px rgba(0, 0, 0, 0.45)",
    zIndex: 1200,
    cursor: "grabbing",
    willChange: "transform",
  };
}

export function TaskCard({
  task,
  index,
  canMoveCards,
  isShaking,
  onBlockedDragAttempt,
}: {
  task: KanbanTask;
  index: number;
  canMoveCards: boolean;
  isShaking: boolean;
  onBlockedDragAttempt?: () => void;
}) {
  const isSubtask = task.taskType === "SPRINT_SUBTASK";

  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={!canMoveCards}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...getPremiumDragStyle(provided.draggableProps.style, snapshot.isDragging),
            animation: isShaking ? "role-shake 420ms ease-in-out" : undefined,
          }}
          data-draggable="true"
          data-dragging={snapshot.isDragging ? "true" : "false"}
          className={`drag-handle rounded-lg border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] p-3 space-y-2 shadow-[0_4px_20px_rgba(194,216,196,0.15)] transition will-change-transform dark:border-[rgba(194,216,196,0.15)] dark:bg-[#2A2A2A] dark:hover:border-[rgba(194,216,196,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${
            snapshot.isDragging
              ? "border-[#C2D8C4] ring-1 ring-[rgba(194,216,196,0.45)]"
              : canMoveCards
              ? "hover:border-[#C2D8C4] cursor-grab"
              : "cursor-not-allowed"
          }`}
          onMouseDownCapture={() => {
            if (!canMoveCards) {
              onBlockedDragAttempt?.();
            }
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <p
              className={`flex-1 text-[#222222] dark:text-[#C2D8C4] ${
                isSubtask
                  ? "text-[0.875rem] leading-[1.45] tracking-[0em] font-medium"
                  : "text-[1rem] leading-[1.35] tracking-[-0.01em] font-semibold"
              }`}
            >
              {task.title}
            </p>
            <div
              className={`px-2 py-1 rounded text-[0.75rem] leading-[1.35] tracking-[0.02em] font-semibold ${
                task.priority === "HIGH"
                  ? "bg-[rgba(217,75,75,0.18)] text-[#D94B4B]"
                  : task.priority === "MEDIUM"
                  ? "bg-[#C2D8C4]/20 text-[#C2D8C4]"
                  : "bg-[rgba(34,34,34,0.1)] text-[rgba(34,34,34,0.5)] dark:bg-[rgba(194,216,196,0.12)] dark:text-[rgba(194,216,196,0.4)]"
              }`}
            >
              {task.priority}
            </div>
          </div>

          <p className="text-[0.8125rem] leading-[1.5] tracking-[0.01em] font-medium text-[rgba(34,34,34,0.8)] dark:text-[rgba(194,216,196,0.7)]">
            {task.category}
          </p>

          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 rounded text-[0.75rem] leading-[1.35] tracking-[0.01em] font-semibold bg-[#C2D8C4]/10 text-[#C2D8C4]">
              {task.storyPoints} pts
            </span>
            {task.assignee && (
              <span className="inline-block px-2 py-1 rounded text-[0.75rem] leading-[1.35] tracking-[0.01em] font-medium bg-[rgba(34,34,34,0.08)] text-[rgba(34,34,34,0.5)] dark:bg-[rgba(194,216,196,0.12)] dark:text-[rgba(194,216,196,0.4)]">
                {task.assignee}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export function BoardKanban({ tasks, currentRole }: BoardKanbanProps) {
  const canMoveCards = hasPermission(currentRole, "move-board-cards");
  const [shakingTaskId, setShakingTaskId] = useState<string | null>(null);
  const shakeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shakeTimerRef.current) {
        window.clearTimeout(shakeTimerRef.current);
      }
    };
  }, []);

  const triggerShake = (taskId: string) => {
    if (shakeTimerRef.current) {
      window.clearTimeout(shakeTimerRef.current);
    }

    setShakingTaskId(null);
    window.setTimeout(() => setShakingTaskId(taskId), 0);
    shakeTimerRef.current = window.setTimeout(() => {
      setShakingTaskId(null);
      shakeTimerRef.current = null;
    }, 420);
  };

  return (
    <div className="flex-1 overflow-x-auto p-5 space-x-4 flex">
      {BOARD_COLUMNS.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);
        return (
          <Droppable key={column.id} droppableId={column.id} isDropDisabled={!canMoveCards}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`shrink-0 w-80 rounded-2xl border border-[#C2D8C4]/12 overflow-hidden flex flex-col ${
                  column.color
                } ${snapshot.isDraggingOver ? "ring-2 ring-[#C2D8C4]/50" : ""}`}
              >
                {/* Column Header */}
                <div className="sticky top-0 px-4 py-3 border-b border-[#DDE5DD] bg-[#FFFFFF] backdrop-blur-md dark:border-[rgba(194,216,196,0.05)] dark:bg-[rgba(34,34,34,0.8)] dark:backdrop-blur-[20px]">
                  <div className="flex items-center justify-between">
                    <h3 className="type-h3 text-[#222222] dark:text-[#C2D8C4]">
                      {column.label}
                    </h3>
                    <span className="text-[0.75rem] leading-[1.35] tracking-[0.02em] font-semibold text-[rgba(34,34,34,0.5)] bg-[rgba(194,216,196,0.16)] px-2 py-1 rounded dark:text-[rgba(194,216,196,0.4)] dark:bg-[rgba(194,216,196,0.1)]">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Column Content */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {columnTasks.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">
                      <p className="text-xs text-center">No tasks</p>
                    </div>
                  ) : (
                    columnTasks.map((task, idx) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={idx}
                        canMoveCards={canMoveCards}
                        isShaking={shakingTaskId === task.id}
                        onBlockedDragAttempt={() => triggerShake(task.id)}
                      />
                    ))
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
}
