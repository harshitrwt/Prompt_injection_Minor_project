import { AuthShell } from "../../components/AuthShell";
import { AuthForm } from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Log back in"
      subtitle="Your key and attack log are waiting in the dashboard."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
