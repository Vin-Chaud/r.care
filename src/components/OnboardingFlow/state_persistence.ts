"use client";

import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { OnboardingFlowState, onboardingFlowStateSchema } from "./types";

export function loadStateFromSessionStorage(
  spec: OnboardingFlow
): OnboardingFlowState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stateString = sessionStorage.getItem("onboardingFlowState");
  if (stateString == null) {
    return null;
  }

  try {
    const state = onboardingFlowStateSchema.parse(JSON.parse(stateString));
    const isStateValid = isOnboardingFlowStateValid(state, spec, (issue) => {
      console.error(
        "Onboarding flow state in session storage is invalid and will not be used.",
        issue
      );
    });
    return isStateValid ? state : null;
  } catch (exception) {
    console.error(
      "Failed to parse onboarding flow state from session storage",
      exception
    );
    return null;
  }
}

export function saveStateToSessionStorage(state: OnboardingFlowState) {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.setItem("onboardingFlowState", JSON.stringify(state));
}

import {
  getStepDefinitionWithFallback,
  getStepResponseValidator,
  resolveStep,
} from "@/models/OnboardingFlow/methods";
import assert from "assert";

export function isOnboardingFlowStateValid(
  state: OnboardingFlowState,
  spec: OnboardingFlow,
  onDidFindIssue?: (issue: string) => void
) {
  // Check if the cursor is within the bounds of the flow specification
  try {
    resolveStep(spec, state.cursor);
  } catch (exception: any) {
    onDidFindIssue?.(
      `The cursor is invalid for the flow. ` + exception.message
    );
    return false;
  }

  // Check that every step up to the cursor has a response
  // In this nested loop, there's a concept of an iterator limit for each level
  // of nesting. The iterator completes fully in a prior item of each level,
  // but only completes up to the current item in the current level.
  // The "+1" in the limit is makes sure the current item is included
  // when we use the < operator, as we usually do when looping through
  // entire arrays.
  const sectionLimit = state.cursor.currentSectionIndex + 1;
  for (let sectionIndex = 0; sectionIndex < sectionLimit; sectionIndex++) {
    const section = spec.sections[sectionIndex];
    const isCurrentSection = sectionIndex === state.cursor.currentSectionIndex;

    // Only validate subsections up to the current subsection in the current section
    // But validate every subsection in previous sections
    const subsectionLimit = isCurrentSection
      ? state.cursor.currentSubsectionIndex + 1
      : section.subsections.length;
    for (
      let subsectionIndex = 0;
      subsectionIndex < subsectionLimit;
      subsectionIndex++
    ) {
      const subsection = section.subsections[subsectionIndex];
      const isCurrentSubsection =
        isCurrentSection &&
        subsectionIndex === state.cursor.currentSubsectionIndex;

      // Validate every step in the previous subsections,
      // but the current subsection only up to EXCLUDING the current step
      // because the user is yet to respond to the current step.
      const stepLimit = isCurrentSubsection
        ? state.cursor.currentStepIndex
        : subsection.step_order.length;

      for (let stepIndex = 0; stepIndex < stepLimit; stepIndex++) {
        const stepId = subsection.step_order[stepIndex];
        const stepDefinition = getStepDefinitionWithFallback(
          stepId,
          subsection,
          section,
          spec
        );
        assert(
          stepDefinition != null,
          `Step definition not found for step ${stepId} -- the flow spec is invalid.`
        );

        // Not every step needs a response, so we skip those that don't.
        const responseValidator = getStepResponseValidator(stepDefinition);
        if (!responseValidator) {
          continue;
        }

        if (!Object.hasOwn(state.responses, stepId)) {
          onDidFindIssue?.(
            `The cursor ${JSON.stringify(state.cursor)} ` +
              `should already have a response at step ${stepId} ` +
              `(section ${sectionIndex}, subsection ${subsectionIndex}, step ${stepIndex})`
          );
          return false;
        }

        const stepResponse = state.responses[stepId];
        const responseValidationResult =
          responseValidator.safeParse(stepResponse);
        if (!responseValidationResult.success) {
          onDidFindIssue?.(
            `The response at step ${stepId} ` +
              `(section ${sectionIndex}, subsection ${subsectionIndex}, step ${stepIndex}) ` +
              `is invalid: ${responseValidationResult.error.message} ` +
              `(step definition: ${JSON.stringify(stepDefinition)})`
          );
          return false;
        }
      }
    }
  }

  return true;
}
