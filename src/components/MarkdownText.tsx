"use client";
import { ComponentType, createElement, ComponentClass, ReactNode } from "react";

export function MarkdownText<A>({
  children,
  tag = "p",
}: {
  children?: string;
  tag?: keyof JSX.IntrinsicElements | ComponentType<A>;
}) {
  return createElement(
    tag as string | ComponentClass<{}, any>,
    {},
    applyMarkdownFormatting(children ?? null)
  );
}
/**
 * Converts `**` and `__` to `<strong>` and `<em>` respectively.
 */
function applyMarkdownFormatting(text: string | null): ReactNode {
  if (!text) {
    return null;
  }

  const elements: ReactNode[] = [];

  const strongRegex = /\*\*(.+?)\*\*/;
  const emRegex = /_(.+?)_/;

  let remainingText = text;

  while (remainingText) {
    const strongMatch = strongRegex.exec(remainingText);
    const emMatch = emRegex.exec(remainingText);

    // Determine which comes first, ** or _
    const firstMatch =
      strongMatch && (!emMatch || strongMatch.index < emMatch.index)
        ? strongMatch
        : emMatch;

    if (!firstMatch) {
      // No more matches, push remaining text
      elements.push(remainingText);
      break;
    }

    // Push the text before the match
    if (firstMatch.index > 0) {
      elements.push(remainingText.slice(0, firstMatch.index));
    }

    const matchType = firstMatch[0].startsWith("**") ? "strong" : "em";
    const matchedText = firstMatch[1]; // The text inside ** or _

    // Recursively parse the content inside the match (to handle nesting)
    const parsedChildren = applyMarkdownFormatting(matchedText);
    if (parsedChildren != null) {
      if (matchType === "strong") {
        elements.push(<strong key={elements.length}>{parsedChildren}</strong>);
      } else if (matchType === "em") {
        elements.push(<em key={elements.length}>{parsedChildren}</em>);
      }
    }

    // Move the remaining text forward
    remainingText = remainingText.slice(
      firstMatch.index + firstMatch[0].length
    );
  }

  return elements;
}
