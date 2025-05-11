"use client";
import React from "react";

import Sidebar from "../Sidebar/Sidebar";

type DashboardType = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardType) {
  return (
    <main className="antialiased h-screen w-screen py-5 px-6 flex bg-anarya-base gap-6">
      <Sidebar>
        <Sidebar.Logo />
        <hr className="my-5" />
        <Sidebar.Item href="/" icon="icon-dashboard">
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item href="/master" icon="icon-master">
          Master
        </Sidebar.Item>
        <Sidebar.Item href="/order" icon="icon-order">
          Order
        </Sidebar.Item>

        <Sidebar.SubMenu
          label="Info Pasien"
          icon="icon-pasien"
          pathPrefix="/info-pasien"
        >
          <Sidebar.Item href="/info-pasien/transaksi-pasien" icon="icon-pasien">
            Transaksi Pasien
          </Sidebar.Item>
          <Sidebar.Item href="/info-pasien/record-pasien" icon="icon-pasien">
            Record Pasien
          </Sidebar.Item>
        </Sidebar.SubMenu>
        <Sidebar.Footer />
      </Sidebar>
      <div className="w-full flex flex-col gap-6 overflow-auto">
        {/* Untuk halaman utama */}
        {children}
      </div>
    </main>
  );
}
