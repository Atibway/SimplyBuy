"use client"

import { useCart } from '@/hooks/use-cart'
import React, { useEffect, useState } from 'react'
import {CartItem} from './CartItem'
import { Image } from '@/types';
export type Product2 = {
  id: string;
  name: string;
  storeId: string;
  categoryId: string;
  description: string;
  countInStock: number;
  price: number;  // price is now a number instead of Decimal
  priceDiscount: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;
  images: Image[];  // Assuming images is an array of URLs (adjust if different)
  createdAt: Date;
  updatedAt: Date;
};
export const CartHome = ({
    products
}:{
  products: Product2[] 
}) => {

const cart = useCart()
const [isMounted, setIsMounted] = useState(false)

useEffect(()=>{
    setIsMounted(true)
}, []);

if (!isMounted){
    return null;
}

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
<div className="bg-white dark:bg-gray-800 shadow">
        <div className=" mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        </div>
      </div> 
      <div className=" mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      
    <CartItem
    products={products}
    />
      </div>
      </div>
      </div>
<div >
</div>
        </div>
   

   
  )
}
