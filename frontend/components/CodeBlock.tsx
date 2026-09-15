"use client";

import { useState } from "react";

export function CodeBlock({
  code,
  label,
  inverted = false,
}: {
  code: string;
  label?: string;
  inverted?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <div
      className={`hard-card overflow-hidden ${
        inverted ? "border-ground bg-ink" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between border-b-[3px] px-4 py-2.5 ${
          inverted ? "border-ground/40" : "border-ink"
        }`}
      >
        <span
          className={`eyebrow text-[11px] ${
            inverted ? "text-ground/70" : "text-ink-60"
          }`}
        >
          {label ?? "Terminal"}
        </span>
        <button
          onClick={copy}
          className={`font-body text-[12px] font-semibold underline-offset-4 hover:underline ${
            inverted ? "text-ground" : "text-ink"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={`overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed ${
          inverted ? "text-ground" : "text-ink"
        }`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
