/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher, fetcherPost } from "@/lib/fetcher";
import { useState } from "react";
import useSWR from "swr";

// Generic search hook creator with customizable search parameter
export function postSearchHook<T>(
  endpoint: string,
  initialSearch: Record<string, any> | string = "",
  formatter?: (data: T[]) => { value: string; label: string }[],
  options: {
    key?: string;
    findDefault?: (data: T[], name: string) => T | undefined;
  } = {}
) {
  const { findDefault, key } = options;

  return (defaultSearch: Record<string, any> | string = "") => {
    const [searchTerm, setSearchTerm] = useState<Record<string, any> | string>(
      initialSearch || defaultSearch
    );

    const { data, error, isLoading } = useSWR<{ data: T[] }>(
      [endpoint, searchTerm],
      () =>
        fetcherPost(
          endpoint,
          typeof searchTerm === "string"
            ? { [key ?? "search"]: searchTerm }
            : searchTerm
        )
    );

    const formattedOptions =
      formatter && data?.data ? formatter(data.data) : [];

    const findDefaultItem = (name: string = "") => {
      if (!data?.data || !findDefault) return undefined;
      return findDefault(data.data, name);
    };

    return {
      options: formattedOptions,
      isLoading,
      error,
      setSearchTerm,
      findDefaultItem,
      rawData: data?.data,
    };
  };
}

function buildQueryString(params: Record<string, any>) {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}

export function getSearchHook<T>(
  endpoint: string,
  initialSearch: Record<string, any> | string = "",
  formatter?: (data: T[]) => { value: string; label: string }[],
  options: {
    findDefault?: (data: T[], name: string) => T | undefined;
  } = {}
) {
  const { findDefault } = options;

  return (defaultSearch: Record<string, any> | string = "") => {
    const [searchTerm, setSearchTerm] = useState<Record<string, any> | string>(
      initialSearch || defaultSearch
    );

    const queryString =
      typeof searchTerm === "string"
        ? `search=${encodeURIComponent(searchTerm)}`
        : buildQueryString(searchTerm);

    const queryUrl = `${endpoint}?${queryString}`;

    const { data, error, isLoading } = useSWR<{ data: T[] }>(queryUrl, fetcher);

    const formattedOptions =
      formatter && data?.data ? formatter(data.data) : [];

    const findDefaultItem = (name: string = "") => {
      if (!data?.data || !findDefault) return undefined;
      return findDefault(data.data, name);
    };

    return {
      options: formattedOptions,
      isLoading,
      error,
      setSearchTerm,
      findDefaultItem,
      rawData: data?.data,
    };
  };
}

// Type safe API function for location endpoints
export const fetchLocationData = async (
  locationType: "province" | "city" | "district" | "subdistrict",
  parentId?: string | null
) => {
  let url = `/api/locations/${locationType}`;

  if (parentId) {
    url += `?parentId=${parentId}`;
  }

  return fetcher(url);
};
