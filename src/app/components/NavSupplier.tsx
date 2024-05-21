'use client';
import React from 'react'
import Link from '../../../node_modules/next/link'
import { usePathname } from 'next/navigation';
const NavSupplier = () => {
  const pathname = usePathname();
  return (
    <div>
      <header className='nav-supllier'>
        <div className="logo">
          <p className='text-white text-center font-bold text-2xl pt-4'>Trek Booking</p>
        </div>
        <div className="list-choose pt-10 px-4 pb-14">
          <ul className='pl-0'>
            <div className='py-2'>
            <li className='flex items-center pb-6 pl-3'>
              <img className='w-7 h-7 ' src="/image/darhboard.png" alt="" />
              <span className='text-white ml-2 text-xl font-semibold'>Dashboard</span>
            </li>
            </div>
           
         
            <li className='flex items-center pb-6 '>
            <Link className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
          pathname  === '/manage/user' ? 'active-link' : ''
        } `} href="/manage/user">
              <img className='w-7 h-7 ' src="/image/staff.png" alt="" />
              <span className='text-white ml-2 text-xl font-semibold'>User</span>
              </Link>
          
            </li>
            <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/manage/supplier'>
                    <img className='w-7 h-7' src='/image/suitcase.png' alt='Tour' />
                    <span className='text-white ml-2 text-xl font-semibold'>Supplier</span>
                  </Link>
                </li>
            <li className='flex items-center pb-6 '>
            <Link className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
          pathname  === '/manage/role' ? 'active-link' : ''
        } `} href="/manage/role">
              <img className='w-7 h-7 ' src="/image/suitcase.png" alt="" />
              <span className='text-white ml-2 text-xl font-semibold'>Roles</span>
              </Link>
          
            </li>
            <li className='flex items-center pb-6 '>
            <Link className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
          pathname  === '/manage/service' ? 'active-link' : ''
        } `} href="/manage/service">
              <img className='w-7 h-7 ' src="/image/gift.png" alt="" />
              <span className='text-white ml-2 text-xl font-semibold'>Service</span>
              </Link>
          
            </li>
            <li className='flex items-center pb-6 '>
            <Link className={`flex no-underline  nav-i-hover py-2 pl-3 pr-40 ${
          pathname  === '/supplier/roombooking' ? 'active-link' : ''
        } `} href="/supplier/roombooking">
              <img className='w-7 h-7 ' src="/image/chart.png" alt="" />
              <span className='text-white ml-2 text-xl font-semibold'>Room booking</span>
              </Link>
          
            </li>

        
          </ul>
        </div>
        <div className='border-solid border-t-2 border-white pt-3'>
        <Link href="/" className="bottom-logout flex justify-center items-center  no-underline text-white">
        <img className='w-7 h-7 ' src="/image/out.png" alt="" />
           <p className='color-white mb-0 ml-1 font-semibold text-xl'>Log out</p>
        </Link>
        </div>
      </header>
    </div>
  )
}

export default NavSupplier