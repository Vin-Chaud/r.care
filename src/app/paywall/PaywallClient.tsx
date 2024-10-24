"use client";

import { Paywall } from "@/components/Paywall";
import { OnboardingFlowContext } from "@/context/OnboardingFlowContext";
import { OnboardingFlow as OnboardingFlowModel } from "@/models/OnboardingFlow/model";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function PaywallClient({
  flow,
  imageUrls,
  hasCart,
}: {
  flow: OnboardingFlowModel;
  imageUrls: Readonly<Record<string, string>>;
  hasCart: boolean;
}) {
  const onboardingFlowContextValue = useMemo(
    () => ({ flow, imageUrls }),
    [flow, imageUrls]
  );

  return (
    <OnboardingFlowContext.Provider value={onboardingFlowContextValue}>
      <Paywall hasCart={hasCart} />
    </OnboardingFlowContext.Provider>
  );
}
