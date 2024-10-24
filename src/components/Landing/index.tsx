"use client";

import { saveQuizData } from "@/actions/saveQuizData";
import { RCareBrand } from "@/components/icons/RCareBrand";
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

export function Landing({ flow }: { flow: OnboardingFlow }) {
  const router = useRouter();

  return (
    <PageLayout background={landingStyle}>
      <LandingContentFrame>
        <RCareBrand />
        <LandingHeaderLayout>
          <LandingHeader>
            {"**Get a personalized program** to manage your binge eating ✨"}
          </LandingHeader>
        </LandingHeaderLayout>
        <LandingQuiz
          flow={flow}
          onDidAnswer={async (answer) => {
            await saveQuizData({ [flow.landing_quiz_step.id]: answer }, null);
            router.push("/quiz");
          }}
        />
      </LandingContentFrame>
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

const landingStyle = `
  linear-gradient(
    169.29deg,
    ${Purples.PurpleF3_Undocumented} 6.17%,
    ${Purples.PurpleFB_Undocumented} 61.87%,
    ${Greys.GreyF0} 99%
  )
`;

const LandingSection = styled.section`
  height: 100%;
  background: linear-gradient(
    169.29deg,
    ${Purples.PurpleF3_Undocumented} 6.17%,
    ${Purples.PurpleFB_Undocumented} 61.87%,
    ${Greys.GreyF0} 99%
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LandingContentFrame = styled.div`
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LandingHeaderLayout = styled.header`
  margin-top: 100px;
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
