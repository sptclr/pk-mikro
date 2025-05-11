"use client";
import React from "react";
import { withProtected } from "@/components/HOC/WithProtected";

function MasterPage() {
  return <div>master</div>;
}
export default withProtected(MasterPage);
