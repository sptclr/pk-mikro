"use client";
import { withProtected } from "@/components/HOC/WithProtected";
import DashboardLayout from "@/components/Layouts/Dashboard.layout";

function Home() {
  return <DashboardLayout>test</DashboardLayout>;
}

export default withProtected(Home);
