"use client";
import { AppHeader } from "@/components/AppHeader";
import { FullFeedback } from "@/components/OnboardingFlow/FullFeedback";
import { globalContext } from "@/context/GlobalContext";
import { Greys } from "@/design_components/design_system";
import {
  ScrollablePageContentFrame,
  ScrollablePageLayoutContainer,
} from "@/design_components/PageLayout";
import { useAutoCanceledTimeout } from "@/hooks/useAutoCanceledTimeout";
import {
  Cursor,
  ResolvedStep,
  areCursorsEqual,
  gotoPreviousStep,
  isQuizStep,
  resolveStep,
} from "@/models/OnboardingFlow/methods";
import {
  FullFeedback as FullFeedbackModel,
  InfoScreen,
  Step,
  Story,
} from "@/models/OnboardingFlow/model";
import { useContext, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { QuestionnaireTicker } from "./QuestionnaireTicker";
import { StepRouter } from "./StepRouter";

export function StepWithTicker({
  stepDefinition,
  sectionTitle,
  tickerSubsectionLengths,
  tickerStepIndex,
  stepId,
}: ResolvedStep & { stepDefinition: Exclude<Step, InfoScreen | Story> }) {
  const { back, state, next, flow } = useContext(onboardingFlowContext);
  const { questionTransitionTime } = useContext(globalContext);
  const [fillingTickerCursor, setFillingTickerCursor] = useState<{
    cursor: Cursor;
    shouldAdvance: boolean;
  } | null>(null);
  const [fullFeedback, setFullfeedback] = useState<FullFeedbackModel | null>(
    null
  );
  const setTimeout = useAutoCanceledTimeout();

  const isFilling =
    fillingTickerCursor != null &&
    areCursorsEqual(fillingTickerCursor.cursor, state.cursor);
  if (fullFeedback != null) {
    return (
      <FullFeedback
        feedback={fullFeedback}
        onNext={() => {
          setFullfeedback(null);
          next();
        }}
      />
    );
  }

  const previousStepCursor = gotoPreviousStep(state.cursor, flow);
  const previousStepDef =
    previousStepCursor != null && resolveStep(flow, previousStepCursor);
  const shouldShowBackButton =
    state.cursor.currentStepIndex > 0 &&
    previousStepDef &&
    isQuizStep(previousStepDef.stepDefinition);

  return (
    <ScrollablePageLayoutContainer>
      <ScrollablePageContentFrame background={Greys.White}>
        <AppHeader
          withBackButton={shouldShowBackButton}
          onClickBack={() => {
            setFillingTickerCursor(null);
            back();
          }}
        >
          {sectionTitle}
        </AppHeader>
        <QuestionnaireTicker
          key={
            // We need to kill all transitions in the ticker
            // when the section changes.
            state.cursor.currentSectionIndex
          }
          groupLengths={tickerSubsectionLengths}
          stepIndex={tickerStepIndex}
          fillingGroupIndex={state.cursor.currentSubsectionIndex}
          isFilling={isFilling}
          onDidFill={() => {
            if (fillingTickerCursor?.shouldAdvance) {
              next();
            }
          }}
        />
        <StepRouter
          stepDefinition={stepDefinition}
          stepId={stepId}
          onDidRespond={(shouldAdvance) => {
            setFillingTickerCursor({
              cursor: state.cursor,
              shouldAdvance: shouldAdvance === true,
            });
            if (typeof shouldAdvance === "object") {
              setTimeout(
                () => setFullfeedback(shouldAdvance.fullFeedback),
                questionTransitionTime
              );
            }
          }}
        />
      </ScrollablePageContentFrame>
    </ScrollablePageLayoutContainer>
  );
}
