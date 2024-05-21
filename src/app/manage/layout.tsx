import React from 'react'
import "../../../public/css/supplier.css";
import HeaderSupplier from '../components/HeaderSupplier';
import NavSupplier from '../components/NavSupplier';


export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
          <NavSupplier />
          {children}
          <HeaderSupplier title="Pages"/>

    </div>
  )
}

