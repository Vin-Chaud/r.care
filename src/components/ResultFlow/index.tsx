import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { useState } from "react";
import { QuizResultPage } from "./QuizResultPage";
import { PostQuizPane } from "./PostQuizPane";
import { ProgramPage } from "./ProgramPage";
import { KnowledgeIntroPane } from "./KnowledgeIntroPane";
import { KnowledgePlan } from "./KnowledgePlan";
import { KnowledgeScorePage } from "./KnowledgeScore";
import { Testimonial } from "./Testimonial";

enum Page {
  QuizResult = 1,
  PostQuiz = 2,
  Program = 3,
  KnowledgeIntro = 4,
  KnowledgeScore = 5,
  KnowledgePlan = 6,
  Testimonial = 7,
}

export function ResultFlow({
  responses,
  flow,
  onReactionDidAnswer,
  onNext,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
  onReactionDidAnswer: (reaction: string | null) => void;
  onNext: () => void;
}) {
  const [page, setPage] = useState(Page.QuizResult);

  switch (page) {
    case Page.QuizResult: {
      return (
        <QuizResultPage
          responses={responses}
          flow={flow}
          onNext={(reaction) => {
            onReactionDidAnswer(reaction);
            setPage(Page.PostQuiz);
          }}
        />
      );
    }

    case Page.PostQuiz: {
      return <PostQuizPane onNext={() => setPage(Page.Program)} />;
    }

    case Page.Program: {
      return (
        <ProgramPage
          responses={responses}
          flow={flow}
          onNext={() => setPage(Page.KnowledgeIntro)}
        />
      );
    }

    case Page.KnowledgeIntro: {
      return <KnowledgeIntroPane onNext={() => setPage(Page.KnowledgeScore)} />;
    }

    case Page.KnowledgeScore: {
      return (
        <KnowledgeScorePage
          responses={responses}
          flow={flow}
          onNext={() => setPage(Page.KnowledgePlan)}
        />
      );
    }

    case Page.KnowledgePlan: {
      return (
        <KnowledgePlan
          flow={flow}
          responses={responses}
          onNext={() => setPage(Page.Testimonial)}
        />
      );
    }

    case Page.Testimonial: {
      return <Testimonial flow={flow} onNext={onNext} />;
    }

    default: {
      return <div>{page}</div>;
    }
  }
}
