"use client";
import { ResolvedStep, isTickerStep } from "@/models/OnboardingFlow/methods";
import { useContext } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { textInterpolationContext } from "./RichText";
import { StepRouter } from "./StepRouter";
import { StepWithTicker } from "./StepWithTicker";

export function StepScreen(resolvedStep: ResolvedStep) {
  const { stepDefinition, stepId } = resolvedStep;
  const { state, next } = useContext(onboardingFlowContext);

  return (
    <textInterpolationContext.Provider
      value={{
        responses: state.responses,
        expressions:
          ("expressions" in stepDefinition && stepDefinition.expressions) || {},
      }}
    >
      {isTickerStep(stepDefinition) ? (
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
