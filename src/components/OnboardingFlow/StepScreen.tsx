"use client";
import {
  Cursor,
  ResolvedStep,
  areCursorsEqual,
  getCursorHookDeps,
  isTickerStep,
} from "@/models/OnboardingFlow/methods";
import { useContext, useEffect, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { textInterpolationContext } from "./RichText";
import { QuestionnaireTicker } from "./QuestionnaireTicker";
import { StepRouter } from "./StepRouter";

export function StepScreen({
  stepDefinition,
  sectionTitle,
  tickerSubsectionLengths,
  tickerStepIndex,
  stepId,
}: ResolvedStep) {
  const { back, state } = useContext(onboardingFlowContext);
  const [advancingCursor, setAdvancingCursor] = useState<Cursor | null>(null);
  const isAdvancing =
    advancingCursor != null && areCursorsEqual(advancingCursor, state.cursor);

  useEffect(() => {
    setAdvancingCursor(null);
  }, getCursorHookDeps(state.cursor));

  return (
    <textInterpolationContext.Provider
      value={{
        responses: state.responses,
        expressions:
          ("expressions" in stepDefinition && stepDefinition.expressions) || {},
      }}
    >
      <div>
        <h1>
          <button type="button" onClick={back}>
            {"⬅️"}
          </button>
          {typeof sectionTitle === "string" ? (
            sectionTitle
          ) : (
            <code>Placeholder R.Care Brand</code>
          )}
        </h1>
        <div>
          {isTickerStep(stepDefinition) && (
            <QuestionnaireTicker
              key={
                // We need to kill all transitions in the ticker
                // when the section changes.
                state.cursor.currentSectionIndex
              }
              subsectionLengths={tickerSubsectionLengths}
              stepIndex={tickerStepIndex + (isAdvancing ? 1 : 0)}
              subsectionIndex={state.cursor.currentSubsectionIndex}
            />
          )}
        </div>
        <StepRouter
          stepDefinition={stepDefinition}
          stepId={stepId}
          onDidRespond={() => {
            if (isTickerStep(stepDefinition)) {
              setAdvancingCursor(state.cursor);
            }
          }}
        />
      </div>
    </textInterpolationContext.Provider>
  );
}
