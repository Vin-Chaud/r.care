"use client";
import {
  Cursor,
  ResolvedStep,
  areCursorsEqual,
  isTickerStep,
} from "@/models/OnboardingFlow/methods";
import { useContext, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { QuestionnaireTicker } from "./QuestionnaireTicker";
import { textInterpolationContext } from "./RichText";
import { StepRouter } from "./StepRouter";

export function StepScreen({
  stepDefinition,
  sectionTitle,
  tickerSubsectionLengths,
  tickerStepIndex,
  stepId,
}: ResolvedStep) {
  const { back, state, next } = useContext(onboardingFlowContext);
  const [fillingTickerCursor, setFillingTickerCursor] = useState<{
    cursor: Cursor;
    autoNext: boolean;
  } | null>(null);

  const isFilling =
    fillingTickerCursor != null &&
    areCursorsEqual(fillingTickerCursor.cursor, state.cursor);

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
              stepIndex={tickerStepIndex}
              subsectionIndex={state.cursor.currentSubsectionIndex}
              isFilling={isFilling}
              onDidFill={() => {
                if (fillingTickerCursor?.autoNext) {
                  next();
                  setFillingTickerCursor(null);
                }
              }}
            />
          )}
        </div>
        <StepRouter
          stepDefinition={stepDefinition}
          stepId={stepId}
          onDidRespond={(autoTickerNext) => {
            setFillingTickerCursor({
              cursor: state.cursor,
              autoNext: autoTickerNext,
            });
          }}
        />
      </div>
    </textInterpolationContext.Provider>
  );
}
