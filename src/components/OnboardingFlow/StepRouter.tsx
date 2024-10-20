"use client";
import { FullFeedback, Step } from "@/models/OnboardingFlow/model";
import { FreeTextInputStep } from "./FreeTextInputStep";
import { InfoStep } from "./InfoStep";
import { IntegerInputStep } from "./IntegerInputStep";
import { MultiSelectStep } from "./MultiSelectStep";
import { ScaleStep } from "./ScaleStep";
import { SingleSelectStep } from "./SingleSelectStep";
import { StoryStep } from "./StoryStep";
import { UnimplementedStep } from "./UnimplementedStep";
import { YesNoStep } from "./YesNoStep";

export function StepRouter({
  stepDefinition,
  stepId,
  onDidRespond,
}: {
  stepDefinition: Step;
  stepId: string;
  onDidRespond?: (
    shouldAdvance: boolean | { fullFeedback: FullFeedback }
  ) => void;
}) {
  switch (stepDefinition.type) {
    case "single_select": {
      return (
        <SingleSelectStep
          key={stepId}
          stepDefinition={stepDefinition}
          stepId={stepId}
          onDidAnswer={onDidRespond}
        />
      );
    }

    case "multi_select": {
      return (
        <MultiSelectStep
          key={stepId}
          stepId={stepId}
          stepDefinition={stepDefinition}
          onDidAnswer={onDidRespond}
        />
      );
    }

    case "scale": {
      return (
        <ScaleStep
          key={stepId}
          stepDefinition={stepDefinition}
          stepId={stepId}
          onDidAnswer={onDidRespond}
        />
      );
    }

    case "yes_no": {
      return (
        <YesNoStep
          key={stepId}
          stepDefinition={stepDefinition}
          stepId={stepId}
          onDidAnswer={onDidRespond}
        />
      );
    }

    case "integer": {
      return (
        <IntegerInputStep
          key={stepId}
          stepId={stepId}
          stepDefinition={stepDefinition}
          onDidAnswer={onDidRespond}
        />
      );
    }

    case "free_text": {
      return (
        <FreeTextInputStep
          key={stepId}
          stepId={stepId}
          stepDefinition={stepDefinition}
          onDidAnswer={onDidRespond}
        />
      );
    }

    case "story": {
      return <StoryStep key={stepId} stepDefinition={stepDefinition} />;
    }

    case "info": {
      return <InfoStep key={stepId} stepDefinition={stepDefinition} />;
    }

    default:
      return (
        <UnimplementedStep
          key={stepId}
          stepDefinition={stepDefinition}
          onDidClickContinue={() => onDidRespond?.(true)}
        />
      );
  }
}
