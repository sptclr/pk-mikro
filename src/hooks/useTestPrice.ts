/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { fetcherPost } from "@/lib/fetcher";

import { FormOrderFields } from "@/types/Order";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { PriceMasterTest } from "@/types/TestOrder";

interface UseTestPriceParams {
  watch: UseFormWatch<FormOrderFields>;
  setValue: UseFormSetValue<FormOrderFields>;
}

interface UseTestPriceReturn {
  priceTests: PriceMasterTest[];
  loading: Record<string, boolean>;
  fetchPriceData: (product: any) => Promise<void>;
  handlePriceOptionChange: (productCode: string, priceKey: string) => void;
  getProductPrice: (productCode: string, priceKey?: string) => string;
}

export const useTestPrice = ({
  watch,
  setValue,
}: UseTestPriceParams): UseTestPriceReturn => {
  const [priceTests, setPriceTests] = useState<PriceMasterTest[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const selectedProducts = watch("test") || [];
  const bundleAsal = watch("asal");

  // Effect to clean up price tests when products are removed
  useEffect(() => {
    if (bundleAsal) {
      // Get current price tests from form
      const currentPriceTests = watch("priceTest") || [];

      // Filter out price tests for products that have been removed
      const updatedPriceTests = currentPriceTests.filter((priceTest) =>
        selectedProducts.some(
          (product) => product.item_code === priceTest.item_code
        )
      );

      // Update form state
      setValue("priceTest", updatedPriceTests);

      // Update local state
      setPriceTests((prev) =>
        prev.filter((priceTest) =>
          selectedProducts.some(
            (product) => product.item_code === priceTest.item_code
          )
        )
      );

      // Load price data for any product that doesn't have price data yet
      selectedProducts.forEach((product) => {
        const hasPrice = currentPriceTests.some(
          (priceTest) => priceTest.item_code === product.item_code
        );

        if (!hasPrice) {
          fetchPriceData(product);
        }
      });
    }
  }, [selectedProducts, bundleAsal, setValue, watch]);

  // Function to fetch price data for a single product
  const fetchPriceData = async (product: any) => {
    if (!bundleAsal || !product?.item_code) return;

    const itemCode = product.item_code;

    // Prevent duplicate fetches
    if (loading[itemCode]) return;

    // Set loading state
    setLoading((prev) => ({ ...prev, [itemCode]: true }));

    try {
      const params = {
        customer_code:
          bundleAsal.customer_code_innomaster || bundleAsal.customer_code,
        group_price: bundleAsal.group_price,
        item_code: itemCode,
      };

      const response: any = await fetcherPost(
        "/api/test/price-master-test",
        params
      );

      if (response?.data && response.data.length > 0) {
        const newPriceTest = {
          ...response.data[0],
          // Set default selected price key based on bundleAsal.group_price
          selected_price_key: bundleAsal?.group_price || "K1",
        };

        // Update local state
        setPriceTests((prev) => {
          // Remove any existing entry for this item_code
          const filtered = prev.filter((p) => p.item_code !== itemCode);
          // Add the new price test
          return [...filtered, newPriceTest];
        });

        // Update form state
        const currentPriceTests = watch("priceTest") || [];
        setValue("priceTest", [
          ...currentPriceTests.filter((p) => p.item_code !== itemCode),
          newPriceTest,
        ]);
      }
    } catch (error) {
      console.error("Error fetching price data:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [itemCode]: false }));
    }
  };

  // Handle price option selection
  const handlePriceOptionChange = (productCode: string, priceKey: string) => {
    // Update local state
    setPriceTests((prev) =>
      prev.map((item) =>
        item.item_code === productCode
          ? { ...item, selected_price_key: priceKey }
          : item
      )
    );

    // Update form state
    const currentPriceTests = watch("priceTest") || [];
    setValue(
      "priceTest",
      currentPriceTests.map((item) =>
        item.item_code === productCode
          ? { ...item, selected_price_key: priceKey }
          : item
      )
    );
  };

  // Helper function to get price for a product
  const getProductPrice = (productCode: string, priceKey?: string): string => {
    const priceTest = priceTests.find((p) => p.item_code === productCode);
    if (!priceTest) return "-";

    // Use the provided price key, or default to the selected one or group_price
    const key =
      priceKey ||
      priceTest.selected_price_key ||
      bundleAsal?.group_price ||
      "K1";
    return priceTest[key as keyof PriceMasterTest]?.toString() || "-";
  };

  return {
    priceTests,
    loading,
    fetchPriceData,
    handlePriceOptionChange,
    getProductPrice,
  };
};
