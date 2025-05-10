/* eslint-disable @typescript-eslint/no-explicit-any */
import { getForms } from '@/actions/getForms';
import Analytics from '@/components/Analytics' 
import React from 'react'

const page =  async () => {
    const forms = await getForms();
        
    return (
        <div className='flex gap-11'>
            {forms?.data?.map((form:any,index:number)=>(
                <Analytics key={index} formId={form.id} form={form}/>
            ))}
        </div>
    )
}

export default page