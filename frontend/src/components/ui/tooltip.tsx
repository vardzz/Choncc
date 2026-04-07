import * as React from "react";

export function Tooltip({
  content,
  children,
  className,
}: {
  content: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={className} title={content} aria-label={content}>
      {children}
    </span>
  );
}
