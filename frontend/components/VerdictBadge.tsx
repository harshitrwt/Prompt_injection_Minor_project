import type { Decision } from "../lib/mockData";

const styles: Record<Decision, string> = {
  SAFE: "bg-ink/5 text-ink border-ink/30",
  REVIEW: "bg-ground/40 text-ink border-ink",
  BLOCK: "bg-ink text-ground border-ink",
};

export function VerdictBadge({ decision }: { decision: Decision }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.1em] ${styles[decision]}`}
    >
      {decision}
    </span>
  );
}
