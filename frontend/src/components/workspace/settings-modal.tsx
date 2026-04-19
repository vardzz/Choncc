"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  useWorkspaceTheme,
  type WorkspaceThemePreference,
} from "@/components/workspace/workspace-theme-provider";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ThemeOption = {
  id: WorkspaceThemePreference;
  label: string;
  icon: typeof Moon;
};

const THEME_OPTIONS: ThemeOption[] = [
  { id: "dark", label: "Dark Mode", icon: Moon },
  { id: "light", label: "Light Mode", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
];

function ThemePreview({ option }: { option: WorkspaceThemePreference }) {
  if (option === "dark") {
    return (
      <div className="rounded-xl border border-[#C2D8C4]/20 bg-[#222222] p-3">
        <div className="space-y-2 animate-pulse">
          <div className="h-2 w-2/3 rounded bg-[#C2D8C4]/35" />
          <div className="h-2 w-1/2 rounded bg-[#A0A0A0]/35" />
          <div className="h-8 rounded bg-[#2A2A2A]" />
        </div>
      </div>
    );
  }

  if (option === "light") {
    return (
      <div className="rounded-xl border border-[#D7DDE4] bg-[#F6F8FA] p-3">
        <div className="space-y-2 animate-pulse">
          <div className="h-2 w-2/3 rounded bg-[#5B6675]/25" />
          <div className="h-2 w-1/2 rounded bg-[#8D97A4]/20" />
          <div className="h-8 rounded bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#C2D8C4]/20">
      <div className="grid grid-cols-2">
        <div className="bg-[#222222] p-3">
          <div className="space-y-2 animate-pulse">
            <div className="h-2 w-2/3 rounded bg-[#C2D8C4]/30" />
            <div className="h-2 w-1/2 rounded bg-[#A0A0A0]/35" />
          </div>
        </div>
        <div className="bg-[#F6F8FA] p-3">
          <div className="space-y-2 animate-pulse">
            <div className="h-2 w-2/3 rounded bg-[#5B6675]/20" />
            <div className="h-2 w-1/2 rounded bg-[#8D97A4]/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { preference, setPreference, toggleTheme, effectiveTheme, systemTheme } = useWorkspaceTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto rounded-l-3xl border-l border-[var(--ws-border)] bg-[var(--ws-surface)] shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[var(--ws-border)] bg-[var(--ws-surface-2)] px-6 py-4 backdrop-blur-md">
              <h2 className="text-lg font-bold text-[var(--ws-text)]">Workspace Settings</h2>
              <button onClick={onClose} className="text-[var(--ws-muted)] hover:text-[var(--ws-text)] transition">
                ✕
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-surface-2)] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ws-text)]">Theme Toggle</p>
                    <p className="text-xs text-[var(--ws-muted)]">Quickly switch between dark and light mode</p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="rounded-lg border border-[var(--ws-border)] px-3 py-1.5 text-xs font-semibold text-[var(--ws-text)] hover:border-[var(--ws-accent)] hover:bg-[var(--ws-accent-soft)] transition"
                  >
                    Toggle ({effectiveTheme})
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[var(--ws-accent)]">Theme</h3>
                <div className="space-y-3">
                  {THEME_OPTIONS.map(({ id, label, icon: Icon }) => {
                    const isSelected = preference === id;
                    const systemLabel =
                      id === "system" ? ` (current: ${systemTheme})` : "";

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPreference(id)}
                        className={`w-full rounded-2xl border p-3 text-left transition ${
                          isSelected
                            ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)]"
                            : "border-[var(--ws-border)] bg-[var(--ws-surface-2)] hover:border-[var(--ws-accent)]/60"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-[var(--ws-accent)]" />
                            <span className="text-sm font-semibold text-[var(--ws-text)]">{label}{systemLabel}</span>
                          </div>
                          {isSelected && (
                            <span className="rounded-full bg-[var(--ws-accent)] px-2 py-0.5 text-[10px] font-bold text-[var(--ws-bg)]">
                              Active
                            </span>
                          )}
                        </div>

                        <ThemePreview option={id} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
