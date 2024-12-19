import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { YesNoQuestion } from "@/models/OnboardingFlow/model";
import { withOpacity } from "@/utils/color";
import { useState } from "react";
import styled from "styled-components";
import { createQuestionContainer } from "./createQuestionContainer";

export const YesNoStep = createQuestionContainer<boolean, YesNoQuestion>(
  ({
    stepDefinition,
    submitAnswer,
    hasAnswered,
    isShowingEmbeddedFeedback,
  }) => {
    const [selectedValue, setSelectedValue] = useState<boolean | null>(null);
    const isInputDisabled = hasAnswered && !isShowingEmbeddedFeedback;
    return (
      <ButtonsLayout>
        <Button
          type="button"
          isSelected={selectedValue === false}
          onClick={() => {
            setSelectedValue(false);
            submitAnswer(false, stepDefinition.feedbacks?.no);
          }}
          disabled={isInputDisabled}
        >
          <Emoji>👎</Emoji>
          {"No"}
        </Button>
        <Button
          type="button"
          isSelected={selectedValue === true}
          onClick={() => {
            setSelectedValue(true);
            submitAnswer(true, stepDefinition.feedbacks?.yes);
          }}
          disabled={isInputDisabled}
        >
          <Emoji>👍</Emoji>
          {"Yes"}
        </Button>
      </ButtonsLayout>
    );
  }
);

const ButtonsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  ${Fonts.Montserrat};
  font-weight: 500;
  font-size: 12px;
  color: ${Greys.Black};
  background-color: ${(props) =>
    props.isSelected ? Purples.PurpleF9 : Greys.GreyF5};
  border-radius: 20px;
  display: block;
  width: 100%;
  height: 100px;
  border: 1px solid
    ${(props) => withOpacity(Purples.Purple94, props.isSelected ? 1 : 0)};
  transition: border 0.3s, background-color 0.3s;
  cursor: pointer;
`;

const Emoji = styled.span`
  font-size: 26px;
  display: block;
  margin-bottom: 10px;
`;
