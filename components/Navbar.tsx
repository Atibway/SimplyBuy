
import React from 'react'
import MainNav from './MainNav'
import StoreSwitcher from './StoreSwitcher'
import { redirect } from 'next/navigation'
import {db} from '@/lib/prismadb'
import { ModeToggle } from './theme-tuggle'
import MobileDrawer from './mobileMenue'
import { UserButton } from './auth/user-button'
import { currentUser } from '@/lib/auth'

const Navbar = async() => {
  const session = await currentUser()
 
  const userId = session?.id

    if (!userId) {
        redirect("/auth/login")
    }

    const stores = await db.store.findMany({
        where: {
            userId 
        }
    });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className=" ml-3 hidden  md:block " />
        <div className="ml-auto flex items-center space-x-3">
          <div>
          </div>
          <ModeToggle  />
          <UserButton
          />
          <div className=" ml-3  lg:hidden ">
          <MobileDrawer/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar

