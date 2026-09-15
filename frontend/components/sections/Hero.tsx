import Link from "next/link";
import { Squiggle } from "../Squiggle";
import { Sticker } from "../Sticker";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-28 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-[12px] text-ink-60">
            Middleware for LLM apps
          </span>
          <Squiggle width={90} className="hidden sm:block" />
        </div>

        <div className="relative my-10 sm:my-14">
          <div
            className="absolute inset-y-0 -left-[8vw] -right-[8vw] -z-0 origin-center bg-ink"
            style={{ transform: "rotate(-6.5deg)" }}
            aria-hidden="true"
          />
          <h1 className="font-display relative z-10 px-6 py-12 text-center text-ground sm:py-16 md:py-20">
            <span className="block text-[clamp(2.6rem,7.4vw,6.2rem)]">
              STOP THE PROMPT
            </span>
            <span className="block text-[clamp(2.6rem,7.4vw,6.2rem)]">
              BEFORE IT LANDS
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-[560px] font-body text-[17px] leading-relaxed text-ink-60">
            Cordon sits in front of your chatbot and screens every message
            for injection, jailbreak, and system-extraction attempts —
            three detectors, one verdict, before your LLM ever sees it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-full border-[3px] border-ink bg-ink px-7 py-3.5 font-body text-[14px] font-semibold text-ground transition-transform hover:-translate-y-0.5"
            >
              Get a free API key
            </Link>
            <a
              href="#how-it-works"
              className="rounded-full border-[3px] border-ink px-7 py-3.5 font-body text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              See how it works
            </a>
          </div>
          <Sticker rotate={-3} className="mt-2">
            No card for the demo tier
          </Sticker>
        </div>
      </div>
    </section>
  );
}
