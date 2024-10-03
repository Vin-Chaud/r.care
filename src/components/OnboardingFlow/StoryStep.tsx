import { globalContext } from "@/context/GlobalContext";
import {
  Story,
  StoryPane as StoryPaneModel,
} from "@/models/OnboardingFlow/model";
import { useContext, useEffect, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { RichText } from "./RichText";

export function StoryStep({ stepDefinition }: { stepDefinition: Story }) {
  const { next } = useContext(onboardingFlowContext);
  const [paneIndex, setPaneIndex] = useState(0);
  const waitTime = useContext(globalContext).storyTransitionTime;

  useEffect(() => {
    setTimeout(() => {
      if (paneIndex === stepDefinition.panes.length - 1) {
        next();
      } else {
        setPaneIndex(paneIndex + 1);
      }
    }, waitTime);
  }, [paneIndex]);

  return (
    <div style={{ marginTop: "20px" }}>
      <StoryTicker length={stepDefinition.panes.length} paneIndex={paneIndex} />
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
}: {
  length: number;
  paneIndex: number;
}) {
  return (
    <div style={{ position: "relative", height: "10px" }}>
      {"Pane " + paneIndex}
      {new Array(length).fill(0).map((_, barIndex) => (
        <StoryTickerBar
          key={barIndex}
          state={
            barIndex < paneIndex
              ? "filled"
              : barIndex === paneIndex
              ? "filling"
              : "empty"
          }
          index={barIndex}
          count={length}
        />
      ))}
    </div>
  );
}

function StoryTickerBar({
  state,
  index,
  count,
}: {
  state: "empty" | "filling" | "filled";
  index: number;
  count: number;
}) {
  // See the comment in QuestionnaireTicker for why we fudge the wait time.
  const waitTime = useContext(globalContext).storyTransitionTime * 0.9;
  const [isFilled, setIsFilled] = useState(state === "filled");
  useEffect(() => {
    if (state === "filling") {
      setIsFilled(true);
    }
  }, [state]);

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
        style={{
          position: "absolute",
          height: "100%",
          width: isFilled ? "100%" : "0%",
          backgroundColor: "blue",
          transition: `width ${waitTime}ms`,
          border: "1px solid black",
        }}
      />
    </div>
  );
}
