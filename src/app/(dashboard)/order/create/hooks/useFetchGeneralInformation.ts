// hooks/useLabLocations.ts
"use client";

import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/lib/fetcher";
import { postSearchHook } from "@/hooks/useCreateSearch";

export type LabLocationItem = {
  id: string;
  location: string;
};

export const useLabLocations = () => {
  const { data, error, isLoading } = useSWRImmutable<{
    items: LabLocationItem[];
  }>("/api/lab-location", fetcher);

  return {
    labLocationOptions: data?.items,
    isLoading,
    error,
  };
};

// hooks/usePatientTypes.ts
export const usePatientTypes = () => {
  const { data, error, isLoading } = useSWRImmutable<string[]>(
    "/api/patient-type",
    fetcher
  );

  const formattedOptions =
    data?.map((val) => ({
      value: val,
      label: val,
    })) || [];

  return {
    patientTypeOptions: formattedOptions,
    isLoading,
    error,
  };
};

// hooks/usePrioTypes.ts
export const usePrioTypes = () => {
  const { data, error, isLoading } = useSWRImmutable<string[]>(
    "/api/priority-type",
    fetcher
  );

  const formattedOptions =
    data?.map((val) => ({
      value: val,
      label: val,
    })) || [];

  return {
    prioTypeOptions: formattedOptions,
    isLoading,
    error,
  };
};

// hooks/useCustomerSearch.ts

export type CustomerItem = {
  customer_name: string;
  payment_method: string;
  customer_code_innomaster: string;
  group_price: string;
};

export const useCustomerSearch = postSearchHook<CustomerItem>(
  "/api/customer",
  { search: "RS Graha" },
  (data) =>
    data.map((val) => ({
      value: val?.customer_code_innomaster,
      label: val.customer_name,
    })),
  {
    findDefault: (data, name) =>
      data.find((item) => item.customer_name === name),
  }
);

// hooks/useClinicianSearch.ts

// Clinician types and implementation
export type ClinicianItem = {
  name: string;
  id: string;
};

export const useClinicianSearch = postSearchHook<ClinicianItem>(
  "/api/clinician",
  { name: "dr. Andy, Sp.U" },
  (data) =>
    data.map((val) => ({
      value: val.id,
      label: val.name,
    })),
  {
    findDefault: (data, name) => data.find((item) => item.name === name),
  }
);
