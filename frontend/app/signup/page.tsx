import { AuthShell } from "../../components/AuthShell";
import { AuthForm } from "../../components/AuthForm";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free tier, no card — a live API key in under a minute."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
