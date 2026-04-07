import { cn } from "@/lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "h-5 w-px",
        "bg-white/10",
        className,
      )}
    />
  );
}
