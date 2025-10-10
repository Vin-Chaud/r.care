import { Impact, Symptom } from "@/models/Metric";
import { ScoreZone } from "@/models/OnboardingFlow/methods";

export const scoreZoneCopy: Readonly<Record<ScoreZone, string>> = {
  Low: "Low",
  Medium: "Moderate",
  High: "High",
  VeryHigh: "Very high",
};

export const symptomCopy: Readonly<Record<Symptom, string>> = {
  EMOTIONAL_EATING: "Being your confident, authentic self",
  SELF_CONTROL_CHALLENGE: "Effective communication",
  INTERNAL_SIGNAL_DYSFUNCTION: "Goal setting and strategy",
};

export const symptomEmojis: Readonly<Record<Symptom, string>> = {
  EMOTIONAL_EATING: "🌟",
  SELF_CONTROL_CHALLENGE: "💬",
  INTERNAL_SIGNAL_DYSFUNCTION: "🎯",
};

export const impactCopy: Readonly<Record<Impact, string>> = {
  MENTAL_HEALTH: "Love & Happiness",
  RELATIONSHIP: "Health & Libido",
  PRODUCTIVITY: "Growth & Confidence",
};

export const impactEmojis: Readonly<Record<Impact, string>> = {
  MENTAL_HEALTH: "❤️",
  RELATIONSHIP: "💪",
  PRODUCTIVITY: "✨",
};

export const SymptomOrdering = [
  Symptom.EmotionalEating,
  Symptom.SelfControlChallenge,
  Symptom.InternalSignalDysfunction,
];

export const SymptomExplanationQuestion: Readonly<Record<Symptom, string>> = {
  [Symptom.EmotionalEating]:
    "Why is being your confident, authentic self important for online dating success?",
  [Symptom.SelfControlChallenge]:
    "Why is clear communication important, and how can I improve it?",
  [Symptom.InternalSignalDysfunction]:
    "Why is setting goals and being strategic crucial for online dating?",
};

export const SymptomExplanationAnswer: Readonly<Record<Symptom, string>> = {
  [Symptom.EmotionalEating]:
    "Being your authentic self means embracing who you truly are—your strengths, quirks, and values. Confidence comes from accepting yourself and not feeling pressured to fit others’ expectations. When you act genuinely, you build trust and create opportunities for meaningful connections that are more likely to last.",
  [Symptom.SelfControlChallenge]:
    "Clear communication helps others understand your thoughts, feelings, and needs without confusion. It involves both speaking honestly and listening actively. To improve, be mindful of your tone, choose words carefully, and check that your message is understood. Strong communication reduces misunderstandings and strengthens relationships.",
  [Symptom.InternalSignalDysfunction]:
    "Setting goals gives your dating journey direction and purpose, while having a strategy turns those goals into actionable steps. Breaking larger goals into smaller, manageable tasks helps you stay motivated and track progress. A clear plan also lets you adjust when obstacles arise, keeping you on track to find the connections you want.",
};
