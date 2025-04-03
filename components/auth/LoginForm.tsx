"use client"

import { FormError } from "../form-error"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with a different provider": "";
  

  const callbackUrl = searchParams.get("callbackUrl")
    const onClick = (provider: "google" | "github")=>{
signIn(provider, {
    callbackUrl: callbackUrl ||DEFAULT_LOGIN_REDIRECT
})
    }

 

  return (
   
  <div className="flex items-center justify-center z-50 min-h-screen ">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
        <Button
size={"lg"}
className="w-full"
variant={"outline"}
onClick={()=> onClick("google")}
>
            <FcGoogle className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
          {urlError && (
            <FormError message={urlError}/>
          )}
          <Button
size={"lg"}
className="w-full"
onClick={()=> onClick("github")}
>
            <FaGithub className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-primary">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </CardFooter>
      </Card>
    </div>
   
  )
}
