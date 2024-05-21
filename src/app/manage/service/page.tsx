// my-new-page.js
'use client'

import CreateService from '@/app/components/Services/CreateService';
import DeleteService from '@/app/components/Services/DeleteService';
import UpdateService from '@/app/components/Services/UpdateService';
import { useServices } from '@/app/services/service';
import { setServers } from 'dns';
import React, { useState } from 'react'
import Table from '../../../../node_modules/react-bootstrap/esm/Table';
import useSWR from '../../../../node_modules/swr/dist/core/index';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const MyNewPage = () => {
  const [service,setService] = useState<IService | null>(null);
  // const { data: roles, error } = useSWR('https://localhost:7132/getRoles', fetcher);
  const { services, error } = useServices();
  const [showServiceCreate, setShowServiceCreate] = useState<boolean>(false);
  const [showServiceUpdate, setShowServiceUpdate] = useState<boolean>(false);
  const [showService, setShowService] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  if (error) return <div>Failed to load</div>;
  if (!services) return <div>Loading...</div>;
  return (
    <div className='relative'>
      <div className="search-add ">
        <div className="search-hotel flex">
          <input type="text" placeholder='Search.........' className='input-hotel pl-3'/>
          <img src="/image/search.png" alt="" />
        </div>
        <button className='ml-8 button-add' onClick={() => setShowServiceCreate(true)}>+ Add Service</button>
  
      </div>
   <div className="table-hotel pt-8">
 

<div className="flex flex-col overflow-x-auto">
  <div className="sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table
          className="min-w-full text-start text-sm font-light text-surface dark:text-white">
          <thead
            className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr className='text-center'>
              <th scope="col" className="px-6 py-4">ServiceId</th>
              <th scope="col" className="px-6 py-4">ServiceName</th>
              <th scope="col" className="px-6 py-4">ServiceDescription</th>
              <th scope="col" className="px-6 py-4">ServiceImage</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item: IService) => (
            <tr key={item.serviceId} className="border-b border-neutral-200 dark:border-white/10 text-center">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{item.serviceId}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.serviceName}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.serviceDescription}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.serviceImage}</td>
              <td className="whitespace-nowrap px-6 py-4 flex">
              <img onClick={() => {setService(item); setShowServiceUpdate(true);}} className='w-5 h-5 cursor-pointer' src="/image/pen.png" alt="" />
            <img onClick={() =>{setService(item); setShowService(true)}} className='w-5 h-5 cursor-pointer ml-3' src="/image/trash.png" alt="" />
              </td>
            </tr>
        ))}
</tbody>
        </table>
      </div>
    </div>
  </div>
</div>
   </div>
  

 <CreateService 
   showServiceCreate={showServiceCreate}
   setShowServiceCreate={setShowServiceCreate}
   />
      
      <UpdateService 
   showServiceUpdate={showServiceUpdate}
   setShowServiceUpdate={setShowServiceUpdate}
   service={service}
   setService = {setService}
   />
   
   <DeleteService 
    showService={showService}
    setShowService={setShowService}
    service={service}
    setService = {setService}
   />
    </div>
  )
}

export default MyNewPage