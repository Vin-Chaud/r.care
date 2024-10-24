"use client";
import { ScaleQuestion } from "@/models/OnboardingFlow/model";
import { useState } from "react";
import { ButtonColumnLayout } from "./ButtonColumnLayout";
import { ButtonRowLayout } from "./ButtonRowLayout";
import { createQuestionContainer } from "./createQuestionContainer";

export const ScaleStep = createQuestionContainer<
  string | number,
  ScaleQuestion
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  if (stepDefinition.preset === "intensity") {
    return (
      <ButtonRowLayout<number>
        options={["1", "2", "3", "4", "5"].map(makeFowardOption)}
        onSelect={(value) => {
          setSelectedValue(value);
          submitAnswer(value, stepDefinition.feedbacks?.[value]);
        }}
        hasAnswered={hasAnswered}
        selectedValue={selectedValue}
        leftLabel={stepDefinition.min_label}
        rightLabel={stepDefinition.max_label}
      />
    );
  }

  if (stepDefinition.preset === "agreement") {
    return (
      <ButtonRowLayout<number>
        options={[
          { label: "👎", value: 1, fontSize: "emoji-big" },
          { label: "👎", value: 2, fontSize: "emoji-small" },
          { label: "🤷‍♀️", value: 3, fontSize: "emoji-small" },
          { label: "👍", value: 4, fontSize: "emoji-small" },
          { label: "👍", value: 5, fontSize: "emoji-big" },
        ]}
        onSelect={(value) => {
          setSelectedValue(value);
          submitAnswer(value, stepDefinition.feedbacks?.[value]);
        }}
        hasAnswered={hasAnswered}
        selectedValue={selectedValue}
        leftLabel={stepDefinition.min_label ?? "Never"}
        rightLabel={stepDefinition.max_label ?? "All the time"}
      />
    );
  }

  const options = getButtonColumnOptions(stepDefinition);
  return (
    <ButtonColumnLayout<number>
      options={options}
      onSelect={(value) => {
        setSelectedValue(value);
        submitAnswer(value, stepDefinition.feedbacks?.[value]);
      }}
      hasAnswered={hasAnswered}
      selectedValue={selectedValue}
    />
  );
});

interface Option {
  value: number;
  label: string;
}

function getButtonColumnOptions(
  stepDefinition: ScaleQuestion
): readonly Option[] {
  switch (stepDefinition.preset) {
    case "frequency": {
      return [
        "Never",
        "Rarely",
        "Sometimes",
        "A lot of the time",
        "All the time",
      ]
        .map(makeFowardOption)
        .toReversed();
    }

    default: {
      return (stepDefinition.custom_labels || [1, 2, 3, 4, 5])!.map(
        makeFowardOption
      );
    }
  }
}

function makeFowardOption(label: string | number, index: number): Option {
  return {
    label: String(label),
    value: index + 1,
  };
}
