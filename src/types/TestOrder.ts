/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormOrderFields } from "@/types/Order";
import { TestPack } from "@/app/(dashboard)/order/create/hooks/useFetchTest";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

// Define the interface for the price master response
export interface PriceMasterTest {
  item_code: string;
  TI_CODE: string;
  TI_NAME: string;
  TI_OTHER_CODE: string;
  TI_OTHER_NAME: string;
  LAB_CODE: string;
  PRICE_GROUP_CODE: string;
  TI_CATEGORY: string;
  TI_ORDER_ENABLE: string;
  TI_DATA_TYPE: string;
  TI_TEST_GRP: string;
  TI_SUB_GRP: string | null;
  TI_UNIT: string;
  TI_SPL_TYPE: string;
  K1: string;
  K2: string;
  K3: string;
  K4: string;
  TI_ANZ_ORDER: string | null;
  status: string;
  status_desc: string;
  is_deleted: number;
  selected_price_key?: string; // Added to track selected price key
}

export interface TestOrderProps {
  register: UseFormRegister<FormOrderFields>;
  setValue: UseFormSetValue<FormOrderFields>;
  watch: UseFormWatch<FormOrderFields>;
  errors?: FieldErrors<FormOrderFields>;
  tests: TestPack[];
  testSearch: (value: string) => void;
}

export interface ProductItemProps {
  product: any;
  onRemove: (id: string) => void;
  loading: boolean;
  priceTest?: PriceMasterTest;
  onPriceOptionChange: (productCode: string, priceKey: string) => void;
  defaultPriceKey: string;
}

// export interface ProductEmptyProps {
// No props needed for now, but might be extended in future
// }

export const PRICE_OPTIONS = [
  { value: "K1", label: "K1" },
  { value: "K2", label: "K2" },
  { value: "K3", label: "K3" },
  { value: "K4", label: "K4" },
];
