"use client";

import { saveQuizData } from "@/actions/saveQuizData";
import { RCareBrand } from "@/components/icons/RCareBrand";
import { dispatchGoogleTagEvent } from "@/components/Tracking/GoogleTag";
import {
  dispatchCustomMetaEvent,
  dispatchStandardMetaEvent,
} from "@/components/Tracking/MetaPixel";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import {
  LandingHeader,
  LandingQuizHelpText,
  LandingQuizTitle,
} from "@/design_components/typography";
import { useAutoCanceledTimeout } from "@/hooks/useAutoCanceledTimeout";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

import Lottie from "lottie-react";
import spinnerAnimation from "./spinner.json";
import { fadeIn } from "@/utils/style_partials";

export function Landing({ flow }: { flow: OnboardingFlow }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PageLayout background={landingStyle}>
      <LandingContentFrame>
        <RCareBrand />
        <LandingHeaderLayout>
          <LandingHeader>
           {"We coach.\nYou connect."}
          </LandingHeader>
        </LandingHeaderLayout>
        <LandingQuiz
          flow={flow}
          onDidAnswer={async (answer) => {
            dispatchGoogleTagEvent("quiz_started", { age: answer });
            dispatchCustomMetaEvent("QuizStarted", { age: answer });
            setIsLoading(true);
            await saveQuizData({ [flow.landing_quiz_step.id]: answer }, null);
            router.push("/quiz");
          }}
        />
      </LandingContentFrame>
      {isLoading && <LoaderOverlay />}
    </PageLayout>
  );
}

function LandingQuiz({
  flow,
  onDidAnswer,
}: {
  flow: OnboardingFlow;
  onDidAnswer(answer: string): void;
}) {
  const [answer, setAnswer] = useState<string | null>(null);
  const setTimeout = useAutoCanceledTimeout();

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const submitter = (ev.nativeEvent as SubmitEvent).submitter;
        if (submitter instanceof HTMLButtonElement) {
          setAnswer(submitter.value);
          setTimeout(() => onDidAnswer(submitter.value), 300);
        }
      }}
    >
      <LandingQuizTitle>{flow.landing_quiz_step.title}</LandingQuizTitle>
      <LandingQuizHelpText>
        {flow.landing_quiz_step.help_text}
      </LandingQuizHelpText>
      <QuizOptionList>
        {flow.landing_quiz_step.options.map((option) => (
          <QuizOptionItem key={option.value}>
            <QuizOptionButton
              postClicked={option.value === answer}
              type="submit"
              value={option.value}
              disabled={answer != null}
            >
              {option.text}
            </QuizOptionButton>
          </QuizOptionItem>
        ))}
      </QuizOptionList>
    </form>
  );
}

function LoaderOverlay() {
  return (
    <LoaderOverlayContainer>
      <Lottie animationData={spinnerAnimation} loop autoPlay />
    </LoaderOverlayContainer>
  );
}

const landingStyle = `
  linear-gradient(
    169.29deg,
    ${Purples.PurpleF3_Undocumented} 0%,
    ${Purples.PurpleFB_Undocumented} 0%,
    ${Greys.GreyF0} 99%
  )
`;

const LandingContentFrame = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LandingHeaderLayout = styled.header`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 25px;
`;

const QuizOptionList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  padding: 20px;
`;

const QuizOptionItem = styled.li`
  list-style: none;
`;

const QuizOptionButton = styled("button").withConfig({
  shouldForwardProp: (prop) => prop !== "postClicked",
})<{
  postClicked: boolean;
}>`
  width: 112.76px;
  height: 98.13px;
  border: none;
  border-radius: 17.22px;
  background: ${(props) =>
    props.postClicked ? Purples.PurpleB8_Undocumented : Purples.Purple94};
  box-shadow: 0px 3.44px 3.44px 0px #00000040;
  transition: background 0.3s;
  cursor: pointer;

  ${Fonts.SFPro}

  color: ${Greys.White};
  font-size: 20px;
`;

const LoaderOverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);

  ${fadeIn}
`;
