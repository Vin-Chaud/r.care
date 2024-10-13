import { globalContext } from "@/context/GlobalContext";
import {
  Story,
  StoryPane as StoryPaneModel,
} from "@/models/OnboardingFlow/model";
import { useContext, useRef, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { RichText } from "./RichText";
import { useAutoCanceledTimeout } from "@/hooks/useAutoCanceledTimeout";
import {
  TransitionState,
  useWatchedTransition,
} from "@/hooks/useWatchedTransition";

export function StoryStep({ stepDefinition }: { stepDefinition: Story }) {
  const { next } = useContext(onboardingFlowContext);
  const [paneIndex, setPaneIndex] = useState(0);
  const { storyTransitionDelayTime } = useContext(globalContext);

  const setTimeout = useAutoCanceledTimeout();
  return (
    <div style={{ marginTop: "20px" }}>
      <StoryTicker
        length={stepDefinition.panes.length}
        paneIndex={paneIndex}
        onNext={() => {
          if (paneIndex === stepDefinition.panes.length - 1) {
            setTimeout(next, storyTransitionDelayTime);
          } else {
            setPaneIndex(paneIndex + 1);
          }
        }}
      />
      <StoryPane {...stepDefinition.panes[paneIndex]} />
    </div>
  );
}

export function StoryPane({ title, body, graphic_id }: StoryPaneModel) {
  return (
    <div>
      <RichText tag="h1">{title}</RichText>
      <RichText>{body}</RichText>
      <pre>Placeholder for image {graphic_id}</pre>
    </div>
  );
}

export function StoryTicker({
  length,
  paneIndex,
  onNext,
}: {
  length: number;
  paneIndex: number;
  onNext?: () => void;
}) {
  return (
    <div style={{ position: "relative", height: "10px" }}>
      {"Pane " + paneIndex}
      {new Array(length).fill(0).map((_, barIndex) => (
        <StoryTickerBar
          key={barIndex}
          fillTransitionState={
            barIndex < paneIndex
              ? "after"
              : barIndex === paneIndex
              ? "progress"
              : "before"
          }
          index={barIndex}
          count={length}
          onDidFill={barIndex === paneIndex ? onNext : void 0}
        />
      ))}
    </div>
  );
}

function StoryTickerBar({
  index,
  count,
  fillTransitionState,
  onDidFill,
}: {
  index: number;
  count: number;
  fillTransitionState: TransitionState;
  onDidFill?: () => void;
}) {
  const { storyTransitionTime, storyTransitionDelayTime } =
    useContext(globalContext);

  const fillBarRef = useRef<HTMLDivElement>(null);
  const isFilled = useWatchedTransition(
    fillTransitionState,
    () => {
      if (!fillBarRef.current) {
        return false;
      }

      const fullBar = fillBarRef.current.parentElement!;
      const fullWidth = getComputedStyle(fullBar).width;
      const fillWidth = getComputedStyle(fillBarRef.current).width;

      return fillWidth === fullWidth;
    },
    () => onDidFill?.()
  );

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: `calc(${100 / count}%)`,
        left: `calc(${(index / count) * 100}%)`,
        backgroundColor: "lightblue",
        color: "red",
      }}
    >
      <div
        ref={fillBarRef}
        style={{
          position: "absolute",
          height: "100%",
          width: isFilled ? "100%" : "0%",
          backgroundColor: "blue",
          transition: `width ${storyTransitionTime}ms`,
          transitionDelay: `${storyTransitionDelayTime}ms`,
          border: "1px solid black",
        }}
      />
    </div>
  );
}
