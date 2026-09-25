export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="mb-14">
          <h2 className="heading-editorial text-[clamp(2.4rem,4.5vw,3.6rem)] text-off-black">
            How Cordon Works
          </h2>
        </div>

        {/* Bento Grid layout - EXACT Recreation of Image 3 */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* TALL LEFT CARD (Image 3 Left) - In-Browser Security Pipeline */}
          <div className="card-editorial relative overflow-hidden flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex items-center gap-2 text-smoke">
                <span className="font-mono text-[14px]">⑂</span>
                <span className="font-mono text-[11px] uppercase tracking-widest">
                  In-Browser Security Pipeline
                </span>
              </div>
              <h3 className="heading-editorial mt-3 text-[24px] text-off-black">
                Managed Prompt Pipeline
              </h3>
              <p className="mt-2 font-mono text-[14px] leading-relaxed text-graphite">
                Intercepts user prompts in milliseconds. No custom parsers.
                Zero infrastructure overhead. No BS.
              </p>
            </div>

            {/* Vertical Flowchart Figure from Image 3 */}
            <div className="relative mt-8 flex flex-col items-center">
              {/* Node 1 */}
              <div className="w-full max-w-[280px] rounded-2xl border border-ash bg-white p-3.5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-parchment font-mono text-[11px] font-bold text-off-black">
                    AI
                  </div>
                  <div>
                    <div className="font-mono text-[12px] font-medium text-off-black">
                      Browser Prompt Input
                    </div>
                    <div className="font-mono text-[10px] text-smoke">
                      ChatGPT / Claude / WebUI
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line with Always badge */}
              <div className="my-2 flex flex-col items-center">
                <div className="h-4 w-px bg-ash" />
                <span className="rounded-full border border-sky-blue/80 bg-sky-blue/20 px-2.5 py-0.5 font-mono text-[10px] text-lake-blue">
                  Always
                </span>
                <div className="h-4 w-px bg-ash" />
              </div>

              {/* Node 2 */}
              <div className="w-full max-w-[280px] rounded-2xl border border-ash bg-white p-3.5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-parchment font-mono text-[11px] text-lake-blue">
                    ⚡
                  </div>
                  <div>
                    <div className="font-mono text-[12px] font-medium text-off-black">
                      Auto De-Obfuscator
                    </div>
                    <div className="font-mono text-[10px] text-smoke">
                      Base64 / Hex / Homoglyphs
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line with Always badge */}
              <div className="my-2 flex flex-col items-center">
                <div className="h-4 w-px bg-ash" />
                <span className="rounded-full border border-sky-blue/80 bg-sky-blue/20 px-2.5 py-0.5 font-mono text-[10px] text-lake-blue">
                  Always
                </span>
                <div className="h-4 w-px bg-ash" />
              </div>

              {/* Node 3 */}
              <div className="w-full max-w-[280px] rounded-2xl border border-ash bg-white p-3.5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-parchment font-mono text-[11px] text-crimson">
                    ◈
                  </div>
                  <div>
                    <div className="font-mono text-[12px] font-medium text-off-black">
                      Multi-Signal Fusion
                    </div>
                    <div className="font-mono text-[10px] text-smoke">
                      ML + Heuristics + Qdrant
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line with OR badge */}
              <div className="my-2 flex flex-col items-center">
                <div className="h-4 w-px bg-ash" />
                <span className="rounded-full border border-ash bg-parchment px-2.5 py-0.5 font-mono text-[10px] text-graphite">
                  OR
                </span>
                <div className="h-4 w-px bg-ash" />
              </div>

              {/* Node 4 Split Output */}
              <div className="grid w-full max-w-[280px] grid-cols-2 gap-2">
                <div className="rounded-xl border border-mint/80 bg-white p-2.5 text-center">
                  <div className="font-mono text-[11px] font-semibold text-off-black">
                    Safe Output
                  </div>
                  <div className="font-mono text-[9px] text-smoke">Dispatch to LLM</div>
                </div>
                <div className="rounded-xl border border-coral/80 bg-white p-2.5 text-center">
                  <div className="font-mono text-[11px] font-semibold text-crimson">
                    Block Threat
                  </div>
                  <div className="font-mono text-[9px] text-smoke">Neutralize Prompt</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Image 3 Right Column - 3 Cards) */}
          <div className="grid gap-6 lg:col-span-7">
            
            {/* CARD 1 (Top Right): In-flight Data Transforms with Animated Geometric Center */}
            <div className="card-editorial relative overflow-hidden">
              {/* Green glow background */}
              <div
                className="animate-pulse-halo pointer-events-none absolute right-12 top-6 h-48 w-48 rounded-full bg-mint/40 filter blur-[40px]"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-[340px]">
                  <div className="flex items-center gap-2 text-smoke">
                    <span className="font-mono text-[14px]">⊚</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest">
                      In-Flight Prompt Transforms
                    </span>
                  </div>
                  <h3 className="heading-editorial mt-2 text-[22px] text-off-black">
                    In-flight Threat Filtering
                  </h3>
                  <p className="mt-2 font-mono text-[13px] leading-relaxed text-graphite">
                    Kill the injection before it executes. Multi-signal screening
                    neutralizes up to 94% of adversarial vectors without altering benign queries.
                  </p>
                </div>

                {/* Animated Origami / Geometric Glyph from Image 3 */}
                <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
                  {/* Rotating geometric shape with gradient */}
                  <div className="animate-spin-slow absolute h-28 w-28 rounded-2xl bg-gradient-to-tr from-coral via-sky-blue to-mint opacity-85 shadow-md" />
                  <div className="animate-spin-slow-reverse absolute h-24 w-24 rounded-xl bg-white shadow-inner flex items-center justify-center">
                    {/* Center rotating dot constellation */}
                    <div className="relative flex h-8 w-8 items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-off-black" />
                      <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-off-black" />
                    </div>
                  </div>
                  {/* Orbiting particles */}
                  <div className="animate-float-slow absolute -left-2 top-4 h-3 w-3 rounded-full bg-off-black" />
                  <div className="animate-float-delay absolute -right-2 bottom-4 h-4 w-4 rounded-full bg-gold" />
                </div>
              </div>
            </div>

            {/* CARD 2 (Middle Right): Rule-Based Data Routing with Logic Pills & Code Card */}
            <div className="card-editorial relative overflow-hidden bg-gradient-to-br from-parchment to-mint/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-smoke">
                  <span className="font-mono text-[14px]">⑂</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest">
                    Rule-Based Heuristic Routing
                  </span>
                </div>
                {/* Logic Pills Row from Image 3 */}
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="rounded-full border border-sky-blue/80 bg-sky-blue/20 px-2 py-0.5 text-lake-blue">
                    Always
                  </span>
                  <span className="rounded-full border border-ash bg-white px-2 py-0.5 text-graphite">
                    AND
                  </span>
                  <span className="rounded-full border border-ash bg-white px-2 py-0.5 text-graphite">
                    OR
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="heading-editorial text-[22px] text-off-black">
                    Adaptive Pattern Matching
                  </h3>
                  <p className="mt-2 font-mono text-[13px] leading-relaxed text-graphite">
                    Deterministic regex rules catch authority pretexting and system prompt
                    extraction instantly with zero false positives.
                  </p>
                </div>

                {/* Rules Mockup Card from Image 3 */}
                <div className="rounded-2xl border border-ash bg-white p-4 shadow-sm font-mono text-[11px]">
                  <div className="text-[10px] uppercase tracking-wider text-smoke pb-2 border-b border-ash/50 flex justify-between">
                    <span>Active Heuristic Rules</span>
                    <span className="text-lake-blue">100% Precision</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-parchment/60 p-2 text-off-black">
                      <span className="text-smoke mr-2">1</span>
                      <span className="truncate flex-1 font-mono text-[11px]">
                        pattern: &apos;ignore.*instructions&apos;
                      </span>
                      <span className="text-smoke">🗑</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-parchment/60 p-2 text-off-black">
                      <span className="text-smoke mr-2">2</span>
                      <span className="truncate flex-1 font-mono text-[11px]">
                        pretext: &apos;senior engineer|maintenance&apos;
                      </span>
                      <span className="text-smoke">🗑</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3 (Bottom Right): Deploy Your Way with 3 Overlapping Tilted Cards */}
            <div className="card-editorial relative overflow-hidden bg-gradient-to-br from-parchment to-coral/15">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <div className="flex items-center gap-2 text-smoke">
                    <span className="font-mono text-[14px]">&lt;/&gt;</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest">
                      Deploy Your Way
                    </span>
                  </div>
                  <h3 className="heading-editorial mt-2 text-[22px] text-off-black">
                    Extension or Middleware
                  </h3>
                  <p className="mt-2 font-mono text-[13px] leading-relaxed text-graphite">
                    Run it wherever makes sense. Chrome extension for instant personal defense,
                    or Python middleware with Qdrant for enterprise LLM apps.
                  </p>
                </div>

                {/* 3 Overlapping Cards from Image 3 */}
                <div className="relative flex h-36 items-center justify-center">
                  {/* Card 1 */}
                  <div className="absolute left-2 top-2 z-10 w-32 rounded-xl border border-ash bg-white p-3 shadow-sm rotate-[-4deg] transition hover:rotate-0 hover:scale-105">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px]">☁</span>
                      <span className="h-2 w-2 rounded-full bg-mint" />
                    </div>
                    <div className="mt-2 font-mono text-[12px] font-semibold text-off-black">
                      Extension
                    </div>
                    <div className="font-mono text-[9px] text-smoke">1-Click Chrome</div>
                  </div>

                  {/* Card 2 */}
                  <div className="absolute left-18 top-4 z-20 w-32 rounded-xl border border-ash bg-white p-3 shadow-md rotate-[2deg] transition hover:rotate-0 hover:scale-105">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px]">⌬</span>
                      <span className="h-2 w-2 rounded-full bg-lake-blue" />
                    </div>
                    <div className="mt-2 font-mono text-[12px] font-semibold text-off-black">
                      Hybrid
                    </div>
                    <div className="font-mono text-[9px] text-smoke">Qdrant Cloud</div>
                  </div>

                  {/* Card 3 */}
                  <div className="absolute right-2 top-1 z-30 w-32 rounded-xl border border-ash bg-white p-3 shadow-sm rotate-[6deg] transition hover:rotate-0 hover:scale-105">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px]">⚡</span>
                      <span className="h-2 w-2 rounded-full bg-mint" />
                    </div>
                    <div className="mt-2 font-mono text-[12px] font-semibold text-off-black">
                      On-Prem
                    </div>
                    <div className="font-mono text-[9px] text-smoke">Python SDK</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
