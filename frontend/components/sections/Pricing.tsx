import Link from "next/link";

const tiers = [
  {
    name: "Developer & Community",
    price: "Free",
    unit: "/ 5k prompts",
    tagline: "For startups, side projects, and chatbot developers.",
    features: [
      "cordonguard npm package access",
      "Express, Next.js & OpenAI wrappers",
      "All 3 detection engines (ML, Heuristic, Vectors)",
      "Local Base64 & Unicode de-obfuscation",
      "Sub-20ms cloud inspection latency",
    ],
    cta: "Get Free API Key ▸",
    href: "/dashboard",
    isPrimary: true,
  },
  {
    name: "Production & Enterprise",
    price: "$49",
    unit: "/ month",
    tagline: "For companies protecting customer-facing bots and high-volume LLM apps.",
    features: [
      "Dedicated Qdrant vector cluster support",
      "100,000 screened prompts / month",
      "Centralized attack telemetry dashboard",
      "Custom organization regex & risk rules",
      "Audit CSV log export & security compliance",
    ],
    cta: "Launch Dashboard ▸",
    href: "/dashboard",
    isPrimary: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-ash py-24 sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="mb-14 max-w-[620px]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            Access &amp; Deployment
          </span>
          <h2 className="heading-editorial mt-3 text-[clamp(2rem,4vw,3.2rem)] text-off-black">
            Open-source SDK. Production firewall.
          </h2>
          <p className="mt-4 font-mono text-[15px] leading-relaxed text-graphite">
            The cordonguard npm package is free to install. For growing apps
            and engineering teams, higher request quotas and dedicated Qdrant clusters are available.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-card border p-8 sm:p-10 flex flex-col justify-between ${
                t.isPrimary
                  ? "border-lake-blue/60 bg-periwinkle-mist/25"
                  : "border-ash bg-parchment"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
                    {t.name}
                  </span>
                  {t.isPrimary && (
                    <span className="rounded-pill bg-lake-blue px-3 py-0.5 font-mono text-[10px] uppercase text-white">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="heading-editorial text-[42px] text-off-black">
                    {t.price}
                  </span>
                  {t.unit && (
                    <span className="font-mono text-[13px] text-graphite">
                      {t.unit}
                    </span>
                  )}
                </div>

                <p className="mt-3 font-mono text-[14px] leading-relaxed text-graphite">
                  {t.tagline}
                </p>

                <ul className="mt-8 space-y-3 font-mono text-[13px] text-graphite border-t border-ash pt-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-off-black shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-ash">
                <Link
                  href={t.href}
                  className={`w-full ${
                    t.isPrimary ? "btn-pill-primary" : "btn-pill-secondary"
                  } text-[13px] py-3 text-center`}
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
