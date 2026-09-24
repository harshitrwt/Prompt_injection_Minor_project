import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-1.5 font-mono text-[18px] font-medium tracking-[-0.04em] text-off-black transition hover:opacity-80 ${className}`}
    >
      <span className="font-semibold text-[20px] lowercase text-off-black">cordon</span>
    </Link>
  );
}
