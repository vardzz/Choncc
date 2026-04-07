"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { ChevronLeft, ChevronRight, GripVertical, MoreHorizontal, Zap } from "lucide-react";
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
    dot: "bg-red-500 dark:bg-red-400",
    text: "text-red-600 dark:text-red-400",
    glow: "shadow-[0_0_10px_rgba(220,38,38,0.75)] dark:shadow-[0_0_10px_rgba(248,113,113,0.85)]",
  },
  {
    id: "inprogress",
    label: "In Progress",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-[0_0_10px_rgba(22,163,74,0.75)] dark:shadow-[0_0_10px_rgba(74,222,128,0.85)]",
  },
  {
    id: "review",
    label: "Review",
    dot: "bg-orange-500 dark:bg-orange-400",
    text: "text-orange-600 dark:text-orange-400",
    glow: "shadow-[0_0_10px_rgba(234,88,12,0.75)] dark:shadow-[0_0_10px_rgba(251,146,60,0.85)]",
  },
  {
    id: "done",
    label: "Done",
    dot: "bg-blue-500 dark:bg-blue-400",
    text: "text-blue-600 dark:text-blue-400",
    glow: "shadow-[0_0_10px_rgba(37,99,235,0.75)] dark:shadow-[0_0_10px_rgba(96,165,250,0.85)]",
  },
];

const CAT = {
  Frontend: "border-blue-500/35 bg-blue-500/10 text-blue-500 dark:border-blue-400/40 dark:bg-blue-500/10 dark:text-blue-400",
  Backend: "border-yellow-500/35 bg-yellow-500/10 text-yellow-500 dark:border-yellow-400/40 dark:bg-yellow-500/10 dark:text-yellow-400",
  "UI/UX": "border-purple-500/35 bg-purple-500/10 text-purple-500 dark:border-purple-400/40 dark:bg-purple-500/10 dark:text-purple-400",
  DevOps: "border-white/20 bg-white/5 text-white dark:border-white/20 dark:bg-white/5 dark:text-white",
  Database: "border-white/20 bg-white/5 text-white dark:border-white/20 dark:bg-white/5 dark:text-white",
};
const PRI = {
  HIGH: "border-red-500/35 bg-red-500/10 text-red-500 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-400",
  MEDIUM: "border-orange-500/35 bg-orange-500/10 text-orange-500 dark:border-orange-400/40 dark:bg-orange-500/10 dark:text-orange-400",
  LOW: "border-emerald-500/35 bg-emerald-500/10 text-emerald-500 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const SP_MAP: Record<string, number> = { "k-1": 5, "k-2": 3, "k-3": 4, "k-4": 5, "k-5": 2, "k-6": 2, "k-7": 3 };
const GRAD = [
  "from-zinc-800 to-zinc-600",
  "from-zinc-700 to-zinc-500",
  "from-zinc-900 to-zinc-600",
  "from-zinc-700 to-zinc-400",
  "from-zinc-800 to-zinc-500",
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
            className={`group rounded-2xl p-3.5 transition-all duration-500 ease-in-out ${
              ds.isDragging
                ? "cursor-grabbing border border-zinc-700 bg-zinc-900 shadow-2xl rotate-1 scale-[1.02]"
                : "cursor-grab border border-black/5 bg-white/85 shadow-sm shadow-zinc-200/50 hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            }`}
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold ${pStyle}`}>{task.priority || "MEDIUM"}</span>
              <div className="opacity-0 group-hover:opacity-40">
                <GripVertical className="h-3.5 w-3.5 text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400" />
              </div>
            </div>
            <p className="mb-1 text-sm font-semibold leading-snug tracking-tight text-zinc-900 transition-colors duration-500 ease-in-out dark:text-zinc-100">{task.title}</p>
            {task.description ? (
              <p className="mb-2.5 line-clamp-1 text-[11px] leading-relaxed text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">
                {task.description}
              </p>
            ) : null}
            <div className="mb-3 flex flex-wrap gap-1">
              <span className={`inline-flex rounded-lg border px-2 py-0.5 text-[10px] font-medium ${catStyle}`}>{task.category}</span>
              {task.tags?.filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-lg border border-black/10 bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 transition-colors duration-500 ease-in-out dark:border-white/8 dark:bg-white/5 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${grad}`}>
                  <span className="text-[9px] font-bold text-white">{initials}</span>
                </div>
                {task.dateRange ? (
                  <span className="font-mono text-[9px] text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">{task.dateRange}</span>
                ) : null}
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-black/10 bg-zinc-200 transition-colors duration-500 ease-in-out dark:border-white/10 dark:bg-zinc-800">
                <span className="text-[10px] font-bold text-zinc-700 transition-colors duration-500 ease-in-out dark:text-zinc-100">{sp}</span>
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

  const btnCls = "border border-black/10 bg-white/80 text-zinc-500 transition-colors duration-500 ease-in-out hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100";

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white/65 shadow-sm shadow-zinc-200/50 transition-colors duration-500 ease-in-out dark:border-white/5 dark:bg-zinc-900/55 dark:shadow-none">
      <div className="shrink-0 border-b border-black/5 px-6 py-3.5 transition-colors duration-500 ease-in-out dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onPrevSprint} className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-all ${btnCls}`}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="min-w-[72px] text-center">
              <p className="text-sm font-bold leading-none tracking-tight text-zinc-950 transition-colors duration-500 ease-in-out dark:text-zinc-100">Sprint {sprintNum}</p>
              <p className="mt-0.5 text-[10px] font-mono text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">of 14 total</p>
            </div>
            <button onClick={onNextSprint} className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-all ${btnCls}`}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-medium text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">Apr 7 - Apr 21, 2026</p>
            <p className="font-mono text-sm font-bold tabular-nums text-zinc-700 transition-colors duration-500 ease-in-out dark:text-zinc-200">{timer}</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b border-black/5 px-5 py-2.5 transition-colors duration-500 ease-in-out dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <Zap className={`h-3.5 w-3.5 ${overloaded ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">
              Sprint Capacity
            </span>
          </div>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10 transition-colors duration-500 ease-in-out dark:bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                overloaded
                  ? "bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-400"
                  : "bg-gradient-to-r from-emerald-600 to-green-500 dark:from-emerald-500 dark:to-green-400"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="font-mono text-sm font-bold tabular-nums text-zinc-900 transition-colors duration-500 ease-in-out dark:text-zinc-100">
              {capacityUsed}
            </span>
            <span className="text-sm text-zinc-400 transition-colors duration-500 ease-in-out dark:text-zinc-500">/</span>
            <span className="font-mono text-sm text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">{capacityTotal}</span>
            <span className="ml-0.5 text-[10px] text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">SP</span>
            {overloaded ? (
              <span className="ml-1 rounded-full border border-red-300 bg-red-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-red-600 transition-colors duration-500 ease-in-out dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-400">
                Overloaded
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div onScroll={onBoardXScroll} className="zinc-scroll min-h-0 flex-1 overflow-x-auto px-3.5 pb-4 pt-3">
        <div className="flex h-full min-w-max gap-3.5">
          {COLUMNS.map((col) => {
            const tasks = columns[col.id] || [];
            return (
              <div key={col.id} className="flex w-[220px] shrink-0 flex-col sm:w-[236px] xl:w-[248px]">
                <div
                  className="mb-0.5 flex items-center justify-between rounded-t-2xl border border-black/5 bg-white/70 px-3.5 py-2.5 transition-colors duration-500 ease-in-out dark:border-white/10 dark:bg-zinc-900/70"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${col.dot} ${col.glow}`} />
                    <span className={`text-xs font-bold transition-colors duration-500 ease-in-out ${col.text}`}>{col.label}</span>
                    <span className="rounded-md bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 transition-colors duration-500 ease-in-out dark:bg-zinc-800 dark:text-zinc-400">
                      {tasks.length}
                    </span>
                  </div>
                  <button
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors duration-500 ease-in-out hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/8 dark:hover:text-zinc-100"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      onScroll={onColumnScroll}
                      className={`zinc-scroll min-h-[380px] flex-1 space-y-2.5 overflow-y-auto rounded-b-2xl border border-t-0 border-black/5 bg-white/45 p-2 transition-all duration-500 ease-in-out dark:border-white/10 dark:bg-zinc-900/40 ${snapshot.isDraggingOver ? "bg-zinc-100/80 dark:bg-zinc-800/50" : ""}`}
                    >
                      <AnimatePresence>
                        {tasks.map((task, i) => (
                          <TaskCard key={task.id} task={task} index={i} />
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                      {tasks.length === 0 && !snapshot.isDraggingOver ? (
                        <div className="mt-1 flex h-16 items-center justify-center rounded-xl border border-dashed border-black/10 text-[11px] text-zinc-400 transition-colors duration-500 ease-in-out dark:border-white/8 dark:text-zinc-500">
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
    </section>
  );
}
