import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import {
  Highlight,
  Emoji,
  TrialContents,
  List,
  ListItem,
  H2,
} from "@/components/Paywall/trialCommon";
import { PageLayout } from "@/design_components/PageLayout";

export function TrialExplanation1({ onNext }: { onNext: () => void }) {
  return (
    <PageLayout>
      <AppHeader>{{ branding: true }}</AppHeader>
      <TrialContents>
        <header>
          <Emoji>{"✨"}</Emoji>
          <H2>{"Adore your diary — or receive a full refund."}</H2>
        </header>
        <Highlight>
          {
            "It may be hard to envision how a bespoke diary can transform your day — until you hold one."
          }
        </Highlight>
        <List>
          <ListItem>
            {
              "Use your Aster & Ink diary for 30 days, and if it doesn’t bring more clarity, calm, or gentle growth, we’ll happily give you a full refund."
            }
          </ListItem>
          <ListItem>
            {"We’re confident you’ll notice the difference."}
          </ListItem>
        </List>
      </TrialContents>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}
