/* eslint-disable @next/next/no-img-element */
// my-new-page.js
'use client'
import CreateRole from '@/app/components/Roles/CreateRole';
import DeleteRole from '@/app/components/Roles/DeleteRole';
import UpdateRole from '@/app/components/Roles/UpdateRole';
import { useRoles } from '@/app/services/roleService';
import React, { useState } from 'react'

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const MyNewPage = () => {
  const [role,setRole] = useState<IRole | null>(null);
  // const { data: roles, error } = useSWR('https://localhost:7132/getRoles', fetcher);
  const { roles, error } = useRoles();
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  if (error) return <div>Failed to load</div>;
  if (!roles) return <div>Loading...</div>;
  return (
    <div className='relative'>
      <div className="search-add ">
        <div className="search-hotel flex">
          <input type="text" placeholder='Search.........' className='input-hotel pl-3'/>
          <img src="/image/search.png" alt="" />
        </div>
        <button className='ml-8 button-add' onClick={() => setShowModalCreate(true)}>+ Add role</button>
  
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
            <tr className='text-center bg-ccc'>
              <th scope="col" className="px-6 py-4">RoleID</th>
              <th scope="col" className="px-6 py-4">RoleName</th>
              <th scope="col" className="px-6 py-4">RoleDescription</th>
              <th scope="col" className="px-6 py-4">Action</th>

            </tr>
          </thead>
          <tbody>
            {roles.map((item: IRole) => (
            <tr key={item.roleId} className="border-b border-neutral-200 dark:border-white/10 text-center font-semibold">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{item.roleId}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.roleName}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.roleDescription}</td>
              <td className="whitespace-nowrap px-6 py-4 flex justify-center">
                <div className='flex justify-center'>
                  <img onClick={() => {setRole(item); setShowModalUpdate(true);}} className='w-5 h-5 cursor-pointer' src="/image/penIcon.png" alt="" />
                  <img onClick={() =>{setRole(item); setShow(true)}} className='w-5 h-5 cursor-pointer ml-3' src="/image/trash.png" alt="" />
                </div>
              
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
  

   <CreateRole 
   showModalCreate={showModalCreate}
   setShowModalCreate={setShowModalCreate}
   />
      <UpdateRole 
   showModalUpdate={showModalUpdate}
   setShowModalUpdate={setShowModalUpdate}
   role={role}
   setRole = {setRole}
   />
   <DeleteRole 
    show={show}
    setShow={setShow}
    role={role}
    setRole = {setRole}
   />
    </div>
  )
}

export default MyNewPage