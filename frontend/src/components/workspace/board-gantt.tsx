"use client";

import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";

type BoardGanttProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

export function BoardGantt({ tasks, currentRole }: BoardGanttProps) {
  const canMoveCards = hasPermission(currentRole, "move-board-cards");
  const isReadOnly = !canMoveCards;

  // Sort tasks by assignee
  const tasksByAssignee = tasks.reduce(
    (acc, task) => {
      const assignee = task.assignee || "Unassigned";
      if (!acc[assignee]) acc[assignee] = [];
      acc[assignee].push(task);
      return acc;
    },
    {} as Record<string, KanbanTask[]>
  );

  const statusWidths: Record<string, number> = {
    Backlog: 5,
    "To Do": 20,
    "In Progress": 50,
    Review: 20,
    Done: 5,
  };

  return (
    <div className={`flex-1 overflow-auto p-5 ${getRestrictionClass(isReadOnly)}`}>
      <div className="space-y-6">
        {/* Timeline Header */}
        <div className="sticky top-0 bg-[#222222]/70 backdrop-blur-md pb-4">
          <div className="flex items-center gap-4">
            <div className="w-32 flex-shrink-0">
              <p className="text-xs font-semibold text-[#C2D8C4]">Assignee</p>
            </div>
            <div className="flex-1 grid grid-cols-5 gap-1">
              {["Backlog", "To Do", "In Progress", "Review", "Done"].map((status) => (
                <div key={status} className="text-center">
                  <p className="text-xs font-semibold text-[#A0A0A0]">{status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gantt Rows */}
        {Object.entries(tasksByAssignee).map(([assignee, assigneeTasks]) => (
          <div key={assignee} className="flex items-start gap-4">
            <div className="w-32 flex-shrink-0 pt-3">
              <p className="text-sm font-semibold text-[#F5F5F5]">{assignee}</p>
            </div>

            {/* Gantt Bar */}
            <div className="flex-1 grid grid-cols-5 gap-1">
              {["Backlog", "To Do", "In Progress", "Review", "Done"].map((status) => {
                const statusTasks = assigneeTasks.filter((t) => t.status === status);
                return (
                  <div
                    key={`${assignee}-${status}`}
                    className="p-2 rounded-lg bg-[#222222]/50 border border-[#C2D8C4]/10 min-h-20 space-y-1"
                  >
                    {statusTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`px-2 py-1 rounded text-xs font-medium text-[#222222] ${
                          task.priority === "HIGH"
                            ? "bg-red-500"
                            : task.priority === "MEDIUM"
                            ? "bg-[#C2D8C4]"
                            : "bg-[#A0A0A0]"
                        }`}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* No tasks state */}
        {Object.keys(tasksByAssignee).length === 0 && (
          <div className="flex items-center justify-center h-40 text-[#A0A0A0]">
            <p className="text-sm">No tasks to display in Gantt view</p>
          </div>
        )}
      </div>
    </div>
  );
}
