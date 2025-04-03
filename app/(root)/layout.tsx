
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import {db} from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }: {
    children: React.ReactNode
}) {
    const session = await currentUser()
 
    const userId = session?.id

    if (!userId) {
redirect('/auth/login')
    }
    if (session.role === "USER") {
redirect('/frontend')
    }
    const store = await db.store.findFirst({
        where: {
            userId
        }
    })

    if(store){
        redirect(`/${store.id}`)
    }

    return (
        <>
        {children}
        </>
    )
}
