import { ContentModel } from "../../models/OnboardingFlow/model.js";

export function Content({ content }: { content: ContentModel }) {
  switch (content.type) {
    case "emoji": {
      return <span>{content.emoji}</span>;
    }
    case "image": {
      return <pre>(placeholder for image ${content.graphic_id})</pre>;
    }
    case "text": {
      return <p>{content.text}</p>;
    }
    case "title": {
      return <h2>{content.text}</h2>;
    }
    default: {
      return null;
    }
  }
}
