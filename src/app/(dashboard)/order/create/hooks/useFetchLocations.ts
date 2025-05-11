// hooks/useLocationSearch.ts
import { fetcher } from "@/lib/fetcher";
import { useState, useEffect } from "react";
import useSWR from "swr";

export interface LocationOption {
  id: string;
  name: string;
  // Add other properties as needed
}

// Base URL for location API endpoints
const BASE_URL = "/api/locations"; // Replace with your actual API base URL

// Reusable hook for fetching location data
export const useLocationSearch = (
  locationType: "province" | "city" | "district" | "subdistrict",
  parentId?: string | null
) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Determine the endpoint based on location type and parent ID
  let endpoint = `${BASE_URL}/${locationType}`;
  if (parentId) {
    endpoint += `?parentId=${parentId}`;
  }

  // Fetch data with SWR
  const { data, error } = useSWR<{ items: LocationOption[] }>(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    setIsLoading(true);
    if (data?.items) {
      // Format options for select component
      const formattedOptions = data.items.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(formattedOptions);
      setIsLoading(false);
    } else if (error) {
      setIsLoading(false);
    }
  }, [data, error]);

  return {
    options,
    isLoading,
    error,
    rawData: data?.items,
  };
};

// Specific hooks for each location type
export const useProvinceSearch = () => {
  return useLocationSearch("province");
};

export const useCitySearch = (provinceId?: string | null) => {
  return useLocationSearch("city", provinceId);
};

export const useDistrictSearch = (cityId?: string | null) => {
  return useLocationSearch("district", cityId);
};

export const useSubdistrictSearch = (districtId?: string | null) => {
  return useLocationSearch("subdistrict", districtId);
};
