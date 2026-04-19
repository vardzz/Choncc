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
                    <p className="text-sm font-semibold text-[#F5F5F5] w-24">{status}</p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C2D8C4]/50 to-transparent" />
                  <p className="text-xs text-[#A0A0A0]">{statusTasks.length} tasks</p>
                </div>

                {/* Tasks in this status */}
                <div className="ml-4 space-y-2">
                  {statusTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-[#222222]/50 border border-[#C2D8C4]/20 hover:border-[#C2D8C4]/40 transition space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#F5F5F5]">{task.title}</p>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            task.priority === "HIGH"
                              ? "bg-red-500/20 text-red-400"
                              : task.priority === "MEDIUM"
                              ? "bg-[#C2D8C4]/20 text-[#C2D8C4]"
                              : "bg-[#A0A0A0]/20 text-[#A0A0A0]"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#A0A0A0]">
                        <span className="px-2 py-1 rounded bg-[#C2D8C4]/10">
                          {task.category}
                        </span>
                        {task.assignee && (
                          <span className="px-2 py-1 rounded bg-[#222222]/50">
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
          <div className="flex items-center justify-center h-40 text-[#A0A0A0]">
            <p className="text-sm">No tasks to display in timeline view</p>
          </div>
        )}
      </div>
    </div>
  );
}
