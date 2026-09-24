import { AttackTable } from "../../../components/AttackTable";
import { attackLog } from "../../../lib/mockData";

export default function AttackLogPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            Audit Trail
          </span>
          <h1 className="heading-editorial mt-1 text-[clamp(1.8rem,3vw,2.4rem)] text-off-black">
            Attack Log
          </h1>
          <p className="mt-1 font-mono text-[13px] text-graphite">
            Every prompt screened by Cordon, ranked by most recent event.
          </p>
        </div>
        <button className="btn-pill-ghost text-[11px] py-1.5 px-4 self-start sm:self-auto sm:text-[12px] sm:py-2 sm:px-5">
          Export CSV Log
        </button>
      </div>

      <div className="overflow-x-auto">
        <AttackTable rows={attackLog} />
      </div>
    </div>
  );
}
