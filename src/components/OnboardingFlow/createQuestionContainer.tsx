"use client";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { globalContext } from "@/context/GlobalContext";
import {
  EmbeddedFeedback as EmbeddedFeedbackModel,
  Feedback as FeedbackModel,
  FeedbackReference,
  FullFeedback as FullFeedbackModel,
  QuestionCommon,
} from "@/models/OnboardingFlow/model";
import {
  ComponentType,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FullFeedback } from "./FullFeedback";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { QuestionHeader } from "./QuestionHeader";
import { RichText } from "./RichText";
import { AnswerValue } from "./types";
import styled from "styled-components";
import { Purples } from "@/design_components/design_system";

export interface QuestionContainerProps<
  S extends QuestionCommon,
  A extends AnswerValue
> {
  stepDefinition: S;
  submitAnswer: SubmitAnswerAction<A>;
  hasAnswered: boolean;
}

export type SubmitAnswerAction<A extends AnswerValue> = (
  a: A,
  feedbackOrRef?: FeedbackModel | FeedbackReference | null
) => void;

export function createQuestionContainer<
  A extends AnswerValue,
  S extends QuestionCommon,
  P = object
>(QuestionBody: ComponentType<P & QuestionContainerProps<S, A>>) {
  function QuestionContainer(
    props: P & {
      stepId: string;
      stepDefinition: S;
      onDidAnswer?: (autoNext: boolean) => void;
    }
  ) {
    const waitTime = useContext(globalContext).questionTransitionTime;
    const { setResponse, overrideBackAction } = useContext(
      onboardingFlowContext
    );
    const [embeddedFeedback, setEmbeddedFeedback] =
      useState<EmbeddedFeedbackModel | null>(null);
    const [fullFeedback, setFullFeedback] = useState<FullFeedbackModel | null>(
      null
    );
    const [hasAnswered, setHasAnswered] = useState(false);
    const { stepId, stepDefinition, onDidAnswer } = props;

    const submitAnswer = useCallback(
      (value: A, feedbackOrRef?: FeedbackModel | FeedbackReference | null) => {
        setResponse(stepId, value);
        setHasAnswered(true);

        const feedback = resolveFeedback(feedbackOrRef, stepDefinition);
        switch (feedback?.type) {
          case "embedded": {
            setEmbeddedFeedback(feedback);
            break;
          }

          case "full": {
            setTimeout(() => {
              setFullFeedback(feedback);
            }, waitTime);
            break;
          }
        }

        // If there's no feedback, we can auto-tick to the next question
        const autoNext = feedback == null;
        onDidAnswer?.(autoNext);
      },
      [stepId, stepDefinition, onDidAnswer]
    );

    const renderedChild = (
      <div>
        <QuestionHeader {...props.stepDefinition} />
        <QuestionBody
          {...props}
          submitAnswer={submitAnswer}
          stepDefinition={props.stepDefinition as S}
          hasAnswered={hasAnswered}
        />
        {embeddedFeedback && <EmbeddedFeedback feedback={embeddedFeedback} />}
      </div>
    );

    useEffect(() => {
      // When we're showing the full feedback, we override the back button
      // to hiding the feedback and showing the question again. Note that,
      // because the question body is unmounted when the feedback is rendered,
      // the newly rendered question body's state will be a blank slate and so
      // the question can be re-attempted.
      //
      // If we don't do this, the back button would take the user to the question
      // _before_ the one they just answered, which is not what we want.
      if (fullFeedback != null) {
        return overrideBackAction(() => {
          setFullFeedback(null);
          setHasAnswered(false);
        });
      }
    }, [fullFeedback != null]);

    if (fullFeedback) {
      return <FullFeedback feedback={fullFeedback} />;
    }

    return renderedChild;
  }

  QuestionContainer.displayName =
    (QuestionBody.displayName || "Question") + "_Container";

  return QuestionContainer;
}

function resolveFeedback(
  feedbackOrRef: FeedbackModel | FeedbackReference | null | undefined,
  stepDefinition: QuestionCommon
) {
  feedbackOrRef = feedbackOrRef ?? stepDefinition.base_feedback;
  const feedback =
    feedbackOrRef == null
      ? null
      : (feedbackOrRef.type == null
          ? stepDefinition.feedback_definitions?.[feedbackOrRef.id]
          : feedbackOrRef) ?? null;
  return feedback;
}

function EmbeddedFeedback({ feedback }: { feedback: EmbeddedFeedbackModel }) {
  const { next } = useContext(onboardingFlowContext);
  const paragraphs =
    typeof feedback.text === "string" ? [feedback.text] : feedback.text;
  return (
    <div>
      {paragraphs.map((text, index) => (
        <RichText key={index}>{text}</RichText>
      ))}
      <ForwardNavButton onClick={next} />
    </div>
  );
}

const QuestionLayout = styled.section`
  background-color: ${Purples.PurpleF5_Undocumented};
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
