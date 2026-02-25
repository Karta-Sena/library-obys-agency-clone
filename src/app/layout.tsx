import type { ReactNode } from "react";

export const metadata = {
  title: "ODB | Obys' Design Books Clone",
  description:
    "Obys? Design Books - a personal selection of titles that show design in ways the screen never could.",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-top="true"
      data-theme="dark"
      className="is-loading show-loading-screen"
      style={{ "--cursor-x": "-0.2", "--cursor-y": "-0.2" } as React.CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
