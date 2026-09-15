import { DashboardSidebar } from "../../components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="min-w-0 flex-1 bg-paper">{children}</div>
    </div>
  );
}
