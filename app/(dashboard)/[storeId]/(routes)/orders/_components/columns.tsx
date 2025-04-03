"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck, XCircle } from "lucide-react";
import CellActions from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  phone: string | null
  user: string | null
  city: string | null
  country: string | null
  isPaid: boolean;
  delivered: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};



export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "District",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
 
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell:({row})=> (
      <div>
        {row.original.isPaid? (
          <div>
        <CheckCheck className=" h-7 w-7 text-green-600" />
      </div>
        ):(
<div >
      <XCircle className=" h-7 w-7 text-destructive" />
    </div>
        )}
      </div>
    )
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActions data={row.original } />
}


];
