import { Impact, Symptom } from "@/models/Metric";
import { ScoreZone } from "@/models/OnboardingFlow/methods";

export const scoreZoneCopy: Readonly<Record<ScoreZone, string>> = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
  VeryHigh: "Very high",
};

export const symptomCopy: Readonly<Record<Symptom, string>> = {
  EMOTIONAL_EATING: "Emotional eating",
  SELF_CONTROL_CHALLENGE: "Self-control challenges",
  INTERNAL_SIGNAL_DYSFUNCTION: "Internal signal dysfunction",
};

export const symptomEmojis: Readonly<Record<Symptom, string>> = {
  EMOTIONAL_EATING: "🍔",
  SELF_CONTROL_CHALLENGE: "🛑",
  INTERNAL_SIGNAL_DYSFUNCTION: "🔄",
};

export const impactCopy: Readonly<Record<Impact, string>> = {
  MENTAL_HEALTH: "Mental Health",
  RELATIONSHIP: "Relationships",
  PRODUCTIVITY: "Productivity",
};

export const impactEmojis: Readonly<Record<Impact, string>> = {
  MENTAL_HEALTH: "🪷",
  RELATIONSHIP: "🧑‍🤝‍🧑",
  PRODUCTIVITY: "🎯",
};

export const SymptomOrdering = [
  Symptom.EmotionalEating,
  Symptom.SelfControlChallenge,
  Symptom.InternalSignalDysfunction,
];

export const SymptomExplanationQuestion: Readonly<Record<Symptom, string>> = {
  [Symptom.EmotionalEating]:
    "What am I eating in response to stress and difficult emotions?",
  [Symptom.SelfControlChallenge]:
    "Why do I sense a loss of control when it comes to eating?",
  [Symptom.InternalSignalDysfunction]:
    "Why am I not in tune with my hunger and fullness signal?",
};

export const SymptomExplanationAnswer: Readonly<Record<Symptom, string>> = {
  [Symptom.EmotionalEating]:
    "Emotional eating often occurs when food becomes a way to manage or numb intense feelings like stress, sadness, or loneliness. Instead of addressing the emotions directly, you might turn to food for comfort, leading to a temporary relief that can quickly spiral into a cycle of guilt and overeating. Recognizing this pattern is the first step toward finding healthier ways to cope with your emotions.",
  [Symptom.SelfControlChallenge]:
    "Binge eating can feel like a battle against your own willpower, where the urge to eat takes over and feels impossible to resist. This loss of control is often fueled by a combination of restrictive dieting, emotional triggers, and ingrained habits. It’s important to understand that it’s not just about willpower—addressing the root causes can help you regain a sense of control and break the cycle.",
  [Symptom.InternalSignalDysfunction]:
    "Over time, binge eating can disrupt your natural ability to recognize when you’re truly hungry or full. Dieting, stress, and emotional eating can dull these internal signals, making it difficult to know when to start or stop eating. Reconnecting with your body’s cues is essential for restoring a balanced relationship with food, allowing you to eat in response to your true needs rather than external pressures or emotions.",
};
