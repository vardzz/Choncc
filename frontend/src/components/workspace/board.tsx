"use client";

import { useState } from "react";
import { LayoutGrid, BarChart3, LineChart, Calendar, Users } from "lucide-react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission } from "@/lib/rbac";
import { BoardKanban } from "@/components/workspace/board-kanban";
import { BoardGantt } from "@/components/workspace/board-gantt";
import { BoardTimeline } from "@/components/workspace/board-timeline";
import { BoardCalendar } from "@/components/workspace/board-calendar";
import { SprintTimer } from "@/components/workspace/sprint-timer";

type BoardPaneProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

type ViewType = "kanban" | "gantt" | "timeline" | "calendar";

const VIEW_OPTIONS: Array<{ id: ViewType; label: string; icon: any }> = [
  { id: "kanban", label: "Board", icon: LayoutGrid },
  { id: "gantt", label: "Gantt", icon: BarChart3 },
  { id: "timeline", label: "Timeline", icon: LineChart },
  { id: "calendar", label: "Calendar", icon: Calendar },
];

export function BoardPane({ tasks, currentRole }: BoardPaneProps) {
  const [activeView, setActiveView] = useState<ViewType>("kanban");
  const canMoveCards = hasPermission(currentRole, "move-board-cards");

  return (
    <main className="flex-1 overflow-hidden flex flex-col bg-[var(--ws-bg)]">
      {/* Header: Sprint Capacity + View Switcher */}
      <div className="shrink-0 border-b border-[var(--ws-border)] bg-[var(--ws-surface-2)] px-5 py-4 flex items-center justify-between gap-4">
        {/* Sprint Capacity Bar */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[var(--ws-accent)]">SPRINT CAPACITY</p>
            <p className="text-xs text-[var(--ws-muted)]">26 / 40 sp</p>
          </div>
          <div className="h-2 rounded-full bg-[var(--ws-bg)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C2D8C4] to-orange-500 transition-all"
              style={{ width: "65%" }}
            />
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 ml-auto">
          {VIEW_OPTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-2 text-xs font-medium ${
                activeView === id
                  ? "bg-[#C2D8C4]/20 border border-[#C2D8C4]/40 text-[#C2D8C4]"
                  : "bg-transparent border border-[var(--ws-border)] text-[var(--ws-muted)] hover:border-[#C2D8C4]/30"
              }`}
              title={label}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}

          <SprintTimer
            initialMinutes={15}
            sprintName="SPRINT 10"
            sprintDates="Apr 7 - Apr 21, 2026"
          />
        </div>
      </div>

      {/* View Content */}
      {activeView === "kanban" && <BoardKanban tasks={tasks} currentRole={currentRole} />}
      {activeView === "gantt" && <BoardGantt tasks={tasks} currentRole={currentRole} />}
      {activeView === "timeline" && (
        <BoardTimeline tasks={tasks} currentRole={currentRole} />
      )}
      {activeView === "calendar" && (
        <BoardCalendar tasks={tasks} currentRole={currentRole} />
      )}

    </main>
  );
}
