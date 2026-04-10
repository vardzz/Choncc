"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChonccIcon } from "@/components/ui/choncc-icon";

type DashboardNavbarProps = {
  activeWorkspaceName: string;
};

const MENU_ITEMS = [
  { icon: User, label: "Account" },
  { icon: Settings, label: "Settings" },
  { icon: LogOut, label: "Logout", danger: true },
];

export function DashboardNavbar({ activeWorkspaceName }: DashboardNavbarProps) {
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
    <header className="relative h-14 shrink-0 overflow-visible border-b border-[#C2D8C4]/15 bg-[#222222]/85 px-5 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(90deg,rgba(34,34,34,0.14)_0%,rgba(194,216,196,0.2)_45%,rgba(34,34,34,0.14)_100%)] opacity-90 blur-lg" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C2D8C4]/35 to-transparent" />

      <div className="relative flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <ChonccIcon size="sm" />
          <div className="flex items-center gap-3">
            <p className="text-base font-black tracking-tight text-[#F5F5F5]">Choncc</p>
            <span className="h-4 w-px bg-[#C2D8C4]/20" />
            <p className="text-xs font-medium text-[#B3BCB3]">{activeWorkspaceName}</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setDropOpen((open) => !open)}
              aria-label="Open user menu"
              className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#C2D8C4]/25 bg-gradient-to-br from-[#2A2A2A] to-[#3A3A3A] shadow-sm transition-all duration-300 hover:border-[#C2D8C4]/45"
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
                    className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-[#C2D8C4]/20 bg-[#222222]/95 shadow-xl backdrop-blur-xl"
                >
                    <div className="border-b border-[#C2D8C4]/15 px-3 py-2.5">
                      <p className="text-xs font-semibold text-[#F5F5F5]">John Doe</p>
                      <p className="text-[10px] text-[#A9B3A9]">john@choncc.app</p>
                  </div>
                  <div className="p-1">
                    {MENU_ITEMS.map(({ icon: Icon, label, danger }) => (
                      <button
                        key={label}
                        type="button"
                          className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-300 hover:bg-[#C2D8C4]/10 ${
                            danger ? "text-red-400 hover:text-red-300" : "text-[#D7E5D8] hover:text-[#F5F5F5]"
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
