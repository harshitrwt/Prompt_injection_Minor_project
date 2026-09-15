const categories = [
  {
    title: "Instruction override",
    body: '"Ignore all previous instructions" and its many rewordings.',
  },
  {
    title: "System extraction",
    body: "Attempts to print your system prompt, config, or credentials.",
  },
  {
    title: "Social engineering",
    body: '"I\'m the senior engineer, I typed the wrong instructions" pretexting.',
  },
  {
    title: "Jailbreaks",
    body: 'DAN-style role play and "developer mode" framing.',
  },
  {
    title: "Indirect injection",
    body: "Instructions smuggled in documents, emails, or tool output.",
  },
  {
    title: "Obfuscation",
    body: "Base64, hex, and character-spaced payloads, decoded before scoring.",
  },
];

export function Coverage() {
  return (
    <section id="coverage" className="border-t-[3px] border-ink bg-ink py-24 text-ground">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[540px]">
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)]">
              What it catches
            </h2>
            <p className="mt-4 font-body text-[16px] leading-relaxed text-ground/70">
              Three detectors vote on every prompt — a statistical
              classifier, a rule engine, and a semantic match against known
              attacks. Cordon fuses the three into a single risk score.
            </p>
          </div>
          <div className="flex gap-8 font-body text-[13px] text-ground/70">
            <div>
              <div className="font-display text-[28px] text-ground">85%</div>
              detection accuracy
            </div>
            <div>
              <div className="font-display text-[28px] text-ground">4%</div>
              false-positive rate
            </div>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden border-[3px] border-ground/30 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.title}
              className="border-ground/30 bg-ink p-6 [border-width:0_3px_3px_0] last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-[3px] lg:[&:nth-child(3n)]:border-r-0"
            >
              <h3 className="font-body text-[16px] font-semibold text-ground">
                {c.title}
              </h3>
              <p className="mt-2 font-body text-[14px] leading-relaxed text-ground/70">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
