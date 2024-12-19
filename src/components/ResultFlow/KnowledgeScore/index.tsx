import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import { Experience } from "@/models/Metric";
import {
  computePercentageScores,
  getEchoText,
} from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import styled from "styled-components";

export function KnowledgeScorePage({
  responses,
  flow,
  onNext,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
  onNext: () => void;
}) {
  const knowledgePercentageScore = computePercentageScores(flow, responses)[
    Experience.Knowledge
  ];

  return (
    <PageLayout background={Greys.White}>
      <AppHeader>{{ branding: true }}</AppHeader>
      <header>
        <Header>
          {"Your binge eating knowledge based on all your answers today:"}
        </Header>
      </header>

      <FlexGrow>
        <KnowledgeScoreOutput>
          <div>
            {knowledgePercentageScore.toFixed(0)}
            <span>{"%"}</span>
          </div>
        </KnowledgeScoreOutput>
      </FlexGrow>
      <FlexGrow>
        <KnowledgeScoreList>
          {flow.knowledge_plan.map((spec, itemIndex) => (
            <KnowledgeScoreItem key={itemIndex}>
              {spec.prompt}
              <KnowledgeScoreAnswer>
                {getEchoText(responses, spec)}
              </KnowledgeScoreAnswer>
            </KnowledgeScoreItem>
          ))}
        </KnowledgeScoreList>
      </FlexGrow>
      <Marketing>
        {"This is a good start but what happens if you stick with R.care?"}
      </Marketing>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}

const Header = styled.h2`
  ${Fonts.SFPro};
  font-size: 18px;
  font-weight: 500;
  text-align: center;

  @media (max-height: 674px) {
    margin-top: 0px;
  }
`;

const FlexGrow = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KnowledgeScoreOutput = styled.output`
  width: 180px;
  height: 75px;
  border-radius: 20px;

  background: #f9f4ff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${Fonts.SFPro}
  font-size: 45px;
  font-weight: 700;

  span {
    font-size: 0.6em;
    font-weight: 500;
  }

  @media (max-height: 599px) {
    height: 50px;
    width: 150px;

    font-size: 30px;
  }
`;

const KnowledgeScoreList = styled.ul`
  list-style: none;
  padding: 15px;
  border: 1px solid ${Greys.GreyD1};
  border-radius: 15px;
  width: 100%;
`;

const KnowledgeScoreItem = styled.li`
  ${Fonts.SFPro};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-height: 674px) {
    margin-bottom: 20px;
  }
`;

const KnowledgeScoreAnswer = styled.div`
  background: ${Purples.PurpleF9};
  ${Fonts.Montserrat}
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  border-radius: 15px;
  padding-inline: 15px;
  box-sizing: border-box;

  @media (max-height: 674px) {
    height: 40px;
    margin-top: 15px;
  }
`;

const Marketing = styled.p`
  ${Fonts.SFProItalic};
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: ${Purples.Purple94};
`;
