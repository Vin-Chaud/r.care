import { Failure, Result, Success } from "@/utils/Result";
import { ComponentProps, useEffect, useState } from "react";
import { SubmitAnswerAction } from "./createQuestionContainer";
import { AnswerValue } from "./types";

export interface TextValidationSpec<A> {
  preprocess(value: string): string;
  hasInput(value: string): boolean;
  parse: (value: string) => Result<string, A>;
  validate: (value: A) => string | null;
  present: (value: A) => string;
}

export function TextInputForm<A extends AnswerValue>({
  validationSpec,
  submitAnswer,
  hasAnswered,
  ...inputProps
}: {
  validationSpec: TextValidationSpec<A>;
  submitAnswer: SubmitAnswerAction<A>;
  hasAnswered: boolean;
} & Omit<ComponentProps<"input">, "type" | "value" | "onChange" | "disabled">) {
  const [inputValue, setInputValue] = useState("");
  const [isShowingError, setIsShowingError] = useState(false);
  const preprocessedValue = validationSpec.preprocess(inputValue);
  const hasInput = validationSpec.hasInput(preprocessedValue);
  const parsedValue = hasInput ? validationSpec.parse(preprocessedValue) : null;

  const validationError = parsedValue?.isSuccess
    ? validationSpec.validate(parsedValue.data)
    : parsedValue?.error ?? null;
  const isValid = validationError == null;

  useEffect(() => {
    if ((hasInput && isValid) || !hasInput) {
      setIsShowingError(false);
    }
  }, [isValid, hasInput]);

  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (parsedValue?.isSuccess && isValid) {
            setInputValue(validationSpec.present(parsedValue.data));
            submitAnswer(parsedValue.data);
          } else {
            setIsShowingError(true);
          }
        }}
      >
        <div>
          <input
            {...inputProps}
            type="text"
            value={inputValue}
            onChange={(ev) => {
              setInputValue(ev.target.value);
            }}
            disabled={hasAnswered}
          />
          {isShowingError && validationError != null && (
            <div>{validationError}</div>
          )}
        </div>
        <div>
          <button type="submit" disabled={hasAnswered || !hasInput}>
            {"Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}

export const integerValidation = (options: {
  min: number;
  max: number;
}): TextValidationSpec<number> => ({
  preprocess: (value) => value.trim(),
  hasInput: (value) => value.trim().length > 0,
  parse: (value) => {
    const parsedValue = Number.parseInt(value);
    return isNaN(parsedValue)
      ? new Failure("Please enter a valid number.")
      : new Success(parsedValue);
  },
  validate: (value) => {
    if (value < options.min || value > options.max) {
      return `Please enter a number between ${options.min} and ${options.max}.`;
    }
    return null;
  },
  present: (value) => value.toString(),
});

export const emailValidation: TextValidationSpec<string> = {
  preprocess: (value) => value.trim(),
  hasInput: (value) => value.trim().length > 0,
  parse: (value) => new Success(value),
  validate: (value) => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return null;
    }
    return "Please enter a valid email address.";
  },
  present: (value) => value,
};
