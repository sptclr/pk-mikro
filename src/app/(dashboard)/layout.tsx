import DashboardLayout from "@/components/Layouts/Dashboard.layout";

// app/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
