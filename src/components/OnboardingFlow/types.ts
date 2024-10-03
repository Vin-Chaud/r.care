"use client";
import {
  array,
  boolean,
  number,
  object,
  record,
  string,
  union,
  ZodType,
  ZodTypeDef,
} from "zod";
import { Cursor } from "../../models/OnboardingFlow/methods.js";

export interface OnboardingFlowState {
  cursor: Cursor;
  responses: Readonly<Record<string, AnswerValue>>;
}

export const onboardingFlowStateSchema: ZodType<
  OnboardingFlowState,
  ZodTypeDef
> = object({
  cursor: object({
    currentSectionIndex: number(),
    currentSubsectionIndex: number(),
    currentStepIndex: number(),
  }),
  responses: record(
    union([number(), string(), boolean(), array(union([number(), string()]))])
  ),
});

export type AnswerValue =
  | string
  | number
  | boolean
  | readonly (string | number)[];
