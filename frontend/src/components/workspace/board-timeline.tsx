"use client";

import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";

type BoardTimelineProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

const STATUS_ORDER = ["Backlog", "To Do", "In Progress", "Review", "Done"];

export function BoardTimeline({ tasks, currentRole }: BoardTimelineProps) {
  const canMoveCards = hasPermission(currentRole, "move-board-cards");
  const isReadOnly = !canMoveCards;

  return (
    <div className={`flex-1 overflow-auto p-5 ${getRestrictionClass(isReadOnly)}`}>
      <div className="space-y-8">
        {/* Timeline */}
        <div className="space-y-4">
          {STATUS_ORDER.map((status, idx) => {
            const statusTasks = tasks.filter((t) => t.status === status);

            return (
              <div key={status} className="space-y-2">
                {/* Timeline Point */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#C2D8C4]" />
                    <p className="text-sm font-semibold text-[#222222] dark:text-[#C2D8C4] w-24">{status}</p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C2D8C4]/50 to-transparent" />
                  <p className="text-xs text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">{statusTasks.length} tasks</p>
                </div>

                {/* Tasks in this status */}
                <div className="ml-4 space-y-2">
                  {statusTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-[#FFFFFF] border border-[rgba(34,34,34,0.08)] shadow-[0_4px_20px_rgba(194,216,196,0.15)] hover:border-[#C2D8C4] transition space-y-1 dark:bg-[#2A2A2A] dark:border-[rgba(194,216,196,0.15)] dark:hover:border-[rgba(194,216,196,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#222222] dark:text-[#C2D8C4]">{task.title}</p>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            task.priority === "HIGH"
                              ? "bg-[rgba(217,75,75,0.18)] text-[#D94B4B]"
                              : task.priority === "MEDIUM"
                              ? "bg-[#C2D8C4]/20 text-[#C2D8C4]"
                              : "bg-[rgba(34,34,34,0.1)] text-[rgba(34,34,34,0.5)] dark:bg-[rgba(194,216,196,0.12)] dark:text-[rgba(194,216,196,0.4)]"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[rgba(34,34,34,0.8)] dark:text-[rgba(194,216,196,0.7)]">
                        <span className="px-2 py-1 rounded bg-[rgba(194,216,196,0.22)] dark:bg-[rgba(194,216,196,0.12)]">
                          {task.category}
                        </span>
                        {task.assignee && (
                          <span className="px-2 py-1 rounded bg-[rgba(34,34,34,0.08)] dark:bg-[rgba(194,216,196,0.12)]">
                            {task.assignee}
                          </span>
                        )}
                        <span className="px-2 py-1 rounded bg-[#C2D8C4]/10 text-[#C2D8C4]">
                          {task.storyPoints} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* No tasks state */}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-40 text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">
            <p className="text-sm">No tasks to display in timeline view</p>
          </div>
        )}
      </div>
    </div>
  );
}
