import Link from "next/link";
import { ApiKeyCard } from "../../components/ApiKeyCard";
import { VolumeChart } from "../../components/VolumeChart";
import { AttackTable } from "../../components/AttackTable";
import { CodeBlock } from "../../components/CodeBlock";
import { attackLog, usage } from "../../lib/mockData";

export default function DashboardOverviewPage() {
  const pct = Math.round((usage.used / usage.limit) * 100);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mb-6 sm:mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            Extension &amp; Pipeline Telemetry
          </span>
          <h1 className="heading-editorial mt-1 text-[clamp(1.8rem,3vw,2.4rem)] text-off-black">
            Security Overview
          </h1>
          <p className="mt-1 font-mono text-[13px] text-graphite">
            Prompts screened across your browser extensions and API endpoints this month.
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6 min-w-0">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="rounded-2xl border border-ash bg-white/70 p-4 sm:p-5 shadow-sm">
              <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
                Blocked Injections
              </span>
              <div className="heading-editorial mt-2 text-[28px] sm:text-[32px] text-crimson">
                {usage.blockedThisMonth}
              </div>
              <span className="mt-1 block font-mono text-[11px] text-smoke">
                High-confidence threats
              </span>
            </div>

            <div className="rounded-2xl border border-ash bg-white/70 p-4 sm:p-5 shadow-sm">
              <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
                Flagged for Review
              </span>
              <div className="heading-editorial mt-2 text-[28px] sm:text-[32px] text-off-black">
                {usage.reviewedThisMonth}
              </div>
              <span className="mt-1 block font-mono text-[11px] text-smoke">
                Borderline risk (0.40 - 0.70)
              </span>
            </div>

            <div className="rounded-2xl border border-ash bg-white/70 p-4 sm:p-5 shadow-sm">
              <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
                Monthly Audits
              </span>
              <div className="heading-editorial mt-2 text-[28px] sm:text-[32px] text-off-black">
                {pct}%
              </div>
              <div className="mt-2 h-1.5 w-full rounded-pill bg-ash/40 overflow-hidden">
                <div
                  className="h-full bg-off-black rounded-pill"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <span className="mt-2 block font-mono text-[11px] text-smoke truncate">
                {usage.used.toLocaleString()} / {usage.limit.toLocaleString()} prompts
              </span>
            </div>
          </div>

          <VolumeChart />

          <div className="overflow-hidden">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-smoke">
                Recent Interceptions
              </span>
              <Link
                href="/dashboard/logs"
                className="font-mono text-[12px] uppercase tracking-wider text-off-black underline underline-offset-4 hover:text-lake-blue transition"
              >
                View Full Log →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <AttackTable rows={attackLog.slice(0, 5)} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ApiKeyCard />
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-smoke mb-3 block">
              Middleware Quickstart
            </span>
            <CodeBlock
              inverted
              label="Python Pipeline"
              code={`from src.pipeline.security_pipeline import SecurityPipeline

pipeline = SecurityPipeline()
pipeline.load_pipeline()

verdict = pipeline.analyze_prompt(user_input)
# Returns: SAFE, REVIEW, or BLOCK`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
