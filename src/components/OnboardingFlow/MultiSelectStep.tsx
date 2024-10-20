"use client";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { CheckboxTick } from "@/components/icons/CheckboxTick";
import { buttonStyle } from "@/design_components/button";
import { Greys, Purples } from "@/design_components/design_system";
import { MultiSelectQuestion } from "@/models/OnboardingFlow/model";
import { maxBy } from "@/utils/aggregation";
import { useReducer } from "react";
import styled, { css } from "styled-components";
import { createQuestionContainer } from "./createQuestionContainer";

export const MultiSelectStep = createQuestionContainer<
  readonly (string | number)[],
  MultiSelectQuestion
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
    <QuestionLayout>
      <ButtonList>
        {stepDefinition.options.map(({ text }, optionIndex) => {
          const inputId = "multi-select-" + optionIndex;
          const isSelected = selectedIndices.includes(optionIndex);
          return (
            <ButtonListItem key={optionIndex}>
              <CheckboxLabel htmlFor={inputId} isSelected={isSelected}>
                <CheckboxInput
                  type="checkbox"
                  id={inputId}
                  onChange={(ev) => {
                    toggleSelectedIndices({
                      index: optionIndex,
                      selected: ev.target.checked,
                    });
                  }}
                  disabled={hasAnswered}
                />
                <span>{text}</span>
                <CheckboxPseudo isSelected={isSelected}>
                  <CheckboxTick />
                </CheckboxPseudo>
              </CheckboxLabel>
            </ButtonListItem>
          );
        })}
        {stepDefinition.none_option && (
          <ButtonListItem>
            <Button
              onClick={() => {
                submitAnswer([]);
              }}
              disabled={hasAnswered}
              isSelected={hasAnswered && selectedIndices.length === 0}
            >
              {"None"}
            </Button>
          </ButtonListItem>
        )}
      </ButtonList>
      <ForwardNavButton
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
        locked={hasAnswered}
        disabled={
          !selectedIndices.length ||
          (hasAnswered && selectedIndices.length === 0)
        }
      />
    </QuestionLayout>
  );
});

const QuestionLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonList = styled.ul`
  padding: 0px;
  width: 100%;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 14px;
`;

const ButtonListItem = styled.li`
  list-style: none;
  height: 100%;
`;

const buttonWithCheckboxStyle = (props: { isSelected: boolean }) => css`
  ${buttonStyle(props)}
  height: 100%;
  box-sizing: border-box;
  padding-left: 54px;
  padding-right: 18px;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  ${(props) => buttonWithCheckboxStyle(props)}
`;

const CheckboxLabel = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  position: relative;
  ${(props) => buttonWithCheckboxStyle(props)}
`;

const CheckboxPseudo = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  display: block;
  position: absolute;
  top: 50%;
  left: 18px;
  width: 18px;
  height: 18px;
  border: 1px solid
    ${(props) => (props.isSelected ? Purples.Purple94 : Greys.GreyAF)};
  background-color: ${(props) =>
    props.isSelected ? Purples.Purple94 : Greys.White};
  transition: background-color 0.3s, border-color 0.3s;
  pointer-events: none;
  transform: translateY(-50%);
  border-radius: 3px;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  position: absolute;
  left: 18px;
  width: 18px;
  height: 18px;
  opacity: 0;
`;
