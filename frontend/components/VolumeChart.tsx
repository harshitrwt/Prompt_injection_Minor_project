import { dailyVolume } from "../lib/mockData";

export function VolumeChart() {
  const max = Math.max(...dailyVolume.map((d) => d.count));

  return (
    <div className="rounded-2xl border border-ash bg-parchment p-6">
      <span className="font-mono text-[11px] uppercase tracking-wider text-smoke block">
        Audited Prompts · Last 7 Days
      </span>
      <div className="mt-6 flex h-[140px] items-end gap-3 sm:gap-4">
        {dailyVolume.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <span className="font-mono text-[11px] text-smoke">
              {d.count}
            </span>
            <div
              className="w-full rounded-t-sm bg-off-black transition-all hover:bg-lake-blue"
              style={{ height: `${(d.count / max) * 100}px` }}
            />
            <span className="font-mono text-[10px] uppercase text-smoke">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
