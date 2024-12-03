"use client";
import { ResolvedStep, isQuizStep } from "@/models/OnboardingFlow/methods";
import { useContext, useEffect } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { textInterpolationContext } from "./RichText";
import { StepRouter } from "./StepRouter";
import { StepWithTicker } from "./StepWithTicker";

export function StepScreen(resolvedStep: ResolvedStep) {
  const { stepDefinition, stepId } = resolvedStep;
  const { state, next } = useContext(onboardingFlowContext);

  // Safari will not undo the scrolling after it focuses on a text input, and then
  // the user submits a text input and the app navigates to the next page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stepId]);

  return (
    <textInterpolationContext.Provider
      value={{
        responses: state.responses,
        expressions:
          ("expressions" in stepDefinition && stepDefinition.expressions) || {},
      }}
    >
      {isQuizStep(stepDefinition) ? (
        <StepWithTicker {...resolvedStep} stepDefinition={stepDefinition} />
      ) : (
        <StepRouter
          stepDefinition={stepDefinition}
          stepId={stepId}
          onDidRespond={() => {
            next();
          }}
        />
      )}
    </textInterpolationContext.Provider>
  );
}
