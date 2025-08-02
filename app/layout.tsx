import StyledComponentsRegistry from "@lib/registry";
import { Provider as StoreProvider } from "jotai";
import type { Metadata } from "next";
import localFont from "next/font/local";

const trueno = localFont({
  src: [
    {
      path: "../public/fonts/truenoultlt.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/truenolt.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/truenorg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/truenosbd.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/truenobd.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/truenoexbd.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/truenoblk.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

import "./globals.css";

export const metadata: Metadata = {
  title: "Alma",
  description: "Alma Leads Form System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={trueno.className}>
        <StoreProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
