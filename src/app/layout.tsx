import { GoogleTag } from "@/components/Tracking/GoogleTag";
import { Hotjar } from "@/components/Tracking/Hotjar";
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
  const hotjarId = config.tracking?.hotjarId;
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body>
        {(googleTagId && <GoogleTag gtagId={googleTagId} />) || null}
        {(metaPixelId && <MetaPixel pixelId={metaPixelId} />) || null}
        {(hotjarId && <Hotjar hjId={hotjarId} />) || null}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
