
import Link from 'next/link'
import React from 'react'
import MainNav from './MainNav'
import getCategories from '@/actions/get-categories'
import NavbarActions from './NavbarActions'
import { UserButton } from './user-button'
import { Button } from './ui/button'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/prismadb'
import Image from 'next/image'

export const revalidate = 0

export const NavBar = async() => {

  const user = await currentUser()

  const categories = await getCategories()
const store = await db.store.findFirst({
  where: {
      userId: user?.id as string
  }
})
  return (
    
        <div className='border-b'>
            <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
            <Link href={"/frontend"} className='ml-4 flex lg:ml-0 gap-x-2'>
           <Image src='/logo.svg' alt='logo' width={40} height={40} className='object-cover'/>
                <p className='font-bold text-xl'>simplybuy</p>
            </Link>
            <MainNav data={categories}/>
            <NavbarActions
            store={store}
            />
            <div className='ml-2'>
            {user?(
<UserButton/>
):(
    <Link
    href={"/auth/login"}>
    <Button>
Login
    </Button>
    </Link>
)}
            </div>
            </div>
        </div>
       
  )
}
