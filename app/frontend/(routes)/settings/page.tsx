import React from 'react'
import ManageAccount from './_components/Home-settings-page'
import { db } from '@/lib/prismadb'
import { currentUser } from '@/lib/auth'
import { formatter } from '@/lib/utils'
import {format} from "date-fns"
import { OrderColumn } from './_components/orders/columns'



const SettingsPage = async() => {
  const user = await currentUser()
  const orders = await db.order.findMany({
    where: {
        userId: user?.id
    },
    include: {
orderItems: {
    include: {
        product: true
    }
}
    },
    orderBy: {
        createdAt: "desc"
    }
})

const userInfo = await db.user.findUnique({
    where:{
      id: user?.id
    }
   })

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: userInfo?.phone as string,
        address: userInfo?.city as string,
        delivered: item.delivered,
        products: item.orderItems.map((orderItem)=> orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
              return total + Number(orderItem.product.price) * orderItem.quantity;
            }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))
  return (
    <div >
<ManageAccount
orders={formattedOrders}
/>

    </div>
  )
}

export default SettingsPage