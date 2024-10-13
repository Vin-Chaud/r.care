import { useEffect, useState } from "react";

export type TransitionState = "after" | "progress" | "before";

/**
 * If in the state `before`, returns `false`. If in the state `after`, returns
 * `true`. If in the state `progress`, the first time this returns `false`
 * and the `animate` function is called at every animation frame until it returns
 * `true`, whereupon the `onDidComplete` callback will be called.
 *
 * This hook is used to watch a transition so that the completion is based
 * on real-time conditions--which could be affected by various performance
 * parameters on the browser--rather than a fixed duration. By doing this,
 * we can programmatically sequence transitions one after another more smoothly
 * than using timeouts, which may not be as accurate at times.
 *
 * @param state The intended state of the transition.
 * @param animate A function that returns `true` when the transition is complete.
 * @param onDidComplete A callback to be called when the transition is complete.
 *
 * @returns `true` if the transition is in or tending towards the `after` state.
 */
export function useWatchedTransition(
  state: TransitionState,
  animate: () => boolean,
  onDidComplete: () => void
) {
  const [isAfter, setIsAfter] = useState(state === "after");
  useEffect(() => {
    let handle = requestAnimationFrame(() => {
      if (state === "progress") {
        setIsAfter(true);

        const waitForFill = () => {
          handle = requestAnimationFrame(() => {
            if (animate()) {
              onDidComplete();
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
