import { FullFeedback } from "@/components/OnboardingFlow/FullFeedback";

export function KnowledgeIntroPane({ onNext }: { onNext: () => void }) {
  return (
    <FullFeedback
      feedback={{
        type: "full",
        contents: [
          { type: "emoji", emoji: "💡", scale: 0.8 },
          {
            type: "title",
            text: "Why is it so important to build our knowledge about binge eating?",
          },
          {
            type: "text",
            text: "Understanding binge eating is important because it helps us see what drives this behavior and why it happens. The more we know, the better we can find ways to prevent it and support recovery.",
          },
          {
            type: "text",
            text: "Learning about binge eating also helps break down the stigma, making it easier for us to ask for help. In the end, this knowledge gives us the tools to build a healthier relationship with food and take better care of ourselves.",
          },
        ],
      }}
      onNext={onNext}
    />
  );
}
