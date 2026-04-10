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
      className={`flex shrink-0 flex-col overflow-hidden border-r border-[#C2D8C4]/12 bg-[#2A2A2A]/70 transition-all duration-300 ${
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
              className="select-none text-[10px] font-semibold uppercase tracking-[0.34em] text-[#AEB7AE]"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Backlog
            </span>
          </div>
        </button>
      ) : (
        <>
          <div className="border-b border-[#C2D8C4]/12 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-[#F5F5F5]">Backlog</h2>
                <p className="text-xs text-[#AEB7AE]">
                  {backlogTasks.length} task{backlogTasks.length === 1 ? "" : "s"}
                </p>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border border-[#C2D8C4]/20 text-[#B0B9B0] transition-colors duration-300 hover:bg-[#C2D8C4]/10 hover:text-[#F5F5F5]"
                onClick={() => setIsCollapsed(true)}
                aria-label="Collapse backlog sidebar"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="flex h-full min-h-0 flex-col gap-4 p-3">
            <form onSubmit={handleSubmit} className="space-y-2.5 border-b border-[#C2D8C4]/12 pb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#AEB7AE]">New Task</p>
              <Input placeholder="Task title..." value={title} onChange={(event) => setTitle(event.target.value)} />
              <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Frontend</option>
                <option>Backend</option>
                <option>UI/UX</option>
                <option>DevOps/Infra</option>
              </Select>
              <Button type="submit" className="w-full cursor-pointer border border-[#C2D8C4]/35 bg-[#C2D8C4] text-[#222222] transition-colors duration-300 hover:bg-[#D7E5D8]">
                + Add to Backlog
              </Button>
            </form>

            <Droppable droppableId="backlog">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onScroll={onBacklogScroll}
                  className={`zinc-scroll min-h-0 flex-1 space-y-2.5 overflow-y-auto rounded-2xl border border-[#C2D8C4]/12 bg-[#222222]/55 p-2 pr-1 transition-all duration-300 ${snapshot.isDraggingOver ? "bg-[#2A2A2A]/90" : ""}`}
                >
                  <AnimatePresence>
                    {backlogTasks.map((task, i) => (
                      <TaskCard key={task.id} task={task} index={i} />
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                  {backlogTasks.length === 0 && !snapshot.isDraggingOver ? (
                    <div className="mt-1 flex h-16 items-center justify-center rounded-xl border border-dashed border-[#C2D8C4]/20 text-[11px] text-[#95A095]">
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
