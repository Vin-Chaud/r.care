"use client";

import { Paywall } from "@/components/Paywall";
import { OnboardingFlowContext } from "@/context/OnboardingFlowContext";
import { OnboardingFlow as OnboardingFlowModel } from "@/models/OnboardingFlow/model";
import { SubscriptionType } from "@/models/Subscription";
import { useMemo } from "react";

export function PaywallClient({
  flow,
  imageUrls,
  existingCartType,
}: {
  flow: OnboardingFlowModel;
  imageUrls: Readonly<Record<string, string>>;
  existingCartType: SubscriptionType | null;
}) {
  const onboardingFlowContextValue = useMemo(
    () => ({ flow, imageUrls }),
    [flow, imageUrls]
  );

  return (
    <OnboardingFlowContext.Provider value={onboardingFlowContextValue}>
      <Paywall existingCartType={existingCartType} />
    </OnboardingFlowContext.Provider>
  );
}
