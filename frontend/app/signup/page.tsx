import { AuthShell } from "../../components/AuthShell";
import { AuthForm } from "../../components/AuthForm";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your developer account"
      subtitle="Screen millions of prompts with calibrated sub-20ms latency. No credit card required."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
