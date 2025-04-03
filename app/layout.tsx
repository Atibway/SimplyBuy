import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ModelProvider } from "@/providers/model-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ModalProvider from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
    return (
      <SessionProvider session={session}>
        <html lang="en">
                <body className={inter.className}>
                

                    <ToastProvider/>
           <ModelProvider/>
           <ModalProvider/>
            {children}
          </body>
        </html>
        </SessionProvider>
    );
}
