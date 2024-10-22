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
          <H2>{"Try R.care for 7 days to see if it works for you."}</H2>
        </header>
        <Highlight>
          {
            "Join thousands who have overcome binge eating & transformed their lives."
          }
        </Highlight>
        <List>
          <ListItem>
            {
              "Read all our bitesized learning modules on the psychology and nutrition behind binge eating behavior."
            }
          </ListItem>
          <ListItem>
            {"Use proven psychological techniques to stop binge eating."}
          </ListItem>
          <ListItem>
            {
              "Cultivate a balanced relationship with food with daily tasks and exercises."
            }
          </ListItem>
        </List>
      </TrialContents>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}
