import { YesNoQuestion } from "@/models/OnboardingFlow/model";
import { createQuestionContainer } from "./createQuestionContainer";

export const YesNoStep = createQuestionContainer<boolean, YesNoQuestion>(
  ({ stepDefinition, submitAnswer, hasAnswered }) => {
    return (
      <div>
        <button
          type="button"
          onClick={() => submitAnswer(true, stepDefinition.feedbacks?.yes)}
          disabled={hasAnswered}
        >
          👍 Yes
        </button>
        <button
          type="button"
          onClick={() => submitAnswer(false, stepDefinition.feedbacks?.no)}
          disabled={hasAnswered}
        >
          👎 No
        </button>
      </div>
    );
  }
);
