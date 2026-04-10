"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Hand, Lock, MoveRight, ShieldCheck, Sparkles, Timer, Users } from "lucide-react";

type MascotFrame = {
  label: string;
  message: string;
  expectationTitle: string;
  expectationPoints: string[];
  status: string;
  metricLabel: string;
  metricValue: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  pixelMap: readonly string[];
};

const FRAME_IDLE_1 = [
  "   XXX      XXX   ",
  "  XXXXX    XXXXX  ",
  " XXXXXXX  XXXXXXX ",
  " XWWWWWWWWWWWWWWX ",
  "XWWWWWWWWWWWWWWWWX",
  "XWWWWWWWWWWWWWWWWX",
  "XWWWEEWWWWWWEEWWWX",
  "XWWWEEWWWWWWEEWWWX",
  "XWWWWWWWWWWWWWWWWX",
  "XWWAAWWWMMWWWAAWWX",
  " XWWWWWWMMWWWWWWX ",
  " XXXXXXXXXXXXXXXXX",
  " XX XXXXXXXXXX XX ",
  " XX XXXXXXXXXX XX ",
  "  X XXXXXXXXXX X  ",
  "    XXXX  XXXX    ",
  "     XX    XX     ",
];

const FRAME_IDLE_2 = [
  "                  ",
  "   XXX      XXX   ",
  "  XXXXX    XXXXX  ",
  " XXXXXXX  XXXXXXX ",
  " XWWWWWWWWWWWWWWX ",
  "XWWWWWWWWWWWWWWWWX",
  "XWWWWWWWWWWWWWWWWX",
  "XWWWEEWWWWWWEEWWWX",
  "XWWWEEWWWWWWEEWWWX",
  "XWWWWWWWWWWWWWWWWX",
  "XWWAAWWWMMWWWAAWWX",
  " XWWWWWWMMWWWWWWX ",
  " XXXXXXXXXXXXXXXXX",
  " XX XXXXXXXXXX XX ",
  " XX XXXXXXXXXX XX ",
  "    XXXX  XXXX    ",
  "     XX    XX     ",
];

const FRAME_PREP = [
  "                  ",
  "                  ",
  "                  ",
  "   XXX      XXX   ",
  "  XXXXX    XXXXX  ",
  " XXXXXXX  XXXXXXX ",
  " XWWWWWWWWWWWWWWX ",
  "XWWWWWWWWWWWWWWWWX",
  "XWWWEEWWWWWWEEWWWX",
  "XWWWEEWWWWWWEEWWWX",
  "XWWWWWWWWWWWWWWWWX",
  "XWWAAWWWMMWWWAAWWX",
  " XWWWWWWMMWWWWWWX ",
  "XXXXXXXXXXXXXXXXXX",
  "XX XXXXXXXXXXXX XX",
  " X  XXXXXXXXXX  X ",
  "    XXX    XXX    ",
];

const FRAME_JUMP = [
  "   XXX      XXX   ",
  "  XXXXX    XXXXX  ",
  " XXXXXXX  XXXXXXX ",
  " XXWWWWWWWWWWWWXX ",
  "XXXWWWWWWWWWWWWXXX",
  "XXXWWWWWWWWWWWWXXX",
  " XXWEEWWWWWWEEWXX ",
  "  XWEEWWWWWWEEWX  ",
  "  XWWWWWWWWWWWWX  ",
  "  XWAAWWMMWWAAWX  ",
  "   XWWWWMMWWWWX   ",
  "   XXXXXXXXXXXX   ",
  "    XXXXXXXXXX    ",
  "    XXXXXXXXXX    ",
  "     XXX  XXX     ",
  "     XX    XX     ",
  "     X      X     ",
];

const FRAMES = [FRAME_IDLE_1, FRAME_IDLE_2, FRAME_PREP, FRAME_JUMP] as const;

const COLOR_PALETTE: Record<string, string> = {
  X: "#3F3F46",
  W: "#E4E4E7",
  E: "#09090B",
  M: "#27272A",
};

function MascotSVG({ pixelMap }: { pixelMap: readonly string[] }) {
  const PIXEL_SIZE = 6;
  const rows = pixelMap.length;
  const cols = pixelMap[0].length;

  return (
    <svg
      width={cols * PIXEL_SIZE}
      height={rows * PIXEL_SIZE}
      viewBox={`0 0 ${cols * PIXEL_SIZE} ${rows * PIXEL_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
      aria-hidden="true"
    >
      {pixelMap.map((row, rowIndex) =>
        row.split("").map((char, colIndex) => {
          if (char === " ") {
            return null;
          }

          const fill = COLOR_PALETTE[char] ?? "#E4E4E7";

          return (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * PIXEL_SIZE}
              y={rowIndex * PIXEL_SIZE}
              width={PIXEL_SIZE}
              height={PIXEL_SIZE}
              fill={fill}
              stroke={fill}
              strokeWidth="0.5"
            />
          );
        }),
      )}
    </svg>
  );
}

export function ChonccMascotShowcase() {
  const reducedMotion = useReducedMotion();
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [poseIndex, setPoseIndex] = useState(0);

  const poses: MascotFrame[] = [
    {
      label: "Plan",
      message: "Expectation: users create workspace context quickly, prioritize backlog, and set sprint intent without switching tools.",
      expectationTitle: "What users can do first",
      expectationPoints: [
        "Open a workspace and project with role-aware setup",
        "Prioritize backlog with estimates and dependencies",
        "Set sprint goals with clear capacity signal",
      ],
      status: "Backlog signal aligned",
      metricLabel: "Workspace readiness",
      metricValue: "92%",
      icon: Users,
      accent: "from-zinc-200/35 via-zinc-300/15 to-transparent",
      pixelMap: FRAMES[0],
    },
    {
      label: "Execute",
      message: "Expectation: users run delivery from one 3-pane surface with fast drag-and-drop and visible sprint timing.",
      expectationTitle: "What users feel during delivery",
      expectationPoints: [
        "Navigation, board, and backlog visible in one shell",
        "Drag-and-drop task flow across sprint columns",
        "Sprint timer and status updates with minimal friction",
      ],
      status: "Sprint in motion",
      metricLabel: "Focus-time saved",
      metricValue: "+11h",
      icon: MoveRight,
      accent: "from-zinc-300/35 via-zinc-400/15 to-transparent",
      pixelMap: FRAMES[2],
    },
    {
      label: "Govern",
      message: "Expectation: users trust the system with role-based boundaries, secure auth, and auditable activity trails.",
      expectationTitle: "What users trust by default",
      expectationPoints: [
        "Project Manager and Developer role permissions",
        "Supabase Auth, tenant isolation, and RLS foundations",
        "Audit trail visibility for sprint and task changes",
      ],
      status: "Security posture active",
      metricLabel: "Policy confidence",
      metricValue: "RLS",
      icon: ShieldCheck,
      accent: "from-zinc-100/30 via-zinc-200/10 to-transparent",
      pixelMap: FRAMES[3],
    },
  ];

  const currentPose = poses[poseIndex % poses.length];
  const CurrentIcon = currentPose.icon;

  const nextPose = () => {
    setPoseIndex((value) => (value + 1) % poses.length);
  };

  return (
    <motion.aside
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-5"
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${currentPose.accent} opacity-80`} />
      <div className="pointer-events-none absolute left-6 top-6 h-20 w-20 rounded-full bg-zinc-100/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-24 w-24 rounded-full bg-zinc-400/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Interactive product preview</p>
            <p className="mt-1 text-lg font-semibold text-zinc-50">What users should expect in Choncc</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
            <Sparkles className="h-3.5 w-3.5" />
            Premium mode
          </div>
        </div>

        <div
          ref={dragAreaRef}
          className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_20%)] p-5"
        >
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-zinc-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            {currentPose.label}
          </div>
          <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <CurrentIcon className="h-3.5 w-3.5" />
            {currentPose.status}
          </div>

          <motion.button
            type="button"
            aria-label="Interact with the Choncc mascot"
            className="group relative cursor-grab rounded-[1.75rem] outline-none active:cursor-grabbing"
            onClick={nextPose}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            drag={reducedMotion ? false : true}
            dragConstraints={dragAreaRef}
            dragElastic={0.12}
            dragMomentum={false}
          >
            <motion.div
              className="absolute inset-x-[-1.5rem] bottom-[-0.6rem] h-12 rounded-[100%] bg-black/40 blur-xl"
              animate={reducedMotion ? undefined : { scaleX: [1, 0.96, 1], opacity: [0.45, 0.38, 0.45] }}
              transition={reducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="relative z-10 flex flex-col items-center gap-3"
              animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
              transition={reducedMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-[1.35rem] border border-white/10 bg-zinc-900/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <MascotSVG pixelMap={currentPose.pixelMap} />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1 text-xs font-medium text-zinc-300">
                <Hand className="h-3.5 w-3.5" />
                Drag or tap to preview next mode
              </div>
            </motion.div>
          </motion.button>
        </div>

        <div className="grid gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
          <p className="text-sm leading-relaxed text-zinc-300">{currentPose.message}</p>
          <div className="grid gap-2 rounded-xl border border-white/10 bg-zinc-950/50 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{currentPose.expectationTitle}</p>
            <ul className="space-y-1.5 text-xs leading-relaxed text-zinc-300">
              {currentPose.expectationPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-[0.35rem] h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-zinc-950/50 p-2.5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">3-pane shell</p>
              <p className="mt-1 text-xs font-medium text-zinc-300">Navigation + Board + Backlog</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-zinc-950/50 p-2.5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Sprint ops</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-zinc-300"><Timer className="h-3 w-3" /> Timer + capacity</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-zinc-950/50 p-2.5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Security</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-zinc-300"><Lock className="h-3 w-3" /> Auth + RLS</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
            <span>{currentPose.metricLabel}</span>
            <span className="font-semibold text-zinc-300">{currentPose.metricValue}</span>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {poses.map((pose, index) => {
            const active = index === poseIndex;

            return (
              <button
                key={pose.label}
                type="button"
                onClick={() => {
                  setPoseIndex(index);
                }}
                className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                    : "border-white/10 bg-zinc-950/30 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                {pose.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
