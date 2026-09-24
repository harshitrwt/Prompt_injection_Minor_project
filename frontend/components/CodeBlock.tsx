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
      // clipboard unavailable
    }
  }

  return (
    <div
      className={`rounded-2xl border border-ash overflow-hidden ${
        inverted ? "bg-off-black text-parchment" : "bg-parchment/70 text-off-black"
      }`}
    >
      <div className="flex items-center justify-between border-b border-ash px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
          {label ?? "Terminal"}
        </span>
        <button
          onClick={copy}
          className="font-mono text-[11px] uppercase tracking-wider text-graphite hover:text-off-black transition"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
