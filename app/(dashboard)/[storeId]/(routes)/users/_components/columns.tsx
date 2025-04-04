"use client";

import { toggleUser } from "@/actions/toggleUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";


export type UsersColumn = {
  id: string;
  name: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  role: UserRole
  email: string | null;
  createdAt: string;
};

export const columns: ColumnDef<UsersColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "role",
    header: "Role",
    cell:({row})=> {
      
      const toggleUserRole = async(userId: string, currentRole:UserRole) => {
      await toggleUser({userId, userRole:currentRole}).then(()=>{
        toast.success("User Role Updated")
        window.location.reload()
      })
      }
      return(
        <div className="flex items-center space-x-2">
                    <Badge
                    className={cn(row.original.role === "USER"?"bg-destructive": "bg-green-500")}
                    >{row.original.role}</Badge>
                    <Button onClick={() => toggleUserRole(row.original.id, row.original.role)} size="sm">
                      Toggle Role
                    </Button>
                  </div>
      )
    }
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    }
];
