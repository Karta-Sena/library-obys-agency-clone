import type { ReactNode } from "react";
import Script from "next/script";

export default function LegacyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Script
        src="/assets/js/runtime.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/gsap.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/three.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/app.js"
        strategy="afterInteractive"
      />
    </>
  );
}
