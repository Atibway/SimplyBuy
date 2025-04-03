"use client";

import { delivery } from "@/actions/mark-as-delivered";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck, CircleIcon, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  delivered: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell:({row})=> (
      <div>
        {row.original.isPaid? (
          <div className="flex items-center text-green-600 bg-green-100 rounded-full px-3 py-1 text-sm font-medium">
        <CheckCheck className="mr-2 h-4 w-4" />
        Paid
      </div>
        ):(
<div className="flex items-center text-red-600 bg-red-100 rounded-full px-3 py-1 text-sm font-medium">
      <XCircle className="mr-2 h-4 w-4" />
      Not Paid
    </div>
        )}
      </div>
    )
    },
  {
    accessorKey: "delivered",
    header: "Deliverly Status",
    cell: ({row})=> {
      return (
        <div className="">
{row.original.delivered? (
   <Button
   variant="ghost"
   className="text-green-600 hover:text-green-700 bg-green-100 hover:bg-green-300"
 >
   <CheckCheck className="mr-2 h-4 w-4" />
   Delivered
 </Button>
):(
  <Button
      variant="outline"
      className="text-blue-600 hover:text-blue-700 bg-blue-100 hover:bg-blue-300"
    >
      <CircleIcon className="mr-2  h-4 w-4" />
      Not Delivered
    </Button>
)}

      </div>
      )
    }
    },
    


];
