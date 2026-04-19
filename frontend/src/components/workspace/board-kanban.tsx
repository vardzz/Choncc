"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { CSSProperties } from "react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";

type BoardKanbanProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

const BOARD_COLUMNS = [
  { id: "To Do", label: "To Do", color: "bg-[#C2D8C4]/10" },
  { id: "In Progress", label: "In Progress", color: "bg-[#C2D8C4]/20" },
  { id: "Review", label: "Review", color: "bg-[#C2D8C4]/15" },
  { id: "Done", label: "Done", color: "bg-[#C2D8C4]/10" },
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

export function TaskCard({ task, index }: { task: KanbanTask; index: number }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getPremiumDragStyle(provided.draggableProps.style, snapshot.isDragging)}
          data-draggable="true"
          data-dragging={snapshot.isDragging ? "true" : "false"}
          className={`drag-handle rounded-lg border border-[#C2D8C4]/20 bg-[#222222]/70 p-3 space-y-2 transition will-change-transform ${
            snapshot.isDragging
              ? "bg-[#2A2A2A] border-[#C2D8C4]/40 ring-1 ring-[#C2D8C4]/45"
              : "hover:border-[#C2D8C4]/35"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-[#F5F5F5] flex-1">{task.title}</p>
            <div
              className={`px-2 py-1 rounded text-xs font-semibold ${
                task.priority === "HIGH"
                  ? "bg-red-500/20 text-red-400"
                  : task.priority === "MEDIUM"
                  ? "bg-[#C2D8C4]/20 text-[#C2D8C4]"
                  : "bg-[#A0A0A0]/20 text-[#A0A0A0]"
              }`}
            >
              {task.priority}
            </div>
          </div>

          <p className="text-xs text-[#A0A0A0]">{task.category}</p>

          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 rounded text-xs bg-[#C2D8C4]/10 text-[#C2D8C4]">
              {task.storyPoints} pts
            </span>
            {task.assignee && (
              <span className="inline-block px-2 py-1 rounded text-xs bg-[#222222]/50 text-[#A0A0A0]">
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
  const isReadOnly = !canMoveCards;

  return (
    <div className={`flex-1 overflow-x-auto p-5 space-x-4 flex ${getRestrictionClass(isReadOnly)}`}>
      {BOARD_COLUMNS.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);
        return (
          <Droppable key={column.id} droppableId={column.id} isDropDisabled={isReadOnly}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`shrink-0 w-80 rounded-2xl border border-[#C2D8C4]/12 overflow-hidden flex flex-col ${
                  column.color
                } ${snapshot.isDraggingOver ? "ring-2 ring-[#C2D8C4]/50" : ""}`}
              >
                {/* Column Header */}
                <div className="sticky top-0 px-4 py-3 border-b border-[#C2D8C4]/12 bg-[#222222]/70 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#F5F5F5]">
                      {column.label}
                    </h3>
                    <span className="text-xs font-semibold text-[#A0A0A0] bg-[#222222]/50 px-2 py-1 rounded">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Column Content */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {columnTasks.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-[#A0A0A0]">
                      <p className="text-xs text-center">No tasks</p>
                    </div>
                  ) : (
                    columnTasks.map((task, idx) => (
                      <TaskCard key={task.id} task={task} index={idx} />
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
