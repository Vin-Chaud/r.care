"use client";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { QuestionCommon } from "@/models/OnboardingFlow/model";
import styled from "styled-components";
import { createRichText } from "./RichText";

export function QuestionHeader({
  preamble_text,
  title,
  help_text,
}: QuestionCommon) {
  return (
    <QuestionHeaderLayout>
      <QuestionHelpText>{preamble_text}</QuestionHelpText>
      <QuestionTitle>{title}</QuestionTitle>
      <QuestionHelpText>{help_text}</QuestionHelpText>
    </QuestionHeaderLayout>
  );
}

const QuestionHeaderLayout = styled.div`
  margin-block: 10px;
  width: 100%;
`;

const QuestionTitle = createRichText(styled.h2`
  ${Fonts.SFPro}
  font-size:20px;
  font-weight: 600;
  color: ${Greys.Grey4D};
  margin-block: 12px;
  height: 4em;
  text-align: left;
  width: 100%;
`);

const QuestionHelpText = createRichText(styled.p`
  ${Fonts.SFPro}
  font-size:14px;
  font-weight: 500px;
  color: ${Purples.PurpleBC};
  margin-block: 12px;
`);
