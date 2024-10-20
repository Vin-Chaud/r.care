"use client";
import { RCareBrand } from "@/components/icons/RCareBrand";
import { BackButton } from "@/components/OnboardingFlow/BackButton";
import { Fonts, Greys } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import {
  Cursor,
  ResolvedStep,
  areCursorsEqual,
} from "@/models/OnboardingFlow/methods";
import {
  FullFeedback as FullFeedbackModel,
  InfoScreen,
  Step,
  Story,
} from "@/models/OnboardingFlow/model";
import { useContext, useState } from "react";
import styled from "styled-components";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { QuestionnaireTicker } from "./QuestionnaireTicker";
import { StepRouter } from "./StepRouter";
import { FullFeedback } from "@/components/OnboardingFlow/FullFeedback";
import { useAutoCanceledTimeout } from "@/hooks/useAutoCanceledTimeout";
import { globalContext } from "@/context/GlobalContext";

export function StepWithTicker({
  stepDefinition,
  sectionTitle,
  tickerSubsectionLengths,
  tickerStepIndex,
  stepId,
}: ResolvedStep & { stepDefinition: Exclude<Step, InfoScreen | Story> }) {
  const { back, state, next } = useContext(onboardingFlowContext);
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

  return (
    <PageLayout background={Greys.White}>
      <TickerHeader>
        <BackButton onClick={back} />
        {typeof sectionTitle === "string" ? (
          <ProfileHeader>{sectionTitle}</ProfileHeader>
        ) : (
          <RCareBrand height={14} />
        )}
      </TickerHeader>
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
            setFillingTickerCursor(null);
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
    </PageLayout>
  );
}

const TickerHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-block: 20px;
  box-sizing: border-box;
  position: relative;
`;

const ProfileHeader = styled.h1`
  ${Fonts.SFPro}
  font-size:14px;
  font-weight: 500;
  color: ${Greys.Grey96};
  flex-grow: 1;
  text-align: center;
`;
