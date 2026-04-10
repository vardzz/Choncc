"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  GanttChartSquare,
  GripVertical,
  LayoutGrid,
  Rows3,
  MoreHorizontal,
  Clock3,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type KanbanColumnId = "backlog" | "todo" | "inprogress" | "review" | "done";
export type BoardColumnId = Exclude<KanbanColumnId, "backlog">;
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type KanbanTask = {
  id: string;
  title: string;
  category: string;
  priority: TaskPriority;
  workspaceId: string;
  storyPoints?: number;
  sp?: number;
  description?: string;
  assignee?: string;
  tags?: string[];
  dateRange?: string;
};

export type BoardColumns = Record<BoardColumnId, KanbanTask[]>;

const COLUMNS: Array<{
  id: BoardColumnId;
  label: string;
  dot: string;
  text: string;
  glow: string;
}> = [
  {
    id: "todo",
    label: "To Do",
    dot: "bg-[#7E967F]",
    text: "text-[#D7E5D8]",
    glow: "shadow-[0_0_10px_rgba(194,216,196,0.4)]",
  },
  {
    id: "inprogress",
    label: "In Progress",
    dot: "bg-[#A6BEA8]",
    text: "text-[#D7E5D8]",
    glow: "shadow-[0_0_10px_rgba(194,216,196,0.35)]",
  },
  {
    id: "review",
    label: "Review",
    dot: "bg-[#8EA98F]",
    text: "text-[#D7E5D8]",
    glow: "shadow-[0_0_10px_rgba(194,216,196,0.35)]",
  },
  {
    id: "done",
    label: "Done",
    dot: "bg-[#C2D8C4]",
    text: "text-[#E7EFE8]",
    glow: "shadow-[0_0_10px_rgba(194,216,196,0.45)]",
  },
];

const CAT = {
  Frontend: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/12 text-[#D7E5D8]",
  Backend: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/12 text-[#D7E5D8]",
  "UI/UX": "border border-[#C2D8C4]/25 bg-[#C2D8C4]/12 text-[#D7E5D8]",
  "DevOps/Infra": "border border-[#C2D8C4]/25 bg-[#C2D8C4]/12 text-[#D7E5D8]",
  DevOps: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/12 text-[#D7E5D8]",
  Infra: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/12 text-[#D7E5D8]",
  Database: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/12 text-[#D7E5D8]",
};
const PRI = {
  HIGH: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/10 text-[#D7E5D8]",
  MEDIUM: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/10 text-[#D7E5D8]",
  LOW: "border border-[#C2D8C4]/25 bg-[#C2D8C4]/10 text-[#D7E5D8]",
};

const SP_MAP: Record<string, number> = { "k-1": 5, "k-2": 3, "k-3": 4, "k-4": 5, "k-5": 2, "k-6": 2, "k-7": 3 };
const GRAD = [
  "from-[#425243] to-[#2A2A2A]",
  "from-[#4B5E4C] to-[#222222]",
  "from-[#3E4F3F] to-[#1D1D1D]",
  "from-[#617663] to-[#2A2A2A]",
  "from-[#546856] to-[#222222]",
];

function getGrad(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = name.charCodeAt(i) + ((h << 5) - h);
  return GRAD[Math.abs(h) % GRAD.length];
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useCountdown(initial: number) {
  const [remaining, setRemaining] = useState(initial);
  const ref = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    ref.current = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, []);

  const h = pad(Math.floor(remaining / 3600));
  const m = pad(Math.floor((remaining % 3600) / 60));
  const s = pad(remaining % 60);
  return `${h}:${m}:${s}`;
}

export function TaskCard({ task, index }: { task: KanbanTask; index: number }) {
  const catStyle = CAT[task.category as keyof typeof CAT] || CAT.Frontend;
  const pStyle = PRI[task.priority] || PRI.MEDIUM;
  const initials = (task.assignee || "??")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const grad = getGrad(task.assignee || "??");
  const sp = task.sp ?? task.storyPoints ?? SP_MAP[task.id] ?? 2;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(dp, ds) => (
        <div ref={dp.innerRef} {...dp.draggableProps} {...dp.dragHandleProps}>
          <motion.div
            layout
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group rounded-2xl p-3.5 transition-all duration-300 ${
              ds.isDragging
                ? "cursor-grabbing border border-zinc-300 bg-zinc-50 scale-[1.02] shadow-lg shadow-zinc-200/60 dark:border-zinc-600 dark:bg-zinc-900/95 dark:shadow-none"
                : "cursor-grab border border-black/5 bg-white/80 shadow-sm shadow-zinc-200/50 hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/75 dark:shadow-none dark:hover:border-zinc-700 dark:hover:bg-zinc-900/90"
            }`}
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold ${pStyle}`}>{task.priority || "MEDIUM"}</span>
              <div className="opacity-0 group-hover:opacity-40">
                <GripVertical className="h-3.5 w-3.5 text-zinc-400 transition-colors duration-300 dark:text-zinc-500" />
              </div>
            </div>
            <p className="mb-1 text-sm font-semibold leading-snug tracking-tight text-zinc-950 transition-colors duration-300 dark:text-zinc-50">{task.title}</p>
            {task.description ? (
              <p className="mb-2.5 line-clamp-1 text-[11px] leading-relaxed text-zinc-500 transition-colors duration-300 dark:text-zinc-400">
                {task.description}
              </p>
            ) : null}
            <div className="mb-3 flex flex-wrap gap-1">
              <span className={`inline-flex rounded-lg border px-2 py-0.5 text-[10px] font-medium ${catStyle}`}>{task.category}</span>
              {task.tags?.filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-lg border border-black/5 bg-black/5 px-2 py-0.5 text-[10px] font-medium text-zinc-500 transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-gradient-to-br ${grad} dark:border-white/10`}>
                  <span className="text-[9px] font-bold text-white">{initials}</span>
                </div>
                {task.dateRange ? (
                  <span className="font-mono text-[9px] text-zinc-500 transition-colors duration-300 dark:text-zinc-400">{task.dateRange}</span>
                ) : null}
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-black/5 bg-white/80 dark:border-white/10 dark:bg-zinc-900/80">
                <span className="text-[10px] font-bold text-zinc-950 dark:text-zinc-100">{sp}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
}

type MainBoardProps = {
  columns: BoardColumns;
  sprintIndex: number;
  onPrevSprint: () => void;
  onNextSprint: () => void;
  capacityUsed: number;
  capacityTotal: number;
};

export function MainBoard({
  columns,
  sprintIndex,
  onPrevSprint,
  onNextSprint,
  capacityUsed,
  capacityTotal,
}: MainBoardProps) {
  const timer = useCountdown(168 * 3600 - 23 * 60);
  const sprintNum = sprintIndex + 1;
  const pct = Math.min((capacityUsed / capacityTotal) * 100, 100);
  const overloaded = capacityUsed >= capacityTotal;
  const onBoardXScroll = useScrollVisibility();
  const onColumnScroll = useScrollVisibility();
  const [activeView, setActiveView] = useState<"board" | "gantt" | "timeline" | "calendar">("board");

  const views = [
    { id: "board" as const, label: "Board", icon: LayoutGrid },
    { id: "gantt" as const, label: "Gantt Chart", icon: GanttChartSquare },
    { id: "timeline" as const, label: "Timeline", icon: Rows3 },
    { id: "calendar" as const, label: "Calendar", icon: Calendar },
  ];

  return (
    <section className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#222222]/90">
      <div className="group absolute right-6 top-6 z-20">
        <div className="relative flex items-start justify-end">
          <button
            type="button"
            aria-label="Sprint timer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C2D8C4]/20 bg-[#2A2A2A]/90 text-[#C8D6C9] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#C2D8C4]/40 hover:text-[#F5F5F5] hover:shadow-[0_0_0_1px_rgba(194,216,196,0.14),0_20px_50px_rgba(0,0,0,0.55)]"
          >
            <Clock3 className="h-4 w-4 animate-pulse" />
          </button>

          <div className="pointer-events-none absolute right-0 top-12 w-[240px] translate-y-[-4px] scale-[0.96] opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
            <div className="rounded-2xl border border-[#C2D8C4]/18 bg-[#2A2A2A]/85 p-4 shadow-2xl backdrop-blur-xl">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#B2BBB2]">Sprint {sprintNum}</p>
                    <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-[#F5F5F5]">{timer}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={onPrevSprint}
                      aria-label="Previous sprint"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C2D8C4]/20 bg-[#C2D8C4]/8 text-[#C8D6C9] transition-colors hover:bg-[#C2D8C4]/14 hover:text-[#F5F5F5]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={onNextSprint}
                      aria-label="Next sprint"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C2D8C4]/20 bg-[#C2D8C4]/8 text-[#C8D6C9] transition-colors hover:bg-[#C2D8C4]/14 hover:text-[#F5F5F5]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#9CA69C]">Velocity</p>
                    <p className={`text-sm font-semibold ${overloaded ? "text-[#F5F5F5]" : "text-[#C8D6C9]"}`}>
                      {capacityUsed} / {capacityTotal} SP
                    </p>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-[#C2D8C4]/10">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${overloaded ? "bg-[#9CB49E]" : "bg-[#C2D8C4]"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {overloaded ? <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#D7E5D8]">Overloaded</p> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b border-[#C2D8C4]/12 bg-[#222222]/78 px-6 py-4 pr-72 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1 rounded-2xl border border-[#C2D8C4]/15 bg-[#2A2A2A]/72 p-1">
            {views.map(({ id, label, icon: Icon }) => {
              const active = activeView === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveView(id)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active ? "bg-[#C2D8C4] text-[#222222]" : "text-[#B3BDB3] hover:bg-[#C2D8C4]/10 hover:text-[#F5F5F5]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-[#C2D8C4]/20 bg-[#2A2A2A]/65 text-[#CAD7CB] hover:bg-[#C2D8C4]/10 hover:text-[#F5F5F5]"
            >
              <Filter className="mr-1.5 h-3.5 w-3.5" />
              Filter
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-[#C2D8C4]/20 bg-[#2A2A2A]/65 text-[#CAD7CB] hover:bg-[#C2D8C4]/10 hover:text-[#F5F5F5]"
            >
              <ArrowUpDown className="mr-1.5 h-3.5 w-3.5" />
              Sort
            </Button>
          </div>
        </div>
      </div>

      {activeView === "board" ? (
        <div onScroll={onBoardXScroll} className="zinc-scroll min-h-0 flex-1 overflow-x-auto bg-[#222222]/65 px-6 pb-6 pt-5">
          <div className="flex h-full min-w-max gap-4">
            {COLUMNS.map((col) => {
              const tasks = columns[col.id] || [];

              return (
                <div key={col.id} className="flex w-[220px] shrink-0 flex-col sm:w-[236px] xl:w-[248px]">
                  <div className="mb-0.5 flex items-center justify-between rounded-t-2xl border border-white/5 bg-zinc-900/70 px-3.5 py-2.5 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${col.dot} ${col.glow}`} />
                      <span className={`text-xs font-bold ${col.text}`}>{col.label}</span>
                      <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-300">
                        {tasks.length}
                      </span>
                    </div>
                    <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors duration-300 hover:bg-white/5 hover:text-zinc-50">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        onScroll={onColumnScroll}
                        className={`zinc-scroll min-h-[380px] flex-1 space-y-2.5 overflow-y-auto rounded-b-2xl border border-t-0 border-white/5 bg-zinc-950/55 p-2 transition-all duration-300 ${snapshot.isDraggingOver ? "bg-zinc-900/80" : ""}`}
                      >
                        <AnimatePresence>
                          {tasks.map((task, i) => (
                            <TaskCard key={task.id} task={task} index={i} />
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                        {tasks.length === 0 && !snapshot.isDraggingOver ? (
                          <div className="mt-1 flex h-16 items-center justify-center rounded-xl border border-dashed border-white/10 text-[11px] text-zinc-500">
                            Drop here
                          </div>
                        ) : null}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-3xl p-8 text-center">
            <p className="text-base font-semibold tracking-tight text-zinc-50">
              {activeView === "gantt" && "Gantt Chart View Content Coming Soon"}
              {activeView === "timeline" && "Timeline View Content Coming Soon"}
              {activeView === "calendar" && "Calendar View Content Coming Soon"}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              This section is reserved for the {activeView} experience.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
