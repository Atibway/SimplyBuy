import React from 'react'
import {db as prismadb} from "@/lib/prismadb";
import { ProductColumn } from './_components/columns'
import {format} from "date-fns"
import ProductClient from './_components/Client'
import { formatter } from '@/lib/utils'

const ProductsPage = async({params}: {params: {storeId: string}}) => {
const products = await prismadb.product.findMany({
    where: {
        storeId: params.storeId
    },
    include: {
category: true,
size: true,
color: true
    },
    orderBy: {
        createdAt: "desc"
    }
})

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        countInStock: item.countInStock,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()) ,
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))
  return (
    <div className='flex-col'>
          <div className='flex-1 space-y-4 p-6 '>
              <ProductClient
data={formattedProducts}
              />
</div>
    </div>
  )
}

export default ProductsPage

