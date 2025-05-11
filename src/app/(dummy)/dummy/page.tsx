"use client";

import React, { useState } from "react";
import { useToast } from "@/components/Toast/ToastProvider";
import Overlay from "@/components/Overlay/Overlay";
import Slider from "@/components/Slider/Slider";
// import HeaderOrderCreate from "@/components/Content/Order-Create/HeaderOrderCreate";
import { withProtected } from "@/components/HOC/WithProtected";

const DummyPage = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const handleClick = () => {
    showToast("Data pasien berhasil diperbarui!");
  };

  return (
    <>
      {/* <HeaderOrderCreate /> */}
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>

      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Buka Overlay
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Buka Slider
      </button>

      <Overlay isOpen={open} onClose={() => setOpen(false)}>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Ini Overlay!</h2>
          <p className="mb-4 text-gray-600">
            Konten ini bisa kamu ganti sesuka hati.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Tutup
          </button>
        </div>
      </Overlay>

      <Slider isOpen={isOpen} onClose={() => setIsOpen(false)} position="right">
        <h2 className="text-lg font-bold mb-4">Ini Sidebar</h2>
        <p>Konten sidebar bisa disesuaikan dengan kebutuhanmu.</p>
      </Slider>
    </>
  );
};

export default withProtected(DummyPage);
