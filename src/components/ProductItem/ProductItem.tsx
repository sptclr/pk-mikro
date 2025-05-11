/* eslint-disable @next/next/no-img-element */
import React from "react";
import Select from "@/components/Select/Select";
import { PRICE_OPTIONS, ProductItemProps } from "@/types/TestOrder";

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onRemove,
  loading,
  priceTest,
  onPriceOptionChange,
  defaultPriceKey,
}) => {
  const selectedPriceKey =
    priceTest?.selected_price_key || defaultPriceKey || "K1";
  const price =
    priceTest?.[selectedPriceKey as keyof typeof priceTest]?.toString() || "-";

  return (
    <div className="border bg-anarya-item-test rounded p-4 flex justify-between items-center">
      <div className="flex-1">
        <p className="font-bold">{product.item_name}</p>
        <p className="text-sm text-gray-500">{product.item_code}</p>
        {(product.count_detail as number) > 0 && (
          <p className="text-xs text-blue-500 mt-1">
            {product.count_detail} item details
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">Harga</p>
          {loading ? (
            <p className="text-sm">Loading...</p>
          ) : (
            <div>
              <p className="text-sm font-bold text-green-600 mb-1">
                Rp {price}
              </p>
              <Select
                options={PRICE_OPTIONS}
                value={selectedPriceKey}
                onChange={(value) =>
                  onPriceOptionChange(product.item_code, value)
                }
                className="w-24 ml-auto" // Make it small and align right
                placeholder="Pilih harga"
              />
            </div>
          )}
        </div>
        <button
          onClick={() => onRemove(product.item_code)}
          className="text-red-500 text-sm"
        >
          <img src="/product/icon-test-delete.png" alt="test" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
