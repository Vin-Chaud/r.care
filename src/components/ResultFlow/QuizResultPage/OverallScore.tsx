import { Fonts, Greys, Purples } from "@/design_components/design_system";
import {
  getScoreZone,
  ScoreZone,
  ScoreZoneCutoffs,
} from "@/models/OnboardingFlow/methods";
import styled from "styled-components";
import { scoreZoneCopy } from "./copy";
import { FeedbackBox } from "./FeedbackBox";
import { computeScoreColor, ScoreGradientStops } from "./scoreColorEncoding";
import { SectionLayout } from "@/components/ResultFlow/QuizResultPage/Common";

export function OverallScore({
  totalPercentageScore,
}: {
  totalPercentageScore: number;
}) {
  const scoreZone = getScoreZone(totalPercentageScore);
  return (
    <SectionLayout>
      <header>
        <ResultHeader>
          {"Your binge eating score is "}
          <br />
          <strong>{scoreZoneCopy[scoreZone]}</strong>
        </ResultHeader>
      </header>
      <OverallScoreWheel totalPercentageScore={totalPercentageScore} />
      <ScoreZoneGuides percentageScore={totalPercentageScore} />
      <HelpText>
        {
          "The questions are based on the ‘Binge Eating Scale’ rating scale developed by Gormally et al. in 1982  and should only be used as an indicator of whether you may be at risk of having or developing a binge eating disorder. They are not intended to replace a professional diagnosis."
        }
      </HelpText>
      <FeedbackBox title={"🧐 What does this mean?"}>
        {scoreZoneInterpretationCopy[scoreZone]}
      </FeedbackBox>
    </SectionLayout>
  );
}

const wheelDiameter = 200;
const wheelThickness = 50;

function OverallScoreWheel({
  totalPercentageScore,
}: {
  totalPercentageScore: number;
}) {
  return (
    <WheelContainer>
      <WheelGradient
        style={{
          position: "relative",
          width: wheelDiameter,
          height: wheelDiameter,
          background: `conic-gradient(from -0.25turn, ${ScoreGradientStops.map(
            (stop) => `${stop.color} ${stop.at * 0.5 /*half circle*/}%`
          ).join(", ")})`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
        }}
      >
        <WheelPercentageMask totalPercentageScore={totalPercentageScore} />
        <WheelDonutHole>
          <PercentageText>{totalPercentageScore + "%"}</PercentageText>
        </WheelDonutHole>
      </WheelGradient>
    </WheelContainer>
  );
}

function ScoreZoneGuides({ percentageScore }: { percentageScore: number }) {
  return (
    <ScoreZoneGuide>
      <ScoreZoneGuideItem
        title={scoreZoneCopy.Low}
        range={`0 - ${ScoreZoneCutoffs.Low}%`}
        bulletColor={computeScoreColor(percentageScore)}
        isHighlighted={percentageScore <= ScoreZoneCutoffs.Low}
      />
      <ScoreZoneGuideItem
        title={scoreZoneCopy.Medium}
        range={`${ScoreZoneCutoffs.Low} - ${ScoreZoneCutoffs.Medium}%`}
        bulletColor={computeScoreColor(percentageScore)}
        isHighlighted={
          percentageScore > ScoreZoneCutoffs.Low &&
          percentageScore <= ScoreZoneCutoffs.Medium
        }
      />
      <ScoreZoneGuideItem
        title={scoreZoneCopy.High}
        range={`${ScoreZoneCutoffs.Medium} - ${ScoreZoneCutoffs.High}%`}
        bulletColor={computeScoreColor(percentageScore)}
        isHighlighted={
          percentageScore > ScoreZoneCutoffs.Medium &&
          percentageScore <= ScoreZoneCutoffs.High
        }
      />
      <ScoreZoneGuideItem
        title={scoreZoneCopy.VeryHigh}
        range={`${ScoreZoneCutoffs.High} - 100%`}
        bulletColor={computeScoreColor(percentageScore)}
        isHighlighted={percentageScore > ScoreZoneCutoffs.High}
      />
    </ScoreZoneGuide>
  );
}

function ScoreZoneGuideItem({
  bulletColor,
  title,
  range,
  isHighlighted,
}: {
  bulletColor: string;
  title: string;
  range: string;
  isHighlighted: boolean;
}) {
  return (
    <ScoreZoneGuideItemLayout
      bulletColor={bulletColor}
      isHighlighted={isHighlighted}
    >
      <span style={{ color: bulletColor }}>•</span>
      <strong>{title}</strong>
      <span>{range}</span>
    </ScoreZoneGuideItemLayout>
  );
}

const scoreZoneInterpretationCopy: Readonly<Record<ScoreZone, string>> = {
  Low: "Your score is low, suggesting that you do not seem to be reporting common symptoms of a binge eating disorder. If you have completed this quiz because you feel out of control with food or have concerns about your eating habits, the program can be still helpful.",
  Medium:
    "Your score is medium, suggesting that you may be experiencing some symptoms of a binge eating disorder. If you have completed this quiz because you feel out of control with food or have concerns about your eating habits, the program can be helpful.",
  High: "Your score is high, suggesting that you may be experiencing many symptoms of a binge eating disorder. If you have completed this quiz because you feel out of control with food or have concerns about your eating habits, the program can be helpful.",
  VeryHigh:
    "Your score is very high, suggesting that severe binge eating disorder symptoms may be impacting your daily life.",
};

const ResultHeader = styled.h2`
  ${Fonts.SFPro};
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 30px;
  text-align: center;
  line-height: 2em;

  strong {
    font-size: 24px;
    font-weight: 600;
  }
`;

const WheelContainer = styled.div`
  width: ${wheelDiameter}px;
  height: ${wheelDiameter * 0.5}px;
  overflow: hidden;
`;

const WheelGradient = styled.div`
  width: ${wheelDiameter}px;
  height: ${wheelDiameter}px;
  background: conic-gradient(
    from -0.25turn,
    ${ScoreGradientStops.map(
      (stop) => `${stop.color} ${stop.at * 0.5 /*half circle*/}%`
    ).join(", ")}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);
`;

const WheelPercentageMask = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "totalPercentageScore",
})<{ totalPercentageScore: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: conic-gradient(
    from -0.25turn,
    rgba(255, 255, 255, 0) 0% 50%,
    white 50%
  );
  transform: rotate(
    ${(props) => -((100 - props.totalPercentageScore) * 180) / 100}deg
  );

  animation: pan 1s ease-in-out forwards;
  @keyframes pan {
    0% {
      transform: rotate(-180deg);
    }
    100% {
      transform: rotate(
        ${(props) => -((100 - props.totalPercentageScore) * 180) / 100}deg
      );
    }
  }
`;

const WheelDonutHole = styled.div`
  width: ${wheelDiameter - wheelThickness}px;
  height: ${wheelDiameter - wheelThickness}px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const PercentageText = styled.output`
  ${Fonts.SFPro};

  font-weight: 600;
  font-size: 35px;
  position: relative;
  top: 20%;
`;

const HelpText = styled.p`
  ${Fonts.SFPro};
  font-size: 8px;
  font-weight: 400;
  text-align: left;
  width: 250px;
  color: ${Greys.Grey7E};
  margin-block: 25px;
`;

const ScoreZoneGuide = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px;
  padding: 0px;
`;

const ScoreZoneGuideItemLayout = styled.li.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "bulletColor" && prop !== "isHighlighted",
})<{ bulletColor: string; isHighlighted: boolean }>`
  list-style: none;

  background-color: ${(props) =>
    props.isHighlighted ? Purples.PurpleF5_Undocumented : "transparent"};
  border-radius: 10px;

  ${Fonts.SFPro};
  font-size: 9px;
  line-height: 10px;
  font-weight: 400;
  padding: 7px;
  padding-block: 4px;

  strong {
    margin-inline: 0.5em;
    font-weight: 600;
  }
`;
