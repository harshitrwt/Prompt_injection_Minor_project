import Link from "next/link";
import { LogoIcon } from "../LogoIcon";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Restored Rich Gradient Background Effect specifically for Hero section */}
      <div
        className="pointer-events-none absolute -top-28 left-1/2 h-[520px] w-[95%] max-w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-coral/30 via-sky-blue/35 to-mint/35 filter blur-[80px] opacity-75 sm:h-[600px] sm:blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 left-1/4 h-[320px] w-[320px] rounded-full bg-gold/25 filter blur-[70px] opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-10 text-center">
        {/* Main Editorial Headline strictly matching Image 1 */}
        <h1 className="heading-editorial mx-auto max-w-[900px] text-[clamp(2.4rem,5.5vw,5rem)] text-off-black">
          Prompt Injection Defense,
          <br />
          Made Seamless
        </h1>

        {/* Monospace Subtext */}
        <p className="mx-auto mt-5 max-w-[620px] font-mono text-[14px] leading-relaxed text-graphite sm:text-[16px]">
          Cordon de-obfuscates, screens, and neutralizes adversarial prompts in
          real-time — stopping jailbreaks and system leaks before your LLM responds.
        </p>

        {/* Action Pill Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/dashboard"
            className="rounded-full bg-off-black px-6 py-3 font-mono text-[13px] uppercase tracking-wider text-parchment transition hover:bg-black shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
          >
            Get API Key &amp; SDK ▸
          </Link>
          <a
            href="#playground"
            className="rounded-full border border-ash bg-parchment/80 px-6 py-3 font-mono text-[13px] uppercase tracking-wider text-off-black transition hover:border-off-black hover:bg-white"
          >
            Live Playground
          </a>
        </div>

        {/* Live Animated Security Pipeline Diagram - Responsive for Mobile & Desktop */}
        <div id="pipeline" className="relative mx-auto mt-14 max-w-[1060px] select-none py-6">
          <div className="relative flex flex-col items-center justify-between lg:flex-row lg:items-center">
            
            {/* Left Source Nodes */}
            <div className="z-20 flex w-full flex-row flex-wrap justify-center gap-2.5 sm:gap-3 lg:w-48 lg:flex-col lg:items-start lg:gap-3.5">
              {[
                { label: "Express / Node", icon: "◈" },
                { label: "Next.js App", icon: "▲" },
                { label: "FastAPI / Python", icon: "⌬" },
                { label: "LangChain Agents", icon: "⌗" },
                { label: "Support Chatbots", icon: "☁" },
                { label: "OpenAI Proxy", icon: "⚡" },
              ].map((node) => (
                <div
                  key={node.label}
                  className="group flex items-center gap-2 rounded-full border border-ash bg-parchment/95 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-off-black shadow-sm transition hover:border-off-black hover:bg-white"
                >
                  <span className="text-[12px] text-smoke group-hover:text-off-black">{node.icon}</span>
                  <span className="font-medium">{node.label}</span>
                </div>
              ))}
            </div>

            {/* Center Animated Hub with Green Glow & Petals */}
            <div className="relative my-8 flex items-center justify-center lg:my-0">
              {/* Radial green glow halo */}
              <div
                className="animate-pulse-halo pointer-events-none absolute h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-mint/50 filter blur-[40px]"
                aria-hidden="true"
              />

              {/* Four petal clover container */}
              <div className="relative z-10 flex h-44 w-44 sm:h-48 sm:w-48 items-center justify-center">
                {/* 4 Petals */}
                <div className="absolute top-1 rounded-full bg-mint/40 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-off-black">
                  DECODE
                </div>
                <div className="absolute bottom-1 rounded-full bg-mint/40 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-off-black">
                  FUSION
                </div>
                <div className="absolute left-1 -rotate-90 rounded-full bg-mint/40 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-off-black">
                  INGEST
                </div>
                <div className="absolute right-1 rotate-90 rounded-full bg-mint/40 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-off-black">
                  AUDIT
                </div>

                {/* Rotating Dot Matrix Wheel Center with Official Logo */}
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-ash/80 bg-parchment shadow-md">
                  <div className="animate-spin-slow absolute inset-1 rounded-full border border-dashed border-off-black/60" />
                  <div className="animate-spin-slow-reverse absolute inset-3 rounded-full border border-dotted border-lake-blue/60" />
                  
                  {/* Central Logo Mark matching Image 1 */}
                  <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center">
                    <LogoIcon className="h-9 w-9 sm:h-11 sm:w-11 text-off-black transition-transform duration-500 hover:scale-110 drop-shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Destination Nodes */}
            <div className="z-20 flex w-full flex-row flex-wrap justify-center gap-2.5 sm:gap-3 lg:w-48 lg:flex-col lg:items-start lg:gap-3.5">
              {[
                { label: "Safe LLM Response", tag: "SAFE" },
                { label: "Review Queue", tag: "FLAG" },
                { label: "Autonomous Block", tag: "BLOCK" },
                { label: "Qdrant Vector DB", tag: "DENSE" },
                { label: "Audit Telemetry", tag: "LOG" },
                { label: "Cloud Security", tag: "SIEM" },
              ].map((node) => (
                <div
                  key={node.label}
                  className="group flex items-center gap-2 rounded-full border border-ash bg-parchment/95 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-off-black shadow-sm transition hover:border-off-black hover:bg-white"
                >
                  <span className="font-medium">{node.label}</span>
                  <span className="rounded-full bg-ash/50 px-1.5 py-0.2 font-mono text-[9px] text-smoke group-hover:bg-off-black group-hover:text-parchment">
                    {node.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* SVG Connecting Flow Lines for Large screens - All 6 inputs & 6 outputs connected with live flowing movement */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 1060 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* --- LEFT SOURCE 1: Express / Node (y=20) --- */}
              <path d="M 205 20 C 330 20, 410 140, 448 140" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 205 20 C 330 20, 410 140, 448 140" stroke="#2b59d1" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- LEFT SOURCE 2: Next.js App (y=68) --- */}
              <path d="M 205 68 C 320 68, 410 140, 448 140" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 205 68 C 320 68, 410 140, 448 140" stroke="#f37a0a" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- LEFT SOURCE 3: FastAPI / Python (y=116) --- */}
              <path d="M 205 116 C 300 116, 410 140, 448 140" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 205 116 C 300 116, 410 140, 448 140" stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- LEFT SOURCE 4: LangChain Agents (y=164) --- */}
              <path d="M 205 164 C 300 164, 410 140, 448 140" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 205 164 C 300 164, 410 140, 448 140" stroke="#242424" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- LEFT SOURCE 5: Support Chatbots (y=212) --- */}
              <path d="M 205 212 C 320 212, 410 140, 448 140" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 205 212 C 320 212, 410 140, 448 140" stroke="#4f7cf7" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- LEFT SOURCE 6: OpenAI Proxy (y=260) --- */}
              <path d="M 205 260 C 330 260, 410 140, 448 140" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 205 260 C 330 260, 410 140, 448 140" stroke="#ea580c" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- RIGHT DESTINATION 1: Safe LLM Response (y=20) --- */}
              <path d="M 612 140 C 650 140, 730 20, 855 20" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 612 140 C 650 140, 730 20, 855 20" stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- RIGHT DESTINATION 2: Review Queue (y=68) --- */}
              <path d="M 612 140 C 650 140, 740 68, 855 68" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 612 140 C 650 140, 740 68, 855 68" stroke="#f37a0a" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- RIGHT DESTINATION 3: Autonomous Block (y=116) --- */}
              <path d="M 612 140 C 650 140, 760 116, 855 116" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 612 140 C 650 140, 760 116, 855 116" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- RIGHT DESTINATION 4: Qdrant Vector DB (y=164) --- */}
              <path d="M 612 140 C 650 140, 760 164, 855 164" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 612 140 C 650 140, 760 164, 855 164" stroke="#2b59d1" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- RIGHT DESTINATION 5: Audit Telemetry (y=212) --- */}
              <path d="M 612 140 C 650 140, 740 212, 855 212" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 612 140 C 650 140, 740 212, 855 212" stroke="#059669" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />

              {/* --- RIGHT DESTINATION 6: Cloud Security (y=260) --- */}
              <path d="M 612 140 C 650 140, 730 260, 855 260" stroke="#cecac8" strokeWidth="1.2" fill="none" />
              <path d="M 612 140 C 650 140, 730 260, 855 260" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 8" className="animate-flow" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
