import * as React from "react";

import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { cn } from "@/lib/utils";

export function ScrollArea({ className, children }: { className?: string; children: React.ReactNode }) {
  const onScroll = useScrollVisibility();

  return (
    <div onScroll={onScroll} className={cn("zinc-scroll overflow-auto", className)}>
      {children}
    </div>
  );
}
