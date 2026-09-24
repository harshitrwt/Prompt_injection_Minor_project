import type { LogRow } from "../lib/mockData";
import { VerdictBadge } from "./VerdictBadge";

export function AttackTable({ rows }: { rows: LogRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ash bg-parchment">
      <table className="w-full border-collapse text-left font-mono text-[13px]">
        <thead>
          <tr className="border-b border-ash bg-parchment/60 text-[11px] uppercase tracking-wider text-smoke">
            <th className="px-5 py-3.5">When</th>
            <th className="px-5 py-3.5">Prompt Payload</th>
            <th className="px-5 py-3.5">Threat Category</th>
            <th className="px-5 py-3.5">Risk Score</th>
            <th className="px-5 py-3.5">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.id}
              className={`transition hover:bg-parchment/80 ${
                i !== rows.length - 1 ? "border-b border-ash/60" : ""
              }`}
            >
              <td className="whitespace-nowrap px-5 py-4 text-smoke">
                {r.time}
              </td>
              <td className="max-w-[360px] px-5 py-4 text-off-black">
                <span className="line-clamp-1 font-mono">{r.prompt}</span>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-graphite">
                {r.attackType === "none" ? "—" : r.attackType.replace(/_/g, " ")}
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-off-black font-semibold">
                {r.riskScore.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <VerdictBadge decision={r.decision} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
