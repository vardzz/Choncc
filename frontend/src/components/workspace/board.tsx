"use client";

import { useState } from "react";
import { LayoutGrid, BarChart3, LineChart, Calendar } from "lucide-react";
import type { KanbanTask, UserRole } from "@/lib/types";
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

  return (
    <main className="flex-1 overflow-hidden flex flex-col bg-[#F9FAF9] dark:bg-[#222222]">
      {/* Header: Sprint Capacity + View Switcher */}
      <div className="shrink-0 border-b border-[#DDE5DD] bg-[#FFFFFF] px-5 py-4 flex items-center justify-between gap-4 dark:border-[rgba(194,216,196,0.05)] dark:bg-[rgba(34,34,34,0.8)] dark:backdrop-blur-[20px]">
        {/* Sprint Capacity Bar */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#222222] dark:text-[#C2D8C4]">SPRINT CAPACITY</p>
            <p className="text-xs text-[rgba(34,34,34,0.5)] dark:text-[rgba(194,216,196,0.4)]">26 / 40 sp</p>
          </div>
          <div className="h-2 rounded-full bg-[#E8EDE8] overflow-hidden dark:bg-[#333333]">
            <div
              className="h-full bg-[#C2D8C4] shadow-none transition-all dark:bg-[linear-gradient(90deg,#C2D8C4_0%,rgba(194,216,196,0.6)_100%)] dark:shadow-[0_0_15px_rgba(194,216,196,0.3)]"
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
                  ? "bg-[#C2D8C4] border border-[#C2D8C4] text-[#222222] dark:bg-[rgba(194,216,196,0.2)] dark:border-[rgba(194,216,196,0.4)] dark:text-[#C2D8C4]"
                  : "bg-transparent border border-[#DDE5DD] text-[rgba(34,34,34,0.8)] hover:border-[#C2D8C4] dark:border-[rgba(194,216,196,0.2)] dark:text-[rgba(194,216,196,0.4)] dark:hover:border-[rgba(194,216,196,0.35)]"
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
