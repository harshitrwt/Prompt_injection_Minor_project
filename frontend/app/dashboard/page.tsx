import Link from "next/link";
import { ApiKeyCard } from "../../components/ApiKeyCard";
import { VolumeChart } from "../../components/VolumeChart";
import { AttackTable } from "../../components/AttackTable";
import { CodeBlock } from "../../components/CodeBlock";
import { attackLog, usage } from "../../lib/mockData";

export default function DashboardOverviewPage() {
  const pct = Math.round((usage.used / usage.limit) * 100);

  return (
    <div className="mx-auto max-w-[1040px] px-8 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] text-ink">
            Overview
          </h1>
          <p className="mt-1 font-body text-[14px] text-ink-60">
            Everything Cordon has seen on your account this month.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="hard-card p-5">
              <span className="eyebrow text-[10px] text-ink-60">
                Blocked
              </span>
              <div className="mt-1 font-display text-[30px] text-ink">
                {usage.blockedThisMonth}
              </div>
            </div>
            <div className="hard-card p-5">
              <span className="eyebrow text-[10px] text-ink-60">
                Flagged for review
              </span>
              <div className="mt-1 font-display text-[30px] text-ink">
                {usage.reviewedThisMonth}
              </div>
            </div>
            <div className="hard-card p-5">
              <span className="eyebrow text-[10px] text-ink-60">
                Usage this month
              </span>
              <div className="mt-1 font-display text-[30px] text-ink">
                {pct}%
              </div>
              <div className="mt-2 h-2 w-full bg-ink/10">
                <div
                  className="h-2 bg-ink"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <span className="mt-1 block font-body text-[11px] text-ink-60">
                {usage.used.toLocaleString()} / {usage.limit.toLocaleString()}
              </span>
            </div>
          </div>

          <VolumeChart />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow text-[11px] text-ink-60">
                Recent activity
              </span>
              <Link
                href="/dashboard/logs"
                className="font-body text-[13px] font-semibold text-ink underline underline-offset-4"
              >
                View full log
              </Link>
            </div>
            <AttackTable rows={attackLog.slice(0, 5)} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ApiKeyCard />
          <div>
            <span className="eyebrow mb-3 block text-[11px] text-ink-60">
              Quickstart
            </span>
            <CodeBlock
              inverted
              label="bot.js"
              code={`import { Cordon } from "cordon-sdk";

const cordon = new Cordon({
  apiKey: process.env.CORDON_API_KEY,
});

const verdict = await cordon.screen(message);`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
