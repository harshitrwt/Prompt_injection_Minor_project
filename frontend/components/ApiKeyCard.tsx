"use client";

import { useState } from "react";

function randomKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "cd_live_";
  for (let i = 0; i < 32; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function ApiKeyCard() {
  const [key, setKey] = useState("cd_live_9f2a1b7c4e6d8091a3b5c7d9e1f2a3b4");
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const masked = key.slice(0, 8) + "•".repeat(20) + key.slice(-4);

  async function copy() {
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  }

  function regenerate() {
    if (
      !confirm(
        "Regenerate your API key? Requests using the old key will stop working."
      )
    )
      return;
    setKey(randomKey());
    setRevealed(true);
  }

  return (
    <div className="hard-card p-6">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-[11px] text-ink-60">
          Live API key
        </span>
        <span className="sticker" style={{ padding: "4px 12px", boxShadow: "none", fontSize: "11px" }}>
          Active
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 overflow-x-auto border-[3px] border-ink bg-paper px-4 py-3">
        <code className="whitespace-nowrap font-mono text-[14px] text-ink">
          {revealed ? key : masked}
        </code>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => setRevealed((v) => !v)}
          className="rounded-full border-[3px] border-ink px-4 py-2 font-body text-[13px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button
          onClick={copy}
          className="rounded-full border-[3px] border-ink bg-ink px-4 py-2 font-body text-[13px] font-semibold text-ground transition-transform hover:-translate-y-0.5"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={regenerate}
          className="ml-auto font-body text-[13px] text-ink-60 underline underline-offset-4 hover:text-ink"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}
