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
          <H2>{"We can help."}</H2>
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
              "If you go through the R.care program for 30 days and don't see results, **we offer 200% money back.**"
            }
          </ListItem>
        </List>
      </TrialContents>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}
