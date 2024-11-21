"use client";

import { saveQuizCursor } from "@/actions/saveQuizCursor";
import { saveQuizData } from "@/actions/saveQuizData";
import { dispatchGoogleTagEvent } from "@/components/Tracking/GoogleTag";
import { dispatchStandardMetaEvent } from "@/components/Tracking/MetaPixel";
import { useOnboardingFlow } from "@/context/OnboardingFlowContext";
import {
  Cursor,
  gotoNextStep,
  gotoPreviousStep,
  ResolvedStep,
  resolveStep,
} from "@/models/OnboardingFlow/methods";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorScreen } from "../ErrorScreen";
import {
  OnboardingFlowContext,
  onboardingFlowContext,
} from "./onboardingFlowContext";
import { StepScreen } from "./StepScreen";
import { AnswerValue } from "./types";

export function OnboardingFlow({
  initialResponses,
  initialCursor,
}: {
  initialResponses: Readonly<Record<string, unknown>>;
  initialCursor: Cursor;
}) {
  const router = useRouter();
  const spec = useOnboardingFlow();
  const [cursor, setCursor] = useState(initialCursor);
  const [responses, setResponses] = useState(initialResponses);

  let currentStep: ResolvedStep;
  try {
    currentStep = resolveStep(spec, cursor);
  } catch {
    return (
      <ErrorScreen
        clientMessage="Unexpected"
        diagnostics={["Failed to resolve current step at cursor", cursor]}
      />
    );
  }

  const context: OnboardingFlowContext = {
    flow: spec,
    state: {
      cursor,
      responses: responses as Readonly<Record<string, AnswerValue>>,
    },
    setResponse: (stepId, value) => {
      saveQuizData({ [stepId]: value }, spec.email_step_id);
      setResponses((responses) => ({ ...responses, [stepId]: value }));
    },
    back: () => {
      const newCursor = gotoPreviousStep(cursor, spec);
      if (newCursor) {
        saveQuizCursor(newCursor);
        setCursor(newCursor);
      } else {
        router.back();
      }
    },
    next: async () => {
      const newCursor = gotoNextStep(cursor, spec);
      if (newCursor) {
        saveQuizCursor(newCursor);
        setCursor(newCursor);
      } else {
        dispatchGoogleTagEvent("generate_lead", { currency: "USD", value: 0 });
        dispatchStandardMetaEvent("Lead");
        await saveQuizCursor(true);
        router.push("/analysis");
      }
    },
  };

  return (
    <onboardingFlowContext.Provider value={context}>
      <StepScreen {...currentStep} />
    </onboardingFlowContext.Provider>
  );
}
