"use client";
import { MarkdownText } from "@/design_components/typography/MarkdownText";
import { ComponentType, createContext, ReactNode, useContext } from "react";
import { AnswerValue } from "./types";

export const textInterpolationContext = createContext<
  { expressions: Readonly<Record<string, string>> } & InnerInterpolationContext
>({
  responses: {},
  expressions: {},
});
interface InnerInterpolationContext {
  responses: Readonly<Record<string, AnswerValue>>;
}

export const createRichText = (
  wrapper: ComponentType<{ children: ReactNode }>
) => {
  return function WrappedRichText({ children }: { children?: string }) {
    return children != null && <RichText tag={wrapper}>{children}</RichText>;
  };
};

export function RichText({
  children,
  tag,
}: {
  children?: string;
  tag?: keyof JSX.IntrinsicElements | ComponentType<{ children: ReactNode }>;
}) {
  const { expressions, responses } = useContext(textInterpolationContext);
  const interpolatedText =
    children != null
      ? interpolateText(children, expressions, {
          responses,
        })
      : null;

  return interpolatedText != null || tag != null ? (
    <MarkdownText tag={tag}>{interpolatedText || ""}</MarkdownText>
  ) : null;
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
