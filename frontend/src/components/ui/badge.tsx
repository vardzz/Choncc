import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "secondary" | "destructive";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-transparent bg-violet-600 text-white",
  outline: "border-white/15 bg-transparent text-zinc-200",
  secondary: "border-transparent bg-white/10 text-zinc-200",
  destructive: "border-red-500/40 bg-red-500/10 text-red-300",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
