import { useEffect, useState } from "react";

export type TransitionState = "after" | "progress" | "before";

export function useWatchedTransition(
  state: TransitionState,
  test: () => boolean,
  onDidFill: () => void
) {
  const [isAfter, setIsAfter] = useState(state === "after");
  useEffect(() => {
    let handle = requestAnimationFrame(() => {
      if (state === "progress") {
        setIsAfter(true);

        const waitForFill = () => {
          handle = requestAnimationFrame(() => {
            if (test()) {
              onDidFill();
              cancelAnimationFrame(handle);
              return;
            }
            waitForFill();
          });
        };
        waitForFill();
      }
    });
    return () => cancelAnimationFrame(handle);
  }, [state]);

  useEffect(() => {
    if (state === "before" && isAfter) {
      setIsAfter(false);
    }
  }, [state, isAfter]);

  return state === "before" ? false : isAfter;
}
