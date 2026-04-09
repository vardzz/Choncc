"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskCard, type KanbanTask } from "@/components/dashboard/mainBoard";
import { Select } from "@/components/ui/select";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useState, type FormEvent } from "react";

type BacklogSidebarProps = {
  backlogTasks: KanbanTask[];
  onAddTask: (title: string, category: string) => void;
};

export function BacklogSidebar({ backlogTasks, onAddTask }: BacklogSidebarProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onBacklogScroll = useScrollVisibility();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle, category);
    setTitle("");
  };

  return (
    <aside
      className={`flex shrink-0 flex-col overflow-hidden border-r border-white/5 bg-zinc-900/50 transition-all duration-300 ${
        isCollapsed ? "w-14" : "w-80"
      }`}
    >
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          aria-label="Expand backlog sidebar"
          className="flex h-full min-h-0 w-full cursor-pointer flex-col items-center justify-start gap-5 px-2 py-3 text-left"
        >
          <div className="flex flex-1 items-center justify-center">
            <span
              className="select-none text-[10px] font-semibold uppercase tracking-[0.34em] text-zinc-400"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Backlog
            </span>
          </div>
        </button>
      ) : (
        <>
          <div className="border-b border-white/5 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-zinc-50">Backlog</h2>
                <p className="text-xs text-zinc-400">
                  {backlogTasks.length} task{backlogTasks.length === 1 ? "" : "s"}
                </p>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border border-white/10 text-zinc-400 transition-colors duration-300 hover:bg-white/5 hover:text-zinc-50"
                onClick={() => setIsCollapsed(true)}
                aria-label="Collapse backlog sidebar"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="flex h-full min-h-0 flex-col gap-4 p-3">
            <form onSubmit={handleSubmit} className="space-y-2.5 border-b border-white/5 pb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">New Task</p>
              <Input placeholder="Task title..." value={title} onChange={(event) => setTitle(event.target.value)} />
              <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Frontend</option>
                <option>Backend</option>
                <option>UI/UX</option>
                <option>DevOps/Infra</option>
              </Select>
              <Button type="submit" className="w-full cursor-pointer border border-white/10 bg-zinc-100 text-zinc-950 transition-colors duration-300 hover:bg-white">
                + Add to Backlog
              </Button>
            </form>

            <Droppable droppableId="backlog">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onScroll={onBacklogScroll}
                  className={`zinc-scroll min-h-0 flex-1 space-y-2.5 overflow-y-auto rounded-2xl border border-white/5 bg-zinc-950/45 p-2 pr-1 transition-all duration-300 ${snapshot.isDraggingOver ? "bg-zinc-900/80" : ""}`}
                >
                  <AnimatePresence>
                    {backlogTasks.map((task, i) => (
                      <TaskCard key={task.id} task={task} index={i} />
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                  {backlogTasks.length === 0 && !snapshot.isDraggingOver ? (
                    <div className="mt-1 flex h-16 items-center justify-center rounded-xl border border-dashed border-white/10 text-[11px] text-zinc-500">
                      Drop here
                    </div>
                  ) : null}
                </div>
              )}
            </Droppable>
          </div>
        </>
      )}
    </aside>
  );
}
