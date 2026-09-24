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
    setTimeout(() => router.push("/dashboard"), 350);
  }

  const isSignup = mode === "signup";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-mono">
      {isSignup && (
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-smoke">Name</span>
          <input
            required
            type="text"
            autoComplete="name"
            className="rounded-xl border border-ash bg-parchment/60 px-4 py-3 text-[13px] text-off-black outline-none focus:border-off-black"
            placeholder="Ada Lovelace"
          />
        </label>
      )}
      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-wider text-smoke">Institutional / Work Email</span>
        <input
          required
          type="email"
          autoComplete="email"
          className="rounded-xl border border-ash bg-parchment/60 px-4 py-3 text-[13px] text-off-black outline-none focus:border-off-black"
          placeholder="researcher@lab.edu"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-wider text-smoke">Password</span>
        <input
          required
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          minLength={8}
          className="rounded-xl border border-ash bg-parchment/60 px-4 py-3 text-[13px] text-off-black outline-none focus:border-off-black"
          placeholder="At least 8 characters"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="btn-pill-primary mt-2 text-[13px] py-3.5"
      >
        {submitting
          ? "Authenticating…"
          : isSignup
          ? "Create Academic Account ▸"
          : "Access Dashboard ▸"}
      </button>

      <p className="text-center text-[12px] text-smoke mt-2">
        {isSignup ? (
          <>
            Already registered?{" "}
            <Link href="/login" className="text-off-black underline underline-offset-4 hover:text-lake-blue">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to Cordon?{" "}
            <Link href="/signup" className="text-off-black underline underline-offset-4 hover:text-lake-blue">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
