
import OrderClient from "./orders/Client"
import { OrderColumn } from "./orders/columns"
  
  
  export function OrderHistory({
    orders
  }:{
    orders: OrderColumn[]
  }) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        <OrderClient
data={orders}
/>
      </div>
    )
  }
  
  