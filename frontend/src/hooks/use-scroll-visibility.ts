"use client";

import { useCallback, useEffect, useRef } from "react";

export function useScrollVisibility(hideDelay = 700) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      const element = event.currentTarget;
      element.classList.add("is-scrolling");

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        element.classList.remove("is-scrolling");
      }, hideDelay);
    },
    [hideDelay],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return onScroll;
}
