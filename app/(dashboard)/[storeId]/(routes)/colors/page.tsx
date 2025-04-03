import React from 'react'

import {db as prismadb} from "@/lib/prismadb";
import {format} from "date-fns"

import ColorClient from './_components/Client'
import { ColorColumn } from './_components/columns'

const SizesPage = async({params}: {params: {storeId: string}}) => {
const colors = await prismadb.color.findMany({
    where: {
        storeId: params.storeId
    },
    orderBy: {
        createdAt: "desc"
    }
})

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))

  return (
    <div className='flex-col'>
          <div className='flex-1 space-y-4 p-6 '>
              <ColorClient
data={formattedColors}
              />
</div>
    </div>
  )
}

export default SizesPage

