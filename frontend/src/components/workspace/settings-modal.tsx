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
      <div className="rounded-xl border border-[rgba(194,216,196,0.2)] bg-[#222222] p-3">
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
      <div className="rounded-xl border border-[#DDE5DD] bg-[#F9FAF9] p-3">
        <div className="space-y-2 animate-pulse">
          <div className="h-2 w-2/3 rounded bg-[rgba(34,34,34,0.25)]" />
          <div className="h-2 w-1/2 rounded bg-[rgba(34,34,34,0.18)]" />
          <div className="h-8 rounded bg-[#FFFFFF]" />
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
        <div className="bg-[#F9FAF9] p-3">
          <div className="space-y-2 animate-pulse">
            <div className="h-2 w-2/3 rounded bg-[rgba(34,34,34,0.2)]" />
            <div className="h-2 w-1/2 rounded bg-[rgba(34,34,34,0.2)]" />
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
            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto rounded-l-3xl border-l border-[#DDE5DD] bg-[#FFFFFF] shadow-[0_10px_30px_rgba(194,216,196,0.15)] dark:border-[rgba(194,216,196,0.15)] dark:bg-[#2A2A2A] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#DDE5DD] bg-[#FFFFFF] px-6 py-4 backdrop-blur-md dark:border-[rgba(194,216,196,0.15)] dark:bg-[rgba(34,34,34,0.8)] dark:backdrop-blur-[20px]">
              <h2 className="text-lg font-bold text-[#222222] dark:text-[#C2D8C4]">Workspace Settings</h2>
              <button onClick={onClose} className="text-[rgba(34,34,34,0.5)] hover:text-[#222222] transition dark:text-[rgba(194,216,196,0.4)] dark:hover:text-[#C2D8C4]">
                ✕
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="rounded-2xl border border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] p-4 shadow-[0_4px_20px_rgba(194,216,196,0.15)] dark:border-[rgba(194,216,196,0.15)] dark:bg-[rgba(42,42,42,0.6)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#222222] dark:text-[#C2D8C4]">Theme Toggle</p>
                    <p className="text-xs text-[rgba(34,34,34,0.8)] dark:text-[rgba(194,216,196,0.7)]">Quickly switch between dark and light mode</p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="rounded-lg border border-[#222222] px-3 py-1.5 text-xs font-semibold text-[#222222] transition hover:bg-[rgba(194,216,196,0.2)] dark:border-[rgba(194,216,196,0.2)] dark:text-[#C2D8C4] dark:hover:border-[rgba(194,216,196,0.4)] dark:hover:bg-[rgba(194,216,196,0.12)]"
                  >
                    Toggle ({effectiveTheme})
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold border-b-2 border-[#C2D8C4] pb-1 text-[#222222] dark:text-[#C2D8C4]">Theme</h3>
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
                            ? "border-[#C2D8C4] bg-[rgba(194,216,196,0.2)] dark:border-[rgba(194,216,196,0.4)] dark:bg-[rgba(194,216,196,0.12)]"
                            : "border-[rgba(34,34,34,0.08)] bg-[#FFFFFF] hover:border-[#C2D8C4] dark:border-[rgba(194,216,196,0.15)] dark:bg-[rgba(42,42,42,0.6)] dark:hover:border-[rgba(194,216,196,0.4)]"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-[#C2D8C4]" />
                            <span className="text-sm font-semibold text-[#222222] dark:text-[#C2D8C4]">{label}{systemLabel}</span>
                          </div>
                          {isSelected && (
                            <span className="rounded-full bg-[#C2D8C4] px-2 py-0.5 text-[10px] font-bold text-[#222222]">
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
