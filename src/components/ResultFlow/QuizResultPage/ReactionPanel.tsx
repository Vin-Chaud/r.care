import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Fonts } from "@/design_components/design_system";
import styled from "styled-components";

export function ReactionPanel({
  onDidRespond,
}: {
  onDidRespond: (value: string | null) => void;
}) {
  return (
    <SectionLayout>
      <Header>{"How do these results make you feel?"}</Header>

      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onDidRespond(null);
        }}
      >
        <FullWidthButton type="submit" />
      </form>
    </SectionLayout>
  );
}

const FullWidthButton = styled(ForwardNavButton)`
  width: 100%;
`;

export const SectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  width: 100%;
  padding: 0 20px; /* Optional: gives breathing room on mobile */
`;

const Header = styled.h1`
  ${Fonts.Montserrat}
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  margin-bottom: 40px;
`;
