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
  title: "Cordon — Prompt Injection Defense Middleware for Node.js & LLM Apps",
  description:
    "Production-grade npm middleware and API gateway screening every prompt for injections, jailbreaks, and extractions in under 20ms using ML, heuristics, and Qdrant Cloud vector similarity.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
