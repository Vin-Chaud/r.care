import { MarkdownText } from "@/design_components/typography/MarkdownText";

export function FeedbackBox({
  title,
  children,
}: {
  title?: string;
  children?: string;
}) {
  return (
    <aside style={{ backgroundColor: "#F9F4FF" }}>
      {title != null && (
        <header>
          <h3>{title}</h3>
        </header>
      )}
      <MarkdownText>{children}</MarkdownText>
    </aside>
  );
}
