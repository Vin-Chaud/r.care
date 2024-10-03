"use client";
import { SingleSelectQuestion } from "@/models/OnboardingFlow/model";
import { useState } from "react";
import { createQuestionContainer } from "./createQuestionContainer";

export const SingleSelectStep = createQuestionContainer<
  string | number,
  SingleSelectQuestion,
  {}
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div>
      <ul>
        {stepDefinition.options.map(
          ({ value, feedback, text }, optionIndex) => (
            <li key={optionIndex}>
              <button
                type="button"
                onClick={() => {
                  setSelectedIndex(optionIndex);
                  submitAnswer(value, feedback);
                }}
                disabled={hasAnswered}
                style={{
                  border: selectedIndex === optionIndex ? "1px solid blue" : "",
                }}
              >
                {text}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
});
