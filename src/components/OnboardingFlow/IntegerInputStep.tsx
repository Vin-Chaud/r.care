import { IntegerQuestion } from "@/models/OnboardingFlow/model";
import { useState } from "react";
import { createQuestionContainer } from "./createQuestionContainer";

export const IntegerInputStep = createQuestionContainer<
  number,
  IntegerQuestion,
  {}
>(({ stepDefinition, submitAnswer, hasAnswered }) => {
  const [value, setValue] = useState("");
  const isFilled = value.trim().length > 0;
  const isValid = value.trim().match(/^\d+$/) != null;
  const parsedValue = Number.parseInt(value.trim());
  const isInRange =
    stepDefinition.min <= parsedValue && parsedValue <= stepDefinition.max;
  return (
    <div>
      <div>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          min={stepDefinition.min}
          max={stepDefinition.max}
          step={1}
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
          placeholder={stepDefinition.placeholder}
          disabled={hasAnswered}
        />
        {isFilled && !isValid && <div>{"Please enter a valid number."}</div>}
        {isValid && !isInRange && (
          <div>
            {`Please enter a number between ${stepDefinition.min} and ${stepDefinition.max}.`}
          </div>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            if (isValid && isInRange) {
              submitAnswer(parsedValue);
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
