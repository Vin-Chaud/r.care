import { Metric } from "./Metric";

export interface OnboardingFlow {
  step_definitions?: Readonly<Record<string, Step>>;
  sections: readonly FlowRootSection[];
}

export interface FlowRootSection {
  title: string;
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
  | TransitionSequence
  | InfoScreen;

export interface SingleSelectQuestion
  extends QuestionCommon,
    QuestionWithScore {
  type: "single_select";
  options: readonly SingleSelectOption[];
}

export interface SingleSelectOption {
  text: string;
  value: string | number | boolean | null;
  score?: number;
  feedback?: Feedback | FeedbackReference;
}

export interface MultiSelectQuestion extends QuestionCommon, QuestionWithScore {
  type: "multi_select";
  options: readonly MultiSelectOption[];
  none_option?: Omit<MultiSelectOption, "value" | "score">;
}

export interface MultiSelectOption {
  text: string;
  value: string | number | boolean | null;
  score?: number;
  feedback?: MultiSelectOptionFeedback;
}

export type MultiSelectOptionFeedback = Feedback & { priority: number };

export interface YesNoQuestion extends QuestionCommon {
  type: "yes_no";
  feedbacks?: YesNoFeedback;
}

export interface YesNoFeedback {
  yes?: Feedback | FeedbackReference;
  no?: Feedback | FeedbackReference;
}

export interface ScaleQuestion
  extends QuestionCommon,
    NumericQuestionWithScore {
  type: "scale";
  template: "frequency" | "agreement" | "intensity" | "custom";
  custom_labels?: readonly string[];
  min_label?: string;
  max_label?: string;

  /**
   * The keys here are **one**-based. Templates have exactly five degrees.
   * Custom templates may have more or less depending on the set of labels.
   */
  feedbacks?: Readonly<Record<number, Feedback | FeedbackReference>>;
}

export interface FreeTextQuestion extends QuestionCommon {
  type: "free_text";
  format: "email";
}

export interface IntegerQuestion
  extends QuestionCommon,
    NumericQuestionWithScore {
  type: "integer";
  min: number;
  max: number;
}

export interface TransitionSequence {
  type: "transition_sequence";
  panes: TransitionItem[];
}

export interface TransitionItem {
  title?: string;
  body: string;
  graphic_id: string;
}

export interface InfoScreen {
  type: "info";
  contents: readonly Content[];
}

export interface SystemScreen {
  type: "system";
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
  | Content_Title;

export interface Content_Emoji {
  type: "emoji";
  emoji: string;
}

export interface Content_Text {
  type: "text";
  text: string;
}

export interface Content_Image {
  type: "image";
  graphic_id: string;
}

export interface Content_Title {
  type: "title";

  /**
   * The title is bold-type by default, unless there is markdown formatting
   * syntax detected
   */
  text: string;
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

export interface NumericQuestionWithScore extends QuestionWithScore {
  score_scaling_factor?: number;
  score_offset?: number;
}

export interface QuestionWithScore {
  target_metric?: Metric;
}
