"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { ComponentType } from "react";

const Loading = dynamic(() => import("../Loading/LoadingPage"));

export function withPublic<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const ComponentInner = (props: P) => {
    const router = useRouter();
    const isAuthenticated = false;
    const loading = false;

    useEffect(() => {
      if (isAuthenticated && !loading) {
        router.replace("/");
      }
    }, [isAuthenticated, loading, router]);

    if (loading || isAuthenticated) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentInner.displayName = `withPublic(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentInner;
}
