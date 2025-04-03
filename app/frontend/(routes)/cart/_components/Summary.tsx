"use client"
import { Button } from '@/components/ui/button'
import Currency from '@/components/frontentend/components/ui/Currency'
import { useCart } from '@/hooks/use-cart'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useCurrentUser } from '@/hooks/use-current-user'

const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCart((state)=> state.items)
  const removeAll = useCart((state)=> state.removeAll)
const user = useCurrentUser()
const router = useRouter()

  useEffect(()=>{
    if(searchParams.get("success")){
      toast.success("Payment completed");
      removeAll()
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll])

  const totalPrice = items.reduce((sum, item)=> {
    return sum + Number(item.price) * (item.countInStock ?? 0)
  }, 0)

  const onCheckout = async ()=> {
    if(!user){
router.push("/auth/login")

    }else{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id),
        userId: user.id
      })
  
      window.location = response.data.url
    }
  }

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 sm:p-6 py-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <div className='flex justify-between'>
        <div >
          
        <Button
                variant={"destructive"}
                className=""
                disabled={items.length === 0}
                onClick={()=> removeAll()}
                >
                  Clear cart
                </Button>
          
        </div>
        <div>
        <Button variant="outline" asChild>
                  <Link href="/frontend">Continue Shopping</Link>
                </Button>
                
        </div>
      </div>
        <div className="mt-6 space-y-4">
<div className="flex items-center justify-between border-t border-gray-200 pt-4">
<div className="text-base font-medium text-gray-900">
    Order total
</div>
<Currency value={totalPrice}/>
</div>
        </div>
        <Button disabled={items.length === 0} onClick={onCheckout} className='w-full mt-6'>
          Checkout
        </Button>
        </div>
  )
}

export default Summary