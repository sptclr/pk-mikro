/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProductEmpty: React.FC = () => {
  return (
    <div className="h-64 flex flex-col items-center justify-center mt-6">
      <img src="/product/empty-search.png" alt="empty search" />
      <div className="mt-6 text-center">
        <p className="font-bold text-xl mb-4">Tidak ada tes</p>
        <span className="text-base">Anda belum menambahkan tes apapun.</span>
      </div>
    </div>
  );
};

export default ProductEmpty;
