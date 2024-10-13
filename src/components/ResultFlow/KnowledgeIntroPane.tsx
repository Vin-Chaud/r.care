export function KnowledgeIntroPane({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <p>{"💡"}</p>
      <h2>
        {"Why is it so important to build our knowledge about binge eating?"}
      </h2>
      <p>
        {
          "Understanding binge eating is important because it helps us see what drives this behavior and why it happens. The more we know, the better we can find ways to prevent it and support recovery."
        }
      </p>
      <p>
        {
          "Learning about binge eating also helps break down the stigma, making it easier for us to ask for help. In the end, this knowledge gives us the tools to build a healthier relationship with food and take better care of ourselves."
        }
      </p>
      <button onClick={onNext}>{"Continue"}</button>
    </section>
  );
}
