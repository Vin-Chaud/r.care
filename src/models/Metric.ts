export type Metric = Symptom | Impact | Experience;

export enum Symptom {
  EmotionalEating = "EMOTIONAL_EATING",
  SelfControlChallenge = "SELF_CONTROL_CHALLENGE",
  InternalSignalDysfunction = "INTERNAL_SIGNAL_DYSFUNCTION",
}

export enum Impact {
  MentalHealth = "MENTAL_HEALTH",
  Relationship = "RELATIONSHIP",
  Productivity = "PRODUCTIVITY",
}

export enum Experience {
  Knowledge = "KNOWLEDGE",
}

export const AllMetrics = [
  ...Object.values(Symptom),
  ...Object.values(Impact),
  ...Object.values(Experience),
];
