import { Fonts, Purples } from "@/design_components/design_system";
import { MarkdownText } from "@/design_components/typography/MarkdownText";
import styled from "styled-components";

export function FeedbackBox({
  title,
  children,
}: {
  title?: string;
  children?: string;
}) {
  return (
    <BoxLayout style={{ backgroundColor: "#F9F4FF" }}>
      {title != null && (
        <header>
          <h3>{title}</h3>
        </header>
      )}
      <MarkdownText>{children}</MarkdownText>
    </BoxLayout>
  );
}

const BoxLayout = styled.aside`
  background-color: ${Purples.PurpleF9};
  padding: 24px;
  box-sizing: border-box;
  border-radius: 20px;
  margin-top: 20px;

  h3 {
    ${Fonts.Montserrat}
    font-size: 19px;
    font-weight: 600;
    margin-bottom: 26px;
    margin-top: 0px;
  }

  ${Fonts.SFPro};
  font-size: 12px;
  font-weight: 400px;
`;
