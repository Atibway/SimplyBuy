"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import { FcBookmark } from "react-icons/fc";
import { useBookmark } from '@/hooks/use-bookmark'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/use-current-user'
import { UserButton } from './user-button'
import { store } from '@prisma/client'

const NavbarActions = ({
    store
}:{
    store: store | null
}) => {
    const cart = useCart()
    const user = useCurrentUser()
    const bookmark = useBookmark()
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, []);

    if (!isMounted){
        return null;
    }

    

  return (
    <div className='ml-auto flex items-center '>
        {user?.role === "ADMIN" && (
            <Link
            href={`/`}
            >
            <Button 
            >
                Dashboard
            </Button>
            </Link>
        )}
        
<div
onClick={()=> router.push("/frontend/favorites")}
className='flex relative items-center justify-center mx-5 cursor-pointer '>
    <FcBookmark
    size={20}
    color='white'
    className='w-8 h-8'
    />
    <span className="absolute top-[-1px]  text-white font-bold  rounded-full w-5  h-5 text-center ">
        {bookmark.items.length}
    </span>
</div>
<Button
onClick={()=> router.push("/frontend/cart")}
className='flex items-center rounded-full bg-black px-4 py-2'>
    <ShoppingBag
    size={20}
    color='white'
    />
    <span className='ml-2 text-sm font-medium text-white'>
        {cart.items.length}
    </span>
</Button>
<div>

</div>
    </div>
  )
}

export default NavbarActions