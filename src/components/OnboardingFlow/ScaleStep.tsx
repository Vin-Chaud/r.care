"use client";
import { ScaleQuestion } from "@/models/OnboardingFlow/model";
import { ReactNode, useState } from "react";
import { createQuestionContainer } from "./createQuestionContainer";

export const ScaleStep = createQuestionContainer<
  string | number,
  ScaleQuestion,
  {}
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const options = getOptions(stepDefinition);

  return (
    <div>
      <ul>
        {options.map(({ value, label }) => (
          <li key={value}>
            <button
              type="button"
              onClick={() => {
                setSelectedValue(value);
                submitAnswer(value, stepDefinition.feedbacks?.[value]);
              }}
              disabled={hasAnswered}
              style={{
                border: selectedValue === value ? "1px solid blue" : "",
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

interface Option {
  value: number;
  label: ReactNode;
}

function getOptions(stepDefinition: ScaleQuestion): readonly Option[] {
  switch (stepDefinition.preset) {
    case "intensity": {
      return ["1", "2", "3", "4", "5"].map(makeFowardOption);
    }

    case "agreement": {
      return ["👎👎", "👎", "🤷‍♀️", "👍", "👍👍"].map(makeFowardOption);
    }

    case "frequency": {
      return [
        "All the time",
        "A lot of the time",
        "Sometimes",
        "Rarely",
        "Never",
      ].map(makeFowardOption);
    }
    case "custom": {
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
