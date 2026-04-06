"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LayoutGrid,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type ThemeMode = "dark" | "light";

function getWorkspaceSlug(pathname: string) {
  const match = pathname.match(/\/workspace\/([^/]+)/);
  return match?.[1] ?? "main";
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const workspaceSlug = getWorkspaceSlug(pathname);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const workspaceLabel = useMemo(
    () => workspaceSlug.replace(/[-_]/g, " ").replace(/\b\w/g, (character) => character.toUpperCase()),
    [workspaceSlug],
  );

  const dark = theme === "dark";
  const shellBg = dark
    ? "bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100"
    : "bg-gradient-to-br from-white via-zinc-50 to-zinc-200 text-zinc-900";
  const panelText = dark ? "text-zinc-100" : "text-zinc-900";
  const mutedText = dark ? "text-zinc-400" : "text-zinc-500";
  const subPanelBg = dark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10";
  const canvasBg = dark ? "bg-black/20 border-white/10" : "bg-white/40 border-black/10";

  return (
    <div className={`min-h-screen ${shellBg} antialiased`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute left-[6%] top-[-8%] h-[480px] w-[480px] rounded-full blur-[120px] ${dark ? "bg-zinc-800/30" : "bg-zinc-300/35"}`} />
        <div className={`absolute right-[8%] bottom-[-12%] h-[520px] w-[520px] rounded-full blur-[120px] ${dark ? "bg-zinc-300/10" : "bg-zinc-200/60"}`} />
      </div>

      <header className={`sticky top-0 z-30 border-b backdrop-blur-xl ${dark ? "border-white/10 bg-zinc-950/70" : "border-black/10 bg-white/70"}`}>
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${dark ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-zinc-50"}`}>
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className={panelText}>Choncc</span>
                <span className={`hidden rounded-full border px-2 py-0.5 text-[11px] font-medium sm:inline-flex ${dark ? "border-white/10 bg-white/5 text-zinc-300" : "border-black/10 bg-black/5 text-zinc-500"}`}>
                  {workspaceLabel}
                </span>
              </div>
              <p className={`text-[11px] ${mutedText}`}>Project Intelligence Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center rounded-full border p-1 ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${theme === "light" ? (dark ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-zinc-50") : mutedText}`}
              >
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${theme === "dark" ? (dark ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-zinc-50") : mutedText}`}
              >
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                Dark
              </button>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((current) => !current)}
                className={`inline-flex h-10 items-center gap-2 rounded-full border px-3 pr-2 text-sm transition ${dark ? "border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10" : "border-black/10 bg-black/5 text-zinc-900 hover:bg-black/10"}`}
              >
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${dark ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-zinc-50"}`}>
                  C
                </span>
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <AnimatePresence>
                {profileOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`absolute right-0 top-12 w-40 rounded-2xl border p-2 shadow-2xl ${dark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white"}`}
                  >
                    <button type="button" className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm ${dark ? "text-zinc-200 hover:bg-white/5" : "text-zinc-800 hover:bg-black/5"}`}>
                      Profile
                    </button>
                    <button type="button" className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm ${dark ? "text-zinc-200 hover:bg-white/5" : "text-zinc-800 hover:bg-black/5"}`}>
                      Settings
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)]">
        <motion.aside
          animate={{ width: leftCollapsed ? 76 : 280 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className={`hidden border-r px-3 py-4 lg:block ${dark ? "border-white/10 bg-zinc-950/40" : "border-black/10 bg-white/40"}`}
        >
          <div className={`mb-3 flex items-center justify-between rounded-2xl border px-3 py-2 ${subPanelBg}`}>
            <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${mutedText}`}>Workspaces</span>
            <button
              type="button"
              onClick={() => setLeftCollapsed((current) => !current)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border ${dark ? "border-white/10 bg-white/5 text-zinc-200" : "border-black/10 bg-black/5 text-zinc-700"}`}
              aria-label="Collapse workspaces sidebar"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <AnimatePresence initial={false} mode="wait">
            {!leftCollapsed ? (
              <motion.nav
                key="workspace-nav"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-2"
              >
                {[
                  "Atlas",
                  "Northwind",
                  "Blackline",
                  "Choncc Core",
                ].map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm transition ${index === 0 ? (dark ? "border-white/15 bg-white/8 text-zinc-50" : "border-black/15 bg-black/5 text-zinc-900") : dark ? "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10" : "border-black/10 bg-black/5 text-zinc-600 hover:bg-black/10"}`}
                  >
                    <span>{item}</span>
                    <LayoutGrid className="h-4 w-4 opacity-70" aria-hidden="true" />
                  </button>
                ))}
              </motion.nav>
            ) : (
              <motion.div
                key="workspace-icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {["A", "N", "B", "C"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`flex h-11 w-full items-center justify-center rounded-2xl border text-sm font-semibold ${dark ? "border-white/10 bg-white/5 text-zinc-200" : "border-black/10 bg-black/5 text-zinc-700"}`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className={`mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1600px] flex-col rounded-[2rem] border p-4 shadow-2xl backdrop-blur-2xl sm:p-6 ${canvasBg}`}>
            {children}
          </div>
        </main>

        <motion.aside
          animate={{ width: rightCollapsed ? 76 : 320 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className={`hidden border-l px-3 py-4 xl:block ${dark ? "border-white/10 bg-zinc-950/40" : "border-black/10 bg-white/40"}`}
        >
          <div className={`mb-3 flex items-center justify-between rounded-2xl border px-3 py-2 ${subPanelBg}`}>
            <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${mutedText}`}>Backlog</span>
            <button
              type="button"
              onClick={() => setRightCollapsed((current) => !current)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border ${dark ? "border-white/10 bg-white/5 text-zinc-200" : "border-black/10 bg-black/5 text-zinc-700"}`}
              aria-label="Collapse backlog sidebar"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <AnimatePresence initial={false} mode="wait">
            {!rightCollapsed ? (
              <motion.div
                key="backlog-items"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="space-y-3"
              >
                {[
                  { title: "Refine sprint goals", meta: "Planning" },
                  { title: "Review board flow", meta: "In Progress" },
                  { title: "Ship dashboard shell", meta: "Ready" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-2xl border p-3 shadow-sm ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                  >
                    <p className={`text-sm font-medium ${panelText}`}>{item.title}</p>
                    <p className={`mt-1 text-xs ${mutedText}`}>{item.meta}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="backlog-icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {["1", "2", "3"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`flex h-11 w-full items-center justify-center rounded-2xl border text-sm font-semibold ${dark ? "border-white/10 bg-white/5 text-zinc-200" : "border-black/10 bg-black/5 text-zinc-700"}`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
      </div>
    </div>
  );
}
