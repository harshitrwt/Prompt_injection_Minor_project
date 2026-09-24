import { DashboardSidebar } from "../../components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-parchment md:flex-row">
      <DashboardSidebar />
      <div className="min-w-0 flex-1 w-full overflow-x-hidden">{children}</div>
    </div>
  );
}
