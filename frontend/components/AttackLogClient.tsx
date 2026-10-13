"use client";

import { useState } from "react";
import { AttackTable } from "./AttackTable";
import { attackLog, Decision, LogRow } from "../lib/mockData";

export function AttackLogClient() {
  const [filter, setFilter] = useState<"ALL" | Decision>("ALL");
  const [search, setSearch] = useState("");

  const filteredRows = attackLog.filter((row: LogRow) => {
    const matchesFilter = filter === "ALL" || row.decision === filter;
    const matchesSearch =
      search.trim() === "" ||
      row.prompt.toLowerCase().includes(search.toLowerCase()) ||
      row.attackType.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  function exportCSV() {
    const headers = ["ID", "Time", "Prompt", "Attack Type", "Risk Score", "Decision"];
    const csvContent = [
      headers.join(","),
      ...filteredRows.map((r) =>
        [
          r.id,
          `"${r.time}"`,
          `"${r.prompt.replace(/"/g, '""')}"`,
          r.attackType,
          r.riskScore,
          r.decision,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `cordon_security_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
            Every prompt screened across your npm middleware instances, ranked by most recent event.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="btn-pill-ghost text-[11px] py-1.5 px-4 self-start sm:self-auto sm:text-[12px] sm:py-2 sm:px-5 hover:bg-off-black hover:text-parchment transition"
        >
          Export CSV Log ↓
        </button>
      </div>

      {/* Filters & Search */}
      <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-xl border border-ash bg-white/70 p-1.5 overflow-x-auto">
          {(["ALL", "BLOCK", "REVIEW", "SAFE"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`rounded-lg px-3 py-1 font-mono text-[11px] uppercase transition ${
                filter === d
                  ? "bg-off-black text-parchment shadow-sm"
                  : "text-graphite hover:text-off-black"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter by keyword or attack type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-ash bg-white/70 px-3.5 py-1.5 font-mono text-[12px] text-off-black placeholder:text-smoke focus:border-off-black focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <AttackTable rows={filteredRows} />
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-smoke">
        <span>Showing {filteredRows.length} of {attackLog.length} events</span>
        <span>Real-time retention: 30 days</span>
      </div>
    </div>
  );
}
