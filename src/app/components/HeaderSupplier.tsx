'use client'
import React, { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import Link from 'next/link';
import { FaRegTimesCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
interface HeaderSupplierProps {
  title: string;
}

const HeaderSupplier: React.FC<HeaderSupplierProps> = ({ title }) => {
  const [isDivVisible, setDivVisible] = useState(false);
  const pathname = usePathname();
  const handleMenuClick = () => {
    setDivVisible(!isDivVisible);
  };
  let currentTitle = title;
  if (pathname === '/manage/supplier') {
    currentTitle = 'Supplier';
  } else if (pathname === '/manage/role') {
    currentTitle = 'Roles';
  }
  else if (pathname === '/manage/dashboard') {
    currentTitle = 'Dashboard';
  }
  else if (pathname === '/manage/hotel') {
    currentTitle = 'Hotel';
  }
  else if (pathname === '/manage/tour') {
    currentTitle = 'Tour';
  }
  else if (pathname === '/manage/user') {
    currentTitle = 'User';
  }
  else if (pathname === '/manage/service') {
    currentTitle = 'Service';
  }
  else if (pathname === '/supplier/roombooking') {
    currentTitle = 'Room Booking';
  }
  else if (pathname === '/supplier/tourbooking') {
    currentTitle = 'Tour Booking';
  }
  else if (pathname === '/supplier/roomservice') {
    currentTitle = 'Room Service';
  }
  else if (pathname === '/supplier/room') {
    currentTitle = 'Room';
  }
  const handleCloseMenuClick = () => {
    setDivVisible(false);
  };

  return (
    <div className='fix-border flex justify-between  mlert-23 p-8 pr-11'>
      <div className={`overlay ${isDivVisible ? 'show' : ''}`} onClick={handleMenuClick}></div>
      <CiMenuBurger
        className='cursor-pointer mobi-supplier'
        style={{ float: 'right', fontSize: '22px' }}
        onClick={handleMenuClick}
      />
      <span className='ml-4 color-black font-semibold text-2xl'>{currentTitle}</span>

      {/* <div className='icon-user flex items-center'>
        <img className='h-5 w-5 mr-3 cursor-pointer' src='/image/bell.png' alt='Bell Icon' />
        <img className='h-10 w-10 cursor-pointer' src='/image/usersupplier.png' alt='User Icon' />
      </div> */}
      {isDivVisible && (
        <div className='pc-none' >
          <header className='nav-supllier-mobi'>
            <FaRegTimesCircle className='times-close' onClick={handleCloseMenuClick} />
            <div className='logo'>
              <p className='text-white text-center font-bold text-2xl pt-4'>Trek Booking</p>
            </div>
            <div className='list-choose pt-10 px-4 pb-14'>
              <ul className='pl-0'>
                <div className='py-2'>
                  <li className='flex items-center pb-6 pl-3'>
                    <img className='w-7 h-7' src='/image/darhboard.png' alt='Dashboard' />
                    <span className='text-white ml-2 text-xl font-semibold'>Dashboard</span>
                  </li>
                </div>
                <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/manage/user'>
                    <img className='w-7 h-7' src='/image/staff.png' alt='User' />
                    <span className='text-white ml-2 text-xl font-semibold'>User</span>
                  </Link>
                </li>
                <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/manage/supplier'>
                    <img className='w-7 h-7' src='/image/suitcase.png' alt='Tour' />
                    <span className='text-white ml-2 text-xl font-semibold'>Supplier</span>
                  </Link>
                </li>
                {/* <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/manage/role'>
                    <img className='w-7 h-7' src='/image/home.png' alt='Role' />
                    <span className='text-white ml-2 text-xl font-semibold'>Role</span>
                  </Link>
                </li> */}
                <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/supplier/room'>
                    <img className='w-7 h-7' src='/image/home.png' alt='Hotel' />
                    <span className='text-white ml-2 text-xl font-semibold'>Room</span>
                  </Link>
                </li>
                <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/supplier/roomservice'>
                    <img className='w-7 h-7' src='/image/home.png' alt='Hotel' />
                    <span className='text-white ml-2 text-xl font-semibold'>Room Service</span>
                  </Link>
                </li>
               
               
                <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/manage/service'>
                    <img className='w-7 h-7' src='/image/gift.png' alt='Voucher' />
                    <span className='text-white ml-2 text-xl font-semibold'>Service</span>
                  </Link>
                </li>
                <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/supplier/roombooking'>
                    <img className='w-7 h-7' src='/image/chart.png' alt='Room booking' />
                    <span className='text-white ml-2 text-xl font-semibold'>Room booking</span>
                  </Link>
                </li>
                <li className='flex items-center pb-6'>
                  <Link className='flex no-underline nav-i-hover py-2 pl-3 pr-40' href='/supplier/tourbooking'>
                    <img className='w-7 h-7' src='/image/dock.png' alt='Tour booking' />
                    <span className='text-white ml-2 text-xl font-semibold'>Tour booking</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='border-solid border-t-2 border-white pt-3'>
              <Link href='/' className='bottom-logout flex justify-center items-center no-underline text-white'>
                <img className='w-7 h-7' src='/image/out.png' alt='Log out' />
                <p className='color-white mb-0 ml-1 font-semibold text-xl'>Log out</p>
              </Link>
            </div>
          </header>
        </div>
      )}
    </div>
  );
};

export default HeaderSupplier;
