"use client";
import { createContext } from "react";
import { OnboardingFlowState, AnswerValue } from "./types";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";

export interface OnboardingFlowContext {
  flow: OnboardingFlow;
  state: OnboardingFlowState;
  setResponse: (stepId: string, value: AnswerValue) => void;
  back: () => void;
  next: () => void;
}

export const onboardingFlowContext = createContext<OnboardingFlowContext>(
  null!
);
