
import {db as prismadb} from "@/lib/prismadb";
import { SizeColumn } from './components/columns'
import {format} from "date-fns"
import SizesClient from './components/Client'

const SizesPage = async({params}: {params: {storeId: string}}) => {
const sizes = await prismadb.size.findMany({
    where: {
        storeId: params.storeId
    },
    orderBy: {
        createdAt: "desc"
    }
})

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))

  return (
    <div className='flex-col'>
          <div className='flex-1 space-y-4 p-6 '>
              <SizesClient
data={formattedSizes}
              />
</div>
    </div>
  )
}

export default SizesPage

