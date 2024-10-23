"use client";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { globalContext } from "@/context/GlobalContext";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import {
  EmbeddedFeedback as EmbeddedFeedbackModel,
  Feedback as FeedbackModel,
  FeedbackReference,
  FullFeedback as FullFeedbackModel,
  QuestionCommon,
} from "@/models/OnboardingFlow/model";
import { ComponentType, useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { QuestionHeader } from "./QuestionHeader";
import { RichText } from "./RichText";
import { AnswerValue } from "./types";
import { fadeIn } from "@/utils/style_partials";

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
      onDidAnswer?: (
        autoNext: boolean | { fullFeedback: FullFeedbackModel }
      ) => void;
      setResponse?: (stepId: string, value: A) => void;
    }
  ) {
    const contextSetResponse = useContext(onboardingFlowContext);
    const setResponse = props.setResponse ?? contextSetResponse.setResponse;
    const [embeddedFeedback, setEmbeddedFeedback] =
      useState<EmbeddedFeedbackModel | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const { stepId, stepDefinition, onDidAnswer } = props;

    const submitAnswer = useCallback(
      (value: A, feedbackOrRef?: FeedbackModel | FeedbackReference | null) => {
        setResponse(stepId, value);
        setHasAnswered(true);

        const feedback = resolveFeedback(feedbackOrRef, stepDefinition);
        if (feedback == null) {
          onDidAnswer?.(true);
          return;
        }

        if (feedback.type === "embedded") {
          setEmbeddedFeedback(feedback);
          onDidAnswer?.(false);
          return;
        }

        onDidAnswer?.({ fullFeedback: feedback });
      },
      [stepId, stepDefinition, onDidAnswer]
    );

    return (
      <QuestionLayout>
        <QuestionHeader {...props.stepDefinition} />
        <QuestionBodyContainer>
          <QuestionBody
            {...props}
            submitAnswer={submitAnswer}
            stepDefinition={props.stepDefinition as S}
            hasAnswered={hasAnswered}
          />
        </QuestionBodyContainer>
        {embeddedFeedback && <EmbeddedFeedback feedback={embeddedFeedback} />}
      </QuestionLayout>
    );
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
    <EmbeddedFeedbackLayout>
      <EmbeddedFeedbackBox>
        {paragraphs.map((text, index) => (
          <RichText key={index}>{text}</RichText>
        ))}
      </EmbeddedFeedbackBox>
      <ForwardNavButton onClick={next} />
    </EmbeddedFeedbackLayout>
  );
}

const QuestionLayout = styled.section`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${fadeIn}
`;

const QuestionBodyContainer = styled.section`
  flex-grow: 1;
  width: 100%;
`;

const EmbeddedFeedbackLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block: 20px;

  ${fadeIn}
`;

const EmbeddedFeedbackBox = styled.div`
  background-color: ${Purples.PurpleF9};
  padding-inline: 20px;
  padding-block: 10px;
  border-radius: 20px;
  ${Fonts.SFPro};
  font-size: 13px;
  line-height: 18px;
  color: ${Greys.Grey4D};
  margin-block: 13px;
  width: 100%;
  box-sizing: border-box;
`;
