"use client";

import { AppHeader } from "@/components/AppHeader";
import { Testimonial } from "@/components/Testimonial";
import { usePopupHostPortal } from "@/components/WithPopupHost/index";
import { globalContext } from "@/context/GlobalContext";
import { buttonStyle } from "@/design_components/button";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import { Disclaimer } from "@/design_components/typography";
import { useAutoCanceledTimeout } from "@/hooks/useAutoCanceledTimeout";
import { useWatchedTransition } from "@/hooks/useWatchedTransition";
import { OnboardingFlow, YesNoQuestion } from "@/models/OnboardingFlow/model";
import { withOpacity } from "@/utils/color";
import { fadeIn } from "@/utils/style_partials";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const analysisTransitionTexts: readonly string[] = [
  "Analyzing your online dating potential...",
  "Analyzing your dating patterns...",
  "Analyzing your demographic profile...",
  "Creating your personalized plan...",
];

export function AnalysisTransition({
  onDone,
  onPopupQuizDidAnswer,
  spec,
}: {
  onDone?: () => void;
  onPopupQuizDidAnswer: (response: boolean) => void;
  spec: OnboardingFlow;
}) {
  const setTimeout = useAutoCanceledTimeout();
  const [currentFillIndex, setCurrentFillIndex] = useState(0);
  const [isShowingQuiz, setShowingQuiz] = useState(false);
  const isAnimationCompleteRef = useRef(false);
  const isQuizAnsweredRef = useRef(false);
  const { quizDelayTime, analysisFinalDelayTime } = useContext(globalContext);

  useEffect(() => {
    setTimeout(() => setShowingQuiz(true), quizDelayTime);
  }, []);

  const modalPortalTarget = usePopupHostPortal();

  const tryAdvance = () => {
    if (isAnimationCompleteRef.current && isQuizAnsweredRef.current) {
      setTimeout(() => {
        onDone?.();
      }, analysisFinalDelayTime);
    }
  };

  return (
    <PageLayout background={Greys.White}>
      <AppHeader>{{ branding: true }}</AppHeader>
      <Header>{"Analyzing your results..."}</Header>
      <ProgressList>
        {analysisTransitionTexts.map((itemText, itemIndex, itemArray) => (
          <AnalysisTransitionItem
            key={itemIndex}
            isFilling={currentFillIndex >= itemIndex}
            onDidFill={() => {
              if (itemIndex === itemArray.length - 1) {
                isAnimationCompleteRef.current = true;
                tryAdvance();
              } else {
                setCurrentFillIndex(itemIndex + 1);
              }
            }}
          >
            {itemText}
          </AnalysisTransitionItem>
        ))}
      </ProgressList>
      {modalPortalTarget &&
        isShowingQuiz &&
        createPortal(
          <PopupBackground>
            <PopupModal>
              <PopupQuiz
                quiz={spec.popup_quiz_step}
                onDidAnswer={(response) => {
                  isQuizAnsweredRef.current = true;
                  setShowingQuiz(false);
                  onPopupQuizDidAnswer(response);
                  tryAdvance();
                }}
              />
            </PopupModal>
          </PopupBackground>,
          modalPortalTarget
        )}
    </PageLayout>
  );
}

function PopupQuiz({
  quiz,
  onDidAnswer,
}: {
  quiz: YesNoQuestion;
  onDidAnswer: (response: boolean) => void;
}) {
  return (
    <PopupQuizScreen
      questionText={quiz.title}
      yesText={"Yes"}
      noText={"No"}
      onDidAnswer={onDidAnswer}
    />
  );
}

function PopupQuizScreen({
  questionText,
  yesText,
  noText,
  onDidAnswer,
}: {
  questionText: string;
  yesText: string;
  noText: string;
  onDidAnswer: (response: boolean) => void;
}): ReactNode {
  const [response, setResponse] = useState<boolean | null>(null);
  const { quizAfterDelayTime } = useContext(globalContext);
  const setTimeout = useAutoCanceledTimeout();
  const answer = (response: boolean) => {
    setResponse(response);
    setTimeout(() => onDidAnswer(response), quizAfterDelayTime);
  };
  return (
    <div>
      <PopupQuizTitle>{questionText}</PopupQuizTitle>
      <PopupQuizButton
        type="button"
        onClick={() => answer(true)}
        disabled={response != null}
        isSelected={response === true}
      >
        {yesText}
      </PopupQuizButton>
      <PopupQuizButton
        type="button"
        onClick={() => answer(false)}
        disabled={response != null}
        isSelected={response === false}
      >
        {noText}
      </PopupQuizButton>
    </div>
  );
}

function AnalysisTransitionItem({
  children,
  isFilling,
  onDidFill,
}: {
  children: ReactNode;
  isFilling: boolean;
  onDidFill: () => void;
}) {
  const { analysisTransitionTime, analysisTransitionDelayTime } =
    useContext(globalContext);

  const [percentage, setDisplayPercentage] = useState(0);
  const fillBarRef = useRef<HTMLDivElement>(null);
  const shouldTransitionToFilled = useWatchedTransition(
    isFilling ? "progress" : "before",
    () => {
      if (!fillBarRef.current) {
        return false;
      }

      const fullBar = fillBarRef.current.parentElement!;
      const fullWidth = getComputedStyle(fullBar).width;
      const fillWidth = getComputedStyle(fillBarRef.current).width;
      const percentage = (parseInt(fillWidth) / parseInt(fullWidth)) * 100;
      setDisplayPercentage(percentage);

      return fillWidth === fullWidth;
    },
    () => onDidFill?.()
  );

  const percentageText = percentage.toFixed(0) + "%";
  const isOneHundredPrecent = percentage === 100;

  return (
    <ProgressListItem>
      <ProgressLabel>
        {children}
        <PercentageLabel isFull={isOneHundredPrecent}>
          {percentageText}
        </PercentageLabel>
      </ProgressLabel>
      <ProgressBarBack>
        <ProgressBarFill
          ref={fillBarRef}
          style={{
            width: shouldTransitionToFilled ? "100%" : "0%",
            transition: `width ${analysisTransitionTime}ms`,
            transitionDelay: `${analysisTransitionDelayTime}ms`,
          }}
        />
      </ProgressBarBack>
    </ProgressListItem>
  );
}

const Header = styled.h2`
  ${Fonts.SFPro}
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-top: 40px;
  text-align: left;
  width: 100%;
`;

const ProgressList = styled.ul`
  padding: 0;
  flex-grow: 1;
  width: 100%;
`;

const ProgressListItem = styled.li`
  list-style: none;
  margin-bottom: 32px;
`;

const ProgressLabel = styled.p`
  ${Fonts.SFPro}
  font-size: 14px;
  font-weight: 400;
  color: ${Greys.Black};
  margin-block: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PercentageLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isFull",
})<{ isFull: boolean }>`
  font-weight: ${(props) => (props.isFull ? "700" : void 0)};
  color: ${(props) => (props.isFull ? Purples.Purple94 : Greys.Black)};
  transition: color 0.3s;
`;

const ProgressBarBack = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: ${Greys.GreyF1};
  clip-path: inset(0 0 0 0 round 10px);
`;

const ProgressBarFill = styled.div`
  position: absolute;
  height: 100%;
  width: 0%;
  background-color: ${Purples.Purple94};
`;

const PopupBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${withOpacity(Greys.GreyD9, 0.8)};
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  ${fadeIn}
`;

const PopupModal = styled.div`
  background-color: white;
  border: none;
  width: 320px;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 30px;
`;

const PopupQuizTitle = styled.h2`
  ${Fonts.SFPro}
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  color: ${Greys.Grey4D};
  margin-bottom: 24px;
`;

const PopupQuizButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  ${(props) => buttonStyle(props)}
  margin-bottom: 12px;
`;
