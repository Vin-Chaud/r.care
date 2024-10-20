"use client";

import { useOnboardingFlow } from "@/context/OnboardingFlowContext";
import {
  gotoNextStep,
  gotoPreviousStep,
  ResolvedStep,
  resolveStep,
} from "@/models/OnboardingFlow/methods";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { ErrorScreen } from "../ErrorScreen";
import {
  OnboardingFlowContext,
  onboardingFlowContext,
} from "./onboardingFlowContext";
import {
  loadStateFromSessionStorage,
  saveStateToSessionStorage,
} from "./state_persistence";
import { StepScreen } from "./StepScreen";
import { OnboardingFlowState } from "./types";

export function OnboardingFlow({
  onBackNavigated,
  onFlowComplete,
  onResponseUpdate,
}: {
  onBackNavigated: () => void;
  onFlowComplete: () => void;
  onResponseUpdate: (state: Readonly<Record<string, unknown>>) => void;
}) {
  const spec = useOnboardingFlow();
  const initialState = useMemo<OnboardingFlowState>(
    () => ({
      cursor: {
        currentSectionIndex: 0,
        currentStepIndex: 0,
        currentSubsectionIndex: 0,
      },
      responses: {},
    }),
    []
  );

  const [isRestored, setIsRestored] = useState(false);
  const [state, updateState] = useReducer(
    (
      state: OnboardingFlowState,
      action: (state: OnboardingFlowState) => OnboardingFlowState
    ) => action(state),
    initialState
  );

  useEffect(() => {
    if (isRestored) {
      saveStateToSessionStorage(state);
    }
  }, [isRestored, state]);

  useEffect(() => {
    if (isRestored) {
      onResponseUpdate(state.responses);
    }
  }, [isRestored, state.responses]);

  useLayoutEffect(() => {
    if (!isRestored) {
      updateState(
        () =>
          loadStateFromSessionStorage(spec) || {
            cursor: {
              currentSectionIndex: 0,
              currentSubsectionIndex: 0,
              currentStepIndex: 0,
            },
            responses: {},
          }
      );
      setIsRestored(true);
    }
  }, [isRestored]);

  const backButtonOverride = useRef<(() => void) | null>(null);

  if (isRestored == false) {
    return null;
  }

  let currentStep: ResolvedStep;
  try {
    currentStep = resolveStep(spec, state.cursor);
  } catch {
    return (
      <ErrorScreen
        clientMessage="Unexpected"
        diagnostics={["Failed to resolve current step at cursor", state.cursor]}
      />
    );
  }

  const context: OnboardingFlowContext = {
    state: state,
    setResponse: (stepId, value) => {
      updateState((state) => ({
        cursor: state.cursor,
        responses: {
          ...state.responses,
          [stepId]: value,
        },
      }));
    },
    back: () => {
      if (backButtonOverride.current) {
        backButtonOverride.current();
        return;
      }

      const newCursor = gotoPreviousStep(state.cursor, spec);
      if (newCursor) {
        updateState((state) => ({
          responses: state.responses,
          cursor: newCursor,
        }));
      } else {
        onBackNavigated();
      }
    },
    next: () => {
      const newCursor = gotoNextStep(state.cursor, spec);
      if (newCursor) {
        // This is where the reducer way of updating state becomes
        // really important. If we were just to set the state based on
        // the `state` above, we would lose the responses that were
        // set in the current step when `setResponse` is called,
        // because of the way state is captured in the closure.
        updateState((state) => ({
          responses: state.responses,
          cursor: newCursor,
        }));
      } else {
        onFlowComplete();
      }
    },
  };

  return (
    <onboardingFlowContext.Provider value={context}>
      <StepScreen {...currentStep} />
    </onboardingFlowContext.Provider>
  );
}
