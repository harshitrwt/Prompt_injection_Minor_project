import Link from "next/link";
import Image from "next/image";
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
    <div className="grid min-h-screen bg-parchment lg:grid-cols-12">
      {/* Left Column: Clean White Aesthetic Image & Core Mission Statement */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-ash bg-white/50 p-10 lg:col-span-6 lg:flex xl:col-span-5 xl:p-14">
        {/* Top Header: Logo with Cordon written above */}
        <div className="relative z-10 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-wider text-smoke transition hover:text-off-black"
          >
            ← Return to cordon.io
          </Link>
        </div>

        {/* Center: Exact Text & Clean White Aesthetic Relatable Image */}
        <div className="relative z-10 my-auto py-6">
          <p className="font-mono text-[14px] leading-relaxed text-graphite sm:text-[15px]">
            Statistical ML, heuristic pattern rules, and Qdrant Cloud dense vector embeddings screen every LLM prompt before execution dispatch.
          </p>

          {/* Clean White Aesthetic Relatable Visual */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-ash/70 bg-white p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
            <div className="overflow-hidden rounded-2xl bg-parchment/40">
              <Image
                src="/auth-visual.jpg"
                alt="Cordon AI Security Guardrail"
                width={700}
                height={525}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Clean minimal spacer for balanced alignment */}
        <div className="relative z-10" />
      </div>

      {/* Right Column: Clean Auth Form Area */}
      <div className="flex items-center justify-center bg-parchment px-6 py-12 sm:px-12 sm:py-16 lg:col-span-6 xl:col-span-7">
        <div className="w-full max-w-[440px]">
          {/* Mobile Header with Logo */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-wider text-smoke hover:text-off-black"
            >
              ← Home
            </Link>
          </div>

          {/* Header Title */}
          <div>
            <h1 className="heading-editorial text-[clamp(2rem,3.2vw,2.5rem)] text-off-black">
              {title}
            </h1>
            <p className="mt-2 font-mono text-[13px] text-graphite">{subtitle}</p>
          </div>

          {/* Dynamic Form Content */}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
