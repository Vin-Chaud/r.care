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
          {"How can successful online dating improve your life?"}
        </SectionHeader>
      </header>
      <ImpactChart percentageScores={percentageScores} />
      <FeedbackBox>
        {
          "Building meaningful connections can boost your overall well-being. We can help you improve your online dating experience and create a happier, more fulfilling life."
        }
      </FeedbackBox>
    </SectionLayout>
  );
}

function ImpactChart({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Impact, number>>;
}) {
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
        <YAxisLabel style={{ top: encodeYValue(value) }}>
          {tickLabel}
        </YAxisLabel>
        <YAxisGrid style={{ top: encodeYValue(value) }} />
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

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  padding-left: 40px;
  box-sizing: border-box;
  width: 100%;
`;

const chartPlottingAreaHeight = 35 * 5;

const ChartPlottingArea = styled.div`
  position: relative;
  height: ${chartPlottingAreaHeight}px;
  width: 100%;
`;

const YAxisGrid = styled.div`
  position: absolute;
  width: 100%;
  height: 0px;
  border-bottom: 1px dashed ${Greys.Grey83};
`;

const YAxisLabel = styled.span`
  position: absolute;
  transform: translate(-100%, -50%);
  ${Fonts.SFPro}
  left: -20px;
  font-size: 14px;
  font-weight: 400;
  color: ${Greys.Grey83};
`;

const XAxisLabel = styled.span`
  position: absolute;
  top: 100%;
  margin-top: 5px;

  ${Fonts.Montserrat}
  font-size: 12px;
  font-weight: 600;
  color: ${Greys.Black};
  text-align: center;
  width: 150%;
`;

const Tooltip = styled.div`
  position: absolute;
  top: 0px;
  color: white;
  top: -20px;
  transform: translateY(-100%);
  width: fit-content;
  padding: 7px 12px;
  border-radius: 10px;
  background-color: ${Purples.Purple94};
  text-align: center;

  ${Fonts.Montserrat}
  font-weight: 400;
  font-size: 10px;

  strong {
    font-weight: 700;
    font-size: 11px;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 100%;
    left: 50%;
    width: 10px;
    height: 8.66px;
    clip-path: polygon(50% 100%, 100% 0%, 0% 0%);
    background-color: ${Purples.Purple94};
    transform: translate(-50%, -20%);
  }
`;
