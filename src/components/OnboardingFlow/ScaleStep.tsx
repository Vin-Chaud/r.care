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
  switch (stepDefinition.template) {
    case "intensity": {
      return [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
      ];
    }
    case "agreement": {
      return [
        { value: 1, label: "👎👎" },
        { value: 2, label: "👎" },
        { value: 3, label: "🤷‍♀️" },
        { value: 4, label: "👍" },
        { value: 5, label: "👍👍" },
      ];
    }
    case "frequency": {
      return [
        { value: 5, label: "All the time" },
        { value: 4, label: "A lot of the time" },
        { value: 3, label: "Sometimes" },
        { value: 2, label: "Rarely" },
        { value: 1, label: "Never" },
      ];
    }
    case "custom": {
      return (stepDefinition.custom_labels || [1, 2, 3, 4, 5])!.map(
        (label, index) => ({
          value: index + 1,
          label,
        })
      );
    }
  }
}
