/* eslint-disable @next/next/no-img-element */
// my-new-page.js
"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../../../public/css/user.css";
import {
  revalidateSupplier,
  toggleSupplierStatus,
  useSuppliers,
} from "@/app/services/supplierService";
import CreateSupplier from "@/app/components/Suppliers/CreateUser";
import Link from "next/link";


const ManageSupplier = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(
    null
  );
  const [showSupplierCreate, setShowSuplierCreate] = useState<boolean>(false);
  const { suppliers, error } = useSuppliers();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState<ISupplier[]>(suppliers || []);

  useEffect(() => {
    if (suppliers) {
      const filtered = suppliers.filter((supplier: ISupplier) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          supplier.supplierName?.toLowerCase().includes(lowerCaseQuery) ||
          supplier.email?.toLowerCase().includes(lowerCaseQuery) ||
          supplier.phone?.toLowerCase().includes(lowerCaseQuery) ||
          supplier.supplierId?.toString().includes(lowerCaseQuery) ||
          // supplier.roleId.toString().includes(lowerCaseQuery) ||
          (supplier.status ? "unbanned" : "banned").includes(lowerCaseQuery) ||
          (supplier.isVerify ? "true" : "false").includes(lowerCaseQuery)
        );
      });
      setFilteredSuppliers(filtered);
      setCurrentPage(1); // Reset to the first page when search query changes
    }
  }, [searchQuery, suppliers]);

  if (error) return <div>Failed to load</div>;
  if (!suppliers) return <div>Loading...</div>;

  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredSuppliers.length / suppliersPerPage);

  const handleImageClick = (supplier: ISupplier) => {
    setSelectedSupplier(supplier);
    setShowPopup(true);
  };

  const toggleStatus = async (userId: number) => {
    setLoading(true);
    try {
      await toggleSupplierStatus(userId);
      setShowPopup(false);
      revalidateSupplier();
      toast.success("Success");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to toggle supplier status");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative">
      <div className="search-add ">
        <div className="search-hotel flex">
          <input
            type="text"
            placeholder="Search........."
            className="input-hotel pl-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src="/image/search.png" alt="" />
        </div>
        {/* <button
          className="ml-8 button-add"
          onClick={() => setShowSuplierCreate(true)}
        >
          + Add Supplier
        </button> */}
      </div>
      <div className="table-hotel ">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr className="text-center bg-ccc">
                      <th scope="col" className="px-6 py-4">
                        SupplierID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        SupplierName
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Manage Supplier Staff
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Commission
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4">
                        IsVerify
                      </th>
                      <th scope="col" className="px-6 py-4">
                        RoleID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Ban
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSuppliers.length > 0 ? (
                      currentSuppliers.map((item: ISupplier) => (
                        <tr
                          key={item.supplierId}
                          className="border-b border-neutral-200 dark:border-white/10 text-center font-semibold"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {item.supplierId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.supplierName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.phone}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex justify-center">
                            <Link
                              href={`/manage/supplier/supplier_staff/${item.supplierId}`}
                              className=""
                            >
                              <img
                                className="w-5"
                                src="/image/viewdetail.png"
                                alt="View Detail"
                              />
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.commission} % for each order
                          </td>
                          <td
                            className={`whitespace-nowrap px-6 py-4 ${
                              item.status ? "color-active" : "color-stop"
                            }`}
                          >
                            {item.status ? "Unbanned" : "Banned"}
                          </td>
                          <td
                            className={`whitespace-nowrap px-6 py-4 ${
                              item.isVerify ? "color-active" : "color-stop"
                            }`}
                          >
                            {item.isVerify ? "True" : "False"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.roleId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex">
                            <img
                              onClick={() => handleImageClick(item)}
                              className="w-5 h-5 cursor-pointer ml-2"
                              src={
                                item.status
                                  ? "/image/unlock.png"
                                  : "/image/lock.png"
                              }
                              alt={item.status ? "Ban" : "Unban"}
                            />
                            {showPopup &&
                              selectedSupplier?.supplierId == item.supplierId && (
                                <div className="fixed inset-0 z-10 flex items-center justify-center ">
                                  {/* Nền mờ */}
                                  <div className="fixed inset-0 bg-black opacity-50"></div>

                                  {/* Nội dung của popup */}
                                  <div className="relative bg-white p-8 rounded-lg">
                                    <p className="color-black font-bold text-2xl">
                                      Do you want to{" "}
                                      {item.status ? "lock" : "unlock"} this{" "}
                                      {item.supplierName} ?
                                    </p>
                                    <div className="button-kichhoat pt-4">
                                      <button
                                        className="button-exit mr-2"
                                        onClick={() => setShowPopup(false)}
                                      >
                                        Exit
                                      </button>
                                      <button
                                        className="button-yes"
                                        onClick={() =>
                                          toggleStatus(item.supplierId)
                                        }
                                      >
                                        Yes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No suppliers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="pagination mt-4 flex justify-between items-center font-semibold">
                  <div>
                    <span className="ml-8">
                      {currentPage} of {totalPages}
                    </span>
                  </div>
                  <div className="flex items-center mr-8">
                    <img
                      className="w-3 h-3 cursor-pointer"
                      src="/image/left.png"
                      alt="Previous"
                      onClick={handlePrevPage}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
                      <p
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mb-0 mx-2 cursor-pointer ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </p>
                    ))}
                    <img
                      className="w-3 h-3 cursor-pointer"
                      src="/image/right2.png"
                      alt="Next"
                      onClick={handleNextPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateSupplier
        showSupplierCreate={showSupplierCreate}
        setShowSuplierCreate={setShowSuplierCreate}
      />
    </div>
  );
};

export default ManageSupplier;
