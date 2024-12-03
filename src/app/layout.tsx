import { GoogleTag } from "@/components/Tracking/GoogleTag";
import { MetaPixel } from "@/components/Tracking/MetaPixel";
import { config } from "@/config";
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
  const googleTagId = config.tracking?.googleTagId;
  const metaPixelId = config.tracking?.metaPixelId;
  return (
    <html lang="en">
      <body>
        {(googleTagId && <GoogleTag gtagId={googleTagId} />) || null}
        {(metaPixelId && <MetaPixel pixelId={metaPixelId} />) || null}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
