export function Architecture() {
  return (
    <section id="detectors" className="py-20 sm:py-28">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        
        {/* Elevated Periwinkle Mist Card - EXACT Recreation of Image 2 */}
        <div className="relative overflow-hidden rounded-[40px] border border-[#b8c8ee] bg-[#cfdaf5] p-10 sm:p-16">
          {/* Subtle gradient wash behind the concentric arcs */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-coral/40 via-sky-blue/50 to-mint/40 filter blur-[60px]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div className="max-w-[500px]">
              <h2 className="heading-editorial text-[clamp(2.2rem,4.2vw,3.6rem)] text-off-black">
                Screen Every AI Chat, Effortlessly
              </h2>
              <p className="mt-5 font-mono text-[15px] leading-relaxed text-graphite sm:text-[16px]">
                Protect any AI interface in seconds, not months. No custom
                proxies. No latency penalty. Native browser hook checks every prompt
                before dispatch. Connect and go.
              </p>
              <div className="mt-8">
                <a
                  href="#coverage"
                  className="rounded-full bg-off-black px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider text-parchment transition hover:bg-black shadow-[0_2px_10px_rgba(0,0,0,0.15)] inline-block"
                >
                  Explore Threat Coverage
                </a>
              </div>
            </div>

            {/* Right Concentric Arcs & Floating Integrations from Image 2 */}
            <div className="relative flex h-[380px] w-full items-center justify-end overflow-hidden">
              {/* Concentric curved SVG stream arcs */}
              <svg
                className="absolute right-0 top-0 h-full w-[440px]"
                viewBox="0 0 440 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 120 0 C 120 180, 260 380, 440 380"
                  stroke="#a0b5eb"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="animate-flow"
                />
                <path
                  d="M 170 0 C 170 160, 290 380, 440 380"
                  stroke="#a0b5eb"
                  strokeWidth="1"
                />
                <path
                  d="M 220 0 C 220 140, 320 380, 440 380"
                  stroke="#a0b5eb"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="animate-flow"
                />
                <path
                  d="M 270 0 C 270 120, 350 380, 440 380"
                  stroke="#a0b5eb"
                  strokeWidth="1"
                />
              </svg>

              {/* Floating Integrations Pill Badges with Icons */}
              <div className="relative z-10 flex flex-col gap-4 font-mono text-[14px]">
                {[
                  {
                    name: "OWASP Top 10 (LLM01)",
                    icon: "🛡",
                    bgColor: "bg-white",
                    offset: "mr-12 animate-float-slow",
                  },
                  {
                    name: "ChatGPT WebUI",
                    icon: "☁",
                    bgColor: "bg-white",
                    offset: "mr-4 animate-float-delay",
                  },
                  {
                    name: "Claude.ai Web",
                    icon: "✳",
                    bgColor: "bg-white",
                    offset: "mr-16 animate-float-slow",
                  },
                  {
                    name: "Google Gemini",
                    icon: "✦",
                    bgColor: "bg-white",
                    offset: "mr-6 animate-float-delay",
                  },
                  {
                    name: "Local Ollama & Open-WebUI",
                    icon: "⌬",
                    bgColor: "bg-white",
                    offset: "mr-14 animate-float-slow",
                  },
                  {
                    name: "Qdrant Cloud Vectors",
                    icon: "◈",
                    bgColor: "bg-white",
                    offset: "mr-2 animate-float-delay",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-3 rounded-full border border-ash/80 ${item.bgColor} px-4 py-2 text-off-black shadow-sm transition hover:scale-105 ${item.offset}`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-parchment text-[12px]">
                      {item.icon}
                    </span>
                    <span className="font-medium text-[13px]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Detailed Detector Cards in Monad Editorial Style */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="card-editorial flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
                Detector 01
              </span>
              <h3 className="heading-editorial mt-3 text-[22px] text-off-black">
                Statistical ML Classifier
              </h3>
              <p className="mt-3 font-mono text-[14px] leading-relaxed text-graphite">
                Extracts 5,000 TF-IDF n-gram token features evaluated by an ensemble Random
                Forest classifier. Detects subtle semantic cues of injection with 97.08% precision.
              </p>
            </div>
            <div className="mt-6 border-t border-ash pt-4 font-mono text-[12px] text-smoke">
              Precision: 97.1% · FPR: 2.28%
            </div>
          </div>

          <div className="card-editorial flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
                Detector 02
              </span>
              <h3 className="heading-editorial mt-3 text-[22px] text-off-black">
                Heuristic &amp; Pretext Engine
              </h3>
              <p className="mt-3 font-mono text-[14px] leading-relaxed text-graphite">
                Deterministic regex targeting prompt leaks, authority impersonation
                (&quot;senior engineer&quot;), emergency maintenance framing, and delimiter hijacking.
              </p>
            </div>
            <div className="mt-6 border-t border-ash pt-4 font-mono text-[12px] text-smoke">
              Precision: 100% · Zero False Positives
            </div>
          </div>

          <div className="card-editorial flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
                Detector 03
              </span>
              <h3 className="heading-editorial mt-3 text-[22px] text-off-black">
                Dense Vector Embedding Search
              </h3>
              <p className="mt-3 font-mono text-[14px] leading-relaxed text-graphite">
                SentenceTransformers mapped into Qdrant Cloud. Detects semantically
                similar jailbreaks and attack variations even when completely rephrased.
              </p>
            </div>
            <div className="mt-6 border-t border-ash pt-4 font-mono text-[12px] text-smoke">
              Cosine Sim Threshold &gt; 0.78
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
