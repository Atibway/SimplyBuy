
"use cleint";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuLabel, DropdownMenuItem } from "@/components/ui1/dropdown-menu";
import { CategoryColumn } from "./columns";
import { Button } from "@/components/ui1/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";
import { AlertModal } from "@/components/models/AlertModel";

interface CellActionsProps {
    data: CategoryColumn
}

const CellActions: React.FC<CellActionsProps> = ({
    data,
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboard id copied to clipboard")
    }

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
          router.refresh();
          toast.success("Category Deleted");
        } catch (error) {
          toast.error("Make sure you removed all products using this category first");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };

  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4"/>
</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                  Actions
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/categories/${data.id}`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> setOpen(true)}>
                  <Trash className="mr-2 h-4 w-4 text-red-500" />
                  Delete
              </DropdownMenuItem>

          </DropdownMenuContent>
      </DropdownMenu>
    </>

  )
}

export default CellActions

