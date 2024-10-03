"use client";
import {
  ComponentClass,
  ComponentType,
  createContext,
  createElement,
  ReactNode,
  useContext,
} from "react";
import { AnswerValue } from "./types.js";

export const textInterpolationContext = createContext<
  { expressions: Readonly<Record<string, string>> } & InnerInterpolationContext
>({
  responses: {},
  expressions: {},
});
interface InnerInterpolationContext {
  responses: Readonly<Record<string, AnswerValue>>;
}

export function RichText<A>({
  children,
  tag = "p",
}: {
  children?: string;
  tag?: keyof JSX.IntrinsicElements | ComponentType<A>;
}) {
  const { expressions, responses } = useContext(textInterpolationContext);
  return children
    ? createElement(
        tag as string | ComponentClass<{}, any>,
        {},
        applyMarkdownFormatting(
          interpolateText(children, expressions, { responses })
        )
      )
    : null;
}

function interpolateText(
  text: string | null | undefined,
  expressions: Readonly<Record<string, string>>,
  context: InnerInterpolationContext
) {
  if (!text) return null;
  return text.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    if (!Object.hasOwn(expressions, key)) return "";
    const expression = expressions[key];
    try {
      const args = {
        response_value: (stepId: string) => {
          if (!Object.hasOwn(context.responses, stepId)) {
            console.error(
              `Failed to interpolate expression ${key}: response for step ${stepId} not available`
            );
            return "???";
          }
          return context.responses[stepId];
        },
      };
      const fn = new Function(...Object.keys(args), `return (${expression})`);
      return fn(...Object.values(args));
    } catch (exception) {
      console.error(`Failed to interpolate expression ${key}: ${exception}`);
      return "";
    }
  });
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
