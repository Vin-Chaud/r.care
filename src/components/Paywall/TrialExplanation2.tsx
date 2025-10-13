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
          <Emoji>{"🤓"}</Emoji>
          <H2>{"Stop guessing,trust the data."}</H2>
        </header>
        <Highlight>{"We’re not here to waste your time & money."}</Highlight>
    
        <List>
          <ListItem>{"Professionally crafted profiles can increase your match rate by up to 70%."} </ListItem>
          <ListItem>{"Using tailored messages can get 30–60% more replies."}</ListItem>
          <ListItem>{"8 out of 10 people who get coaching feel more confident and better about themselves."}</ListItem>
          <ListItem>{"In just one month, 70% of Glint users found dates they were genuinely satisfied with."}</ListItem>

        </List>
      </TrialContents>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}
