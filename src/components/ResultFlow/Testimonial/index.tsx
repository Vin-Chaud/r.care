import Image from "next/image";

import { ForwardNavButton } from "@/components/ForwardNavButton";
import {
  createMarkdownText,
  MarkdownText,
} from "@/design_components/typography/MarkdownText";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import {
  useOnboardingFlow,
  useOnboardingFlowImageUrls,
} from "@/context/OnboardingFlowContext";
import {
  ScrollablePageContentFrame,
  ScrollablePageLayoutContainer,
} from "@/design_components/PageLayout";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import styled from "styled-components";
import { AppHeader } from "@/components/AppHeader";

const interview = [
  {
    question: "How did binge eating impact your life before R.care?",
    answer:
      "Binge eating took over my life in ways I never expected. I was **constantly out of control around food**, eating way more than I needed, and then feeling **incredibly sick and guilty afterward.** It really took a toll on my **self-esteem, messed with my relationships, and even disrupted my sleep.** The more I stressed about food, the more I struggled to feel normal around it—I just couldn’t **break the cycle on my own.**",
  },
  {
    question: "How has R.care helped you?",
    answer:
      "This program has been **a total game-changer** for me. It opened my eyes to all the **different reasons behind my binge eating**—things I never even realized before! I also got **practical tools to help manage my emotions** and understand my hunger cues better. I’ve learned to recognize my triggers and eat more mindfully. For the first time in a long while, I **actually feel in control again.** It’s also made a big difference in how I show up in my relationships and at work.",
  },
  {
    question: "What would you tell someone curious about trying out R.care?",
    answer:
      "I’d tell them to definitely give it a shot. It’s not just about stopping binge eating—it’s about really **getting to know yourself** and **finding that sense of control and focus again.** The program is supportive, practical, and helps you improve your life in a holistic way. When your relationship with food is a mess, it can **throw everything—your mind, body, and life—into chaos. This is your chance to take back control.**",
  },
];

export function Testimonial({ onNext }: { onNext: () => void }) {
  const flow = useOnboardingFlow();
  const imageUrl = useOnboardingFlowImageUrls()[flow.testimonial_graphic_id];
  return (
    <ScrollablePageLayoutContainer>
      <ScrollablePageContentFrame background={Greys.White}>
        <article>
          <AppHeader>{{ branding: true }}</AppHeader>
          <HeaderImageGroup>
            <Header>
              <p>{"Jenni’s personal story"}</p>
              <h2>{"From chaos to control"}</h2>
            </Header>
            <Graphic src={imageUrl} />
          </HeaderImageGroup>
          {interview.map(({ question, answer }, itemIndex) => (
            <Interview key={itemIndex} question={question} answer={answer} />
          ))}
          <ForwardNavButton onClick={onNext} />
        </article>
      </ScrollablePageContentFrame>
    </ScrollablePageLayoutContainer>
  );
}

function Interview({ answer, question }: { answer: string; question: string }) {
  return (
    <InterviewSection>
      <header>
        <InterviewHeader>{question}</InterviewHeader>
      </header>
      <InterviewContent>{answer}</InterviewContent>
    </InterviewSection>
  );
}

const HeaderImageGroup = styled.div`
  position: relative;
`;

const Header = styled.header`
  width: 189px;
  height: 133px;
  top: 88px;
  left: 30px;
  gap: 0px;
  border-radius: 15px;
  opacity: 0px;
  z-index: 1;
  background-color: ${Purples.Purple94};
  ${Fonts.SFPro}
  padding:10px 20px 16px;
  box-sizing: border-box;
  color: ${Greys.White};
  margin-bottom: 200px;
  position: relative;
  top: 0px;
  left: 0px;

  p {
    font-size: 12px;
    font-weight: 400;
  }

  h2 {
    font-size: 22px;
    font-weight: 800;
    width: 140px;
  }
`;

const Graphic = styled.img`
  max-width: 180px;
  z-index: 0;
  position: absolute;
  top: 40px;
  right: 0px;
`;

const InterviewSection = styled.section`
  margin-bottom: 25px;
  border: 1px solid ${Greys.GreyD1};
  border-radius: 15px;
  padding: 25px 15px;
`;

const InterviewHeader = styled.h3`
  margin-top: 0px;
  margin-bottom: 25px;

  ${Fonts.SFPro};
  font-weight: 500;
  font-size: 14px;
`;

const InterviewContent = createMarkdownText(styled.p`
  ${Fonts.Montserrat};
  font-size: 11px;
  font-weight: 400;

  strong {
    font-weight: 700;
  }

  color: ${Greys.Black};
  margin-block: 0px;
  padding: 25px;
  background-color: ${Purples.PurpleF5_Undocumented};
  border-radius: 15px;
`);
