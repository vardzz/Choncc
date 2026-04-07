"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Moon, Sparkles, Sun } from "lucide-react";

type DashboardNavbarProps = {
  activeWorkspaceName: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export function DashboardNavbar({ activeWorkspaceName, isDarkMode, onToggleTheme }: DashboardNavbarProps) {
  return (
    <header className="h-14 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-600">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <p className="text-lg font-bold tracking-tight text-white">Choncc</p>
          <Separator orientation="vertical" className="bg-white/15" />
          <p className="text-sm text-zinc-400">{activeWorkspaceName}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
            <Sun className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
            <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} aria-label="Toggle theme" />
            <Moon className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
          </div>
          <Button variant="ghost" className="h-9 rounded-full border border-violet-400/30 bg-violet-600 px-3 text-white hover:bg-violet-500">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-violet-500 text-[11px] text-white">JD</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
