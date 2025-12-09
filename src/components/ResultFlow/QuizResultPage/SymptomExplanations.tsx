import {
  SectionHeader,
  SectionLayout,
  SectionSubHeader,
} from "@/components/ResultFlow/QuizResultPage/Common";
import { MarkdownText } from "@/design_components/typography/MarkdownText";
import { Symptom } from "@/models/Metric";
import {
  symptomCopy,
  symptomEmojis,
  SymptomExplanationAnswer,
  SymptomExplanationQuestion,
  SymptomOrdering,
} from "./copy";
import { QuestionAnswerBox } from "./QuestionAnswerBox";
import { computeScoreColor } from "./scoreColorEncoding";
import styled from "styled-components";
import { Fonts, Greys } from "@/design_components/design_system";

export function SymptomExplanations({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Symptom, number>>;
}) {
  return (
    <SectionLayout style={{ width: "100%" }}>
      <ExplainerList>
        {SymptomOrdering.map((metric) => (
          <ExplainerListItem key={metric}>
            <QuestionAnswerBox
              style={{ width: "100%" }}
              title={symptomEmojis[metric] + " " + symptomCopy[metric]}
              question={SymptomExplanationQuestion[metric]}
            >
              {SymptomExplanationAnswer[metric]}
            </QuestionAnswerBox>

            <SymptomScoreLabel
              style={{
                backgroundColor: computeScoreColor(
                  percentageScores[metric]
                ),
              }}
            >
              <strong>{percentageScores[metric].toFixed(0)}%</strong>
              {"High"}
            </SymptomScoreLabel>
          </ExplainerListItem>
        ))}
      </ExplainerList>
    </SectionLayout>
  );
}

const ExplainerList = styled.ul`
  padding: 0;
  list-style: none;
  width: 100%;
`;

const ExplainerListItem = styled.li`
  position: relative;
  margin-bottom: 45px;
  width: 100%;
`;

const SymptomScoreLabel = styled.label`
  position: absolute;
  top: 0px;
  display: block;
  padding: 8px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 400;
  padding: 7px 12px;
  text-align: center;
  color: ${Greys.White};
  ${Fonts.Montserrat}

  strong {
    font-weight: 700;
    font-size: 18px;
    margin-inline-end: 0.5em;
  }

  transform: translate(0%, -50%);
`;
