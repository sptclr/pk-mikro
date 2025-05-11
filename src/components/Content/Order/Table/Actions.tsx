import { OrderData } from "@/app/(dashboard)/order/dummy-data";
import {
  IconBarcode,
  IconBilling,
  IconDelete,
  IconEdit,
  IconHistory,
} from "@/components/Icons";
import { cn } from "@/utils";
import React from "react";

const Actions = ({ row }: { row: OrderData }) => (
  <div className="flex flex-col gap-2 items-center flex-wrap lg:flex-nowrap">
    <div className={cn("flex gap-2")}>
      <button>
        <IconHistory />
      </button>
      <button>
        <IconBilling />
      </button>
      <button>
        <IconBarcode />
      </button>
    </div>
    {(row.status === "Draf" || row.status === "Batal Validasi") && (
      <div className="flex gap-2">
        <button>
          <IconDelete />
        </button>
        <button>
          <IconEdit />
        </button>
      </div>
    )}
  </div>
);

export default Actions;
