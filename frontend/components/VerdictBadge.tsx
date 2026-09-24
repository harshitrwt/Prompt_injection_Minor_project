import type { Decision } from "../lib/mockData";

const styles: Record<Decision, string> = {
  SAFE: "bg-mint/20 text-off-black border-mint/80",
  REVIEW: "bg-gold/25 text-off-black border-gold/80",
  BLOCK: "bg-coral/25 text-crimson border-coral/80",
};

export function VerdictBadge({ decision }: { decision: Decision }) {
  return (
    <span
      className={`inline-flex items-center rounded-pill border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${styles[decision]}`}
    >
      {decision}
    </span>
  );
}
