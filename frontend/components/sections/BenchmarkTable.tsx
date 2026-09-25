export function BenchmarkTable() {
  const rows = [
    {
      detector: "1. ML Classifier (TF-IDF + RF/LogReg)",
      accuracy: "91.35%",
      precision: "0.9708",
      recall: "84.26%",
      f1: "0.9022",
      fpr: "2.28%",
      highlight: false,
    },
    {
      detector: "2. Heuristic Engine (Regex & Pretexts)",
      accuracy: "58.41%",
      precision: "1.0000",
      recall: "12.18%",
      f1: "0.2172",
      fpr: "0.00%",
      highlight: false,
    },
    {
      detector: "3. Semantic Vector Sim (Qdrant Cloud)",
      accuracy: "78.12%",
      precision: "0.8955",
      recall: "60.91%",
      f1: "0.7251",
      fpr: "6.39%",
      highlight: false,
    },
    {
      detector: "4. PROPOSED WEIGHTED SIGNAL FUSION",
      accuracy: "85.10%",
      precision: "0.9412",
      recall: "73.10%",
      f1: "0.8229",
      fpr: "4.11%",
      highlight: true,
    },
  ];

  return (
    <section id="benchmarks" className="border-t border-ash py-24 sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="mb-12 max-w-[680px]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            Empirical Results
          </span>
          <h2 className="heading-editorial mt-3 text-[clamp(2rem,4vw,3.2rem)] text-off-black">
            Benchmark performance summary.
          </h2>
          <p className="mt-4 font-mono text-[15px] leading-relaxed text-graphite">
            Evaluated on 416 real test samples partitioned from 2,769 curated benchmark prompts
            (Kaggle MPDD and HuggingFace deepset). Fused signal balances high detection rate with minimal false alarms.
          </p>
        </div>

        <div className="overflow-x-auto rounded-card border border-ash bg-parchment p-6 sm:p-8">
          <table className="w-full border-collapse text-left font-mono text-[13px]">
            <thead>
              <tr className="border-b border-ash pb-3 text-[11px] uppercase tracking-wider text-smoke">
                <th className="py-3 px-4">Detector / Model</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall (Detection)</th>
                <th className="py-3 px-4">F1-Score</th>
                <th className="py-3 px-4">False Positive Rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.detector}
                  className={`border-b border-ash/60 transition ${
                    r.highlight
                      ? "bg-periwinkle-mist/40 font-medium text-off-black"
                      : "text-graphite hover:bg-parchment/80"
                  }`}
                >
                  <td className="py-4 px-4 font-medium text-off-black">
                    {r.detector}
                    {r.highlight && (
                      <span className="ml-2 rounded-pill bg-lake-blue px-2 py-0.5 text-[10px] text-white uppercase">
                        Recommended
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">{r.accuracy}</td>
                  <td className="py-4 px-4">{r.precision}</td>
                  <td className="py-4 px-4">{r.recall}</td>
                  <td className="py-4 px-4">{r.f1}</td>
                  <td className="py-4 px-4">{r.fpr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-smoke pt-3">
            <span>Split: 1,938 Train · 415 Validation · 416 Test (Kaggle MPDD Dataset)</span>
            <span>Latency budget: &lt; 50ms average inference per prompt</span>
          </div>
        </div>
      </div>
    </section>
  );
}
