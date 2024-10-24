import { getStepDefinitionWithFallback } from "@/models/OnboardingFlow/methods";
import {
  OnboardingFlow,
  Step,
  Story,
  InfoScreen,
  Feedback,
  FeedbackReference,
  Content,
} from "@/models/OnboardingFlow/model";

export enum GraphicSection {
  MainQuiz,
  Analysis,
  Result,
  Paywall,
  Welcome,
}

export function* getGraphics(flow: OnboardingFlow, section: GraphicSection) {
  if (section === GraphicSection.MainQuiz) {
    yield* getGraphicsFromMainQuiz(flow);
    yield flow.highlighted_testimonial.avatar_graphic_id;
  }

  if (section === GraphicSection.Analysis) {
    yield flow.highlighted_testimonial.avatar_graphic_id;
  }

  if (section === GraphicSection.Result) {
    yield flow.interview.graphic_id;
  }

  if (section === GraphicSection.Paywall) {
    for (const testimonial of flow.community_testimonials) {
      yield testimonial.avatar_graphic_id;
    }
  }

  if (section === GraphicSection.Welcome) {
    yield flow.activate_graphic_id;
  }
}

function* getGraphicsFromMainQuiz(flow: OnboardingFlow) {
  for (const section of flow.sections) {
    for (const subsection of section.subsections) {
      for (const stepId of subsection.step_order) {
        const step = getStepDefinitionWithFallback(
          stepId,
          subsection,
          section,
          flow
        );

        switch (step?.type) {
          case "info": {
            yield* getAllGraphicsFromContents(step.contents);
            break;
          }
          case "story": {
            for (const pane of step.panes) {
              yield pane.graphic_id;
            }
            break;
          }
          default: {
            if (step != null) {
              yield* getGraphicsFromQuizStep(step);
              yield* getAllGraphicsFromFeedback(step.base_feedback ?? null);
              for (const feedbackDef of Object.values(
                step.feedback_definitions || {}
              )) {
                yield* getAllGraphicsFromFeedback(feedbackDef);
              }
            }
            break;
          }
        }
      }
    }
  }
}

function* getGraphicsFromQuizStep(step: Exclude<Step, Story | InfoScreen>) {
  switch (step.type) {
    case "free_text":
    case "integer": {
      return;
    }
    case "multi_select":
    case "single_select": {
      for (const option of step.options) {
        option.feedback && (yield* getAllGraphicsFromFeedback(option.feedback));
      }
      return;
    }
    case "scale": {
      for (const feedback of Object.values(step.feedbacks || {})) {
        yield* getAllGraphicsFromFeedback(feedback);
      }
      return;
    }
    case "yes_no": {
      step.feedbacks?.yes &&
        (yield* getAllGraphicsFromFeedback(step.feedbacks.yes));
      step.feedbacks?.no &&
        (yield* getAllGraphicsFromFeedback(step.feedbacks.no));
      return;
    }
  }
}

function* getAllGraphicsFromFeedback(
  feedback: Feedback | FeedbackReference | null
) {
  if (feedback?.type === "full") {
    yield* getAllGraphicsFromContents(feedback.contents);
  }
}

function* getAllGraphicsFromContents(contents: readonly Content[]) {
  for (const content of contents) {
    yield* getAllGraphicsFromContent(content);
  }
}

function* getAllGraphicsFromContent(content: Content) {
  switch (content.type) {
    case "image": {
      yield content.graphic_id;
    }
  }
}
