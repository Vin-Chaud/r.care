"use client";
import { createContext } from "react";
import { OnboardingFlowState, AnswerValue } from "./types";

export interface OnboardingFlowContext {
  state: OnboardingFlowState;
  setResponse: (stepId: string, value: AnswerValue) => void;
  back: () => void;
  next: () => void;
  overrideBackAction: (action: () => void) => () => void;
}

export const onboardingFlowContext = createContext<OnboardingFlowContext>(
  null!
);
