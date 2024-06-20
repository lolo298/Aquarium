import { cn } from "@/lib/utils";
import Header from "@/ui/components/Header";
import "@/ui/index.css";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next/types";
import Providers from "./Providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  applicationName: "Aquarium ARcade",
  description: "Aquarium ARcade",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aquarium ARcade" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          "flex min-h-full flex-col bg-background font-sans antialiased ",
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />
          <main className="relative flex-[10]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
