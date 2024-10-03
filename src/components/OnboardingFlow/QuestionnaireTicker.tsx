"use client";

import { globalContext } from "@/context/GlobalContext";
import { Fragment, useContext } from "react";

export function QuestionnaireTicker({
  subsectionLengths,
  stepIndex,
  subsectionIndex: cursorSubsectionIndex,
}: {
  subsectionLengths: readonly number[];
  subsectionIndex: number;
  stepIndex: number;
}) {
  const waitTime = useContext(globalContext).questionTransitionTime;
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
          // We let the ticker advance a little faster than the question
          // transition time because, in the case where the next screen is a
          // story screen, the ticker won't be there, and so it would be nice
          // if the ticker fills properly before the next screen appears.
          // It's also a technical hack -- screens advance using setTimeout()
          // which may not be perfectly in sync with the CSS transition.
          const transitionTime = waitTime * 0.9;
          return (
            <Fragment key={subsectionIndex}>
              <div
                style={{
                  position: "absolute",
                  left: `${(sumLengthsBefore / sumLengths) * 100}%`,
                  width: `${(subsectionLength / sumLengths) * 100}%`,
                  backgroundColor: "lightblue",
                  height: "100%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: `${(sumLengthsBefore / sumLengths) * 100}%`,
                  width: `${(stepIndex / sumLengths) * 100}%`,
                  transition: `width ${transitionTime}ms`,
                  backgroundColor: "blue",
                  height: "100%",
                }}
              />
            </Fragment>
          );
        }
      })}
    </div>
  );
}
