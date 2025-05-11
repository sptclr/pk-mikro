import React from "react";
import type { Table as ReactTable } from "@tanstack/react-table";
import { OrderData } from "@/app/(dashboard)/order/dummy-data";
import { IconChevronLeft, IconChevronRight } from "@/components/Icons";
import Table from "@/components/Tables/Table";

interface PaginationProps {
  table: ReactTable<OrderData>; // Menggunakan generic `any` agar fleksibel, bisa diganti sesuai tipe data
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  table,
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalCount,
}) => (
  <Table.Footer>
    <Table.Row>
      <Table.Cell className="w-full" colSpan={table.getAllColumns().length}>
        <div className="flex items-center justify-end gap-4 text-anarya-footer-text">
          <div className="text-sm">
            Showing {startItem} - {endItem} of {totalCount}
          </div>
          <span>|</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Page</span>
            <select
              value={currentPage}
              onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
              className="h-8 w-14 rounded-md border border-gray-300 px-2 text-sm"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                )
              )}
            </select>
            <span>of</span>
            <span className="text-sm">{totalPages}</span>
          </div>
          <div>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft
                fill={!table.getCanPreviousPage() ? "#D9D9D9" : ""}
              />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight
                fill={!table.getCanNextPage() ? "#D9D9D9" : ""}
              />
            </button>
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  </Table.Footer>
);

export default Pagination;
