// my-new-page.js
'use client'
import ConfirmationModal from '@/app/components/Users/ConfirmationModal';
import React, { useState } from 'react'
import Table from '../../../../node_modules/react-bootstrap/esm/Table';
import useSWR, { mutate } from '../../../../node_modules/swr/dist/core/index';
import { toast } from 'react-toastify';
import '../../../../public/css/user.css'
import {  revalidateUsers, toggleUserStatus, useUsers } from '@/app/services/userService';
import CreateUser from '@/app/components/Users/CreateUser';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const MyNewPage = () => {
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // State để lưu ID của người dùng được chọn
  // const { data: users, error } = useSWR('https://localhost:7132/getUsers', fetcher);
  const [showUserCreate, setShowUserCreate] = useState<boolean>(false);
  const { users, error } = useUsers();
  const [loading, setLoading] = useState(false);
  if (error) return <div>Failed to load</div>;
  if (!users) return <div>Loading...</div>;
  // Function để mở modal
  const handleImageClick = () => {
    setShowPopup(true);
  };





  const toggleStatus = async (userId:number) => {
    setLoading(true);
    try {
      await toggleUserStatus(userId);
      setShowPopup(false);
      revalidateUsers()
      toast.success("Success");
    } catch (error:any) {
      console.error(error.message);
      toast.error("Failed to toggle user status");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='relative'>
      <div className="search-add ">
        <div className="search-hotel flex">
          <input type="text" placeholder='Search.........' className='input-hotel pl-3'/>
          <img src="/image/search.png" alt="" />
        </div>
        <button className='ml-8 button-add'  onClick={() => setShowUserCreate(true)}>+ Add User</button>
  
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
              <th scope="col" className="px-6 py-4">UserID</th>
              <th scope="col" className="px-6 py-4">UserName</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Phone</th>
              <th scope="col" className="px-6 py-4">Address</th>
              <th scope="col" className="px-6 py-4">Password</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">IsVerify</th>
              <th scope="col" className="px-6 py-4">RoleID</th>
              <th scope="col" className="px-6 py-4">Ban</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item: IUser) => (
            <tr key={item.userId} className="border-b border-neutral-200 dark:border-white/10 text-center">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{item.userId}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.userName}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.phone}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.address}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.password}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.status ? "True" : "False"}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.isVerify ? "True" : "False"}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.roleId}</td>
              <td className="whitespace-nowrap px-6 py-4 flex">
              <img
  // onClick={() => toggleStatus(item.userId)}
  onClick={handleImageClick}
  className='w-4 h-4 cursor-pointer ml-2'
  src={item.status ? "/image/unban.png" : "/image/ban.png"}
  alt={item.status ? "Ban" : "Unban"}
/>
{showPopup && (
        <div className="fixed inset-0 z-10 flex items-center justify-center ">
          {/* Nền mờ */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          {/* Nội dung của popup */}
          <div className="relative bg-white p-8 rounded-lg">
          <p className='color-black font-bold text-2xl'>
  Do you want to {item.status ? 'lock' : 'unlock'} this {item.userName} ?
</p>
           <div className="button-kichhoat pt-4">
           <button className='button-exit mr-2' onClick={() => setShowPopup(false)}>Exit</button>
           <button className='button-yes' onClick={() => toggleStatus(item.userId)}>Yes</button>
           </div>
          </div>
        </div>
      )}
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
  

   <CreateUser 
   showUserCreate={showUserCreate}
   setShowUserCreate={setShowUserCreate}
   />
    </div>
    
  )
}

export default MyNewPage