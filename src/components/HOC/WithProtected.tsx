"use client";

import React, { useEffect, ComponentType } from "react";
import { useRouter, redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("../Loading/LoadingPage"));

export function withProtected<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        redirect("/login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return <Loading />;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ProtectedComponent.displayName = `withProtected(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ProtectedComponent;
}
