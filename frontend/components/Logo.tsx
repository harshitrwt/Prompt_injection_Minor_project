import Link from "next/link";
import { LogoIcon } from "./LogoIcon";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-mono text-[18px] font-medium tracking-[-0.04em] text-off-black transition hover:opacity-80 ${className}`}
    >
      <LogoIcon className="h-5 w-5 text-off-black transition-transform duration-300 group-hover:scale-105" />
      <span className="font-semibold text-[20px] lowercase text-off-black">cordon</span>
    </Link>
  );
}
