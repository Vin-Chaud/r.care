import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Arrow } from "@/components/ResultFlow/ProgramPage/Arrow";
import { Graphic } from "@/components/ResultFlow/ProgramPage/Graphic";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import {
  ScrollablePageContentFrame,
  ScrollablePageLayoutContainer,
} from "@/design_components/PageLayout";
import {
  createMarkdownText,
  MarkdownText,
} from "@/design_components/typography/MarkdownText";
import { getEchoText } from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import styled from "styled-components";
import { Chart } from "./Chart";
import { createRichText } from "@/components/OnboardingFlow/RichText";
import { AppHeader } from "@/components/AppHeader";

export function ProgramPage({
  responses,
  flow,
  onNext,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
  onNext: () => void;
}) {
  const currentEpisodeCount = Number.parseInt(
    String(responses[flow.current_episode_count_id])
  );
  const reductionPercentage = 80;
  const targetEpisodeCount = Math.max(
    0,
    Math.min(
      Number(
        (currentEpisodeCount * (1 - reductionPercentage / 100)).toFixed(0)
      ),
      currentEpisodeCount - 1
    )
  );

  return (
    <ScrollablePageLayoutContainer>
      <ScrollablePageContentFrame background={Greys.White}>
        <section>
          <AppHeader>{{ branding: true }}</AppHeader>
          <HeaderA>
            {"Your personalized program will help you reduce your symptoms."}
          </HeaderA>
          <ChartContainer>
            <ChartTooltip
              style={{ top: "10px", left: "calc((100% - 280px) / 2 + 10px)" }}
              backgroundColor={Greys.Grey79}
            >
              <strong>{currentEpisodeCount + " times"}</strong>
              <br />
              {"per week"}
            </ChartTooltip>
            <ChartTooltip
              style={{ top: "140px", left: "calc((100% - 280px) / 2 + 270px)" }}
              backgroundColor={Purples.Purple94}
            >
              <strong>{targetEpisodeCount + " times"}</strong>
              <br />
              {"per week"}
            </ChartTooltip>
            <Chart />
          </ChartContainer>
        </section>
        <section>
          <HeaderB>
            {`We will work together to reduce your binge eating episodes by ${reductionPercentage}% in first three months.`}
          </HeaderB>
          <CountPanel>
            <CountPane
              title={"now"}
              count={currentEpisodeCount}
              isHighlighted={false}
            />
            <ArrowWrapper>
              <Arrow />
            </ArrowWrapper>
            <CountPane
              title={"in 3 months"}
              count={targetEpisodeCount}
              isHighlighted={true}
            />
          </CountPanel>
        </section>

        {flow.program_plan.map((spec, itemIndex) => (
          <EchoPane
            key={itemIndex}
            prompt={spec.prompt}
            echo={getEchoText(responses, spec)}
            color={spec.color}
          />
        ))}
      </ScrollablePageContentFrame>
      <ScrollablePageContentFrame background={"#FFF5EB"}>
        <EmpathySection>
          <StopStrugglingHeader>
            <Graphic />
            <HeaderB>{"Stop struggling alone.<br>**We will help you...**"}</HeaderB>
          </StopStrugglingHeader>
          <EmpathyList>
            <EmpathyItem number={1}>
              {"Discover the roots of your binge"}
            </EmpathyItem>
            <EmpathyItem number={2}>
              {"Find tips to manage the symptoms"}
            </EmpathyItem>
            <EmpathyItem number={3}>
              {"Understand and accept yourself"}
            </EmpathyItem>
            <EmpathyItem number={4}>
              {"Build healthier behaviors"}
            </EmpathyItem>
          </EmpathyList>

          <ForwardNavButton onClick={onNext} />
        </EmpathySection>
      </ScrollablePageContentFrame>
    </ScrollablePageLayoutContainer>
  );
  return null;
}

function CountPane({
  title,
  count,
  isHighlighted,
}: {
  title: string;
  count: number;
  isHighlighted: boolean;
}) {
  return (
    <CountPaneLayout>
      <CountPaneTitle isHighlighted={isHighlighted}>{title}</CountPaneTitle>
      <CountPaneBox isHighlighted={isHighlighted}>
        <strong>{count}</strong>
        <div>{"times/week"}</div>
      </CountPaneBox>
    </CountPaneLayout>
  );
  return null;
}

function EchoPane({
  prompt,
  echo,
  color,
}: {
  prompt: string;
  echo: string;
  color: string;
}) {
  return (
    <EchoPaneLayout>
      <div>{prompt}</div>
      <EchoPaneInset style={{ backgroundColor: color }}>{echo}</EchoPaneInset>
    </EchoPaneLayout>
  );
  return null;
}

function EmpathyItem({
  children,
  number,
}: {
  children: string;
  number: number;
}) {
  return (
    <EmpathyListItem>
      <EmpathyItemNumber>{number}</EmpathyItemNumber>
      <EmpathyItemText>{children}</EmpathyItemText>
    </EmpathyListItem>
  );
  return null;
}

const HeaderA = styled.h2`
  ${Fonts.SFPro}
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

const ChartContainer = styled.div`
  position: relative;
  text-align: center;
`;

const ChartTooltip = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<{ backgroundColor: string }>`
  position: absolute;
  color: white;
  transform: translateX(-50%);
  margin-block-start: 8px;
  width: fit-content;
  padding: 7px 12px;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};

  ${Fonts.Montserrat}
  font-weight: 400;
  font-size: 10px;
  white-space: nowrap;

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
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    background-color: ${(props) => props.backgroundColor};
    transform: translate(-50%, -20%) scaleY(-1);
  }
`;

const HeaderB = createMarkdownText(styled.h2`
  ${Fonts.SFPro}
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 30px;

  strong {
    font-weight: 700;
  }
`);

const CountPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountPaneLayout = styled.div`
  margin-block: 40px;
`;

const CountPaneTitle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isHighlighted",
})<{ isHighlighted: boolean }>`
  ${Fonts.SFPro}
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
  text-transform: uppercase;
  color: ${(props) => (props.isHighlighted ? Greys.Black : Greys.Grey7B)};
`;

const CountPaneBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isHighlighted",
})<{ isHighlighted: boolean }>`
  width: 117px;
  height: 113px;
  border-radius: 15px;
  opacity: 0px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.isHighlighted ? Purples.PurpleF9 : Greys.GreyF3};
  border: 2px solid
    ${(props) => (props.isHighlighted ? Purples.Purple94 : "transparent")};
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${Fonts.Montserrat}
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.isHighlighted ? Greys.Black : Greys.Grey7B)};

  strong {
    ${Fonts.Montserrat}
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    display: block;
    color: ${Greys.Black};
  }
`;

const ArrowWrapper = styled.div`
  position: relative;
  margin: 20px;
  top: 20px;
`;

const EchoPaneLayout = styled.section`
  width: 100%;
  border-radius: 15px;
  border: 1px solid ${Greys.GreyD1};
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;

  ${Fonts.SFPro}
  font-size: 14px;
  font-weight: 500;
`;

const EchoPaneInset = styled.div`
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-top: 25px;

  ${Fonts.Montserrat}
  font-size: 14;
  font-weight: 600;
  box-sizing: border-box;
  padding: 25px;
  text-align: center;
`;

const StopStrugglingHeader = styled.header`
  margin-top: 65px;
  margin-bottom: 20px;
`;

const EmpathySection = styled.section`
  width: 100%;
  height: 100%;
  padding-block: 20px;
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
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 50px;
  background-color: ${Purples.Purple94};
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
