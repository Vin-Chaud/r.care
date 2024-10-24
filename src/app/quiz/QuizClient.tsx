"use client";

import { OnboardingFlow } from "@/components/OnboardingFlow";
import { OnboardingFlowContext } from "@/context/OnboardingFlowContext";
import { Cursor } from "@/models/OnboardingFlow/methods";
import { OnboardingFlow as OnboardingFlowModel } from "@/models/OnboardingFlow/model";
import { useMemo } from "react";

export function QuizClient({
  flow,
  imageUrls,
  initialCursor,
  initialResponses,
}: {
  flow: OnboardingFlowModel;
  imageUrls: Readonly<Record<string, string>>;
  initialCursor: Cursor;
  initialResponses: Readonly<Record<string, unknown>>;
}) {
  const onboardingFlowContextValue = useMemo(
    () => ({ flow, imageUrls }),
    [flow, imageUrls]
  );

  return (
    <OnboardingFlowContext.Provider value={onboardingFlowContextValue}>
      <OnboardingFlow
        initialCursor={initialCursor}
        initialResponses={initialResponses}
      />
    </OnboardingFlowContext.Provider>
  );
}
