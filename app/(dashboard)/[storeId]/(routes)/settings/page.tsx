
import {db as prismadb} from "@/lib/prismadb";
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './_components/SettingsForm';
import { auth } from '@/auth';
import SettingPage from "../profile/page";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async({ params }) => {
    
    const session = await auth()

    const userId = session?.user.id

    
    if (!userId) {
        redirect("/auth/login")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect("/frontend")
    }
  return (
    <div className='grid lg:grid-cols-2 space-y-4'>
        <div className='flex-1 p-3 space-y-4 md:p-8 lg:pt-20'>
        <SettingPage/>
      </div>
          <div className='flex-1 p-3 space-y-4 md:p-8 lg:pt-6'>
         
              <SettingsForm initialData={store } />
      </div>
      
    </div>
  )
}

export default SettingsPage

