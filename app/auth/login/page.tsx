
import { LoginForm } from '@/components/auth/LoginForm'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

import React from 'react'

const LoginPage =async () => {
  const isLoggedIn = await currentUser()
  
if(isLoggedIn){
  redirect("/frontend")
} else{
  return (
    <LoginForm/>
  )
}
}

export default LoginPage;