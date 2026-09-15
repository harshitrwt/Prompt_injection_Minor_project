export function Squiggle({
  className = "",
  flip = false,
  color = "var(--ink)",
  width = 120,
}: {
  className?: string;
  flip?: boolean;
  color?: string;
  width?: number;
}) {
  return (
    <svg
      className={`squiggle ${className}`}
      width={width}
      height={width * 0.28}
      viewBox="0 0 120 34"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M2 26C10 10 18 10 26 20C34 30 42 6 50 8C58 10 62 30 70 24C78 18 82 4 90 8C98 12 100 28 108 22C112 19 114 15 118 12"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
