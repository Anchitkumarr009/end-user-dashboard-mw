import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
