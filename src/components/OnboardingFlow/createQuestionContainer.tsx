"use client";
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
  P
>(
  QuestionBody: ComponentType<P & QuestionContainerProps<S, A>>
): ComponentType<
  P & {
    stepId: string;
    stepDefinition: S;
    onDidAnswer?: () => void;
  }
> {
  return (props) => {
    const waitTime = useContext(globalContext).questionTransitionTime;
    const { setResponse, next, overrideBackAction } = useContext(
      onboardingFlowContext
    );
    const [embeddedFeedback, setEmbeddedFeedback] =
      useState<EmbeddedFeedbackModel | null>(null);
    const [fullFeedback, setFullFeedback] = useState<FullFeedbackModel | null>(
      null
    );
    const [hasAnswered, setHasAnswered] = useState(false);

    const submitAnswer = useCallback(
      (value: A, feedbackOrRef?: FeedbackModel | FeedbackReference | null) => {
        const { stepId, stepDefinition, onDidAnswer } = props;
        setResponse(stepId, value);
        setHasAnswered(true);
        onDidAnswer?.();

        feedbackOrRef = feedbackOrRef ?? stepDefinition.base_feedback;
        const feedback =
          feedbackOrRef == null
            ? null
            : (feedbackOrRef.type == null
                ? stepDefinition.feedback_definitions?.[feedbackOrRef.id]
                : feedbackOrRef) ?? null;

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

          default: {
            setTimeout(() => {
              next();
            }, waitTime);
            break;
          }
        }
      },
      [props.stepId, props.stepDefinition, props.onDidAnswer]
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
  };
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
      <button onClick={next}>{"Continue"}</button>
    </div>
  );
}
