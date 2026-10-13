export function Coverage() {
  const categories = [
    {
      code: "01",
      title: "Instruction Override",
      body: '"Ignore all previous instructions", prompt resets, and semantic rewrites designed to overwrite developer constraints.',
      tag: "Regex + ML",
    },
    {
      code: "02",
      title: "System Extraction",
      body: "Sophisticated probes attempting to force the model to print its initial system instructions, credentials, or internal configuration.",
      tag: "Heuristics",
    },
    {
      code: "03",
      title: "Social Engineering & Pretexting",
      body: 'Authority impersonation such as "I am the senior infrastructure engineer" or false emergency maintenance pretexts.',
      tag: "Rule Engine",
    },
    {
      code: "04",
      title: "Jailbreaks & Role Play",
      body: 'DAN-style personas, fictional hypotheticals, and unrestricted "developer mode" framing aimed at safety bypass.',
      tag: "Qdrant Vectors",
    },
    {
      code: "05",
      title: "Indirect Prompt Injection",
      body: "Adversarial instructions smuggled into context via untrusted web pages, emails, customer support tickets, or tool returns.",
      tag: "Multi-Signal",
    },
    {
      code: "06",
      title: "Encoding & Obfuscation",
      body: "Base64 payloads, hexadecimal byte sequences, and zero-width Unicode homoglyphs automatically decoded prior to inspection.",
      tag: "Auto-Decoder",
    },
  ];

  return (
    <section id="coverage" className="border-t border-ash py-24 sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[580px]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
              Threat Coverage
            </span>
            <h2 className="heading-editorial mt-3 text-[clamp(2rem,4vw,3.2rem)] text-off-black">
              Comprehensive attack vector defense.
            </h2>
            <p className="mt-4 font-mono text-[15px] leading-relaxed text-graphite">
              Every prompt sent to your application or chatbot is evaluated across known OWASP LLM01
              jailbreaks, extraction strategies, and covert obfuscation schemes.
            </p>
          </div>

          <div className="flex gap-8 font-mono">
            <div className="rounded-2xl border border-ash bg-parchment/60 p-4">
              <div className="heading-editorial text-[32px] text-off-black">85.1%</div>
              <div className="mt-1 text-[11px] uppercase text-smoke">Detection Accuracy</div>
            </div>
            <div className="rounded-2xl border border-ash bg-parchment/60 p-4">
              <div className="heading-editorial text-[32px] text-off-black">4.1%</div>
              <div className="mt-1 text-[11px] uppercase text-smoke">False Positive Rate</div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid: 40px radius, 40px padding, alternating Blue, Orange, Green Light Gradients */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, index) => {
            const colorGradients = [
              // 0: Blue Light Gradient (Category 01, Category 04)
              {
                cardBg: "bg-gradient-to-br from-sky-blue/20 via-periwinkle-mist/15 to-parchment/95",
                border: "border-sky-blue/40 hover:border-lake-blue/60",
                glow: "bg-sky-blue/25",
                tag: "border-sky-blue/40 bg-white/80 text-lake-blue",
                shadow: "hover:shadow-[0_12px_32px_rgba(43,89,209,0.08)]",
              },
              // 1: Orange Light Gradient (Category 02, Category 05)
              {
                cardBg: "bg-gradient-to-br from-coral/20 via-gold/15 to-parchment/95",
                border: "border-coral/40 hover:border-crimson/60",
                glow: "bg-coral/25",
                tag: "border-coral/40 bg-white/80 text-crimson",
                shadow: "hover:shadow-[0_12px_32px_rgba(243,122,10,0.08)]",
              },
              // 2: Green Light Gradient (Category 03, Category 06)
              {
                cardBg: "bg-gradient-to-br from-mint/25 via-emerald-100/20 to-parchment/95",
                border: "border-mint/50 hover:border-emerald-500/60",
                glow: "bg-mint/35",
                tag: "border-mint/50 bg-white/80 text-emerald-700",
                shadow: "hover:shadow-[0_12px_32px_rgba(16,185,129,0.08)]",
              },
            ];
            const theme = colorGradients[index % 3];

            return (
              <div
                key={c.title}
                className={`group relative overflow-hidden rounded-[40px] p-9 sm:p-10 border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${theme.cardBg} ${theme.border} ${theme.shadow}`}
              >
                {/* Ambient light gradient glow matching Hero */}
                <div
                  className={`pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full ${theme.glow} filter blur-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
                      Category {c.code}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium transition ${theme.tag}`}>
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="heading-editorial mt-4 text-[22px] text-off-black">
                    {c.title}
                  </h3>
                  <p className="mt-3 font-mono text-[14px] leading-relaxed text-graphite">
                    {c.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
