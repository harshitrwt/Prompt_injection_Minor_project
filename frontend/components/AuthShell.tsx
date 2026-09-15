import Link from "next/link";
import { Logo } from "./Logo";
import { Squiggle } from "./Squiggle";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 text-ground lg:flex">
        <Link href="/">
          <Logo inverted />
        </Link>

        <div className="relative z-10 max-w-[420px]">
          <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05]">
            Three detectors watching every message you get.
          </p>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-ground/70">
            Statistical classifier, rule engine, semantic match — fused into
            one verdict your bot can act on in milliseconds.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="eyebrow text-[11px] text-ground/60">
            Phase 1 · Research prototype
          </span>
          <Squiggle color="var(--ground)" width={70} />
        </div>

        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border-[3px] border-ground/20"
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h1 className="font-display text-[clamp(1.6rem,4vw,2.1rem)] text-ink">
            {title}
          </h1>
          <p className="mt-2 font-body text-[14px] text-ink-60">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
