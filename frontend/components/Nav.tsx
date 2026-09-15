import Link from "next/link";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Cordon home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#how-it-works"
            className="eyebrow text-[12px] text-ink-60 transition-colors hover:text-ink"
          >
            How it works
          </a>
          <a
            href="/#coverage"
            className="eyebrow text-[12px] text-ink-60 transition-colors hover:text-ink"
          >
            Coverage
          </a>
          <a
            href="/#pricing"
            className="eyebrow text-[12px] text-ink-60 transition-colors hover:text-ink"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="eyebrow hidden text-[12px] text-ink transition-opacity hover:opacity-70 sm:inline"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full border-[3px] border-ink bg-ink px-5 py-2.5 font-body text-[13px] font-semibold text-ground transition-transform hover:-translate-y-0.5"
          >
            Get API key
          </Link>
        </div>
      </div>
    </header>
  );
}
