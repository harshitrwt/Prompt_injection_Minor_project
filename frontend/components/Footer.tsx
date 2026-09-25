import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ash bg-parchment py-16">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="font-mono text-[13px] leading-relaxed text-smoke max-w-[280px]">
              Multi-signal prompt injection defense middleware and browser extension prototype.
            </p>
            <div className="font-mono text-[11px] text-smoke">
              Research Prototype · Phase 1 Detector
            </div>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-smoke block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 font-mono text-[13px] text-graphite">
              <li>
                <a href="#pipeline" className="hover:text-off-black transition">
                  Architecture Pipeline
                </a>
              </li>
              <li>
                <a href="#detectors" className="hover:text-off-black transition">
                  Multi-Signal Detectors
                </a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-off-black transition">
                  Threat Coverage
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-off-black transition">
                  Empirical Benchmarks
                </a>
              </li>
              <li>
                <a href="#playground" className="hover:text-off-black transition">
                  Interactive Live Tester
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-smoke block mb-4">
              Academic Literature
            </span>
            <ul className="space-y-2.5 font-mono text-[13px] text-graphite">
              <li>
                <a
                  href="https://arxiv.org/abs/2211.09527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-off-black transition"
                >
                  Perez &amp; Ribeiro (2022) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.usenix.org/system/files/usenixsecurity24-liu-yupei.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-off-black transition"
                >
                  Liu et al. USENIX (2024) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/abs/2302.12173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-off-black transition"
                >
                  Greshake et al. (2023) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/abs/2504.11358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-off-black transition"
                >
                  DataSentinel (2025) ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-smoke block mb-4">
              Extension &amp; Project
            </span>
            <ul className="space-y-2.5 font-mono text-[13px] text-graphite">
              <li>
                <Link href="/dashboard" className="hover:text-off-black transition">
                  Security Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/logs" className="hover:text-off-black transition">
                  Attack Logs Table
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/harshitrwt/Prompt_injection_Minor_project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-off-black transition"
                >
                  GitHub Repository ↗
                </a>
              </li>
              <li>
                <a
                  href="https://qdrant.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-off-black transition"
                >
                  Qdrant Cloud Vectors ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ash pt-8 font-mono text-[12px] text-smoke sm:flex-row">
          <span>© 2026 Cordon Defense Project. Open-source research prototype.</span>
          <span className="text-graphite">Designed with Monad Editorial Aesthetic</span>
        </div>
      </div>
    </footer>
  );
}
