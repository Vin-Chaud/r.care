"use client";

import { ComponentClass, ComponentType, createElement, ReactNode } from "react";
import styled from "styled-components";

export const createMarkdownText = (
  wrapper: ComponentType<{ children: ReactNode }>
) => {
  return function WrappedMarkdownText({ children }: { children?: string }) {
    return <MarkdownText tag={wrapper}>{children}</MarkdownText>;
  };
};

export function MarkdownText({
  children,
  tag = "p",
}: {
  children?: string;
  tag?: keyof JSX.IntrinsicElements | ComponentType<{ children: ReactNode }>;
}) {
  return createElement(
    tag as string | ComponentClass,
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
      elements.push(...applyLinebreaks(remainingText));
      break;
    }

    // Push the text before the match
    if (firstMatch.index > 0) {
      elements.push(
        ...applyLinebreaks(remainingText.slice(0, firstMatch.index))
      );
    }

    const matchType = firstMatch[0].startsWith("**") ? "strong" : "em";
    const matchedText = firstMatch[1]; // The text inside ** or _

    // Recursively parse the content inside the match (to handle nesting)
    const parsedChildren = applyMarkdownFormatting(matchedText);
    if (parsedChildren != null) {
      if (matchType === "strong") {
        elements.push(<Strong key={elements.length}>{parsedChildren}</Strong>);
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

function applyLinebreaks(text: string | null): readonly ReactNode[] {
  const fragments = text?.split(/<br\s*\/?>/gi);
  if (!fragments || fragments.length === 0) return [];

  if (fragments.length === 1) return fragments;

  const children: ReactNode[] = [fragments[0]];
  for (const child of fragments.slice(1)) {
    children.push(<br key={"br__" + children.length} />);
    children.push(child);
  }

  return children;
}

const Strong = styled.strong`
  font-weight: 700;
`;
