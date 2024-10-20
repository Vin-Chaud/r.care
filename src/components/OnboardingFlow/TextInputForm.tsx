import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Fonts, Greys, Reds } from "@/design_components/design_system";
import { Failure, Result, Success } from "@/utils/Result";
import { fadeIn } from "@/utils/style_partials";
import { ComponentProps, useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
} & Omit<ComponentProps<"input">, "value" | "onChange" | "disabled">) {
  const [inputValue, setInputValue] = useState("");
  const [isShowingError, setIsShowingError] = useState(false);
  const preprocessedValue = validationSpec.preprocess(inputValue);
  const hasInput = validationSpec.hasInput(preprocessedValue);

  const parsedValue = hasInput ? validationSpec.parse(preprocessedValue) : null;

  const validationError = parsedValue?.isSuccess
    ? validationSpec.validate(parsedValue.data)
    : parsedValue?.error ?? null;
  const isValid = validationError == null;

  const hasEverHadInput = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  hasEverHadInput.current = hasEverHadInput.current || hasInput;

  useEffect(() => {
    if ((hasInput && isValid) || !hasInput) {
      setIsShowingError(false);
    }
  }, [isValid, hasInput]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form
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
      <FormField>
        <TextInput
          type="text"
          {...inputProps}
          value={inputValue}
          onChange={(ev) => {
            setInputValue(ev.target.value);
          }}
          disabled={hasAnswered}
          ref={inputRef}
        />
        {isShowingError && validationError != null && (
          <ValidationMessage>{validationError}</ValidationMessage>
        )}
      </FormField>
      {hasEverHadInput.current && (
        <SubmitContainer>
          <ForwardNavButton
            type="submit"
            locked={hasAnswered}
            disabled={!hasInput}
          />
        </SubmitContainer>
      )}
    </Form>
  );
}

export const integerValidation = (options: {
  min: number;
  max: number;
}): TextValidationSpec<number> => ({
  preprocess: (value) => value.trim(),
  hasInput: (value) => value.trim().length > 0,
  parse: (value) => {
    if (/^\d+$/.test(value) === false) {
      return new Failure("Please enter a valid number.");
    }
    const parsedValue = Number.parseInt(value);
    return isFinite(parsedValue)
      ? new Success(parsedValue)
      : new Failure("Please enter a valid number.");
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const FormField = styled.div``;

const TextInput = styled.input`
  display: block;
  width: 100%;
  border-radius: 20px;
  border: none;
  background-color: ${Greys.GreyF5};
  padding: 24px;
  box-sizing: border-box;

  ${Fonts.Montserrat};
  font-weight: 400;
  font-size: 15px;

  &:focus {
    outline: none;
  }
`;

const ValidationMessage = styled.p`
  color: ${Reds.Red_Undocumented};

  ${Fonts.SFPro}
  font-weight: 500;
  font-size: 14px;
`;

const SubmitContainer = styled.div`
  ${fadeIn}
`;
