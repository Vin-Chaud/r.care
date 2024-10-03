"use client";

import { createContext } from "react";

export const globalContext = createContext<GlobalContext>({
  questionTransitionTime: 1000,
  storyTransitionTime: 2000,
  storyTransitionDelayTime: 500,
});

export interface GlobalContext {
  questionTransitionTime: number;
  storyTransitionTime: number;
  storyTransitionDelayTime: number;
}
