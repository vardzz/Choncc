"use client";

import { useState } from "react";
import type { KanbanTask, UserRole } from "@/lib/types";
import { hasPermission, getRestrictionClass } from "@/lib/rbac";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BoardCalendarProps = {
  tasks: KanbanTask[];
  currentRole: UserRole;
};

export function BoardCalendar({ tasks, currentRole }: BoardCalendarProps) {
  const canMoveCards = hasPermission(currentRole, "move-board-cards");
  const isReadOnly = !canMoveCards;

  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 19)); // Apr 19, 2026

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const days: (number | null)[] = Array.from({ length: firstDay }).map(() => null);
  days.push(...Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getTasksForDay = (day: number | null) => {
    if (!day) return [];
    // Simple mock: tasks with dateRange containing day
    return tasks.filter((task) => {
      const taskDay = parseInt(task.dateRange.split("-")[0]);
      return taskDay === day;
    });
  };

  return (
    <div className={`flex-1 overflow-auto p-5 ${getRestrictionClass(isReadOnly)}`}>
      <div className="space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-[#C2D8C4]/10 rounded-lg transition"
          >
            <ChevronLeft className="h-5 w-5 text-[#C2D8C4]" />
          </button>

          <h2 className="text-xl font-bold text-[#F5F5F5]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={nextMonth}
            className="p-2 hover:bg-[#C2D8C4]/10 rounded-lg transition"
          >
            <ChevronRight className="h-5 w-5 text-[#C2D8C4]" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day labels */}
          <div className="grid grid-cols-7 gap-2 pb-2 border-b border-[#C2D8C4]/10">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-2 text-center text-xs font-semibold text-[#C2D8C4]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const dayTasks = getTasksForDay(day);
              const isToday = day === 19 && currentDate.getMonth() === 3; // Apr 19

              return (
                <div
                  key={idx}
                  className={`min-h-24 p-2 rounded-lg border transition ${
                    day === null
                      ? "bg-transparent border-transparent"
                      : isToday
                      ? "bg-[#C2D8C4]/10 border border-[#C2D8C4]/40"
                      : "bg-[#222222]/50 border border-[#C2D8C4]/10 hover:border-[#C2D8C4]/30"
                  }`}
                >
                  {day !== null && (
                    <>
                      <p className={`text-xs font-semibold mb-1 ${
                        isToday ? "text-[#C2D8C4]" : "text-[#F5F5F5]"
                      }`}>
                        {day}
                      </p>
                      <div className="space-y-1">
                        {dayTasks.slice(0, 2).map((task) => (
                          <div
                            key={task.id}
                            className={`px-1.5 py-1 rounded text-xs font-medium text-white truncate ${
                              task.priority === "HIGH"
                                ? "bg-red-500/70"
                                : task.priority === "MEDIUM"
                                ? "bg-[#C2D8C4]/60"
                                : "bg-[#A0A0A0]/50"
                            }`}
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                        {dayTasks.length > 2 && (
                          <p className="text-xs text-[#A0A0A0] px-1">
                            +{dayTasks.length - 2} more
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#C2D8C4]/10">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-red-500" />
            <p className="text-xs text-[#A0A0A0]">High Priority</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#C2D8C4]" />
            <p className="text-xs text-[#A0A0A0]">Medium Priority</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#A0A0A0]" />
            <p className="text-xs text-[#A0A0A0]">Low Priority</p>
          </div>
        </div>
      </div>
    </div>
  );
}
