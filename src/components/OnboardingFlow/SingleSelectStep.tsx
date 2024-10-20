"use client";
import { ButtonColumnLayout } from "@/components/OnboardingFlow/ButtonColumnLayout";
import { SingleSelectQuestion } from "@/models/OnboardingFlow/model";
import { useState } from "react";
import { createQuestionContainer } from "./createQuestionContainer";

export const SingleSelectStep = createQuestionContainer<
  string | number,
  SingleSelectQuestion
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <ButtonColumnLayout
      options={stepDefinition.options.map(({ text, value }, index) => ({
        label: text,
        value: index,
      }))}
      hasAnswered={hasAnswered}
      selectedValue={selectedIndex}
      onSelect={(index) => {
        const option = stepDefinition.options[index];
        setSelectedIndex(index);
        submitAnswer(option.value, option.feedback);
      }}
    />
  );
});
