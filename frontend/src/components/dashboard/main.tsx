"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bolt, ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";
export type TaskStatus = "Backlog" | "To Do" | "In Progress" | "Review" | "Done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  storyPoints: number;
  workspaceId: string;
};

type DashboardMainProps = {
  boardTasks: Task[];
  onMoveTask: (taskId: string, status: TaskStatus) => void;
};

const boardColumns: Array<{ title: TaskStatus; color: string }> = [
  { title: "To Do", color: "bg-zinc-400" },
  { title: "In Progress", color: "bg-sky-400" },
  { title: "Review", color: "bg-violet-400" },
  { title: "Done", color: "bg-emerald-400" },
];

const boardOnlyStatuses: TaskStatus[] = ["To Do", "In Progress", "Review", "Done"];

function getNextStatus(current: TaskStatus): TaskStatus {
  const index = boardOnlyStatuses.indexOf(current);
  if (index === -1 || index === boardOnlyStatuses.length - 1) return current;
  return boardOnlyStatuses[index + 1];
}

function getPreviousStatus(current: TaskStatus): TaskStatus {
  const index = boardOnlyStatuses.indexOf(current);
  if (index <= 0) return current;
  return boardOnlyStatuses[index - 1];
}

function priorityClass(priority: TaskPriority) {
  if (priority === "HIGH") return "border-red-500/40 bg-red-500/10 text-red-300";
  if (priority === "MEDIUM") return "border-amber-500/40 bg-amber-500/10 text-amber-300";
  return "border-sky-500/40 bg-sky-500/10 text-sky-300";
}

function categoryClass(category: string) {
  if (category === "Backend") return "bg-emerald-500/20 text-emerald-300";
  if (category === "Frontend") return "bg-sky-500/20 text-sky-300";
  if (category === "UI/UX") return "bg-violet-500/20 text-violet-300";
  return "bg-zinc-500/20 text-zinc-300";
}

export function DashboardMain({ boardTasks, onMoveTask }: DashboardMainProps) {
  const totalPoints = boardTasks.reduce((sum, task) => sum + task.storyPoints, 0);
  const capacityTarget = 20;
  const capacityPercent = Math.min((totalPoints / capacityTarget) * 100, 100);

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-slate-950/40">
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full border border-white/10">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-zinc-100">Sprint 10</h1>
              <p className="text-xs text-zinc-500">of 14 total</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full border border-white/10">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Apr 7 - Apr 21, 2026</p>
            <p className="font-mono text-2xl font-semibold text-violet-400">167:29:43</p>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Bolt className="h-4 w-4 text-orange-400" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Sprint Capacity</p>
          <Progress
            value={capacityPercent}
            className="h-2.5"
            indicatorClassName="bg-gradient-to-r from-orange-500 via-orange-400 to-red-500"
          />
          <p className="text-sm font-semibold text-orange-300">{totalPoints}</p>
          <p className="text-sm text-zinc-500">/ {capacityTarget} SP</p>
          {totalPoints > capacityTarget ? (
            <Badge className="border-red-500/40 bg-red-500/10 text-red-300">Overloaded</Badge>
          ) : (
            <Badge className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300">Healthy</Badge>
          )}
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1 p-3">
        <div className="grid min-w-[960px] gap-3 xl:grid-cols-4">
          {boardColumns.map((column) => {
            const columnTasks = boardTasks.filter((task) => task.status === column.title);

            return (
              <section key={column.title} className="rounded-xl border border-white/10 bg-zinc-900/55">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${column.color}`} />
                    <h2 className="text-sm font-semibold text-zinc-100">{column.title}</h2>
                    <span className="text-xs text-zinc-500">{columnTasks.length}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-zinc-200">
                    <Ellipsis className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className="space-y-3 p-2.5">
                  {columnTasks.map((task) => (
                    <Card key={task.id} className="rounded-xl border-white/15 bg-zinc-700/35">
                      <CardContent className="space-y-3 p-3">
                        <Badge className={priorityClass(task.priority)}>{task.priority}</Badge>
                        <div>
                          <p className="text-sm font-semibold leading-tight text-zinc-100">{task.title}</p>
                          <p className="mt-1 text-xs text-zinc-400">{task.storyPoints} story points</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant="secondary" className={categoryClass(task.category)}>
                            {task.category}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="items-center justify-between border-t border-white/10 px-3 py-2">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-orange-500 text-[9px] text-white">JD</AvatarFallback>
                          </Avatar>
                          <p className="text-[11px] text-zinc-500">Task #{task.id.slice(-3)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={getPreviousStatus(task.status) === task.status}
                            onClick={() => onMoveTask(task.id, getPreviousStatus(task.status))}
                          >
                            Back
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={getNextStatus(task.status) === task.status}
                            onClick={() => onMoveTask(task.id, getNextStatus(task.status))}
                          >
                            Next
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
}
