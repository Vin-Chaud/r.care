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
      <Header>{"Are you ready to welcome 2026 with a personalized diary that reflects your inner world?"}</Header>

      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          onDidRespond(null);
        }}
      >
        <FullWidthButton type="submit" />
         Yes, I’m ready
        </FullWidthButton>
      </Form>
    </SectionLayout>
  );
}

const Form = styled.form`
  width: 100%;
`;

const FullWidthButton = styled(ForwardNavButton)`
  width: 100%;
  display: block; /* ensures full width even if component defaults to inline or inline-flex */
`;

export const SectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  width: 100%;
  padding: 0 20px; /* optional spacing */
`;

const Header = styled.h1`
  ${Fonts.Montserrat}
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  margin-bottom: 40px;
`;
