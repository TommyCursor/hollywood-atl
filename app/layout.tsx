import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hollywood ATL | Financial Operations",
  description: "Hollywood ATL Financial Command & Operations System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
