import { Content as ContentModel } from "@/models/OnboardingFlow/model";
import { RichText } from "./RichText";

export function Content({ content }: { content: ContentModel }) {
  switch (content.type) {
    case "emoji": {
      return <div>{content.emoji}</div>;
    }
    case "image": {
      return <pre>(placeholder for image ${content.graphic_id})</pre>;
    }
    case "text": {
      return <RichText>{content.text}</RichText>;
    }
    case "title": {
      return <RichText tag="h2">{content.text}</RichText>;
    }
    default: {
      return null;
    }
  }
}
