import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { CheckboxTick } from "@/components/icons/CheckboxTick";
import { createRichText } from "@/components/OnboardingFlow/RichText";
import { Graphic } from "@/components/ResultFlow/KnowledgePlan/Graphic";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import {
  ScrollablePageContentFrame,
  ScrollablePageLayoutContainer,
} from "@/design_components/PageLayout";
import {
  createMarkdownText,
  MarkdownText,
} from "@/design_components/typography/MarkdownText";
import { Experience } from "@/models/Metric";
import { computePercentageScores } from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { Fragment } from "react";
import styled from "styled-components";

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
    <ScrollablePageLayoutContainer>
      <ScrollablePageContentFrame background={Greys.White}>
        <SectionLayout>
          <AppHeader>{{ branding: true }}</AppHeader>
          <SectionHeader>
            {"**Improve your mindful eating skillset** and make real changes"}
          </SectionHeader>
          <KnowledgeChart
            knowledgePercentageScore={scores[Experience.Knowledge]}
            targetScore={flow.target_knowledge_score}
          />
        </SectionLayout>
      </ScrollablePageContentFrame>
      <ScrollablePageContentFrame>
        <RCareApproach onNext={onNext} />
      </ScrollablePageContentFrame>
    </ScrollablePageLayoutContainer>
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
      barColor: Greys.GreyDC,
      value: knowledgePercentageScore,
      tooltip: `${knowledgePercentageScore.toFixed(0)}%`,
      tooltipColor: Greys.Grey88,
      fontSize: 20,
    },
    {
      label: "In 12 weeks",
      barColor: Purples.PurpleF5_Undocumented,
      value: targetScore,
      tooltip: `${targetScore.toFixed(0)}%`,
      tooltipColor: Purples.Purple94,
      fontSize: 22,
    },
  ].map(
    (
      { label, barColor, value, tooltip, tooltipColor, fontSize },
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
            <Tooltip background={tooltipColor} fontSize={fontSize}>
              {tooltip}
            </Tooltip>
            <XAxisLabel>{label}</XAxisLabel>
          </div>
        </Fragment>
      );
    }
  );

  return (
    <ChartContainer>
      <ChartPlottingArea>
        {yAxisGrid}
        {bars}
      </ChartPlottingArea>
    </ChartContainer>
  );
}

function RCareApproach({ onNext }: { onNext: () => void }) {
  return (
    <SectionLayout>
      <Graphic />
      <header>
        <ApproachHeader>{"R.care Approach:"}</ApproachHeader>
        <ApproachSubtitle>
          <strong>{"DBT"}</strong>
          {"(Dialectical Behavior Therapy)"}
        </ApproachSubtitle>
        <ApproachSubtitle>
          <strong>{"ACT"}</strong>
          {"(Acceptance and Commitment Therapy)"}
        </ApproachSubtitle>
        <ApproachSubtitle>
          <strong>{"CBT"}</strong>
          {"(Cognitive Behavioral Therapy)"}
        </ApproachSubtitle>
      </header>
      <EmpathyList>
        <EmpathyItem>
          {"practice tuning into your **stomach signal**"}
        </EmpathyItem>
        <EmpathyItem>
          {
            "improve understanding your **emotional triggers and self-regulation**"
          }
        </EmpathyItem>
        <EmpathyItem>{"**find coping strategy that works**"}</EmpathyItem>
      </EmpathyList>
      <ForwardNavButton onClick={onNext} />
    </SectionLayout>
  );
}

function EmpathyItem({ children }: { children: string }) {
  return (
    <EmpathyListItem>
      <EmpathyItemNumber>
        <CheckboxTick />
      </EmpathyItemNumber>
      <EmpathyItemText>{children}</EmpathyItemText>
    </EmpathyListItem>
  );
}

export const SectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = createMarkdownText(styled.h2`
  ${Fonts.SFPro};
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  padding-inline: 20px;

  strong {
    font-weight: 700;
  }
`);

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  padding-left: 40px;
  box-sizing: border-box;
  width: 80%;
  margin-bottom: 60px;
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
  margin-top: 15px;

  ${Fonts.Montserrat}
  font-size: 12px;
  font-weight: 600;
  color: ${Greys.Black};
  text-align: center;
  width: 150%;
`;

const Tooltip = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "background" && prop !== "fontSize",
})<{ background: string; fontSize: number }>`
  position: absolute;
  top: 0px;
  color: white;
  top: -20px;
  transform: translateY(-100%);
  width: fit-content;
  padding: 7px 12px;
  border-radius: 10px;
  background-color: ${(props) => props.background};
  text-align: center;

  ${Fonts.Montserrat}
  font-weight: 700;
  font-size: ${(props) => props.fontSize}px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 100%;
    left: 50%;
    width: 10px;
    height: 8.66px;
    clip-path: polygon(50% 100%, 100% 0%, 0% 0%);
    background-color: ${(props) => props.background};
    transform: translate(-50%, -20%);
  }
`;

const ApproachHeader = styled.h2`
  ${Fonts.Montserrat}
  font-weight: 700;
  font-size: 22px;
  text-align: center;
`;

const ApproachSubtitle = styled.p`
  ${Fonts.Montserrat}
  font-weight: 400;
  font-size: 12px;
  text-align: center;

  strong {
    font-weight: 400;
    font-size: 16px;
    margin-right: 0.5em;
  }
`;

const EmpathyList = styled.ol`
  padding: 0;
  list-style: none;
  margin-block: 20px;
`;

const EmpathyListItem = styled.li`
  display: flex;
  align-items: center;
  margin-block: 10px;
`;

const EmpathyItemNumber = styled.div`
  ${Fonts.SFPro}
  font-size: 20px;
  font-weight: 600;
  color: ${Greys.White};
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 35px;
  background-color: #67c060;
  margin-right: 20px;
  border-radius: 100%;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const EmpathyItemText = createRichText(styled.p`
  ${Fonts.Montserrat}
  font-size: 16px;
  font-weight: 500;

  strong {
    font-weight: 700;
  }
`);
