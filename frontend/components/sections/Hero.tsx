import Link from "next/link";

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
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-off-black px-6 py-3 font-mono text-[13px] uppercase tracking-wider text-parchment transition hover:bg-black shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
          >
            Start Free Trial
          </a>
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
                { label: "Any LLM App", icon: "◈" },
                { label: "ChatGPT Web", icon: "☁" },
                { label: "Claude Chat", icon: "⌗" },
                { label: "Local Ollama", icon: "⌬" },
                { label: "Web Context", icon: "⎘" },
                { label: "Tool Prompts", icon: "⚡" },
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

                {/* Rotating Dot Matrix Wheel Center */}
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-ash/80 bg-parchment shadow-md">
                  <div className="animate-spin-slow absolute inset-1 rounded-full border border-dashed border-off-black/60" />
                  <div className="animate-spin-slow-reverse absolute inset-3 rounded-full border border-dotted border-lake-blue/60" />
                  
                  {/* Central dot constellation */}
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-off-black animate-ping" />
                    <span className="absolute h-2 w-2 rounded-full bg-off-black" />
                  </div>
                </div>
              </div>

            
            </div>

            {/* Right Destination Nodes */}
            <div className="z-20 flex w-full flex-row flex-wrap justify-center gap-2.5 sm:gap-3 lg:w-48 lg:flex-col lg:items-end lg:gap-3.5">
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

            {/* SVG Connecting Flow Lines for Large screens */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 1060 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 190 30 C 350 30, 420 140, 450 140"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M 190 30 C 350 30, 420 140, 450 140"
                stroke="#2b59d1"
                strokeWidth="1.6"
                strokeDasharray="4 8"
                className="animate-flow"
                fill="none"
              />

              <path
                d="M 190 80 C 330 80, 420 140, 450 140"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M 190 80 C 330 80, 420 140, 450 140"
                stroke="#f37a0a"
                strokeWidth="1.6"
                strokeDasharray="4 8"
                className="animate-flow"
                fill="none"
              />

              <path
                d="M 190 140 L 450 140"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />

              <path
                d="M 190 200 C 330 200, 420 140, 450 140"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M 190 200 C 330 200, 420 140, 450 140"
                stroke="#242424"
                strokeWidth="1.6"
                strokeDasharray="4 8"
                className="animate-flow"
                fill="none"
              />

              <path
                d="M 190 250 C 350 250, 420 140, 450 140"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />

              {/* Center to Right */}
              <path
                d="M 610 140 C 640 140, 710 30, 870 30"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M 610 140 C 640 140, 710 30, 870 30"
                stroke="#a7fccd"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="animate-flow"
                fill="none"
              />

              <path
                d="M 610 140 C 640 140, 730 80, 870 80"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />

              <path
                d="M 610 140 L 870 140"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M 610 140 L 870 140"
                stroke="#ff9473"
                strokeWidth="1.6"
                strokeDasharray="4 8"
                className="animate-flow"
                fill="none"
              />

              <path
                d="M 610 140 C 640 140, 730 200, 870 200"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />

              <path
                d="M 610 140 C 640 140, 710 250, 870 250"
                stroke="#cecac8"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
