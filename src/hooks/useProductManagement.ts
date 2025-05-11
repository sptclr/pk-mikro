/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormOrderFields } from "@/types/Order";

interface UseProductManagementParams {
  watch: UseFormWatch<FormOrderFields>;
  setValue: UseFormSetValue<FormOrderFields>;
}

interface UseProductManagementReturn {
  selectedProducts: any[];
  isProductSearchDisabled: boolean;
  handleAddProduct: (product: any) => void;
  handleRemoveProduct: (id: string) => void;
}

export const useProductManagement = ({
  watch,
  setValue,
}: UseProductManagementParams): UseProductManagementReturn => {
  const selectedProducts = watch("test") || [];
  const bundleAsal = watch("asal");

  // Check if the ProductSearch should be disabled
  const isProductSearchDisabled = !bundleAsal?.customer_name;

  const handleAddProduct = (product: any) => {
    const isExist = selectedProducts.find(
      (item) => item.item_code === product.item_code
    );

    if (!isExist) {
      // Add to test array
      setValue("test", [...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (id: string) => {
    // Remove from test array
    setValue(
      "test",
      selectedProducts.filter((item) => item.item_code !== id)
    );

    // Remove from priceTest array
    const currentPriceTests = watch("priceTest") || [];
    setValue(
      "priceTest",
      currentPriceTests.filter((item) => item.item_code !== id)
    );
  };

  return {
    selectedProducts,
    isProductSearchDisabled,
    handleAddProduct,
    handleRemoveProduct,
  };
};
