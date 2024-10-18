"use client";

import { globalContext } from "@/context/GlobalContext";
import { Greys, Purples } from "@/design_components/design_system";
import {
  TransitionState,
  useWatchedTransition,
} from "@/hooks/useWatchedTransition";
import { Fragment, useContext, useRef } from "react";
import styled from "styled-components";

export function QuestionnaireTicker({
  groupLengths,
  fillingGroupIndex: fillingGroupIndex,
  stepIndex,
  isFilling,
  onDidFill,
}: {
  groupLengths: readonly number[];
  fillingGroupIndex: number;
  stepIndex: number;
  isFilling: boolean;
  onDidFill?: () => void;
}) {
  const sumLengths = groupLengths.reduce((a, b) => a + b, 0);
  return (
    <TickerGutter>
      {groupLengths.map((groupLength, groupIndex) => {
        const sumLengthsBefore = groupLengths
          .slice(0, groupIndex)
          .reduce((a, b) => a + b, 0);

        const bar =
          groupIndex !== fillingGroupIndex ? (
            <StaticSection
              style={{
                left: fillLeft(
                  groupLengths.length,
                  groupIndex,
                  sumLengthsBefore / sumLengths
                ),
                width: fillWidth(
                  groupLengths.length,
                  groupLength / sumLengths,
                  1
                ),
                zIndex: groupLengths.length - groupIndex,
              }}
              isFilled={groupIndex < fillingGroupIndex}
            />
          ) : (
            <FillingSection
              groupCount={groupLengths.length}
              groupIndex={groupIndex}
              groupWeightedLeft={sumLengthsBefore / sumLengths}
              groupRelativeWidth={groupLength / sumLengths}
              unfilledFraction={stepIndex / groupLength}
              filledFraction={(stepIndex + 1) / groupLength}
              fillState={isFilling ? "progress" : "before"}
              onDidFill={onDidFill}
              zIndex={groupLengths.length - groupIndex}
            />
          );

        return (
          <Fragment key={groupIndex}>
            {bar}
            {groupIndex < groupLengths.length - 1 && (
              <Knob
                style={{
                  left: fillLeft(
                    groupLengths.length,
                    groupIndex,
                    (sumLengthsBefore + groupLength) / sumLengths
                  ),
                  transform: `translateX(-100%)`,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </TickerGutter>
  );
}

function FillingSection({
  groupIndex,
  groupCount,
  groupWeightedLeft,
  groupRelativeWidth,
  fillState,
  unfilledFraction,
  filledFraction,
  onDidFill,
  zIndex,
}: {
  groupIndex: number;
  groupCount: number;
  groupWeightedLeft: number;
  groupRelativeWidth: number;
  fillState: TransitionState;
  unfilledFraction: number;
  filledFraction: number;
  onDidFill?: () => void;
  zIndex: number;
}) {
  const { questionTransitionTime } = useContext(globalContext);
  const fillBarRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  const isFilled = useWatchedTransition(
    fillState,
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
    <FillingSectionBack
      style={{
        left: fillLeft(groupCount, groupIndex, groupWeightedLeft),
        width: fillWidth(groupCount, groupRelativeWidth, 1),
        zIndex: zIndex,
      }}
    >
      <FillingSectionFilled
        ref={fillBarRef}
        style={{
          width: isFilled
            ? filledFraction * 100 + "%"
            : unfilledFraction * 100 + "%",
          transition: `width ${questionTransitionTime}ms`,
        }}
      />
      <FillingSectionRuler
        ref={rulerRef}
        style={{ width: filledFraction * 100 + "%" }}
      />
      {/* <FillingSectionBorder /> */}
    </FillingSectionBack>
  );
}

const gutterThickness = 10;
const barThickness = 8;
const knobBorderWidth = 2;

const overlapWidth = `${gutterThickness}px`;

function fillLeft(
  groupCount: number,
  groupIndex: number,
  sectionLeftFraction: number
) {
  const totalOverlappingWidth = computeTotalOverlapWidth(groupCount);
  const sectionLeft = `${sectionLeftFraction} * ${totalOverlappingWidth} - ${overlapWidth} * ${groupIndex}`;
  return `calc(${sectionLeft}`;
}

function computeTotalOverlapWidth(groupCount: number) {
  return `(100% + ${overlapWidth} * ${groupCount - 1})`;
}

function fillWidth(
  groupCount: number,
  sectionWidthFraction: number,
  sectionFillFraction: number
) {
  const totalOverlappingWidth = computeTotalOverlapWidth(groupCount);
  const sectionWidth = `${sectionWidthFraction} * ${totalOverlappingWidth}`;
  return `calc((${sectionWidth}) * ${sectionFillFraction})`;
}

const TickerGutter = styled.div`
  height: ${gutterThickness}px;
  width: 100%;
  position: relative;
`;

const StaticSection = styled.div.withConfig({
  shouldForwardProp: (props) => props !== "isFilled",
})<{
  isFilled: boolean;
}>`
  position: absolute;
  top: ${(gutterThickness - barThickness) * 0.5}px;
  height: ${barThickness}px;
  background-color: ${(props) =>
    props.isFilled ? Purples.Purple94 : Greys.GreyF1};
  clip-path: inset(0 0 0 0 round ${gutterThickness * 0.5}px);
`;

const FillingSectionBack = styled.div`
  position: absolute;
  top: ${(gutterThickness - barThickness) * 0.5}px;
  height: ${barThickness}px;
  background-color: ${Greys.GreyF1};
  border-radius: ${gutterThickness * 0.5}px;
  clip-path: inset(0 0 0 0 round ${gutterThickness * 0.5}px);
`;

const FillingSectionRuler = styled.div`
  position: absolute;
  background-color: transparent;
`;

const FillingSectionFilled = styled.div`
  position: absolute;
  background-color: ${Purples.Purple94};
  height: 100%;
`;

const Knob = styled.div`
  position: absolute;
  width: ${gutterThickness + knobBorderWidth}px;
  height: ${gutterThickness + knobBorderWidth}px;
  top: ${-knobBorderWidth * 0.5}px;
  box-sizing: border-box;
  border: ${knobBorderWidth}px solid ${Greys.White};
  border-radius: 50%;
  z-index: 100;
`;
