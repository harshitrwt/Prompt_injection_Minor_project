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
              <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
                Universal Node.js &amp; API Integration
              </span>
              <h2 className="heading-editorial mt-3 text-[clamp(2.2rem,4.2vw,3.6rem)] text-off-black">
                Screen Every Prompt, Effortlessly
              </h2>
              <p className="mt-5 font-mono text-[15px] leading-relaxed text-graphite sm:text-[16px]">
                Protect any AI interface or backend endpoint in seconds, not months. Zero custom
                proxies. Zero latency penalty. Production npm middleware screens every prompt
                before inference dispatch. Plug and go.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#coverage"
                  className="rounded-full bg-off-black px-7 py-3.5 font-mono text-[13px] uppercase tracking-wider text-parchment transition hover:bg-black shadow-[0_2px_10px_rgba(0,0,0,0.15)] inline-block"
                >
                  Explore Threat Coverage
                </a>
                <span className="font-mono text-[11px] text-smoke">
                  npm install @cordon/guard
                </span>
              </div>
            </div>

            {/* Right Live Infinite Scrolling Integrations Showcase */}
            <div className="conveyor-container relative flex h-[420px] w-full items-center justify-end overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]">
              {/* Seamless Infinite Streaming Pill Column with Dual-Track Loop */}
              <div className="relative z-10 flex w-full max-w-[340px] flex-col gap-3.5 overflow-hidden py-1">
                {/* Track 1 */}
                <div className="flex flex-col gap-3.5 shrink-0 animate-infinite-scroll-up">
                  {[
                    { name: "OWASP Top 10 (LLM01)", icon: "🛡", status: "SAFE", statColor: "text-emerald-700 bg-emerald-50 border-emerald-200", mr: "mr-10" },
                    { name: "ChatGPT WebUI", icon: "☁", status: "18ms", statColor: "text-lake-blue bg-blue-50 border-blue-200", mr: "mr-3" },
                    { name: "Claude.ai Web", icon: "✳", status: "VERIFIED", statColor: "text-emerald-700 bg-emerald-50 border-emerald-200", mr: "mr-14" },
                    { name: "Google Gemini", icon: "✦", status: "ACTIVE", statColor: "text-crimson bg-orange-50 border-orange-200", mr: "mr-5" },
                    { name: "Local Ollama & Open-WebUI", icon: "⌬", status: "GUARDED", statColor: "text-lake-blue bg-blue-50 border-blue-200", mr: "mr-12" },
                    { name: "Qdrant Cloud Vectors", icon: "◈", status: "DENSE", statColor: "text-off-black bg-ash/50 border-ash", mr: "mr-2" },
                    { name: "LangChain Agents", icon: "⌗", status: "SHIELDED", statColor: "text-emerald-700 bg-emerald-50 border-emerald-200", mr: "mr-8" },
                  ].map((item, idx) => (
                    <div
                      key={`t1-${item.name}-${idx}`}
                      className={`group flex items-center justify-between gap-3 rounded-full border border-ash/80 bg-white/95 px-4 py-2.5 font-mono text-off-black shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-off-black ${item.mr}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-parchment text-[12px] shadow-inner">
                          {item.icon}
                        </span>
                        <span className="text-[12.5px] font-medium tracking-tight text-off-black">
                          {item.name}
                        </span>
                      </div>

                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${item.statColor}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80 animate-pulse" />
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Track 2 (Clone for mathematically seamless infinite scroll) */}
                <div className="flex flex-col gap-3.5 shrink-0 animate-infinite-scroll-up" aria-hidden="true">
                  {[
                    { name: "OWASP Top 10 (LLM01)", icon: "🛡", status: "SAFE", statColor: "text-emerald-700 bg-emerald-50 border-emerald-200", mr: "mr-10" },
                    { name: "ChatGPT WebUI", icon: "☁", status: "18ms", statColor: "text-lake-blue bg-blue-50 border-blue-200", mr: "mr-3" },
                    { name: "Claude.ai Web", icon: "✳", status: "VERIFIED", statColor: "text-emerald-700 bg-emerald-50 border-emerald-200", mr: "mr-14" },
                    { name: "Google Gemini", icon: "✦", status: "ACTIVE", statColor: "text-crimson bg-orange-50 border-orange-200", mr: "mr-5" },
                    { name: "Local Ollama & Open-WebUI", icon: "⌬", status: "GUARDED", statColor: "text-lake-blue bg-blue-50 border-blue-200", mr: "mr-12" },
                    { name: "Qdrant Cloud Vectors", icon: "◈", status: "DENSE", statColor: "text-off-black bg-ash/50 border-ash", mr: "mr-2" },
                    { name: "LangChain Agents", icon: "⌗", status: "SHIELDED", statColor: "text-emerald-700 bg-emerald-50 border-emerald-200", mr: "mr-8" },
                  ].map((item, idx) => (
                    <div
                      key={`t2-${item.name}-${idx}`}
                      className={`group flex items-center justify-between gap-3 rounded-full border border-ash/80 bg-white/95 px-4 py-2.5 font-mono text-off-black shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-off-black ${item.mr}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-parchment text-[12px] shadow-inner">
                          {item.icon}
                        </span>
                        <span className="text-[12.5px] font-medium tracking-tight text-off-black">
                          {item.name}
                        </span>
                      </div>

                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${item.statColor}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80 animate-pulse" />
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
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
