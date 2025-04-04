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
import Menu from './mobileMenue'

export const revalidate = 0

export const NavBar = async () => {
  const user = await currentUser()
  const categories = await getCategories()
  const store = await db.store.findFirst({
    where: {
      userId: user?.id as string
    }
  })

  return (
    <div className="border-b">
      <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8 justify-between">
        
        {/* Mobile Menu (Visible on Small Screens) */}
        <div className="block md:hidden">
          <Menu categories={categories} />
        </div>

        {/* Logo */}
        <Link href="/frontend" className="flex items-center ml-3">
          <Image src="/logo.svg" alt="logo" width={40} height={40} className="object-cover" />
          <p className="font-bold text-xl ">simplybuy</p>
        </Link>

        {/* Main Navigation (Visible on Larger Screens) */}
        <div className="hidden md:flex">
          <MainNav data={categories} />
        </div>

        {/* Actions (User/Login & Store Actions) */}
        <div className="flex items-center space-x-4 ml-auto">
          <NavbarActions store={store} />
          {user ? (
            <UserButton />
          ) : (
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
