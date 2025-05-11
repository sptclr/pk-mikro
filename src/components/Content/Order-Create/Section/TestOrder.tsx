/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import SectionLayout from "@/components/Layouts/SectionLayout";
import ProductSearch from "@/components/ProductSearch/ProductSearch";

import { useTestPrice } from "@/hooks/useTestPrice";
import { useProductManagement } from "@/hooks/useProductManagement";
import { TestOrderProps } from "@/types/TestOrder";
import ProductEmpty from "@/components/ProductEmpty/ProductEmpty";
import ProductItem from "@/components/ProductItem/ProductItem";

function TestOrder({
  tests,
  register,
  setValue,
  watch,
  testSearch,
}: TestOrderProps) {
  // Custom hooks to manage product and price logic
  const {
    selectedProducts,
    isProductSearchDisabled,
    handleAddProduct,
    handleRemoveProduct,
  } = useProductManagement({ watch, setValue });

  const { priceTests, loading, handlePriceOptionChange } = useTestPrice({
    watch,
    setValue,
  });

  const bundleAsal = watch("asal");
  const defaultPriceKey = bundleAsal?.group_price || "K1";

  return (
    <SectionLayout>
      <h2 className="text-2xl font-bold text-anarya-title mb-6">
        Order Test <span className="text-red-500">*</span>
      </h2>

      <>
        {/* ProductSearch with onSearch function connected */}
        <ProductSearch
          {...register("test")}
          options={tests}
          onChange={handleAddProduct}
          onSearch={testSearch}
          selectedOptions={selectedProducts}
          disabled={isProductSearchDisabled}
        />

        {isProductSearchDisabled && (
          <p className="text-sm text-orange-500 mt-2">
            Pilih Asal terlebih dahulu untuk memilih test
          </p>
        )}

        {selectedProducts.length === 0 ? (
          <ProductEmpty />
        ) : (
          <div className="mt-6 space-y-4">
            {selectedProducts.map((product) => (
              <ProductItem
                key={product.item_code}
                product={product}
                onRemove={handleRemoveProduct}
                loading={!!loading[product.item_code]}
                priceTest={priceTests.find(
                  (p) => p.item_code === product.item_code
                )}
                onPriceOptionChange={handlePriceOptionChange}
                defaultPriceKey={defaultPriceKey}
              />
            ))}
          </div>
        )}
      </>
    </SectionLayout>
  );
}

export default TestOrder;
