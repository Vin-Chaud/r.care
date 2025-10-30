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
          <Emoji>{"💡"}</Emoji>
          <H2>{"See results or 100% money back."}</H2>
        </header>
        <Highlight>
          {
            "See how thousands have optimized their dating lives — and started getting real results."
          }
        </Highlight>
        <List>
          <ListItem>
            {
              "If you go through the Winmate coaching for 30 days and don't see results, we offer 100% money back. "
            }
          </ListItem>
          <ListItem>
            {"Your success is our success and we're confident you will see the difference."}
          </ListItem>
        </List>
      </TrialContents>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}
