import { saveQuizData } from "@/actions/saveQuizData";
import { dispatchGoogleTagEvent } from "@/components/Tracking/GoogleTag";
import { dispatchStandardMetaEvent } from "@/components/Tracking/MetaPixel";
import { useOnboardingFlow } from "@/context/OnboardingFlowContext";
import { useRouter } from "next/navigation";
import { QuizResultPage } from "./QuizResultPage";
import {
  dispatchHotJarEvent,
  identifyHotJarUser,
} from "@/components/Tracking/Hotjar";

export function ResultFlow({
  responses,
}: {
  responses: Readonly<Record<string, unknown>>;
}) {
  const router = useRouter();
  const flow = useOnboardingFlow();
  const email = responses[flow.email_step_id]; // ⬅️ you asked to keep this

  return (
    <QuizResultPage
      responses={responses}
      flow={flow}
      onNext={(reaction) => {
        // save the answer like before
        saveQuizData({ [flow.reaction_step_id]: reaction }, null);

        // run tracking events like the old final step
        dispatchGoogleTagEvent("begin_checkout", {
          currency: "USD",
          value: 0,
        });

        dispatchStandardMetaEvent("InitiateCheckout");

        if (typeof email === "string") {
          identifyHotJarUser(email, {});
        }

        dispatchHotJarEvent("InitiateCheckout");

        // go straight to paywall
        router.push("/paywall");
      }}
    />
  );
}
