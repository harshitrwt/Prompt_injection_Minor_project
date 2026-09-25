"use client";

import { useState } from "react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 flex min-h-[38px] w-full items-center justify-between bg-ink px-4 py-1 text-parchment sm:px-8"
    >
      <div className="flex flex-1 items-center justify-center gap-2 text-center">
        <span className="font-mono text-[11px] uppercase tracking-wider text-parchment/90 sm:text-[12px]">
          Research Prototype v1.0 · Evaluated on 2,769 Attack Vectors (Kaggle MPDD)
        </span>
        <a
          href="#benchmarks"
          className="hidden rounded-full border border-ash/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-parchment transition hover:border-parchment sm:inline-flex"
        >
          View Data ▸
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close notification"
        className="ml-3 font-mono text-[16px] text-smoke hover:text-parchment leading-none"
      >
        ×
      </button>
    </aside>
  );
}
