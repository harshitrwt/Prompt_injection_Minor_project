"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/logs", label: "Attack Log" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden h-screen w-[240px] shrink-0 flex-col justify-between border-r border-ash bg-parchment px-6 py-8 md:flex sticky top-0">
        <div>
          <Logo />
          <nav className="mt-10 flex flex-col gap-1.5">
            {links.map((l) => {
              const active =
                l.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-wider transition ${
                    active
                      ? "bg-off-black text-parchment shadow-sm"
                      : "text-graphite hover:bg-parchment/60 hover:text-off-black"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-ash bg-white/70 p-3.5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-smoke block">
              Tier
            </span>
            <span className="font-mono text-[13px] text-off-black font-medium">
              Academic · Free
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-wider text-smoke transition hover:text-off-black"
          >
            ← Return to site
          </Link>
        </div>
      </aside>

      {/* Mobile Top Navigation Bar */}
      <div className="flex w-full items-center justify-between border-b border-ash bg-parchment px-4 py-3 md:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          {links.map((l) => {
            const active =
              l.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
                  active
                    ? "bg-off-black text-parchment"
                    : "text-graphite bg-parchment/80 border border-ash"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="rounded-full border border-ash px-2.5 py-1 font-mono text-[10px] uppercase text-smoke"
          >
            Exit
          </Link>
        </div>
      </div>
    </>
  );
}
