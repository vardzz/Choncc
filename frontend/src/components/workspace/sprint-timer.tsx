"use client";

import { useEffect, useRef, useState } from "react";
import { Timer, Minimize2 } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedOpenState = localStorage.getItem("sprintTimerOpen");
    if (savedOpenState) {
      setIsOpen(savedOpenState === "1");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sprintTimerOpen", isOpen ? "1" : "0");
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-lg border px-3 py-1.5 transition flex items-center gap-2 text-xs font-medium ${
          isOpen
            ? "bg-[var(--ws-accent-soft)] border-[#C2D8C4]/40 text-[var(--ws-accent)]"
            : "bg-transparent border-[var(--ws-border)] text-[var(--ws-muted)] hover:border-[#C2D8C4]/30"
        }`}
        aria-expanded={isOpen}
        aria-label="Toggle sprint timer"
        title="Sprint timer"
      >
        <Timer className="h-4 w-4" />
        <span className="hidden sm:inline">Sprint</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-48 rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-surface)] backdrop-blur-xl shadow-2xl select-none text-left">
          <div className="flex items-center justify-end border-b border-[var(--ws-border)] px-3 py-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-[var(--ws-muted)] transition hover:bg-[var(--ws-accent-soft)] hover:text-[var(--ws-accent)]"
              aria-label="Collapse sprint timer details"
            >
              <Minimize2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-center">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--ws-accent)]">
              {sprintName}
            </h3>

            <div className="font-mono text-3xl font-bold text-[var(--ws-accent)]">
              {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </div>

            <p className="text-xs text-[var(--ws-muted)]">{sprintDates}</p>
          </div>
        </div>
      )}
    </div>
  );
}
