"use client";

import { globalContext } from "@/context/GlobalContext";
import { useContext, useRef } from "react";
import { useWatchedTransition } from "@/hooks/useWatchedTransition";

export function QuestionnaireTicker({
  subsectionLengths,
  stepIndex,
  subsectionIndex: cursorSubsectionIndex,
  isFilling,
  onDidFill,
}: {
  subsectionLengths: readonly number[];
  subsectionIndex: number;
  stepIndex: number;
  isFilling: boolean;
  onDidFill?: () => void;
}) {
  const sumLengths = subsectionLengths.reduce((a, b) => a + b, 0);
  return (
    <div style={{ position: "relative", height: "10px" }}>
      {subsectionLengths.map((subsectionLength, subsectionIndex) => {
        const sumLengthsBefore = subsectionLengths
          .slice(0, subsectionIndex)
          .reduce((a, b) => a + b, 0);
        if (subsectionIndex !== cursorSubsectionIndex) {
          return (
            <div
              key={subsectionIndex}
              style={{
                position: "absolute",
                left: `${(sumLengthsBefore / sumLengths) * 100}%`,
                width: `${(subsectionLength / sumLengths) * 100}%`,
                backgroundColor:
                  subsectionIndex < cursorSubsectionIndex
                    ? "blue"
                    : "lightblue",
                height: "100%",
              }}
            />
          );
        } else {
          return (
            <FillingQuestionnaireTickerBar
              key={subsectionIndex}
              isFilling={isFilling}
              left={`${(sumLengthsBefore / sumLengths) * 100}%`}
              fullWidth={`${(subsectionLength / sumLengths) * 100}%`}
              unfilledWidth={`${(stepIndex / sumLengths) * 100}%`}
              filledWidth={`${((stepIndex + 1) / sumLengths) * 100}%`}
              onDidFill={onDidFill}
            />
          );
        }
      })}
    </div>
  );
}

function FillingQuestionnaireTickerBar({
  isFilling,
  left,
  unfilledWidth,
  filledWidth,
  fullWidth,
  onDidFill,
}: {
  isFilling: boolean;
  left: string;
  unfilledWidth: string;
  filledWidth: string;
  fullWidth: string;
  onDidFill?: () => void;
}) {
  const { questionTransitionTime } = useContext(globalContext);
  const fillBarRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  const isFilled = useWatchedTransition(
    isFilling ? "progress" : "before",
    () => {
      if (!fillBarRef.current || !rulerRef.current) {
        return false;
      }

      const fullWidth = getComputedStyle(rulerRef.current).width;
      const fillWidth = getComputedStyle(fillBarRef.current).width;
      return fillWidth === fullWidth;
    },
    () => onDidFill?.()
  );

  return (
    <div
      style={{
        position: "absolute",
        left,
        width: fullWidth,
        backgroundColor: "lightblue",
        height: "100%",
      }}
    >
      <div
        ref={fillBarRef}
        style={{
          position: "absolute",
          width: isFilled ? filledWidth : unfilledWidth,
          transition: `width ${questionTransitionTime}ms`,
          backgroundColor: "blue",
          height: "100%",
        }}
      />
      <div
        ref={rulerRef}
        style={{
          position: "absolute",
          width: filledWidth,
          backgroundColor: "transparent",
          height: "100%",
        }}
      />
    </div>
  );
}
