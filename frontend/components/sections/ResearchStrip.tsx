export function ResearchStrip() {
  const references = [
    "OWASP Top 10 (LLM01)",
    "Kaggle MPDD (2,769 Samples)",
    "USENIX Security 2024",
    "Qdrant Cloud Vectors",
    "HuggingFace deepset",
    "Perez & Ribeiro (2022)",
  ];

  return (
    <div className="w-full border-y border-ash bg-parchment py-6">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 px-6 sm:px-10">
        <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
          Grounded In Research &amp; Datasets:
        </span>
        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
          {references.map((ref) => (
            <span
              key={ref}
              className="font-mono text-[13px] uppercase tracking-wider text-graphite/80 transition hover:text-off-black"
            >
              {ref}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
