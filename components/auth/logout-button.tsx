"use client"

import { logout } from "@/actions/logout";
import { redirect } from "next/navigation";
import { useState } from "react";
import LoadingPage from "./LoadingPage";


interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({
    children
}: LogoutButtonProps)=> {
    const [loading, setIsLoading]= useState(false);

const onClick = ()=> {
    setIsLoading(true)
    logout().then(
        redirect("/auth/login")
       
    ).finally(() => {
        setIsLoading(false);
    })
};



return (
    <>
    {loading && <LoadingPage message="Signing you out..." />}
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  </>
)
}