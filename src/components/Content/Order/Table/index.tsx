import SectionLayout from "@/components/Layouts/SectionLayout";
import Table from "@/components/Tables/Table";
import { flexRender } from "@tanstack/react-table";
import React from "react";
import Pagination from "./Pagination";
import { cn } from "@/utils";
import type { Table as ReactTable } from "@tanstack/react-table";
import { OrderData } from "@/app/(dashboard)/order/dummy-data";

interface TableOrderProps {
  table: ReactTable<OrderData>;
  currentPage: number;
  totalCount: number;
  totalPages: number;
  startItem: number;
  endItem: number;
}

const TableOrder = ({
  table,
  currentPage,
  totalCount,
  totalPages,
  startItem,
  endItem,
}: TableOrderProps) => {
  return (
    <SectionLayout>
      <Table>
        <Table.Header className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head
                  key={header.id}
                  className={cn(
                    header.id === "action" && "text-center" // Menambahkan class khusus untuk kolom Action
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row
              key={row.id}
              className={
                row.original.prioritas === "Cito"
                  ? "bg-anarya-table-marker"
                  : ""
              }
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
        <Pagination
          table={table}
          currentPage={currentPage}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          totalCount={totalCount}
        />
      </Table>
    </SectionLayout>
  );
};

export default TableOrder;
