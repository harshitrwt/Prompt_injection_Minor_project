"use client";

import { useState } from "react";

function randomKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "st_live_";
  for (let i = 0; i < 32; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function ApiKeyCard() {
  const [key, setKey] = useState("st_live_9f2a1b7c4e6d8091a3b5c7d9e1f2a3b4");
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
    <div className="rounded-2xl border border-ash bg-parchment p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
          Extension &amp; API Key
        </span>
        <span className="rounded-pill border border-mint/80 bg-mint/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-off-black">
          Active
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 overflow-x-auto rounded-xl border border-ash bg-parchment/60 px-4 py-3">
        <code className="whitespace-nowrap font-mono text-[13px] text-off-black">
          {revealed ? key : masked}
        </code>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRevealed((v) => !v)}
          className="rounded-pill border border-ash px-4 py-1.5 font-mono text-[12px] uppercase text-off-black transition hover:border-off-black"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button
          onClick={copy}
          className="rounded-pill bg-off-black px-4 py-1.5 font-mono text-[12px] uppercase text-parchment transition hover:bg-black"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
        <button
          onClick={regenerate}
          className="ml-auto font-mono text-[11px] uppercase text-smoke underline underline-offset-4 hover:text-off-black"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}
