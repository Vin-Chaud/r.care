"use client";
import { QuestionCommon } from "@/models/OnboardingFlow/model";
import { RichText } from "./RichText";

export function QuestionHeader({
  preamble_text,
  title,
  help_text,
}: QuestionCommon) {
  return (
    <div>
      <RichText>{preamble_text}</RichText>
      <RichText tag="h2">{title}</RichText>
      <RichText>{help_text}</RichText>
    </div>
  );
}
