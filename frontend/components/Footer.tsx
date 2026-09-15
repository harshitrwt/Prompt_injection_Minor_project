import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-[320px] font-body text-[14px] leading-relaxed text-ink-60">
            A screening layer that sits between your users and your LLM.
            Three detectors, one verdict, every request.
          </p>
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-[11px] text-ink-60">Product</span>
            <a href="/#how-it-works" className="font-body text-[14px] hover:opacity-70">
              How it works
            </a>
            <a href="/#coverage" className="font-body text-[14px] hover:opacity-70">
              Coverage
            </a>
            <a href="/#pricing" className="font-body text-[14px] hover:opacity-70">
              Pricing
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-[11px] text-ink-60">Account</span>
            <Link href="/login" className="font-body text-[14px] hover:opacity-70">
              Log in
            </Link>
            <Link href="/signup" className="font-body text-[14px] hover:opacity-70">
              Create account
            </Link>
            <Link href="/dashboard" className="font-body text-[14px] hover:opacity-70">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-30">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 font-body text-[12px] text-ink-60">
          <span>© {new Date().getFullYear()} Cordon</span>
          <span>Phase 1 · Research prototype</span>
        </div>
      </div>
    </footer>
  );
}
