import { ForwardNavButton } from "@/components/ForwardNavButton";
import styled from "styled-components";

export function ReactionPanel({
  onDidRespond,
}: {
  onDidRespond: (value: string | null) => void;
}) {
  return (
    <SectionLayout>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onDidRespond(null);
        }}
      >
        <ForwardNavButton type="submit" />
      </form>
    </SectionLayout>
  );
}

export const SectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  width: 100%;
`;
