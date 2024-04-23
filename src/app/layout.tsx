import Nav from "@/components/ui/Nav";
import "./index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Nav />
      </body>
    </html>
  );
}
