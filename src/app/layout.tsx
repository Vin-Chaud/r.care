import StyledComponentsRegistry from "@/lib/styledComponentRegistry";
import type { Metadata } from "next";
import "./globals.css";
import { GoogleTag } from "@/components/Tracking/GoogleTag";
import { MetaPixel } from "@/components/Tracking/MetaPixel";

export const metadata: Metadata = {
  title: "r.care onboarding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleTagId = process.env["RCARE__TRACKING__GOOGLE_TAG_ID"];
  const metaPixelId = process.env["RCARE__TRACKING__META_PIXEL_ID"];
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body>
        {(googleTagId && <GoogleTag gtagId={googleTagId} />) || null}
        {(metaPixelId && <MetaPixel pixelId={metaPixelId} />) || null}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
