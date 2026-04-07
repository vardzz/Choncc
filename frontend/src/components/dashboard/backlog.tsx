"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskCard, type KanbanTask } from "@/components/dashboard/mainBoard";
import { Select } from "@/components/ui/select";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { useState, type FormEvent } from "react";

type BacklogSidebarProps = {
  backlogTasks: KanbanTask[];
  onAddTask: (title: string, category: string) => void;
};

export function BacklogSidebar({ backlogTasks, onAddTask }: BacklogSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Frontend");
  const onBacklogScroll = useScrollVisibility();
  const sidebarWidthClass = isCollapsed ? "w-14 sm:w-16" : "w-[268px] lg:w-[300px]";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle, category);
    setTitle("");
  };

  return (
    <aside
      className={`flex h-full shrink-0 flex-col overflow-hidden border-l border-black/5 bg-white/70 transition-all duration-500 ease-in-out dark:border-white/5 dark:bg-zinc-900/55 ${sidebarWidthClass}`}
    >
      <div className="border-b border-black/5 px-3 py-3 transition-colors duration-500 ease-in-out dark:border-white/5">
        <div className={`flex items-start ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed ? (
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-zinc-900 transition-colors duration-500 ease-in-out dark:text-zinc-100">Backlog</h2>
              <p className="text-xs text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">
                {backlogTasks.length} task{backlogTasks.length === 1 ? "" : "s"}
              </p>
            </div>
          ) : null}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border border-black/10 text-zinc-500 transition-colors duration-500 ease-in-out hover:bg-black/5 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
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
          <form onSubmit={handleSubmit} className="space-y-2.5 border-b border-black/5 pb-3 transition-colors duration-500 ease-in-out dark:border-white/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">New Task</p>
            <Input placeholder="Task title..." value={title} onChange={(event) => setTitle(event.target.value)} />
            <Select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>Frontend</option>
              <option>Backend</option>
              <option>UI/UX</option>
              <option>DevOps</option>
            </Select>
            <Button type="submit" className="w-full cursor-pointer border border-black/10 bg-zinc-900 text-zinc-50 transition-colors duration-500 ease-in-out hover:bg-zinc-700 dark:border-white/10 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              + Add to Backlog
            </Button>
          </form>

          <Droppable droppableId="backlog">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                onScroll={onBacklogScroll}
                className={`zinc-scroll min-h-0 flex-1 space-y-2.5 overflow-y-auto rounded-2xl border border-black/5 bg-white/40 p-2 pr-1 transition-all duration-500 ease-in-out dark:border-white/10 dark:bg-white/[0.02] ${snapshot.isDraggingOver ? "bg-zinc-100/80 dark:bg-zinc-800/50" : ""}`}
              >
                <AnimatePresence>
                  {backlogTasks.map((task, i) => (
                    <TaskCard key={task.id} task={task} index={i} />
                  ))}
                </AnimatePresence>
                {provided.placeholder}
                {backlogTasks.length === 0 && !snapshot.isDraggingOver ? (
                  <div className="mt-1 flex h-16 items-center justify-center rounded-xl border border-dashed border-black/10 text-[11px] text-zinc-400 transition-colors duration-500 ease-in-out dark:border-white/8 dark:text-zinc-500">
                    Drop here
                  </div>
                ) : null}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </aside>
  );
}
