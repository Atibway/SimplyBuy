import type { Metadata } from "next";
import { NavBar } from "@/components/frontentend/components/NavBar";
import {Footer} from "@/components/frontentend/components/Footer";

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default async function FrontendLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
        <NavBar/>
        {children}
        <Footer/>
       
    </>
  );
}
