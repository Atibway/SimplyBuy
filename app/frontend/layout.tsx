import type { Metadata } from "next";
import { NavBar } from "@/components/frontentend/components/NavBar";
import {Footer} from "@/components/frontentend/components/Footer";



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
