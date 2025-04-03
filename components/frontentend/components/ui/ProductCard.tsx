'use client'

import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
import IconButton from './iconButton';
import { Bookmark, Expand, ShoppingCart } from 'lucide-react';
import Currency from './Currency';
import { useRouter } from 'next/navigation';
import { usePreviewModal } from '@/hooks/use-preview-models';
import { useCart } from '@/hooks/use-cart';
import { FcBookmark } from 'react-icons/fc';
import { useBookmark } from '@/hooks/use-bookmark';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ShareButton } from '@/app/frontend/(routes)/favorites/_components/ShareButton';
import { Product } from '@/types';

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
    data
}) => {
    const router = useRouter();
    const previewModal = usePreviewModal();
    const cart = useCart();
    const bookmark = useBookmark();

    const handleClick = () => {
        router.push(`/frontend/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }

    const onAddToBookmark: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        bookmark.addItem(data);
    }

    const productInBookmark = bookmark.items.find((product) => data.id === product.id);
    const productInCart = cart.items.find((product) => data.id == product.id);

    // Check if the product is out of stock
    const isOutOfStock = data?.countInStock === 0

    // Discounted price (if applicable)
    const discountedPrice = 200000

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
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold rounded-lg">
                        <span>Out of Stock</span>
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
            <div>
                <p className='font-semibold text-lg'>
                    {data.name}
                </p>
                <p className='text-sm text-gray-500'>
                    {data.category?.name}
                </p>
            </div>
            {/* Price Section */}
            <div className='flex items-center justify-between'>
                {/* If there's a discount, show both the original and discounted price */}
                {discountedPrice ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 line-through">
                        <Currency value={data?.priceDiscount} />
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                            <Currency value={data?.price} />
                        </span>
                    </div>
                ) : (
                    <Currency value={data?.price} />
                )}
            </div>
            {/* Disabled Add to Cart button */}
            {isOutOfStock && (
                <div className="mt-4">
                    <Button className="w-full py-2 bg-green-800  font-semibold rounded-lg ">
                        Notify Me When Available
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ProductCard;
