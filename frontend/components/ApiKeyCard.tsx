"use client";

import { useState } from "react";

function generateKey(tier: "free" | "pro") {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = tier === "pro" ? "st_pro_" : "st_free_";
  for (let i = 0; i < 32; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function ApiKeyCard({
  tier = "free",
  onUpgrade,
}: {
  tier?: "free" | "pro";
  onUpgrade?: () => void;
}) {
  const [freeKey, setFreeKey] = useState("st_free_9f2a1b7c4e6d8091a3b5c7d9e1f2a3b4");
  const [proKey, setProKey] = useState("st_pro_9f2a1b7c4e6d8091a3b5c7d9e1f2a3b4");
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const key = tier === "pro" ? proKey : freeKey;
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
    const newKey = generateKey(tier);
    if (tier === "pro") setProKey(newKey);
    else setFreeKey(newKey);
    setRevealed(true);
  }

  return (
    <div className="rounded-2xl border border-ash bg-parchment p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
            SDK &amp; Gateway API Key
          </span>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider ${
              tier === "pro"
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-lake-blue/15 text-lake-blue border border-lake-blue/30"
            }`}
          >
            {tier === "pro" ? "Pro · 100k/mo" : "Free · 5k/mo"}
          </span>
        </div>

        {tier === "free" && onUpgrade && (
          <button
            onClick={onUpgrade}
            className="font-mono text-[11px] font-medium text-crimson hover:underline"
          >
            ⚡ Upgrade
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 overflow-x-auto rounded-xl border border-ash bg-white px-4 py-3 shadow-inner">
        <code className="whitespace-nowrap font-mono text-[13px] text-off-black">
          {revealed ? key : masked}
        </code>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setRevealed((v) => !v)}
          className="rounded-full border border-ash px-4 py-1.5 font-mono text-[11px] uppercase text-off-black transition hover:border-off-black bg-white"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button
          onClick={copy}
          className="rounded-full bg-off-black px-4 py-1.5 font-mono text-[11px] uppercase text-parchment transition hover:bg-black"
        >
          {copied ? "Copied ✓" : "Copy Key"}
        </button>
        <button
          onClick={regenerate}
          className="ml-auto font-mono text-[11px] uppercase text-smoke underline underline-offset-4 hover:text-off-black"
        >
          Regenerate
        </button>
      </div>

      {tier === "free" && (
        <div className="mt-4 rounded-xl border border-ash/60 bg-white/60 p-3 text-[11px] font-mono text-smoke">
          <p>
            Default Free Install: Zero-config in-memory mode works without key. For Cloud ML &amp; Qdrant vectors, use this key.
          </p>
        </div>
      )}
    </div>
  );
}
