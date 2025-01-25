"use client";

import Script from "next/script";

export function Hotjar({ hjId }: { hjId: string }) {
  return (
    <>
      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${hjId},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    hj?(dispatchType: "event", eventName: string): void;
    hj?(
      dispatchType: "identify",
      userId: string,
      userData: Readonly<Record<string, unknown>>
    ): void;
  }
}

export function dispatchHotJarEvent(eventName: string) {
  window.hj?.("event", eventName);
}

export function identifyHotJarUser(
  userId: string,
  userData: Readonly<Record<string, unknown>>
) {
  window.hj?.("identify", userId, userData);
}
