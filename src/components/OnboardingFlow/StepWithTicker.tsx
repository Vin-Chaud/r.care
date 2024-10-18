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
import { InfoScreen, Step, Story } from "@/models/OnboardingFlow/model";
import { useContext, useState } from "react";
import styled from "styled-components";
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
  const { back, state, next } = useContext(onboardingFlowContext);
  const [fillingTickerCursor, setFillingTickerCursor] = useState<{
    cursor: Cursor;
    autoNext: boolean;
  } | null>(null);

  const isFilling =
    fillingTickerCursor != null &&
    areCursorsEqual(fillingTickerCursor.cursor, state.cursor);

  return (
    <PageLayout background={Greys.White}>
      <TickerHeader>
        <BackButton onClick={back} />
        {typeof sectionTitle === "string" ? (
          <ProfileHeader>{sectionTitle}</ProfileHeader>
        ) : (
          <RCareBrand />
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
    </PageLayout>
  );
}

const TickerStepLayout = styled.div`
  background-color: ${Greys.White};
  height: 100%;
`;

const TickerStepFrame = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px;
`;

const TickerHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileHeader = styled.h1`
  ${Fonts.SFPro}
  font-size:14px;
  font-weight: 500;
  color: ${Greys.Grey96};
  flex-grow: 1;
  text-align: center;
`;
