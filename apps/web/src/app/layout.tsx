import { cn } from "@/lib/utils";
import Nav from "@/ui/components/Nav";
import Header from "@/ui/components/Header";
import "@/ui/index.css";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased ",
          fontSans.variable,
        )}
      >
        <Header />
        <main className="flex-[10]">{children}</main>
        <Nav />
      </body>
    </html>
  );
}
