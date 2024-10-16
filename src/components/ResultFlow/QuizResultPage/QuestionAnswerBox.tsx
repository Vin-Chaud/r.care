import { useState } from "react";
import { MarkdownText } from "@/design_components/typography/MarkdownText";

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
    <aside style={{ backgroundColor: "#F9F4FF" }}>
      {title != null && (
        <header>
          <h3>{title}</h3>
          <p>{question}</p>
        </header>
      )}
      {isExpanded && <MarkdownText>{children}</MarkdownText>}
      {!isExpanded && (
        <button type="button" onClick={() => setExpanded(true)}>
          {"Learn more"}
        </button>
      )}
    </aside>
  );
}
