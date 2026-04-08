"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChonccIcon } from "@/components/ui/choncc-icon";

type DashboardNavbarProps = {
  activeWorkspaceName: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

const MENU_ITEMS = [
  { icon: User, label: "Account" },
  { icon: Settings, label: "Settings" },
  { icon: LogOut, label: "Logout", danger: true },
];

export function DashboardNavbar({ activeWorkspaceName, isDarkMode, onToggleTheme }: DashboardNavbarProps) {
  const [dropOpen, setDropOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(event.target as Node)) return;
      setDropOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <header className="relative h-14 shrink-0 overflow-visible border-b border-black/5 bg-white/70 px-5 backdrop-blur-md transition-colors duration-500 ease-in-out dark:border-white/5 dark:bg-zinc-950/55">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(90deg,rgba(24,24,27,0.05)_0%,rgba(39,39,42,0.08)_45%,rgba(24,24,27,0.05)_100%)] opacity-70 blur-lg transition-colors duration-500 ease-in-out dark:bg-[linear-gradient(90deg,rgba(113,113,122,0.14)_0%,rgba(161,161,170,0.18)_45%,rgba(113,113,122,0.12)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-300/70 to-transparent transition-colors duration-500 ease-in-out dark:via-zinc-700/80" />

      <div className="relative flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <ChonccIcon size="sm" />
          <p className="text-base font-black tracking-tight text-zinc-950 transition-colors duration-500 ease-in-out dark:text-zinc-50">Choncc</p>
          <span className="h-4 w-px bg-black/10 transition-colors duration-500 ease-in-out dark:bg-white/10" />
          <p className="text-xs font-medium text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">{activeWorkspaceName}</p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="group relative flex h-7 w-14 cursor-pointer items-center rounded-full border border-black/10 bg-gradient-to-r from-zinc-200/70 via-white to-zinc-200/80 px-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.08)] transition-colors duration-500 ease-in-out dark:border-white/10 dark:bg-gradient-to-r dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_0_18px_rgba(255,255,255,0.06)]"
          >
            <Sun className="pointer-events-none absolute left-1.5 h-3 w-3 text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-300" aria-hidden="true" />
            <Moon className="pointer-events-none absolute right-1.5 h-3 w-3 text-zinc-600 transition-colors duration-500 ease-in-out dark:text-zinc-200" aria-hidden="true" />
            <motion.div
              animate={{ x: isDarkMode ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 36 }}
              className="z-10 flex h-5 w-5 items-center justify-center rounded-full border border-black/10 bg-[radial-gradient(circle_at_32%_25%,#ffffff,#f4f4f5_60%,#e4e4e7_100%)] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-500 ease-in-out dark:border-white/30 dark:bg-[radial-gradient(circle_at_32%_25%,#f5f5f5,#d4d4d8_60%,#a1a1aa_100%)] dark:shadow-[0_0_10px_rgba(255,255,255,0.25)]"
            >
              {isDarkMode ? (
                <Moon className="h-2.5 w-2.5 text-zinc-800" aria-hidden="true" />
              ) : (
                <Sun className="h-2.5 w-2.5 text-zinc-700" aria-hidden="true" />
              )}
            </motion.div>
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setDropOpen((open) => !open)}
              aria-label="Open user menu"
              className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-gradient-to-br from-zinc-900 to-zinc-700 shadow-sm transition-all duration-500 ease-in-out hover:border-zinc-500/35 dark:border-white/15 dark:from-zinc-700 dark:to-zinc-500 dark:shadow-[0_0_14px_rgba(255,255,255,0.08)]"
            >
              <span className="text-[11px] font-bold tracking-wide text-white">JD</span>
            </button>

            <AnimatePresence>
              {dropOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-black/5 bg-white/90 shadow-xl backdrop-blur-xl transition-colors duration-500 ease-in-out dark:border-white/10 dark:bg-zinc-900/95"
                >
                  <div className="border-b border-black/5 px-3 py-2.5 transition-colors duration-500 ease-in-out dark:border-white/10">
                    <p className="text-xs font-semibold text-zinc-900 transition-colors duration-500 ease-in-out dark:text-zinc-100">John Doe</p>
                    <p className="text-[10px] text-zinc-500 transition-colors duration-500 ease-in-out dark:text-zinc-400">john@choncc.app</p>
                  </div>
                  <div className="p-1">
                    {MENU_ITEMS.map(({ icon: Icon, label, danger }) => (
                      <button
                        key={label}
                        type="button"
                        className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-500 ease-in-out hover:bg-black/5 dark:hover:bg-white/8 ${
                          danger ? "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300" : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
