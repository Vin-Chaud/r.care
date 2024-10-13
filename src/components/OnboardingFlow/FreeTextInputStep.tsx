import { FreeTextQuestion } from "@/models/OnboardingFlow/model";
import { createQuestionContainer } from "./createQuestionContainer";
import { emailValidation, TextInputForm } from "./TextInputForm";

export const FreeTextInputStep = createQuestionContainer<
  string,
  FreeTextQuestion,
  {}
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  return (
    <TextInputForm
      validationSpec={emailValidation}
      submitAnswer={submitAnswer}
      hasAnswered={hasAnswered}
      placeholder={stepDefinition.placeholder}
      inputMode="email"
      type="email"
      name="email"
      autoComplete="email"
    />
  );
});
