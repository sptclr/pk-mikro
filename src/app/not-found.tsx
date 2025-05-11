// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Halaman tidak ditemukan
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sepertinya kamu nyasar. Tapi tenang, kita bisa kembali ke jalan yang
        benar.
      </p>
      <Link
        href="/"
        className="underline underline-offset-1 text-blue-500 hover:text-blue-600"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
