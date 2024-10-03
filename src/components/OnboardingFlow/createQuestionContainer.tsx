"use client";
import { globalContext } from "@/context/GlobalContext";
import {
  EmbeddedFeedback,
  Feedback,
  FeedbackReference,
  FullFeedback,
  QuestionCommon,
} from "@/models/OnboardingFlow/model";
import { ComponentType, useCallback, useContext, useState } from "react";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { QuestionHeader } from "./QuestionHeader";
import { AnswerValue } from "./types";

export function createQuestionContainer<
  A extends AnswerValue,
  S extends QuestionCommon,
  P
>(
  QuestionBody: ComponentType<
    P & {
      stepDefinition: S;
      submitAnswer: (
        a: A,
        feedbackOrRef?: Feedback | FeedbackReference | null
      ) => void;
      hasAnswered: boolean;
    }
  >
): ComponentType<
  P & { stepId: string; stepDefinition: S; onDidAnswer?: () => void }
> {
  return (props) => {
    const waitTime = useContext(globalContext).questionTransitionTime;
    const { setResponse, next } = useContext(onboardingFlowContext);
    const [embeddedFeedback, setEmbeddedFeedback] =
      useState<EmbeddedFeedback | null>(null);
    const [fullFeedback, setFullFeedback] = useState<FullFeedback | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    const submitAnswer = useCallback(
      (value: A, feedbackOrRef?: Feedback | FeedbackReference | null) => {
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
        {embeddedFeedback && (
          <div>
            <div>{embeddedFeedback.text}</div>
            <button onClick={next}>{"Continue"}</button>
          </div>
        )}
      </div>
    );

    if (fullFeedback) {
      return (
        <div>
          {fullFeedback.contents.map((content, index) => {
            switch (content.type) {
              case "emoji": {
                return <span key={index}>{content.emoji}</span>;
              }
              case "image": {
                return <pre>(placeholder for image ${content.graphic_id})</pre>;
              }
              case "text": {
                return <p key={index}>{content.text}</p>;
              }
              case "title": {
                return <h2 key={index}>{content.text}</h2>;
              }
              default: {
                return null;
              }
            }
          })}
          <button type="button" onClick={next}>
            {"Continue"}
          </button>
        </div>
      );
    }

    return renderedChild;
  };
}
