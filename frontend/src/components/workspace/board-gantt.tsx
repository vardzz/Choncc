"use client";

import type { KanbanTask, UserRole } from "@/lib/types";

type BoardGanttProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

export function BoardGantt({ tasks, currentRole }: BoardGanttProps) {
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

  return (
    <div className="flex-1 overflow-auto p-5">
      <div className="space-y-6">
        {/* Timeline Header */}
        <div className="sticky top-0 bg-[#F9FAF9] pb-4 dark:bg-[#222222]">
          <div className="flex items-center gap-4">
            <div className="w-32 flex-shrink-0">
              <p className="text-xs font-semibold text-[#222222] dark:text-[#C2D8C4]">Assignee</p>
            </div>
            <div className="flex-1 grid grid-cols-5 gap-1">
              {["Backlog", "To Do", "In Progress", "Review", "Done"].map((status) => (
                <div key={status} className="text-center">
                  <p className="text-xs font-semibold text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">{status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gantt Rows */}
        {Object.entries(tasksByAssignee).map(([assignee, assigneeTasks]) => (
          <div key={assignee} className="flex items-start gap-4">
            <div className="w-32 flex-shrink-0 pt-3">
              <p className="text-sm font-semibold text-[#222222] dark:text-[#C2D8C4]">{assignee}</p>
            </div>

            {/* Gantt Bar */}
            <div className="flex-1 grid grid-cols-5 gap-1">
              {["Backlog", "To Do", "In Progress", "Review", "Done"].map((status) => {
                const statusTasks = assigneeTasks.filter((t) => t.status === status);
                return (
                  <div
                    key={`${assignee}-${status}`}
                    className="p-2 rounded-lg bg-[#FFFFFF] border border-[rgba(34,34,34,0.08)] shadow-[0_4px_20px_rgba(194,216,196,0.15)] min-h-20 space-y-1 dark:bg-[#2A2A2A] dark:border-[rgba(194,216,196,0.1)] dark:hover:border-[rgba(194,216,196,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  >
                    {statusTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`px-2 py-1 rounded text-xs font-medium text-[#222222] ${
                          task.priority === "HIGH"
                            ? "bg-[#D94B4B]"
                            : task.priority === "MEDIUM"
                            ? "bg-[#C2D8C4]"
                            : "bg-[rgba(34,34,34,0.2)] dark:bg-[rgba(194,216,196,0.45)]"
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
          <div className="flex items-center justify-center h-40 text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">
            <p className="text-sm">No tasks to display in Gantt view</p>
          </div>
        )}
      </div>
    </div>
  );
}
