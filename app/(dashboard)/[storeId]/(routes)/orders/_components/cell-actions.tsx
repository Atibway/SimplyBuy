"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui1/dropdown-menu";
import { Button } from "@/components/ui1/button";
import { Copy, Edit, MoreHorizontal, Trash, CheckCircle, Circle } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";
import { AlertModal } from "@/components/models/AlertModel";
import { OrderColumn } from "./columns";
import { delivery } from "@/actions/mark-as-delivered";

interface CellActionsProps {
  data: OrderColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Colour ID copied to clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/orders/${data.id}`);
      router.refresh();
      toast.success("Order Deleted");
    } catch (error) {
      toast.error("Make sure you removed all products using this color first");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleDeliverly = async({
    status,
    orderId
  }:{
    status: boolean;
    orderId: string;
  })=>{
  try {
    await delivery({status, orderId}).then((res)=>{
  if(res?.error){
    toast.error(res.error)
  }else{
    toast.success(res.success as string)
    window.location.reload()
  }
    })
  } catch (error) {
    toast.error("Something wenttt wrong")
  }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-red-500" />
            Delete
          </DropdownMenuItem>
          {data.delivered ? (
            <DropdownMenuItem
              onClick={() => handleDeliverly({status: false, orderId:data.id})}
              className="text-green-600 hover:text-green-700 bg-green-100 hover:bg-green-300"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Delivered
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => handleDeliverly({status: true, orderId:data.id})}
              className="text-blue-600 hover:text-blue-700 bg-blue-100 hover:bg-blue-300"
            >
              <Circle className="mr-2 h-4 w-4" />
              Mark as Delivered
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
