import StyledComponentsRegistry from "@/lib/styledComponentRegistry";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "r.care onboarding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
