"use client"


import Heading from '@/components/ui1/Heading'
import { Separator } from '@/components/ui1/separator'

import React from 'react'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui1/data-table'



interface OrderClientProps {
data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    

  return (
    <>
              <Heading
                  title={`Orders (${data.length})`}
                  description='Manage orders for your store'
              />
         
          <Separator />
          <DataTable
              columns={columns}
              data={data}
              searchKey='products'
          />

          
    </>
  )
}

export default OrderClient

