import { dailyVolume } from "../lib/mockData";

export function VolumeChart() {
  const max = Math.max(...dailyVolume.map((d) => d.count));

  return (
    <div className="hard-card p-6">
      <span className="eyebrow text-[11px] text-ink-60">
        Screened prompts · last 7 days
      </span>
      <div className="mt-6 flex h-[140px] items-end gap-4">
        {dailyVolume.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <span className="font-mono text-[11px] text-ink-60">
              {d.count}
            </span>
            <div
              className="w-full bg-ink"
              style={{ height: `${(d.count / max) * 100}px` }}
            />
            <span className="eyebrow text-[10px] text-ink-60">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
