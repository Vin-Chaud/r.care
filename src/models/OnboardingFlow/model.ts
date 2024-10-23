import { Metric } from "../Metric.js";

export interface OnboardingFlow {
  step_definitions?: Readonly<Record<string, Step>>;
  sections: readonly FlowRootSection[];
  landing_quiz_step: SingleSelectQuestion & { id: string };
  popup_quiz_step: YesNoQuestion & { id: string };
  reaction_step_id: string;
  email_step_id: string;
  current_episode_count_id: string;
  target_episode_count_id: string;
  program_plan: readonly ResponseEcho[];
  knowledge_plan: readonly ResponseEcho[];
  faqs: readonly Faq[];
  target_knowledge_score: number;
  highlighted_testimonial: Testimonial;
  community_testimonials: readonly Testimonial[];
  testimonial_disclaimer: string | null;
  interview: Interview;
}

export interface FlowRootSection {
  title: string | { branding: true };
  step_definitions?: Readonly<Record<string, Step>>;
  subsections: readonly FlowSubsection[];
}

export interface FlowSubsection {
  step_definitions?: Readonly<Record<string, Step>>;
  step_order: readonly string[];
}

export type Step =
  | SingleSelectQuestion
  | MultiSelectQuestion
  | YesNoQuestion
  | ScaleQuestion
  | FreeTextQuestion
  | IntegerQuestion
  | Story
  | InfoScreen;

export interface SingleSelectQuestion extends QuestionCommon {
  type: "single_select";
  options: readonly SingleSelectOption[];
}

export interface SingleSelectOption {
  text: string;
  value: string | number;
  score?: number;
  feedback?: Feedback | FeedbackReference;
}

export interface MultiSelectQuestion extends QuestionCommon {
  type: "multi_select";
  options: readonly MultiSelectOption[];
  none_option?: Omit<MultiSelectOption, "value" | "score">;
}

export interface MultiSelectOption {
  text: string;
  value: string | number;
  score?: number;
  feedback?: MultiSelectOptionFeedback;
}

export type MultiSelectOptionFeedback = Feedback & { priority: number };

export interface YesNoQuestion extends QuestionCommon {
  type: "yes_no";
  feedbacks?: YesNoFeedback;
  scoring?: YesNoScoring;
}

export interface YesNoScoring extends ScoringCommon {
  target_metric: Metric;
  mode: "1_5" | "pos_neg";
  yes_high: boolean;
}

export interface YesNoFeedback {
  yes?: Feedback | FeedbackReference;
  no?: Feedback | FeedbackReference;
}

export interface ScaleQuestion extends QuestionCommon {
  type: "scale";
  preset: "frequency" | "agreement" | "intensity" | "custom";
  custom_labels?: readonly string[];
  min_label?: string;
  max_label?: string;

  /**
   * The keys here are **one**-based. Templates have exactly five degrees.
   * Custom templates may have more or less depending on the set of labels.
   */
  feedbacks?: Readonly<Record<number, Feedback | FeedbackReference>>;
  scoring?: ScaleScoring;
}

export interface ScaleScoring extends ScoringCommon {
  target_metric: Metric;
  reverse?: boolean;
}

export interface FreeTextQuestion extends QuestionCommon {
  type: "free_text";
  format: "email";
  placeholder?: string;
}

export interface IntegerQuestion extends QuestionCommon {
  type: "integer";
  min: number;
  max: number;
  placeholder?: string;
}

export interface Story {
  type: "story";
  panes: StoryPane[];
}

export interface StoryPane {
  title?: string;
  body: string;
  graphic_id: string;
}

export interface InfoScreen {
  type: "info";
  contents: readonly Content[];
}

export interface ResponseEcho {
  step_id: string;
  prompt: string;
  echo_mapping: Readonly<Record<string, string>>;
  echo_default: string;
  multi_select_priority?: readonly string[];
  color: string;
}

export type Feedback = FullFeedback | EmbeddedFeedback;

export interface FullFeedback {
  type: "full";
  contents: readonly Content[];
}

export interface EmbeddedFeedback {
  type: "embedded";
  title?: string;
  text: string | readonly string[];
}

export interface FeedbackReference {
  type?: undefined;
  id: string;
}

export type Content =
  | Content_Emoji
  | Content_Text
  | Content_Image
  | Content_Title
  | Content_Testimonial;

export interface Content_Emoji {
  type: "emoji";
  emoji: string;
}

export interface Content_Text {
  type: "text";
  text: string | readonly string[];
  variant?: "normal" | "subtle";
}

export interface Content_Image {
  type: "image";
  graphic_id: string;
  max_height?: number;
}

export interface Content_Title {
  type: "title";

  /**
   * The title is bold-type by default, unless there is markdown formatting
   * syntax detected
   */
  text: string | readonly string[];
}

export interface Content_Testimonial {
  type: "testimonial";
}

export interface QuestionCommon {
  /**
   * Main question text
   */
  title: string;

  /**
   * Smaller text appearing above the main question
   */
  preamble_text?: string;

  /**
   * Smaller text appearing below the main question
   */
  help_text?: string;

  /**
   * The default feedback for every response that may be overridden in the
   * specific cases.
   */
  base_feedback?: Feedback | FeedbackReference;

  /**
   * Named feedbacks that can be referred to in the feedback references.
   */
  feedback_definitions?: Readonly<Record<string, Feedback>>;

  /**
   * Expressions that can be interpolated in all texts like this: `{{expression_name}}`.
   * Each expression must be a valid JavaScript expression that returns a string,
   * a number, or null. Only literals, operators, and function calls are allowed.
   *
   * The following functions are supported:
   * - `response_value(question_id: string)`: Returns the response value of the given question.
   */
  expressions?: Readonly<Record<string, string>>;
}

export interface ScoringCommon {
  scaling_factor?: number;
  max_unscaled_score?: number;
}

export interface Faq {
  question: string;
  answer: FaqContent | readonly FaqContent[];
}

export interface FaqListContent {
  list: readonly string[];
}

export type FaqContent = string | FaqListContent;

export interface Testimonial {
  avatar_graphic_id: string;
  screen_name: string;
  screen_subtitle: string;
  content: string;
  social?: {
    comments: number;
    shares: number;
    likes: number;
  };
}

export interface Interview {
  title: string;
  subtitle: string;
  questions: readonly InterviewQuestion[];
  graphic_id: string;
  disclaimer: string | null;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
}
