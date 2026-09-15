"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // No backend wired up yet — this just drops the visitor into the
    // dashboard shell so the flow can be reviewed end to end.
    setTimeout(() => router.push("/dashboard"), 350);
  }

  const isSignup = mode === "signup";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {isSignup && (
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-[11px] text-ink-60">Name</span>
          <input
            required
            type="text"
            autoComplete="name"
            className="border-[3px] border-ink bg-paper px-4 py-3 font-body text-[15px] text-ink outline-none focus:bg-ground/10"
            placeholder="Jordan Lee"
          />
        </label>
      )}
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-[11px] text-ink-60">Work email</span>
        <input
          required
          type="email"
          autoComplete="email"
          className="border-[3px] border-ink bg-paper px-4 py-3 font-body text-[15px] text-ink outline-none focus:bg-ground/10"
          placeholder="you@company.com"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-[11px] text-ink-60">Password</span>
        <input
          required
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          minLength={8}
          className="border-[3px] border-ink bg-paper px-4 py-3 font-body text-[15px] text-ink outline-none focus:bg-ground/10"
          placeholder="At least 8 characters"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full border-[3px] border-ink bg-ink px-6 py-3.5 font-body text-[14px] font-semibold text-ground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {submitting
          ? "One moment…"
          : isSignup
          ? "Create free account"
          : "Log in"}
      </button>

      <p className="text-center font-body text-[13px] text-ink-60">
        {isSignup ? (
          <>
            Already have a key?{" "}
            <Link href="/login" className="text-ink underline underline-offset-4">
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Cordon?{" "}
            <Link href="/signup" className="text-ink underline underline-offset-4">
              Create a free account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
