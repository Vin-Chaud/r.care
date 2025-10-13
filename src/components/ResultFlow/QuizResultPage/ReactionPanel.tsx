import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Fonts, Greys } from "@/design_components/design_system";
import { Disclaimer } from "@/design_components/typography";
import styled from "styled-components";

export function ReactionPanel({
  onDidRespond,
}: {
  onDidRespond: (value: string | null) => void;
}) {
  return (
    <SectionLayout>
      <header>
        <Header>{"How do you feel about the results?"}</Header>
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
        <ReactionGrid>
          {reactions.map((reaction) => (
            <ReactionInput {...reaction} key={reaction.value} />
          ))}
        </ReactionGrid>
        <ForwardNavButton type="submit" />
        <Disclaimer>
          {
            ""
          }
        </Disclaimer>
      </form>
    </SectionLayout>
  );
}

function ReactionInput({
  value,
  emoji,
  text,
}: {
  value: string;
  emoji: string;
  text: string;
}) {
  const id = `reaction-${value}`;
  return (
    <ReactionLabel htmlFor={id} key={value}>
      <ReactionEmoji>{emoji}</ReactionEmoji>
      <ReactionText>{text}</ReactionText>
      <ReactionRadioInput
        type="radio"
        name="reaction"
        id={id}
        value={value}
        onChange={(ev) =>
          (ev.target as HTMLInputElement).form?.dispatchEvent(
            new SubmitEvent("submit", {
              cancelable: true,
              bubbles: true,
            })
          )
        }
      />
    </ReactionLabel>
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

export const SectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Greys.GreyDF};
  height: 100dvh;
`;

const Header = styled.header`
  ${Fonts.Montserrat}

  font-weight: 600;
  font-size: 21px;
  text-align: center;
`;

const ReactionGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  gap: 15px;
  margin-block: 60px;
  padding: 0px;
`;

const ReactionLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReactionEmoji = styled.div`
  ${Fonts.SFPro}

  font-weight: 500;
  font-size: 40px;
  text-align: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${Greys.White};
  cursor: pointer;
`;

const ReactionText = styled.div`
  ${Fonts.Montserrat}

  font-size: 11px;
  font-weight: 600;
  color: ${Greys.Black};
  padding-top: 10px;
  cursor: pointer;
`;

const ReactionRadioInput = styled.input`
  opacity: 0;
`;
