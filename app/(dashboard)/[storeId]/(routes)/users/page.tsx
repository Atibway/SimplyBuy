
import { db } from '@/lib/prismadb'
import { format } from 'date-fns'
import { UsersColumn } from './_components/columns'
import UsersClient from './_components/Client'

const page = async() => {
    const user = await db.user.findMany()

      const formattedUsers: UsersColumn[] = user.map((item) => ({
 id: item.id,
 name: item.name,
 phone: item.phone,
 city: item.city,
 country: item.country,
 role: item.role,
 email: item.email,
 createdAt: format(item.updatedAt, "MMMM do, yyyy")
}))
  return (
   
    <div className='flex-col'>
    <div className='flex-1 space-y-4 p-6 '>
    <UsersClient
    data={formattedUsers}
    />
</div>
</div>
  )
}

export default page