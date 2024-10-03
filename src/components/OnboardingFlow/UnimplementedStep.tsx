"use client";
import { globalContext } from "@/context/GlobalContext";
import { Step } from "@/models/OnboardingFlow/model";
import { useContext, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { useAutoCanceledTimeout } from "./useAutoCanceledTimeout";

export function UnimplementedStep({
  stepDefinition,
  onDidClickContinue: onDidRespond,
}: {
  stepDefinition: Step;
  onDidClickContinue?: () => void;
}) {
  const { next } = useContext(onboardingFlowContext);
  const setTimeout = useAutoCanceledTimeout();
  const waitTime = useContext(globalContext).questionTransitionTime;
  const [didClick, setDidClick] = useState(false);

  return (
    <div>
      <h2>Unimplemented step</h2>
      <pre>{JSON.stringify(stepDefinition, null, 2)}</pre>
      <button
        type="button"
        disabled={didClick}
        onClick={() => {
          setDidClick(true);
          onDidRespond?.();
          setTimeout(next, waitTime);
        }}
      >
        Just keep going
      </button>
    </div>
  );
}
