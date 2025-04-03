"use client"

import { Product } from '@/types'
import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
import IconButton from '@/components/frontentend/components/ui/iconButton';
import { Bookmark, Expand, ShoppingCart } from 'lucide-react';
import Currency from '@/components/frontentend/components/ui/Currency';
import { useRouter } from 'next/navigation';
import { usePreviewModal } from '@/hooks/use-preview-models';
import { useCart } from '@/hooks/use-cart';
import { FcBookmark } from 'react-icons/fc';
import { useBookmark } from '@/hooks/use-bookmark';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShareButton } from './ShareButton';

interface ProductCardProps{
    data: Product;
    products: Product[]
}

const ProductCard: React.FC<ProductCardProps> = ({
    data,
    products
}) => {
    const router = useRouter()
    const previewModal = usePreviewModal()
    const cart = useCart();
    const bookmark = useBookmark()
    const handleClick = ()=> {
        router.push(`/frontend/product/${data?.id}`)
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      previewModal.onOpen(data)
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      cart.addItem(data)
    }
    const onShare: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      
    }
    const onAddToBookmark: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      bookmark.addItem(data)
    }

    const productInBookmark = bookmark.items.find((product) => data.id === product.id);
    const productInCart = cart.items.find((product) => data.id == product.id);
    const outOfStockProduct = products.find((product)=> product.id === productInBookmark?.id)
    // Check if the product is out of stock
    const isOutOfStock = outOfStockProduct?.countInStock === 0

    
    
  return (
    <div onClick={handleClick} className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'>
        {/* Images and Actions */}

        <div className='aspect-square rounded-xl bg-gray-100 relative'>
                <Image
                    src={data?.images?.[0]?.url}
                    alt={data.name}
                    fill
                    className='aspect-square object-cover rounded-md'
                />
              {isOutOfStock && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-xl font-semibold rounded-lg">
    <span>Out of Stock</span>
    <IconButton
      onClick={onAddToBookmark}
      icon={
        productInBookmark ? (
          <FcBookmark className="w-6 h-6" />
        ) : (
          <Bookmark className="w-6 h-6 text-yellow-500" />
        )
      }
    />
  </div>
)}

                <div className="opacity-80 group-hover:opacity-90 transition absolute w-full px-6 bottom-5">
                    {!isOutOfStock && (
                        <div className='flex gap-x-6 justify-center'>
                            <IconButton
                                onClick={onPreview}
                                icon={<Expand size={20} className='text-gray-600' />}
                            />
                            <IconButton
                                onClick={onAddToCart}
                                icon={<ShoppingCart
                                    size={20} className={cn("",
                                        productInCart ? " text-green-600" : "text-gray-600"
                                    )}
                                />}
                            />
                            <IconButton
                                onClick={onAddToBookmark}
                                icon={productInBookmark ? <FcBookmark className='w-6 h-6' /> : <Bookmark className='w-6 h-6 text-yellow-500' />}
                            />

<ShareButton
  url={`/frontend/product/${data?.id}`}
  title={data.name}
  text={"Check Our Amazing Product"}
/>

                        </div>
                    )}
                </div>
            </div>
        {/* Description */}
        <div >
            <p className='font-semibold text-lg'>
            {data.name}
            </p>
            <p className='text-sm text-gray-500'>
                {data.category?.name}
            </p>
        </div>
        {/* Price */}
        <div className='flex items-center justify-between'>
                {/* If there's a discount, show both the original and discounted price */}
                {data.priceDiscount ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 line-through">
                            <Currency value={data?.priceDiscount} />
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                            <Currency value={data.price} />
                        </span>
                    </div>
                ) : (
                    <Currency value={data?.price} />
                )}
            </div>
        {isOutOfStock && (
                <div className="mt-4">
                    <Button className="w-full bg-green-800 py-2 font-semibold rounded-lg ">
                        Notify Me When Available
                    </Button>
                </div>
            )}
        </div>
  )
}

export default ProductCard