import { Symptom } from "@/models/Metric";
import { symptomCopy, symptomEmojis, SymptomOrdering } from "./copy";
import { computeScoreColor, ScoreGradientStops } from "./scoreColorEncoding";
import styled from "styled-components";
import { Fonts, Greys } from "@/design_components/design_system";

export function SymptomScoreBreakdown({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Symptom, number>>;
}) {
  return (
    <SectionLayout>
      <header>
        <ResultHeader>{"How your score is calculated"}</ResultHeader>
        <ResultSubHeader>
          {
            "Your symptoms fall into 3 main categories that impact different aspects of your life."
          }
        </ResultSubHeader>
      </header>
      <BreakdownList>
        {SymptomOrdering.map((metric) => (
          <ScoreBreakdownBar
            key={metric}
            title={symptomEmojis[metric] + " " + symptomCopy[metric]}
            percentageScore={percentageScores[metric]}
          />
        ))}
      </BreakdownList>
    </SectionLayout>
  );
}
function ScoreBreakdownBar({
  title,
  percentageScore,
}: {
  title: string;
  percentageScore: number;
}) {
  return (
    <li style={{ position: "relative" }}>
      <BreakdownBarTitle>{title}</BreakdownBarTitle>
      <BreakdownBar />
      <BreakdownTooltip
        backgroundColor={computeScoreColor(percentageScore)}
        style={{
          left: `${percentageScore}%`,
        }}
      >
        {percentageScore.toFixed(0) + "%"}
      </BreakdownTooltip>
    </li>
  );
}

const SectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const ResultHeader = styled.h2`
  ${Fonts.SFPro};
  font-weight: 600;
  font-size: 19px;
  margin-bottom: 15px;
  text-align: left;
`;

const ResultSubHeader = styled.p`
  ${Fonts.SFPro};
  font-weight: 400;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 25px;
  text-align: left;
  color: ${Greys.Grey83};
`;

const BreakdownList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const BreakdownBarTitle = styled.p`
  ${Fonts.Montserrat}
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const BreakdownBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 10px;
  background: linear-gradient(
    to right,
    ${ScoreGradientStops.map((stop) => `${stop.color} ${stop.at}%`).join(", ")}
  );
`;

const BreakdownTooltip = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<{ backgroundColor: string }>`
  position: relative;
  color: white;
  transform: translateX(-50%);
  margin-block-start: 8px;
  width: fit-content;
  padding: 7px 12px;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};

  ${Fonts.Montserrat}
  font-weight: 700;
  font-size: 14px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 10px;
    height: 8.66px;
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    background-color: ${(props) => props.backgroundColor};
    transform: translate(-50%, -80%);
  }
`;
