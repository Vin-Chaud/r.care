import { saveQuizData } from "@/actions/saveQuizData";
import { useOnboardingFlow } from "@/context/OnboardingFlowContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { KnowledgeIntroPane } from "./KnowledgeIntroPane";
import { KnowledgePlan } from "./KnowledgePlan";
import { KnowledgeScorePage } from "./KnowledgeScore";
import { PostQuizPane } from "./PostQuizPane";
import { ProgramPage } from "./ProgramPage";
import { QuizResultPage } from "./QuizResultPage";
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
}: {
  responses: Readonly<Record<string, unknown>>;
}) {
  const router = useRouter();
  const [page, setPage] = useState(Page.QuizResult);
  const flow = useOnboardingFlow();

  switch (page) {
    case Page.QuizResult: {
      return (
        <QuizResultPage
          responses={responses}
          flow={flow}
          onNext={(reaction) => {
            saveQuizData({ [flow.reaction_step_id]: reaction }, null);
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
      return (
        <Testimonial
          onNext={() => {
            router.push("/paywall");
          }}
        />
      );
    }

    default: {
      return <div>{page}</div>;
    }
  }
}
