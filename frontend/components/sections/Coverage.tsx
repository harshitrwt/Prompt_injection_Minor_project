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
              Every prompt entered into your browser is evaluated across known OWASP LLM01
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

        {/* Feature Cards Grid: 40px radius, 40px padding, 1px solid Ash border */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.title}
              className="card-editorial flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase text-smoke">
                    Category {c.code}
                  </span>
                  <span className="rounded-pill border border-ash bg-parchment px-2.5 py-0.5 font-mono text-[10px] text-graphite">
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
          ))}
        </div>
      </div>
    </section>
  );
}
