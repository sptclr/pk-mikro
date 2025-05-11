"use client"
import React from "react";

type SectionLayoutType = {
  children: React.ReactNode;
};

function SectionLayout({ children }: SectionLayoutType) {
  return (
    <section className="bg-white p-6 shadow-layout rounded-2xl">
      {children}
    </section>
  );
}

export default SectionLayout;
