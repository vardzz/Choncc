import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function UiLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

