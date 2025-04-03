"use client"

import { Button } from '@/components/ui1/button'
import Heading from '@/components/ui1/Heading'
import { Separator } from '@/components/ui1/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { SizeColumn, columns } from './columns'
import { DataTable } from '@/components/ui1/data-table'
import ApiList from '@/components/ui1/api-list'


interface SizesClientProps {
data: SizeColumn[]
}

const SizesClient: React.FC<SizesClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

  return (
    <>
          <div className='flex items-center justify-between'>
              <Heading
                  title={`Sizes (${data.length})`}
                  description='Manage Sizes for your store'
              />

              <Button onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
                  <Plus className='mr-2 h-4 w-4'/>
                  Add New
              </Button>
          </div>
          <Separator />
          <DataTable
              columns={columns}
              data={data}
              searchKey='name'
          />

          <Heading
          title={"API"}
          description="API calls for Sizes"
          />
          <ApiList
          entityName='sizes'
          entityIdName='sizeId'
          />
    </>
  )
}

export default SizesClient

