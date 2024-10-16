import { MarkdownText } from "@/design_components/typography/MarkdownText";
import { Impact } from "@/models/Metric";
import { getScoreZone, ScoreZone } from "@/models/OnboardingFlow/methods";
import { Fragment } from "react";
import { impactCopy, impactEmojis, scoreZoneCopy } from "./copy";
import { FeedbackBox } from "./FeedbackBox";

export function ImpactBreakdown({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Impact, number>>;
}) {
  return (
    <section>
      <header>
        <MarkdownText tag="h2">
          {"How are binge eating symptoms **impacting your daily life?**"}
        </MarkdownText>
      </header>
      <ImpactChart percentageScores={percentageScores} />
      <FeedbackBox>
        {
          "Curbing your binge eating behavior can improve every aspect of your well-being. We can help you stop binge eating and lead a happy and fulfilled life."
        }
      </FeedbackBox>
    </section>
  );
}

function ImpactChart({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Impact, number>>;
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

  const bars = [
    { metric: Impact.MentalHealth, color: "#D7E2C9" },
    { metric: Impact.Relationship, color: "#EEE2CE" },
    { metric: Impact.Productivity, color: "#C8DBE3" },
  ].map(({ metric, color }, itemIndex, itemArray) => {
    const percentageScore = percentageScores[metric];
    const height = encodeYValue(0) - encodeYValue(percentageScore);
    const scoreZone = getScoreZone(percentageScore);
    return (
      <Fragment key={metric}>
        <div
          style={{
            position: "absolute",
            height,
            bottom: 0,
            width: `calc(${100 / (itemArray.length + 1)}%)`,
            left: `${encodeXValue(itemIndex, itemArray.length)}%`,
            backgroundColor: color,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          <span
            style={{ marginBottom: chartPlottingAreaHeight * emojiPosition }}
          >
            {impactEmojis[metric]}
          </span>
          {(scoreZone == ScoreZone.High ||
            scoreZone == ScoreZone.VeryHigh ||
            true) && (
            <div
              style={{
                background: "#945DD9",
                position: "absolute",
                top: -10,
                transform: `translateY(-100%)`,
              }}
            >
              {scoreZoneCopy[scoreZone]}
            </div>
          )}
          <div style={{ position: "absolute", top: "100%", marginTop: 5 }}>
            {impactCopy[metric]}
          </div>
        </div>
      </Fragment>
    );
  });

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
