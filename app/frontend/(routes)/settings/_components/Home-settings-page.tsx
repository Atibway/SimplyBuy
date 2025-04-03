
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderHistory } from './order-history'
import { OrderColumn } from './orders/columns'
import ProductTracking from './order-tracking'
import SettingPage1 from "@/app/(dashboard)/[storeId]/(routes)/profile/page"

export default function ManageAccount({
  orders
}:{
  orders: OrderColumn[]
}) {
  

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Your Account</h1>
      <Tabs defaultValue="personal-info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal-info">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          {/* <TabsTrigger value="tracking">Track Item</TabsTrigger> */}
        </TabsList>
        <TabsContent value="personal-info">
          <SettingPage1/>
        </TabsContent>
        <TabsContent value="orders">
          <OrderHistory
          orders={orders}
          />
        </TabsContent>
        <TabsContent value="tracking">
          <ProductTracking />
        </TabsContent>
      </Tabs>
    </div>
  )
}

