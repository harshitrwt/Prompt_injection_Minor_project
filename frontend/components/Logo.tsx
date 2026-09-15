export function Logo({ inverted = false }: { inverted?: boolean }) {
  const ink = inverted ? "var(--ground)" : "var(--ink)";
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="22"
          height="22"
          rx="3"
          fill="none"
          stroke={ink}
          strokeWidth="3"
        />
        <rect x="10" y="10" width="6" height="6" fill={ink} />
      </svg>
      <span
        className="font-display text-[18px]"
        style={{ color: ink, letterSpacing: "-0.01em" }}
      >
        CORDON
      </span>
    </span>
  );
}
