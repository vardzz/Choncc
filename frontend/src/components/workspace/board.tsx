"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { AlertCircle, Clock, Users } from "lucide-react";
import { useState } from "react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";

type BoardPaneProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

const BOARD_COLUMNS = [
  { id: "To Do", label: "To Do", color: "bg-[#C2D8C4]/10" },
  { id: "In Progress", label: "In Progress", color: "bg-[#C2D8C4]/20" },
  { id: "Review", label: "Review", color: "bg-[#C2D8C4]/15" },
  { id: "Done", label: "Done", color: "bg-[#C2D8C4]/10" },
];

export function TaskCard({ task, index }: { task: KanbanTask; index: number }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg border border-[#C2D8C4]/20 bg-[#222222]/70 p-3 space-y-2 transition ${
            snapshot.isDragging ? "shadow-lg bg-[#2A2A2A] border-[#C2D8C4]/40" : ""
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

export function BoardPane({ tasks, currentRole }: BoardPaneProps) {
  const [sprintTime, setSprintTime] = useState(900); // 15 minutes in seconds
  const canMoveCards = hasPermission(currentRole, "move-board-cards");
  const isReadOnly = !canMoveCards;

  const minutes = Math.floor(sprintTime / 60);
  const seconds = sprintTime % 60;

  return (
    <main className="flex-1 overflow-hidden flex flex-col bg-[#222222]">
      {/* Sprint Timer Header */}
      <div className="shrink-0 border-b border-[#C2D8C4]/12 bg-[#222222]/50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#C2D8C4]" />
          <span className="text-sm font-semibold text-[#F5F5F5]">Sprint Timer</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-mono text-lg font-bold text-[#C2D8C4]">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          {isReadOnly && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#C2D8C4]/10 border border-[#C2D8C4]/30">
              <AlertCircle className="h-3 w-3 text-[#C2D8C4]" />
              <span className="text-xs text-[#C2D8C4]">Read-only (Stakeholder)</span>
            </div>
          )}
        </div>
      </div>

      {/* Kanban Board */}
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

      {/* Restriction Notice for Stakeholders */}
      {isReadOnly && (
        <div className="shrink-0 px-5 py-3 border-t border-[#C2D8C4]/12 bg-[#C2D8C4]/5 flex items-center gap-2">
          <Users className="h-4 w-4 text-[#A0A0A0]" />
          <p className="text-xs text-[#A0A0A0]">
            As a Stakeholder, you have read-only access to the board. Only Product Owners, Scrum Masters, and Developers can move cards.
          </p>
        </div>
      )}
    </main>
  );
}
