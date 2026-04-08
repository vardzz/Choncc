"use client";

import { motion } from "framer-motion";

const PIXEL_MAP = [
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

const COLOR_PALETTE: Record<string, string> = {
  X: "#3F3F46",
  W: "#E4E4E7",
  E: "#09090B",
  A: "#8B5CF6",
  M: "#27272A",
};

function MascotSVG() {
  const PIXEL_SIZE = 10;
  const rows = PIXEL_MAP.length;
  const cols = PIXEL_MAP[0].length;

  return (
    <svg
      width={cols * PIXEL_SIZE}
      height={rows * PIXEL_SIZE}
      viewBox={`0 0 ${cols * PIXEL_SIZE} ${rows * PIXEL_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl"
      aria-hidden="true"
    >
      {PIXEL_MAP.map((row, rowIndex) =>
        row.split("").map((char, colIndex) => {
          if (char === " ") return null;
          return (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * PIXEL_SIZE}
              y={rowIndex * PIXEL_SIZE}
              width={PIXEL_SIZE}
              height={PIXEL_SIZE}
              fill={COLOR_PALETTE[char]}
              stroke={COLOR_PALETTE[char]}
              strokeWidth="0.5"
            />
          );
        }),
      )}
    </svg>
  );
}

export default function ChonccLoader() {
  const JUMP_DURATION = 1.4;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-zinc-950 font-sans">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

      <div className="relative z-10 flex h-48 flex-col items-center justify-center">
        <div className="relative flex flex-col items-center pb-2">
          <motion.div
            className="absolute bottom-0 h-1 w-3 rounded-full bg-zinc-400 opacity-0"
            style={{ left: "30%" }}
            animate={{
              x: ["0px", "-40px", "-40px"],
              y: ["0px", "-8px", "0px"],
              opacity: [1, 0, 0],
              scale: [1, 0.2, 0],
            }}
            transition={{ duration: JUMP_DURATION, repeat: Number.POSITIVE_INFINITY, times: [0, 0.25, 1], ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-1 h-2 w-2 rounded-full bg-zinc-500 opacity-0"
            style={{ left: "40%" }}
            animate={{
              x: ["0px", "-25px", "-25px"],
              y: ["0px", "-15px", "-15px"],
              opacity: [0.8, 0, 0],
              scale: [1, 0.2, 0],
            }}
            transition={{ duration: JUMP_DURATION, repeat: Number.POSITIVE_INFINITY, times: [0, 0.25, 1], ease: "easeOut" }}
          />

          <motion.div
            className="absolute bottom-0 h-1 w-3 rounded-full bg-zinc-400 opacity-0"
            style={{ right: "30%" }}
            animate={{
              x: ["0px", "40px", "40px"],
              y: ["0px", "-8px", "0px"],
              opacity: [1, 0, 0],
              scale: [1, 0.2, 0],
            }}
            transition={{ duration: JUMP_DURATION, repeat: Number.POSITIVE_INFINITY, times: [0, 0.25, 1], ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-1 h-2 w-2 rounded-full bg-zinc-500 opacity-0"
            style={{ right: "40%" }}
            animate={{
              x: ["0px", "25px", "25px"],
              y: ["0px", "-15px", "-15px"],
              opacity: [0.8, 0, 0],
              scale: [1, 0.2, 0],
            }}
            transition={{ duration: JUMP_DURATION, repeat: Number.POSITIVE_INFINITY, times: [0, 0.25, 1], ease: "easeOut" }}
          />

          <motion.div
            animate={{ y: [0, 0, 0, -80, 0] }}
            transition={{
              duration: JUMP_DURATION,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.3, 0.4, 0.7, 1],
              ease: ["linear", "linear", "circOut", "circIn"],
            }}
            className="relative z-10"
          >
            <motion.div
              animate={{
                scaleY: [0.6, 1, 0.8, 1.1, 1, 0.6],
                scaleX: [1.3, 1, 1.2, 0.9, 1, 1.3],
              }}
              transition={{
                duration: JUMP_DURATION,
                repeat: Number.POSITIVE_INFINITY,
                times: [0, 0.15, 0.35, 0.45, 0.7, 1],
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "bottom center" }}
            >
              <MascotSVG />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1, 1, 0.4, 1],
              opacity: [0.5, 0.5, 0.5, 0.1, 0.5],
            }}
            transition={{
              duration: JUMP_DURATION,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.3, 0.4, 0.7, 1],
              ease: ["linear", "linear", "circOut", "circIn"],
            }}
            className="absolute bottom-[-2px] z-0 h-3 w-28 rounded-[100%] bg-black blur-md"
          />
        </div>
      </div>
    </div>
  );
}
