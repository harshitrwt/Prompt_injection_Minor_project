import Link from "next/link";
import { Sticker } from "../Sticker";

const tiers = [
  {
    name: "Demo",
    price: "Free",
    unit: "",
    tagline: "For trying Cordon against your own bot.",
    features: [
      "500 screened prompts / month",
      "All three detectors",
      "7-day attack log",
      "Community support",
    ],
    cta: "Get a free key",
    href: "/signup",
    inverted: false,
  },
  {
    name: "Pro",
    price: "$29",
    unit: "/ month",
    tagline: "For a bot in production, watched around the clock.",
    features: [
      "50,000 screened prompts / month",
      "All three detectors + custom rules",
      "90-day attack log & CSV export",
      "Rate-limited burst protection",
      "Email support",
    ],
    cta: "Start Pro",
    href: "/signup?plan=pro",
    inverted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t-[3px] border-ink bg-paper py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-14 max-w-[560px]">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-ink">
            Start free, pay when it matters
          </h2>
          <p className="mt-4 font-body text-[16px] leading-relaxed text-ink-60">
            Every plan gets the same three detectors. What changes is volume
            and how long we keep your attack history around.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`hard-card relative flex flex-col p-8 ${
                t.inverted ? "border-ink bg-ink text-ground" : "text-ink"
              }`}
            >
              {t.inverted && (
                <Sticker rotate={4} className="absolute -top-4 right-6">
                  Most used
                </Sticker>
              )}
              <span
                className={`eyebrow text-[12px] ${
                  t.inverted ? "text-ground/70" : "text-ink-60"
                }`}
              >
                {t.name}
              </span>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[46px]">{t.price}</span>
                {t.unit && (
                  <span
                    className={`font-body text-[14px] ${
                      t.inverted ? "text-ground/70" : "text-ink-60"
                    }`}
                  >
                    {t.unit}
                  </span>
                )}
              </div>
              <p
                className={`mt-3 font-body text-[14px] leading-relaxed ${
                  t.inverted ? "text-ground/70" : "text-ink-60"
                }`}
              >
                {t.tagline}
              </p>

              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 font-body text-[14px]"
                  >
                    <span
                      className={`mt-[7px] h-[7px] w-[7px] shrink-0 ${
                        t.inverted ? "bg-ground" : "bg-ink"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={t.href}
                className={`mt-8 rounded-full border-[3px] px-6 py-3 text-center font-body text-[14px] font-semibold transition-transform hover:-translate-y-0.5 ${
                  t.inverted
                    ? "border-ground bg-ground text-ink"
                    : "border-ink bg-ink text-ground"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-[13px] text-ink-60">
          Need more than 50,000 prompts a month or a private deployment?{" "}
          <a href="mailto:hello@cordon.dev" className="underline underline-offset-4">
            Talk to us
          </a>
          .
        </p>
      </div>
    </section>
  );
}
