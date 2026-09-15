import type { Metadata } from "next";
import { Rubik_Mono_One, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Cordon — Prompt injection defense for your chatbot",
  description:
    "Drop-in middleware that screens every prompt for injection, jailbreak, and extraction attempts before it reaches your LLM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
