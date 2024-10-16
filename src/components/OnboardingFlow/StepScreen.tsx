"use client";
import {
  Cursor,
  ResolvedStep,
  areCursorsEqual,
  isTickerStep,
} from "@/models/OnboardingFlow/methods";
import { Fragment, useContext, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { QuestionnaireTicker } from "./QuestionnaireTicker";
import { textInterpolationContext } from "./RichText";
import { StepRouter } from "./StepRouter";
import styled from "styled-components";
import { Greys, Purples } from "@/design_components/design_system";
import { RCareBrand } from "@/components/icons/RCareBrand";

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
      {isTickerStep(stepDefinition) ? (
        <TickerStepLayout>
          <h1>
            <button type="button" onClick={back}>
              {"⬅️"}
            </button>
            {typeof sectionTitle === "string" ? sectionTitle : <RCareBrand />}
          </h1>
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
        </TickerStepLayout>
      ) : (
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
      )}
    </textInterpolationContext.Provider>
  );
}

const TickerStepLayout = styled.section`
  background-color: ${Greys.White};
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
