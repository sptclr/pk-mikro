/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useLabLocations.ts
"use client";

import { getSearchHook, postSearchHook } from "@/hooks/useCreateSearch";

export type TestPack = {
  item_code: string;
  item_name: string;
  ti_code: string;
  count_detail: number;
  detail_item?: {
    item_code: string;
    item_name: string;
  }[];
};
export type TestPackItem = {
  item_code: string;
  TI_CODE: string;
  [key: string]: any; // Menangkap properti tambahan dengan tipe apa pun
};

//hooks test pack
export const useTestPackageSearch = postSearchHook<TestPack>(
  "/api/test/pack-master-test",
  { item_name: "paket uji" },
  (data) =>
    data.map((val) => ({
      value: val?.item_code,
      label: val.item_name,
    })),
  {
    key: "item_name",
    findDefault: (data, name) => data.find((item) => item.item_name === name),
  }
);

export const useTestItemSearch = postSearchHook<TestPackItem>(
  "/api/test/item-master-test",
  { name: "paket uji" },
  (data) =>
    data.map((val) => ({
      value: val?.item_code,
      label: val.item_name,
    })),
  {
    findDefault: (data, name) => data.find((item) => item.TI_NAME === name),
  }
);

export const usePriceTestSearch = getSearchHook<TestPackItem>(
  "/api/test/price-master-test",
  { name: "paket uji" },
  (data) =>
    data.map((val) => ({
      value: val?.item_code,
      label: val.item_name,
    })),
  {
    findDefault: (data, name) => data.find((item) => item.TI_NAME === name),
  }
);
