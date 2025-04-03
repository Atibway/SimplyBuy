"use client"

import { Button } from '@/components/ui1/button'
import Heading from '@/components/ui1/Heading'
import { Separator } from '@/components/ui1/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, columns } from './columns'
import { DataTable } from '@/components/ui1/data-table'
import ApiList from '@/components/ui1/api-list'


interface BillboardClientProps {
data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

  return (
    <>
          <div className='flex items-center justify-between'>
              <Heading
                  title={`Billboard (${data.length})`}
                  description='Manage billboards for your store'
              />

              <Button onClick={()=> router.push(`/${params.storeId}/billboards/new`)}>
                  <Plus className='mr-2 h-4 w-4'/>
                  Add New
              </Button>
          </div>
          <Separator />
          <DataTable
              columns={columns}
              data={data}
              searchKey='label'
          />

          <Heading
          title={"API"}
          description="API calls for Billboards"
          />
          <ApiList
          entityName='billboards'
          entityIdName='billboardId'
          />
    </>
  )
}

export default BillboardClient

