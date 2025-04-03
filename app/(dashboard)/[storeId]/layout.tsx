import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { currentUser } from "@/lib/auth";
import {db } from "@/lib/prismadb";
import { ThemeProvider } from "@/providers/theme-provider";

import { redirect } from "next/navigation";

export default async function DashboardLayout({ children, params }: {
    children: React.ReactNode;
    params: {storeId:string}
}) {
   
        const session = await currentUser()
 
    const userId = session?.id

    if (!userId) {
redirect('/frontend')
    }

   
    return (
        <>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            <Navbar/>
            {children}
          </ThemeProvider>
        </>
    )
}
