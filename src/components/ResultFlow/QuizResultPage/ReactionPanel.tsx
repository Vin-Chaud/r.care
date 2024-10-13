export function ReactionPanel({
  onDidRespond,
}: {
  onDidRespond: (value: string | null) => void;
}) {
  return (
    <section>
      <header>
        <h2>{"How do these results make you feel?"}</h2>
      </header>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          const checkedItem = ev.currentTarget.querySelector("input:checked");
          onDidRespond(
            checkedItem instanceof HTMLInputElement ? checkedItem.value : null
          );
        }}
      >
        {reactions.map((reaction) => {
          const id = `reaction-${reaction.value}`;
          return (
            <div key={reaction.value}>
              <input
                type="radio"
                name="reaction"
                id={id}
                value={reaction.value}
                onChange={(ev) =>
                  (ev.target as HTMLInputElement).form?.dispatchEvent(
                    new SubmitEvent("submit", {
                      cancelable: true,
                      bubbles: true,
                    })
                  )
                }
              />
              <label htmlFor={id}>
                {reaction.emoji} {reaction.text}
              </label>
            </div>
          );
        })}
        <button type="submit">{"Continue"}</button>
      </form>
    </section>
  );
}

const reactions: readonly Reaction[] = [
  { text: "Curious", value: "CURIOUS", emoji: "🤔" },
  { text: "Concerned", value: "CONCERNED", emoji: "🫣" },
  { text: "Relieved", value: "RELIEVED", emoji: "😮‍💨" },
  { text: "Surprised", value: "SURPRISED", emoji: "🫨" },
  { text: "Validated", value: "VALIDATED", emoji: "🙂" },
  { text: "Unsurprised", value: "UNSURPRISED", emoji: "🙄" },
];

interface Reaction {
  text: string;
  value: string;
  emoji: string;
}
