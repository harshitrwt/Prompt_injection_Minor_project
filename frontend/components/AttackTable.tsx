import type { LogRow } from "../lib/mockData";
import { VerdictBadge } from "./VerdictBadge";

export function AttackTable({ rows }: { rows: LogRow[] }) {
  return (
    <div className="hard-card overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b-[3px] border-ink bg-ground/25">
            <th className="eyebrow px-5 py-3 text-[11px] text-ink">When</th>
            <th className="eyebrow px-5 py-3 text-[11px] text-ink">Prompt</th>
            <th className="eyebrow px-5 py-3 text-[11px] text-ink">Type</th>
            <th className="eyebrow px-5 py-3 text-[11px] text-ink">Risk</th>
            <th className="eyebrow px-5 py-3 text-[11px] text-ink">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.id}
              className={i !== rows.length - 1 ? "border-b border-ink-30" : ""}
            >
              <td className="whitespace-nowrap px-5 py-3.5 font-body text-[13px] text-ink-60">
                {r.time}
              </td>
              <td className="max-w-[360px] px-5 py-3.5 font-body text-[13px] text-ink">
                <span className="line-clamp-1">{r.prompt}</span>
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 font-body text-[13px] text-ink-60">
                {r.attackType === "none" ? "—" : r.attackType.replace("_", " ")}
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 font-mono text-[13px] text-ink">
                {r.riskScore.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <VerdictBadge decision={r.decision} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
