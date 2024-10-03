"use client";
import { MultiSelectQuestion } from "@/models/OnboardingFlow/model";
import { maxBy } from "@/utils/aggregation";
import { useReducer } from "react";
import { createQuestionContainer } from "./createQuestionContainer";

export const MultiSelectStep = createQuestionContainer<
  readonly (string | number)[],
  MultiSelectQuestion,
  {}
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  const [selectedIndices, toggleSelectedIndices] = useReducer(
    (
      selectedIndices: readonly number[],
      action: { index: number; selected: boolean }
    ) => {
      if (action.selected) {
        return [...selectedIndices, action.index];
      } else {
        return selectedIndices.filter((i) => i !== action.index);
      }
    },
    []
  );

  return (
    <div>
      <ul>
        {stepDefinition.options.map(({ text }, optionIndex) => {
          const inputId = "multi-select-" + optionIndex;
          return (
            <li key={optionIndex}>
              <input
                type="checkbox"
                id={inputId}
                onChange={(ev) => {
                  toggleSelectedIndices({
                    index: optionIndex,
                    selected: ev.target.checked,
                  });
                }}
                disabled={hasAnswered}
                style={{
                  border: selectedIndices.includes(optionIndex)
                    ? "1px solid blue"
                    : "",
                }}
              />
              <label htmlFor={inputId}>{text}</label>
            </li>
          );
        })}
        {stepDefinition.none_option && (
          <li>
            <button
              onClick={() => {
                submitAnswer([]);
              }}
              disabled={hasAnswered}
              style={{
                border: selectedIndices.includes(-1) ? "1px solid blue" : "",
              }}
            >
              {"None"}
            </button>
          </li>
        )}
      </ul>
      <button
        type="button"
        onClick={() => {
          const value = selectedIndices.map(
            (i) => stepDefinition.options[i].value
          );
          const matchingFeedbacks = selectedIndices
            .map((i) => stepDefinition.options[i].feedback)
            .filter((feedback) => feedback != null);
          const mostPrioritizedFeedback = maxBy(
            matchingFeedbacks,
            (feedback) => feedback.priority
          );
          submitAnswer(value, mostPrioritizedFeedback);
        }}
        disabled={hasAnswered || !selectedIndices.length}
      >
        {"Continue"}
      </button>
    </div>
  );
});
