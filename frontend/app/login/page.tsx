import { AuthShell } from "../../components/AuthShell";
import { AuthForm } from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back to Cordon"
      subtitle="Sign in to inspect real-time detection telemetry, configure guardrails, and access your API keys."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
