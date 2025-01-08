import { FullFeedback } from "@/components/OnboardingFlow/FullFeedback";

export function KnowledgeIntroPane({ onNext }: { onNext: () => void }) {
  return (
    <FullFeedback
      feedback={{
        type: "full",
        contents: [
          { type: "emoji", emoji: "💡" },
          {
            type: "title",
            text: "Why Is It So Important to Learn About Binge Eating?",
          },
          {
            type: "text",
            text: "Building knowledge about binge eating helps us understand its causes, break the stigma, and find better ways to prevent it and recover..",
          },
          {
            type: "text",
            text: "It empowers us to foster a healthier relationship with food and care for ourselves.",
          },
        ],
      }}
      onNext={onNext}
    />
  );
}
