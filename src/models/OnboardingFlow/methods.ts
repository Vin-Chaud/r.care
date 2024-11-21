import assert from "assert";
import {
  array,
  boolean,
  literal,
  never,
  number,
  string,
  union,
  ZodType,
} from "zod";
import { AllMetrics, Metric, Symptom } from "../Metric";
import {
  FlowRootSection as FlowSection,
  FlowSubsection,
  OnboardingFlow,
  ResponseEcho,
  Step,
  YesNoScoring,
} from "./model";

export interface Cursor {
  currentSectionIndex: number;
  currentSubsectionIndex: number;
  currentStepIndex: number;
}

export interface ResolvedStep<StepType extends Step = Step> {
  stepId: string;
  stepDefinition: StepType;
  sectionTitle: string | { branding: true };

  tickerSubsectionLengths: readonly number[];
  tickerStepIndex: number;
}

export function resolveStep(
  model: OnboardingFlow,
  cursor: Cursor
): ResolvedStep {
  const section = model.sections[cursor.currentSectionIndex];
  if (!section) {
    throw Error(
      `Section index out of range at cursor ${JSON.stringify(cursor)}`
    );
  }

  const subsection = section.subsections[cursor.currentSubsectionIndex];
  if (!subsection) {
    throw Error(
      `Subsection index out of range at cursor ${JSON.stringify(cursor)}`
    );
  }

  const stepId = subsection.step_order[cursor.currentStepIndex];
  if (stepId == null) {
    throw Error(`Step index out of range at cursor ${JSON.stringify(cursor)}`);
  }

  const getStepDefinition = (stepId: string, subsection: FlowSubsection) =>
    getStepDefinitionWithFallback(stepId, subsection, section, model);

  const stepDefinition = getStepDefinition(stepId, subsection);
  if (!stepDefinition) {
    throw Error(
      `Step definition not found for step ${stepId} at cursor ${JSON.stringify(
        cursor
      )}`
    );
  }

  const tickerStepMask = section.subsections.map((subsection) =>
    subsection.step_order.map((stepId) => {
      const stepDefinition = getStepDefinition(stepId, subsection);
      return stepDefinition && isQuizStep(stepDefinition);
    })
  );

  const subsectionLengths = tickerStepMask.map(
    (mask) => mask.filter(Boolean).length
  );

  const tickerStepIndex = tickerStepMask[cursor.currentSubsectionIndex]
    .slice(0, cursor.currentStepIndex)
    .filter(Boolean).length;

  return {
    sectionTitle: section.title,
    stepId,
    stepDefinition,
    tickerSubsectionLengths: subsectionLengths,
    tickerStepIndex,
  };
}

export function getStepDefinitionWithFallback(
  stepId: string,
  subsection: FlowSubsection,
  section: FlowSection,
  root: OnboardingFlow
) {
  return (
    subsection.step_definitions?.[stepId] ??
    section.step_definitions?.[stepId] ??
    root.step_definitions?.[stepId] ??
    null
  );
}

/**
 * Move to the previous step of the flow.
 *
 * @param cursor Must be a valid cursor, i.e. if passed to `resolvedStep`,
 * with the same model provided here, it should return a non-null result.
 *
 * @param model The model is used to look up subsections and sections and their
 * lengths. It too must be valid -- there must be no empty sections and no
 * empty subsections.
 *
 * @returns
 */
export function gotoPreviousStep(cursor: Cursor, model: OnboardingFlow) {
  // If we are not at the first step of the flow, we can simply go back one step.
  if (cursor.currentStepIndex > 0) {
    return {
      ...cursor,
      currentStepIndex: cursor.currentStepIndex - 1,
    };
  }

  // If we are at the first step of the non-first subsection,
  // we can go back to the last step of the previous subsection.
  if (cursor.currentSubsectionIndex > 0) {
    const previousSubsection: FlowSubsection =
      model.sections[cursor.currentSectionIndex]?.subsections[
        cursor.currentSubsectionIndex - 1
      ];

    const lastStepIndexOfPreviousSubsection =
      previousSubsection.step_order.length - 1;
    return {
      ...cursor,
      currentSubsectionIndex: cursor.currentSubsectionIndex - 1,
      currentStepIndex: lastStepIndexOfPreviousSubsection,
    };
  }

  // If we are at the first step of the first subsection of a non-first section,
  // we can go back to the last step of the last subsection of the previous section.
  if (cursor.currentSectionIndex > 0) {
    const previousSection = model.sections[cursor.currentSectionIndex - 1];
    const lastSubsectionOfPreviousSection =
      previousSection.subsections.length - 1;
    const lastStepIndexOfLastSubsection =
      previousSection.subsections[lastSubsectionOfPreviousSection].step_order
        .length - 1;

    return {
      currentSectionIndex: cursor.currentSectionIndex - 1,
      currentSubsectionIndex: lastSubsectionOfPreviousSection,
      currentStepIndex: lastStepIndexOfLastSubsection,
    };
  }

  // If we are at the first step of the first subsection of the first section,
  // we cannot go back any further.
  return null;
}

/**
 * Move to the next step of the flow.
 *
 * @param cursor Must be a valid cursor, i.e. if passed to `resolvedStep`,
 * with the same model provided here, it should return a non-null result.
 *
 * @param model The model is used to look up subsections and sections and their
 * lengths. It too must be valid -- there must be no empty sections and no
 * empty subsections.
 *
 * @returns
 */
export function gotoNextStep(cursor: Cursor, model: OnboardingFlow) {
  const currentSection = model.sections[cursor.currentSectionIndex];
  const currentSubsection =
    currentSection.subsections[cursor.currentSubsectionIndex];

  // We first try to just naively advance the step index.
  const nextStepIndex = cursor.currentStepIndex + 1;

  // If the new step actually exists, that's fine.
  if (nextStepIndex < currentSubsection.step_order.length) {
    return {
      ...cursor,
      currentStepIndex: nextStepIndex,
    };
  }

  // If the new step does not exist, we need to advance the subsection index.
  // If that subsection exist, that's fine.
  const nextSubsectionIndex = cursor.currentSubsectionIndex + 1;
  if (nextSubsectionIndex < currentSection.subsections.length) {
    return {
      ...cursor,
      currentSubsectionIndex: nextSubsectionIndex,
      currentStepIndex: 0,
    };
  }

  // If the new subsection does not exist, we need to advance the section index.
  // If that section exist, that's fine.
  const nextSectionIndex = cursor.currentSectionIndex + 1;
  if (nextSectionIndex < model.sections.length) {
    return {
      currentSectionIndex: nextSectionIndex,
      currentSubsectionIndex: 0,
      currentStepIndex: 0,
    };
  }

  // At this point, we have reached the end of the flow.
  return null;
}

export function isQuizStep(step: Step) {
  return (
    step.type === "single_select" ||
    step.type === "multi_select" ||
    step.type === "yes_no" ||
    step.type === "scale" ||
    step.type === "free_text" ||
    step.type === "integer"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyZodType = ZodType<any, any, any>;

export function getStepResponseValidator(step: Step): AnyZodType | null {
  switch (step.type) {
    case "single_select": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return union(step.options.map((option) => literal(option.value)) as any);
    }
    case "multi_select": {
      return array(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        union(step.options.map((option) => literal(option.value)) as any)
      );
    }
    case "yes_no":
      return boolean();

    case "scale":
      return number()
        .int()
        .min(1)
        .max(step.custom_labels?.length ?? STANDARD_SCALE_RESPONSE_COUNT);

    case "free_text": {
      switch (step.format) {
        case "email": {
          return string().email();
        }
        default: {
          return never();
        }
      }
    }

    case "integer": {
      return number().int().min(step.min).max(step.max);
    }

    case "info":
    case "story": {
      return null;
    }
  }
}

export function areCursorsEqual(cursor1: Cursor, cursor2: Cursor) {
  return (
    cursor1.currentSectionIndex === cursor2.currentSectionIndex &&
    cursor1.currentSubsectionIndex === cursor2.currentSubsectionIndex &&
    cursor1.currentStepIndex === cursor2.currentStepIndex
  );
}

export function getCursorHookDeps(cursor: Cursor) {
  return [
    cursor.currentSectionIndex,
    cursor.currentSubsectionIndex,
    cursor.currentStepIndex,
  ];
}

/**
 * Computes percentage scores for every metric based on all responses.
 */
export function computePercentageScores(
  model: OnboardingFlow,
  responses: Readonly<Record<string, unknown>>
) {
  let cursor: Cursor | null = {
    currentSectionIndex: 0,
    currentSubsectionIndex: 0,
    currentStepIndex: 0,
  };

  const scores = Object.fromEntries(
    AllMetrics.map((metric) => [metric, 0 as number] as const)
  ) as Record<Metric, number>;
  const maxScores = Object.fromEntries(
    AllMetrics.map((metric) => [metric, 0 as number] as const)
  ) as Record<Metric, number>;

  while (cursor) {
    const { stepDefinition, stepId } = resolveStep(model, cursor);
    const response = Object.hasOwn(responses, stepId)
      ? responses[stepId]
      : null;

    const scoreContribution = computeScoreFromStep(stepDefinition, response);
    if (scoreContribution) {
      scores[scoreContribution.metric] += scoreContribution.responseScore;
      maxScores[scoreContribution.metric] += scoreContribution.maxScore;
    }

    cursor = gotoNextStep(cursor, model);
  }

  const percentageScores = Object.fromEntries(
    AllMetrics.map((metric) => [
      metric,
      (100 * scores[metric]) / maxScores[metric],
    ])
  ) as Record<Metric, number>;

  return percentageScores;
}

function computeScoreFromStep(
  stepDefinition: Step,
  response: unknown
): ScoreContribution | null {
  switch (stepDefinition.type) {
    case "yes_no": {
      assert(typeof response === "boolean", "Expected a boolean response");
      if (stepDefinition.scoring == null) {
        return null;
      }

      return computeYesNoScoring(response, stepDefinition.scoring);
    }

    case "scale": {
      assert(typeof response === "number", "Expected a numeric response");
      if (stepDefinition.scoring == null) {
        return null;
      }
      const scoring = stepDefinition.scoring;

      let value = response;
      const stepCount =
        stepDefinition.preset === "custom"
          ? stepDefinition.custom_labels?.length ??
            STANDARD_SCALE_RESPONSE_COUNT
          : STANDARD_SCALE_RESPONSE_COUNT;
      value = Math.max(value, 1);
      value = Math.min(value, stepCount);

      const scalingFactor = scoring.scaling_factor ?? 1;

      let score = value * scalingFactor;
      const maxScore =
        (scoring.max_unscaled_score ?? stepCount) * scalingFactor;
      score = Math.min(score, maxScore);

      return { responseScore: score, maxScore, metric: scoring.target_metric };
    }

    default: {
      return null;
    }
  }
}

function computeYesNoScoring(
  response: boolean,
  scoring: YesNoScoring
): ScoreContribution {
  let score = scoring.yes_high ? (response ? 1 : 0) : response ? 0 : 1;
  let maxUnscaledScore = scoring.max_unscaled_score;
  switch (scoring.mode) {
    case "pos_neg": {
      score = (score - 0.5) * 2;
      maxUnscaledScore = maxUnscaledScore ?? 1;
      break;
    }
    case "1_5": {
      score = score * 4 + 1;
      maxUnscaledScore = maxUnscaledScore ?? 5;
      break;
    }
    default: {
      scoring.mode satisfies never;
      throw Error(`Unsupported yes/no scoring mode: ${scoring.mode}`);
    }
  }

  const scoringFactor = scoring.scaling_factor ?? 1;
  score = score * scoringFactor;
  const maxScore = maxUnscaledScore * scoringFactor;
  return {
    responseScore: score,
    maxScore,
    metric: scoring.target_metric,
  };
}

export function computeTotalScore(
  metricScores: Readonly<Record<Symptom, number>>
) {
  return Number(
    (
      (Object.values(Symptom)
        .map((symptom) => metricScores[symptom] ?? 0)
        .reduce((a, b) => a + b, 0) /
        Object.values(Symptom).length) *
      (100 / 85)
    ).toFixed(0)
  );
}

interface ScoreContribution {
  responseScore: number;
  maxScore: number;
  metric: Metric;
}

export enum ScoreZone {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  VeryHigh = "VeryHigh",
}

export const ScoreZoneCutoffs: Readonly<
  Record<Exclude<ScoreZone, ScoreZone.VeryHigh>, number>
> = {
  [ScoreZone.Low]: 40,
  [ScoreZone.Medium]: 65,
  [ScoreZone.High]: 85,
};

export function getScoreZone(percentage: number): ScoreZone {
  percentage = Number(percentage.toFixed(0));
  if (percentage <= ScoreZoneCutoffs.Low) {
    return ScoreZone.Low;
  }
  if (percentage <= ScoreZoneCutoffs.Medium) {
    return ScoreZone.Medium;
  }
  if (percentage <= ScoreZoneCutoffs.High) {
    return ScoreZone.High;
  }
  return ScoreZone.VeryHigh;
}

const STANDARD_SCALE_RESPONSE_COUNT = 5;

export function getEchoText(
  responses: Readonly<Record<string, unknown>>,
  spec: ResponseEcho
) {
  let response = Object.hasOwn(responses, spec.step_id)
    ? responses[spec.step_id]
    : null;

  // For multi-answer, prioiritize the first response
  if (Array.isArray(response)) {
    if (spec.multi_select_priority != null) {
      for (const option of spec.multi_select_priority) {
        if (response.includes(option)) {
          response = option;
          break;
        }
      }
    } else {
      response = response[0];
    }
  }

  if (response != null && Object.hasOwn(spec.echo_mapping, String(response))) {
    return spec.echo_mapping[String(response)];
  }

  return spec.echo_default;
}
