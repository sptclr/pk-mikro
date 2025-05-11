"use client";

import React, { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { dummyData, totalCount } from "./dummy-data";
import useColumns from "@/components/Content/Order/Table/Columns";
import HeaderOrder from "@/components/Content/Order/HeaderOrder";
import TableOrder from "@/components/Content/Order/Table";
import { useRouter } from "next/navigation";
import { withProtected } from "@/components/HOC/WithProtected";

function OrderPage() {
  const router = useRouter();
  const columns = useColumns();
  const [data] = useState(dummyData);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = Math.ceil(totalCount / pagination.pageSize);
  const startItem = (currentPage - 1) * pagination.pageSize + 1;
  const endItem = Math.min(currentPage * pagination.pageSize, totalCount);

  return (
    <>
      <HeaderOrder createBtn={() => router.push("/order/create")} />
      <TableOrder
        table={table}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        startItem={startItem}
        endItem={endItem}
      />
    </>
  );
}

export default withProtected(OrderPage);
