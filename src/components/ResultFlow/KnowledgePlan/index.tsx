import { MarkdownText } from "@/components/MarkdownText";
import { Experience } from "@/models/Metric";
import { computePercentageScores } from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { Fragment } from "react";

export function KnowledgePlan({
  responses,
  flow,
  onNext,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
  onNext: () => void;
}) {
  const scores = computePercentageScores(flow, responses);
  return (
    <div>
      <section>
        <header>
          <MarkdownText tag="h2">
            {"**Improve your mindful eating skillset** and make real changes"}
          </MarkdownText>
        </header>
      </section>
      <KnowledgeChart
        knowledgePercentageScore={scores[Experience.Knowledge]}
        targetScore={flow.target_knowledge_score}
      />
      <RCareApproach onNext={onNext} />
    </div>
  );
}

function KnowledgeChart({
  knowledgePercentageScore,
  targetScore,
}: {
  knowledgePercentageScore: number;
  targetScore: number;
}) {
  const chartPlottingAreaHeight = 35 * 5;
  const yDomainMax = 100;
  const yDomainMin = 0;

  const yAxisTicks = [0, 20, 40, 60, 80, 100];
  const emojiPosition = 0.05;

  function encodeYValue(percentage: number) {
    return (
      chartPlottingAreaHeight *
      (1 - (percentage - yDomainMin) / (yDomainMax - yDomainMin))
    );
  }

  function encodeXValue(index: number, total: number) {
    // Leave equal space on both sides of the bar, return the percentage
    // coordinate for the bar's x-axis positioning for the center of
    // the bar.
    return ((index + 0.5) / total) * 100;
  }

  const yAxisGrid = yAxisTicks.map((value) => {
    const tickLabel = (value * 0.1).toFixed(0); // Scale 0 - 10
    return (
      <Fragment key={value}>
        <span
          style={{
            position: "absolute",
            top: encodeYValue(value),
            transform: "translate(-100%, -50%)",
          }}
        >
          {tickLabel}
        </span>
        <div
          style={{
            position: "absolute",
            top: encodeYValue(value),
            width: "100%",
            height: 0,
            borderBottom: "1px dashed #838383",
          }}
        ></div>
      </Fragment>
    );
  });

  // In case the quiz score somehow overshoots the target score, never present
  // the target score as less than the quiz score
  if (targetScore < knowledgePercentageScore) {
    targetScore = Math.max(
      knowledgePercentageScore,
      (knowledgePercentageScore + 100) / 2
    );
  }

  const bars = [
    {
      label: "Now",
      barColor: "#DCDCDC",
      value: knowledgePercentageScore,
      tooltip: `${knowledgePercentageScore.toFixed(0)}%`,
      tooltipColor: "#888888",
    },
    {
      label: "In 12 weeks",
      barColor: "#F5EAF8",
      value: targetScore,
      tooltip: `${targetScore.toFixed(0)}%`,
      tooltipColor: "#945DD9",
    },
  ].map(
    (
      { label, barColor, value, tooltip, tooltipColor },
      itemIndex,
      itemArray
    ) => {
      const height = encodeYValue(0) - encodeYValue(value);
      return (
        <Fragment key={itemIndex}>
          <div
            style={{
              position: "absolute",
              height,
              bottom: 0,
              width: `calc(${100 / (itemArray.length + 1)}%)`,
              left: `${encodeXValue(itemIndex, itemArray.length)}%`,
              backgroundColor: barColor,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <div
              style={{
                background: tooltipColor,
                position: "absolute",
                top: -10,
                transform: `translateY(-100%)`,
              }}
            >
              {tooltip}
            </div>
            <div style={{ position: "absolute", top: "100%", marginTop: 5 }}>
              {label}
            </div>
          </div>
        </Fragment>
      );
    }
  );

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          position: "relative",
          height: chartPlottingAreaHeight,
        }}
      >
        {yAxisGrid}
        {bars}
      </div>
    </div>
  );
}

function RCareApproach({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <header>
        <h2>
          {"R.care Approach:"}
          <br />
          <strong>{"DBT, AAT, CBT"}</strong>
        </h2>
      </header>
      <ul>
        <MarkdownText tag="li">
          {"practice tuning into your **stomach signal**"}
        </MarkdownText>
        <MarkdownText tag="li">
          {
            "improve understanding your **emotional triggers and self-regulation**"
          }
        </MarkdownText>
        <MarkdownText tag="li">
          {"**find coping strategy that works**"}
        </MarkdownText>
      </ul>
      <button onClick={onNext}>{"Continue"}</button>
    </section>
  );
}
