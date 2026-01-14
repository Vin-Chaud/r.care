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
          <Emoji>{"🌿"}</Emoji>
          <H2>{"Try this daily practice with peace of mind."}</H2>
        </header>
        <Highlight>
          {
            "It’s hard to know what a small daily Scripture practice can change — until you experience it in real life."
          }
        </Highlight>
        <List>
          <ListItem>
            {
              "Use your personalized daily practice for 30 days. If it doesn’t help God’s Word feel more present in your thoughts, responses, or daily life, we’ll happily offer a full refund."
            }
          </ListItem>
          <ListItem>
            {"We trust that even a few minutes a day can begin to shape something meaningful."}
          </ListItem>
        </List>
      </TrialContents>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}
