"use client";
import { QuestionCommon } from "@/models/OnboardingFlow/model";
import { createRichText, RichText } from "./RichText";
import styled from "styled-components";
import { Fonts, Greys, Purples } from "@/design_components/design_system";

export function QuestionHeader({
  preamble_text,
  title,
  help_text,
}: QuestionCommon) {
  return (
    <div>
      <QuestionHelpText>{preamble_text}</QuestionHelpText>
      <QuestionTitle>{title}</QuestionTitle>
      <QuestionHelpText>{help_text}</QuestionHelpText>
    </div>
  );
}

const QuestionTitle = createRichText(styled.h2`
  ${Fonts.SFPro}
  font-size:20px;
  font-weight: 600;
  color: ${Greys.Grey4D};
  margin: 12px;
`);

const QuestionHelpText = createRichText(styled.p`
  ${Fonts.SFPro}
  font-size:14px;
  font-weight: 500px;
  color: ${Purples.PurpleBC};
  margin: 12px;
`);
