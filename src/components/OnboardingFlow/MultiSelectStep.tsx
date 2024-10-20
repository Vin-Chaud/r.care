"use client";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { MultiSelectQuestion } from "@/models/OnboardingFlow/model";
import { maxBy } from "@/utils/aggregation";
import { useReducer } from "react";
import { createQuestionContainer } from "./createQuestionContainer";
import styled, { css } from "styled-components";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { withOpacity } from "@/utils/color";
import { CheckboxTick } from "@/components/icons/CheckboxTick";

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

const buttonStyle = (props: { isSelected: boolean }) => css`
  ${Fonts.Montserrat};
  font-weight: 500;
  font-size: 15px;
  color: ${Greys.Black};
  background-color: ${props.isSelected ? Purples.PurpleF9 : Greys.GreyF5};
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${withOpacity(Purples.Purple94, props.isSelected ? 1 : 0)};
  transition: border 0.3s, background-color 0.3s;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  padding-left: 54px;
  padding-right: 18px;
  text-align: center;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  ${(props) => buttonStyle(props)}
`;

const CheckboxLabel = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  position: relative;
  ${(props) => buttonStyle(props)}
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
