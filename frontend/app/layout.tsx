import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-untitled-serif",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-diatype-mono",
});

export const metadata: Metadata = {
  title: "Cordon — Prompt Injection Defense for Browser & LLM Applications",
  description:
    "An intelligent browser extension and middleware screening every prompt for injections, jailbreaks, and extractions using multi-signal ML, heuristics, and semantic vector similarity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-parchment text-off-black antialiased selection:bg-off-black selection:text-parchment">
        {children}
      </body>
    </html>
  );
}
