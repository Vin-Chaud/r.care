"use client";

import Script from "next/script";

export function GoogleTag({ gtagId }: { gtagId: string }) {
  return (
    <>
      <Script
        id="google-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gtagId)});
`,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
          gtagId
        )}`}
        strategy="afterInteractive"
      />
    </>
  );
}

declare global {
  interface Window {
    gtag?(dispatchType: "event", eventName: string, eventPayload: any): void;
  }
}

export function dispatchGoogleTagEvent(eventName: string, eventPayload: any) {
  window.gtag?.("event", eventName, eventPayload);
}
