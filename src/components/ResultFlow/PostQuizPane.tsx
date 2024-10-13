export function PostQuizPane({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <p>{"🎉"}</p>
      <p>
        {
          "We’ve listened to your answers and created a personalized plan just for you"
        }
      </p>
      <button onClick={onNext}>{"Continue"}</button>
    </section>
  );
}
