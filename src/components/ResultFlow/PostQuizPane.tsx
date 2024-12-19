import { FullFeedback } from "@/components/OnboardingFlow/FullFeedback";

export function PostQuizPane({ onNext }: { onNext: () => void }) {
  return (
    <FullFeedback
      feedback={{
        type: "full",
        contents: [
          { type: "emoji", emoji: "🎉" },
          {
            type: "text",
            text: "We’ve listened to your answers and created a personalized plan just for you",
          },
        ],
      }}
      onNext={onNext}
    />
  );
}
