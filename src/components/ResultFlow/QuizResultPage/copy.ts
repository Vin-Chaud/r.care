import { Impact, Symptom } from "@/models/Metric";
import { ScoreZone } from "@/models/OnboardingFlow/methods";

export const scoreZoneCopy: Readonly<Record<ScoreZone, string>> = {
  Low: "Low",
  Medium: "Moderate",
  High: "High",
  VeryHigh: "Very high",
};

export const symptomCopy: Readonly<Record<Symptom, string>> = {
  EMOTIONAL_EATING: "Mindful Memory Keeper",
  SELF_CONTROL_CHALLENGE: "Mindful Memory Keeper",
  INTERNAL_SIGNAL_DYSFUNCTION: "Ambitious Visionary",
};

export const symptomEmojis: Readonly<Record<Symptom, string>> = {
  EMOTIONAL_EATING: "🌿",
  SELF_CONTROL_CHALLENGE: "⚡",
  INTERNAL_SIGNAL_DYSFUNCTION: "🌟",
};

export const impactCopy: Readonly<Record<Impact, string>> = {
  MENTAL_HEALTH: "Self-love",
  RELATIONSHIP: "Mental wellness",
  PRODUCTIVITY: "Growth & Productivity",
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
    "",
  [Symptom.SelfControlChallenge]:
    "",
  [Symptom.InternalSignalDysfunction]:
    "",
};

export const SymptomExplanationAnswer: Readonly<Record<Symptom, string>> = {
  [Symptom.EmotionalEating]:
    "A calm, reflective soul who cherishes the subtle details of everyday life. This personality approaches each moment with presence and gentle awareness, finding meaning in stillness and beauty in simplicity. It values emotional honesty, gratitude, and the quiet art of noticing, helping you turn ordinary experiences into thoughtful, well-kept memories.",
  [Symptom.SelfControlChallenge]:
    "A curious, imaginative personality driven by the thrill of discovery. It constantly searches for ideas, inspiration, and creative possibilities hidden in the world. Energetic and playful, it encourages experimentation, embraces imperfections, and turns flashes of inspiration into expressive, inventive creations.",
  [Symptom.InternalSignalDysfunction]:
    "A bold, future-forward thinker with a strong sense of purpose. This personality sees possibility everywhere and has the determination to turn dreams into reality. Strategic, motivated, and resilient, it thrives on growth, long-term planning, and transformative goals, always pushing toward the highest version of what could be.",
};
