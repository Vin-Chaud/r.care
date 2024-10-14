import { IntegerQuestion } from "@/models/OnboardingFlow/model";
import { createQuestionContainer } from "./createQuestionContainer";
import { integerValidation, TextInputForm } from "./TextInputForm";

export const IntegerInputStep = createQuestionContainer<
  number,
  IntegerQuestion
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  return (
    <TextInputForm
      validationSpec={integerValidation({
        min: stepDefinition.min,
        max: stepDefinition.max,
      })}
      submitAnswer={submitAnswer}
      hasAnswered={hasAnswered}
      placeholder={stepDefinition.placeholder}
      inputMode="numeric"
    />
  );
});
