"use client";

import { createContext } from "react";

export const globalContext = createContext<GlobalContext>({
  questionTransitionTime: 1000,
  storyTransitionTime: 4000,
  storyTransitionDelayTime: 1000,
  analysisTransitionTime: 2000,
  analysisTransitionDelayTime: 500,
  quizDelayTime: 3500,
  quizAfterDelayTime: 1000,
  analysisFinalDelayTime: 1000,
});

export interface GlobalContext {
  questionTransitionTime: number;
  storyTransitionTime: number;
  storyTransitionDelayTime: number;
  analysisTransitionTime: number;
  analysisTransitionDelayTime: number;
  quizDelayTime: number;
  quizAfterDelayTime: number;
  analysisFinalDelayTime: number;
}
