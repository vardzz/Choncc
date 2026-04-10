"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useState } from "react";

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
  X: "#000000",
  W: "#F5F5F5",
  E: "#111111",
  A: "#C2D8C4",
  M: "#222222",
};

type MascotSVGProps = {
  pixelMap: readonly string[];
};

function MascotSVG({ pixelMap }: MascotSVGProps) {
  const PIXEL_SIZE = 6;
  const rows = pixelMap.length;
  const cols = pixelMap[0].length;

  return (
    <svg
      width={cols * PIXEL_SIZE}
      height={rows * PIXEL_SIZE}
      viewBox={`0 0 ${cols * PIXEL_SIZE} ${rows * PIXEL_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
      aria-hidden="true"
    >
      {pixelMap.map((row, rowIndex) =>
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
  const [currentFrame, setCurrentFrame] = useState(0);
  const JUMP_DURATION = 1.4;

  useAnimationFrame((time) => {
    const elapsed = time / 1000;
    const loopProgress = (elapsed % JUMP_DURATION) / JUMP_DURATION;

    let nextFrame = 0;
    if (loopProgress < 0.1) nextFrame = 2;
    else if (loopProgress < 0.25) nextFrame = 0;
    else if (loopProgress < 0.35) nextFrame = 1;
    else if (loopProgress < 0.4) nextFrame = 2;
    else nextFrame = 3;

    setCurrentFrame((prevFrame) => (prevFrame === nextFrame ? prevFrame : nextFrame));
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden font-sans" style={{ backgroundColor: "#222222" }}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ backgroundColor: "rgba(194, 216, 196, 0.15)" }}
      />

      <div className="relative z-10 flex h-32 flex-col items-center justify-center">
        <div className="relative flex flex-col items-center pb-2">
          <motion.div
            className="absolute bottom-0 h-1 w-3 rounded-full opacity-0"
            style={{ left: "30%", backgroundColor: "#C2D8C4" }}
            animate={{
              x: ["0px", "-40px", "-40px"],
              y: ["0px", "-8px", "0px"],
              opacity: [1, 0, 0],
              scale: [1, 0.2, 0],
            }}
            transition={{ duration: JUMP_DURATION, repeat: Number.POSITIVE_INFINITY, times: [0, 0.25, 1], ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-1 h-2 w-2 rounded-full opacity-0"
            style={{ left: "40%", backgroundColor: "#F5F5F5" }}
            animate={{
              x: ["0px", "-25px", "-25px"],
              y: ["0px", "-15px", "-15px"],
              opacity: [0.8, 0, 0],
              scale: [1, 0.2, 0],
            }}
            transition={{ duration: JUMP_DURATION, repeat: Number.POSITIVE_INFINITY, times: [0, 0.25, 1], ease: "easeOut" }}
          />

          <motion.div
            className="absolute bottom-0 h-1 w-3 rounded-full opacity-0"
            style={{ right: "30%", backgroundColor: "#C2D8C4" }}
            animate={{
              x: ["0px", "40px", "40px"],
              y: ["0px", "-8px", "0px"],
              opacity: [1, 0, 0],
              scale: [1, 0.2, 0],
            }}
            transition={{ duration: JUMP_DURATION, repeat: Number.POSITIVE_INFINITY, times: [0, 0.25, 1], ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-1 h-2 w-2 rounded-full opacity-0"
            style={{ right: "40%", backgroundColor: "#F5F5F5" }}
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
            style={{ transformOrigin: "bottom center" }}
          >
            <MascotSVG pixelMap={FRAMES[currentFrame]} />
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1, 1, 0.4, 1],
              opacity: [0.3, 0.3, 0.3, 0.05, 0.3],
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
