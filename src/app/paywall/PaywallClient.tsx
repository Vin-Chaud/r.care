"use client";

import { Paywall } from "@/components/Paywall";
import { OnboardingFlowContext } from "@/context/OnboardingFlowContext";
import { OnboardingFlow as OnboardingFlowModel } from "@/models/OnboardingFlow/model";
import { useMemo } from "react";

export function PaywallClient({
  flow,
  imageUrls,
}: {
  flow: OnboardingFlowModel;
  imageUrls: Readonly<Record<string, string>>;
}) {
  const onboardingFlowContextValue = useMemo(
    () => ({ flow, imageUrls }),
    [flow, imageUrls]
  );

  return (
    <OnboardingFlowContext.Provider value={onboardingFlowContextValue}>
      <Paywall />
    </OnboardingFlowContext.Provider>
  );
}
