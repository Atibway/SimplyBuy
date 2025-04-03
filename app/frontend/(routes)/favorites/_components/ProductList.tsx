"use client"
import React from 'react'
import NoResults from '@/components/frontentend/components/ui/NoResults';
import ProductCard from './ProductCard';
import { useBookmark } from '@/hooks/use-bookmark';
import { Product } from '@/types';


interface ProductListProps {
    title: string;
    products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
    title,
    products
}) => {
  const bookmarks = useBookmark()
  const items = bookmarks.items
  return (
    <div className='space-y-4'>
<h3 className='font-bold text-3xl'>{title}</h3>
{items.length=== 0 && <NoResults/>}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {items.map((item)=> (
       <ProductCard key={item.id} data={item} products={products}/>
    ))}
</div>
    </div>
  )
}

export default ProductList