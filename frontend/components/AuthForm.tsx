"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [forgotSent, setForgotSent] = useState(false);

  const isSignup = mode === "signup";

  // Password strength calculator
  function getPasswordStrength(pwd: string) {
    if (!pwd) return { score: 0, label: "Empty", color: "bg-ash" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 25, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { score: 50, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score: 75, label: "Good", color: "bg-blue-500" };
    return { score: 100, label: "Strong", color: "bg-emerald-500" };
  }

  const strength = getPasswordStrength(password);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 450);
  }

  function handleSocialLogin(provider: string) {
    setSocialLoading(provider);
    setTimeout(() => {
      router.push("/dashboard");
    }, 550);
  }

  function handleDemoAccess() {
    setSubmitting(true);
    setEmail("evaluator@cordon-ai.org");
    setPassword("secure-demo-2026");
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  }

  return (
    <div className="flex flex-col gap-6 font-mono">
      {/* Segmented Mode Switcher */}
      <div className="flex rounded-full border border-ash/80 bg-ash/30 p-1">
        <Link
          href="/login"
          className={`flex-1 rounded-full py-2 text-center text-[12px] uppercase tracking-wider transition ${
            !isSignup
              ? "bg-white font-semibold text-off-black shadow-sm"
              : "text-smoke hover:text-off-black"
          }`}
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className={`flex-1 rounded-full py-2 text-center text-[12px] uppercase tracking-wider transition ${
            isSignup
              ? "bg-white font-semibold text-off-black shadow-sm"
              : "text-smoke hover:text-off-black"
          }`}
        >
          Create Account
        </Link>
      </div>

      {/* Social / Developer 1-Click Auth */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          disabled={Boolean(socialLoading) || submitting}
          className="flex items-center justify-center gap-2 rounded-xl border border-ash bg-white/80 px-4 py-2.5 text-[12px] font-medium text-off-black shadow-sm transition hover:bg-white hover:border-off-black active:scale-[0.98]"
        >
          {socialLoading === "github" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-off-black border-t-transparent" />
          ) : (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          )}
          <span>GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={Boolean(socialLoading) || submitting}
          className="flex items-center justify-center gap-2 rounded-xl border border-ash bg-white/80 px-4 py-2.5 text-[12px] font-medium text-off-black shadow-sm transition hover:bg-white hover:border-off-black active:scale-[0.98]"
        >
          {socialLoading === "google" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-off-black border-t-transparent" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25A11.95 11.95 0 000 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span>Google</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-ash/80" />
        <span className="absolute bg-parchment px-3 text-[10.5px] uppercase tracking-wider text-smoke">
          or with email
        </span>
      </div>

      {/* Main Email/Password Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-smoke font-medium">
              Full Name
            </span>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="rounded-xl border border-ash bg-white/90 px-4 py-3 text-[13px] text-off-black outline-none transition focus:border-lake-blue focus:ring-2 focus:ring-lake-blue/20"
              placeholder="e.g. Dr. Maya Patel"
            />
          </label>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-smoke font-medium">
            Work or Academic Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="rounded-xl border border-ash bg-white/90 px-4 py-3 text-[13px] text-off-black outline-none transition focus:border-lake-blue focus:ring-2 focus:ring-lake-blue/20"
            placeholder="developer@company.com"
          />
        </label>

        {isSignup && (
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-smoke font-medium">
              Organization / Team <span className="text-smoke/70 lowercase font-normal">(optional)</span>
            </span>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="rounded-xl border border-ash bg-white/90 px-4 py-3 text-[13px] text-off-black outline-none transition focus:border-lake-blue focus:ring-2 focus:ring-lake-blue/20"
              placeholder="e.g. Vertex AI Team"
            />
          </label>
        )}

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-smoke font-medium">
              Password
            </span>
            {!isSignup && (
              <button
                type="button"
                onClick={() => setForgotSent(!forgotSent)}
                className="text-[11px] text-lake-blue hover:underline"
              >
                Forgot password?
              </button>
            )}
          </div>

          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={8}
              className="w-full rounded-xl border border-ash bg-white/90 px-4 py-3 pr-12 text-[13px] text-off-black outline-none transition focus:border-lake-blue focus:ring-2 focus:ring-lake-blue/20"
              placeholder={isSignup ? "Minimum 8 characters" : "Enter your password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-smoke transition hover:text-off-black text-[12px]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Interactive Password Strength Indicator on Signup */}
          {isSignup && password.length > 0 && (
            <div className="mt-1 space-y-1">
              <div className="h-1.5 w-full rounded-full bg-ash/50 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-smoke">
                <span>Strength: <strong className="text-off-black">{strength.label}</strong></span>
                <span>Requires 8+ chars</span>
              </div>
            </div>
          )}

          {forgotSent && !isSignup && (
            <div className="mt-2 rounded-lg bg-sky-blue/20 border border-sky-blue/40 p-2.5 text-[11px] text-lake-blue">
              Password reset link sent to {email || "your email address"}. Check your inbox.
            </div>
          )}
        </div>

        {/* Checkbox Options */}
        {!isSignup ? (
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-ash accent-off-black"
            />
            <span className="text-[12px] text-smoke select-none">
              Remember this device for 30 days
            </span>
          </label>
        ) : (
          <label className="flex items-start gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-ash accent-off-black"
            />
            <span className="text-[11.5px] text-smoke leading-tight select-none">
              I accept the{" "}
              <span className="text-off-black underline underline-offset-2">Terms of Service</span>{" "}
              and allow Cordon to authenticate API screening requests.
            </span>
          </label>
        )}

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={submitting}
          className="btn-pill-secondary mt-2 w-full py-3.5 text-[13px] font-medium tracking-wide shadow-md transition-transform active:scale-[0.99]"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-parchment border-t-transparent" />
              Verifying credentials…
            </span>
          ) : isSignup ? (
            "Create Developer Account ▸"
          ) : (
            "Sign In to Dashboard ▸"
          )}
        </button>
      </form>

      {/* Quick Demo Access Button */}
      <div className="rounded-2xl border border-dashed border-ash/90 bg-white/60 p-3.5 text-center">
        <p className="text-[11px] text-smoke">
          Testing or reviewing the project?
        </p>
        <button
          type="button"
          onClick={handleDemoAccess}
          disabled={submitting}
          className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-ash/80 bg-parchment px-3.5 py-1 text-[11px] font-medium text-off-black transition hover:border-off-black hover:bg-white"
        >
          ⚡ Instant Demo Dashboard Access
        </button>
      </div>

      {/* Bottom Switcher Note */}
      <p className="text-center text-[12px] text-smoke">
        {isSignup ? (
          <>
            Already have an active account?{" "}
            <Link
              href="/login"
              className="font-medium text-off-black underline underline-offset-4 hover:text-lake-blue"
            >
              Sign in here
            </Link>
          </>
        ) : (
          <>
            Need an API key or dashboard access?{" "}
            <Link
              href="/signup"
              className="font-medium text-off-black underline underline-offset-4 hover:text-lake-blue"
            >
              Create a free account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
