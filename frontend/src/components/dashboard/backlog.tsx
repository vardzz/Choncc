"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select } from "@/components/ui/select";
import { Menu } from "lucide-react";
import { useState, type FormEvent } from "react";

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

type BacklogSidebarProps = {
  backlogTasks: Task[];
  onAddTask: (title: string, category: string) => void;
  onPromoteTask: (taskId: string) => void;
};

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

export function BacklogSidebar({ backlogTasks, onAddTask, onPromoteTask }: BacklogSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Frontend");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle, category);
    setTitle("");
  };

  return (
    <aside
      className={`h-full shrink-0 overflow-hidden border-l border-white/10 bg-slate-950/45 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-[300px]"
      } flex flex-col`}
    >
      <div className="border-b border-white/10 px-3 py-3">
        <div className={`flex items-start ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed ? (
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">Backlog</h2>
              <p className="text-xs text-zinc-500">
                {backlogTasks.length} task{backlogTasks.length === 1 ? "" : "s"}
              </p>
            </div>
          ) : null}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 rounded-lg border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            onClick={() => setIsCollapsed((current) => !current)}
            aria-label={isCollapsed ? "Expand backlog sidebar" : "Collapse backlog sidebar"}
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "pointer-events-none hidden opacity-0" : "block min-h-0 flex-1 opacity-100"
        }`}
      >
        <div className="flex h-full min-h-0 flex-col gap-4 p-3">
          <form onSubmit={handleSubmit} className="space-y-2.5 border-b border-white/10 pb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">New Task</p>
            <Input placeholder="Task title..." value={title} onChange={(event) => setTitle(event.target.value)} />
            <Select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>Frontend</option>
              <option>Backend</option>
              <option>UI/UX</option>
              <option>DevOps</option>
            </Select>
            <Button type="submit" className="w-full bg-violet-700 hover:bg-violet-600">
              + Add to Backlog
            </Button>
          </form>

          <ScrollArea className="min-h-0 flex-1 pr-1">
            <div className="space-y-3 pb-3">
              {backlogTasks.map((task) => (
                <Card key={task.id} className="bg-zinc-900/80">
                  <CardContent className="space-y-3 p-4">
                    <Badge className={priorityClass(task.priority)}>{task.priority}</Badge>
                    <p className="text-sm font-semibold text-zinc-100">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={categoryClass(task.category)}>
                        {task.category}
                      </Badge>
                      <Button size="sm" variant="secondary" onClick={() => onPromoteTask(task.id)}>
                        Move to To Do
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
