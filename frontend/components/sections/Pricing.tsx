import Link from "next/link";

const tiers = [
  {
    name: "Academic & Community",
    price: "Free",
    unit: "/ forever",
    tagline: "For researchers, students, and individual browser users.",
    features: [
      "Full Manifest V3 Chrome extension",
      "All 3 detection engines (ML, Heuristic, Vectors)",
      "Local Base64 & Unicode de-obfuscation",
      "Unlimited client-side prompt screening",
      "Open-source Python pipeline access",
    ],
    cta: "Add to Chrome ▸",
    href: "https://chrome.google.com/webstore",
    isPrimary: true,
  },
  {
    name: "Lab & Enterprise",
    price: "Self-Hosted",
    unit: "",
    tagline: "For teams deploying private Qdrant clusters and API gateways.",
    features: [
      "Private Qdrant vector cluster integration",
      "Centralized attack telemetry dashboard",
      "Custom organization regex and rule builder",
      "REST API proxy for production LLM apps",
      "Audit CSV log export & compliance reports",
    ],
    cta: "View Dashboard",
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
            Open-source research. Built for everyone.
          </h2>
          <p className="mt-4 font-mono text-[15px] leading-relaxed text-graphite">
            The browser extension is 100% free and open-source. For academic labs
            and engineering teams, self-hosted telemetry dashboards and API gateways are available.
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
