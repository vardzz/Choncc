"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GripHorizontal } from "lucide-react";

type SprintTimerProps = {
  initialMinutes?: number;
  sprintName?: string;
  sprintDates?: string;
};

export function SprintTimer({
  initialMinutes = 15,
  sprintName = "SPRINT 10",
  sprintDates = "Apr 7 - Apr 21, 2026",
}: SprintTimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Load position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("sprintTimerPosition");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setIsDragging(true);

    const rect = dragRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    e.preventDefault();
  };

  // Handle drag move
  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !dragRef.current) return;

    const newX = e.clientX - offsetRef.current.x;
    const newY = e.clientY - offsetRef.current.y;

    // Constrain to viewport
    const maxX = window.innerWidth - dragRef.current.offsetWidth;
    const maxY = window.innerHeight - dragRef.current.offsetHeight;

    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    // Save position to localStorage
    localStorage.setItem("sprintTimerPosition", JSON.stringify(position));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);

      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, position]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <motion.div
      ref={dragRef}
      animate={{ x: position.x, y: position.y }}
      initial={false}
      className="fixed z-40 w-48 rounded-2xl border border-[#C2D8C4]/30 bg-[#2A2A2A]/95 backdrop-blur-xl shadow-2xl select-none"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* Drag Handle */}
      <div
        onMouseDown={handleDragStart}
        className="flex items-center justify-center p-3 cursor-grab active:cursor-grabbing border-b border-[#C2D8C4]/20"
      >
        <GripHorizontal className="h-4 w-4 text-[#C2D8C4]" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 text-center">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C2D8C4]">
          {sprintName}
        </h3>

        {/* Timer Display */}
        <div className="font-mono text-3xl font-bold text-[#C2D8C4]">
          {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>

        {/* Sprint Dates */}
        <p className="text-xs text-[#A0A0A0]">{sprintDates}</p>
      </div>
    </motion.div>
  );
}
