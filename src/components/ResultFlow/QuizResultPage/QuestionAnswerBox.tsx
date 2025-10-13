import { useState } from "react";
import { MarkdownText } from "@/design_components/typography/MarkdownText";
import styled from "styled-components";
import { Fonts, Greys, Purples } from "@/design_components/design_system";

export function QuestionAnswerBox({
  title,
  question,
  children,
}: {
  title: string;
  question: string;
  children?: string;
}) {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <BoxLayout style={{ backgroundColor: "#F9F4FF" }}>
      {title != null && (
        <header>
          <h3>{title}</h3>
          <p>{question}</p>
        </header>
      )}
      {isExpanded && <MarkdownText>{children}</MarkdownText>}
      {!isExpanded && (
        <ButtonRow>
          <button type="button" onClick={() => setExpanded(true)}>
            {"Learn more"}
          </button>
        </ButtonRow>
      )}
    </BoxLayout>
  );
}

const BoxLayout = styled.aside`
  background-color: ${Purples.PurpleF9};
  padding: 24px;
  box-sizing: border-box;
  border-radius: 20px;
  margin-top: 20px;

  header p {
    ${Fonts.SFPro};
    font-size: 14px;
    font-weight: 400px;
    color: ${Greys.Black};
    margin-block: 0px;
  }

  h3 {
    ${Fonts.Montserrat}
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  header {
    margin-bottom: 30px;
  }

  p {
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${Greys.Grey5D};
    ${Fonts.SFPro};
    font-size: 13px;
    font-weight: 400px;
  }

  button {
    ${Fonts.SFPro};
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    color: ${Greys.Grey5D};
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const ButtonRow = styled.div`
  text-align: center;
`;
