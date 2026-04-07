import * as React from "react";

import { cn } from "@/lib/utils";

export function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full", className)}>{children}</div>;
}

export function AvatarFallback({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex h-full w-full items-center justify-center rounded-full text-xs font-bold", className)}>{children}</div>;
}
