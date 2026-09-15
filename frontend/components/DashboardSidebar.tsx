"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/logs", label: "Attack log" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col justify-between border-r-[3px] border-ink bg-paper px-5 py-6">
      <div>
        <Link href="/" className="block px-1">
          <Logo />
        </Link>
        <nav className="mt-10 flex flex-col gap-1">
          {links.map((l) => {
            const active =
              l.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2.5 font-body text-[14px] font-medium transition-colors ${
                  active
                    ? "bg-ink text-ground"
                    : "text-ink-60 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <div className="hard-card px-3 py-2.5">
          <span className="eyebrow block text-[10px] text-ink-60">Plan</span>
          <span className="font-body text-[13px] font-semibold text-ink">
            Demo · Free
          </span>
        </div>
        <Link
          href="/"
          className="px-3 font-body text-[13px] text-ink-60 hover:text-ink"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
