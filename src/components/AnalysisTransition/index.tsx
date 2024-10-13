"use client";

import { usePopupHostPortal } from "@/components/WithPopupHost/index";
import { globalContext } from "@/context/GlobalContext";
import { useAutoCanceledTimeout } from "@/hooks/useAutoCanceledTimeout";
import { useWatchedTransition } from "@/hooks/useWatchedTransition";
import { OnboardingFlow, YesNoQuestion } from "@/models/OnboardingFlow/model";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const analysisTransitionTexts: readonly string[] = [
  "Analyzing your binge eating symptoms...",
  "Analyzing your behavioral patterns...",
  "Analyzing your demographic profile...",
  "Creating your personalized plan...",
];

export function AnalysisTransition({
  onDone,
  spec,
}: {
  onDone?: () => void;
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
    <div>
      <h1>{"Analysing your results..."}</h1>
      <ul>
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
      </ul>
      {modalPortalTarget &&
        isShowingQuiz &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.25)",
              pointerEvents: "all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{ backgroundColor: "white", border: "1px solid black" }}
            >
              <PopupQuiz
                quiz={spec.popup_quiz_step}
                onDidAnswer={(response) => {
                  isQuizAnsweredRef.current = true;
                  if (isAnimationCompleteRef.current) {
                    onDone?.();
                  }
                }}
              />
            </div>
          </div>,
          modalPortalTarget
        )}
    </div>
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
      <h2>{questionText}</h2>
      <button
        type="button"
        style={{ fontWeight: response === true ? "bold" : void 0 }}
        onClick={() => answer(true)}
        disabled={response != null}
      >
        {yesText}
      </button>
      <button
        type="button"
        style={{ fontWeight: response === false ? "bold" : void 0 }}
        onClick={() => answer(false)}
        disabled={response != null}
      >
        {noText}
      </button>
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
    <li>
      <p>{children}</p>
      <span style={{ fontWeight: isOneHundredPrecent ? "bold" : void 0 }}>
        {percentageText}
      </span>
      <div
        style={{
          position: "relative",
          height: "10px",
          width: `100%`,
          backgroundColor: "lightblue",
        }}
      >
        <div
          ref={fillBarRef}
          style={{
            position: "absolute",
            height: "100%",
            width: shouldTransitionToFilled ? "100%" : "0%",
            backgroundColor: "blue",
            transition: `width ${analysisTransitionTime}ms`,
            transitionDelay: `${analysisTransitionDelayTime}ms`,
            border: "1px solid black",
          }}
        />
      </div>
    </li>
  );
}
