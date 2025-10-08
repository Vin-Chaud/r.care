import {
  SectionHeader,
  SectionLayout,
} from "@/components/ResultFlow/QuizResultPage/Common";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { Impact } from "@/models/Metric";
import { getScoreZone, ScoreZone } from "@/models/OnboardingFlow/methods";
import { Fragment } from "react";
import styled from "styled-components";
import { impactCopy, impactEmojis, scoreZoneCopy } from "./copy";
import { FeedbackBox } from "./FeedbackBox";

export function ImpactBreakdown({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Impact, number>>;
}) {
 return (
    <SectionLayout>
      <header>
        <SectionHeader>
          {"How are binge eating symptoms"}
          <br />
          <strong>{"impacting your daily life?"}</strong>
        </SectionHeader>
      </header>
      <ImpactChart percentageScores={percentageScores} />
      <FeedbackBox>
        {
          "Curbing your binge eating behavior can improve every aspect of your well-being. We can help you stop binge eating and lead a happy and fulfilled life."
        }
      </FeedbackBox>
    </SectionLayout>
  );
}

@@ -62,12 +47,6 @@ function ImpactChart({
  const yAxisGrid = yAxisTicks.map((value) => {
    const tickLabel = (value * 0.1).toFixed(0); // Scale 0 - 10
    return (
      <Fragment key={value}>
        <YAxisLabel style={{ top: encodeYValue(value) }}>
          {tickLabel}
        </YAxisLabel>
        <YAxisGrid style={{ top: encodeYValue(value) }} />
      </Fragment>
    );
  });

@@ -80,51 +59,12 @@ function ImpactChart({
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
            <Tooltip>
              <strong>{scoreZoneCopy[scoreZone]}</strong>
              <br />
              {"Impact"}
            </Tooltip>
          )}
          <XAxisLabel>{impactCopy[metric]}</XAxisLabel>
        </div>
      </Fragment>
      
    );
  });

  return (
    <ChartContainer>
      <ChartPlottingArea>
        {yAxisGrid}
        {bars}
      </ChartPlottingArea>
    </ChartContainer>
  
  );
}
