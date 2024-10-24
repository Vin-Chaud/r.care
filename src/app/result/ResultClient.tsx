"use client";

import { ResultFlow } from "@/components/ResultFlow";
import { OnboardingFlowContext } from "@/context/OnboardingFlowContext";
import { OnboardingFlow as OnboardingFlowModel } from "@/models/OnboardingFlow/model";
import { useMemo } from "react";

export function ResultClient({
  flow,
  imageUrls,
  responses,
}: {
  flow: OnboardingFlowModel;
  imageUrls: Readonly<Record<string, string>>;
  responses: Readonly<Record<string, unknown>>;
}) {
  const onboardingFlowContextValue = useMemo(
    () => ({ flow, imageUrls }),
    [flow, imageUrls]
  );

  return (
    <OnboardingFlowContext.Provider value={onboardingFlowContextValue}>
      <ResultFlow responses={responses} />
    </OnboardingFlowContext.Provider>
  );
}
