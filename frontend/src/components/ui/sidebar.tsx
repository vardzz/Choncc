import * as React from "react";

import { cn } from "@/lib/utils";

export function Sidebar({ className, children }: { className?: string; children: React.ReactNode }) {
  return <aside className={cn("h-full", className)}>{children}</aside>;
}

export function SidebarHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-3", className)}>{children}</div>;
}

export function SidebarContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-3 pt-0", className)}>{children}</div>;
}

export function SidebarFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-3 pt-0", className)}>{children}</div>;
}
