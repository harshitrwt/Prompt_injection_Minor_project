export function Sticker({
  children,
  rotate = -4,
  inverted = false,
  className = "",
}: {
  children: React.ReactNode;
  rotate?: number;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`sticker ${inverted ? "sticker-inverted" : ""} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, fontSize: "13px" }}
    >
      {children}
    </span>
  );
}
