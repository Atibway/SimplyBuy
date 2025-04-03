
import React from 'react'
import ProductList from './_components/ProductList'
import getProducts from '@/actions/get-products'

const FavoritePage = async() => {
  
  const products = await getProducts({isFeatured: true})
  return (
    <div className="flex-grow container mx-auto px-4 py-8">
        
        <ProductList title="Our Bookmarks Collection" products={products}/>
      
        </div>
  )
}

export default FavoritePage