"use server"

import { db } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";

export const toggleUser=async({
    userId,
    userRole
}:{
    userId: string;
    userRole: UserRole
})=>{

    const user = await db.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!user){
        return{error:"There is No Such user"}
    }

    const role = await db.user.update({
       where:{
        id: user.id
       },
       data:{
        role: user.role === "ADMIN"? "USER": "ADMIN"
       }
    })

    return role;
}