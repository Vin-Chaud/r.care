"use client";
import { QuestionCommon } from "@/models/OnboardingFlow/model";
import { useContext } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { AnswerValue } from "./types.js";

export function QuestionHeader({
  preamble_text,
  title,
  help_text,
  expressions,
}: QuestionCommon) {
  const { state } = useContext(onboardingFlowContext);
  const interpolate = createTextInterpolator(expressions || {}, {
    responses: state.responses,
  });
  return (
    <div>
      <span>{interpolate(preamble_text)}</span>
      <h2>{interpolate(title)}</h2>
      <span>{interpolate(help_text)}</span>
    </div>
  );
}

export interface InterpolationContext {
  responses: Readonly<Record<string, AnswerValue>>;
}

export function createTextInterpolator(
  expressions: Readonly<Record<string, string>>,
  context: InterpolationContext
) {
  return (text: string | null | undefined) =>
    interpolateText(text, expressions, context);
}

function interpolateText(
  text: string | null | undefined,
  expressions: Readonly<Record<string, string>>,
  context: InterpolationContext
) {
  if (!text) return null;
  return text.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    if (!Object.hasOwn(expressions, key)) return "";
    const expression = expressions[key];
    try {
      const args = {
        response_value: (stepId: string) => {
          if (!Object.hasOwn(context.responses, stepId)) {
            console.error(
              `Failed to interpolate expression ${key}: response for step ${stepId} not available`
            );
            return "???";
          }
          return context.responses[stepId];
        },
      };
      const fn = new Function(...Object.keys(args), `return (${expression})`);
      return fn(...Object.values(args));
    } catch (exception) {
      console.error(`Failed to interpolate expression ${key}: ${exception}`);
      return "";
    }
  });
}
