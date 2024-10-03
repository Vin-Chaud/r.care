import { FreeTextQuestion } from "@/models/OnboardingFlow/model";
import { useEffect, useState } from "react";
import { createQuestionContainer } from "./createQuestionContainer";

export const FreeTextInputStep = createQuestionContainer<
  string,
  FreeTextQuestion,
  {}
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  const [value, setValue] = useState("");
  const [isShowingError, setIsShowingError] = useState(false);
  const isFilled = value.trim().length > 0;
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    value.trim()
  );
  const parsedValue = value.trim();

  useEffect(() => {
    if (isValid && isShowingError) {
      setIsShowingError(false);
    }
  }, [isValid, isShowingError]);

  return (
    <div>
      <div>
        <input
          type="text"
          inputMode="email"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
          placeholder={stepDefinition.placeholder}
          disabled={hasAnswered}
        />
        {isFilled && !isValid && isShowingError && (
          <div>{"Please enter a valid email address."}</div>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            if (isValid) {
              submitAnswer(parsedValue);
            } else {
              setIsShowingError(true);
            }
          }}
          disabled={hasAnswered || !isFilled}
        >
          {"Continue"}
        </button>
      </div>
    </div>
  );
});
