import Link from "next/link";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <div className="sticky top-3 z-40 w-full px-4 sm:px-6 mt-5">
      <header className="mx-auto flex h-[58px] max-w-[1100px] items-center justify-between rounded-full border border-ash bg-parchment/95 px-5 sm:px-7 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        <Logo />

        {/* Minimal clean nav links - removed pipeline and clutter */}
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          <a
            href="#how-it-works"
            className="font-mono text-[12px] uppercase tracking-wider text-off-black transition hover:text-lake-blue"
          >
            How It Works
          </a>
          <a
            href="#coverage"
            className="font-mono text-[12px] uppercase tracking-wider text-off-black transition hover:text-lake-blue"
          >
            Coverage
          </a>
          <a
            href="#benchmarks"
            className="font-mono text-[12px] uppercase tracking-wider text-off-black transition hover:text-lake-blue"
          >
            Benchmarks
          </a>
          <a
            href="#playground"
            className="font-mono text-[12px] uppercase tracking-wider text-off-black transition hover:text-lake-blue"
          >
            Playground
          </a>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/login"
            className="rounded-full bg-off-black px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-parchment transition hover:bg-black sm:px-4 sm:py-2"
          >
            Login &gt;
          </Link>
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-lake-blue px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white transition hover:bg-[#2045a8] shadow-[0_2px_10px_rgba(43,89,209,0.3)] sm:px-4 sm:py-2"
          >
            Get Extension &gt;
          </a>
        </div>
      </header>
    </div>
  );
}
