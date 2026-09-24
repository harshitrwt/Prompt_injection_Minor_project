import Link from "next/link";
import { Logo } from "./Logo";

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
    <div className="grid min-h-screen bg-parchment lg:grid-cols-2">
      {/* Left Column: Warm Parchment with soft Periwinkle Mist & Pastel Accents (NOT black) */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-ash bg-periwinkle-mist/30 p-12 lg:flex">
        {/* Colorful diffused background wash */}
        <div
          className="pointer-events-none absolute -top-16 -left-16 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-coral/25 via-sky-blue/35 to-mint/30 filter blur-[70px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-[300px] w-[300px] rounded-full bg-gold/20 filter blur-[60px]"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10 max-w-[460px]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            Browser Security Middleware
          </span>
          <h2 className="heading-editorial mt-3 text-[clamp(2.2rem,3.6vw,3rem)] text-off-black">
            Three independent detectors guarding every prompt.
          </h2>
          <p className="mt-5 font-mono text-[14px] leading-relaxed text-graphite">
            Statistical ML, heuristic rules, and dense vector embeddings fused into
            a single calibrated decision in under 45ms before reaching your LLM.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <span className="pipeline-node-tag text-[11px]">
              <span className="text-lake-blue">✓</span> Manifest V3 Native
            </span>
            <span className="pipeline-node-tag text-[11px]">
              <span className="text-lake-blue">✓</span> In-Memory De-Obfuscator
            </span>
            <span className="pipeline-node-tag text-[11px]">
              <span className="text-lake-blue">✓</span> Qdrant Cloud Vectors
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-ash pt-6 font-mono text-[11px] text-smoke">
          <span>Research Prototype · Phase 1</span>
          <span>OWASP LLM01 Guardrails</span>
        </div>
      </div>

      {/* Right Column: Clean Form Container */}
      <div className="flex items-center justify-center bg-parchment px-6 py-12 sm:py-16">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="heading-editorial text-[clamp(1.8rem,3vw,2.4rem)] text-off-black">
            {title}
          </h1>
          <p className="mt-2 font-mono text-[13px] text-smoke">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
