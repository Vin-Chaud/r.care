"use client";
import { useCallback, useEffect, useRef } from "react";

export function useAutoCanceledTimeout(deps: readonly any[] = []) {
  const timeoutRef = useRef(new Set<number>());

  useEffect(
    () => () => {
      for (const timeout of timeoutRef.current) {
        window.clearTimeout(timeout);
      }
      timeoutRef.current.clear();
    },
    deps
  );

  return useCallback((callback: () => void, time: number) => {
    timeoutRef.current.add(window.setTimeout(callback, time));
  }, []);
}
