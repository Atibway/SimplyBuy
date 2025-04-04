"use client"

import Heading from '@/components/ui1/Heading'
import { Separator } from '@/components/ui1/separator'
import { UsersColumn, columns } from './columns'
import { DataTable } from '@/components/ui1/data-table'


interface UsersClientProps {
data: UsersColumn[]
}

const UsersClient: React.FC<UsersClientProps> = ({
    data
}) => {
   

  return (
    <>
          <div className='flex items-center justify-between'>
              <Heading
                  title={`Users (${data.length})`}
                  description='Manage  your Users'
              />
          </div>
          <Separator />
          <DataTable
              columns={columns}
              data={data}
              searchKey='name'
          />

    </>
  )
}

export default UsersClient

