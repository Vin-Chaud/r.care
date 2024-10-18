import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { createContext, useContext } from "react";

export interface OnboardingFlowContext {
  flow: OnboardingFlow;
  imageUrls: Readonly<Record<string, string>>;
}

export const OnboardingFlowContext = createContext<OnboardingFlowContext>(
  null!
);

export const useOnboardingFlow = () => useContext(OnboardingFlowContext).flow;

export const useOnboardingFlowImageUrls = () =>
  useContext(OnboardingFlowContext).imageUrls;
