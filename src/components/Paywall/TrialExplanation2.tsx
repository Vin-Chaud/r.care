import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import {
  Emoji,
  H2,
  Highlight,
  List,
  ListItem,
  P,
  TrialContents,
} from "@/components/Paywall/trialCommon";
import { PageLayout } from "@/design_components/PageLayout";

export function TrialExplanation2({ onNext }: { onNext: () => void }) {
  return (
    <PageLayout>
      <AppHeader>{{ branding: true }}</AppHeader>
      <TrialContents>
        <header>
          <Emoji>{"💜"}</Emoji>
          <H2>{"Try for free."}</H2>
        </header>
        <Highlight>{"We’re not here to waste your time & money."}</Highlight>
        <P>
          {
            "We know that you have a busy schedule and life happens, so we offer a guarantee:"
          }
        </P>
        <List>
          <ListItem>
            {"We’ll send you a reminder before your trial ends."}
          </ListItem>
          <ListItem>{"You can cancel at any time."}</ListItem>
          <ListItem>
            {
              "100% secure payment process."
            }
          </ListItem>
        </List>
      </TrialContents>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}
