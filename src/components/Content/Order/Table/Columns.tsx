import { useMemo } from "react";
import Actions from "./Actions";
import { formatTglOrder } from "@/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { OrderData } from "@/app/(dashboard)/order/dummy-data";
import Badge from "./Badge";

const columnHelper = createColumnHelper<OrderData>();

const useColumns = () => {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "action",
        header: "Action",
        cell: ({ row }) => <Actions row={row.original} />,
      }),
      columnHelper.accessor("kalgenId", { header: "Kalgen ID" }),
      columnHelper.accessor("tglOrder", {
        header: "Tgl Order",
        cell: ({ row }) => <pre>{formatTglOrder(row.original.tglOrder)}</pre>,
      }),
      columnHelper.accessor("pasien", { header: "Pasien" }),
      columnHelper.accessor("prioritas", {
        header: "Prioritas",
        cell: ({ row }) => (
          <span
            className={row.original.prioritas === "Cito" ? "text-red-600" : ""}
          >
            {row.original.prioritas}
          </span>
        ),
      }),
      columnHelper.accessor("dokter", { header: "Dokter" }),
      columnHelper.accessor("lokasiLab", { header: "Lokasi Lab" }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => <Badge status={row.original.status} />,
      }),
    ],
    []
  );

  return columns;
};

export default useColumns;
