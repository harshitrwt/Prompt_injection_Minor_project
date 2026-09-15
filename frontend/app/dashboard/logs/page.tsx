import { AttackTable } from "../../../components/AttackTable";
import { attackLog } from "../../../lib/mockData";

export default function AttackLogPage() {
  return (
    <div className="mx-auto max-w-[1040px] px-8 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] text-ink">
            Attack log
          </h1>
          <p className="mt-1 font-body text-[14px] text-ink-60">
            Every prompt Cordon scored, most recent first. Demo tier keeps
            7 days of history.
          </p>
        </div>
        <button className="rounded-full border-[3px] border-ink px-5 py-2.5 font-body text-[13px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
          Export CSV
        </button>
      </div>

      <AttackTable rows={attackLog} />
    </div>
  );
}
