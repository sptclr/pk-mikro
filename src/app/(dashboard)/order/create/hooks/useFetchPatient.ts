/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useLabLocations.ts
"use client";

import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/lib/fetcher";

export type PatientItem = {
  [key: string]: any;
};
//hooks patient
export const usePatients = () => {
  const { data, error, isLoading } = useSWRImmutable<{
    items: PatientItem[];
  }>("/api/patient", fetcher);

  return {
    patientOptions: data?.items,
    isLoading,
    error,
  };
};
